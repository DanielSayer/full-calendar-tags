import { Calendar } from '@/components/ui/calendar'
import { DndContext } from '@dnd-kit/core'
import CalendarEvent from './components/calendar-event'
import CreateEventButton from './components/create-event-button'
import { EventCalendar } from './components/event-calendar'
import { TagsSection } from './components/tags-section'
import useCalendar from './hooks/useCalendar'
import useCreateEventDialog from './hooks/useCreateEventDialog'
import useDragAndDropTags from './hooks/useDragAndDropTags'
import useCalendarEvents from './hooks/useCalendarEvents'

function App() {
  const {
    isOpen,
    editEventDates,
    createEventDates,
    toggle,
    handleEdit,
    handleSelect
  } = useCreateEventDialog()

  const { selectedDate, calendarRef, dateRange, datesSet, handleSelectDate } =
    useCalendar()

  const { events, refetch, handleEventChange } = useCalendarEvents({
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
          editEventDates={editEventDates}
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
                  refetch={refetch}
                  addTagAsync={addTagAsync}
                  removeTagAsync={removeTagAsync}
                  handleClickEdit={handleEdit}
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
