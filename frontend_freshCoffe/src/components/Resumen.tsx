import {useAppStore} from "../store/useAppStore.tsx";
import {formatoMoneda} from "../utils";
import {useEffect} from "react";
import ResumenProducto from "./ResumenProducto.tsx";
import {useMutation} from "@tanstack/react-query";
import {savePedidoPOST} from "../services/PedidosService.ts";
import {toast} from "react-toastify";
import { logoutPOST } from "../services/UsuarioService.ts";
import { useNavigate } from "react-router-dom";

const Resumen = () => {
    const {productosDeOrden, resetPedido} = useAppStore();
    const navigate = useNavigate();
    const costoTotalPedido = productosDeOrden.reduce((acumulador, producto) => {
        return acumulador = acumulador + producto.total;
    }, 0);

    function savePedido(e: { preventDefault: () => void; }) {
        e.preventDefault();
        savePedidoMutation.mutate({
            total: costoTotalPedido,
            productos: productosDeOrden
        });
    }

    const savePedidoMutation = useMutation({
        mutationKey: ["savePedido"],
        mutationFn: savePedidoPOST,
        onSuccess: () => {
            toast.success("Pedido solicitado correctamente. Espera algunos minutos!");
            resetPedido();
            // logoutMutation.mutate(1);
        },
        onError: err => {
            // @ts-ignore
            toast.error(err.response.data.message);
        }
    });

    const logoutMutation = useMutation({
        mutationKey: ["logoutPostPedido"],
        mutationFn: logoutPOST,
        onSuccess: () => {
            navigate("/auth/login")
        }
    });

    useEffect(() => {

    }, [productosDeOrden]);
    return (
        <>
            <aside className="w-72 h-screen overflow-y-scroll p-5">
                <h1 className="text-3xl font-fjalla text-center">Mi Pedido</h1>
                <p className="text-lg my-5 text-center font-semibold text-amber-900">
                    Aqui podras ver el resumen y totales de tu pedido
                </p>
                <div className="py-10">
                    {productosDeOrden.length === 0 ? (
                        <h2 className="text-center text-2xl font-semibold">Pedido Vacio</h2>
                    ) : (
                        productosDeOrden.map((producto) => (
                            <ResumenProducto
                                producto={producto}
                            />
                        ))
                    )}
                </div>
                {productosDeOrden.length > 0 ? (
                    <>
                        <p className="text-3xl text-amber-500 font-fjalla text-center">Total {formatoMoneda(costoTotalPedido)}</p>
                        <form className="w-full"
                              onSubmit={savePedido}
                        >
                            <div className="mt-5 flex justify-center">
                                <input type="submit" value="Realizar pedido"
                                       className="bg-amber-950 text-white text-center py-2 w-full rounded-lg font-fjalla hover:bg-amber-800 transition-colors duration-500 cursor-pointer"/>
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                    </>
                )}
            </aside>
        </>
    );
}
export default Resumen;