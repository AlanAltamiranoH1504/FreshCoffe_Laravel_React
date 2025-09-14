import {z} from "zod";

export const responseFindAllProductosAPI = z.array(
    z.object({
        id: z.number(),
        nombre: z.string(),
        precio: z.number(),
        imagen: z.string(),
        disponible: z.number(),
        categoria_id: z.number()
    })
);