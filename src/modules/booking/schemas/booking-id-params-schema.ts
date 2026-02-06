import { z } from 'zod'

export const bookingIdParamsSchema = z.object({
  id: z.string().cuid()
})

export type BookingIdParamsSchema = z.infer<typeof bookingIdParamsSchema>
