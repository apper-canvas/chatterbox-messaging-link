import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from './ApperIcon'
import ConversationList from './ConversationList/ConversationList'
import ChatHeader from './ChatHeader/ChatHeader'
import MessageBubble from './MessageBubble/MessageBubble'
import StickerPicker from './StickerPicker/StickerPicker'
import { useMessages } from '../hooks/useMessages'
import { useReactions } from '../hooks/useReactions'
import { useStickers } from '../hooks/useStickers'
import { contacts } from '../data/mockData'

const MainFeature = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [onlineUsers, setOnlineUsers] = useState(['alex-j', 'sarah-m'])
  const [showContacts, setShowContacts] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const { messages, conversations, setConversations, typingUsers, handleSendMessage } = useMessages()
  const { messageReactions, showReactionPicker, setShowReactionPicker, handleReaction } = useReactions()
  const { 
    showStickerPicker, 
    setShowStickerPicker, 
    selectedStickerCategory, 
    setSelectedStickerCategory, 
    handleStickerSelect 
  } = useStickers()

  useEffect(() => {
    scrollToBottom()
  }, [messages, selectedChat])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const getContact = (id) => contacts.find(contact => contact.id === id)

  const handleSendMessageWrapper = (messageContent = null, messageType = 'text') => {
    const content = messageContent || newMessage.trim()
    if (!content || !selectedChat) return

    handleSendMessage(selectedChat, content, messageType)
    
    if (messageType === 'text') {
      setNewMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessageWrapper()
    }
  }

  const selectedContact = selectedChat ? getContact(selectedChat) : null
  const chatMessages = selectedChat ? messages[selectedChat] || [] : []

  return (
<div className="min-h-[600px] max-h-screen flex bg-white dark:bg-surface-900 rounded-2xl shadow-2xl overflow-hidden border border-surface-200 dark:border-surface-700">
      {/* Sidebar */}
      <ConversationList
        conversations={conversations}
        contacts={contacts}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
        showContacts={showContacts}
        onToggleContacts={() => setShowContacts(!showContacts)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col ${!selectedChat ? 'hidden sm:flex' : 'flex'}`}>
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <ChatHeader 
              contact={selectedContact}
              onBack={() => setSelectedChat(null)}
            />

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scroll">
              <AnimatePresence>
                {chatMessages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    messageReactions={messageReactions}
                    showReactionPicker={showReactionPicker}
                    onToggleReactionPicker={(messageId) => 
                      setShowReactionPicker(showReactionPicker === messageId ? null : messageId)
                    }
                    onReaction={handleReaction}
                  />
                ))}
              </AnimatePresence>
              
              {/* Typing Indicator */}
              {typingUsers.includes(selectedChat) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="chat-bubble chat-bubble-received">
                    <div className="typing-indicator">
                      <div className="typing-dot" style={{ animationDelay: '0ms' }}></div>
                      <div className="typing-dot" style={{ animationDelay: '150ms' }}></div>
                      <div className="typing-dot" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900">
              <div className="flex items-end space-x-3">
                {/* Sticker Button */}
<button
onClick={() => setShowStickerPicker(!showStickerPicker)}
                  className={`p-2 rounded-lg transition-colors duration-200 flex-shrink-0 ${
                    showStickerPicker 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-600 dark:text-surface-400'
                  }`}
                >
                  <ApperIcon name="Smile" className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors duration-200 flex-shrink-0">
                  <ApperIcon name="Paperclip" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
                </button>
                
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="chat-input max-h-32 min-h-[48px]"
                    rows="1"
                  />
                </div>
                
                <button
                  onClick={handleSendMessageWrapper}
                  disabled={!newMessage.trim()}
                  className="p-3 bg-primary hover:bg-primary-dark disabled:bg-surface-300 disabled:cursor-not-allowed text-white rounded-full transition-colors duration-200 flex-shrink-0"
                >
                  <ApperIcon name="Send" className="w-5 h-5" />
                </button>
              </div>

{/* Sticker Picker Container */}
              <div className="relative">
                <StickerPicker
                  isVisible={showStickerPicker}
                  onClose={() => setShowStickerPicker(false)}
                  selectedCategory={selectedStickerCategory}
                  onCategoryChange={setSelectedStickerCategory}
                  onStickerSelect={(sticker) => 
                    handleStickerSelect(sticker, handleSendMessageWrapper)
                  }
                />
              </div>
            </div>
          </>
        ) : (
          /* Welcome Screen */
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <ApperIcon name="MessageCircle" className="w-16 h-16 text-primary" />
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-surface-800 dark:text-surface-200 mb-2"
              >
Welcome to Hike
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-surface-600 dark:text-surface-400 mb-6"
              >
                Select a conversation from the sidebar to start messaging, or create a new chat to connect with friends.
              </motion.p>
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setShowContacts(true)}
                className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <ApperIcon name="Plus" className="w-4 h-4" />
                <span>Start New Chat</span>
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MainFeature