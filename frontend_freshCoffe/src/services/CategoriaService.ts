import axios from "axios";
import {responseFindAllCategorias} from "../schemas/CategoriasSchemas.ts";

export async function findAllCategoriasGET() {
    try {
        const url = `http://127.0.0.1:8000/api/categorias`;
        const responseAPI = await axios.get(url);
        const resultAPI = responseFindAllCategorias.safeParse(responseAPI.data);
        if (resultAPI.success) {
            return resultAPI.data;
        }
    } catch (e) {
        throw e;
    }
}