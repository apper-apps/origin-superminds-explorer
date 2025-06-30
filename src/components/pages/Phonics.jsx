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

const Phonics = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [gameState, setGameState] = useState('menu'); // menu, playing, completed
  
  const loadActivities = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await activityService.getByType('phonics');
      setActivities(data);
    } catch (err) {
      setError('Failed to load phonics activities');
      console.error('Error loading phonics activities:', err);
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
    toast.success(`Let's learn ${activity.title}! 🎵`);
  };
  
  const handleCompleteActivity = async (score) => {
    if (selectedActivity) {
      try {
        await activityService.completeActivity(selectedActivity.Id, score);
        setGameState('completed');
        toast.success(`Great job! You scored ${score}%! 🌟`);
        
        // Reload activities to update completion status
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
    return <PhonicsGame activity={selectedActivity} onComplete={handleCompleteActivity} onBack={handleBackToMenu} />;
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
          className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-strong"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <ApperIcon name="Volume2" size={40} className="text-white" />
        </motion.div>
        
        <h1 className="text-4xl font-display text-gray-800 mb-4">
          Phonics Lab 🔬
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Welcome to the Phonics Lab! Here you'll discover letter sounds, practice blending, 
          and master the building blocks of reading. Let's make some noise! 🎵
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
          title="No phonics activities yet!"
          message="New sound adventures are being prepared for you. Check back soon!"
          actionText="Back to Home"
          onAction={() => window.history.back()}
        />
      )}
      
      {/* Progress Encouragement */}
      <motion.div
        className="card p-6 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center space-x-4">
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-500 rounded-full flex items-center justify-center"
            animate={{ bounce: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ApperIcon name="Lightbulb" size={20} className="text-white" />
          </motion.div>
          <div>
            <h3 className="font-display text-lg text-gray-800 mb-1">
              Pro Tip! 💡
            </h3>
            <p className="text-gray-600">
              Listen carefully to each sound and try to repeat it out loud. 
              This helps your brain remember better!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Simple Phonics Game Component
const PhonicsGame = ({ activity, onComplete, onBack }) => {
  const [currentLetter, setCurrentLetter] = useState(0);
  const [score, setScore] = useState(0);
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const sounds = ['ay', 'bee', 'see', 'dee', 'ee'];
  
  const handleLetterClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 20);
      toast.success('Correct! Great job! 🎉');
    } else {
      toast.error('Try again! You can do it! 💪');
    }
    
    if (currentLetter < letters.length - 1) {
      setCurrentLetter(currentLetter + 1);
    } else {
      onComplete(Math.max(score + (isCorrect ? 20 : 0), 60));
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
        <h2 className="text-3xl font-display text-gray-800 mb-8">
          What sound does this letter make?
        </h2>
        
        <motion.div
          className="w-48 h-48 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-strong"
          key={currentLetter}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <span className="text-9xl font-display text-white">
            {letters[currentLetter]}
          </span>
        </motion.div>
        
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => handleLetterClick(true)}
            className="h-16"
          >
            {sounds[currentLetter]}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleLetterClick(false)}
            className="h-16"
          >
            {sounds[(currentLetter + 1) % sounds.length]}
          </Button>
        </div>
        
        <div className="mt-8">
          <div className="flex justify-center space-x-2">
            {letters.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index <= currentLetter ? 'bg-primary-400' : 'bg-gray-200'
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
        <ApperIcon name="Trophy" size={60} className="text-white" />
      </motion.div>
      
      <div>
        <h1 className="text-4xl font-display text-gray-800 mb-4">
          Fantastic Work! 🎉
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          You completed "{activity?.title}"! Your phonics skills are getting stronger every day!
        </p>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Button variant="primary" onClick={onBack} icon="RotateCcw">
          Play Again
        </Button>
        <Button variant="outline" onClick={() => window.location.href = '/'} icon="Home">
          Back to Home
        </Button>
      </div>
    </motion.div>
  );
};

export default Phonics;