import { Calendar } from '@/components/ui/calendar'
import { useQuery } from '@tanstack/react-query'
import { EventCalendar } from './components/calendar'
import CreateEventButton from './components/create-event-button'
import useCalendar from './hooks/useCalendar'
import { getEvents } from './actions/events'
import { TagsSection } from './components/tags-section'

function App() {
  const { selectedDate, datesSet, handleSelectDate, calendarRef, dateRange } =
    useCalendar()

  const { data, refetch } = useQuery({
    queryKey: ['events', dateRange],
    queryFn: () => getEvents(dateRange),
    enabled: !!dateRange.start && !!dateRange.end
  })

  return (
    <div className="flex gap-8 p-4">
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
        <TagsSection />
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
    </div>
  )
}

export default App
