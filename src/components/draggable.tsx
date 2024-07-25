import { useDraggable } from '@dnd-kit/core'

type DraggableProps = {
  id: string
  children: React.ReactNode
}

const Draggable = ({ id, children }: DraggableProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id
  })

  return (
    <div ref={setNodeRef} style={{ zIndex: 5 }} {...attributes} {...listeners}>
      {children}
    </div>
  )
}

export default Draggable
