import { BookingRepository } from "../repositories/booking-repository.js";

export class GetBookingByIdService {
    private bookingRepository = new BookingRepository()
    async execute(id:string){
        const booking = await this.bookingRepository.findById(id)
        if(!booking)
            throw new Error("Booking not found")
        return booking
    }
}