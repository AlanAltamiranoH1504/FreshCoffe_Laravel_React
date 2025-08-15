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
    nombre: string,
    precio: number,
    imagen: string,
    categoria_id: number,
    id: number
}