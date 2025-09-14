import type {FormRegistro, FormLogin} from "../types";
import {ClienteAxios} from "../axios/ClienteAxios.ts";
import {responseLoginUserAPI, responseRegisterUserAPI} from "../schemas/UsuariosSchemas.ts";

export async function registerUsuarioPOST(data: FormRegistro) {
    try {
        const responseAPI = await ClienteAxios.post("/api/usuarios", data);
        const resultAPI = responseRegisterUserAPI.safeParse(responseAPI.data);
        if (resultAPI.success) {
            console.log("1");
        }
    } catch (e) {
        throw e;
    }
}

export async function loginUsuarioPOST(data: FormLogin) {
    try {
        const responseAPI = await ClienteAxios.post("/api/usuarios/get_token", data);
        const resultAPI = responseLoginUserAPI.safeParse(responseAPI.data);
        if (resultAPI.success) {
            localStorage.setItem("token_sanctum_freshcoffe", resultAPI.data.token);
        }
    } catch (e) {
        throw e;
    }
}