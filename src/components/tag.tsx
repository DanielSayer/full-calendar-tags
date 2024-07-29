import type { Tag } from './tags-sheet'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Skeleton } from './ui/skeleton'
import { getVisibleColour } from '@/lib/colourUtils'

export const TagItem = (props: { tag: Tag }) => {
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-block h-3 w-3 rounded-full border"
        style={{
          backgroundColor: props.tag.colour,
          borderColor: getVisibleColour(props.tag.colour)
        }}
      />
      <div className="max-w-52 truncate">{props.tag.name}</div>
    </div>
  )
}

export const SelectableTagItem = (props: {
  tag: Tag
  isSelected: boolean
  handleClick: (id: string) => void
}) => {
  return (
    <div className="flex items-center gap-2">
      <Input
        id={`tag-${props.tag.id}`}
        type="checkbox"
        className="h-min accent-primary"
        checked={props.isSelected}
        onChange={() => props.handleClick?.(props.tag.id)}
      />
      <Label
        className="flex items-center gap-2 font-normal"
        htmlFor={`tag-${props.tag.id}`}
      >
        <span
          className="inline-block h-3 w-3 rounded-full border"
          style={{
            backgroundColor: props.tag.colour,
            borderColor: getVisibleColour(props.tag.colour)
          }}
        />
        <div className="max-w-48 truncate text-base">{props.tag.name}</div>
      </Label>
    </div>
  )
}

export const LoadingTag = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="inline-block h-2 w-2 rounded-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  )
}
