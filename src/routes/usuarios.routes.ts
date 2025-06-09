import { Router } from 'express';
import {
  registrarUsuario,
  loginUsuario,
  obtenerUsuarioAutenticado
} from '../controllers/usuarios.controller';
import { verificarToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/NuevoUsuario', registrarUsuario);
router.post('/login', loginUsuario);
router.get('/logeado', verificarToken, obtenerUsuarioAutenticado);

export default router;
