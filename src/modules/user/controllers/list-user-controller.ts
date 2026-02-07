import { FastifyReply, FastifyRequest } from "fastify"
import { ListUsersService } from "../services/list-users-service.js"

export async function listUsersController(request: FastifyRequest, reply: FastifyReply) {
  const service = new ListUsersService()
  const users = await service.execute()
  return reply.status(200).send({ users })
}