import { z } from 'zod'

export const createBookingSchema = z.object({
  userId: z.string().cuid(),
  resourceId: z.string().cuid(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date()
})
  .refine((data)=> data.endAt > data.startAt,{
    message: 'endAt must be after startAt',
    path: ['endAt']

})
  .refine((data) => !Number.isNaN(data.startAt.getTime()), {
    message: "startAt must be a valid date",
    path: ["startAt"],
  })
  .refine((data) => !Number.isNaN(data.endAt.getTime()), {
    message: "endAt must be a valid date",
    path: ["endAt"],
  })

export type CreateBookingInput = z.infer<typeof createBookingSchema>
