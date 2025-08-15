import {create} from "zustand";
import {devtools} from "zustand/middleware";
import type {Categoria, Producto} from "../types";
import {productos} from "../data/Productos.ts";

type AppState = {
    productosFiltrados: Producto[];
    categoriaSeleccionada: number;
    addCategoria: (categoriaId: Categoria["id"]) => void;
};

export const useAppStore = create<AppState>()(
    devtools((set) => ({
        productosFiltrados: [],
        categoriaSeleccionada: 0,
        addCategoria: (categoriaId) => {
            const productosFiltrados: Producto[] = productos.filter((producto) => {
                return producto.categoria_id === categoriaId
            });
            set(() => ({
                categoriaSeleccionada: categoriaId,
                productosFiltrados: productosFiltrados
            }));
        },
    }))
);
