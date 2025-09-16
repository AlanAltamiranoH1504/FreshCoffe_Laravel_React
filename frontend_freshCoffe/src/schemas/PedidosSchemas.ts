import {z} from "zod";

export const responseSavePedidoAPI = z.object({
    status: z.boolean(),
    message: z.string()
});

export const responseFindAllPedidosAPI = z.array(
    z.object({
        id: z.number(),
        user_id: z.number(),
        total: z.number(),
        status: z.number(),
        created_at: z.string()
    })
);

export const responseOrderCompletedPOST = z.object({
    status: z.boolean(),
    message: z.string()
});