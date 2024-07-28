import { z } from 'zod'
import { date, time } from './_generics'

export const createEventSchema = z
  .object({
    name: z.string().max(255, 'Name must be less than 255 characters'),
    startTime: time,
    endTime: time,
    startDate: date,
    endDate: date.optional()
  })
  .refine(
    (data) =>
      new Date(`${data.startDate}T${data.startTime}`) <
      new Date(`${data.endDate ?? data.startDate}T${data.endTime}`),
    {
      message: 'End time must be after start time',
      path: ['endTime']
    }
  )
