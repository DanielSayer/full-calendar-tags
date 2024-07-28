import { createEditEvent } from '@/actions/events'
import usePopups from '@/hooks/usePopups'
import { createEventSchema } from '@/lib/validations/events'
import { EventPopupConfig } from '@/providers/popup-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { DatePicker } from './date-picker'
import LoadingButton from './loading-button'
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
import { Input } from './ui/input'

export type EventRequest = z.infer<typeof createEventSchema>

const CreateEventDialog = (props: {
  toggle: () => void
  refetch: () => void
}) => {
  const { eventPopupConfig } = usePopups()
  const isEditingEvent = eventPopupConfig.mode === 'edit'
  const eventId =
    eventPopupConfig.mode === 'edit' ? eventPopupConfig.edit.id : undefined
  const form = useForm<EventRequest>({
    defaultValues: getDefaultValues(eventPopupConfig),
    resolver: zodResolver(createEventSchema)
  })

  const { isPending, mutateAsync } = useMutation({
    mutationFn: createEditEvent,
    onSuccess: () => {
      props.refetch()
      props.toggle()
      toast.success(
        `Event successfully ${isEditingEvent ? 'edited' : 'created'}`
      )
    }
  })

  const onSubmit = async (data: EventRequest) => {
    await mutateAsync({ event: data, id: eventId })
  }

  return (
    <>
      <DialogHeader className="font-semibold">
        <DialogTitle>{isEditingEvent ? 'Edit' : 'Create'} Event</DialogTitle>
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
                        placeholder="Event Name"
                        type="text"
                        autoCapitalize="none"
                        autoCorrect="off"
                        autoComplete="off"
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
              loadingText={`${isEditingEvent ? 'Editing' : 'Creating'}...`}
              isLoading={isPending}
            >
              {isEditingEvent ? 'Edit' : 'Create'}
            </LoadingButton>
          </DialogFooter>
        </form>
      </Form>
    </>
  )
}

function getDefaultValues(config: EventPopupConfig) {
  if (config.mode === 'edit') {
    const { name, date, start, end } = config.edit!

    return {
      name,
      date,
      startTime: start,
      endTime: end
    }
  }
  return {
    name: '',
    date: config.create?.date,
    startTime: config.create?.start ?? '',
    endTime: config.create?.end ?? ''
  }
}
export default CreateEventDialog
