import useWindowSize from '@/hooks/useWindowSize'
import { getCalendarProps } from '@/lib/calendarUtils'
import '@/styles/full-calendar.css'

import type { CalendarOptions } from '@fullcalendar/core/index.js'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import type { MutableRefObject } from 'react'

export type CalendarProps = Omit<CalendarOptions, 'plugins'> & {
  calendarRef: MutableRefObject<FullCalendar | null>
}

export const EventCalendar = ({ calendarRef, ...props }: CalendarProps) => {
  const { width, height } = useWindowSize()
  const viewDeterministicProps = getCalendarProps(width)

  return (
    <FullCalendar
      {...props}
      locale="en-au"
      plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
      {...viewDeterministicProps}
      eventClassNames="border-none bg-transparent shadow-none"
      allDaySlot={false}
      handleWindowResize
      height={height - 32}
      ref={calendarRef}
      views={{
        timeGridThreeDay: {
          type: 'timeGrid',
          duration: { days: 3 },
          titleFormat: { month: 'short', day: 'numeric', separator: ' - ' }
        }
      }}
      nowIndicator
      editable
    />
  )
}
