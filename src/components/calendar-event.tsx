import { EditEventDates } from '@/hooks/useCreateEventDialog'
import { CalendarEventItem } from '@/hooks/useCalendarEvents'
import { cn } from '@/lib/utils'
import { useDroppable } from '@dnd-kit/core'
import EventContent from './calendar-event-content'
import { CalendarEventMenu } from './calendar-event-menu'
import { ContextMenu, ContextMenuTrigger } from './ui/context-menu'
import { useEffect, useState } from 'react'
import { generateCalendarId } from '@/lib/calendarUtils'

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
      <ContextMenu>
        <ContextMenuTrigger>
          <EventContent event={event} handleRemoveTag={handleRemoveTag} />
          <CalendarEventMenu
            event={event}
            refetch={refetch}
            addTagAsync={addTagAsync}
            removeTagAsync={removeTagAsync}
            handleClickEdit={handleClickEdit}
          />
        </ContextMenuTrigger>
      </ContextMenu>
    </div>
  )
}

export default CalendarEvent
