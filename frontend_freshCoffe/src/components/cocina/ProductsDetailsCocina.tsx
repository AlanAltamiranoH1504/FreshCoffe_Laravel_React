import { toast } from "react-toastify"
import type { Producto } from "../../types"
import { formatoMoneda } from "../../utils"
import { useMutation} from "@tanstack/react-query"
import { update_status_productPUT } from "../../services/ProductosService"
import { useNavigate } from "react-router-dom"

type ProductsDetailsCocinaProps = {
    producto: Producto
}
export default function ProductsDetailsCocina({producto}: ProductsDetailsCocinaProps) {
    const navigate = useNavigate();
    function update_status_product_function(id: number) {
        updateStatusProductMutation.mutate(id);
    }
    const updateStatusProductMutation = useMutation({
        mutationKey: ["updateStatusProduct"],
        mutationFn: update_status_productPUT,
        onSuccess: () => {
            toast.info("Estado de producto actualizado");
            navigate("/cocina/ordenes");
        },
        onError: () => {
            toast.error("Error en actualizacion de estado de producto");
        }
    })
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
                        update_status_product_function(producto.id);
                    }}
                    className={producto.disponible === 1 ? "p-2 border rounded-lg bg-green-600 text-center text-white w-full hover:bg-green-700 transition-colors duration-500 uppercase font-fjalla text-lg" : "p-2 border rounded-lg bg-red-600 text-center text-white w-full hover:bg-red-700 transition-colors duration-500 uppercase font-fjalla text-lg"}
                    type="button">{producto.disponible === 1 ? "Disponible" : "No disponible"}</button>
            </div>
    </>
  )
}
