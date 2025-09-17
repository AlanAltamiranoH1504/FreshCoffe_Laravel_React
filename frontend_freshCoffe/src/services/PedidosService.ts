import {ClienteAxios} from "../axios/ClienteAxios.ts";
import {responseFindAllPedidosAPI, responseOrderCompletedPOST, responseSavePedidoAPI} from "../schemas/PedidosSchemas.ts";

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

export async function findAllPedidosGET() {
    try {
        const responseApi = await ClienteAxios.get("/api/pedidos", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token_sanctum_freshcoffe")
            }
        });
        const resultAPI = responseFindAllPedidosAPI.safeParse(responseApi.data);
        if(resultAPI.success) {
            return responseApi.data;
        }
        return [];
    } catch (error) {
        throw error;
    }
}

export async function orderCompletedPOST(id: number) {
    try {
        const requestBody = {
            id
        }
        const responseAPI = await ClienteAxios.post("/api/pedidos/set_order_completed", requestBody, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token_sanctum_freshcoffe")
            }
        });
        const resultAPI = responseOrderCompletedPOST.safeParse(responseAPI.data);
        if(resultAPI.success) {
            return responseAPI.data;
        }
    } catch (error) {
        throw error;
    }
}