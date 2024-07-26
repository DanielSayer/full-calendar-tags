import type { EventRequest } from '@/components/create-event-dialog'
import { delay } from '@/lib/utils'
import { DateRange } from '@/types/misc'
import { getTags } from './tags'
import { Tag } from '@/components/tags-sheet'

export type Event = {
  id: string
  name: string
  start: string
  end: string
  tags: Tag[]
}

export const getEvents = async (dateRange: DateRange) => {
  await delay(250)
  const events = JSON.parse(localStorage.getItem('events') || '[]') as Event[]

  return events.filter((event) => {
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
    name: event.name,
    start: `${event.date}T${event.startTime}`,
    end: `${event.date}T${event.endTime}`,
    tags: []
  }
  localStorage.setItem('events', JSON.stringify([...events, newEvent]))
}

export const addTagToEvent = async (eventId: string, tagId: string) => {
  await delay(250)
  const events = JSON.parse(localStorage.getItem('events') || '[]') as Event[]
  const event = events.find((e) => e.id === eventId)
  if (!event) {
    throw Error('Event not found')
  }
  if (event.tags.map((t) => t.id).includes(tagId)) {
    throw Error('Tag already added to event')
  }
  const tags = await getTags()
  const tag = tags.find((t) => t.id === tagId)
  if (!tag) {
    throw Error('Tag not found')
  }
  event.tags.push(tag)
  localStorage.setItem('events', JSON.stringify(events))
}

export const removeTagFromEvent = async (eventId: string, tagId: string) => {
  await delay(250)
  const events = JSON.parse(localStorage.getItem('events') || '[]') as Event[]
  const event = events.find((e) => e.id === eventId)
  if (!event) {
    throw Error('Event not found')
  }

  const updatedTags = event.tags.filter((t) => t.id !== tagId)
  event.tags = updatedTags
  localStorage.setItem('events', JSON.stringify(events))
}
