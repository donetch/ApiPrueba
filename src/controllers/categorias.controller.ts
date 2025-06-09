import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Categoria } from '../utils/interfaces';
import { readJsonFile } from '../utils/helpers';

export const categoriasPath = path.join(process.cwd(), 'src', 'data', 'categories.json');

export const obtenerCategorias = (_req: Request, res: Response): void => {
    console.log(categoriasPath)
    const categorias = readJsonFile<Categoria[]>(categoriasPath);
    res.json(categorias);
};

export const obtenerCategoriaPorId = (req: Request, res: Response): void => {
  const categorias = readJsonFile<Categoria[]>(categoriasPath);
  const id = parseInt(req.params.id);
  const categoria = categorias.find(c => c.id === id);

  if (!categoria) {
    res.status(404).json({ error: 'Categoría no encontrada' });
    return;
  }

  res.json(categoria);
};

