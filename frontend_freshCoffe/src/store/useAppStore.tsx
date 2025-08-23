import {create} from "zustand";
import {devtools} from "zustand/middleware";
import type {Categoria, Producto, ProductoToAddInOrden} from "../types";
import {productos} from "../data/Productos.ts";

type AppState = {
    productosFiltrados: Producto[];
    categoriaSeleccionada: number;
    statusModal: boolean;
    productoSeleccionado: Producto | null;
    productosDeOrden: ProductoToAddInOrden[]


    addCategoria: (categoriaId: Categoria["id"]) => void;
    showModal: () => void;
    showProductoDetalles: (productoId: Producto["id"]) => void;
    addProductoInOrden: (producto: ProductoToAddInOrden) => void;
    deleteOrdenProducto: (productoId: Producto["imagen"]) => void;
    incrementProductoQuantity: (producto: ProductoToAddInOrden) => void;
};

export const useAppStore = create<AppState>()(
    devtools((set) => ({
        productosFiltrados: [],
        categoriaSeleccionada: 0,
        statusModal: false,
        productosDeOrden: [],

        addCategoria: (categoriaId) => {
            const productosFiltrados: Producto[] = productos.filter((producto) => {
                return producto.categoria_id === categoriaId
            });
            set(() => ({
                categoriaSeleccionada: categoriaId,
                productosFiltrados: productosFiltrados
            }));
        },
        showModal: () => {
            set((state) => ({
                statusModal: !state.statusModal
            }));
        },
        showProductoDetalles: (productoId) => {
            const productoSeleccionado = productos.filter((producto) => {
                return producto.id === productoId
            })[0];
            set(() => ({
                productoSeleccionado: productoSeleccionado
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
