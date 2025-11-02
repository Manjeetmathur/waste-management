'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Trophy, 
  Target, 
  Users, 
  Calendar, 
  Award,
  TrendingUp,
  CheckCircle,
  Clock,
  Star,
  Medal,
  Crown
} from 'lucide-react';
import { Challenge, UserProgress } from '@/types';
import Card3D from '@/components/Card3D';
import FloatingElement from '@/components/FloatingElement';

const ChallengesPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'leaderboard'>('active');
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);

  // Ensure points is always a valid number
  const userPoints = typeof user?.points === 'number' && !isNaN(user.points) ? user.points : 0;

  // Sample challenges data
  const sampleChallenges: Challenge[] = [
    {
      id: '1',
      title: 'Plastic-Free Week Challenge',
      titleHindi: 'प्लास्टिक मुक्त सप्ताह चुनौती',
      description: 'Reduce your plastic consumption by 80% this week. Track your daily plastic usage and find alternatives.',
      descriptionHindi: 'इस सप्ताह अपने प्लास्टिक की खपत को 80% कम करें। अपने दैनिक प्लास्टिक उपयोग को ट्रैक करें और विकल्प खोजें।',
      type: 'individual',
      target: 7,
      unit: 'days',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-21'),
      reward: 100,
      participants: ['user1', 'user2', 'user3'],
      isActive: true
    },
    {
      id: '2',
      title: 'Community Recycling Drive',
      titleHindi: 'सामुदायिक रीसाइक्लिंग अभियान',
      description: 'Organize or participate in a community recycling drive. Collect at least 50kg of recyclable materials.',
      descriptionHindi: 'एक सामुदायिक रीसाइक्लिंग अभियान का आयोजन करें या उसमें भाग लें। कम से कम 50 किलो रीसाइक्लेबल सामग्री एकत्र करें।',
      type: 'community',
      target: 50,
      unit: 'kg',
      startDate: new Date('2024-01-10'),
      endDate: new Date('2024-01-31'),
      reward: 250,
      participants: ['user1', 'user2', 'user3', 'user4', 'user5'],
      isActive: true
    },
    {
      id: '3',
      title: 'Zero Food Waste Month',
      titleHindi: 'शून्य खाद्य अपशिष्ट महीना',
      description: 'Minimize food waste to less than 100g per day for an entire month. Learn meal planning and composting.',
      descriptionHindi: 'पूरे महीने के लिए खाद्य अपशिष्ट को प्रति दिन 100 ग्राम से कम करें। भोजन योजना और कंपोस्टिंग सीखें।',
      type: 'individual',
      target: 30,
      unit: 'days',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-31'),
      reward: 200,
      participants: ['user1', 'user2'],
      isActive: true
    },
    {
      id: '4',
      title: 'E-Waste Collection Drive',
      titleHindi: 'ई-वेस्ट संग्रह अभियान',
      description: 'Collect and properly dispose of electronic waste from your neighborhood. Target: 25 devices.',
      descriptionHindi: 'अपने पड़ोस से इलेक्ट्रॉनिक कचरा एकत्र करें और उसका उचित निपटान करें। लक्ष्य: 25 उपकरण।',
      type: 'community',
      target: 25,
      unit: 'devices',
      startDate: new Date('2023-12-01'),
      endDate: new Date('2023-12-31'),
      reward: 150,
      participants: ['user1', 'user2', 'user3'],
      isActive: false
    }
  ];

  // Sample user progress
  const sampleProgress: UserProgress[] = [
    {
      userId: user?.id || 'user1',
      challengeId: '1',
      progress: 5,
      lastUpdated: new Date()
    },
    {
      userId: user?.id || 'user1',
      challengeId: '2',
      progress: 35,
      lastUpdated: new Date()
    },
    {
      userId: user?.id || 'user1',
      challengeId: '3',
      progress: 18,
      lastUpdated: new Date()
    }
  ];

  // Sample leaderboard data
  const leaderboardData = [
    { rank: 1, name: 'Priya Sharma', points: 1250, challenges: 8, avatar: '👩' },
    { rank: 2, name: 'Rajesh Kumar', points: 1180, challenges: 7, avatar: '👨' },
    { rank: 3, name: 'Anita Patel', points: 1050, challenges: 6, avatar: '👩' },
    { rank: 4, name: 'Vikram Singh', points: 980, challenges: 5, avatar: '👨' },
    { rank: 5, name: 'Meera Joshi', points: 920, challenges: 5, avatar: '👩' },
  ];

  useEffect(() => {
    setChallenges(sampleChallenges);
    setUserProgress(sampleProgress);
  }, []);

  const getProgressPercentage = (challengeId: string) => {
    const progress = userProgress.find(p => p.challengeId === challengeId);
    const challenge = challenges.find(c => c.id === challengeId);
    if (!progress || !challenge) return 0;
    return Math.min((progress.progress / challenge.target) * 100, 100);
  };

  const getDaysRemaining = (endDate: Date) => {
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const activeChallenges = challenges.filter(c => c.isActive);
  const completedChallenges = challenges.filter(c => !c.isActive);

  const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
    const progressPercentage = getProgressPercentage(challenge.id);
    const daysRemaining = getDaysRemaining(challenge.endDate);
    const isCompleted = progressPercentage >= 100;
    const userProgressData = userProgress.find(p => p.challengeId === challenge.id);

    return (
      <FloatingElement duration={3 + Math.random() * 2} delay={Math.random() * 2} amplitude={3}>
        <Card3D intensity="medium">
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-full ${
              challenge.type === 'individual' ? 'bg-blue-100' : 'bg-purple-100'
            }`}>
              {challenge.type === 'individual' ? (
                <Target className={`h-6 w-6 ${
                  challenge.type === 'individual' ? 'text-blue-600' : 'text-purple-600'
                }`} />
              ) : (
                <Users className="h-6 w-6 text-purple-600" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {challenge.title}
              </h3>
              <p className="text-sm text-gray-500">
                {challenge.titleHindi}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-1 text-yellow-600 mb-1">
              <Award className="h-4 w-4" />
              <span className="text-sm font-medium">{challenge.reward} pts</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              challenge.type === 'individual' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-purple-100 text-purple-800'
            }`}>
              {challenge.type === 'individual' ? 'Individual' : 'Community'}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 text-sm">
          {challenge.description}
        </p>

        {/* Progress */}
        {userProgressData && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-600">
                {userProgressData.progress}/{challenge.target} {challenge.unit}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  isCompleted ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                {progressPercentage.toFixed(1)}% complete
              </span>
              {isCompleted && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Users className="h-5 w-5 text-gray-600 mx-auto mb-1" />
            <div className="text-lg font-semibold text-gray-900">
              {challenge.participants.length}
            </div>
            <div className="text-xs text-gray-600">Participants</div>
          </div>
          
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-gray-600 mx-auto mb-1" />
            <div className="text-lg font-semibold text-gray-900">
              {daysRemaining}
            </div>
            <div className="text-xs text-gray-600">Days left</div>
          </div>
        </div>

        {/* Action Button */}
        <button className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
          isCompleted
            ? 'bg-green-100 text-green-800 cursor-default'
            : userProgressData
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-green-600 text-white hover:bg-green-700'
        }`}>
          {isCompleted 
            ? 'Challenge Completed!' 
            : userProgressData 
            ? 'Update Progress' 
            : 'Join Challenge'
          }
        </button>
          </div>
        </Card3D>
      </FloatingElement>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Environmental Challenges
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Join challenges, compete with others, and make a real impact
          </p>
          <p className="text-lg text-gray-500">
            चुनौतियों में शामिल हों, दूसरों के साथ प्रतिस्पर्धा करें, और वास्तविक प्रभाव डालें
          </p>
        </div>

        {/* User Stats */}
        {user && (
          <FloatingElement duration={4} delay={0.5} amplitude={2}>
            <Card3D intensity="low">
              <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-6 text-white mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Trophy className="h-8 w-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{userPoints}</div>
                <div className="text-green-100">Total Points</div>
              </div>
              <div className="text-center">
                <Target className="h-8 w-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{userProgress.length}</div>
                <div className="text-green-100">Active Challenges</div>
              </div>
              <div className="text-center">
                <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">
                  {userProgress.filter(p => {
                    const challenge = challenges.find(c => c.id === p.challengeId);
                    return challenge && (p.progress / challenge.target) >= 1;
                  }).length}
                </div>
                <div className="text-green-100">Completed</div>
              </div>
              <div className="text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">
                  {Math.round(userProgress.reduce((acc, p) => {
                    const challenge = challenges.find(c => c.id === p.challengeId);
                    return acc + (challenge ? (p.progress / challenge.target) * 100 : 0);
                  }, 0) / userProgress.length) || 0}%
                </div>
                <div className="text-green-100">Avg Progress</div>
              </div>
            </div>
              </div>
            </Card3D>
          </FloatingElement>
        )}

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'active'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Active Challenges ({activeChallenges.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'completed'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Completed ({completedChallenges.length})
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'leaderboard'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Leaderboard
          </button>
        </div>

        {/* Content */}
        {activeTab === 'active' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        )}

        {activeTab === 'completed' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 text-center">
                <Crown className="h-12 w-12 text-white mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">
                  Top Eco Warriors
                </h2>
                <p className="text-yellow-100">
                  Leading the way towards a cleaner India
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {leaderboardData.map((user, index) => (
                    <div
                      key={user.rank}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        index < 3 ? 'bg-gradient-to-r from-yellow-50 to-yellow-100' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-white ${
                          user.rank === 1 ? 'bg-yellow-500' :
                          user.rank === 2 ? 'bg-gray-400' :
                          user.rank === 3 ? 'bg-yellow-600' : 'bg-gray-300'
                        }`}>
                          {user.rank === 1 ? <Crown className="h-5 w-5" /> :
                           user.rank === 2 ? <Medal className="h-5 w-5" /> :
                           user.rank === 3 ? <Award className="h-5 w-5" /> :
                           user.rank}
                        </div>
                        <div className="text-2xl">{user.avatar}</div>
                        <div>
                          <div className="font-semibold text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-600">
                            {user.challenges} challenges completed
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600">
                          {userPoints}
                        </div>
                        <div className="text-sm text-gray-600">points</div>
                      </div>
                    </div>
                  ))}
                </div>

                {user && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          You
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-600">Your current rank</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{userPoints}</div>
                        <div className="text-sm text-gray-600">points</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Empty States */}
        {activeTab === 'active' && activeChallenges.length === 0 && (
          <div className="text-center py-12">
            <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No active challenges
            </h3>
            <p className="text-gray-600">
              Check back soon for new environmental challenges to join!
            </p>
          </div>
        )}

        {activeTab === 'completed' && completedChallenges.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No completed challenges yet
            </h3>
            <p className="text-gray-600">
              Complete some challenges to see them here!
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ChallengesPage;