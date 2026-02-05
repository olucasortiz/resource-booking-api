import { BookingRepository } from '../repositories/booking-repository.js'
import type { CancelBookingInput } from '../schemas/cancel-booking-schema.js'

export class CancelBookingService {
  private bookingRepository = new BookingRepository()

  async execute(data: CancelBookingInput) {
    const booking = await this.bookingRepository.findById(data.id)

    if (!booking) {
      throw new Error('Booking not found')
    }

    if (booking.status === 'CANCELED') {
      throw new Error('Booking already canceled')
    }

    return this.bookingRepository.cancel(data.id)
  }
}
