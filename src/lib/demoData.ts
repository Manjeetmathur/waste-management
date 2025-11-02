import { Recycler, QuizQuestion, Challenge, Tip } from '@/types';

export const demoRecyclers: Recycler[] = [
  {
    id: '1',
    name: 'Ramesh Kabadiwala',
    phone: '+91 98765 43210',
    email: 'ramesh@example.com',
    address: 'Shop 15, Main Market, Andheri West, Mumbai',
    area: 'Andheri West',
    wasteTypes: ['plastic', 'paper', 'metal'],
    rating: 4.5,
    isVerified: true,
    pricePerKg: {
      plastic: 10,
      paper: 8,
      metal: 25,
      glass: 5,
      electronic: 15,
      organic: 3,
      textile: 12,
      battery: 20
    },
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      hours: '9:00 AM - 6:00 PM'
    },
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Green Earth Recyclers',
    phone: '+91 87654 32109',
    email: 'info@greenearth.com',
    address: 'Plot 42, Industrial Area, Bandra East, Mumbai',
    area: 'Bandra East',
    wasteTypes: ['electronic', 'battery', 'metal', 'plastic'],
    rating: 4.8,
    isVerified: true,
    pricePerKg: {
      plastic: 12,
      paper: 9,
      metal: 28,
      glass: 6,
      electronic: 18,
      organic: 0,
      textile: 10,
      battery: 25
    },
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      hours: '8:00 AM - 5:00 PM'
    },
    createdAt: new Date('2024-01-01')
  },
  {
    id: '3',
    name: 'Suresh Paper Collection',
    phone: '+91 76543 21098',
    address: 'Lane 3, Dharavi, Mumbai',
    area: 'Dharavi',
    wasteTypes: ['paper', 'textile'],
    rating: 4.2,
    isVerified: false,
    pricePerKg: {
      plastic: 8,
      paper: 10,
      metal: 20,
      glass: 4,
      electronic: 12,
      organic: 0,
      textile: 15,
      battery: 18
    },
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      hours: '7:00 AM - 7:00 PM'
    },
    createdAt: new Date('2024-01-01')
  }
];

export const demoQuizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'Where should you dispose of used batteries?',
    questionHindi: 'इस्तेमाल की गई बैटरियों को कहाँ फेंकना चाहिए?',
    options: ['Regular dustbin', 'E-waste collection center', 'Compost bin', 'Recycling bin'],
    optionsHindi: ['सामान्य कूड़ेदान', 'ई-वेस्ट संग्रह केंद्र', 'कंपोस्ट बिन', 'रीसाइक्लिंग बिन'],
    correctAnswer: 1,
    explanation: 'Batteries contain harmful chemicals and should be disposed of at designated e-waste collection centers.',
    explanationHindi: 'बैटरियों में हानिकारक रसायन होते हैं और इन्हें निर्दिष्ट ई-वेस्ट संग्रह केंद्रों में फेंकना चाहिए।',
    difficulty: 'easy',
    category: 'segregation',
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
    difficulty: 'easy',
    category: 'recycling',
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
    difficulty: 'medium',
    category: 'environment',
    points: 15
  }
];

export const demoChallenges: Challenge[] = [
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
  }
];

export const demoTips: Tip[] = [
  {
    id: '1',
    title: 'Separate Wet and Dry Waste',
    titleHindi: 'गीले और सूखे कचरे को अलग करें',
    content: 'Always separate organic waste (food scraps, garden waste) from dry recyclables (paper, plastic, metal). This makes recycling more efficient.',
    contentHindi: 'हमेशा जैविक कचरे (खाने के टुकड़े, बगीचे का कचरा) को सूखे रीसाइक्लेबल (कागज, प्लास्टिक, धातु) से अलग करें। इससे रीसाइक्लिंग अधिक कुशल हो जाती है।',
    category: 'segregation',
    isActive: true
  },
  {
    id: '2',
    title: 'Clean Containers Before Recycling',
    titleHindi: 'रीसाइक्लिंग से पहले कंटेनर साफ करें',
    content: 'Rinse food containers and remove labels before putting them in recycling bins. Clean materials fetch better prices.',
    contentHindi: 'खाने के कंटेनरों को धोएं और रीसाइक्लिंग बिन में डालने से पहले लेबल हटाएं। साफ सामग्री बेहतर कीमत दिलाती है।',
    category: 'recycling',
    isActive: true
  },
  {
    id: '3',
    title: 'Start Home Composting',
    titleHindi: 'घर में कंपोस्टिंग शुरू करें',
    content: 'Convert your kitchen waste into nutrient-rich compost. Use a simple compost bin or pit in your garden.',
    contentHindi: 'अपने रसोई के कचरे को पोषक तत्वों से भरपूर कंपोस्ट में बदलें। अपने बगीचे में एक सरल कंपोस्ट बिन या गड्ढे का उपयोग करें।',
    category: 'composting',
    isActive: true
  }
];

// Utility functions for demo data
export const getRandomRecyclers = (count: number = 3): Recycler[] => {
  return demoRecyclers.slice(0, count);
};

export const getRandomQuizQuestions = (count: number = 5): QuizQuestion[] => {
  const shuffled = [...demoQuizQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getActiveChallenges = (): Challenge[] => {
  return demoChallenges.filter(challenge => challenge.isActive);
};

export const getRandomTip = (): Tip => {
  const activeTips = demoTips.filter(tip => tip.isActive);
  return activeTips[Math.floor(Math.random() * activeTips.length)];
};