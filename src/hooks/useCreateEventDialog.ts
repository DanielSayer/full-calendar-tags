import { DateSelectArg } from '@fullcalendar/core/index.js'
import { format } from 'date-fns'
import { useState } from 'react'

export type CreateEventDates = {
  date: string
  start: string
  end: string
}

export type EditEventDates = {
  id: string
  name: string
  date: string
  start: string
  end: string
}

const useCreateEventDialog = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggle = () => {
    if (isOpen) {
      setEditEventsDates(undefined)
      setCreateEventsDates(undefined)
    }
    setIsOpen(!isOpen)
  }
  const [createEventDates, setCreateEventsDates] = useState<
    CreateEventDates | undefined
  >(undefined)
  const [editEventDates, setEditEventsDates] = useState<
    EditEventDates | undefined
  >(undefined)

  const handleSelect = (args: DateSelectArg) => {
    const start = format(args.start, 'HH:mm')
    const end = format(args.end, 'HH:mm')
    const date = format(args.start, 'yyyy-MM-dd')
    setCreateEventsDates({ date, start, end })
    toggle()
  }

  const handleEdit = (event: EditEventDates) => {
    setEditEventsDates(event)
    toggle()
  }

  return {
    isOpen,
    toggle,
    createEventDates,
    handleSelect,
    editEventDates,
    handleEdit
  }
}

export default useCreateEventDialog
