import { addTagToEvent, removeTagFromEvent } from '@/actions/events'
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

const useDragAndDropTags = (props: { refetch: () => void }) => {
  const [activeTagId, setActiveTagId] = useState<string | null>(null)

  const onDragStart = (e: DragStartEvent) => {
    setActiveTagId(e.active.id.toString())
  }

  const { mutateAsync: addTagAsync } = useMutation({
    mutationFn: addTagToEvent,
    onSuccess: () => {
      toast.success('Tag added to event', { duration: 1500 })
      props.refetch()
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const { mutateAsync: removeTagAsync } = useMutation({
    mutationFn: removeTagFromEvent,
    onSuccess: () => {
      toast.success('Tag removed from event', { duration: 1500 })
      props.refetch()
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!active || !over) return

    addTagAsync({ eventId: over.id.toString(), tagId: active.id.toString() })
  }

  return { activeTagId, onDragStart, onDragEnd, addTagAsync, removeTagAsync }
}

export default useDragAndDropTags
