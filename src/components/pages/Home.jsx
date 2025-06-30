import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import StatCard from "@/components/molecules/StatCard";
import ActivityCard from "@/components/molecules/ActivityCard";
import Button from "@/components/atoms/Button";
import ProgressBar from "@/components/atoms/ProgressBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import activityService from "@/services/api/activityService";
import studentService from "@/services/api/studentService";
import progressService from "@/services/api/progressService";

const Home = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [student, setStudent] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [activitiesData, studentData, progressData] = await Promise.all([
        activityService.getAll(),
        studentService.getCurrentStudent(),
        progressService.getProgress()
      ]);
      
      setActivities(activitiesData);
      setStudent(studentData);
      setProgress(progressData);
    } catch (err) {
      setError('Failed to load your learning data');
      console.error('Error loading home data:', err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadData();
  }, []);
  
  const handleStartActivity = (activity) => {
    toast.success(`Starting ${activity.title}! Good luck! 🌟`);
    
    switch (activity.type) {
      case 'phonics':
        navigate('/phonics');
        break;
      case 'vocabulary':
        navigate('/vocabulary');
        break;
      case 'reading':
        navigate('/reading');
        break;
      case 'writing':
        navigate('/writing');
        break;
      default:
        navigate('/');
    }
  };
  
  if (loading) return <Loading type="dashboard" />;
  if (error) return <Error message={error} onRetry={loadData} />;
  
  const completedActivities = activities.filter(a => a.completed);
  const suggestedActivities = activities.filter(a => !a.completed).slice(0, 3);
  const totalProgress = (completedActivities.length / activities.length) * 100;
  
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        className="card p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex items-center space-x-6">
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center shadow-strong"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <ApperIcon name="Smile" size={32} className="text-white" />
          </motion.div>
          
          <div className="flex-1">
            <motion.h1
              className="text-3xl font-display text-gray-800 mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome back, {student?.name || 'Explorer'}! 🎉
            </motion.h1>
            <motion.p
              className="text-gray-600 text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Ready for another amazing learning adventure? You're doing great!
            </motion.p>
          </div>
          
          <div className="hidden md:block">
            <motion.div
              className="text-right"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-3xl font-display text-accent-600 mb-1">
                {student?.totalPoints || 0}
              </div>
              <div className="text-sm text-gray-500">Total Points</div>
              <div className="flex justify-end mt-2 space-x-1">
                {student?.badges?.slice(0, 3).map((badge, index) => (
                  <motion.div
                    key={badge}
                    className="w-6 h-6 bg-gradient-to-br from-accent-400 to-accent-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
<ApperIcon name="Award" size={12} className="text-white" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon="BookOpen"
          title="Activities Completed"
          value={completedActivities.length}
          subtitle={`of ${activities.length} total`}
          color="primary"
          index={0}
        />
        <StatCard
          icon="Volume2"
          title="Phonics Level"
          value={progress?.phonicsLevel || 0}
          subtitle="Letter sounds mastered"
          color="secondary"
          index={1}
        />
        <StatCard
          icon="MessageCircle"
          title="Words Learned"
          value={progress?.vocabularyCount || 0}
          subtitle="Building vocabulary"
          color="accent"
          index={2}
        />
        <StatCard
          icon="PenTool"
          title="Words Written"
          value={progress?.wordsWritten || 0}
          subtitle="Practice makes perfect"
          color="success"
          index={3}
        />
      </div>
      
      {/* Overall Progress */}
      <motion.div
        className="card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display text-gray-800">Your Learning Journey</h2>
          <div className="text-sm text-gray-600">
            {Math.round(totalProgress)}% Complete
          </div>
        </div>
        
        <ProgressBar
          value={completedActivities.length}
          max={activities.length}
          color="primary"
        />
        
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <span>Keep going! You're doing amazing! 🌟</span>
          <span>{activities.length - completedActivities.length} activities left</span>
        </div>
      </motion.div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          variant="primary"
          className="h-20 flex-col"
          onClick={() => navigate('/phonics')}
          icon="Volume2"
        >
          <span className="text-sm">Phonics Lab</span>
        </Button>
        <Button
          variant="secondary"
          className="h-20 flex-col"
          onClick={() => navigate('/vocabulary')}
          icon="BookOpen"
        >
          <span className="text-sm">Word World</span>
        </Button>
        <Button
          variant="accent"
          className="h-20 flex-col"
          onClick={() => navigate('/reading')}
          icon="FileText"
        >
          <span className="text-sm">Story Time</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex-col"
          onClick={() => navigate('/writing')}
          icon="PenTool"
        >
          <span className="text-sm">Writing</span>
        </Button>
      </div>
      
      {/* Suggested Activities */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display text-gray-800">
            Suggested Activities 🚀
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/activities')}
            icon="ArrowRight"
            iconPosition="right"
          >
            View All
          </Button>
        </div>
        
        {suggestedActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedActivities.map((activity, index) => (
              <ActivityCard
                key={activity.Id}
                activity={activity}
                onStart={handleStartActivity}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            className="card p-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Trophy" size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-display text-gray-800 mb-2">
              Amazing Work! 🎉
            </h3>
            <p className="text-gray-600">
              You've completed all available activities! Check back soon for more adventures.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;