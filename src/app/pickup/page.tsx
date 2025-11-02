'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageUpload from '@/components/ImageUpload';
import Card3D from '@/components/Card3D';
import FloatingElement from '@/components/FloatingElement';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Package, 
  IndianRupee,
  Truck,
  CheckCircle,
  AlertCircle,
  Camera
} from 'lucide-react';
import { WasteType } from '@/types';
import toast from 'react-hot-toast';
import { createPickupRequest } from '@/lib/firebase-pickup';

const PickupPage = () => {
  const { user, firebaseUser } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    wasteType: '' as WasteType | '',
    estimatedWeight: '',
    address: '',
    scheduledDate: '',
    scheduledTime: '',
    notes: '',
    images: [] as string[]
  });
  
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/auth/signin');
    }
  }, [user, router]);

  // Waste types with prices per kg
  const wasteTypes = [
    { type: 'plastic' as WasteType, name: 'Plastic', nameHindi: 'प्लास्टिक', price: 10, icon: '♻️' },
    { type: 'paper' as WasteType, name: 'Paper', nameHindi: 'कागज़', price: 8, icon: '📄' },
    { type: 'metal' as WasteType, name: 'Metal', nameHindi: 'धातु', price: 25, icon: '🔩' },
    { type: 'glass' as WasteType, name: 'Glass', nameHindi: 'कांच', price: 5, icon: '🍶' },
    { type: 'electronic' as WasteType, name: 'E-Waste', nameHindi: 'ई-कचरा', price: 15, icon: '📱' },
    { type: 'organic' as WasteType, name: 'Organic', nameHindi: 'जैविक', price: 3, icon: '🥬' },
    { type: 'textile' as WasteType, name: 'Textile', nameHindi: 'कपड़ा', price: 12, icon: '👕' },
    { type: 'battery' as WasteType, name: 'Battery', nameHindi: 'बैटरी', price: 20, icon: '🔋' }
  ];

  // Calculate estimated price
  useEffect(() => {
    if (formData.wasteType && formData.estimatedWeight) {
      const wasteTypeData = wasteTypes.find(w => w.type === formData.wasteType);
      if (wasteTypeData) {
        const price = wasteTypeData.price * parseFloat(formData.estimatedWeight);
        setEstimatedPrice(price);
      }
    } else {
      setEstimatedPrice(0);
    }
  }, [formData.wasteType, formData.estimatedWeight]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUploaded = (imageUrl: string) => {
    if (imageUrl) {
      setFormData({
        ...formData,
        images: [...formData.images, imageUrl]
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to schedule a pickup');
      router.push('/auth/signin');
      return;
    }
    
    if (!formData.wasteType || !formData.estimatedWeight || !formData.address || !formData.scheduledDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // Ensure user ID is available - use firebaseUser.uid as primary source
      const userId = user?.id || firebaseUser?.uid;
      if (!userId) {
        toast.error('User information is missing. Please sign in again.');
        router.push('/auth/signin');
        return;
      }

      // Create pickup request in Firebase
      const requestId = await createPickupRequest({
        userId: userId,
        recyclerId: '', // Will be assigned when matched
        wasteType: formData.wasteType as WasteType,
        estimatedWeight: parseFloat(formData.estimatedWeight),
        address: formData.address,
        scheduledDate: new Date(formData.scheduledDate),
        status: 'pending',
        estimatedPrice,
        notes: formData.notes || undefined,
        images: formData.images.length > 0 ? formData.images : undefined,
      });
      
      toast.success('Pickup scheduled successfully! You will receive a confirmation shortly.');
      
      // Reset form
      setFormData({
        wasteType: '',
        estimatedWeight: '',
        address: '',
        scheduledDate: '',
        scheduledTime: '',
        notes: '',
        images: []
      });
    } catch (error) {
      console.error('Pickup scheduling error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to schedule pickup. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement duration={6} delay={0} amplitude={20} className="absolute top-20 left-10">
          <div className="w-32 h-32 bg-green-200 rounded-full opacity-20 blur-xl"></div>
        </FloatingElement>
        <FloatingElement duration={8} delay={2} amplitude={15} className="absolute bottom-20 right-10">
          <div className="w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
        </FloatingElement>
      </div>

      <Header />
      
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <FloatingElement duration={2} delay={0} amplitude={5}>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Schedule Waste Pickup
            </h1>
          </FloatingElement>
          <FloatingElement duration={2.5} delay={0.3} amplitude={3}>
            <p className="text-xl text-gray-600 mb-2">
              Connect with local recyclers for easy waste collection
            </p>
            <p className="text-lg text-gray-500">
              स्थानीय रीसाइक्लर्स से जुड़ें और आसानी से कचरा संग्रह कराएं
            </p>
          </FloatingElement>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <FloatingElement duration={3} delay={0.5} amplitude={8}>
              <Card3D intensity="medium" glowEffect>
                <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Waste Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Waste Type *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {wasteTypes.map((waste) => (
                      <button
                        key={waste.type}
                        type="button"
                        onClick={() => setFormData({ ...formData, wasteType: waste.type })}
                        className={`p-4 rounded-lg border-2 text-center transition-colors ${
                          formData.wasteType === waste.type
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-2">{waste.icon}</div>
                        <div className="font-medium text-sm">{waste.name}</div>
                        <div className="text-xs text-gray-500">{waste.nameHindi}</div>
                        <div className="text-xs font-medium text-green-600 mt-1">
                          ₹{waste.price}/kg
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Weight */}
                <div>
                  <label htmlFor="estimatedWeight" className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Weight (kg) *
                  </label>
                  <div className="relative">
                    <Package className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      id="estimatedWeight"
                      name="estimatedWeight"
                      min="0.1"
                      step="0.1"
                      value={formData.estimatedWeight}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter estimated weight"
                      required
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Pickup Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your complete address"
                      required
                    />
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        id="scheduledDate"
                        name="scheduledDate"
                        value={formData.scheduledDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="scheduledTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <select
                        id="scheduledTime"
                        name="scheduledTime"
                        value={formData.scheduledTime}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Any time</option>
                        <option value="morning">Morning (9 AM - 12 PM)</option>
                        <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                        <option value="evening">Evening (4 PM - 7 PM)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Camera className="inline h-4 w-4 mr-1" />
                    Upload Waste Images (Optional)
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    Add photos to help recyclers better understand your waste type and quantity
                  </p>
                  
                  {formData.images.length < 3 && (
                    <ImageUpload
                      onImageUploaded={handleImageUploaded}
                      folder="waste-pickup"
                      className="mb-4"
                    />
                  )}
                  
                  {/* Display uploaded images */}
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      {formData.images.map((imageUrl, index) => (
                        <div key={index} className="relative">
                          <img
                            src={imageUrl}
                            alt={`Waste image ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {formData.images.length >= 3 && (
                    <p className="text-sm text-gray-500 mt-2">
                      Maximum 3 images allowed
                    </p>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Any special instructions or additional information..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Scheduling...' : 'Schedule Pickup'}
                </button>
              </form>
                </div>
              </Card3D>
            </FloatingElement>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Estimate */}
            <FloatingElement duration={3.5} delay={0.8} amplitude={6}>
              <Card3D intensity="medium" glowEffect>
                <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <IndianRupee className="h-5 w-5 mr-2 text-green-600" />
                Price Estimate
              </h3>
              
              {estimatedPrice > 0 ? (
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    ₹{estimatedPrice.toFixed(2)}
                  </div>
                  <p className="text-sm text-gray-600">
                    Estimated earnings for {formData.estimatedWeight}kg of {formData.wasteType}
                  </p>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <p>Select waste type and weight to see estimate</p>
                </div>
              )}
                </div>
              </Card3D>
            </FloatingElement>

            {/* How it Works */}
            <FloatingElement duration={4} delay={1.2} amplitude={5}>
              <Card3D intensity="low" glowEffect>
                <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                How it Works
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Schedule Pickup</p>
                    <p className="text-xs text-gray-600">Fill the form with your waste details</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Get Matched</p>
                    <p className="text-xs text-gray-600">We connect you with nearby recyclers</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Pickup & Payment</p>
                    <p className="text-xs text-gray-600">Recycler collects and pays you</p>
                  </div>
                </div>
              </div>
                </div>
              </Card3D>
            </FloatingElement>

            {/* Tips */}
            <FloatingElement duration={4.5} delay={1.5} amplitude={4}>
              <Card3D intensity="low">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Pro Tips
              </h3>
              
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Clean and sort your waste for better prices</li>
                <li>• Bundle similar items together</li>
                <li>• Remove labels from plastic bottles</li>
                <li>• Separate different types of metals</li>
              </ul>
                </div>
              </Card3D>
            </FloatingElement>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PickupPage;