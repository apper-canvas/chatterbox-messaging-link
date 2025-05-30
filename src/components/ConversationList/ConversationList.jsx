import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import ApperIcon from '../ApperIcon'

const ConversationList = ({ 
  conversations, 
  contacts, 
  selectedChat, 
  onSelectChat, 
  showContacts, 
  onToggleContacts,
  searchQuery, 
  onSearchChange 
}) => {
  const getContact = (id) => contacts.find(contact => contact.id === id)

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredConversations = conversations.filter(conv => {
    const contact = getContact(conv.id)
    return contact?.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className={`w-full sm:w-80 flex-shrink-0 border-r border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 ${selectedChat ? 'hidden sm:block' : 'block'}`}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-surface-800 dark:text-surface-200">
            Chats
          </h2>
          <button
            onClick={onToggleContacts}
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
            onChange={(e) => onSearchChange(e.target.value)}
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
                      onSelectChat(contact.id)
                      onToggleContacts()
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
        {filteredConversations.map((conversation) => {
          const contact = getContact(conversation.id)
          if (!contact) return null

          return (
            <motion.div
              key={conversation.id}
              whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
              onClick={() => onSelectChat(conversation.id)}
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
  )
}

export default ConversationList