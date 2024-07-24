import { useQuery } from '@tanstack/react-query'
import { CreateTagForm, TagRequest } from './tags-sheet'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card'
import { Separator } from './ui/separator'
import { getTags } from '@/actions/tags'
import { Skeleton } from './ui/skeleton'
import { Icons } from './icons'

export const TagsSection = () => {
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
        <Tags tags={data ?? []} isLoading={isLoading} />
        <div className="flex justify-end">
          <CreateTagForm refetch={refetch} />
        </div>
      </CardContent>
    </Card>
  )
}

const Tags = (props: { isLoading: boolean; tags: TagRequest[] }) => {
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
    <div className="max-h-36 overflow-y-auto px-2">
      {props.tags.map((tag) => (
        <div key={tag.name} className="flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: tag.colour }}
          />
          <div>{tag.name}</div>
        </div>
      ))}
    </div>
  )
}

const LoadingTag = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="inline-block h-2 w-2 rounded-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  )
}
