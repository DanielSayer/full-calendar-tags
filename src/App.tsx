import { Calendar } from '@/components/ui/calendar'
import { DndContext } from '@dnd-kit/core'
import { useQuery } from '@tanstack/react-query'
import { getEvents } from './actions/events'
import CreateEventButton from './components/create-event-button'
import { EventCalendar } from './components/event-calendar'
import { TagsSection } from './components/tags-section'
import useCalendar from './hooks/useCalendar'
import { useState } from 'react'

function App() {
  const [activeTagId, setActiveTagId] = useState<string | null>(null)
  const { selectedDate, datesSet, handleSelectDate, calendarRef, dateRange } =
    useCalendar()

  const { data, refetch } = useQuery({
    queryKey: ['events', dateRange],
    queryFn: () => getEvents(dateRange),
    enabled: !!dateRange.start && !!dateRange.end
  })

  return (
    <div className="flex gap-8 p-4">
      <DndContext
        onDragEnd={() => console.log('drag end')}
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
            events={data}
          />
        </div>
      </DndContext>
    </div>
  )
}

export default App
