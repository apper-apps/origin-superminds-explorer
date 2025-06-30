import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Header = ({ onMenuClick, title = 'Learning Adventure' }) => {
  return (
    <motion.header
      className="bg-white border-b border-gray-200 px-4 py-3 lg:px-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            icon="Menu"
            onClick={onMenuClick}
            className="lg:hidden"
          />
          
          <div>
            <h2 className="text-xl font-display text-gray-800">{title}</h2>
            <p className="text-sm text-gray-500">Let's learn something amazing today!</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <motion.div
            className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-accent-100 to-accent-200 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <ApperIcon name="Trophy" size={16} className="text-accent-600" />
            <span className="text-sm font-medium text-accent-700">450 points</span>
          </motion.div>
          
          <motion.button
            className="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center shadow-soft"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ApperIcon name="Bell" size={16} className="text-white" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;