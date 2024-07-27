import useTags from '@/hooks/useTags'
import { DragOverlay } from '@dnd-kit/core'
import Draggable from './draggable'
import { Icons } from './icons'
import { LoadingTag, TagItem } from './tag'
import { CreateTagForm, type Tag } from './tags-sheet'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card'
import { Separator } from './ui/separator'

export const TagsSection = (props: { activeTagId: string | null }) => {
  const { data, isLoading } = useTags()
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
          <CreateTagForm />
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
      <div className="flex max-h-52 flex-col overflow-y-auto px-2">
        {props.tags.map((tag) => (
          <div className="flex" key={tag.id}>
            <Draggable id={tag.id}>
              <TagItem tag={tag} />
            </Draggable>
          </div>
        ))}
      </div>
      {props.activeTagId && (
        <DragOverlay dropAnimation={null}>
          <TagItem tag={props.tags.find((t) => t.id === props.activeTagId)!} />
        </DragOverlay>
      )}
    </>
  )
}
