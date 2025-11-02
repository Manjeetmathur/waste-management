'use client';

import React from 'react';
import Card3D from './Card3D';
import FloatingElement from './FloatingElement';
import { 
  Truck, 
  Users, 
  Award, 
  Smartphone,
  MapPin,
  Zap,
  Shield,
  Globe
} from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Smart Pickup',
    titleHindi: 'स्मार्ट पिकअप',
    description: 'Schedule waste collection with local recyclers at your convenience',
    descriptionHindi: 'अपनी सुविधा के अनुसार स्थानीय रीसाइक्लर्स के साथ कचरा संग्रह का समय निर्धारित करें',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    emoji: '🚛'
  },
  {
    icon: Users,
    title: 'Community Connect',
    titleHindi: 'समुदायिक जुड़ाव',
    description: 'Join local communities and participate in cleanliness drives',
    descriptionHindi: 'स्थानीय समुदायों से जुड़ें और सफाई अभियानों में भाग लें',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    emoji: '👥'
  },
  {
    icon: Award,
    title: 'Earn Rewards',
    titleHindi: 'पुरस्कार जीतें',
    description: 'Get points and rewards for responsible waste management',
    descriptionHindi: 'जिम्मेदार कचरा प्रबंधन के लिए अंक और पुरस्कार प्राप्त करें',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-50',
    emoji: '🏆'
  },
  {
    icon: Smartphone,
    title: 'Easy to Use',
    titleHindi: 'उपयोग में आसान',
    description: 'Simple mobile-first design for all age groups',
    descriptionHindi: 'सभी आयु समूहों के लिए सरल मोबाइल-फर्स्ट डिज़ाइन',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    emoji: '📱'
  },
  {
    icon: MapPin,
    title: 'Local Network',
    titleHindi: 'स्थानीय नेटवर्क',
    description: 'Connect with nearby kabadiwalas and recycling centers',
    descriptionHindi: 'आस-पास के कबाड़ीवालों और रीसाइक्लिंग केंद्रों से जुड़ें',
    color: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-50',
    emoji: '📍'
  },
  {
    icon: Zap,
    title: 'Real-time Tracking',
    titleHindi: 'रियल-टाइम ट्रैकिंग',
    description: 'Track your pickup status and recycler location live',
    descriptionHindi: 'अपने पिकअप की स्थिति और रीसाइक्लर का स्थान लाइव ट्रैक करें',
    color: 'from-indigo-500 to-blue-500',
    bgColor: 'bg-indigo-50',
    emoji: '⚡'
  }
];

export default function Features3D() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement duration={8} delay={0} amplitude={20} className="absolute top-20 left-10">
          <div className="w-32 h-32 bg-gradient-to-br from-green-200 to-blue-200 rounded-full opacity-10 blur-xl"></div>
        </FloatingElement>
        <FloatingElement duration={6} delay={2} amplitude={15} className="absolute bottom-20 right-10">
          <div className="w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-10 blur-xl"></div>
        </FloatingElement>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <FloatingElement duration={2} delay={0} amplitude={5}>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                CleanConnect?
              </span>
            </h2>
          </FloatingElement>
          <FloatingElement duration={2.5} delay={0.5} amplitude={3}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of waste management with our innovative platform
            </p>
          </FloatingElement>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FloatingElement 
              key={index} 
              duration={3 + (index * 0.2)} 
              delay={index * 0.1} 
              amplitude={8}
            >
              <Card3D intensity="medium" glowEffect className="h-full">
                <div className={`${feature.bgColor} rounded-2xl p-8 h-full border border-opacity-20 border-gray-200 hover:border-opacity-40 transition-all duration-300`}>
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg mb-4`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 text-2xl">
                      {feature.emoji}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <h4 className="text-lg font-semibold text-gray-600 mb-4">
                    {feature.titleHindi}
                  </h4>
                  <p className="text-gray-600 mb-3 leading-relaxed">
                    {feature.description}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.descriptionHindi}
                  </p>

                  {/* Decorative Element */}
                  <div className="mt-6 flex justify-end">
                    <div className={`w-8 h-8 bg-gradient-to-br ${feature.color} rounded-full opacity-20`}></div>
                  </div>
                </div>
              </Card3D>
            </FloatingElement>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <FloatingElement duration={3} delay={1} amplitude={6}>
            <Card3D intensity="high" glowEffect>
              <div className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white shadow-2xl">
                <Globe className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Join the Green Revolution</h3>
                <p className="text-green-100 mb-4">हरित क्रांति में शामिल हों</p>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-1" />
                    Secure
                  </div>
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 mr-1" />
                    Fast
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Community
                  </div>
                </div>
              </div>
            </Card3D>
          </FloatingElement>
        </div>
      </div>
    </section>
  );
}