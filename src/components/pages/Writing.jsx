import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import ActivityCard from '@/components/molecules/ActivityCard';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import activityService from '@/services/api/activityService';

const Writing = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [gameState, setGameState] = useState('menu');
  
  const loadActivities = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await activityService.getByType('writing');
      setActivities(data);
    } catch (err) {
      setError('Failed to load writing activities');
      console.error('Error loading writing activities:', err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadActivities();
  }, []);
  
  const handleStartActivity = (activity) => {
    setSelectedActivity(activity);
    setGameState('playing');
    toast.success(`Let's practice writing with "${activity.title}"! ✏️`);
  };
  
  const handleCompleteActivity = async (score) => {
    if (selectedActivity) {
      try {
        await activityService.completeActivity(selectedActivity.Id, score);
        setGameState('completed');
        toast.success(`Excellent writing! Your letters look great! 🌟`);
        await loadActivities();
      } catch (err) {
        toast.error('Failed to save your progress');
      }
    }
  };
  
  const handleBackToMenu = () => {
    setGameState('menu');
    setSelectedActivity(null);
  };
  
  if (loading) return <Loading type="activities" />;
  if (error) return <Error message={error} onRetry={loadActivities} />;
  
  if (gameState === 'playing' && selectedActivity) {
    return <WritingGame activity={selectedActivity} onComplete={handleCompleteActivity} onBack={handleBackToMenu} />;
  }
  
  if (gameState === 'completed') {
    return <ActivityCompleted activity={selectedActivity} onBack={handleBackToMenu} />;
  }
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-strong"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <ApperIcon name="PenTool" size={40} className="text-white" />
        </motion.div>
        
        <h1 className="text-4xl font-display text-gray-800 mb-4">
          Writing Practice ✏️
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Welcome to Writing Practice! Learn to form letters correctly, trace words, 
          and practice your handwriting. Every stroke makes you a better writer! 📝
        </p>
      </motion.div>
      
      {/* Activities Grid */}
      {activities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <ActivityCard
              key={activity.Id}
              activity={activity}
              onStart={handleStartActivity}
              index={index}
            />
          ))}
        </div>
      ) : (
        <Empty
          title="No writing activities yet!"
          message="New writing exercises are being prepared for you. Check back soon!"
          actionText="Back to Home"
          onAction={() => window.history.back()}
        />
      )}
      
      {/* Writing Tips */}
      <motion.div
        className="card p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center space-x-4">
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <ApperIcon name="Edit3" size={20} className="text-white" />
          </motion.div>
          <div>
            <h3 className="font-display text-lg text-gray-800 mb-1">
              Writing Tip! ✍️
            </h3>
            <p className="text-gray-600">
              Hold your pencil gently and take your time. Good writing comes with 
              practice, so don't worry if it's not perfect right away!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Simple Writing Game Component
const WritingGame = ({ activity, onComplete, onBack }) => {
  const [currentLetter, setCurrentLetter] = useState(0);
  const [score, setScore] = useState(0);
  const [traced, setTraced] = useState(false);
  
  const letters = ['A', 'B', 'C', 'D', 'E'];
  
  const handleLetterTrace = () => {
    if (!traced) {
      setTraced(true);
      setScore(score + 20);
      toast.success('Great tracing! Perfect letter formation! 🎉');
    }
  };
  
  const handleNextLetter = () => {
    if (currentLetter < letters.length - 1) {
      setCurrentLetter(currentLetter + 1);
      setTraced(false);
    } else {
      onComplete(Math.max(score, 80));
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} icon="ArrowLeft">
          Back to Menu
        </Button>
        <div className="text-lg font-medium text-gray-600">
          Score: {score} points
        </div>
      </div>
      
      <motion.div
        className="card p-12 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 className="text-2xl font-display text-gray-800 mb-8">
          Trace the letter carefully!
        </h2>
        
        <motion.div
          className="relative w-64 h-64 mx-auto mb-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border-4 border-dashed border-gray-300 flex items-center justify-center shadow-inner"
          key={currentLetter}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <motion.span
            className={`text-9xl font-display cursor-pointer transition-all duration-300 ${
              traced ? 'text-green-500' : 'text-gray-400'
            }`}
            onClick={handleLetterTrace}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {letters[currentLetter]}
          </motion.span>
          
          {!traced && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ApperIcon name="MousePointer" size={24} className="text-primary-500" />
            </motion.div>
          )}
        </motion.div>
        
        <div className="space-y-4">
          {!traced ? (
            <p className="text-gray-600">
              Click on the letter to trace it with your finger!
            </p>
          ) : (
            <div className="space-y-4">
              <motion.p
                className="text-green-600 font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Perfect! Great letter formation! ✨
              </motion.p>
              
              <Button
                variant="success"
                onClick={handleNextLetter}
                icon={currentLetter < letters.length - 1 ? "ArrowRight" : "Trophy"}
                iconPosition="right"
              >
                {currentLetter < letters.length - 1 ? 'Next Letter' : 'Finish Activity'}
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-8">
          <div className="flex justify-center space-x-2">
            {letters.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index < currentLetter ? 'bg-green-400' : 
                  index === currentLetter ? 'bg-primary-400' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Activity Completion Component
const ActivityCompleted = ({ activity, onBack }) => {
  return (
    <motion.div
      className="space-y-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-strong"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
      >
        <ApperIcon name="Award" size={60} className="text-white" />
      </motion.div>
      
      <div>
        <h1 className="text-4xl font-display text-gray-800 mb-4">
          Amazing Writing! ✏️
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          You completed "{activity?.title}" perfectly! Your letter formation is getting better every day!
        </p>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Button variant="success" onClick={onBack} icon="RotateCcw">
          Practice Again
        </Button>
        <Button variant="outline" onClick={() => window.location.href = '/'} icon="Home">
          Back to Home
        </Button>
      </div>
    </motion.div>
  );
};

export default Writing;