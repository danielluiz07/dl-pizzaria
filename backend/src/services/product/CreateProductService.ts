import { Readable } from "node:stream"
import prismaClient from "../../prisma/index"
import cloudinary from "../../config/cloudinary"

interface CreateProductServiceProps{
    name: string, 
    price: number, 
    description: string,
    category_id: string,
    imageBuffer: Buffer,
    imageName: string
}
class CreateProductService{
    async execute({name, price, description, category_id, imageBuffer, imageName}: CreateProductServiceProps){

        const categoryExists = await prismaClient.category.findFirst({
            where:{
                id: category_id
            }
        })

        if(!categoryExists){
            throw new Error("Categoria nao encontrada!")
        }

        //Enviar para o cloudinary, salvar a imagem e pagar a url

        let bannerUrl = ""
        try {
            
            const result = await new Promise<any>((resolve, reject)=>{
                const uploadStream = cloudinary.uploader.upload_stream({
                    folder:"products",
                    resource_type: "image",
                    public_id: `${Date.now()}-${imageName.split(".")[0]}`
                }, (error, result)=>{
                    if(error) reject(error)
                    else resolve(result)
                })

            //Criar o stream de buffer e fazer pipe para o cloudinary
            const bufferStream = Readable.from(imageBuffer)
            bufferStream.pipe(uploadStream)

            })

            console.log(result)
        } catch (error) {
            throw new Error("Erro ao fazer upload da imagem!")
        }

        //salvar a URL da Imagem e os dados no banco como um novo produto


        return "Produto Criado"
    }
}

export {CreateProductService}