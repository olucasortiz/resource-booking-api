import { FastifyReply, FastifyRequest } from "fastify"; 
import { ListResourceService } from "../services/list-resources-service.js";

//request e body
export async function ListResourceController(request : FastifyRequest, reply: FastifyReply){
    const service = new ListResourceService()
    const resource = await service.execute()

    return reply.send(resource)
}