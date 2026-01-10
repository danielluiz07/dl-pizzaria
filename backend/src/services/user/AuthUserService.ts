import { compare } from "bcryptjs"
import prismaClient from "../../prisma/index"
import { sign } from "jsonwebtoken"

interface AuthUserServiceProps{
    email: String, 
    password: String
}

export class AuthUserService{
    async execute({email, password}: AuthUserServiceProps){
        console.log({email, password})
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            throw new Error("Email/Senha é obrigatório")
        }


        // Verificar se a senha esta corrtea
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Email/Senha é obrigatorio")
        }

        // Gerar Token JWT
        const token = sign({
            name: user.name,
            email: user.email
        }, process.env.JWT_SECRET as string, {
            subject:user.id,
            expiresIn: "30d"
        })
        
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token
        }
    }
}