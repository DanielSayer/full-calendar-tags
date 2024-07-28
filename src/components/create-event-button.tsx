import usePopups from '@/hooks/usePopups'
import CreateEventDialog from './create-event-dialog'
import { Icons } from './icons'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger
} from './ui/dialog'

const CreateEventButton = () => {
  const { isEventPopupOpen, eventPopupConfig, toggleEventPopup } = usePopups()
  const isEditingEvent = eventPopupConfig.mode !== 'edit'
  return (
    <Dialog open={isEventPopupOpen} onOpenChange={toggleEventPopup}>
      <DialogTrigger asChild onClick={toggleEventPopup}>
        <div>
          <Button
            className="absolute bottom-10 right-10 z-50 aspect-square h-14 w-14 rounded-full shadow-lg md:bottom-14 md:right-14 lg:hidden"
            size="icon"
          >
            <Icons.add className="h-8 w-8" />
          </Button>
          <Button className="hidden lg:absolute lg:left-[188px] lg:top-[18px] lg:flex">
            <Icons.add className="me-2" /> Create
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="gap-2">
        <CreateEventDialog toggle={toggleEventPopup} />
        <DialogDescription className="sr-only">
          {isEditingEvent ? 'Edit' : 'Create'} a new event
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default CreateEventButton
