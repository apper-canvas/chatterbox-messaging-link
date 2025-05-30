import { useState } from 'react'
import { toast } from 'react-toastify'

export const useReactions = () => {
  const [messageReactions, setMessageReactions] = useState({})
  const [showReactionPicker, setShowReactionPicker] = useState(null)

  const handleReaction = (messageId, reactionName) => {
    setMessageReactions(prev => {
      const messageReacts = prev[messageId] || {}
      const reactionUsers = messageReacts[reactionName] || []
      
      let newReactionUsers
      if (reactionUsers.includes('me')) {
        // Remove reaction
        newReactionUsers = reactionUsers.filter(user => user !== 'me')
        toast.info('Reaction removed')
      } else {
        // Add reaction
        newReactionUsers = [...reactionUsers, 'me']
        toast.success('Reaction added!')
      }

      const newMessageReacts = {
        ...messageReacts,
        [reactionName]: newReactionUsers.length > 0 ? newReactionUsers : undefined
      }

      // Remove empty reaction types
      Object.keys(newMessageReacts).forEach(key => {
        if (!newMessageReacts[key] || newMessageReacts[key].length === 0) {
          delete newMessageReacts[key]
        }
      })

      return {
        ...prev,
        [messageId]: Object.keys(newMessageReacts).length > 0 ? newMessageReacts : undefined
      }
    })
    
    setShowReactionPicker(null)
  }

  return {
    messageReactions,
    showReactionPicker,
    setShowReactionPicker,
    handleReaction
  }
}