'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  BookOpen, 
  Trophy, 
  Star, 
  CheckCircle, 
  XCircle,
  ArrowRight,
  RotateCcw,
  Target,
  Award
} from 'lucide-react';
import toast from 'react-hot-toast';
import Card3D from '@/components/Card3D';
import FloatingElement from '@/components/FloatingElement';

interface QuizQuestion {
  id: string;
  question: string;
  questionHindi: string;
  options: string[];
  optionsHindi: string[];
  correctAnswer: number;
  explanation: string;
  explanationHindi: string;
  points: number;
  imageUrl?: string;
}

const QuizPage = () => {
  const { user, updateUserProfile } = useAuth();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  // Sample quiz questions
  const questions: QuizQuestion[] = [
    {
      id: '1',
      question: 'Where should you dispose of used batteries?',
      questionHindi: 'इस्तेमाल की गई बैटरियों को कहाँ फेंकना चाहिए?',
      options: ['Regular dustbin', 'E-waste collection center', 'Compost bin', 'Recycling bin'],
      optionsHindi: ['सामान्य कूड़ेदान', 'ई-वेस्ट संग्रह केंद्र', 'कंपोस्ट बिन', 'रीसाइक्लिंग बिन'],
      correctAnswer: 1,
      explanation: 'Batteries contain harmful chemicals and should be disposed of at designated e-waste collection centers.',
      explanationHindi: 'बैटरियों में हानिकारक रसायन होते हैं और इन्हें निर्दिष्ट ई-वेस्ट संग्रह केंद्रों में फेंकना चाहिए।',
      points: 10
    },
    {
      id: '2',
      question: 'Which of these items can be composted?',
      questionHindi: 'इनमें से कौन सी चीज़ को कंपोस्ट किया जा सकता है?',
      options: ['Plastic bags', 'Fruit peels', 'Glass bottles', 'Metal cans'],
      optionsHindi: ['प्लास्टिक बैग', 'फलों के छिलके', 'कांच की बोतलें', 'धातु के डिब्बे'],
      correctAnswer: 1,
      explanation: 'Fruit peels are organic waste and can be easily composted to create nutrient-rich soil.',
      explanationHindi: 'फलों के छिलके जैविक कचरा हैं और इन्हें आसानी से कंपोस्ट करके पोषक तत्वों से भरपूर मिट्टी बनाई जा सकती है।',
      points: 10
    },
    {
      id: '3',
      question: 'What is the best way to reduce plastic waste?',
      questionHindi: 'प्लास्टिक कचरे को कम करने का सबसे अच्छा तरीका क्या है?',
      options: ['Burn plastic items', 'Use reusable bags', 'Throw in river', 'Bury in ground'],
      optionsHindi: ['प्लास्टिक की चीज़ों को जलाना', 'पुन: उपयोग योग्य बैग का उपयोग', 'नदी में फेंकना', 'ज़मीन में दबाना'],
      correctAnswer: 1,
      explanation: 'Using reusable bags reduces the demand for single-use plastic bags, helping reduce plastic waste.',
      explanationHindi: 'पुन: उपयोग योग्य बैगों का उपयोग करने से एकल-उपयोग प्लास्टिक बैगों की मांग कम हो जाती है, जिससे प्लास्टिक कचरे को कम करने में मदद मिलती है।',
      points: 15
    },
    {
      id: '4',
      question: 'Which color dustbin is typically used for wet waste in India?',
      questionHindi: 'भारत में गीले कचरे के लिए आमतौर पर किस रंग का कूड़ेदान उपयोग किया जाता है?',
      options: ['Blue', 'Green', 'Red', 'Yellow'],
      optionsHindi: ['नीला', 'हरा', 'लाल', 'पीला'],
      correctAnswer: 1,
      explanation: 'Green dustbins are designated for wet/organic waste like food scraps and garden waste.',
      explanationHindi: 'हरे कूड़ेदान गीले/जैविक कचरे जैसे खाने के टुकड़े और बगीचे के कचरे के लिए निर्दिष्ट हैं।',
      points: 10
    },
    {
      id: '5',
      question: 'What percentage of waste in India is currently recycled?',
      questionHindi: 'भारत में वर्तमान में कितने प्रतिशत कचरा रीसाइकिल किया जाता है?',
      options: ['50%', '30%', '13%', '25%'],
      optionsHindi: ['50%', '30%', '13%', '25%'],
      correctAnswer: 2,
      explanation: 'India currently recycles only about 13% of its waste, highlighting the need for better waste management.',
      explanationHindi: 'भारत वर्तमान में अपने कचरे का केवल लगभग 13% रीसाइकिल करता है, जो बेहतर कचरा प्रबंधन की आवश्यकता को दर्शाता है।',
      points: 15
    }
  ];

  const currentQ = questions[currentQuestion];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      toast.error('Please select an answer');
      return;
    }

    setShowResult(true);
    setShowExplanation(true);

    // Add points if correct
    if (selectedAnswer === currentQ.correctAnswer) {
      setScore(score + currentQ.points);
    }
  };

  const handleContinue = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowExplanation(false);
    } else {
      // Quiz completed
      setQuizCompleted(true);
      
      // Update user points if logged in
      if (user) {
        updateUserProfile({ points: user.points + score });
        toast.success(`Quiz completed! You earned ${score} points!`);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
    setShowExplanation(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / (questions.length * 15)) * 100; // Assuming max 15 points per question
    
    if (percentage >= 80) return { message: 'Excellent! You\'re a waste management expert!', emoji: '🏆', color: 'text-yellow-600' };
    if (percentage >= 60) return { message: 'Great job! You know your waste management basics!', emoji: '⭐', color: 'text-green-600' };
    if (percentage >= 40) return { message: 'Good effort! Keep learning about waste management!', emoji: '👍', color: 'text-blue-600' };
    return { message: 'Keep practicing! Every step towards learning helps!', emoji: '💪', color: 'text-purple-600' };
  };

  if (quizCompleted) {
    const scoreMessage = getScoreMessage();
    
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Quiz Completed!
              </h1>
              <p className="text-gray-600">
                क्विज़ पूरी हो गई!
              </p>
            </div>

            <div className="mb-8">
              <div className="text-6xl font-bold text-green-600 mb-2">
                {score}
              </div>
              <p className="text-xl text-gray-700 mb-4">
                Total Points Earned
              </p>
              
              <div className={`text-2xl ${scoreMessage.color} mb-4`}>
                {scoreMessage.emoji} {scoreMessage.message}
              </div>
              
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <div className="text-sm text-gray-600 mb-2">Your Performance</div>
                <div className="flex justify-between text-sm">
                  <span>Correct Answers: {questions.filter((_, index) => selectedAnswer === questions[index].correctAnswer).length}/{questions.length}</span>
                  <span>Accuracy: {Math.round((score / (questions.length * 15)) * 100)}%</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors inline-flex items-center"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Take Quiz Again
              </button>
              
              <button
                onClick={() => window.location.href = '/challenges'}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                <Target className="h-5 w-5 mr-2" />
                Try Challenges
              </button>
            </div>

            {user && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-800">
                  <Award className="inline h-5 w-5 mr-1" />
                  Points added to your account! Total points: {user.points + score}
                </p>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Waste Management Quiz
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Test your knowledge and earn points!
          </p>
          <p className="text-lg text-gray-500">
            अपने ज्ञान का परीक्षण करें और पॉइंट्स कमाएं!
          </p>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                language === 'en' 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                language === 'hi' 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-green-600">
              Score: {score} points
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Quiz Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Question */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {language === 'en' ? currentQ.question : currentQ.questionHindi}
            </h2>
            
            {/* Question Image (if available) */}
            {currentQ.imageUrl && (
              <div className="mb-6">
                <img 
                  src={currentQ.imageUrl} 
                  alt="Question illustration"
                  className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                />
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                  showResult
                    ? index === currentQ.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : index === selectedAnswer && index !== currentQ.correctAnswer
                      ? 'border-red-500 bg-red-50 text-red-800'
                      : 'border-gray-200 bg-gray-50 text-gray-900'
                    : selectedAnswer === index
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-900'
                }`}
              >
                <div className="flex items-center">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-current flex items-center justify-center mr-3 text-sm font-medium text-gray-900">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="font-medium">
                    {language === 'en' ? option : currentQ.optionsHindi[index]}
                  </span>
                  {showResult && index === currentQ.correctAnswer && (
                    <CheckCircle className="ml-auto h-6 w-6 text-green-600" />
                  )}
                  {showResult && index === selectedAnswer && index !== currentQ.correctAnswer && (
                    <XCircle className="ml-auto h-6 w-6 text-red-600" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Explanation:</h3>
              <p className="text-blue-800">
                {language === 'en' ? currentQ.explanation : currentQ.explanationHindi}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between">
            <div className="text-sm text-gray-500">
              Points for this question: {currentQ.points}
            </div>
            
            {!showResult ? (
              <button
                onClick={handleNextQuestion}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors inline-flex items-center"
              >
                Submit Answer
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleContinue}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors inline-flex items-center"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default QuizPage;