import { FastifyReply, FastifyRequest } from "fastify";
import { CreateResourceService } from "../services/create-resource-service.js";
import { createResourceSchema } from "../schemas/create-resource-schema.js";

//request e body
export async function createResourceController(request : FastifyRequest, reply: FastifyReply){
    const data = createResourceSchema.parse(request.body)
    const service = new CreateResourceService()
    const resource = await service.execute(data)

    return reply.status(201).send(resource)
}