import { CalendarEventItem } from '@/hooks/useCalendarEvents'
import { getVisibleColour } from '@/lib/colourUtils'
import { format } from 'date-fns'
import { Icons } from './icons'
import { Tag } from './tags-sheet'
import { Badge } from './ui/badge'

type CalendarEventPopoverProps = {
  event: CalendarEventItem
}
const CalendarEventPopover = ({ event }: CalendarEventPopoverProps) => {
  const formatDate = (date: string) => {
    const dateObj = new Date(date)
    return format(dateObj, 'hh:mm a')
  }
  return (
    <div>
      <h3 className="text-sm font-semibold">{event.title}</h3>
      <p className="mb-1 text-xs text-muted-foreground">
        {formatDate(event.start)} - {formatDate(event.end)}
      </p>
      <p className="mb-1 text-xs font-bold text-muted-foreground">Tags:</p>
      <EventPopoverTags tags={event.extendedProps.tags} />
    </div>
  )
}

const EventPopoverTags = (props: { tags: Tag[] }) => {
  if (props.tags.length === 0) {
    return (
      <div className="flex flex-col items-center p-2 text-xs">
        <Icons.empty className="h-4 w-4 text-muted-foreground" />
        Event has no tags
      </div>
    )
  }
  return (
    <div className="flex flex-wrap gap-2">
      {props.tags.map((tag) => {
        const contrastingColour = getVisibleColour(tag.colour)
        return (
          <Badge
            key={tag.id}
            style={{
              backgroundColor: tag.colour,
              color: contrastingColour,
              borderColor: contrastingColour
            }}
          >
            <span className="max-w-36 truncate">{tag.name}</span>
          </Badge>
        )
      })}
    </div>
  )
}

export default CalendarEventPopover
