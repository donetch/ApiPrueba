import fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';
import { Categoria, Producto } from './interfaces';
import { categoriasPath } from '../controllers/categorias.controller';
import { productosPath } from '../controllers/productos.controller';

export const readJsonFile = <T extends any[]>(filePath: string): T => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(data);

    if (!Array.isArray(parsed)) {
      throw new Error('El contenido del archivo no es un array');
    }

    return parsed as T;
  } catch (error) {
    console.error(`Error al leer el archivo ${filePath}:`, error);
    return [] as unknown as T;
  }
};

export const encriptarPass = (password: string): string => {
  return createHash('sha256').update(password).digest('hex');
};

export const verificarPassword = (passwordIngresada: string, hashGuardado: string): boolean => {
  const hashIngresado = encriptarPass(passwordIngresada);
  return hashIngresado === hashGuardado;
};

export const buscarUsuario = (nuevo: Partial<{ rut: string; mail: string }>, lista: any[]): boolean => {
  return lista.some(usuario =>
    usuario.rut === nuevo.rut || usuario.mail?.toLowerCase() === nuevo.mail?.toLowerCase()
  );
};

export const buscarCategoria = (nombre: string): number => {
  const categories = readJsonFile<Categoria[]>(categoriasPath);

  const categoria = categories.find(cat => cat.name.toLowerCase() === nombre.toLowerCase());

  return categoria ? categoria.id : 0;
};

export const getTopRatedProducts = (count: number): Producto[] => {
  const products = readJsonFile<Producto[]>(productosPath);
  
  // Ordenar productos por valoración (de mayor a menor)
  const sortedProducts = [...products].sort((a, b) => b.valoracion - a.valoracion);
  
  // Retornar los primeros 'count' productos
  return sortedProducts.slice(0, count);
};