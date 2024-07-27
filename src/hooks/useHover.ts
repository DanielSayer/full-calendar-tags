import { type RefObject, useEffect, useState } from 'react'

interface UseHoverProps {
  debounce?: number
}

export function useHover<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T>,
  { debounce = 0 }: UseHoverProps = {}
): boolean {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleMouseEnter = () => {
      if (debounce > 0) {
        const timeout = setTimeout(() => setIsHovering(true), debounce)
        setHoverTimeout(timeout)
      } else {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
        setHoverTimeout(null)
      }
      setIsHovering(false)
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [elementRef, debounce, hoverTimeout])

  return isHovering
}
