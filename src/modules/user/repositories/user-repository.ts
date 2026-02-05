import { prisma } from '../../../infra/db/prisma.js'

export class UserRepository{
    findByEmail(email : string){
        return prisma.user.findUnique({
            where:{email},
        })
    }

    findById(id : string){
        return prisma.user.findUnique({
            where:({id})
        })
    }
    create(data:{name:string,email:string}){
        return prisma.user.create({data})
    }
}