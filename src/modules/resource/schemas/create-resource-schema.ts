import { z } from 'zod'

export const createResourceSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters'),
  type: z.string().min(2, 'Type must have at least 2 characters'),
})

export type CreateResourceInput = z.infer<typeof createResourceSchema>
