import {z} from "zod";
import type {responseLoginUserAPI} from "../schemas/UsuariosSchemas.ts";

export type FormRegistro = {
    name: string,
    apellidos: string,
    email: string,
    password: string
}
export type FormLogin = {
    email: string,
    password: string
}
export type Categoria = {
    icono: string,
    nombre: string,
    id: number
}
export type Producto = {
    id: number,
    nombre: string,
    precio: number,
    imagen: string,
    categoria_id: number,
    disponible: number
}
export type FormSaveProductoToOrden = {
    cantidad: number
}

export type ProductoToAddInOrden = {
    nombre: string,
    precio: number,
    imagen: string,
    categoria_id: number,
    cantidad: number,
    total: number
}

// Inferencias
export type LoginType = z.infer<typeof responseLoginUserAPI>