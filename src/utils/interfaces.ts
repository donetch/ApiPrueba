export interface Usuario {
  id: number,
  rut: number;
  name: string;
  mail: string;
  region: string;
  comuna: string;
  password: string;
  avatar: string | null;
}

export interface Producto {
  id: number;
  categoriaId: number;
  name: string;
  image: string | null;
  altText: string;
  stock: number;
  precio: string;
  valoracion: number;
}

export interface Categoria {
  id: number;
  name: string;
  image: string;
  description: string;
  altText: string;
}

export interface Comentario {
  idComentario: number;
  idProduct: number;
  nameUsuario: string;
  avatar: string;
  nameProducto: string;
  textoComentario: string;
  valoracion: number;
}
