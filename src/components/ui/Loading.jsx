import { motion } from 'framer-motion';

const Loading = ({ type = 'default' }) => {
  if (type === 'activities') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-2xl mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-lg mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-lg mb-4 w-3/4"></div>
              <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'dashboard') {
    return (
      <div className="space-y-6">
        <motion.div
          className="card p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="animate-pulse flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-8 bg-gray-200 rounded-lg mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="card p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="animate-pulse">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-200 to-primary-200 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded-lg mb-2"></div>
                <div className="h-8 bg-gray-200 rounded-lg"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-12">
      <motion.div
        className="flex items-center space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="w-4 h-4 bg-primary-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="w-4 h-4 bg-secondary-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="w-4 h-4 bg-accent-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
        />
      </motion.div>
    </div>
  );
};

export default Loading;