import {z} from "zod";

export const responseSavePedidoAPI = z.object({
    status: z.boolean(),
    message: z.string()
});