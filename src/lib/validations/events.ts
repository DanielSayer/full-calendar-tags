import { z } from 'zod'
import { date, time } from './_generics'

export const createEventSchema = z.object({
  name: z.string().max(255, 'Name must be less than 255 characters'),
  startTime: time,
  endTime: time,
  date: date
})
