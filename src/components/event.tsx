import { cn } from '@/lib/utils'
import { useDroppable } from '@dnd-kit/core'
import { Tag } from './tags-sheet'
import { Badge } from './ui/badge'
import { Icons } from './icons'
import { removeTagFromEvent } from '@/actions/events'

type EventProps = {
  id: string
  tags: Tag[]
}

const Event = ({ id, tags }: EventProps) => {
  const { isOver, setNodeRef } = useDroppable({ id })

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
        {tags.map((tag) => (
          <Badge
            key={tag.id}
            className="flex items-center gap-1"
            style={{ backgroundColor: tag.colour }}
          >
            <span>{tag.name}</span>
            <span aria-label="remove tag">
              <Icons.close
                className="h-4 w-4 hover:cursor-pointer hover:text-red-500"
                role="button"
                onClick={() => removeTagFromEvent(id, tag.id)}
              />
            </span>
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default Event
