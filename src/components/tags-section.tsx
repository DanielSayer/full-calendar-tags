import { getTags } from '@/actions/tags'
import { DragOverlay } from '@dnd-kit/core'
import { useQuery } from '@tanstack/react-query'
import Draggable from './draggable'
import { Icons } from './icons'
import { CreateTagForm, type Tag } from './tags-sheet'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card'
import { Separator } from './ui/separator'
import { LoadingTag, TagItem } from './tag'

export const TagsSection = (props: { activeTagId: string | null }) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags
  })
  return (
    <Card>
      <CardHeader className="space-y-0 p-2">
        <CardTitle className="text-lg">Tags</CardTitle>
        <CardDescription className="text-sm">
          Drag and drop a tag to an event.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="p-2">
        <Tags
          tags={data ?? []}
          isLoading={isLoading}
          activeTagId={props.activeTagId}
        />
        <div className="flex justify-end">
          <CreateTagForm refetch={refetch} />
        </div>
      </CardContent>
    </Card>
  )
}

const Tags = (props: {
  isLoading: boolean
  tags: Tag[]
  activeTagId: string | null
}) => {
  if (props.isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <LoadingTag key={index} />
        ))}
      </div>
    )
  }

  if (props.tags.length === 0) {
    return (
      <div className="grid place-items-center py-3">
        <Icons.empty className="h-6 w-6 text-muted-foreground" />
        <div className="text-muted-foreground">No tags yet, create one!</div>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col px-2">
        {props.tags.map((tag) => (
          <div className="flex">
            <Draggable key={tag.name} id={tag.id}>
              <TagItem tag={tag} />
            </Draggable>
          </div>
        ))}
      </div>
      {props.activeTagId && (
        <DragOverlay>
          <TagItem tag={props.tags.find((t) => t.id === props.activeTagId)!} />
        </DragOverlay>
      )}
    </>
  )
}
