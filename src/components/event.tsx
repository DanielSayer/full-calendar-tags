import { removeTagFromEvent } from '@/actions/events'
import { getTextColour } from '@/lib/colourUtils'
import { cn } from '@/lib/utils'
import { useDroppable } from '@dnd-kit/core'
import { Icons } from './icons'
import { Badge } from './ui/badge'
import type { Event } from '@/actions/events'

type EventProps = {
  event: Event | undefined
}

const Event = ({ event }: EventProps) => {
  if (!event) {
    throw new Error('Event is undefined')
  }
  const { isOver, setNodeRef } = useDroppable({ id: event.id })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'h-full w-full overflow-hidden px-2 py-1',
        isOver && 'border border-red-500 text-red-500'
      )}
    >
      <div>This is an event</div>
      <div className="flex flex-wrap gap-2">
        {event.tags.map((tag) => (
          <Badge
            key={tag.id}
            style={{
              backgroundColor: tag.colour,
              color: getTextColour(tag.colour)
            }}
          >
            <div className="flex flex-wrap gap-1">
              <span className="truncate">{tag.name}</span>
              <span aria-label="remove tag">
                <Icons.close
                  className="h-4 w-4 hover:cursor-pointer hover:text-red-500"
                  role="button"
                  onClick={() => removeTagFromEvent(event.id, tag.id)}
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
