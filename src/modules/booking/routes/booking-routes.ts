import { FastifyInstance } from "fastify";
import { createBookingController } from "../controllers/booking-controller.js";
export async function bookingRoutes(app: FastifyInstance){
    app.post('/bookings', createBookingController)
}