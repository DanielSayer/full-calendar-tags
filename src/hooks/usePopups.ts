import { PopupContext } from '@/providers/popup-provider'
import { useContext } from 'react'

const usePopups = () => {
  const context = useContext(PopupContext)

  if (context === undefined) {
    throw new Error('usePopups must be used within a PopupProvider')
  }
  return context
}

export default usePopups
