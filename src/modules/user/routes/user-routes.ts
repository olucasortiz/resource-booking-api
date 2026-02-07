import { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/user-controller.js";
import { listUsersController } from "../controllers/list-user-controller.js";
export async function userRoutes(app: FastifyInstance){
app.post(
  "/users",
  {
    schema: {
      tags: ["User"],
      summary: "Create user",
      body: {
        type: "object",
        required: ["name", "email"],
        properties: {
          name: { type: "string" },
          email: { type: "string", format: "email" }
        },
        
      },
      response: {
        201: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            createdAt: { type: "string" },
            updatedAt: { type: "string" }
          },
        },
        409: {
          type: "object",
          properties: { message: { type: "string" } },
        }
      }
    }
  },
  createUserController
)
app.get("/users", listUsersController)

}