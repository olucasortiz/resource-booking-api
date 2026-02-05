import { FastifyInstance } from "fastify";
import { BookingController } from "../controllers/booking-controller.js";

export async function bookingRoutes(app: FastifyInstance){
    app.post('/booking', BookingController)
}