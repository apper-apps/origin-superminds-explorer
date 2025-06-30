import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Badge = ({ children, variant = 'primary', size = 'md', icon, className = '' }) => {
  const baseClasses = 'inline-flex items-center font-semibold rounded-full';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 border border-primary-300',
    secondary: 'bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-700 border border-secondary-300',
    accent: 'bg-gradient-to-r from-accent-100 to-accent-200 text-accent-700 border border-accent-300',
    success: 'bg-gradient-to-r from-green-100 to-emerald-200 text-green-700 border border-green-300',
    warning: 'bg-gradient-to-r from-yellow-100 to-amber-200 text-yellow-700 border border-yellow-300'
  };
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  
  const iconSize = size === 'sm' ? 12 : size === 'lg' ? 16 : 14;
  
  const badgeClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <motion.span
      className={badgeClasses}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {icon && <ApperIcon name={icon} size={iconSize} className="mr-1" />}
      {children}
    </motion.span>
  );
};

export default Badge;