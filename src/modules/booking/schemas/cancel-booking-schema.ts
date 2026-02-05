import { z } from 'zod'

export const cancelBookingSchema = z.object({
  id: z.string().cuid()
})

export type CancelBookingInput = z.infer<typeof cancelBookingSchema>
