import type { Tag } from './tags-sheet'
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

export const LoadingTag = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="inline-block h-2 w-2 rounded-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  )
}
