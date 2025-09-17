import {create} from "zustand";
import {devtools} from "zustand/middleware";
import type {Categoria, Producto, ProductoToAddInOrden} from "../types";
import {findAllProductosGET, findAllProductssGET, update_status_productPUT} from "../services/ProductosService.ts";
import { logoutPOST } from "../services/UsuarioService.ts";
import { orderCompletedPOST } from "../services/PedidosService.ts";
import { id } from "zod/locales";

type AppState = {
    productos: Producto[]
    products: Producto[],
    productosFiltrados: Producto[];
    categoriaSeleccionada: number;
    statusModal: boolean;
    productoSeleccionado: Producto | null;
    productosDeOrden: ProductoToAddInOrden[]

    getProductos: () => Promise<void>;
    getAllProducts: () => Promise<void>,
    addCategoria: (categoriaId: Categoria["id"]) => void;
    showModal: () => void;
    showProductoDetalles: (productoId: Producto["id"]) => void;
    addProductoInOrden: (producto: ProductoToAddInOrden) => void;
    deleteOrdenProducto: (productoId: Producto["imagen"]) => void;
    incrementProductoQuantity: (producto: ProductoToAddInOrden) => void;
    resetPedido: () => void;
    logout: () => Promise<void>;
    orderCompleted: (productoId: Producto["id"]) => Promise<void>;
    updateStatusProduct: (productId: Producto["id"]) => Promise<void>
};

export const useAppStore = create<AppState>()(
    devtools((set) => ({
        productos: [],
        products: [],
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
        getAllProducts: async () => {
            const products = await findAllProductssGET();
            set({
                products: products
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
        },
        resetPedido: () => {
            set((state) => {
                return {productosDeOrden: []}
            })
        },
        logout: async () => {
            const salida = await logoutPOST(1);
        },
        orderCompleted: async (idOrden) => {
            await orderCompletedPOST(idOrden);
        },
        updateStatusProduct: async (idProduct) => {
            await update_status_productPUT(idProduct);
            const products = await findAllProductosGET();
            set({
                products
            });
        }
    }))
);
