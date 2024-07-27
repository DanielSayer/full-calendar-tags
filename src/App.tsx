import { Calendar } from '@/components/ui/calendar'
import { DndContext } from '@dnd-kit/core'
import CalendarEvent from './components/calendar-event'
import CreateEventButton from './components/create-event-button'
import { EventCalendar } from './components/event-calendar'
import { TagsSection } from './components/tags-section'
import useCalendar from './hooks/useCalendar'
import useCreateEventDialog from './hooks/useCreateEventDialog'
import useDragAndDropTags from './hooks/useDragAndDropTags'
import useGetCalendarEvents from './hooks/useGetCalendarEvents'

function App() {
  const { isOpen, toggle, createEventDates, handleSelect } =
    useCreateEventDialog()

  const { selectedDate, calendarRef, dateRange, datesSet, handleSelectDate } =
    useCalendar()

  const { events, refetch, handleEventChange } = useGetCalendarEvents({
    dateRange
  })

  const { activeTagId, onDragStart, onDragEnd, removeTagAsync, addTagAsync } =
    useDragAndDropTags({ refetch })

  return (
    <div className="flex gap-8 p-4">
      <DndContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <CreateEventButton
          refetch={refetch}
          isOpen={isOpen}
          toggle={toggle}
          createEventDates={createEventDates}
        />
        <div className="hidden lg:block">
          <h1 className="my-2 text-lg font-semibold">Calendar</h1>
          <Calendar
            mode="single"
            selected={selectedDate}
            month={selectedDate}
            onSelect={handleSelectDate}
          />
          <TagsSection activeTagId={activeTagId} />
        </div>
        <div className="w-full">
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
            select={handleSelect}
          />
        </div>
      </DndContext>
    </div>
  )
}

export default App
