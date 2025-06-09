import { Router } from 'express';
import {
  obtenerProductos,
  obtenerProductoPorId,
  obtenerProductosPorCategoria,
  obtenerProductosDestacados,
  crearProducto
} from '../controllers/productos.controller';

const router = Router();

router.get('/', obtenerProductos);
router.get('/:id', obtenerProductoPorId);
router.get('/categoria/:categoriaId', obtenerProductosPorCategoria);
router.get('/destacados/:count', obtenerProductosDestacados);
router.post('/addProduct', crearProducto);

export default router;
