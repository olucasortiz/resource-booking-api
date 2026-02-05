import { BookingRepository } from "../repositories/booking-repository.js"
export class ListBookingService{
    private bookingRepository = new BookingRepository()
    async execute(){
        return this.bookingRepository.findMany()
    }
}