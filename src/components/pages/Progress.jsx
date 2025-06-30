import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import StatCard from '@/components/molecules/StatCard';
import Badge from '@/components/atoms/Badge';
import ProgressBar from '@/components/atoms/ProgressBar';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import studentService from '@/services/api/studentService';
import progressService from '@/services/api/progressService';
import activityService from '@/services/api/activityService';

const Progress = () => {
  const [student, setStudent] = useState(null);
  const [progress, setProgress] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [studentData, progressData, activitiesData] = await Promise.all([
        studentService.getCurrentStudent(),
        progressService.getProgress(),
        activityService.getAll()
      ]);
      
      setStudent(studentData);
      setProgress(progressData);
      setActivities(activitiesData);
    } catch (err) {
      setError('Failed to load progress data');
      console.error('Error loading progress data:', err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadData();
  }, []);
  
  if (loading) return <Loading type="dashboard" />;
  if (error) return <Error message={error} onRetry={loadData} />;
  
  const completedActivities = activities.filter(a => a.completed);
  const totalProgress = (completedActivities.length / activities.length) * 100;
  
  const skillAreas = [
    {
      name: 'Phonics',
      level: progress?.phonicsLevel || 0,
      maxLevel: 10,
      icon: 'Volume2',
      color: 'primary',
      activities: activities.filter(a => a.type === 'phonics' && a.completed).length
    },
    {
      name: 'Vocabulary',
      level: Math.min(Math.floor((progress?.vocabularyCount || 0) / 10), 10),
      maxLevel: 10,
      icon: 'BookOpen',
      color: 'secondary',
      activities: activities.filter(a => a.type === 'vocabulary' && a.completed).length
    },
    {
      name: 'Reading',
      level: progress?.storiesRead || 0,
      maxLevel: 10,
      icon: 'FileText',
      color: 'accent',
      activities: activities.filter(a => a.type === 'reading' && a.completed).length
    },
    {
      name: 'Writing',
      level: Math.min(Math.floor((progress?.wordsWritten || 0) / 5), 10),
      maxLevel: 10,
      icon: 'PenTool',
      color: 'success',
      activities: activities.filter(a => a.type === 'writing' && a.completed).length
    }
  ];
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="w-24 h-24 bg-gradient-to-br from-primary-400 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-strong"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <ApperIcon name="TrendingUp" size={40} className="text-white" />
        </motion.div>
        
        <h1 className="text-4xl font-display text-gray-800 mb-4">
          Progress Island 🏝️
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Welcome to your Progress Island! Here you can see all the amazing things you've learned 
          and track your journey to becoming a reading and writing superstar! 🌟
        </p>
      </motion.div>
      
      {/* Student Overview */}
      <motion.div
        className="card p-8 bg-gradient-to-r from-primary-50 to-secondary-50"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex items-center space-x-6">
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center shadow-strong"
            whileHover={{ scale: 1.1 }}
          >
            <ApperIcon name="User" size={32} className="text-white" />
          </motion.div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-display text-gray-800 mb-2">
              {student?.name || 'Amazing Explorer'} 🎉
            </h2>
            <p className="text-gray-600 mb-4">
              Year {student?.yearLevel || 1} • Level {student?.currentLevel || 1} Learner
            </p>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Trophy" size={20} className="text-accent-500" />
                <span className="font-medium text-gray-700">
                  {student?.totalPoints || 0} Points
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <ApperIcon name="Target" size={20} className="text-green-500" />
                <span className="font-medium text-gray-700">
                  {completedActivities.length} Activities Completed
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <ApperIcon name="Calendar" size={20} className="text-blue-500" />
                <span className="font-medium text-gray-700">
                  {progress?.streakDays || 0} Day Streak
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Overall Progress */}
      <motion.div
        className="card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-display text-gray-800 mb-4">
          Overall Learning Progress 📊
        </h3>
        
        <ProgressBar
          value={completedActivities.length}
          max={activities.length}
          label="Activities Completed"
          color="primary"
        />
        
        <div className="flex items-center justify-between mt-4 text-sm">
          <span className="text-gray-600">
            Keep going! You're {Math.round(totalProgress)}% of the way there! 🚀
          </span>
          <span className="font-medium text-gray-800">
            {activities.length - completedActivities.length} more to go!
          </span>
        </div>
      </motion.div>
      
      {/* Skill Areas */}
      <div>
        <h3 className="text-2xl font-display text-gray-800 mb-6">
          Your Learning Skills 🌟
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillAreas.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${
                    skill.color === 'primary' ? 'from-primary-400 to-primary-500' :
                    skill.color === 'secondary' ? 'from-secondary-400 to-secondary-500' :
                    skill.color === 'accent' ? 'from-accent-400 to-accent-500' :
                    'from-green-400 to-emerald-500'
                  } rounded-xl flex items-center justify-center shadow-soft`}>
                    <ApperIcon name={skill.icon} size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg text-gray-800">{skill.name}</h4>
                    <p className="text-sm text-gray-600">
                      {skill.activities} activities completed
                    </p>
                  </div>
                </div>
                
                <Badge variant={skill.color} size="lg">
                  Level {skill.level}
                </Badge>
              </div>
              
              <ProgressBar
                value={skill.level}
                max={skill.maxLevel}
                color={skill.color}
              />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Badges Collection */}
      <div>
        <h3 className="text-2xl font-display text-gray-800 mb-6">
          Your Amazing Badges 🏆
        </h3>
        
        <motion.div
          className="card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {student?.badges && student.badges.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {student.badges.map((badge, index) => (
                <motion.div
                  key={badge}
                  className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-accent-100 to-primary-100 rounded-2xl border border-accent-200"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-accent-400 to-accent-500 rounded-full flex items-center justify-center">
                    <ApperIcon name="Award" size={16} className="text-white" />
                  </div>
                  <span className="font-medium text-gray-800">{badge}</span>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Award" size={32} className="text-gray-400" />
              </div>
              <h4 className="font-display text-lg text-gray-600 mb-2">
                No badges yet!
              </h4>
              <p className="text-gray-500">
                Complete more activities to earn your first badge! 🌟
              </p>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Encouragement */}
      <motion.div
        className="card p-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
          animate={{ bounce: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ApperIcon name="Heart" size={24} className="text-white" />
        </motion.div>
        
        <h3 className="text-2xl font-display text-gray-800 mb-2">
          You're Doing Amazing! 💖
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Every activity you complete makes you a better reader and writer. 
          Keep up the fantastic work, and remember - learning is an adventure! 🚀
        </p>
      </motion.div>
    </div>
  );
};

export default Progress;