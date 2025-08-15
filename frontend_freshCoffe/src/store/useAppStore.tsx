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
            set((state) => ({
                ...state,
                productosDeOrden: [...state.productosDeOrden, producto]
            }))
        }
    }))
);
