import { Await } from "react-router-dom";
import {ClienteAxios} from "../axios/ClienteAxios.ts";
import {responseFindAllProductosAPI} from "../schemas/ProductosSchema.ts";
import { responseUpdateStatusProducAPI } from "../schemas/PedidosSchemas.ts";

export async function findAllProductosGET() {
    try {
        const token_sanctum = localStorage.getItem("token_sanctum_freshcoffe");
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

export async function findAllProductssGET() {
    try {
        const responseAPI = await ClienteAxios.get("/api/productos/get_all_products", {
            headers: {
            "Authorization": "Bearer " + localStorage.getItem("token_sanctum_freshcoffe")
            }
        });
        const resultAPI = responseFindAllProductosAPI.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
        return [];
    } catch (error) {
        throw error;
    }
}

export async function update_status_productPUT(id:number) {
    try {
        const requestBody = {
            id
        }
        const responseAPI = await ClienteAxios.put("/api/productos/update_product_status", requestBody, {
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("token_sanctum_freshcoffe")
            }
        });
        const resultAPI = responseUpdateStatusProducAPI.safeParse(responseAPI.data);
        if(resultAPI.success) {
            return resultAPI.data;
        }
    } catch (error) {
        throw error;
    }
    
}