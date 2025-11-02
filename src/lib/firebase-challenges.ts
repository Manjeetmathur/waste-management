import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { Challenge, UserProgress } from '@/types';

/**
 * Get all active challenges
 */
export const getActiveChallenges = async (): Promise<Challenge[]> => {
  try {
    const now = Timestamp.now();
    const q = query(
      collection(db, 'challenges'),
      where('isActive', '==', true),
      where('endDate', '>=', now),
      orderBy('endDate', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      startDate: doc.data().startDate.toDate(),
      endDate: doc.data().endDate.toDate(),
    })) as Challenge[];
  } catch (error) {
    console.error('Error fetching active challenges:', error);
    throw error;
  }
};

/**
 * Get all challenges (active and inactive)
 */
export const getAllChallenges = async (): Promise<Challenge[]> => {
  try {
    const q = query(
      collection(db, 'challenges'),
      orderBy('endDate', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      startDate: doc.data().startDate.toDate(),
      endDate: doc.data().endDate.toDate(),
    })) as Challenge[];
  } catch (error) {
    console.error('Error fetching challenges:', error);
    throw error;
  }
};

/**
 * Get a single challenge by ID
 */
export const getChallenge = async (challengeId: string): Promise<Challenge | null> => {
  try {
    const docRef = doc(db, 'challenges', challengeId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data(),
      startDate: docSnap.data().startDate.toDate(),
      endDate: docSnap.data().endDate.toDate(),
    } as Challenge;
  } catch (error) {
    console.error('Error fetching challenge:', error);
    throw error;
  }
};

/**
 * Get user progress for a challenge
 */
export const getUserChallengeProgress = async (
  userId: string, 
  challengeId: string
): Promise<UserProgress | null> => {
  try {
    const q = query(
      collection(db, 'userProgress'),
      where('userId', '==', userId),
      where('challengeId', '==', challengeId)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return {
      ...doc.data(),
      lastUpdated: doc.data().lastUpdated.toDate(),
    } as UserProgress;
  } catch (error) {
    console.error('Error fetching user progress:', error);
    throw error;
  }
};

/**
 * Get all user progress for a user
 */
export const getAllUserProgress = async (userId: string): Promise<UserProgress[]> => {
  try {
    const q = query(
      collection(db, 'userProgress'),
      where('userId', '==', userId),
      orderBy('lastUpdated', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      lastUpdated: doc.data().lastUpdated.toDate(),
    })) as UserProgress[];
  } catch (error) {
    console.error('Error fetching user progress:', error);
    throw error;
  }
};

/**
 * Update user challenge progress
 */
export const updateUserChallengeProgress = async (
  userId: string,
  challengeId: string,
  progress: number
): Promise<void> => {
  try {
    const existingProgress = await getUserChallengeProgress(userId, challengeId);
    
    if (existingProgress) {
      // Update existing progress
      const q = query(
        collection(db, 'userProgress'),
        where('userId', '==', userId),
        where('challengeId', '==', challengeId)
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const docRef = doc(db, 'userProgress', querySnapshot.docs[0].id);
        await updateDoc(docRef, {
          progress,
          lastUpdated: Timestamp.now(),
        });
      }
    } else {
      // Create new progress entry
      await addDoc(collection(db, 'userProgress'), {
        userId,
        challengeId,
        progress,
        lastUpdated: Timestamp.now(),
      });
    }
  } catch (error) {
    console.error('Error updating user progress:', error);
    throw error;
  }
};

/**
 * Join a challenge
 */
export const joinChallenge = async (challengeId: string, userId: string): Promise<void> => {
  try {
    const challenge = await getChallenge(challengeId);
    if (!challenge) {
      throw new Error('Challenge not found');
    }
    
    // Add user to participants if not already added
    if (!challenge.participants.includes(userId)) {
      const docRef = doc(db, 'challenges', challengeId);
      await updateDoc(docRef, {
        participants: [...challenge.participants, userId],
      });
    }
    
    // Initialize progress if not exists
    const existingProgress = await getUserChallengeProgress(userId, challengeId);
    if (!existingProgress) {
      await updateUserChallengeProgress(userId, challengeId, 0);
    }
  } catch (error) {
    console.error('Error joining challenge:', error);
    throw error;
  }
};

