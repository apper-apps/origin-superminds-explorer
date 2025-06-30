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
      className={`game-card ${activity.completed ? 'activity-complete' : ''} h-full`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <motion.div
            className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${
              typeColors[activity.type] === 'primary' ? 'from-primary-400 to-primary-500' :
              typeColors[activity.type] === 'secondary' ? 'from-secondary-400 to-secondary-500' :
              typeColors[activity.type] === 'accent' ? 'from-accent-400 to-accent-500' :
              'from-green-400 to-emerald-500'
            } rounded-xl sm:rounded-2xl flex items-center justify-center shadow-soft flex-shrink-0`}
            whileHover={{ rotate: 5 }}
          >
            <ApperIcon 
              name={typeIcons[activity.type]} 
              size={20} 
              className="text-white sm:w-6 sm:h-6" 
            />
          </motion.div>
          
          {activity.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="flex-shrink-0"
            >
              <Badge variant="success" icon="CheckCircle" size="sm">
                {activity.score}%
              </Badge>
            </motion.div>
          )}
        </div>
        
        <div className="flex-1 flex flex-col">
          <h3 className="text-base sm:text-lg font-display text-gray-800 mb-2 line-clamp-2">
            {activity.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
            {activity.description}
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1">
              {difficultyStars}
            </div>
            
            <div className="flex items-center space-x-1 text-accent-600">
              <ApperIcon name="Trophy" size={12} />
              <span className="text-xs sm:text-sm font-medium">{activity.points} pts</span>
            </div>
          </div>
          
          <Button
            variant={activity.completed ? 'outline' : 'primary'}
            className="w-full mt-auto min-h-[44px]"
            onClick={() => onStart(activity)}
            icon={activity.completed ? 'RotateCcw' : 'Play'}
            size="sm"
          >
            <span className="text-sm sm:text-base">
              {activity.completed ? 'Play Again' : 'Start Activity'}
            </span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityCard;