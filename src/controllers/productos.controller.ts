import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Producto } from '../utils/interfaces';
import { readJsonFile } from '../utils/helpers';
import { getTopRatedProducts, buscarCategoria } from '../utils/helpers'; // Asegúrate de tener estas funciones

export const productosPath = path.join(process.cwd(), 'src', 'data', 'products.json');

export const obtenerProductos = (_req: Request, res: Response) => {
  const productos = readJsonFile<Producto[]>(productosPath);
  res.json(productos);
};

export const obtenerProductoPorId = (req: Request, res: Response) => {
  const productos = readJsonFile<Producto[]>(productosPath);
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'El ID debe ser un número' });
  }

  const producto = productos.find(p => p.id === id);
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json(producto);
};

export const obtenerProductosPorCategoria = (req: Request, res: Response) => {
  const categoriaId = parseInt(req.params.categoriaId);

  if (isNaN(categoriaId)) {
    return res.status(400).json({ error: 'El ID de categoría debe ser un número' });
  }

  const productos = readJsonFile<Producto[]>(productosPath);
  const filtrados = categoriaId === 0
    ? productos
    : productos.filter(p => p.categoriaId === categoriaId);

  res.json(filtrados);
};

export const obtenerProductosDestacados = (req: Request, res: Response) => {
  const count = parseInt(req.params.count);

  if (isNaN(count) || count <= 0) {
    return res.status(400).json({ error: 'El parámetro "count" debe ser un número positivo.' });
  }

  try {
    const topProducts = getTopRatedProducts(count); // Debes tener esta función
    res.json(topProducts);
  } catch (error) {
    console.error('Error al obtener productos destacados:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

export const crearProducto = (req: Request, res: Response) => {
  const productos = readJsonFile<Producto[]>(productosPath);
  const nuevoProducto = req.body as Omit<any, 'id'>;

  if (!nuevoProducto || !nuevoProducto.name) {
    return res.status(400).json({ error: 'Datos inválidos del producto' });
  }

  const nuevaId = productos.length > 0
    ? Math.max(...productos.map(p => p.id)) + 1
    : 1;

  const categoriaId = buscarCategoria(nuevoProducto.categoria); // Función que deberías tener en utils

  const productoConId: Producto = {
    id: nuevaId,
    categoriaId,
    name: nuevoProducto.name,
    image: null,
    altText: nuevoProducto.descripcion,
    stock: nuevoProducto.stock,
    precio: nuevoProducto.precio,
    valoracion: -1
  };

  productos.push(productoConId);

  try {
    fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2), 'utf-8');
    res.status(201).json(productoConId);
  } catch (err) {
    console.error('Error al guardar producto:', err);
    res.status(500).json({ error: 'Error al guardar el producto' });
  }
};
