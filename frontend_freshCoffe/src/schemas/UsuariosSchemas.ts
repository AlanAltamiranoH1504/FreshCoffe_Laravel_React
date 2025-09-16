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