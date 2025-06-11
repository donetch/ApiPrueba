import { Router } from 'express';
import {
  registrarUsuario,
  loginUsuario,
  obtenerUsuarioAutenticado,
  getUsuarioDesdeToken
} from '../controllers/usuarios.controller';
import { verificarToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/NuevoUsuario', registrarUsuario);
router.post('/login', loginUsuario);
router.get('/logeado', verificarToken, obtenerUsuarioAutenticado);
router.get('/setUsuario', verificarToken, getUsuarioDesdeToken);

export default router;
