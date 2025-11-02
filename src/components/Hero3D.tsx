'use client';

import React from 'react';
import Link from 'next/link';
import Card3D from './Card3D';
import FloatingElement from './FloatingElement';
import { 
  Recycle, 
  Leaf, 
  Globe, 
  Users, 
  ArrowRight,
  Sparkles,
  TreePine,
  Heart
} from 'lucide-react';

export default function Hero3D() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <FloatingElement duration={4} delay={0} amplitude={15} className="absolute top-20 left-10">
          <div className="w-20 h-20 bg-green-200 rounded-full opacity-30 blur-sm"></div>
        </FloatingElement>
        <FloatingElement duration={5} delay={1} amplitude={20} className="absolute top-40 right-20">
          <div className="w-16 h-16 bg-blue-200 rounded-full opacity-40 blur-sm"></div>
        </FloatingElement>
        <FloatingElement duration={3} delay={2} amplitude={12} className="absolute bottom-40 left-20">
          <div className="w-24 h-24 bg-emerald-200 rounded-full opacity-25 blur-sm"></div>
        </FloatingElement>
        <FloatingElement duration={6} delay={0.5} amplitude={18} className="absolute bottom-20 right-10">
          <div className="w-18 h-18 bg-teal-200 rounded-full opacity-35 blur-sm"></div>
        </FloatingElement>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement duration={4} delay={0} amplitude={8} className="absolute top-32 left-1/4">
          <Recycle className="w-8 h-8 text-green-400 opacity-60" />
        </FloatingElement>
        <FloatingElement duration={5} delay={1.5} amplitude={12} className="absolute top-20 right-1/3">
          <Leaf className="w-6 h-6 text-emerald-500 opacity-50" />
        </FloatingElement>
        <FloatingElement duration={3.5} delay={2} amplitude={10} className="absolute bottom-1/3 left-1/6">
          <Globe className="w-7 h-7 text-blue-500 opacity-40" />
        </FloatingElement>
        <FloatingElement duration={4.5} delay={0.8} amplitude={14} className="absolute bottom-40 right-1/4">
          <TreePine className="w-9 h-9 text-green-600 opacity-45" />
        </FloatingElement>
        <FloatingElement duration={3.8} delay={1.2} amplitude={9} className="absolute top-1/2 right-1/6">
          <Heart className="w-5 h-5 text-red-400 opacity-55" />
        </FloatingElement>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <FloatingElement duration={2} delay={0} amplitude={5}>
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-800 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Swachh Bharat Mission Partner
              </div>
            </FloatingElement>

            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="block">Clean</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                Connect
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 mb-4 leading-relaxed">
              India's Smart Waste Management Platform
            </p>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              भारत का स्मार्ट कचरा प्रबंधन प्लेटफॉर्म
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Card3D intensity="medium" glowEffect>
                <Link
                  href="/pickup"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Schedule Pickup
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Card3D>

              <Card3D intensity="low">
                <Link
                  href="/quiz"
                  className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-xl border-2 border-green-200 hover:border-green-300 hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Take Quiz
                  <Sparkles className="ml-2 w-5 h-5" />
                </Link>
              </Card3D>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 text-center lg:text-left">
              <Card3D intensity="low" className="p-4">
                <div className="text-2xl lg:text-3xl font-bold text-green-600">1M+</div>
                <div className="text-sm text-gray-600">Users Connected</div>
              </Card3D>
              <Card3D intensity="low" className="p-4">
                <div className="text-2xl lg:text-3xl font-bold text-blue-600">50K+</div>
                <div className="text-sm text-gray-600">Pickups Completed</div>
              </Card3D>
              <Card3D intensity="low" className="p-4">
                <div className="text-2xl lg:text-3xl font-bold text-emerald-600">500+</div>
                <div className="text-sm text-gray-600">Recyclers Active</div>
              </Card3D>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <FloatingElement duration={4} delay={0} amplitude={15}>
              <Card3D intensity="high" glowEffect className="relative">
                <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl p-8 shadow-2xl border border-green-100">
                  {/* 3D Waste Management Illustration */}
                  <div className="relative h-96 flex items-center justify-center">
                    {/* Central Recycling Symbol */}
                    <FloatingElement duration={3} delay={0} amplitude={8}>
                      <div className="relative">
                        <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                          <Recycle className="w-16 h-16 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </FloatingElement>

                    {/* Orbiting Elements */}
                    <FloatingElement duration={5} delay={1} amplitude={10} className="absolute top-8 left-8">
                      <Card3D intensity="medium">
                        <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center shadow-md">
                          <div className="text-2xl">📱</div>
                        </div>
                      </Card3D>
                    </FloatingElement>

                    <FloatingElement duration={4} delay={2} amplitude={12} className="absolute top-8 right-8">
                      <Card3D intensity="medium">
                        <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center shadow-md">
                          <div className="text-2xl">📄</div>
                        </div>
                      </Card3D>
                    </FloatingElement>

                    <FloatingElement duration={6} delay={0.5} amplitude={14} className="absolute bottom-8 left-8">
                      <Card3D intensity="medium">
                        <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center shadow-md">
                          <div className="text-2xl">🍶</div>
                        </div>
                      </Card3D>
                    </FloatingElement>

                    <FloatingElement duration={3.5} delay={1.5} amplitude={9} className="absolute bottom-8 right-8">
                      <Card3D intensity="medium">
                        <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center shadow-md">
                          <div className="text-2xl">🔋</div>
                        </div>
                      </Card3D>
                    </FloatingElement>

                    {/* Connection Lines */}
                    <div className="absolute inset-0 pointer-events-none">
                      <svg className="w-full h-full opacity-20">
                        <defs>
                          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 50 50 Q 100 100 200 150 Q 300 200 350 250"
                          stroke="url(#lineGradient)"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="5,5"
                        />
                        <path
                          d="M 350 50 Q 300 100 200 150 Q 100 200 50 250"
                          stroke="url(#lineGradient)"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="5,5"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="text-center mt-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Smart Waste Segregation
                    </h3>
                    <p className="text-gray-600">
                      AI-powered waste classification and recycler matching
                    </p>
                  </div>
                </div>
              </Card3D>
            </FloatingElement>
          </div>
        </div>
      </div>
    </div>
  );
}