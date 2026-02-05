import { prisma } from '../../../infra/db/prisma.js'

export class ResourceRepository{
    create(data:{name: string, type:string}){
        return prisma.resource.create({data})
    }
    findMany(){
        return prisma.resource.findMany({orderBy:{createdAt:'desc'}})
    }
}