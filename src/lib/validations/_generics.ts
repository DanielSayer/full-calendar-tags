import { z } from 'zod'

export const time = z
  .string()
  .regex(new RegExp(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/), 'Invalid time')

export const date = z
  .string()
  .regex(new RegExp(/^\d{4}-\d{2}-\d{2}$/), 'Invalid date')
