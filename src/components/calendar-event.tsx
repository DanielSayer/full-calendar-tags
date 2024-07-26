import { deleteEvent, type Event } from '@/actions/events'
import { cn } from '@/lib/utils'
import { useDroppable } from '@dnd-kit/core'
import EventContent from './calendar-event-content'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from './ui/context-menu'
import { Icons } from './icons'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

type EventProps = {
  event: Event | undefined
  refetch: () => void
  handleRemoveTag: (req: { eventId: string; tagId: string }) => void
}

const CalendarEvent = ({ event, handleRemoveTag, refetch }: EventProps) => {
  if (!event) {
    throw new Error('Event is undefined')
  }
  const { isOver, setNodeRef } = useDroppable({ id: event.id })

  const { mutateAsync } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      toast.success('Event deleted')
      refetch()
    }
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
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => mutateAsync({ id: event.id })}>
            <span className="flex items-center gap-2 text-destructive">
              Delete Event <Icons.trash className="ml-2 h-4 w-4" />
            </span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}

export default CalendarEvent
