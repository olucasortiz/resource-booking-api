import { FastifyReply, FastifyRequest } from "fastify";

export async function BookingController(request:FastifyRequest, reply:FastifyReply){
    const data = request.body
    return reply.send(data)
}