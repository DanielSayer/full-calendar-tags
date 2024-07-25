import { cn } from '@/lib/utils'
import { useDroppable } from '@dnd-kit/core'

const Event = ({ id }: { id: string }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-event-${id}`
  })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'h-full w-full',
        isOver && 'border border-red-500 text-red-500'
      )}
    >
      <div>This is an event</div>
      <div>It's id is {id}</div>
    </div>
  )
}

export default Event
