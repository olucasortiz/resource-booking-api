import { FastifyInstance } from "fastify";
import { createBookingController } from "../controllers/booking-controller.js";
import { cancelBookingController } from "../controllers/cancel-booking-controller.js";
import { listBookingController } from "../controllers/list-booking-controller.js";
import { getBookingByIdController } from "../controllers/get-booking-by-id-controller.js";

export async function bookingRoutes(app: FastifyInstance){
    app.post(
  "/bookings",
  {
    schema: {
      tags: ["Booking"],
      summary: "Create booking",
      body: {
        type: "object",
        required: ["userId", "resourceId", "startAt", "endAt"],
        properties: {
          userId: { type: "string" },
          resourceId: { type: "string" },
          startAt: { type: "string", format: "date-time" },
          endAt: { type: "string", format: "date-time" }
        },
      },
      response: {
        201: {
          type: "object",
          properties: {
            id: { type: "string" },
            userId: { type: "string" },
            resourceId: { type: "string" },
            startAt: { type: "string" },
            endAt: { type: "string" },
            status: { type: "string" },
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
  createBookingController
)

//-------

    app.patch(
  "/bookings/:id/cancel",
  {
    schema: {
      tags: ["Booking"],
      summary: "Cancel booking",
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "string" }
        },
       
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "string" },
            userId: { type: "string" },
            resourceId: { type: "string" },
            startAt: { type: "string" },
            endAt: { type: "string" },
            status: { type: "string" },
            createdAt: { type: "string" },
            updatedAt: { type: "string" }
          },
          
        },
        404: {
          type: "object",
          properties: { message: { type: "string" } },
        },
        409: {
          type: "object",
          properties: { message: { type: "string" } },
          
        }
      }
    }
  },
  cancelBookingController
)
//-------
    app.get(
  "/bookings",
  {
    schema: {
      tags: ["Booking"],
      summary: "List bookings",
      response: {
        200: {
          type: "object",
          properties: {
            bookings: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  startAt: { type: "string" },
                  endAt: { type: "string" },
                  status: { type: "string" },
                  user: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      name: { type: "string" }
                    }
                  },
                  resource: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      name: { type: "string" },
                      type: { type: "string" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  listBookingController
)

//-------
    app.get(
  "/bookings/:id",
  {
    schema: {
      tags: ["Booking"],
      summary: "Get booking by id",
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "string" }
        },
        
      },
      response: {
        200: {
          type: "object",
          properties: {
            booking: {
              type: "object",
              properties: {
                id: { type: "string" },
                userId: { type: "string" },
                resourceId: { type: "string" },
                startAt: { type: "string" },
                endAt: { type: "string" },
                status: { type: "string" },
                createdAt: { type: "string" },
                updatedAt: { type: "string" },
                user: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    name: { type: "string" }
                  }
                },
                resource: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    name: { type: "string" },
                    type: { type: "string" }
                  }
                }
              }
            }
          },
        },
        404: {
          type: "object",
          properties: { message: { type: "string" } },
          
        }
      }
    }
  },
  getBookingByIdController
)

    
}