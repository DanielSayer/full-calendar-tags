import { createContext, useState } from 'react'

type TagsPopupConfig = {
  addOnCreate?: {
    eventId: string
  }
}

export type EventPopupConfig =
  | {
      mode: 'create'
      create?: {
        startDate: string
        endDate: string
        startTime: string
        endTime: string
      }
    }
  | {
      mode: 'edit'
      edit: {
        id: string
        name: string
        startDate: string
        endDate: string
        startTime: string
        endTime: string
      }
    }

type PopupContextType = {
  isTagsPopupOpen: boolean
  tagsPopupConfig: TagsPopupConfig
  isEventPopupOpen: boolean
  eventPopupConfig: EventPopupConfig
  toggleTagsPopup: () => void
  toggleEventPopup: () => void
  configureTagsPopup: (config: TagsPopupConfig) => void
  configureEventPopup: (config: EventPopupConfig) => void
}

export const PopupContext = createContext<PopupContextType>(
  {} as PopupContextType
)

export const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTagsPopupOpen, setIsTagsPopupOpen] = useState<boolean>(false)
  const [isEventPopupOpen, setIsEventPopupOpen] = useState<boolean>(false)
  const [eventPopupConfig, setEventPopupConfig] = useState<EventPopupConfig>(
    {} as EventPopupConfig
  )
  const [tagsPopupConfig, setTagsPopupConfig] = useState<TagsPopupConfig>(
    {} as TagsPopupConfig
  )

  const toggleTagsPopup = () => {
    if (isTagsPopupOpen) {
      setTagsPopupConfig({} as TagsPopupConfig)
    }
    setIsTagsPopupOpen(!isTagsPopupOpen)
  }

  const toggleEventPopup = () => {
    if (isEventPopupOpen) {
      setEventPopupConfig({} as EventPopupConfig)
    }
    setIsEventPopupOpen(!isEventPopupOpen)
  }

  const configureTagsPopup = (config: TagsPopupConfig) => {
    setTagsPopupConfig(config)
  }

  const configureEventPopup = (config: EventPopupConfig) => {
    setEventPopupConfig(config)
  }

  return (
    <PopupContext.Provider
      value={{
        isTagsPopupOpen,
        tagsPopupConfig,
        isEventPopupOpen,
        eventPopupConfig,
        configureTagsPopup,
        toggleTagsPopup,
        configureEventPopup,
        toggleEventPopup
      }}
    >
      {children}
    </PopupContext.Provider>
  )
}
