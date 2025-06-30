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

const Vocabulary = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [gameState, setGameState] = useState('menu');
  
  const loadActivities = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await activityService.getByType('vocabulary');
      setActivities(data);
    } catch (err) {
      setError('Failed to load vocabulary activities');
      console.error('Error loading vocabulary activities:', err);
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
    toast.success(`Welcome to ${activity.title}! 📚`);
  };
  
  const handleCompleteActivity = async (score) => {
    if (selectedActivity) {
      try {
        await activityService.completeActivity(selectedActivity.Id, score);
        setGameState('completed');
        toast.success(`Excellent! You learned new words! 🌟`);
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
    return <VocabularyGame activity={selectedActivity} onComplete={handleCompleteActivity} onBack={handleBackToMenu} />;
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
          className="w-24 h-24 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-strong"
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <ApperIcon name="BookOpen" size={40} className="text-white" />
        </motion.div>
        
        <h1 className="text-4xl font-display text-gray-800 mb-4">
          Word World 🌍
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Welcome to Word World! Explore new words, match pictures with meanings, 
          and build your vocabulary one word at a time. Every word is an adventure! 📖
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
          title="No vocabulary activities yet!"
          message="New word adventures are being prepared for you. Check back soon!"
          actionText="Back to Home"
          onAction={() => window.history.back()}
        />
      )}
      
      {/* Learning Tips */}
      <motion.div
        className="card p-6 bg-gradient-to-r from-secondary-50 to-accent-50 border-secondary-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center space-x-4">
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-full flex items-center justify-center"
            animate={{ pulse: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ApperIcon name="Heart" size={20} className="text-white" />
          </motion.div>
          <div>
            <h3 className="font-display text-lg text-gray-800 mb-1">
              Word Learning Tip! ❤️
            </h3>
            <p className="text-gray-600">
              Try to use new words in sentences! This helps you remember them better 
              and understand how they work with other words.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Simple Vocabulary Game Component
const VocabularyGame = ({ activity, onComplete, onBack }) => {
  const [currentWord, setCurrentWord] = useState(0);
  const [score, setScore] = useState(0);
  
  const words = [
    { word: 'CAT', image: '🐱', options: ['Dog', 'Cat', 'Bird'] },
    { word: 'SUN', image: '☀️', options: ['Moon', 'Star', 'Sun'] },
    { word: 'TREE', image: '🌳', options: ['Flower', 'Tree', 'Grass'] },
    { word: 'HOUSE', image: '🏠', options: ['House', 'Car', 'Boat'] }
  ];
  
  const handleAnswer = (answer, correct) => {
    if (answer === correct) {
      setScore(score + 25);
      toast.success('Perfect! You know that word! 🎉');
    } else {
      toast.error('Not quite! Try to remember this word! 💭');
    }
    
    if (currentWord < words.length - 1) {
      setCurrentWord(currentWord + 1);
    } else {
      onComplete(Math.max(score + (answer === correct ? 25 : 0), 60));
    }
  };
  
  const current = words[currentWord];
  
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
          What word matches this picture?
        </h2>
        
        <motion.div
          className="text-9xl mb-8"
          key={currentWord}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {current.image}
        </motion.div>
        
        <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
          {current.options.map((option, index) => (
            <Button
              key={option}
              variant={index === 0 ? "primary" : index === 1 ? "secondary" : "accent"}
              size="lg"
              onClick={() => handleAnswer(option, current.word)}
              className="h-16 text-lg"
            >
              {option}
            </Button>
          ))}
        </div>
        
        <div className="mt-8">
          <div className="flex justify-center space-x-2">
            {words.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index <= currentWord ? 'bg-secondary-400' : 'bg-gray-200'
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
        <ApperIcon name="BookOpen" size={60} className="text-white" />
      </motion.div>
      
      <div>
        <h1 className="text-4xl font-display text-gray-800 mb-4">
          Word Master! 📚
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Amazing work on "{activity?.title}"! Your vocabulary is growing stronger every day!
        </p>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Button variant="secondary" onClick={onBack} icon="RotateCcw">
          Play Again
        </Button>
        <Button variant="outline" onClick={() => window.location.href = '/'} icon="Home">
          Back to Home
        </Button>
      </div>
    </motion.div>
  );
};

export default Vocabulary;