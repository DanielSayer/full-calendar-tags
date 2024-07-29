import { DateRange } from '@/types/misc'
import { DateSelectArg, EventDropArg } from '@fullcalendar/core/index.js'
import { EventResizeDoneArg } from '@fullcalendar/interaction/index.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { getEvents, updateEvent } from '../actions/events'
import { Tag } from '../components/tags-sheet'
import usePopups from './usePopups'

export type CalendarEventItem = {
  id: string
  title: string
  start: string
  end: string
  extendedProps: { tags: Tag[] }
}

const useCalendarEvents = ({ dateRange }: { dateRange: DateRange }) => {
  const { configureEventPopup, toggleEventPopup } = usePopups()
  const [localEvents, setLocalEvents] = useState<CalendarEventItem[]>([])
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([])

  const { data } = useQuery({
    queryKey: ['events', dateRange],
    queryFn: () => getEvents(dateRange),
    enabled: !!dateRange.start && !!dateRange.end
  })

  useEffect(() => {
    if (!data) {
      setLocalEvents([])
      return
    }
    const events: CalendarEventItem[] = data
      .filter(
        (event) =>
          selectedTagIds.length === 0 ||
          selectedTagIds.every((tagId) =>
            event.tags.some((tag) => tagId === tag.id)
          )
      )
      .map((event) => {
        return {
          id: event.id,
          title: event.name,
          start: event.start,
          end: event.end,
          extendedProps: {
            tags: event.tags
          }
        }
      })
    setLocalEvents(events)
  }, [data, selectedTagIds])

  const { mutate } = useMutation({
    mutationFn: updateEvent
  })

  const handleEventChange = (event: EventResizeDoneArg | EventDropArg) => {
    const end = event.event.end
    const start = event.event.start
    if (!start || !end) {
      return
    }

    const eventToChange = localEvents?.find((c) => c.id === event.event.id)
    if (!eventToChange) {
      return
    }
    const updatedEvent = {
      ...eventToChange,
      name: event.event.title,
      start: format(start, "yyyy-MM-dd'T'HH:mm"),
      end: format(end, "yyyy-MM-dd'T'HH:mm")
    }
    const updatedEvents = localEvents.map((e) => {
      if (e.id === eventToChange.id) {
        return updatedEvent
      }
      return e
    })

    setLocalEvents(updatedEvents)
    mutate(updatedEvent)
  }

  const handleSelect = (args: DateSelectArg) => {
    const startTime = format(args.start, 'HH:mm')
    const endTime = format(args.end, 'HH:mm')
    const startDate = format(args.start, 'yyyy-MM-dd')
    const endDate = format(args.end, 'yyyy-MM-dd')
    configureEventPopup({
      mode: 'create',
      create: { startDate, startTime, endDate, endTime }
    })
    toggleEventPopup()
  }

  const handleSelectTag = (id: string) => {
    if (selectedTagIds.includes(id)) {
      setSelectedTagIds(selectedTagIds.filter((t) => t !== id))
    } else {
      setSelectedTagIds([...selectedTagIds, id])
    }
  }

  return {
    events: localEvents,
    selectedTagIds,
    handleSelect,
    handleEventChange,
    handleTagSelect: handleSelectTag
  }
}

export default useCalendarEvents
