import { FastifyBaseLogger, FastifyInstance } from "fastify";
import { createResourceController } from "../controllers/resource-controller.js";
import { CreateResourceService } from "../services/create-resource-service.js";
import { ListResourceController } from "../controllers/list-resource-controller.js";

export async function resourceRoutes(app: FastifyInstance){
    app.post('/resources', createResourceController)
    app.get('/resources', ListResourceController)
}