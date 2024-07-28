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

const getAllEvents = async () => {
  await delay(250)
  return JSON.parse(localStorage.getItem('events') || '[]') as Event[]
}

export const getEvents = async (dateRange: DateRange) => {
  const events = await getAllEvents()
  return events.filter((event) => {
    return (
      dateRange.start <= new Date(event.start) &&
      dateRange.end >= new Date(event.end)
    )
  })
}

export const createEditEvent = async (req: {
  id?: string
  event: EventRequest
}) => {
  const start = `${req.event.date}T${req.event.startTime}`
  const end = `${req.event.date}T${req.event.endTime}`
  const request = {
    name: req.event.name,
    start,
    end
  }
  if (req.id) {
    return await updateEvent({ id: req.id, ...request })
  }
  return await createEvent(request)
}

const createEvent = async (event: {
  name: string
  start: string
  end: string
}) => {
  const events = await getAllEvents()
  const newEvent: Event = {
    id: crypto.randomUUID(),
    name: event.name || 'Untitled',
    start: event.start,
    end: event.end,
    tags: []
  }
  localStorage.setItem('events', JSON.stringify([...events, newEvent]))
}

export const addTagToEvent = async (request: {
  eventId: string
  tagId: string
}) => {
  const events = await getAllEvents()
  const event = events.find((e) => e.id === request.eventId)
  if (!event) {
    throw Error('Event not found')
  }
  if (event.tags.map((t) => t.id).includes(request.tagId)) {
    throw Error('Tag already added to event')
  }
  const tags = await getTags()
  const tag = tags.find((t) => t.id === request.tagId)
  if (!tag) {
    throw Error('Tag not found')
  }
  event.tags.push(tag)
  localStorage.setItem('events', JSON.stringify(events))
}

export const removeTagFromEvent = async (req: {
  eventId: string
  tagId: string
}) => {
  const events = await getAllEvents()
  const event = events.find((e) => e.id === req.eventId)
  if (!event) {
    throw Error('Event not found')
  }

  const updatedTags = event.tags.filter((t) => t.id !== req.tagId)
  event.tags = updatedTags
  localStorage.setItem('events', JSON.stringify(events))
}

export const deleteEvent = async (req: { id: string }) => {
  const events = await getAllEvents()
  const updatedEvents = events.filter((e) => e.id !== req.id)
  localStorage.setItem('events', JSON.stringify(updatedEvents))
}

export const duplicateEvent = async (req: { id: string }) => {
  const events = await getAllEvents()
  const event = events.find((e) => e.id === req.id)
  if (!event) {
    throw Error('Event not found')
  }
  const newEvent: Event = {
    id: crypto.randomUUID(),
    name: event.name,
    start: event.start,
    end: event.end,
    tags: event.tags
  }
  localStorage.setItem('events', JSON.stringify([...events, newEvent]))
}

export const updateEvent = async (req: {
  id: string
  name: string
  start: string
  end: string
}) => {
  const events = await getAllEvents()
  const event = events.find((e) => e.id === req.id)
  if (!event) {
    throw Error('Event not found')
  }
  event.name = req.name
  event.start = req.start
  event.end = req.end

  localStorage.setItem('events', JSON.stringify(events))
}
