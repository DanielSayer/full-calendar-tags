import usePopups from '@/hooks/usePopups'
import useTags from '@/hooks/useTags'
import { DragOverlay } from '@dnd-kit/core'
import Draggable from './draggable'
import { Icons } from './icons'
import { LoadingTag, SelectableTagItem, TagItem } from './tag'
import type { Tag } from './tags-sheet'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card'
import { Separator } from './ui/separator'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { useState } from 'react'

export const TagsSection = (props: {
  activeTagId: string | null
  selectedTagIds: string[]
  handleSelectTag: (id: string) => void
}) => {
  const { toggleTagsPopup } = usePopups()
  const { data, isLoading } = useTags()
  const [activeTab, setActiveTab] = useState<'add' | 'filter'>('add')

  const getDescription = () => {
    if (activeTab === 'add') {
      return 'Drag and drop a tag to an event.'
    }
    return 'Filter tags by name.'
  }

  return (
    <>
      <Card>
        <CardHeader className="space-y-0 p-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Tags</CardTitle>
            <Tabs value={activeTab}>
              <TabsList className="mb-2 grid w-full grid-cols-2">
                <TabsTrigger value="add" onClick={() => setActiveTab('add')}>
                  Add
                </TabsTrigger>
                <TabsTrigger
                  value="filter"
                  onClick={() => setActiveTab('filter')}
                >
                  Filter
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <CardDescription className="text-sm">
            {getDescription()}
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="p-2">
          <Tags
            activeTab={activeTab}
            selectedTagIds={props.selectedTagIds}
            tags={data ?? []}
            isLoading={isLoading}
            activeTagId={props.activeTagId}
            handleSelectTag={props.handleSelectTag}
          />
          <div className="flex justify-end">
            <Button onClick={() => toggleTagsPopup()} variant="outline">
              <Icons.add className="mr-2 h-4 w-4" /> Add tag
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

const Tags = (props: {
  isLoading: boolean
  activeTab: 'add' | 'filter'
  selectedTagIds: string[]
  tags: Tag[]
  activeTagId: string | null
  handleSelectTag: (id: string) => void
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

  if (props.activeTab === 'filter') {
    return (
      <div className="flex max-h-52 flex-col overflow-y-auto px-2 py-2">
        {props.tags.map((tag) => {
          const isSelected = props.selectedTagIds.includes(tag.id)
          return (
            <div className="flex" key={tag.id}>
              <SelectableTagItem
                tag={tag}
                isSelected={isSelected}
                handleClick={props.handleSelectTag}
              />
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <>
      <div className="flex max-h-52 flex-col overflow-y-auto px-2 py-2">
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
