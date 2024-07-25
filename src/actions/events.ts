import type { Event, EventRequest } from '@/components/create-event-dialog'
import { delay } from '@/lib/utils'
import { DateRange } from '@/types/misc'

export const getEvents = async (dateRange: DateRange) => {
  await delay(250)
  const events = JSON.parse(localStorage.getItem('events') || '[]') as Event[]

  const mappedEvents = events.map((event) => {
    const start = `${event.date}T${event.startTime}`
    const end = `${event.date}T${event.endTime}`
    return {
      id: event.id,
      title: event.name,
      start,
      end
    }
  })

  return mappedEvents.filter((event) => {
    return (
      dateRange.start <= new Date(event.start) &&
      dateRange.end >= new Date(event.end)
    )
  })
}

export const createEvent = async (event: EventRequest) => {
  await delay(500)
  const events = JSON.parse(localStorage.getItem('events') || '[]') as Event[]
  const newEvent: Event = {
    id: crypto.randomUUID(),
    ...event
  }
  localStorage.setItem('events', JSON.stringify([...events, newEvent]))
}
