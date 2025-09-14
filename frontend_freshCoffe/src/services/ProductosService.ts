import {ClienteAxios} from "../axios/ClienteAxios.ts";
import {responseFindAllProductosAPI} from "../schemas/ProductosSchema.ts";

export async function findAllProductosGET() {
    try {
        const token_sanctum = localStorage.getItem("token_sanctum_freshcoffe")
        const responseAPI = await ClienteAxios.get("/api/productos", {
            headers: {
                "Authorization": "Bearer " + token_sanctum
            }
        });
        const resultAPI = responseFindAllProductosAPI.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
        return [];
    } catch (e) {
        throw e;
    }
}