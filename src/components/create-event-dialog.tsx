import { Button } from './ui/button'
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { useForm } from 'react-hook-form'
import { Input } from './ui/input'
import LoadingButton from './loading-button'
import { DatePicker } from './date-picker'
import { z } from 'zod'
import { createEventSchema } from '@/lib/validations/events'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { createEvent } from '@/actions/createEvent'

export type Event = z.infer<typeof createEventSchema>

const CreateEventDialog = (props: {
  toggle: () => void
  refetch: () => void
}) => {
  const form = useForm<Event>({
    defaultValues: {
      name: '',
      startTime: '',
      endTime: ''
    },
    resolver: zodResolver(createEventSchema)
  })

  const { isPending, mutateAsync } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      props.refetch()
      props.toggle()
    }
  })

  const onSubmit = async (data: Event) => {
    await mutateAsync(data)
  }

  return (
    <>
      <DialogHeader className="font-semibold">
        <DialogTitle>Create Event</DialogTitle>
        <hr className="mt-2" />
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={'Event Name'}
                        type="text"
                        autoCapitalize="none"
                        autoCorrect="off"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full gap-2">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Date</FormLabel>
                  <FormControl>
                    <DatePicker date={field.value} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormMessage className="mt-2">
            {form.formState.errors?.root?.message}
          </FormMessage>
          <hr className="my-2" />
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <LoadingButton
              type="submit"
              loadingText="Creating..."
              isLoading={isPending}
            >
              Create
            </LoadingButton>
          </DialogFooter>
        </form>
      </Form>
    </>
  )
}

export default CreateEventDialog