import type { Event } from '@/actions/events'
import { getVisibleColour } from '@/lib/colourUtils'
import { cn } from '@/lib/utils'
import { useDroppable } from '@dnd-kit/core'
import { format } from 'date-fns'
import { Icons } from './icons'
import { Badge } from './ui/badge'

type EventProps = {
  event: Event | undefined
  handleRemoveTag: (req: { eventId: string; tagId: string }) => void
}

const Event = ({ event, handleRemoveTag }: EventProps) => {
  if (!event) {
    throw new Error('Event is undefined')
  }
  const { isOver, setNodeRef } = useDroppable({ id: event.id })

  const formatDate = (date: string) => {
    const dateObj = new Date(date)
    return format(dateObj, 'hh:mm a')
  }

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'h-full w-full overflow-hidden rounded-sm border-primary bg-primary p-1 opacity-90',
        isOver && '-rotate-2'
      )}
    >
      <p className="text-sm font-medium">{event.name}</p>
      <p className="mb-1 text-xs">
        {formatDate(event.start)} - {formatDate(event.end)}
      </p>
      <div className="flex flex-wrap gap-2">
        {event.tags.map((tag) => (
          <Badge
            key={tag.id}
            style={{
              backgroundColor: tag.colour,
              color: getVisibleColour(tag.colour),
              borderColor: getVisibleColour(tag.colour)
            }}
          >
            <div className="flex flex-wrap gap-1">
              <span className="truncate">{tag.name}</span>
              <span aria-label="remove tag">
                <Icons.close
                  className="h-4 w-4 hover:cursor-pointer hover:text-red-500"
                  role="button"
                  onClick={() =>
                    handleRemoveTag({ eventId: event.id, tagId: tag.id })
                  }
                />
              </span>
            </div>
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default Event
