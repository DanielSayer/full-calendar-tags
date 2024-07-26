import { deleteEvent } from '@/actions/events'
import { CalendarEventItem } from '@/hooks/useGetCalendarEvents'
import { cn } from '@/lib/utils'
import { useDroppable } from '@dnd-kit/core'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import EventContent from './calendar-event-content'
import { Icons } from './icons'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from './ui/context-menu'
import { TagItem } from './tag'
import { getTags } from '@/actions/tags'

type EventProps = {
  event: CalendarEventItem | undefined
  refetch: () => void
  addTagAsync: (req: { eventId: string; tagId: string }) => void
  handleRemoveTag: (req: { eventId: string; tagId: string }) => void
}

const CalendarEvent = ({
  event,
  handleRemoveTag,
  refetch,
  addTagAsync
}: EventProps) => {
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

  const { data, isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags
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
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add Tag</ContextMenuSubTrigger>
            <ContextMenuSubContent className="max-h-40 overflow-y-auto">
              {!isLoading && !data && <span>Loading...</span>}
              {data?.length === 0 && (
                <span>
                  <Icons.empty className="h-4 w-4" /> No tags
                </span>
              )}
              {data?.map((tag) => (
                <ContextMenuItem
                  key={tag.id}
                  onClick={() =>
                    addTagAsync({ eventId: event.id, tagId: tag.id })
                  }
                >
                  <TagItem key={tag.id} tag={tag} />
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
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
