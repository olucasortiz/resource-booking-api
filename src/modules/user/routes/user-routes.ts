import { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/user-controller.js";

export async function userRoutes(app: FastifyInstance){
    app.post('/users',createUserController)
}