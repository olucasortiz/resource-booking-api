import { FastifyReply, FastifyRequest } from "fastify";
import { GetBookingByIdService } from "../services/get-booking-by-id-service.js";
import { bookingIdParamsSchema } from  "../schemas/booking-id-params-schema.js"

export async function getBookingByIdController(request:FastifyRequest, reply:FastifyReply){
    const data = bookingIdParamsSchema.parse(request.params)
    const service = new GetBookingByIdService()
    const booking = await service.execute(data.id) // await por conta do async
    return reply.status(200).send({booking})
}