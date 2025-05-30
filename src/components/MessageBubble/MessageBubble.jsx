import { motion } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from '../ApperIcon'
import ReactionPicker from '../ReactionPicker/ReactionPicker'

const MessageBubble = ({ 
  message, 
  messageReactions, 
  showReactionPicker, 
  onToggleReactionPicker, 
  onReaction 
}) => {
  const isOwnMessage = message.senderId === 'me'

const isSentByMe = isOwnMessage
  const messageStatus = message.status || 'sent'
  
  const handleMessageClick = () => {
    if (isSentByMe && (messageStatus === 'sent' || messageStatus === 'delivered')) {
      // This would typically be passed from parent component
      // For now, we'll simulate the status change
      console.log(`Message ${message.id} clicked, status: ${messageStatus}`)
    }
  }

  const getStatusIcon = () => {
    switch (messageStatus) {
      case 'sent':
        return <ApperIcon name="Check" className="w-3 h-3 text-surface-400" />
      case 'delivered':
        return <ApperIcon name="CheckCheck" className="w-3 h-3 text-primary" />
      case 'seen':
        return <ApperIcon name="CheckCheck" className="w-3 h-3 text-secondary" />
      default:
        return null
    }
  }

  const getMessageClasses = () => {
    let classes = 'message-group group relative '
    if (isSentByMe) {
      classes += 'message-clickable '
      if (messageStatus === 'seen') {
        classes += 'message-seen '
      } else if (messageStatus === 'delivered') {
        classes += 'message-delivered '
      }
    }
    return classes
  }
return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative"
    >
      <div className="flex flex-col items-end space-y-1">
        <div className={`chat-bubble ${isOwnMessage ? 'chat-bubble-sent' : 'chat-bubble-received'} max-w-xs lg:max-md relative`}>
{message.type === 'sticker' ? (
            <div className={getMessageClasses()} onClick={handleMessageClick}>
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
            onClick={() => onToggleReactionPicker(message.id)}
            className={`absolute -bottom-2 -right-2 w-6 h-6 bg-surface-100 hover:bg-surface-200 dark:bg-surface-700 dark:hover:bg-surface-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-surface-300 dark:border-surface-600`}
          >
            <ApperIcon name="Smile" className="w-3 h-3 text-surface-600 dark:text-surface-400" />
          </button>
          
          <p className={`message-timestamp ${isOwnMessage ? 'text-blue-100' : ''}`}>
            {format(message.timestamp, 'p')}
            {isOwnMessage && (
              <ApperIcon 
                name={message.isRead ? "CheckCheck" : "Check"} 
                className="inline w-3 h-3 ml-1" 
              />
            )}
          </p>
{/* Message Status for sent messages */}
          {isSentByMe && (
            <div className="flex justify-end items-center mt-1 space-x-1">
              {getStatusIcon()}
              <span className={`text-xs ${
                messageStatus === 'seen' ? 'text-secondary' :
                messageStatus === 'delivered' ? 'text-primary' : 'text-surface-400'
              }`}>
                {messageStatus}
              </span>
            </div>
          )}
        </div>
        
        {/* Message Reactions */}
        {messageReactions[message.id] && Object.keys(messageReactions[message.id]).length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {Object.entries(messageReactions[message.id]).map(([emoji, users]) => (
              <motion.button
                key={emoji}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => onReaction(message.id, emoji)}
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
      <ReactionPicker
        isVisible={showReactionPicker === message.id}
        onReactionSelect={(emoji) => onReaction(message.id, emoji)}
        position={isOwnMessage ? 'right' : 'left'}
      />
    </motion.div>
  )
}

export default MessageBubble