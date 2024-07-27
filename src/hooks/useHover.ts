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
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleMouseEnter = () => {
      if (!isMouseDown) {
        if (debounce > 0) {
          const timeout = setTimeout(() => setIsHovering(true), debounce)
          setHoverTimeout(timeout)
        } else {
          setIsHovering(true)
        }
      }
    }

    const handleMouseLeave = () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
        setHoverTimeout(null)
      }
      setIsHovering(false)
    }

    const handleMouseDown = () => {
      setIsMouseDown(true)
      setIsHovering(false)
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
        setHoverTimeout(null)
      }
    }

    const handleMouseUp = () => {
      setIsMouseDown(false)
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [elementRef, debounce, hoverTimeout, isMouseDown])

  return isHovering
}
