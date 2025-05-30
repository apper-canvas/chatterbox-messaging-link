import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { initialMessages, initialConversations } from '../data/mockData'

export const useMessages = () => {
const [messages, setMessages] = useState(initialMessages)
  const [conversations, setConversations] = useState(initialConversations)
  const [typingUsers, setTypingUsers] = useState([])

  const handleSendMessage = (selectedChat, messageContent, messageType = 'text') => {
    if (!messageContent || !selectedChat) return

    const messageId = Date.now().toString()
    const newMsg = {
      id: messageId,
      senderId: 'me',
      content: messageContent,
      type: messageType,
      timestamp: new Date(),
      isRead: false
}
    setMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMsg]
}))
    // Update conversation with appropriate last message text
    const lastMessageText = messageType === 'sticker' ? 'Sent a sticker' : messageContent
    setConversations(prev => prev.map(conv => 
      conv.id === selectedChat 
        ? { ...conv, lastMessage: lastMessageText, timestamp: new Date() }
        : conv
    ))
    if (messageType === 'text') {
      toast.success('Message sent!')
    } else if (messageType === 'sticker') {
      toast.success('Sticker sent!')
    }

    // Simulate typing indicator and response
    setTimeout(() => {
      setTypingUsers([selectedChat])
      setTimeout(() => {
        setTypingUsers([])
        // Simulate a response
        const responses = [
          "That's interesting!",
          "Thanks for letting me know!",
          "Got it! 👍",
          "Sounds good to me!",
          "Let me think about it...",
          "Absolutely!",
          "I agree with you on that."
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        
        const responseMsg = {
          id: (Date.now() + 1).toString(),
          senderId: selectedChat,
          content: randomResponse,
          type: 'text',
          timestamp: new Date(),
          isRead: false
        }

        setMessages(prev => ({
          ...prev,
          [selectedChat]: [...(prev[selectedChat] || []), responseMsg]
        }))

        setConversations(prev => prev.map(conv => 
          conv.id === selectedChat 
            ? { ...conv, lastMessage: randomResponse, timestamp: new Date(), unread: conv.unread + 1 }
            : conv
        ))
      }, 2000)
    }, 500)
  }

  return {
    messages,
    conversations,
    setConversations,
    typingUsers,
    handleSendMessage
  }
}