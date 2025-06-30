import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import NavigationItem from '@/components/molecules/NavigationItem';

const Sidebar = ({ isOpen, onClose }) => {
  const navigationItems = [
    { to: '/', icon: 'Home', label: 'Home' },
    { to: '/phonics', icon: 'Volume2', label: 'Phonics Lab' },
    { to: '/vocabulary', icon: 'BookOpen', label: 'Word World' },
    { to: '/reading', icon: 'FileText', label: 'Story Time' },
    { to: '/writing', icon: 'PenTool', label: 'Writing Practice' },
    { to: '/progress', icon: 'TrendingUp', label: 'Progress Island' }
  ];
  
return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 sm:w-80 lg:w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 safe-top safe-padding ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        initial={false}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-3 min-w-0 flex-1"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <ApperIcon name="Sparkles" size={20} className="text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-lg font-display text-gray-800 truncate">Super Minds</h1>
                <p className="text-xs text-gray-500">Year 1 - Level 1</p>
              </div>
            </motion.div>
            
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg touch-target flex-shrink-0"
            >
              <ApperIcon name="X" size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-3 sm:p-4 space-y-1 sm:space-y-2 overflow-y-auto">
          {navigationItems.map((item, index) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <NavigationItem {...item} />
            </motion.div>
          ))}
        </nav>
        
        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-gray-100">
          <motion.div
            className="flex items-center space-x-3 p-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-accent-400 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
              <ApperIcon name="User" size={16} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">Alex Explorer</p>
              <p className="text-xs text-gray-500">Year 1 Student</p>
            </div>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;