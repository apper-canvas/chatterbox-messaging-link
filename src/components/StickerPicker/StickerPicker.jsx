import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '../ApperIcon'
import { stickerCategories } from '../../constants/stickerData'

const StickerPicker = ({ 
  isVisible, 
  onClose, 
  selectedCategory, 
  onCategoryChange, 
  onStickerSelect 
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
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
                onClick={() => onCategoryChange(categoryId)}
                className={`flex-1 p-3 text-center transition-colors duration-200 ${
                  selectedCategory === categoryId
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
              {stickerCategories[selectedCategory].stickers.map((sticker) => (
                <motion.button
                  key={sticker.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onStickerSelect(sticker)}
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
              onClick={onClose}
              className="w-full py-2 text-sm text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default StickerPicker