import { prisma } from "../../../infra/db/prisma.js";
import { ResourceRepository } from "../../resource/repositories/resource-repository.js";
import { UserRepository } from "../../user/repositories/user-repository.js";
import { BookingRepository } from "../repositories/booking-repository.js";
import type { CreateBookingInput } from '../schemas/create-booking-schema.js'
export class CreateBookingService{
    private userRepository = new UserRepository()
    private resourceRepository = new ResourceRepository()

    async execute(data: CreateBookingInput) {
        const userExists = await this.userRepository.findById(data.userId)
        const resourceExists = await this.resourceRepository.findById(data.resourceId)
        //const conflict = await this.bookingRepository.findConflict({
        //    resourceId: data.resourceId,
        //    startAt: data.startAt,
        //    endAt: data.endAt
        //})

        if(!userExists)
            throw new Error('User not found')   
        if(!resourceExists)
            throw new Error('Resource not found')
        //if(conflict)
        //    throw new Error('Booking conflict')
        //return this.bookingRepository.create(data)
        //transaction 
       return prisma.$transaction(async(tx)=>{
            const conflict = await tx.booking.findFirst({
                where: {
                    resourceId: data.resourceId,
                    status: "CONFIRMED",
                    startAt: {lt: data.endAt},
                    endAt: {gt: data.startAt}   
                }
            })
            if (conflict) throw new Error("Booking conflict")
            return tx.booking.create({
                data:{
                    userId: data.userId,
                    resourceId: data.resourceId,
                    startAt: data.startAt,
                    endAt: data.endAt
                }
        })
       })
    }
}