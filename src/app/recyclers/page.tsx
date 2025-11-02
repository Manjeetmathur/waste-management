'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Search, 
  MapPin, 
  Phone, 
  Star, 
  Clock, 
  CheckCircle,
  Filter,
  Users,
  Recycle
} from 'lucide-react';
import { Recycler, WasteType } from '@/types';

const RecyclersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWasteType, setSelectedWasteType] = useState<WasteType | ''>('');
  const [selectedArea, setSelectedArea] = useState('');
  const [recyclers, setRecyclers] = useState<Recycler[]>([]);
  const [filteredRecyclers, setFilteredRecyclers] = useState<Recycler[]>([]);

  // Sample recyclers data
  const sampleRecyclers: Recycler[] = [
    {
      id: '1',
      name: 'Ramesh Kabadiwala',
      phone: '+91 98765 43210',
      email: 'ramesh@example.com',
      address: 'Shop 15, Main Market, Andheri West',
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
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'Green Earth Recyclers',
      phone: '+91 87654 32109',
      email: 'info@greenearth.com',
      address: 'Plot 42, Industrial Area, Bandra East',
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
      createdAt: new Date()
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
      createdAt: new Date()
    },
    {
      id: '4',
      name: 'Mumbai Waste Solutions',
      phone: '+91 65432 10987',
      email: 'contact@mumbaiwaste.com',
      address: 'Building 8, Powai Business Park',
      area: 'Powai',
      wasteTypes: ['plastic', 'paper', 'metal', 'glass', 'electronic'],
      rating: 4.7,
      isVerified: true,
      pricePerKg: {
        plastic: 11,
        paper: 9,
        metal: 26,
        glass: 5,
        electronic: 16,
        organic: 2,
        textile: 11,
        battery: 22
      },
      availability: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        hours: '9:00 AM - 6:00 PM'
      },
      createdAt: new Date()
    }
  ];

  useEffect(() => {
    setRecyclers(sampleRecyclers);
    setFilteredRecyclers(sampleRecyclers);
  }, []);

  // Filter recyclers based on search criteria
  useEffect(() => {
    let filtered = recyclers;

    if (searchTerm) {
      filtered = filtered.filter(recycler =>
        recycler.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recycler.area.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedWasteType) {
      filtered = filtered.filter(recycler =>
        recycler.wasteTypes.includes(selectedWasteType)
      );
    }

    if (selectedArea) {
      filtered = filtered.filter(recycler =>
        recycler.area.toLowerCase().includes(selectedArea.toLowerCase())
      );
    }

    setFilteredRecyclers(filtered);
  }, [searchTerm, selectedWasteType, selectedArea, recyclers]);

  const wasteTypes = [
    { type: 'plastic' as WasteType, name: 'Plastic', icon: '♻️' },
    { type: 'paper' as WasteType, name: 'Paper', icon: '📄' },
    { type: 'metal' as WasteType, name: 'Metal', icon: '🔩' },
    { type: 'glass' as WasteType, name: 'Glass', icon: '🍶' },
    { type: 'electronic' as WasteType, name: 'E-Waste', icon: '📱' },
    { type: 'organic' as WasteType, name: 'Organic', icon: '🥬' },
    { type: 'textile' as WasteType, name: 'Textile', icon: '👕' },
    { type: 'battery' as WasteType, name: 'Battery', icon: '🔋' }
  ];

  const areas = ['Andheri West', 'Bandra East', 'Dharavi', 'Powai', 'Borivali', 'Thane', 'Navi Mumbai'];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Recyclers Near You
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Connect with verified recyclers and kabadiwalas in your area
          </p>
          <p className="text-lg text-gray-500">
            अपने क्षेत्र में सत्यापित रीसाइक्लर्स और कबाड़ीवालों से जुड़ें
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Waste Type Filter */}
            <select
              value={selectedWasteType}
              onChange={(e) => setSelectedWasteType(e.target.value as WasteType | '')}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Waste Types</option>
              {wasteTypes.map((waste) => (
                <option key={waste.type} value={waste.type}>
                  {waste.icon} {waste.name}
                </option>
              ))}
            </select>

            {/* Area Filter */}
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Areas</option>
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedWasteType('');
                setSelectedArea('');
              }}
              className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found {filteredRecyclers.length} recycler{filteredRecyclers.length !== 1 ? 's' : ''} in your area
          </p>
        </div>

        {/* Recyclers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecyclers.map((recycler) => (
            <div key={recycler.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {recycler.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {renderStars(recycler.rating)}
                      <span className="ml-1 text-sm text-gray-600">
                        ({recycler.rating})
                      </span>
                    </div>
                    {recycler.isVerified && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    recycler.isVerified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {recycler.isVerified ? 'Verified' : 'Unverified'}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{recycler.address}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{recycler.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{recycler.availability.hours}</span>
                </div>
              </div>

              {/* Waste Types */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Accepts:</h4>
                <div className="flex flex-wrap gap-2">
                  {recycler.wasteTypes.map((wasteType) => {
                    const wasteInfo = wasteTypes.find(w => w.type === wasteType);
                    return (
                      <span
                        key={wasteType}
                        className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
                      >
                        {wasteInfo?.icon} {wasteInfo?.name}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Best Prices:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {recycler.wasteTypes.slice(0, 4).map((wasteType) => (
                    <div key={wasteType} className="flex justify-between">
                      <span className="text-gray-600 capitalize">{wasteType}:</span>
                      <span className="font-medium text-green-600">
                        ₹{recycler.pricePerKg[wasteType]}/kg
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  Contact Now
                </button>
                <button className="flex-1 border border-green-600 text-green-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredRecyclers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No recyclers found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or check back later for new recyclers in your area.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedWasteType('');
                setSelectedArea('');
              }}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Join as Recycler CTA */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-8 text-white text-center">
          <Recycle className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">
            Are you a Recycler or Kabadiwala?
          </h2>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Join our platform to connect with customers, grow your business, and contribute to a cleaner India.
            Register now and start receiving pickup requests in your area.
          </p>
          <Link 
            href="/recyclers/register"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Register as Recycler
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RecyclersPage;