import { delay } from '@/lib/utils'
import { DateRange } from '@/types/misc'
import type { Event } from '@/components/create-event-dialog'

export const getEvents = async (dateRange: DateRange) => {
  await delay(250)
  const events = JSON.parse(localStorage.getItem('events') || '[]') as Event[]

  const mappedEvents = events.map((event) => {
    const start = `${event.date}T${event.startTime}`
    const end = `${event.date}T${event.endTime}`
    return {
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
