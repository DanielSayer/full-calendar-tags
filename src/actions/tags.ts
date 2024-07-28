import { Tag, TagRequest } from '@/components/tags-sheet'
import { delay } from '@/lib/utils'

export const getTags = async () => {
  await delay(250)
  const tags = JSON.parse(localStorage.getItem('tags') || '[]') as Tag[]
  return tags.sort((a, b) => a.name.localeCompare(b.name))
}

export const createTag = async (tag: TagRequest) => {
  const tagName = tag.name.trim()
  if (!tagName) {
    throw Error('Tag name is required')
  }
  const existingTags = await getTags()
  if (existingTags.find((t) => t.name === tagName)) {
    throw Error('Tag with that name already exists')
  }
  const id = crypto.randomUUID()
  const newTag: Tag = {
    id,
    ...tag
  }
  localStorage.setItem('tags', JSON.stringify([...existingTags, newTag]))
  return id
}
