import type { Event } from '@/components/create-event-dialog'
import { delay } from '@/lib/utils'

export const createEvent = async (event: Event) => {
  await delay(500)
  const events = JSON.parse(
    localStorage.getItem('events') || '[]'
  ) as FormData[]
  localStorage.setItem('events', JSON.stringify([...events, event]))
}
