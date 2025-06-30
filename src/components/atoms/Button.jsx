import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-soft hover:shadow-medium',
    secondary: 'bg-gradient-to-r from-secondary-400 to-secondary-500 text-white shadow-soft hover:shadow-medium',
    accent: 'bg-gradient-to-r from-accent-400 to-accent-500 text-white shadow-soft hover:shadow-medium',
    outline: 'border-2 border-primary-300 text-primary-600 hover:bg-primary-50 hover:border-primary-400',
    ghost: 'text-primary-600 hover:bg-primary-50'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 16;
  
  return (
    <motion.button
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      {...props}
    >
      {loading ? (
        <ApperIcon name="Loader2" size={iconSize} className="animate-spin mr-2" />
      ) : (
        icon && iconPosition === 'left' && (
          <ApperIcon name={icon} size={iconSize} className="mr-2" />
        )
      )}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <ApperIcon name={icon} size={iconSize} className="ml-2" />
      )}
    </motion.button>
  );
};

export default Button;