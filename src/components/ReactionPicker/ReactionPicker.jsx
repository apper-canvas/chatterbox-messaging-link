import { motion, AnimatePresence } from 'framer-motion'
import { availableReactions } from '../../constants/stickerData'

const ReactionPicker = ({ isVisible, onReactionSelect, position = 'right' }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          className={`absolute ${position === 'right' ? 'right-0' : 'left-0'} top-full mt-2 bg-white dark:bg-surface-800 rounded-lg shadow-xl border border-surface-200 dark:border-surface-700 p-2 flex space-x-1 z-10`}
        >
          {availableReactions.map((reaction) => (
            <motion.button
              key={reaction.name}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onReactionSelect(reaction.emoji)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200"
            >
              <span className="text-lg">{reaction.emoji}</span>
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ReactionPicker