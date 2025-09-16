import { useQuery, useQueryClient } from "@tanstack/react-query"
import { findAllPedidosGET } from "../../services/PedidosService"
import { formatoMoneda } from "../../utils";
import { useEffect } from "react";
import { useAppStore } from "../../store/useAppStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CocinaView() {
    const {orderCompleted} = useAppStore();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {data, isLoading, isError} = useQuery({
        queryKey: ["findAllPedidos"],
        queryFn: () => findAllPedidosGET(),
        retry: false,
        refetchOnWindowFocus: false
    });
    useEffect(() => {
        if (data) {
            // console.log(1);
        }
    }, [data]);
    if(isLoading) {
        return <div>Cargando...</div>
    }

    if(isError) {
        navigate("/auth/login");
    }
  return (
    <>
        <div className="mx-5">
            <h1 className="text-4xl font-fjalla mt-5">Ordenes</h1>
            <p className="text-2xl my-10 font-fjalla">Administra las ordenes desde aqui</p>

            <div className="grid grid-cols-2">
                {data.length > 0 ? (
                    data.map((pedido) => (
                    <div key={pedido.id} className="p-5 bg-white shadow space-y-2 border-b">
                        <p className="font-fjalla text-xl text-center text-slate-600">Contenido del Pedido</p>
                        <p className="font-fjalla"># Orden: {pedido.id}</p>
                        <p className="font-fjalla">Cliente: {pedido.nombre}</p>
                        <p className="font-fjalla text-amber-400">Total: {formatoMoneda(pedido.total)}</p>
                        {pedido.pedidos_productos?.map((producto) => (
                            <div key={producto.id} className="border-b font-fjalla border-b-slate-200 last-of-type:border-none py-4">
                                <p className="text-sm">ID: {producto.id}</p>
                                <p className="text-sm">{producto.producto.nombre}</p>
                                <p>Cantidad: {producto.cantidad}</p>
                                <p>$ Precio x Unidad: {formatoMoneda(producto.producto.precio)}</p>
                            </div>
                        ))}
                        <div className="flex justify-center">
                            <button
                            onClick={() => {
                                orderCompleted(pedido.id);
                                queryClient.invalidateQueries({
                                    queryKey: ["findAllPedidos"]
                                });
                                toast.success("Orden completada con exito");
                            }}
                            type="button"
                            className="px-12 py-3 border bg-amber-950 text-white font-fjalla rounded-lg hover:bg-amber-600 cursor-pointer transition-colors duration-500"
                            >Marcar como Completado</button>
                        </div>
                        
                    </div>
                ))
                ) : (
                    <p className="text-lg font-fjalla">No existen pedidos pendientes por el momento</p>
                )}
            </div>
        </div>
    </>
  )
}
