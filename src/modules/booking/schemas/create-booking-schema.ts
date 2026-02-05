import { z } from 'zod'

export const createBookingSchema = z.object({
  userId: z.string().cuid(),
  resourceId: z.string().cuid(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date()
})
.refine((data)=> data.endAt > data.startAt,{
    message: 'endAt must be afeter startAt',
    path: ['endAt']

})

export type CreateBookingInput = z.infer<typeof createBookingSchema>
