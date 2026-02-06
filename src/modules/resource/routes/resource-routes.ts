import { FastifyBaseLogger, FastifyInstance } from "fastify";
import { createResourceController } from "../controllers/resource-controller.js";
import { ListResourceController } from "../controllers/list-resource-controller.js";

export async function resourceRoutes(app: FastifyInstance){
    app.post(
  "/resources",
  {
    schema: {
      tags: ["Resource"],
      summary: "Create resource",
      body: {
        type: "object",
        required: ["name", "type"],
        properties: {
          name: { type: "string" },
          type: { type: "string" }
        },
      },
      response: {
        201: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            type: { type: "string" },
            createdAt: { type: "string" },
            updatedAt: { type: "string" }
          },
          
        }
      }
    }
  },
  createResourceController
)

    app.get(
  "/resources",
  {
    schema: {
      tags: ["Resource"],
      summary: "List resources",
      response: {
        200: {
          type: "object",
          properties: {
            resources: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  type: { type: "string" },
                  createdAt: { type: "string" },
                  updatedAt: { type: "string" }
                }
              }
            }
          },
        
        }
      }
    }
  },
  ListResourceController
)

}