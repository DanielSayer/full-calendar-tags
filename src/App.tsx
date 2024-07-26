import { Calendar } from '@/components/ui/calendar'
import { DndContext } from '@dnd-kit/core'
import { EventChangeArg } from '@fullcalendar/core/index.js'
import { useMutation } from '@tanstack/react-query'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { updateEvent } from './actions/events'
import CalendarEvent from './components/calendar-event'
import CreateEventButton from './components/create-event-button'
import { EventCalendar } from './components/event-calendar'
import { TagsSection } from './components/tags-section'
import useCalendar from './hooks/useCalendar'
import useDragAndDropTags from './hooks/useDragAndDropTags'
import useGetCalendarEvents from './hooks/useGetCalendarEvents'

function App() {
  const { selectedDate, datesSet, handleSelectDate, calendarRef, dateRange } =
    useCalendar()
  const { events, refetch, handleChangeLocalEvents } = useGetCalendarEvents({
    dateRange
  })
  const { activeTagId, onDragStart, onDragEnd, removeTagAsync, addTagAsync } =
    useDragAndDropTags({ refetch })

  const { isError, mutate } = useMutation({
    mutationFn: updateEvent
  })

  const handleEventChange = (event: EventChangeArg) => {
    const end = event.event.end
    const start = event.event.start
    if (!start || !end) {
      return
    }

    const originalEventsList = events
    const eventToChange = events?.find((c) => c.id === event.event.id)
    if (!eventToChange) {
      return
    }
    const updatedEvent = {
      ...eventToChange,
      name: event.event.title,
      start: format(start, "yyyy-MM-dd'T'HH:mm"),
      end: format(end, "yyyy-MM-dd'T'HH:mm")
    }
    const updatedEvents = events.map((e) => {
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

  return (
    <div className="flex gap-8 p-4">
      <DndContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
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
            events={events}
            eventChange={handleEventChange}
            eventContent={(e) => {
              const event = events?.find((c) => c.id === e.event.id)
              return (
                <CalendarEvent
                  event={event}
                  handleRemoveTag={removeTagAsync}
                  refetch={refetch}
                  addTagAsync={addTagAsync}
                />
              )
            }}
          />
        </div>
      </DndContext>
    </div>
  )
}

export default App
