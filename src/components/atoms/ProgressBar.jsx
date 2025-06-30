import { motion } from 'framer-motion';

const ProgressBar = ({ value, max = 100, label, color = 'primary', className = '' }) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colorClasses = {
    primary: 'from-primary-400 to-primary-500',
    secondary: 'from-secondary-400 to-secondary-500',
    accent: 'from-accent-400 to-accent-500',
    success: 'from-green-400 to-emerald-500'
  };
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm font-bold text-gray-800">{value}/{max}</span>
        </div>
      )}
      
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${colorClasses[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;