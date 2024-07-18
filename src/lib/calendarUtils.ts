export const TW_MD_BREAKPOINT = 768

export function getCalendarProps(width: number) {
  if (width < TW_MD_BREAKPOINT) {
    return {
      headerToolbar: {
        left: 'title',
        right: 'prev,next,today'
      }
    }
  }

  return {
    headerToolbar: {
      left: 'prev,next,today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    }
  }
}
