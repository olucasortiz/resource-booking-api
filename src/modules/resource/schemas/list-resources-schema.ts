import { z } from 'zod'

export const createResourceSchema = z.object({
})

export type CreateResourceInput = z.infer<typeof createResourceSchema>
