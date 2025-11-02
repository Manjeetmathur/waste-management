import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { PickupRequest, WasteType } from '@/types';

/**
 * Create a new pickup request
 */
export const createPickupRequest = async (pickupData: Omit<PickupRequest, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    // Validate required fields
    if (!pickupData.userId) {
      throw new Error('User ID is required');
    }
    
    if (!pickupData.wasteType) {
      throw new Error('Waste type is required');
    }
    
    if (!pickupData.address) {
      throw new Error('Address is required');
    }
    
    if (!pickupData.scheduledDate) {
      throw new Error('Scheduled date is required');
    }

    // Filter out undefined values to avoid Firestore errors
    const cleanData: Record<string, any> = {
      userId: pickupData.userId,
      recyclerId: pickupData.recyclerId || '',
      wasteType: pickupData.wasteType,
      estimatedWeight: pickupData.estimatedWeight || 0,
      address: pickupData.address,
      scheduledDate: Timestamp.fromDate(pickupData.scheduledDate),
      status: pickupData.status || 'pending',
      estimatedPrice: pickupData.estimatedPrice || 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    // Add optional fields only if they have values
    if (pickupData.coordinates) {
      cleanData.coordinates = pickupData.coordinates;
    }
    
    if (pickupData.actualPrice !== undefined) {
      cleanData.actualPrice = pickupData.actualPrice;
    }
    
    if (pickupData.notes) {
      cleanData.notes = pickupData.notes;
    }
    
    if (pickupData.images && pickupData.images.length > 0) {
      cleanData.images = pickupData.images;
    }

    const docRef = await addDoc(collection(db, 'pickupRequests'), cleanData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating pickup request:', error);
    throw error;
  }
};

/**
 * Get all pickup requests for a user
 */
export const getUserPickupRequests = async (userId: string): Promise<PickupRequest[]> => {
  try {
    const q = query(
      collection(db, 'pickupRequests'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      scheduledDate: doc.data().scheduledDate.toDate(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    })) as PickupRequest[];
  } catch (error) {
    console.error('Error fetching pickup requests:', error);
    throw error;
  }
};

/**
 * Get a single pickup request by ID
 */
export const getPickupRequest = async (requestId: string): Promise<PickupRequest | null> => {
  try {
    const docRef = doc(db, 'pickupRequests', requestId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data(),
      scheduledDate: docSnap.data().scheduledDate.toDate(),
      createdAt: docSnap.data().createdAt.toDate(),
      updatedAt: docSnap.data().updatedAt.toDate(),
    } as PickupRequest;
  } catch (error) {
    console.error('Error fetching pickup request:', error);
    throw error;
  }
};

/**
 * Update pickup request status
 */
export const updatePickupRequestStatus = async (
  requestId: string, 
  status: PickupRequest['status'],
  actualPrice?: number
): Promise<void> => {
  try {
    const docRef = doc(db, 'pickupRequests', requestId);
    await updateDoc(docRef, {
      status,
      ...(actualPrice && { actualPrice }),
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating pickup request:', error);
    throw error;
  }
};

/**
 * Get pickup requests by waste type
 */
export const getPickupRequestsByWasteType = async (wasteType: WasteType): Promise<PickupRequest[]> => {
  try {
    const q = query(
      collection(db, 'pickupRequests'),
      where('wasteType', '==', wasteType),
      where('status', '==', 'pending'),
      orderBy('scheduledDate', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      scheduledDate: doc.data().scheduledDate.toDate(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    })) as PickupRequest[];
  } catch (error) {
    console.error('Error fetching pickup requests by waste type:', error);
    throw error;
  }
};

/**
 * Cancel a pickup request
 */
export const cancelPickupRequest = async (requestId: string): Promise<void> => {
  try {
    await updatePickupRequestStatus(requestId, 'cancelled');
  } catch (error) {
    console.error('Error cancelling pickup request:', error);
    throw error;
  }
};

