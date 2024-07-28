import { createContext, useState } from 'react'

type TagsPopupConfig = {
  addOnCreate?: {
    eventId: string
  }
}

type PopupContextType = {
  isTagsPopupOpen: boolean
  tagsPopupConfig: TagsPopupConfig
  toggleTagsPopup: () => void
  configureTagsPopup: (config: TagsPopupConfig) => void
}

export const PopupContext = createContext<PopupContextType>(
  {} as PopupContextType
)

export const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTagsPopupOpen, setIsTagsPopupOpen] = useState<boolean>(false)
  const [tagsPopupConfig, setTagsPopupConfig] = useState<TagsPopupConfig>(
    {} as TagsPopupConfig
  )

  const toggleTagsPopup = () => {
    if (isTagsPopupOpen) {
      setTagsPopupConfig({} as TagsPopupConfig)
    }
    setIsTagsPopupOpen(!isTagsPopupOpen)
  }

  const configureTagsPopup = (config: TagsPopupConfig) => {
    setTagsPopupConfig(config)
  }

  return (
    <PopupContext.Provider
      value={{
        isTagsPopupOpen,
        tagsPopupConfig,
        configureTagsPopup,
        toggleTagsPopup
      }}
    >
      {children}
    </PopupContext.Provider>
  )
}
