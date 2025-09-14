import {create} from "zustand";
import {devtools} from "zustand/middleware";
import type {Categoria, Producto, ProductoToAddInOrden} from "../types";
import {findAllProductosGET} from "../services/ProductosService.ts";

type AppState = {
    productos: Producto[]
    productosFiltrados: Producto[];
    categoriaSeleccionada: number;
    statusModal: boolean;
    productoSeleccionado: Producto | null;
    productosDeOrden: ProductoToAddInOrden[]

    getProductos: () => Promise<void>;
    addCategoria: (categoriaId: Categoria["id"]) => void;
    showModal: () => void;
    showProductoDetalles: (productoId: Producto["id"]) => void;
    addProductoInOrden: (producto: ProductoToAddInOrden) => void;
    deleteOrdenProducto: (productoId: Producto["imagen"]) => void;
    incrementProductoQuantity: (producto: ProductoToAddInOrden) => void;
};

export const useAppStore = create<AppState>()(
    devtools((set) => ({
        productos: [],
        productosFiltrados: [],
        categoriaSeleccionada: 0,
        statusModal: false,
        productosDeOrden: [],


        getProductos: async () => {
            const productosF: Producto[] = await findAllProductosGET();
            set({
                productos: productosF
            });
        },
        addCategoria: (categoriaId) => {
            set((state) => ({
                categoriaSeleccionada: categoriaId,
                productosFiltrados: state.productos.filter((producto) => producto.categoria_id === categoriaId)
            }));
        },
        showModal: () => {
            set((state) => ({
                statusModal: !state.statusModal
            }));
        },
        showProductoDetalles: (productoId) => {
            set((state) => ({
                productoSeleccionado: state.productos.find((producto) => producto.id === productoId)
            }));
        },
        addProductoInOrden: (producto: ProductoToAddInOrden) => {
            set((state) => {
                const productoExistente = state.productosDeOrden.find((p) =>
                    p.imagen === producto.imagen
                );

                let nuevosProductos: ProductoToAddInOrden[];

                if (productoExistente) {
                    nuevosProductos = state.productosDeOrden.map((p) =>
                        p.imagen === producto.imagen ? {
                            ...p,
                            cantidad: p.cantidad + 1,
                            total: p.total + producto.precio
                        } : p
                    );
                } else {
                    nuevosProductos = [...state.productosDeOrden, producto];
                }

                return {productosDeOrden: nuevosProductos};
            });
        },
        deleteOrdenProducto: (imagenProducto) => {
            set((state) => {
                const productosActualizados = state.productosDeOrden.filter((p) => {
                    return p.imagen !== imagenProducto
                });
                return {productosDeOrden: productosActualizados};
            })
        },
        incrementProductoQuantity: (producto) => {
            set((state) => {
                let productoActualizados = state.productosDeOrden.map((p) =>
                    p.imagen === producto.imagen ? {
                        ...p,
                        cantidad: p.cantidad + 1,
                        total: p.total + producto.precio
                    } : p
                )
                return {productosDeOrden: productoActualizados};
            })
        }
    }))
);
