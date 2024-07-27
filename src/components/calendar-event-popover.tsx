import { Icons } from './icons'
import { TagItem } from './tag'
import { Tag } from './tags-sheet'

type CalendarEventPopoverProps = {
  tags: Tag[]
}
const CalendarEventPopover = ({ tags }: CalendarEventPopoverProps) => {
  if (tags.length === 0) {
    return (
      <div className="flex flex-col items-center p-2">
        <Icons.empty className="h-4 w-4 text-muted-foreground" />
        Event has no tags
      </div>
    )
  }
  return (
    <div>
      {tags.map((tag) => (
        <TagItem key={tag.id} tag={tag} />
      ))}
    </div>
  )
}

export default CalendarEventPopover
