import type {Producto, ProductoToAddInOrden} from "../types";
import {formatoMoneda} from "../utils";
import {useAppStore} from "../store/useAppStore.tsx";
import {toast} from "react-toastify";

type ResumenProductoProps = {
    producto: ProductoToAddInOrden
}
const ResumenProducto = ({producto}: ResumenProductoProps) => {
    const {deleteOrdenProducto, incrementProductoQuantity} = useAppStore();
    function removeProducto(imgProducto: Producto["imagen"]) {
        deleteOrdenProducto(imgProducto);
        toast.warning("Producto eliminado de la orden");
    }

    function incrementarCantidadProducto(producto: ProductoToAddInOrden) {
        incrementProductoQuantity(producto);
        toast.info("Cantidad aumentada correctamente");
    }

    return (
        <>
            <div className="shadow space-y-1 p-4 bg-white">
                <div className="space-y-2">
                    <p className="text-xl font-bold">{producto.nombre}</p>
                    <p className="text-lg font-bold ">Cantidad: {producto.cantidad}</p>
                    <p className="text-lg font-bold text-amber-500">
                        Precio: {formatoMoneda(producto.precio)}
                    </p>
                    <p className="text-lg text-gray-700">
                        Subtotal: {formatoMoneda(producto.total)}
                    </p>
                </div>

                <div className="flex justify-between gap-2 pb-4">
                    <button
                        type="button"
                        onClick={() => {
                            incrementarCantidadProducto(producto)
                        }}
                        className="bg-sky-700 p-2 text-white rounded-md font-bold uppercase shadow-md text-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            removeProducto(producto.imagen)
                        }}
                        className="bg-red-700 p-2 text-white rounded-md font-bold uppercase shadow-md text-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}
export default ResumenProducto;