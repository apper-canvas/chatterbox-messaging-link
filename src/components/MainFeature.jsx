import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState({})
  const [onlineUsers, setOnlineUsers] = useState(['alex-j', 'sarah-m'])
  const [typingUsers, setTypingUsers] = useState([])
  const [showContacts, setShowContacts] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
const [showStickerPicker, setShowStickerPicker] = useState(false)
  const [selectedStickerCategory, setSelectedStickerCategory] = useState('emotions')
const [showReactionPicker, setShowReactionPicker] = useState(null)
  const [messageReactions, setMessageReactions] = useState({})

  // Reaction emojis
  const availableReactions = [
    { emoji: '👍', name: 'thumbs_up' },
    { emoji: '❤️', name: 'heart' },
    { emoji: '😂', name: 'laugh' },
    { emoji: '😮', name: 'wow' },
    { emoji: '😢', name: 'sad' },
    { emoji: '😡', name: 'angry' }
  ]

  // Sticker data
  const stickerCategories = {
emotions: {
      name: 'Emotions',
      name: 'Emotions',
      icon: 'Smile',
      stickers: [
        { id: 'happy', name: 'Happy', url: 'https://images.unsplash.com/photo-1642425149556-b6f90e946859?w=100&h=100&fit=crop' },
        { id: 'sad', name: 'Sad', url: 'https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?w=100&h=100&fit=crop' },
        { id: 'love', name: 'Love', url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=100&h=100&fit=crop' },
        { id: 'laugh', name: 'Laugh', url: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=100&h=100&fit=crop' },
        { id: 'angry', name: 'Angry', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop' },
        { id: 'surprised', name: 'Surprised', url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop' },
        { id: 'excited', name: 'Excited', url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop' },
        { id: 'cool', name: 'Cool', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' }
      ]
    },
    animals: {
      name: 'Animals',
      icon: 'Heart',
      stickers: [
        { id: 'cat', name: 'Cat', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&h=100&fit=crop' },
        { id: 'dog', name: 'Dog', url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100&h=100&fit=crop' },
        { id: 'panda', name: 'Panda', url: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=100&h=100&fit=crop' },
        { id: 'lion', name: 'Lion', url: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=100&h=100&fit=crop' },
        { id: 'rabbit', name: 'Rabbit', url: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=100&h=100&fit=crop' },
        { id: 'elephant', name: 'Elephant', url: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=100&h=100&fit=crop' },
        { id: 'monkey', name: 'Monkey', url: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=100&h=100&fit=crop' },
        { id: 'bear', name: 'Bear', url: 'https://images.unsplash.com/photo-1446824505046-e43605ffb17f?w=100&h=100&fit=crop' }
      ]
    },
    food: {
      name: 'Food',
      icon: 'Coffee',
      stickers: [
        { id: 'pizza', name: 'Pizza', url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop' },
        { id: 'burger', name: 'Burger', url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=100&h=100&fit=crop' },
        { id: 'coffee', name: 'Coffee', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop' },
        { id: 'cake', name: 'Cake', url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100&fit=crop' },
        { id: 'apple', name: 'Apple', url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=100&h=100&fit=crop' },
        { id: 'icecream', name: 'Ice Cream', url: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=100&h=100&fit=crop' },
        { id: 'donut', name: 'Donut', url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=100&h=100&fit=crop' },
        { id: 'sushi', name: 'Sushi', url: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=100&h=100&fit=crop' }
      ]
    },
    actions: {
      name: 'Actions',
      icon: 'Zap',
      stickers: [
        { id: 'thumbsup', name: 'Thumbs Up', url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop' },
        { id: 'clap', name: 'Clap', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=100&fit=crop' },
        { id: 'wave', name: 'Wave', url: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=100&h=100&fit=crop' },
        { id: 'dance', name: 'Dance', url: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=100&h=100&fit=crop' },
        { id: 'run', name: 'Run', url: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=100&fit=crop' },
        { id: 'sleep', name: 'Sleep', url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=100&h=100&fit=crop' },
        { id: 'thinking', name: 'Thinking', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
        { id: 'peace', name: 'Peace', url: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=100&h=100&fit=crop' }
      ]
    },
    celebrations: {
      name: 'Celebrations',
      icon: 'Star',
      stickers: [
        { id: 'party', name: 'Party', url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=100&h=100&fit=crop' },
        { id: 'gift', name: 'Gift', url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop' },
        { id: 'fireworks', name: 'Fireworks', url: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=100&h=100&fit=crop' },
        { id: 'birthday', name: 'Birthday', url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100&fit=crop' },
        { id: 'star', name: 'Star', url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=100&h=100&fit=crop' },
        { id: 'trophy', name: 'Trophy', url: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=100&h=100&fit=crop' },
        { id: 'confetti', name: 'Confetti', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=100&h=100&fit=crop' },
        { id: 'champagne', name: 'Champagne', url: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=100&h=100&fit=crop' }
      ]
    },
    nature: {
      name: 'Nature',
      icon: 'TreePine',
      stickers: [
        { id: 'flower', name: 'Flower', url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=100&h=100&fit=crop' },
        { id: 'tree', name: 'Tree', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop' },
        { id: 'sun', name: 'Sun', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop' },
        { id: 'moon', name: 'Moon', url: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=100&h=100&fit=crop' },
        { id: 'rainbow', name: 'Rainbow', url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=100&h=100&fit=crop' },
        { id: 'mountain', name: 'Mountain', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop' },
        { id: 'ocean', name: 'Ocean', url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=100&h=100&fit=crop' },
        { id: 'butterfly', name: 'Butterfly', url: 'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=100&h=100&fit=crop' }
      ]
    }
  }

  // Mock data
  const [contacts] = useState([
    { id: 'alex-j', name: 'Alex Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', lastSeen: new Date(), isOnline: true },
    { id: 'sarah-m', name: 'Sarah Miller', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face', lastSeen: new Date(Date.now() - 300000), isOnline: true },
    { id: 'mike-r', name: 'Mike Rodriguez', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', lastSeen: new Date(Date.now() - 1800000), isOnline: false },
    { id: 'team-dev', name: 'Dev Team', avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop&crop=face', lastSeen: new Date(), isOnline: true, isGroup: true }
  ])

  const [conversations, setConversations] = useState([
    { id: 'alex-j', lastMessage: 'Hey! How are you doing?', timestamp: new Date(Date.now() - 120000), unread: 2 },
    { id: 'sarah-m', lastMessage: 'Perfect! See you tomorrow 👍', timestamp: new Date(Date.now() - 300000), unread: 0 },
    { id: 'mike-r', lastMessage: 'Thanks for the help!', timestamp: new Date(Date.now() - 1800000), unread: 1 },
    { id: 'team-dev', lastMessage: 'New release is ready 🚀', timestamp: new Date(Date.now() - 3600000), unread: 5 }
  ])

  useEffect(() => {
    // Initialize messages for each conversation
    const initialMessages = {
      'alex-j': [
        { id: '1', senderId: 'alex-j', content: 'Hey there! How are you doing?', timestamp: new Date(Date.now() - 180000), isRead: true },
        { id: '2', senderId: 'me', content: 'Hi Alex! I\'m doing great, thanks for asking!', timestamp: new Date(Date.now() - 150000), isRead: true },
        { id: '3', senderId: 'alex-j', content: 'That\'s awesome! Want to grab coffee later?', timestamp: new Date(Date.now() - 120000), isRead: false }
      ],
      'sarah-m': [
        { id: '1', senderId: 'me', content: 'Are we still on for the meeting tomorrow?', timestamp: new Date(Date.now() - 320000), isRead: true },
        { id: '2', senderId: 'sarah-m', content: 'Yes! 10 AM sharp. I\'ll prepare the presentation.', timestamp: new Date(Date.now() - 310000), isRead: true },
        { id: '3', senderId: 'sarah-m', content: 'Perfect! See you tomorrow 👍', timestamp: new Date(Date.now() - 300000), isRead: true }
      ],
      'mike-r': [
        { id: '1', senderId: 'mike-r', content: 'Thanks for helping me with the project!', timestamp: new Date(Date.now() - 1800000), isRead: false }
      ],
      'team-dev': [
        { id: '1', senderId: 'sarah-m', content: 'New release is ready 🚀', timestamp: new Date(Date.now() - 3700000), isRead: true },
        { id: '2', senderId: 'alex-j', content: 'Great work everyone!', timestamp: new Date(Date.now() - 3650000), isRead: true },
        { id: '3', senderId: 'mike-r', content: 'Testing completed successfully ✅', timestamp: new Date(Date.now() - 3600000), isRead: false }
      ]
    }
    setMessages(initialMessages)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, selectedChat])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const getContact = (id) => contacts.find(contact => contact.id === id)

  const getConversation = (id) => conversations.find(conv => conv.id === id)
// Handle message reactions
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

  // Get reaction for emoji
  const getReactionByEmoji = (emoji) => {
    return availableReactions.find(r => r.emoji === emoji)
  }

const handleSendMessage = (messageContent = null, messageType = 'text') => {
    const content = messageContent || newMessage.trim()
    if (!content || !selectedChat) return

    const messageId = Date.now().toString()
    const newMsg = {
      id: messageId,
      senderId: 'me',
      content: content,
      type: messageType,
      timestamp: new Date(),
      isRead: false
    }

    setMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMsg]
    }))

    // Update conversation with appropriate last message text
    const lastMessageText = messageType === 'sticker' ? 'Sent a sticker' : content
    setConversations(prev => prev.map(conv => 
      conv.id === selectedChat 
        ? { ...conv, lastMessage: lastMessageText, timestamp: new Date() }
        : conv
    ))

    if (messageType === 'text') {
      setNewMessage('')
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

  const handleStickerSelect = (sticker) => {
    handleSendMessage(sticker.url, 'sticker')
    setShowStickerPicker(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedContact = selectedChat ? getContact(selectedChat) : null
  const chatMessages = selectedChat ? messages[selectedChat] || [] : []

  return (
    <div className="h-[calc(100vh-200px)] flex bg-white dark:bg-surface-900 rounded-2xl shadow-2xl overflow-hidden border border-surface-200 dark:border-surface-700">
      {/* Sidebar */}
      <div className={`w-full sm:w-80 flex-shrink-0 border-r border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 ${selectedChat ? 'hidden sm:block' : 'block'}`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-surface-200 dark:border-surface-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-surface-800 dark:text-surface-200">
              Chats
            </h2>
            <button
              onClick={() => setShowContacts(!showContacts)}
              className="p-2 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors duration-200"
            >
              <ApperIcon name="Plus" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm"
            />
          </div>
        </div>

        {/* Contacts Modal */}
        <AnimatePresence>
          {showContacts && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-b border-surface-200 dark:border-surface-700 bg-surface-100 dark:bg-surface-800"
            >
              <div className="p-4">
                <h3 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">
                  Add Contact
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => {
                        setSelectedChat(contact.id)
                        setShowContacts(false)
                        toast.success(`Started conversation with ${contact.name}`)
                      }}
                      className="contact-item"
                    >
                      <div className="relative">
                        <img
                          src={contact.avatar}
                          alt={contact.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        {contact.isOnline && <div className="online-indicator"></div>}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-surface-800 dark:text-surface-200">
                          {contact.name}
                        </p>
                        <p className="text-xs text-surface-500">
                          {contact.isOnline ? 'Online' : `Last seen ${format(contact.lastSeen, 'p')}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {conversations
            .filter(conv => {
              const contact = getContact(conv.id)
              return contact?.name.toLowerCase().includes(searchQuery.toLowerCase())
            })
            .map((conversation) => {
              const contact = getContact(conversation.id)
              if (!contact) return null

              return (
                <motion.div
                  key={conversation.id}
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                  onClick={() => setSelectedChat(conversation.id)}
                  className={`conversation-item ${selectedChat === conversation.id ? 'bg-primary/10' : ''}`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {contact.isOnline && <div className="online-indicator"></div>}
                  </div>
                  
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-surface-800 dark:text-surface-200 truncate">
                        {contact.name}
                        {contact.isGroup && <ApperIcon name="Users" className="inline w-3 h-3 ml-1" />}
                      </h3>
                      <span className="text-xs text-surface-500 flex-shrink-0">
                        {format(conversation.timestamp, 'p')}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm text-surface-600 dark:text-surface-400 truncate flex-1">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unread > 0 && (
                        <span className="ml-2 bg-primary text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col ${!selectedChat ? 'hidden sm:flex' : 'flex'}`}>
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    onClick={() => setSelectedChat(null)}
                    className="sm:hidden mr-3 p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800"
                  >
                    <ApperIcon name="ArrowLeft" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
                  </button>
                  
                  <div className="relative">
                    <img
                      src={selectedContact?.avatar}
                      alt={selectedContact?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {selectedContact?.isOnline && <div className="online-indicator"></div>}
                  </div>
                  
                  <div className="ml-3">
                    <h3 className="font-medium text-surface-800 dark:text-surface-200">
                      {selectedContact?.name}
                      {selectedContact?.isGroup && <ApperIcon name="Users" className="inline w-4 h-4 ml-1" />}
                    </h3>
                    <p className="text-sm text-surface-500">
                      {selectedContact?.isOnline ? 'Online' : `Last seen ${format(selectedContact?.lastSeen || new Date(), 'p')}`}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors duration-200">
                    <ApperIcon name="Phone" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors duration-200">
                    <ApperIcon name="Video" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors duration-200">
                    <ApperIcon name="MoreVertical" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scroll">
              <AnimatePresence>
                {chatMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
className="group relative"
                  >
                    <div className="flex flex-col items-end space-y-1">
                      <div className={`chat-bubble ${message.senderId === 'me' ? 'chat-bubble-sent' : 'chat-bubble-received'} max-w-xs lg:max-w-md relative`}>
                        {message.type === 'sticker' ? (
                          <img 
                            src={message.content} 
                            alt="Sticker" 
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        ) : (
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        )}
                        
                        {/* Reaction Button */}
                        <button
                          onClick={() => setShowReactionPicker(showReactionPicker === message.id ? null : message.id)}
                          className={`absolute -bottom-2 -right-2 w-6 h-6 bg-surface-100 hover:bg-surface-200 dark:bg-surface-700 dark:hover:bg-surface-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-surface-300 dark:border-surface-600`}
                        >
                          <ApperIcon name="Smile" className="w-3 h-3 text-surface-600 dark:text-surface-400" />
                        </button>
                        
                        <p className={`message-timestamp ${message.senderId === 'me' ? 'text-blue-100' : ''}`}>
                          {format(message.timestamp, 'p')}
                          {message.senderId === 'me' && (
                            <ApperIcon 
                              name={message.isRead ? "CheckCheck" : "Check"} 
                              className="inline w-3 h-3 ml-1" 
                            />
                          )}
                        </p>
                      </div>
                      
                      {/* Message Reactions */}
                      {messageReactions[message.id] && Object.keys(messageReactions[message.id]).length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {Object.entries(messageReactions[message.id]).map(([emoji, users]) => (
                            <motion.button
                              key={emoji}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              onClick={() => handleReaction(message.id, emoji)}
                              className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs border transition-all duration-200 ${
                                users.includes('me') 
                                  ? 'bg-primary/20 border-primary text-primary' 
                                  : 'bg-surface-100 dark:bg-surface-700 border-surface-300 dark:border-surface-600 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600'
                              }`}
                            >
                              <span>{emoji}</span>
                              <span>{users.length}</span>
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Reaction Picker */}
                    <AnimatePresence>
                      {showReactionPicker === message.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: 10 }}
                          className={`absolute ${message.senderId === 'me' ? 'right-0' : 'left-0'} top-full mt-2 bg-white dark:bg-surface-800 rounded-lg shadow-xl border border-surface-200 dark:border-surface-700 p-2 flex space-x-1 z-10`}
                        >
                          {availableReactions.map((reaction) => (
                            <motion.button
                              key={reaction.name}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleReaction(message.id, reaction.emoji)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200"
                            >
                              <span className="text-lg">{reaction.emoji}</span>
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
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
                  className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors duration-200 flex-shrink-0"
                >
                  <ApperIcon name="Smile" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
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
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-3 bg-primary hover:bg-primary-dark disabled:bg-surface-300 disabled:cursor-not-allowed text-white rounded-full transition-colors duration-200 flex-shrink-0"
                >
                  <ApperIcon name="Send" className="w-5 h-5" />
                </button>
              </div>
{/* Sticker Picker */}
              <AnimatePresence>
                {showStickerPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-surface-800 rounded-lg shadow-xl border border-surface-200 dark:border-surface-700 overflow-hidden"
                  >
                    {/* Sticker Categories */}
                    <div className="flex border-b border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900">
                      {Object.entries(stickerCategories).map(([categoryId, category]) => (
                        <button
                          key={categoryId}
                          onClick={() => setSelectedStickerCategory(categoryId)}
                          className={`flex-1 p-3 text-center transition-colors duration-200 ${
                            selectedStickerCategory === categoryId
                              ? 'bg-primary text-white'
                              : 'hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-600 dark:text-surface-400'
                          }`}
                        >
                          <ApperIcon name={category.icon} className="w-5 h-5 mx-auto mb-1" />
                          <p className="text-xs font-medium">{category.name}</p>
                        </button>
                      ))}
                    </div>
                    
                    {/* Sticker Grid */}
                    <div className="p-4 max-h-60 overflow-y-auto">
                      <div className="grid grid-cols-4 gap-3">
                        {stickerCategories[selectedStickerCategory].stickers.map((sticker) => (
                          <motion.button
                            key={sticker.id}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleStickerSelect(sticker)}
                            className="aspect-square rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 border border-surface-200 dark:border-surface-700"
                          >
                            <img
                              src={sticker.url}
                              alt={sticker.name}
                              className="w-full h-full object-cover"
                            />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Close Button */}
                    <div className="p-2 border-t border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900">
                      <button
                        onClick={() => setShowStickerPicker(false)}
                        className="w-full py-2 text-sm text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200 transition-colors duration-200"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
                Welcome to ChatterBox
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