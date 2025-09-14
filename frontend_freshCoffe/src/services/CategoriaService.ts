import axios from "axios";
import {responseFindAllCategorias} from "../schemas/CategoriasSchemas.ts";

export async function findAllCategoriasGET() {
    try {
        const url = `http://127.0.0.1:8000/api/categorias`;
        const token_sanctum = localStorage.getItem("token_sanctum_freshcoffe");
        const responseAPI = await axios.get(url, {
            headers: {
                "Authorization": "Bearer " + token_sanctum
            }
        });
        const resultAPI = responseFindAllCategorias.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
    } catch (e) {
        throw e;
    }
}