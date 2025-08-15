import type {Producto} from "../../types";
import {formatoMoneda} from "../../utils";
import {toast} from "react-toastify";

type ProductoDetallesProps = {
    producto: Producto
}
const ProductoDetalles = ({producto}: ProductoDetallesProps) => {
    return (
        <>
            <div className="border p-3 shadow bg-white">
                <img
                    alt={`Imagen de producto ${producto.nombre}`}
                    src={`/img/${producto.imagen}.jpg`}
                    className="w-full"
                />
                <div className="p-5">
                    <h3 className="text-2xl font-fjalla text-center">{producto.nombre}</h3>
                    <p className="font-fjalla mt-5 text-4xl text-amber-500 text-center">{formatoMoneda(producto.precio)}</p>
                </div>

                <button
                    onClick={() => {
                        toast.success("Producto agregado a la orden!");
                    }}
                    className="p-2 border rounded-lg bg-amber-950 text-center text-white w-full hover:bg-amber-800 transition-colors duration-500 uppercase font-fjalla text-lg"
                    type="button">Agregar a Orden</button>
            </div>
        </>
    );
}
export default ProductoDetalles;