import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';

import categoriasRoutes from './routes/categorias.routes';
import productosRoutes from './routes/productos.routes';
import usuariosRoutes from './routes/usuarios.routes';
import comentariosRoutes from './routes/comentarios.routes';

const app = express();
const dirname = __dirname;

app.use(cors({
  origin: 'http://localhost:8100',
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(dirname, 'public')));
app.use(cookieParser());

// Rutas
app.use('/api/categories', categoriasRoutes);
app.use('/api/products', productosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/comment', comentariosRoutes);

// Ruta no encontrada
app.use((_req, res) => {
  res.status(404).send('Página no encontrada');
});

export default app;
