import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Comentario } from '../utils/interfaces';
import { readJsonFile } from '../utils/helpers';

const comentariosPath = path.join(process.cwd(), 'src', 'data', 'comment.json');

// Obtener los comentarios más recientes (por defecto 3)
export const obtenerComentariosRecientes = (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string, 10) || 3;
  const comentarios = readJsonFile<Comentario[]>(comentariosPath);

  const comentariosOrdenados = [...comentarios].sort((a, b) => b.idComentario - a.idComentario);
  const comentariosLimitados = comentariosOrdenados.slice(0, limit);

  res.json(comentariosLimitados);
};

// Obtener comentarios de un producto específico
export const obtenerComentariosPorProducto = (req: Request, res: Response) => {
  const idProduct = parseInt(req.params.idProduct, 10);

  if (isNaN(idProduct)) {
    return res.status(400).json({ error: "El ID del producto debe ser un número." });
  }

  const comentarios = readJsonFile<Comentario[]>(comentariosPath);
  const comentariosFiltrados = comentarios.filter(c => c.idProduct === idProduct);

  res.json(comentariosFiltrados);
};