import { useState } from 'react'

export const useStickers = () => {
  const [showStickerPicker, setShowStickerPicker] = useState(false)
  const [selectedStickerCategory, setSelectedStickerCategory] = useState('emotions')

  const handleStickerSelect = (sticker, onSendMessage) => {
    onSendMessage(sticker.url, 'sticker')
    setShowStickerPicker(false)
  }

  return {
    showStickerPicker,
    setShowStickerPicker,
    selectedStickerCategory,
    setSelectedStickerCategory,
    handleStickerSelect
  }
}