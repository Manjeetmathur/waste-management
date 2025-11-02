'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card3D from '@/components/Card3D';
import FloatingElement from '@/components/FloatingElement';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Recycle, 
  CheckCircle, 
  X, 
  Clock,
  DollarSign,
  Truck,
  Star
} from 'lucide-react';
import { WasteType, Recycler } from '@/types';
import { createRecycler } from '@/lib/firebase-recyclers';
import toast from 'react-hot-toast';

const RegisterRecyclerPage = () => {
  const { user, firebaseUser } = useAuth();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: user?.email || '',
    address: '',
    area: '',
    wasteTypes: [] as WasteType[],
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
      days: [] as string[],
      hours: '9:00 AM - 6:00 PM'
    }
  });

  const wasteTypesOptions = [
    { type: 'plastic' as WasteType, name: 'Plastic', nameHindi: 'प्लास्टिक', icon: '♻️' },
    { type: 'paper' as WasteType, name: 'Paper', nameHindi: 'कागज़', icon: '📄' },
    { type: 'metal' as WasteType, name: 'Metal', nameHindi: 'धातु', icon: '🔩' },
    { type: 'glass' as WasteType, name: 'Glass', nameHindi: 'कांच', icon: '🍶' },
    { type: 'electronic' as WasteType, name: 'E-Waste', nameHindi: 'ई-कचरा', icon: '📱' },
    { type: 'organic' as WasteType, name: 'Organic', nameHindi: 'जैविक', icon: '🥬' },
    { type: 'textile' as WasteType, name: 'Textile', nameHindi: 'कपड़ा', icon: '👕' },
    { type: 'battery' as WasteType, name: 'Battery', nameHindi: 'बैटरी', icon: '🔋' }
  ];

  const daysOfWeek = [
    { value: 'Monday', label: 'Monday', labelHindi: 'सोमवार' },
    { value: 'Tuesday', label: 'Tuesday', labelHindi: 'मंगलवार' },
    { value: 'Wednesday', label: 'Wednesday', labelHindi: 'बुधवार' },
    { value: 'Thursday', label: 'Thursday', labelHindi: 'गुरुवार' },
    { value: 'Friday', label: 'Friday', labelHindi: 'शुक्रवार' },
    { value: 'Saturday', label: 'Saturday', labelHindi: 'शनिवार' },
    { value: 'Sunday', label: 'Sunday', labelHindi: 'रविवार' }
  ];

  const commonAreas = ['Andheri West', 'Bandra East', 'Dharavi', 'Powai', 'Borivali', 'Thane', 'Navi Mumbai', 'Other'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('price_')) {
      const wasteType = name.replace('price_', '') as WasteType;
      setFormData({
        ...formData,
        pricePerKg: {
          ...formData.pricePerKg,
          [wasteType]: parseFloat(value) || 0
        }
      });
    } else if (name === 'hours') {
      setFormData({
        ...formData,
        availability: {
          ...formData.availability,
          hours: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const toggleWasteType = (wasteType: WasteType) => {
    setFormData({
      ...formData,
      wasteTypes: formData.wasteTypes.includes(wasteType)
        ? formData.wasteTypes.filter(t => t !== wasteType)
        : [...formData.wasteTypes, wasteType]
    });
  };

  const toggleDay = (day: string) => {
    setFormData({
      ...formData,
      availability: {
        ...formData.availability,
        days: formData.availability.days.includes(day)
          ? formData.availability.days.filter(d => d !== day)
          : [...formData.availability.days, day]
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.phone || !formData.address || !formData.area) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.wasteTypes.length === 0) {
      toast.error('Please select at least one waste type you accept');
      return;
    }

    if (formData.availability.days.length === 0) {
      toast.error('Please select at least one working day');
      return;
    }

    if (!user && !firebaseUser) {
      toast.error('Please sign in to register as a recycler');
      router.push('/auth/signin');
      return;
    }

    setLoading(true);
    try {
      const userId = user?.id || firebaseUser?.uid;
      if (!userId) {
        throw new Error('User ID not available');
      }

      // Create recycler profile
      const recyclerData: Omit<Recycler, 'id' | 'createdAt'> = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        address: formData.address,
        area: formData.area,
        wasteTypes: formData.wasteTypes,
        rating: 0, // New recyclers start with 0 rating
        isVerified: false, // Will be verified by admin later
        pricePerKg: formData.pricePerKg,
        availability: formData.availability
      };

      const recyclerId = await createRecycler(recyclerData);
      
      // Update user type to recycler if they have an account
      if (user) {
        // You might want to add a function to update user type in AuthContext
        toast.success('Recycler profile created successfully! It will be reviewed and verified soon.');
      } else {
        toast.success('Registration submitted successfully! Please sign in to continue.');
      }

      router.push('/recyclers');
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to register as recycler. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <Header />
      
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <FloatingElement duration={2} delay={0} amplitude={5}>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Register as Recycler
            </h1>
          </FloatingElement>
          <FloatingElement duration={2.5} delay={0.3} amplitude={3}>
            <p className="text-xl text-gray-600 mb-2">
              Join CleanConnect and connect with customers in your area
            </p>
            <p className="text-lg text-gray-500">
              CleanConnect में शामिल हों और अपने क्षेत्र के ग्राहकों से जुड़ें
            </p>
          </FloatingElement>
        </div>

        {/* Form */}
        <FloatingElement duration={3} delay={0.5} amplitude={8}>
          <Card3D intensity="medium" glowEffect>
            <div className="bg-white rounded-xl shadow-lg p-8 border border-green-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <User className="h-6 w-6 mr-2 text-green-600" />
                    Basic Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Business/Name * <span className="text-gray-500">(व्यवसाय/नाम)</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter business or personal name"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number * <span className="text-gray-500">(फोन नंबर)</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="+91 XXXXX XXXXX"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-gray-500">(ईमेल)</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    {/* Area */}
                    <div>
                      <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                        Service Area * <span className="text-gray-500">(सेवा क्षेत्र)</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <select
                          id="area"
                          name="area"
                          value={formData.area}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select your area</option>
                          {commonAreas.map((area) => (
                            <option key={area} value={area}>{area}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mt-6">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Complete Address * <span className="text-gray-500">(पूरा पता)</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <textarea
                        id="address"
                        name="address"
                        rows={3}
                        value={formData.address}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your complete business address"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Waste Types */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <Recycle className="h-6 w-6 mr-2 text-green-600" />
                    Waste Types Accepted *
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Select all waste types you accept and recycle
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {wasteTypesOptions.map((waste) => (
                      <button
                        key={waste.type}
                        type="button"
                        onClick={() => toggleWasteType(waste.type)}
                        className={`p-4 rounded-lg border-2 text-center transition-colors ${
                          formData.wasteTypes.includes(waste.type)
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="text-2xl mb-2">{waste.icon}</div>
                        <div className="font-medium text-sm text-gray-900">{waste.name}</div>
                        <div className="text-xs text-gray-600">{waste.nameHindi}</div>
                        {formData.wasteTypes.includes(waste.type) && (
                          <CheckCircle className="h-5 w-5 text-green-600 mx-auto mt-2" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                {formData.wasteTypes.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                      <DollarSign className="h-6 w-6 mr-2 text-green-600" />
                      Pricing (₹ per kg)
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                      Set your prices for accepted waste types
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.wasteTypes.map((wasteType) => {
                        const wasteInfo = wasteTypesOptions.find(w => w.type === wasteType);
                        return (
                          <div key={wasteType}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {wasteInfo?.name}
                            </label>
                            <div className="relative">
                              <span className="absolute left-3 top-3 text-gray-500">₹</span>
                              <input
                                type="number"
                                name={`price_${wasteType}`}
                                value={formData.pricePerKg[wasteType]}
                                onChange={handleChange}
                                min="0"
                                step="0.1"
                                className="block w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="0"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Availability */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <Clock className="h-6 w-6 mr-2 text-green-600" />
                    Availability *
                  </h2>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Working Days * <span className="text-gray-500">(कार्य दिवस)</span>
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {daysOfWeek.map((day) => (
                        <button
                          key={day.value}
                          type="button"
                          onClick={() => toggleDay(day.value)}
                          className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                            formData.availability.days.includes(day.value)
                              ? 'border-green-500 bg-green-50 text-green-700 font-medium'
                              : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                          }`}
                        >
                          {day.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1">
                      Working Hours <span className="text-gray-500">(कार्य समय)</span>
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="hours"
                        name="hours"
                        value={formData.availability.hours}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="9:00 AM - 6:00 PM"
                      />
                    </div>
                  </div>
                </div>

                {/* Benefits Info */}
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    Benefits of Registering
                  </h3>
                  <ul className="space-y-2 text-blue-800 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Get connected with customers in your area automatically</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Receive pickup requests directly through the platform</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Build trust with verified recycler badge</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Grow your business with digital presence</span>
                    </li>
                  </ul>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Registering...
                      </>
                    ) : (
                      <>
                        <Truck className="h-5 w-5 mr-2" />
                        Register as Recycler
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </Card3D>
        </FloatingElement>
      </div>

      <Footer />
    </div>
  );
};

export default RegisterRecyclerPage;

