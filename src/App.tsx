import { Calendar } from '@/components/ui/calendar'
import { DndContext } from '@dnd-kit/core'
import { DateSelectArg } from '@fullcalendar/core/index.js'
import { format } from 'date-fns'
import { useState } from 'react'
import CalendarEvent from './components/calendar-event'
import CreateEventButton from './components/create-event-button'
import { EventCalendar } from './components/event-calendar'
import { TagsSection } from './components/tags-section'
import useCalendar from './hooks/useCalendar'
import useDragAndDropTags from './hooks/useDragAndDropTags'
import useGetCalendarEvents from './hooks/useGetCalendarEvents'

export type CreateEventDates = {
  date: string
  start: string
  end: string
}

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggle = () => setIsOpen(!isOpen)
  const [createEventDates, setCreateEventsDates] = useState<
    CreateEventDates | undefined
  >(undefined)

  const { selectedDate, calendarRef, dateRange, datesSet, handleSelectDate } =
    useCalendar()
  const { events, refetch, handleEventChange } = useGetCalendarEvents({
    dateRange
  })
  const { activeTagId, onDragStart, onDragEnd, removeTagAsync, addTagAsync } =
    useDragAndDropTags({ refetch })

  const handleSelect = (args: DateSelectArg) => {
    const start = format(args.start, 'HH:mm')
    const end = format(args.end, 'HH:mm')
    const date = format(args.start, 'yyyy-MM-dd')
    setCreateEventsDates({ date, start, end })
    toggle()
  }

  return (
    <div className="flex gap-8 p-4">
      <DndContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <div className="hidden lg:block">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Calendar</h1>
            <CreateEventButton
              refetch={refetch}
              isOpen={isOpen}
              toggle={toggle}
              createEventDates={createEventDates}
            />
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
          <CreateEventButton
            className="lg:hidden"
            refetch={refetch}
            isOpen={isOpen}
            toggle={toggle}
            createEventDates={createEventDates}
          />
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
