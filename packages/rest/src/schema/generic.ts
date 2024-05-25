import { z } from 'zod'

/**
 * Schema used when a success response should be
 * treated as file download.
 */
export const downloadSchema = z.object({
  name: z.string().min(1),
  data: z.instanceof(Buffer),
})
