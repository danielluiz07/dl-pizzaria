import { z } from "zod";

export const createUserSchema = z.object({
    body: z.object({
        name: z.string( { message: "O nome precisa ser um texto" }).min(3, { message: "Precisa ter no minimo 3 letras" }),
        email: z.email( {message: "Precisa ser um email válido"}),
        password: z.string({message: "A senha é obrigatoria"}).min(6, {message: "A senha precisa ter no minimo 6 caracteres"})
    })
})

export const authUserSchema = z.object({
    body: z.object({
        email: z.email( {message: "Precisa ser um email válido"}),
        password: z.string ({message: "A senha é obrigatoria" }).min(1, {message: "A senha presica é obrigatoria"})       
    })
})
