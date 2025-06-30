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

const Reading = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [gameState, setGameState] = useState('menu');
  
  const loadActivities = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await activityService.getByType('reading');
      setActivities(data);
    } catch (err) {
      setError('Failed to load reading activities');
      console.error('Error loading reading activities:', err);
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
    toast.success(`Let's read "${activity.title}" together! 📖`);
  };
  
  const handleCompleteActivity = async (score) => {
    if (selectedActivity) {
      try {
        await activityService.completeActivity(selectedActivity.Id, score);
        setGameState('completed');
        toast.success(`Great reading! You understood the story! 🌟`);
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
    return <ReadingGame activity={selectedActivity} onComplete={handleCompleteActivity} onBack={handleBackToMenu} />;
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
          className="w-24 h-24 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-strong"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <ApperIcon name="FileText" size={40} className="text-white" />
        </motion.div>
        
        <h1 className="text-4xl font-display text-gray-800 mb-4">
          Story Time 📚
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Welcome to Story Time! Read exciting stories, meet interesting characters, 
          and answer questions about what you've read. Every story is a new adventure! ✨
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
          title="No stories available yet!"
          message="New exciting stories are being written for you. Check back soon!"
          actionText="Back to Home"
          onAction={() => window.history.back()}
        />
      )}
      
      {/* Reading Tips */}
      <motion.div
        className="card p-6 bg-gradient-to-r from-accent-50 to-primary-50 border-accent-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center space-x-4">
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-500 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ApperIcon name="Glasses" size={20} className="text-white" />
          </motion.div>
          <div>
            <h3 className="font-display text-lg text-gray-800 mb-1">
              Reading Tip! 👓
            </h3>
            <p className="text-gray-600">
              Read slowly and try to picture the story in your mind. 
              This helps you understand and remember what happens!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Simple Reading Game Component
const ReadingGame = ({ activity, onComplete, onBack }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showQuestions, setShowQuestions] = useState(false);
  const [score, setScore] = useState(0);
  
  const story = {
    title: "The Happy Cat",
    pages: [
      {
        text: "Once upon a time, there was a happy cat named Whiskers. Whiskers lived in a cozy house with a kind family.",
        image: "🐱"
      },
      {
        text: "Every morning, Whiskers would wake up and stretch. Then he would eat his breakfast and play with his favorite toy.",
        image: "🌅"
      },
      {
        text: "One day, Whiskers found a beautiful butterfly in the garden. He watched it dance from flower to flower.",
        image: "🦋"
      },
      {
        text: "Whiskers was so happy watching the butterfly that he purred loudly. The butterfly seemed to dance just for him!",
        image: "🌸"
      }
    ],
    questions: [
      {
        question: "What was the cat's name?",
        options: ["Fluffy", "Whiskers", "Mittens"],
        correct: "Whiskers"
      },
      {
        question: "What did Whiskers find in the garden?",
        options: ["A butterfly", "A bird", "A mouse"],
        correct: "A butterfly"
      }
    ]
  };
  
  const handleNextPage = () => {
    if (currentPage < story.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setShowQuestions(true);
    }
  };
  
  const handleAnswer = (answer, correct) => {
    if (answer === correct) {
      setScore(score + 50);
      toast.success('Correct! You were listening carefully! 🎉');
    } else {
      toast.error('Good try! Think about what you read! 💭');
    }
    
    // Complete after answering questions
    setTimeout(() => {
      onComplete(Math.max(score + (answer === correct ? 50 : 0), 70));
    }, 1500);
  };
  
  if (showQuestions) {
    const question = story.questions[0]; // Simple single question for demo
    
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
            Let's see how well you listened!
          </h2>
          
          <motion.div
            className="text-6xl mb-8"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🤔
          </motion.div>
          
          <h3 className="text-xl font-medium text-gray-700 mb-8">
            {question.question}
          </h3>
          
          <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
            {question.options.map((option, index) => (
              <Button
                key={option}
                variant={index === 0 ? "primary" : index === 1 ? "secondary" : "accent"}
                size="lg"
                onClick={() => handleAnswer(option, question.correct)}
                className="h-16 text-lg"
              >
                {option}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }
  
  const currentStoryPage = story.pages[currentPage];
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} icon="ArrowLeft">
          Back to Menu
        </Button>
        <div className="text-lg font-medium text-gray-600">
          Page {currentPage + 1} of {story.pages.length}
        </div>
      </div>
      
      <motion.div
        className="card p-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 className="text-3xl font-display text-center text-gray-800 mb-8">
          {story.title}
        </h2>
        
        <motion.div
          className="text-center mb-8"
          key={currentPage}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-8xl mb-6">
            {currentStoryPage.image}
          </div>
          <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
            {currentStoryPage.text}
          </p>
        </motion.div>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {story.pages.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index <= currentPage ? 'bg-accent-400' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          
          <Button
            variant="accent"
            onClick={handleNextPage}
            icon="ArrowRight"
            iconPosition="right"
          >
            {currentPage < story.pages.length - 1 ? 'Next Page' : 'Answer Questions'}
          </Button>
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
          Great Reading! 📖
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          You finished "{activity?.title}" and understood the story! Your reading skills are amazing!
        </p>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Button variant="accent" onClick={onBack} icon="RotateCcw">
          Read Again
        </Button>
        <Button variant="outline" onClick={() => window.location.href = '/'} icon="Home">
          Back to Home
        </Button>
      </div>
    </motion.div>
  );
};

export default Reading;