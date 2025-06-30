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
      className="card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center space-x-4">
        <motion.div
          className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center shadow-soft`}
          whileHover={{ rotate: 10 }}
        >
          <ApperIcon name={icon} size={20} className="text-white" />
        </motion.div>
        
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
          <motion.div
            className="text-2xl font-display text-gray-800"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
          >
            {value}
          </motion.div>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;