import { FastifyInstance } from "fastify";
import { createBookingController } from "../controllers/booking-controller.js";
import { cancelBookingController } from "../controllers/cancel-booking-controller.js";
import { listBookingController } from "../controllers/list-booking-controller.js";
import { getBookingByIdController } from "../controllers/get-booking-by-id-controller.js";

export async function bookingRoutes(app: FastifyInstance){
    app.post('/bookings', createBookingController)
    app.patch('/bookings/:id/cancel', cancelBookingController)
    app.get('/bookings', listBookingController)
    app.get('/bookings/:id', getBookingByIdController)
}