import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = "Nothing to see here yet!", 
  message = "Start your learning adventure by trying an activity!",
  actionText = "Explore Activities",
  onAction
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-12 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <motion.div
        className="w-32 h-32 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mb-6"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <ApperIcon name="BookOpen" size={60} className="text-primary-500" />
      </motion.div>
      
      <h3 className="text-3xl font-display text-gray-800 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md text-lg">
        {message}
      </p>
      
      {onAction && (
        <motion.button
          onClick={onAction}
          className="btn-primary text-lg px-8 py-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="Sparkles" size={20} className="mr-2" />
          {actionText}
        </motion.button>
      )}
    </motion.div>
  );
};

export default Empty;