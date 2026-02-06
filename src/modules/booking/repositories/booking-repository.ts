import { ok } from "node:assert";
import { prisma } from "../../../infra/db/prisma.js";
import { includes } from "zod";

export class BookingRepository{
    create(data:{userId:string, resourceId:string, startAt:Date, endAt: Date}){
        return prisma.booking.create({data})
    }

    findConflict(params: {resourceId : string, startAt: Date, endAt: Date}){
        const {resourceId, startAt, endAt} = params
        return prisma.booking.findFirst({
            where:{
                resourceId,
                status: 'CONFIRMED',
                startAt: {lt:endAt}, //lt - less then -    (<)
                endAt: {gt:startAt} //gt - greater then -  (>)
            }
        })
    }

    findById(id: string) {
        return prisma.booking.findUnique({
        where: { id },
        include: {
        user: {
            select: {
            id: true,
            name: true,
            },
        },
        resource: {
            select: {
            id: true,
            name: true,
            type: true,
            },
        },
        },
        });
    }

    findMany(){
        return prisma.booking.findMany({orderBy: {startAt: 'desc'}, include: {
            user:{
                select:{
                    id:true, 
                    name:true
                }
            },
            resource:{
                select:{
                    id:true,
                    name:true, 
                    type:true
                }
            }
        }})
    }

    cancel(id: string){
        return prisma.booking.update({where: {id}, data:{status : 'CANCELED'}})
    }
}