import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const NavigationItem = ({ to, icon, label, badge }) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <motion.div
          className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
            isActive 
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-soft' 
              : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ApperIcon name={icon} size={20} />
          <span className="font-medium">{label}</span>
          {badge && (
            <motion.span
              className={`ml-auto px-2 py-1 text-xs font-bold rounded-full ${
                isActive ? 'bg-white/20 text-white' : 'bg-primary-100 text-primary-600'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              {badge}
            </motion.span>
          )}
        </motion.div>
      )}
    </NavLink>
  );
};

export default NavigationItem;