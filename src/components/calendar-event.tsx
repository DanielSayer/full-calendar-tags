import { EditEventDates } from '@/hooks/useCreateEventDialog'
import { CalendarEventItem } from '@/hooks/useGetCalendarEvents'
import { cn } from '@/lib/utils'
import { useDroppable } from '@dnd-kit/core'
import EventContent from './calendar-event-content'
import { CalendarEventMenu } from './calendar-event-menu'
import { ContextMenu, ContextMenuTrigger } from './ui/context-menu'

type EventProps = {
  event: CalendarEventItem | undefined
  refetch: () => void
  addTagAsync: (req: { eventId: string; tagId: string }) => void
  handleRemoveTag: (req: { eventId: string; tagId: string }) => void
  handleClickEdit: (event: EditEventDates) => void
}

const CalendarEvent = ({
  event,
  handleRemoveTag,
  refetch,
  addTagAsync,
  handleClickEdit
}: EventProps) => {
  if (!event) {
    throw new Error('Event is undefined')
  }
  const { isOver, setNodeRef } = useDroppable({ id: event.id })

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
            handleClickEdit={handleClickEdit}
          />
        </ContextMenuTrigger>
      </ContextMenu>
    </div>
  )
}

export default CalendarEvent
