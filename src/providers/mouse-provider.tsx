import { createContext, useEffect, useState } from 'react'

type MouseContextType = {
  isMouseDown: boolean
}

export const MouseContext = createContext<MouseContextType>(
  {} as MouseContextType
)

export const MouseProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)

  useEffect(() => {
    const handleMouseDown = () => {
      setIsMouseDown(true)
    }

    const handleMouseUp = () => {
      setIsMouseDown(false)
    }

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <MouseContext.Provider value={{ isMouseDown }}>
      {children}
    </MouseContext.Provider>
  )
}
