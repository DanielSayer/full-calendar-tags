import { Calendar } from '@/components/ui/calendar'
import { DndContext } from '@dnd-kit/core'
import CalendarEvent from './components/calendar-event'
import CreateEventButton from './components/create-event-button'
import { EventCalendar } from './components/event-calendar'
import { TagsSection } from './components/tags-section'
import useCalendar from './hooks/useCalendar'
import useDragAndDropTags from './hooks/useDragAndDropTags'
import useCalendarEvents from './hooks/useCalendarEvents'
import { TagsSheet } from './components/tags-sheet'

function App() {
  const {
    selectedDate,
    calendarRef,
    dateRange,
    referenceCalendarDate,
    datesSet,
    handleSelectDate,
    onMonthChange
  } = useCalendar()

  const { events, handleEventChange, handleSelect } = useCalendarEvents({
    dateRange
  })

  const { activeTagId, onDragStart, onDragEnd, removeTagAsync, addTagAsync } =
    useDragAndDropTags()

  return (
    <DndContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <CreateEventButton />
      <TagsSheet />
      <div className="flex p-4 lg:gap-8">
        <div className="hidden w-[276px] lg:block">
          <h1 className="my-2 text-lg font-semibold">Calendar</h1>
          <Calendar
            mode="single"
            selected={selectedDate}
            month={referenceCalendarDate}
            onMonthChange={onMonthChange}
            onSelect={handleSelectDate}
          />
          <TagsSection activeTagId={activeTagId} />
        </div>
        <div className="w-full">
          <EventCalendar
            calendarRef={calendarRef}
            initialDate={selectedDate}
            events={events}
            datesSet={datesSet}
            eventDrop={handleEventChange}
            eventResize={handleEventChange}
            select={handleSelect}
            eventContent={(e) => {
              const event = events?.find((c) => c.id === e.event.id)
              return (
                <CalendarEvent
                  event={event}
                  handleRemoveTag={removeTagAsync}
                  addTagAsync={addTagAsync}
                  removeTagAsync={removeTagAsync}
                />
              )
            }}
          />
        </div>
      </div>
    </DndContext>
  )
}

export default App
