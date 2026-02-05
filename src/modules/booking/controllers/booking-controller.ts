import { FastifyReply, FastifyRequest } from "fastify";
import { createBookingSchema } from "../schemas/create-booking-schema.js";
import { CreateBookingService } from "../services/create-booking-service.js";

export async function createBookingController(request:FastifyRequest, reply:FastifyReply){
    const data = createBookingSchema.parse(request.body)
    const service = new CreateBookingService()
    const booking = await service.execute(data) // await por conta do async
    return reply.status(201).send(booking)
}