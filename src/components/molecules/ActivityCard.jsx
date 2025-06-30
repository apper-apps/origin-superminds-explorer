import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';

const ActivityCard = ({ activity, onStart, index = 0 }) => {
  const typeIcons = {
    phonics: 'Volume2',
    vocabulary: 'BookOpen',
    reading: 'FileText',
    writing: 'PenTool'
  };
  
  const typeColors = {
    phonics: 'primary',
    vocabulary: 'secondary',
    reading: 'accent',
    writing: 'success'
  };
  
  const difficultyStars = Array.from({ length: activity.difficulty }, (_, i) => (
    <ApperIcon key={i} name="Star" size={14} className="text-accent-400 fill-current" />
  ));
  
  return (
    <motion.div
      className={`game-card ${activity.completed ? 'activity-complete' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-start justify-between mb-4">
        <motion.div
          className={`w-16 h-16 bg-gradient-to-br ${
            typeColors[activity.type] === 'primary' ? 'from-primary-400 to-primary-500' :
            typeColors[activity.type] === 'secondary' ? 'from-secondary-400 to-secondary-500' :
            typeColors[activity.type] === 'accent' ? 'from-accent-400 to-accent-500' :
            'from-green-400 to-emerald-500'
          } rounded-2xl flex items-center justify-center shadow-soft`}
          whileHover={{ rotate: 5 }}
        >
          <ApperIcon 
            name={typeIcons[activity.type]} 
            size={24} 
            className="text-white" 
          />
        </motion.div>
        
        {activity.completed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Badge variant="success" icon="CheckCircle">
              {activity.score}%
            </Badge>
          </motion.div>
        )}
      </div>
      
      <h3 className="text-lg font-display text-gray-800 mb-2">
        {activity.title}
      </h3>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {activity.description}
      </p>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1">
          {difficultyStars}
        </div>
        
        <div className="flex items-center space-x-1 text-accent-600">
          <ApperIcon name="Trophy" size={14} />
          <span className="text-sm font-medium">{activity.points} pts</span>
        </div>
      </div>
      
      <Button
        variant={activity.completed ? 'outline' : 'primary'}
        className="w-full"
        onClick={() => onStart(activity)}
        icon={activity.completed ? 'RotateCcw' : 'Play'}
      >
        {activity.completed ? 'Play Again' : 'Start Activity'}
      </Button>
    </motion.div>
  );
};

export default ActivityCard;