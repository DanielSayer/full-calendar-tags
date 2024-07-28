import { deleteEvent, duplicateEvent } from '@/actions/events'
import { CalendarEventItem } from '@/hooks/useCalendarEvents'
import usePopups from '@/hooks/usePopups'
import useTags from '@/hooks/useTags'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { Icons } from './icons'
import { TagItem } from './tag'
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger
} from './ui/context-menu'

type CalendarEventMenuProps = {
  event: CalendarEventItem
  addTagAsync: (req: { eventId: string; tagId: string }) => void
  removeTagAsync: (req: { eventId: string; tagId: string }) => void
}

export const CalendarEventMenu = ({
  event,
  addTagAsync,
  removeTagAsync
}: CalendarEventMenuProps) => {
  const {
    toggleTagsPopup,
    configureTagsPopup,
    toggleEventPopup,
    configureEventPopup
  } = usePopups()
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      toast.success('Event deleted')
      queryClient.invalidateQueries({ queryKey: ['events'] })
    }
  })

  const { mutateAsync: duplicateEventAsync } = useMutation({
    mutationFn: duplicateEvent,
    onSuccess: () => {
      toast.success('Event duplicated')
      queryClient.invalidateQueries({ queryKey: ['events'] })
    }
  })

  const handleEdit = () => {
    configureEventPopup({
      mode: 'edit',
      edit: {
        id: event.id,
        name: event.title,
        startDate: format(event.start, 'yyyy-MM-dd'),
        endDate: format(event.end, 'yyyy-MM-dd'),
        startTime: format(event.start, 'HH:mm'),
        endTime: format(event.end, 'HH:mm')
      }
    })
    toggleEventPopup()
  }

  const handleAddTag = () => {
    configureTagsPopup({ addOnCreate: { eventId: event.id } })
    toggleTagsPopup()
  }

  return (
    <ContextMenuContent>
      <ContextMenuItem onClick={() => handleEdit()}>Edit Event</ContextMenuItem>
      <ContextMenuItem onClick={() => duplicateEventAsync({ id: event.id })}>
        Duplicate Event
      </ContextMenuItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger>Add Tag</ContextMenuSubTrigger>
        <ContextMenuSubContent className="max-h-40 overflow-y-auto">
          <AddTagMenu event={event} addTagAsync={addTagAsync} />
          <ContextMenuItem onClick={() => handleAddTag()}>
            <Icons.add className="mr-2 h-4 w-4" /> Add tag
          </ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      {event.extendedProps.tags.length > 0 && (
        <ContextMenuSub>
          <ContextMenuSubTrigger>Delete Tag</ContextMenuSubTrigger>
          <ContextMenuSubContent className="max-h-40 overflow-y-auto">
            <DeleteTagMenu event={event} removeTagAsync={removeTagAsync} />
          </ContextMenuSubContent>
        </ContextMenuSub>
      )}
      <ContextMenuItem onClick={() => mutateAsync({ id: event.id })}>
        <span className="flex items-center gap-2 text-destructive">
          Delete Event <Icons.trash className="ml-2 h-4 w-4" />
        </span>
      </ContextMenuItem>
    </ContextMenuContent>
  )
}

const AddTagMenu = (props: {
  event: CalendarEventItem
  addTagAsync: (req: { eventId: string; tagId: string }) => void
}) => {
  const { data, isLoading } = useTags()
  const { tags: existingTags } = props.event.extendedProps

  const addTag = (tagId: string) => {
    props.addTagAsync({ eventId: props.event.id, tagId })
  }

  if (isLoading || !data) {
    return <span>Loading...</span>
  }

  const availableTags = data.filter(
    (tag) => !existingTags.map((t) => t.id).includes(tag.id)
  )
  if (availableTags.length === 0) {
    return (
      <span className="flex items-center gap-2 px-2">
        <Icons.empty className="ml-1 h-4 w-4 text-muted-foreground" /> No
        available tags
      </span>
    )
  }

  return availableTags.map((tag) => (
    <ContextMenuItem key={tag.id} onClick={() => addTag(tag.id)}>
      <TagItem key={tag.id} tag={tag} />
    </ContextMenuItem>
  ))
}

const DeleteTagMenu = (props: {
  event: CalendarEventItem
  removeTagAsync: (req: { eventId: string; tagId: string }) => void
}) => {
  const { tags } = props.event.extendedProps
  const removeTag = (tagId: string) => {
    props.removeTagAsync({ eventId: props.event.id, tagId })
  }

  return tags.map((tag) => (
    <ContextMenuItem key={tag.id} onClick={() => removeTag(tag.id)}>
      <TagItem key={tag.id} tag={tag} />
    </ContextMenuItem>
  ))
}
