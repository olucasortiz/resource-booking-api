import { FastifyReply, FastifyRequest } from "fastify";
import { ListBookingService } from "../services/list-bookings-service.js";

export async function listBookingController(request:FastifyRequest, reply:FastifyReply){
    const service = new ListBookingService()
    const bookings = await service.execute() // await por conta do async
    return reply.status(200).send({bookings})
}