import { addTagToEvent, removeTagFromEvent } from '@/actions/events'
import { getCalendarId } from '@/lib/calendarUtils'
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

const useDragAndDropTags = () => {
  const queryClient = useQueryClient()
  const [activeTagId, setActiveTagId] = useState<string | null>(null)

  const onDragStart = (e: DragStartEvent) => {
    setActiveTagId(e.active.id.toString())
  }

  const { mutateAsync: addTagAsync } = useMutation({
    mutationFn: addTagToEvent,
    onSuccess: () => {
      toast.success('Tag added to event', { duration: 1500 })
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const { mutateAsync: removeTagAsync } = useMutation({
    mutationFn: removeTagFromEvent,
    onSuccess: () => {
      toast.success('Tag removed from event', { duration: 1500 })
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!active || !over) return

    const eventId = getCalendarId(over.id.toString())
    addTagAsync({ eventId, tagId: active.id.toString() })
  }

  return { activeTagId, onDragStart, onDragEnd, addTagAsync, removeTagAsync }
}

export default useDragAndDropTags
