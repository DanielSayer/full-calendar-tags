import { deleteEvent } from '@/actions/events'
import { EditEventDates } from '@/hooks/useCreateEventDialog'
import useTags from '@/hooks/useTags'
import { useMutation } from '@tanstack/react-query'
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
import { CalendarEventItem } from '@/hooks/useCalendarEvents'

type CalendarEventMenuProps = {
  event: CalendarEventItem
  refetch: () => void
  addTagAsync: (req: { eventId: string; tagId: string }) => void
  removeTagAsync: (req: { eventId: string; tagId: string }) => void
  handleClickEdit: (event: EditEventDates) => void
}

export const CalendarEventMenu = ({
  event,
  refetch,
  addTagAsync,
  removeTagAsync,
  handleClickEdit
}: CalendarEventMenuProps) => {
  const { mutateAsync } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      toast.success('Event deleted')
      refetch()
    }
  })

  const handleEdit = () => {
    handleClickEdit({
      id: event.id,
      name: event.title,
      date: format(event.start, 'yyyy-MM-dd'),
      start: format(event.start, 'HH:mm'),
      end: format(event.end, 'HH:mm')
    })
  }

  return (
    <ContextMenuContent>
      <ContextMenuItem onClick={() => handleEdit()}>Edit Event</ContextMenuItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger>Add Tag</ContextMenuSubTrigger>
        <ContextMenuSubContent className="max-h-40 overflow-y-auto">
          <AddTagMenu event={event} addTagAsync={addTagAsync} />
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