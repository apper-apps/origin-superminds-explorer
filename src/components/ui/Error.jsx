import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ message = "Oops! Something went wrong", onRetry }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className="w-24 h-24 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mb-6"
        animate={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ApperIcon name="AlertTriangle" size={40} className="text-red-500" />
      </motion.div>
      
      <h3 className="text-2xl font-display text-gray-800 mb-2">
        Oh No!
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {message}. Don't worry, we'll get this fixed for you!
      </p>
      
      {onRetry && (
        <motion.button
          onClick={onRetry}
          className="btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="RefreshCw" size={16} className="mr-2" />
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
};

export default Error;