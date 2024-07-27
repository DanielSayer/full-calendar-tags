import { format } from 'date-fns'
import { Badge } from './ui/badge'
import { getVisibleColour } from '@/lib/colourUtils'
import { Icons } from './icons'
import { CalendarEventItem } from '@/hooks/useCalendarEvents'

type EventContentProps = {
  event: CalendarEventItem
  handleRemoveTag: (req: { eventId: string; tagId: string }) => void
}

const EventContent = ({ event, handleRemoveTag }: EventContentProps) => {
  const formatDate = (date: string) => {
    const dateObj = new Date(date)
    return format(dateObj, 'hh:mm a')
  }
  return (
    <div className="h-full w-full">
      <p className="text-sm font-medium">{event.title}</p>
      <p className="mb-1 text-xs">
        {formatDate(event.start)} - {formatDate(event.end)}
      </p>
      <div className="flex flex-wrap gap-2">
        {event.extendedProps.tags.map((tag) => (
          <Badge
            key={tag.id}
            style={{
              backgroundColor: tag.colour,
              color: getVisibleColour(tag.colour),
              borderColor: getVisibleColour(tag.colour)
            }}
          >
            <div className="flex flex-wrap gap-1">
              <span className="max-w-36 truncate">{tag.name}</span>
              <span aria-label="remove tag">
                <Icons.close
                  className="h-4 w-4 hover:cursor-pointer hover:text-red-500"
                  role="button"
                  onClick={() =>
                    handleRemoveTag({ eventId: event.id, tagId: tag.id })
                  }
                />
              </span>
            </div>
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default EventContent
