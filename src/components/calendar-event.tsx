import { CalendarEventItem } from '@/hooks/useCalendarEvents'
import { EditEventDates } from '@/hooks/useCreateEventDialog'
import { useHover } from '@/hooks/useHover'
import { generateCalendarId } from '@/lib/calendarUtils'
import { cn } from '@/lib/utils'
import { useDroppable } from '@dnd-kit/core'
import { useEffect, useRef, useState } from 'react'
import EventContent from './calendar-event-content'
import { CalendarEventMenu } from './calendar-event-menu'
import CalendarEventPopover from './calendar-event-popover'
import { ContextMenu, ContextMenuTrigger } from './ui/context-menu'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

type EventProps = {
  event: CalendarEventItem | undefined
  refetch: () => void
  addTagAsync: (req: { eventId: string; tagId: string }) => void
  removeTagAsync: (req: { eventId: string; tagId: string }) => void
  handleRemoveTag: (req: { eventId: string; tagId: string }) => void
  handleClickEdit: (event: EditEventDates) => void
}

const CalendarEvent = ({
  event,
  handleRemoveTag,
  refetch,
  addTagAsync,
  removeTagAsync,
  handleClickEdit
}: EventProps) => {
  const eventRef = useRef<HTMLDivElement>(null)
  const isHovering = useHover(eventRef, { debounce: 250 })
  const [cacheBreaker, setCacheBreaker] = useState<number>(0)
  if (!event) {
    throw new Error('Event is undefined')
  }

  useEffect(() => {
    const rand = Math.floor(Math.random() * 100)
    setCacheBreaker(rand + 1)
  }, [event.start, event.end])

  const { isOver, setNodeRef } = useDroppable({
    id: generateCalendarId(cacheBreaker, event.id),
    resizeObserverConfig: { disabled: true, updateMeasurementsFor: [] }
  })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'h-full w-full overflow-hidden rounded-sm border-primary bg-primary p-1 opacity-90',
        isOver && '-rotate-2'
      )}
    >
      <Popover open={isHovering}>
        <PopoverTrigger asChild>
          <div className="h-full w-full" ref={eventRef}>
            <ContextMenu>
              <ContextMenuTrigger>
                <EventContent event={event} handleRemoveTag={handleRemoveTag} />
              </ContextMenuTrigger>
              <CalendarEventMenu
                event={event}
                refetch={refetch}
                addTagAsync={addTagAsync}
                removeTagAsync={removeTagAsync}
                handleClickEdit={handleClickEdit}
              />
            </ContextMenu>
          </div>
        </PopoverTrigger>
        <PopoverContent side="right" sideOffset={10} className="w-fit max-w-72">
          <CalendarEventPopover event={event} />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default CalendarEvent
