import { FastifyInstance } from "fastify";
import { createBookingController } from "../controllers/booking-controller.js";
import { cancelBookingController } from "../controllers/cancel-booking-controller.js";
export async function bookingRoutes(app: FastifyInstance){
    app.post('/bookings', createBookingController)
    app.patch('/bookings/:id/cancel', cancelBookingController)
    app.get('/bookings', createBookingController)
}