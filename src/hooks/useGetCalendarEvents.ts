import { DateRange } from '@/types/misc'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getEvents } from '../actions/events'
import { Tag } from '../components/tags-sheet'

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

  return {
    events: localEvents,
    refetch,
    handleChangeLocalEvents
  }
}

export default useGetCalendarEvents
