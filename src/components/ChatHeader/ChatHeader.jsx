import { format } from 'date-fns'
import ApperIcon from '../ApperIcon'

const ChatHeader = ({ contact, onBack }) => {
  return (
    <div className="p-4 border-b border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="sm:hidden mr-3 p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800"
          >
            <ApperIcon name="ArrowLeft" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
          </button>
          
          <div className="relative">
            <img
              src={contact?.avatar}
              alt={contact?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {contact?.isOnline && <div className="online-indicator"></div>}
          </div>
          
          <div className="ml-3">
            <h3 className="font-medium text-surface-800 dark:text-surface-200">
              {contact?.name}
              {contact?.isGroup && <ApperIcon name="Users" className="inline w-4 h-4 ml-1" />}
            </h3>
            <p className="text-sm text-surface-500">
              {contact?.isOnline ? 'Online' : `Last seen ${format(contact?.lastSeen || new Date(), 'p')}`}
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
  )
}

export default ChatHeader