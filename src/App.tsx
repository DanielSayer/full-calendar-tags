import { Calendar } from '@/components/ui/calendar'
import CreateEventButton from './components/create-event-button'
import useCalendar from './hooks/useCalendar'
import { EventCalendar } from './components/calendar'

function App() {
  const { selectedDate, datesSet, handleSelectDate, calendarRef } =
    useCalendar()

  return (
    <div className="flex gap-8 p-4">
      <div className="hidden lg:block">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Calendar</h1>
          <CreateEventButton />
        </div>
        <Calendar
          mode="single"
          selected={selectedDate}
          month={selectedDate}
          onSelect={handleSelectDate}
        />
      </div>
      <div className="w-full">
        <CreateEventButton className="lg:hidden" />
        <EventCalendar
          calendarRef={calendarRef}
          datesSet={datesSet}
          initialDate={selectedDate}
        />
      </div>
    </div>
  )
}

export default App
