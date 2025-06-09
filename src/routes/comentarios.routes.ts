import { Router } from 'express';
import {
  obtenerComentariosRecientes,
  obtenerComentariosPorProducto,
} from '../controllers/comentarios.controller';

const router = Router();

router.get('/', obtenerComentariosRecientes);
router.get('/:id', obtenerComentariosPorProducto);

export default router;
