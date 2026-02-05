import { z } from 'zod'

export const ListBookingSchema = z.object({
  id: z.string().cuid()
})

export type ListBookingInput = z.infer<typeof ListBookingSchema>
