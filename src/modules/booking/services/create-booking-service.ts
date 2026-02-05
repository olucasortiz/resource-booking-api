import { ResourceRepository } from "../../resource/repositories/ResourceRepository.js";
import { UserRepository } from "../../user/repositories/user-repository.js";
import { BookingRepository } from "../repositories/booking-repository.js";
import type { CreateBookingInput } from '../schemas/create-booking-schema.js'

export class CreateBookingService{
    private bookingRepository = new BookingRepository()
    private userRepository = new UserRepository()
    private resourceRepository = new ResourceRepository()

    async execute(data: CreateBookingInput) {
        const userExists = await this.userRepository.findById(data.userId)
        const resourceExists = await this.resourceRepository.findById(data.resourceId)
        const conflict = await this.bookingRepository.findConflict({
            resourceId: data.resourceId,
            startAt: data.startAt,
            endAt: data.endAt
        })

        if(!userExists)
            throw new Error('User not found')   
        if(!resourceExists)
            throw new Error('User not found')
        if(conflict)
            throw new Error('Resource not found')
        return this.bookingRepository.create(data)
    }
}