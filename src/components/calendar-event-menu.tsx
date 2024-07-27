import { deleteEvent } from '@/actions/events'
import { EditEventDates } from '@/hooks/useCreateEventDialog'
import { CalendarEventItem } from '@/hooks/useGetCalendarEvents'
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

type CalendarEventMenuProps = {
  event: CalendarEventItem
  refetch: () => void
  addTagAsync: (req: { eventId: string; tagId: string }) => void
  handleClickEdit: (event: EditEventDates) => void
}

export const CalendarEventMenu = ({
  event,
  refetch,
  addTagAsync,
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

  const addTag = (tagId: string) => {
    props.addTagAsync({ eventId: props.event.id, tagId })
  }

  if (isLoading || !data) {
    return <span>Loading...</span>
  }

  if (data.length === 0) {
    return (
      <span>
        <Icons.empty className="h-4 w-4" /> No tags
      </span>
    )
  }

  return data.map((tag) => (
    <ContextMenuItem key={tag.id} onClick={() => addTag(tag.id)}>
      <TagItem key={tag.id} tag={tag} />
    </ContextMenuItem>
  ))
}
