import { Tag } from '@/components/tags-sheet'
import { delay } from '@/lib/utils'

export const getTags = async () => {
  await delay(250)
  const tags = JSON.parse(localStorage.getItem('tags') || '[]') as Tag[]
  return tags
}

export const createTag = async (tag: Tag) => {
  const existingTags = await getTags()
  if (existingTags.find((t) => t.name === tag.name)) {
    throw Error('Tag with that name already exists')
  }
  localStorage.setItem('tags', JSON.stringify([...existingTags, tag]))
}
