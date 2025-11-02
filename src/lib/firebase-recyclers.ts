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
import { Recycler, WasteType } from '@/types';

/**
 * Get all recyclers
 */
export const getAllRecyclers = async (): Promise<Recycler[]> => {
  try {
    const q = query(
      collection(db, 'recyclers'),
      where('isVerified', '==', true),
      orderBy('rating', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as Recycler[];
  } catch (error) {
    console.error('Error fetching recyclers:', error);
    throw error;
  }
};

/**
 * Get recyclers by area
 */
export const getRecyclersByArea = async (area: string): Promise<Recycler[]> => {
  try {
    const q = query(
      collection(db, 'recyclers'),
      where('area', '==', area),
      where('isVerified', '==', true),
      orderBy('rating', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as Recycler[];
  } catch (error) {
    console.error('Error fetching recyclers by area:', error);
    throw error;
  }
};

/**
 * Get recyclers by waste type
 */
export const getRecyclersByWasteType = async (wasteType: WasteType): Promise<Recycler[]> => {
  try {
    const q = query(
      collection(db, 'recyclers'),
      where('wasteTypes', 'array-contains', wasteType),
      where('isVerified', '==', true),
      orderBy('rating', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as Recycler[];
  } catch (error) {
    console.error('Error fetching recyclers by waste type:', error);
    throw error;
  }
};

/**
 * Get a single recycler by ID
 */
export const getRecycler = async (recyclerId: string): Promise<Recycler | null> => {
  try {
    const docRef = doc(db, 'recyclers', recyclerId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt?.toDate() || new Date(),
    } as Recycler;
  } catch (error) {
    console.error('Error fetching recycler:', error);
    throw error;
  }
};

/**
 * Create a new recycler profile
 */
export const createRecycler = async (recyclerData: Omit<Recycler, 'id' | 'createdAt'>): Promise<string> => {
  try {
    // Validate required fields
    if (!recyclerData.name || !recyclerData.phone || !recyclerData.address || !recyclerData.area) {
      throw new Error('Missing required fields');
    }

    if (!recyclerData.wasteTypes || recyclerData.wasteTypes.length === 0) {
      throw new Error('At least one waste type must be selected');
    }

    // Build pricePerKg object - start with defaults, then apply user values
    const defaultPrices: Record<WasteType, number> = {
      plastic: 0,
      paper: 0,
      metal: 0,
      glass: 0,
      electronic: 0,
      organic: 0,
      textile: 0,
      battery: 0,
    };
    
    const cleanPricePerKg: Record<WasteType, number> = {
      ...defaultPrices,
      ...recyclerData.pricePerKg
    };

    const cleanData = {
      ...recyclerData,
      pricePerKg: cleanPricePerKg,
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, 'recyclers'), cleanData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating recycler:', error);
    throw error;
  }
};

/**
 * Update recycler rating
 */
export const updateRecyclerRating = async (recyclerId: string, newRating: number): Promise<void> => {
  try {
    const recycler = await getRecycler(recyclerId);
    if (!recycler) {
      throw new Error('Recycler not found');
    }
    
    // Calculate new average rating (simplified - in production, store all ratings and calculate average)
    const docRef = doc(db, 'recyclers', recyclerId);
    await updateDoc(docRef, {
      rating: newRating,
    });
  } catch (error) {
    console.error('Error updating recycler rating:', error);
    throw error;
  }
};

