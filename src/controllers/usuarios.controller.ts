import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { createHash } from 'crypto';
import { Usuario } from '../utils/interfaces';
import { readJsonFile } from '../utils/helpers';

const usuariosPath = path.join(process.cwd(), 'src', 'data', 'usuarios.json');
const JWT_SECRET = process.env.JWT_SECRET || 'miSuperClaveSecreta123';

const encriptarPass = (password: string): string =>
  createHash('sha256').update(password).digest('hex');

const verificarPassword = (passwordIngresada: string, hashGuardado: string) =>
  encriptarPass(passwordIngresada) === hashGuardado;

const buscarUsuario = (nuevo: Partial<Usuario>, lista: Usuario[]): boolean =>
  lista.some(usuario =>
    usuario.rut === nuevo.rut || usuario.mail.toLowerCase() === nuevo.mail?.toLowerCase()
  );

export const registrarUsuario = (req: Request, res: Response) => {
  const usuarios = readJsonFile<Usuario[]>(usuariosPath);
  const nuevoUsuario = req.body as Omit<Usuario, 'id'>;

  if (!nuevoUsuario) {
    return res.status(400).json({ error: 'Datos inválidos del usuario' });
  }

  if (buscarUsuario(nuevoUsuario, usuarios)) {
    return res.status(400).json({ error: 'El usuario con esos datos ya existe' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(nuevoUsuario.mail)) {
    return res.status(400).json({ error: 'Correo electrónico no válido' });
  }

  const nuevaId = usuarios.length > 0 ? Math.max(...usuarios.map(p => p.id)) + 1 : 1;

  const passwordHash = encriptarPass(nuevoUsuario.password);

  const nuevo: Usuario = {
    id: nuevaId,
    rut: nuevoUsuario.rut,
    name: nuevoUsuario.name,
    mail: nuevoUsuario.mail,
    region: nuevoUsuario.region,
    comuna: nuevoUsuario.comuna,
    password: passwordHash,
    avatar: nuevoUsuario.avatar,
    rol: 1
  };

  usuarios.push(nuevo);

  try {
    fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2), 'utf-8');
    res.status(201).json(nuevo);
  } catch (err) {
    console.error('Error al guardar usuario:', err);
    res.status(500).json({ error: 'Error al guardar el usuario' });
  }
};

export const loginUsuario = (req: Request, res: Response) => {
  const { mail, password } = req.body;
  const usuarios = readJsonFile<Usuario[]>(usuariosPath);

  const usuario = usuarios.find(u => u.mail === mail);
  if (!usuario) {
    return res.status(401).json({ error: 'Usuario no encontrado' });
  }

  const esValido = verificarPassword(password, usuario.password);
  if (!esValido) {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }

  const token = jwt.sign({ id: usuario.id, name: usuario.name, rol: usuario.rol }, JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({ token });
};

export const obtenerUsuarioAutenticado = (req: Request, res: Response) => {
  res.json({
    mensaje: 'Usuario autenticado correctamente',
    usuario: (req as any).usuario
  });
};

export const getUsuarioDesdeToken = (req: Request, res: Response) => {
  const { id, name, rol } = (req as any).usuario;

  res.json({
    usuario: {
      id,
      name,
      rol
    }
  });
}
