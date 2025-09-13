import {z} from "zod";

export const responseFindAllCategorias = z.object({
    status: z.boolean(),
    total: z.number(),
    categorias: z.array(
        z.object({
            id: z.number(),
            nombre: z.string(),
            icono: z.string(),
        })
    )
});