import {ClienteAxios} from "../axios/ClienteAxios.ts";
import {responseSavePedidoAPI} from "../schemas/PedidosSchemas.ts";

export async function savePedidoPOST(total: any) {
    try {
        const responseAPI = await ClienteAxios.post("/api/pedidos", total, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token_sanctum_freshcoffe")
            }
        });
        const resultAPI = responseSavePedidoAPI.safeParse(responseAPI.data);
        if (resultAPI.success) {
            console.log("1");
        }
    } catch (e) {
        throw e;
    }
}