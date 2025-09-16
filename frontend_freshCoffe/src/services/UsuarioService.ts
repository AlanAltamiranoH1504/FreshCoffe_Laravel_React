import type {FormRegistro, FormLogin} from "../types";
import {ClienteAxios} from "../axios/ClienteAxios.ts";
import {responseLoginUserAPI, responseLogoutAPI, responseRegisterUserAPI} from "../schemas/UsuariosSchemas.ts";

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
            return responseAPI.data;
        }
    } catch (e) {
        throw e;
    }
}

export async function logoutPOST(data: number) {
    try {
        const responseAPI = await ClienteAxios.post("/api/logout", data, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token_sanctum_freshcoffe"),
            }
            // withCredentials: true
        });
        const resultAPI = responseLogoutAPI.safeParse(responseAPI.data);
        if (resultAPI.success) {
            localStorage.removeItem("token_sanctum_freshcoffe");
        }
    } catch (e) {
        throw e;
    }
}