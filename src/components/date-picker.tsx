import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { forwardRef } from 'react'
type DatePickerProps = {
  className?: string
  disabled?: boolean
  date?: string
  onChange: (date: string) => void
}

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  function DatePicker({ className, date, disabled, onChange }, ref) {
    const selectedDate = date ? new Date(date) : undefined

    const handleChange = (day: Date | undefined) => {
      const formattedDate = day ? format(day, 'yyyy-MM-dd') : ''
      onChange(formattedDate)
    }

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            disabled={disabled}
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleChange}
          />
        </PopoverContent>
      </Popover>
    )
  }
)
