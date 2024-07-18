import { Calendar } from './components/calendar'
import useCalendar from './hooks/useCalendar'

function App() {
  const { calendarRef } = useCalendar()
  return (
    <div className="p-4">
      <Calendar calendarRef={calendarRef} />
    </div>
  )
}

export default App
