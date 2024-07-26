import { CreateEventDates } from '@/App'
import CreateEventDialog from './create-event-dialog'
import { Icons } from './icons'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger
} from './ui/dialog'

const CreateEventButton = (props: {
  className?: string
  isOpen: boolean
  createEventDates: CreateEventDates | undefined
  toggle: () => void
  refetch: () => void
}) => {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.toggle}>
      <DialogTrigger asChild onClick={props.toggle}>
        <div className={props.className}>
          <Button
            className="absolute bottom-10 right-10 z-50 aspect-square h-14 w-14 rounded-full shadow-lg md:bottom-14 md:right-14 lg:hidden"
            size="icon"
          >
            <Icons.add className="h-8 w-8" />
          </Button>
          <Button className="hidden lg:flex">
            <Icons.add className="me-2" /> Create
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <CreateEventDialog
          toggle={props.toggle}
          refetch={props.refetch}
          data={props.createEventDates}
        />
        <DialogDescription className="sr-only">
          Create a new event
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default CreateEventButton
