import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl"
        >
          <ApperIcon name="MessageCircleX" className="w-12 h-12 text-white" />
        </motion.div>
        
        <h1 className="text-6xl font-bold text-surface-800 dark:text-surface-200 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-surface-700 dark:text-surface-300 mb-4">
          Chat Not Found
        </h2>
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The conversation you're looking for doesn't exist or has been moved.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          <ApperIcon name="ArrowLeft" className="w-4 h-4" />
          <span>Back to Chats</span>
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound