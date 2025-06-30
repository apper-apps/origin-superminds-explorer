import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const StatCard = ({ icon, title, value, subtitle, color = 'primary', index = 0 }) => {
  const colorClasses = {
    primary: 'from-primary-400 to-primary-500',
    secondary: 'from-secondary-400 to-secondary-500',
    accent: 'from-accent-400 to-accent-500',
    success: 'from-green-400 to-emerald-500'
  };
  
return (
    <motion.div
      className="card p-4 sm:p-6 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -3 }}
    >
      <div className="flex items-center space-x-3 sm:space-x-4 h-full">
        <motion.div
          className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${colorClasses[color]} rounded-lg sm:rounded-xl flex items-center justify-center shadow-soft flex-shrink-0`}
          whileHover={{ rotate: 10 }}
        >
          <ApperIcon name={icon} size={16} className="text-white sm:w-5 sm:h-5" />
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{title}</h3>
          <motion.div
            className="text-xl sm:text-2xl font-display text-gray-800"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
          >
            {value}
          </motion.div>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-1">{subtitle}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;