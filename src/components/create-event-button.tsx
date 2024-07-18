import { useState } from 'react'
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
  refetch: () => void
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggle = () => setIsOpen(!isOpen)
  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger asChild onClick={toggle}>
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
        <CreateEventDialog toggle={toggle} refetch={props.refetch} />
        <DialogDescription className="sr-only">
          Create a new event
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default CreateEventButton
