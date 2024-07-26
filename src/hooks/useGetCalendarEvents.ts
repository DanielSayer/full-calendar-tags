import { DateRange } from '@/types/misc'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getEvents, updateEvent } from '../actions/events'
import { Tag } from '../components/tags-sheet'
import { EventChangeArg } from '@fullcalendar/core/index.js'
import { format } from 'date-fns'
import { toast } from 'sonner'

export type CalendarEventItem = {
  id: string
  title: string
  start: string
  end: string
  extendedProps: { tags: Tag[] }
}

const useGetCalendarEvents = ({ dateRange }: { dateRange: DateRange }) => {
  const [localEvents, setLocalEvents] = useState<CalendarEventItem[]>([])

  const { data, refetch } = useQuery({
    queryKey: ['events', dateRange],
    queryFn: () => getEvents(dateRange),
    enabled: !!dateRange.start && !!dateRange.end
  })

  const handleChangeLocalEvents = (events: CalendarEventItem[]) => {
    setLocalEvents(events)
  }

  useEffect(() => {
    if (!data) {
      setLocalEvents([])
      return
    }
    const events: CalendarEventItem[] = data.map((event) => {
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
  }, [data])

  const { isError, mutate } = useMutation({
    mutationFn: updateEvent
  })

  const handleEventChange = (event: EventChangeArg) => {
    const end = event.event.end
    const start = event.event.start
    if (!start || !end) {
      return
    }

    const originalEventsList = localEvents
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

    handleChangeLocalEvents(updatedEvents)
    mutate(updatedEvent)

    if (isError) {
      toast.error('Error updating event')
      event.revert()
      handleChangeLocalEvents(originalEventsList)
    }
  }

  return {
    events: localEvents,
    refetch,
    handleEventChange
  }
}

export default useGetCalendarEvents
