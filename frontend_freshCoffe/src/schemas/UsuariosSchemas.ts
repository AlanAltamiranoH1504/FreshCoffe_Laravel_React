import {z} from "zod";

export const responseRegisterUserAPI = z.object({
    status: z.boolean(),
    message: z.string()
});

export const responseLoginUserAPI = z.object({
    status: z.boolean(),
    token: z.string(),
    expiration: z.string(),
    admin: z.number()
});

export const responseLogoutAPI = z.object({
    status: z.boolean(),
});

export const responseUserInSession = z.object({
    status: z.boolean(),
    user: z.object({
        id: z.number(),
        name: z.string(),
        apellidos: z.string(),
        email: z.string(),
        email_verified_at: null,
        created_at: z.string(),
        updated_at: z.string(),
        admin: z.number()
    })
});