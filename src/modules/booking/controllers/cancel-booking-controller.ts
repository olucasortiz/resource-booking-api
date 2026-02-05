import { FastifyReply, FastifyRequest } from 'fastify'
import { cancelBookingSchema } from '../schemas/cancel-booking-schema.js'
import { CancelBookingService } from '../services/cancel-booking-service.js'

export async function cancelBookingController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const data = cancelBookingSchema.parse(request.params)

  const service = new CancelBookingService()
  const booking = await service.execute(data)

  return reply.send(booking) // 200 OK
}
