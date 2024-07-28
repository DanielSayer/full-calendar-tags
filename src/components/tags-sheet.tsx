import { createTag } from '@/actions/tags'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import usePopups from '@/hooks/usePopups'
import { createTagSchema } from '@/lib/validations/tags'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import LoadingButton from './loading-button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { Separator } from './ui/separator'
import { addTagToEvent } from '@/actions/events'
import { toast } from 'sonner'

export type Tag = TagRequest & { id: string }
export type TagRequest = z.infer<typeof createTagSchema>

export function TagsSheet() {
  const client = useQueryClient()
  const { isTagsPopupOpen, tagsPopupConfig, toggleTagsPopup } = usePopups()
  const form = useForm<TagRequest>({
    defaultValues: { name: '', colour: '#7C3AED' },
    resolver: zodResolver(createTagSchema)
  })

  const { isPending, mutateAsync } = useMutation({
    mutationFn: createTag,
    onSuccess: (id) => {
      client.invalidateQueries({ queryKey: ['tags'] })
      toggleTagsPopup()
      form.reset()

      if (tagsPopupConfig.addOnCreate) {
        addTagToEventAsync({
          eventId: tagsPopupConfig.addOnCreate.eventId,
          tagId: id
        })
      }
    },
    onError: (error) => {
      form.setError('name', {
        message: error.message
      })
    }
  })

  const { mutateAsync: addTagToEventAsync } = useMutation({
    mutationFn: addTagToEvent,
    onSuccess: () => {
      toast.success('Tag added to event', { duration: 1500 })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const onSubmit = async (data: TagRequest) => {
    await mutateAsync(data)
  }

  return (
    <Sheet open={isTagsPopupOpen} onOpenChange={toggleTagsPopup}>
      <SheetContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <SheetHeader>
              <SheetTitle>Create a new tag</SheetTitle>
              <SheetDescription>
                Choose your name and colour for your new tag.
              </SheetDescription>
            </SheetHeader>
            <Separator className="mt-2" />
            <div className="space-y-4 py-4">
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="My new tag"
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="colour"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Colour</FormLabel>
                    <FormControl>
                      <Input type="color" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => form.reset()}
                >
                  Close
                </Button>
              </SheetClose>
              <LoadingButton
                type="submit"
                loadingText="Creating..."
                isLoading={isPending}
              >
                Create tag
              </LoadingButton>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
