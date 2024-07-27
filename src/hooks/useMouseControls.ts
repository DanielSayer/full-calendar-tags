import { MouseContext } from '@/providers/mouse-provider'
import { useContext } from 'react'

const useMouseControls = () => {
  const context = useContext(MouseContext)

  if (!context) {
    throw new Error('useMouseControls must be used within a MouseProvider')
  }
  return context
}

export default useMouseControls
