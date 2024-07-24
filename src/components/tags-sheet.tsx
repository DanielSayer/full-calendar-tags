import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { createTagSchema } from '@/lib/validations/tags'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Icons } from './icons'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { Separator } from './ui/separator'
import { useMutation } from '@tanstack/react-query'
import { createTag } from '@/actions/tags'
import { useState } from 'react'
import LoadingButton from './loading-button'

export type Tag = TagRequest & { id: string }
export type TagRequest = z.infer<typeof createTagSchema>

export function CreateTagForm(props: { refetch: () => void }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const form = useForm<TagRequest>({
    defaultValues: { name: '', colour: '#7C3AED' },
    resolver: zodResolver(createTagSchema)
  })

  const { isPending, mutateAsync } = useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      props.refetch()
      setIsOpen(false)
      form.reset()
    },
    onError: (error) => {
      form.setError('name', {
        message: error.message
      })
    }
  })

  const onSubmit = async (data: TagRequest) => {
    await mutateAsync(data)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Icons.add className="me-2 h-4 w-4" /> Add tag
        </Button>
      </SheetTrigger>
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
                      <Input {...field} placeholder="My new tag" />
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
