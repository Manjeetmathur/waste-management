import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to Indian format
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date);
}

// Format currency to Indian Rupees
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
}

// Calculate distance between two coordinates (Haversine formula)
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in kilometers
  return Math.round(d * 100) / 100; // Round to 2 decimal places
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Generate a random ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Validate Indian phone number
export function isValidIndianPhone(phone: string): boolean {
  const phoneRegex = /^(\+91|91|0)?[6789]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
}

// Format Indian phone number
export function formatIndianPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
}

// Get waste type emoji
export function getWasteTypeEmoji(wasteType: string): string {
  const emojiMap: Record<string, string> = {
    plastic: '♻️',
    paper: '📄',
    metal: '🔩',
    glass: '🍶',
    electronic: '📱',
    organic: '🥬',
    textile: '👕',
    battery: '🔋'
  };
  return emojiMap[wasteType] || '🗑️';
}

// Get waste type color
export function getWasteTypeColor(wasteType: string): string {
  const colorMap: Record<string, string> = {
    plastic: 'bg-blue-100 text-blue-800',
    paper: 'bg-yellow-100 text-yellow-800',
    metal: 'bg-gray-100 text-gray-800',
    glass: 'bg-green-100 text-green-800',
    electronic: 'bg-purple-100 text-purple-800',
    organic: 'bg-green-100 text-green-800',
    textile: 'bg-pink-100 text-pink-800',
    battery: 'bg-red-100 text-red-800'
  };
  return colorMap[wasteType] || 'bg-gray-100 text-gray-800';
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Get greeting based on time
export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

// Get Hindi greeting based on time
export function getTimeBasedGreetingHindi(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'सुप्रभात';
  if (hour < 17) return 'नमस्कार';
  return 'शुभ संध्या';
}

// Calculate quiz score percentage
export function calculateQuizScore(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

// Get quiz performance message
export function getQuizPerformanceMessage(percentage: number): {
  message: string;
  messageHindi: string;
  emoji: string;
  color: string;
} {
  if (percentage >= 80) {
    return {
      message: 'Excellent! You\'re a waste management expert!',
      messageHindi: 'उत्कृष्ट! आप एक कचरा प्रबंधन विशेषज्ञ हैं!',
      emoji: '🏆',
      color: 'text-yellow-600'
    };
  }
  if (percentage >= 60) {
    return {
      message: 'Great job! You know your waste management basics!',
      messageHindi: 'बहुत बढ़िया! आप कचरा प्रबंधन की मूल बातें जानते हैं!',
      emoji: '⭐',
      color: 'text-green-600'
    };
  }
  if (percentage >= 40) {
    return {
      message: 'Good effort! Keep learning about waste management!',
      messageHindi: 'अच्छा प्रयास! कचरा प्रबंधन के बारे में सीखते रहें!',
      emoji: '👍',
      color: 'text-blue-600'
    };
  }
  return {
    message: 'Keep practicing! Every step towards learning helps!',
    messageHindi: 'अभ्यास करते रहें! सीखने की दिशा में हर कदम मदद करता है!',
    emoji: '💪',
    color: 'text-purple-600'
  };
}