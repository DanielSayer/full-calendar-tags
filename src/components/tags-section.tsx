import { useQuery } from '@tanstack/react-query'
import { CreateTagForm, Tag } from './tags-sheet'
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

export const TagsSection = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags
  })
  return (
    <Card>
      <CardHeader className="p-2 space-y-0">
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

const Tags = (props: { isLoading: boolean; tags: Tag[] }) => {
  if (props.isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <LoadingTag key={index} />
        ))}
      </div>
    )
  }
  return (
    <div>
      {props.tags.map((tag) => (
        <div key={tag.name} className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full"
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
      <Skeleton className="inline-block w-2 h-2 rounded-full" />
      <Skeleton className="w-full h-4" />
    </div>
  )
}
