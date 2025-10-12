export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  userType: 'household' | 'recycler' | 'business';
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Recycler {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  area: string;
  wasteTypes: WasteType[];
  rating: number;
  isVerified: boolean;
  pricePerKg: Record<WasteType, number>;
  availability: {
    days: string[];
    hours: string;
  };
  createdAt: Date;
}

export type WasteType = 
  | 'plastic' 
  | 'paper' 
  | 'metal' 
  | 'glass' 
  | 'electronic' 
  | 'organic' 
  | 'textile' 
  | 'battery';

export interface PickupRequest {
  id: string;
  userId: string;
  recyclerId: string;
  wasteType: WasteType;
  estimatedWeight: number;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  scheduledDate: Date;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  estimatedPrice: number;
  actualPrice?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionHindi?: string;
  options: string[];
  optionsHindi?: string[];
  correctAnswer: number;
  explanation: string;
  explanationHindi?: string;
  imageUrl?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'segregation' | 'recycling' | 'environment';
  points: number;
}

export interface UserQuizResult {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  pointsEarned: number;
  completedAt: Date;
}

export interface Challenge {
  id: string;
  title: string;
  titleHindi?: string;
  description: string;
  descriptionHindi?: string;
  type: 'individual' | 'community';
  target: number;
  unit: string;
  startDate: Date;
  endDate: Date;
  reward: number; // points
  participants: string[]; // user IDs
  isActive: boolean;
}

export interface UserProgress {
  userId: string;
  challengeId: string;
  progress: number;
  lastUpdated: Date;
}

export interface Tip {
  id: string;
  title: string;
  titleHindi?: string;
  content: string;
  contentHindi?: string;
  category: 'segregation' | 'recycling' | 'composting' | 'reduction';
  imageUrl?: string;
  isActive: boolean;
}