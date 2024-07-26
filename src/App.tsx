import { Calendar } from '@/components/ui/calendar'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { addTagToEvent, getEvents } from './actions/events'
import CreateEventButton from './components/create-event-button'
import Event from './components/event'
import { EventCalendar } from './components/event-calendar'
import { TagsSection } from './components/tags-section'
import useCalendar from './hooks/useCalendar'

function App() {
  const [activeTagId, setActiveTagId] = useState<string | null>(null)
  const { selectedDate, datesSet, handleSelectDate, calendarRef, dateRange } =
    useCalendar()

  const { data, refetch } = useQuery({
    queryKey: ['events', dateRange],
    queryFn: () => getEvents(dateRange),
    enabled: !!dateRange.start && !!dateRange.end
  })

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!active || !over) return

    addTagToEvent(over.id.toString(), active.id.toString())
  }

  const calendarEvents = useMemo(() => {
    if (!data) return []
    return data.map((event) => ({
      id: event.id,
      title: event.name,
      start: event.start,
      end: event.end,
      extendedProps: {
        tags: event.tags
      }
    }))
  }, [data])

  return (
    <div className="flex gap-8 p-4">
      <DndContext
        onDragEnd={onDragEnd}
        onDragStart={(e) => setActiveTagId(e.active.id.toString())}
      >
        <div className="hidden lg:block">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Calendar</h1>
            <CreateEventButton refetch={refetch} />
          </div>
          <Calendar
            mode="single"
            selected={selectedDate}
            month={selectedDate}
            onSelect={handleSelectDate}
          />
          <TagsSection activeTagId={activeTagId} />
        </div>
        <div className="w-full">
          <CreateEventButton className="lg:hidden" refetch={refetch} />
          <EventCalendar
            calendarRef={calendarRef}
            datesSet={datesSet}
            initialDate={selectedDate}
            events={calendarEvents}
            eventContent={(e) => {
              const event = data?.find((c) => c.id === e.event.id)
              return <Event event={event} />
            }}
          />
        </div>
      </DndContext>
    </div>
  )
}

export default App
