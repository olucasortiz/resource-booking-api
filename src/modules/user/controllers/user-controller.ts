import { CreateUserService } from "../services/create-user-service.js";
import { createUserSchema } from "../schemas/create-user-schema.js";
import { FastifyRequest, FastifyReply } from "fastify";

export async function createUserController(    request: FastifyRequest, reply: FastifyReply){
    const data = createUserSchema.parse(request.body)
    const service = new CreateUserService()
    const user = await service.execute(data)

    return reply.status(201).send(user)
}