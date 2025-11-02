'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero3D from '@/components/Hero3D';
import Features3D from '@/components/Features3D';
import Card3D from '@/components/Card3D';
import FloatingElement from '@/components/FloatingElement';
import { 
  Recycle, 
  Users, 
  Award, 
  Truck, 
  MapPin, 
  Smartphone,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Globe,
  Heart,
  Leaf,
  Target,
  IndianRupee,
  Calendar,
  Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();

  const stats = [
    {
      number: '13%',
      label: 'Current Recycling Rate',
      labelHindi: 'वर्तमान रीसाइक्लिंग दर',
      target: '50%',
      icon: Recycle,
      color: 'from-green-500 to-emerald-500'
    },
    {
      number: '4M+',
      label: 'Waste Pickers in India',
      labelHindi: 'भारत में कचरा बीनने वाले',
      target: 'Support All',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      number: '62M',
      label: 'Tons Waste Generated',
      labelHindi: 'टन कचरा उत्पन्न',
      target: 'Reduce & Recycle',
      icon: Target,
      color: 'from-red-500 to-pink-500'
    }
  ];

  const benefits = [
    {
      title: 'For Households',
      titleHindi: 'घरों के लिए',
      items: [
        'Easy waste pickup scheduling',
        'Earn money from recyclables',
        'Learn proper segregation',
        'Track environmental impact'
      ],
      itemsHindi: [
        'आसान कचरा पिकअप शेड्यूलिंग',
        'रीसाइक्लेबल्स से पैसे कमाएं',
        'उचित अलगाव सीखें',
        'पर्यावरणीय प्रभाव ट्रैक करें'
      ],
      icon: '🏠',
      color: 'from-green-400 to-emerald-500'
    },
    {
      title: 'For Recyclers',
      titleHindi: 'रीसाइक्लर्स के लिए',
      items: [
        'Connect with more customers',
        'Optimize pickup routes',
        'Digital payment system',
        'Build customer trust'
      ],
      itemsHindi: [
        'अधिक ग्राहकों से जुड़ें',
        'पिकअप रूट्स को अनुकूलित करें',
        'डिजिटल पेमेंट सिस्टम',
        'ग्राहक विश्वास बनाएं'
      ],
      icon: '♻️',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      title: 'For Communities',
      titleHindi: 'समुदायों के लिए',
      items: [
        'Organize cleanup drives',
        'Track community progress',
        'Educational resources',
        'Collective impact measurement'
      ],
      itemsHindi: [
        'सफाई अभियान आयोजित करें',
        'समुदायिक प्रगति ट्रैक करें',
        'शैक्षिक संसाधन',
        'सामूहिक प्रभाव माप'
      ],
      icon: '👥',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section with 3D Elements */}
      <Hero3D />

      {/* Features Section with 3D Cards */}
      <Features3D />

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <FloatingElement duration={6} delay={0} amplitude={20} className="absolute top-10 left-10">
            <div className="w-24 h-24 bg-white bg-opacity-10 rounded-full blur-sm"></div>
          </FloatingElement>
          <FloatingElement duration={8} delay={2} amplitude={15} className="absolute bottom-10 right-10">
            <div className="w-32 h-32 bg-white bg-opacity-10 rounded-full blur-sm"></div>
          </FloatingElement>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <FloatingElement duration={2} delay={0} amplitude={5}>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                India's Waste Challenge
              </h2>
            </FloatingElement>
            <FloatingElement duration={2.5} delay={0.5} amplitude={3}>
              <p className="text-xl text-green-100 max-w-3xl mx-auto">
                भारत की कचरा चुनौती - Together we can make a difference
              </p>
            </FloatingElement>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <FloatingElement 
                key={index} 
                duration={3 + (index * 0.3)} 
                delay={index * 0.2} 
                amplitude={10}
              >
                <Card3D intensity="high" glowEffect>
                  <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 shadow-lg">
                    <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-lg font-semibold text-gray-700 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      {stat.labelHindi}
                    </div>
                    <div className="text-sm font-medium text-green-600">
                      Target: {stat.target}
                    </div>
                  </div>
                </Card3D>
              </FloatingElement>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FloatingElement duration={2} delay={0} amplitude={5}>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Benefits for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                  Everyone
                </span>
              </h2>
            </FloatingElement>
            <FloatingElement duration={2.5} delay={0.5} amplitude={3}>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                सभी के लिए फायदे - Creating value for all stakeholders
              </p>
            </FloatingElement>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <FloatingElement 
                key={index} 
                duration={4 + (index * 0.2)} 
                delay={index * 0.3} 
                amplitude={8}
              >
                <Card3D intensity="medium" glowEffect className="h-full">
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full">
                    <div className="text-center mb-8">
                      <div className="text-6xl mb-4">{benefit.icon}</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {benefit.title}
                      </h3>
                      <h4 className="text-lg font-semibold text-gray-600">
                        {benefit.titleHindi}
                      </h4>
                    </div>

                    <div className="space-y-4">
                      {benefit.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-gray-800 font-medium">{item}</div>
                            <div className="text-sm text-gray-600">{benefit.itemsHindi[itemIndex]}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <div className={`h-2 bg-gradient-to-r ${benefit.color} rounded-full`}></div>
                    </div>
                  </div>
                </Card3D>
              </FloatingElement>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <FloatingElement duration={5} delay={0} amplitude={25} className="absolute top-20 left-20">
            <Leaf className="w-16 h-16 text-white opacity-10" />
          </FloatingElement>
          <FloatingElement duration={7} delay={1} amplitude={20} className="absolute bottom-20 right-20">
            <Globe className="w-20 h-20 text-white opacity-10" />
          </FloatingElement>
          <FloatingElement duration={4} delay={2} amplitude={15} className="absolute top-1/2 left-1/4">
            <Heart className="w-12 h-12 text-white opacity-10" />
          </FloatingElement>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <FloatingElement duration={2} delay={0} amplitude={8}>
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
          </FloatingElement>
          <FloatingElement duration={2.5} delay={0.5} amplitude={5}>
            <p className="text-xl lg:text-2xl text-green-100 mb-4">
              Join thousands of Indians creating a cleaner future
            </p>
            <p className="text-lg text-green-200 mb-12">
              हजारों भारतीयों के साथ एक स्वच्छ भविष्य बनाने में शामिल हों
            </p>
          </FloatingElement>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <FloatingElement duration={3} delay={0.8} amplitude={6}>
              <Card3D intensity="high" glowEffect>
                <Link
                  href={user ? "/pickup" : "/auth/signup"}
                  className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-bold text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  {user ? "Schedule Pickup" : "Get Started"}
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Link>
              </Card3D>
            </FloatingElement>

            <FloatingElement duration={3.5} delay={1} amplitude={4}>
              <Card3D intensity="medium">
                <Link
                  href="/quiz"
                  className="inline-flex items-center px-8 py-4 bg-transparent text-white font-bold text-lg rounded-xl border-2 border-white hover:bg-white hover:text-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Take Quiz
                  <Star className="ml-2 w-6 h-6" />
                </Link>
              </Card3D>
            </FloatingElement>
          </div>

          {/* Trust Indicators */}
          <FloatingElement duration={4} delay={1.5} amplitude={3}>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div className="flex items-center justify-center space-x-2 text-green-100">
                <Shield className="w-5 h-5" />
                <span>Secure & Safe</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-green-100">
                <Users className="w-5 h-5" />
                <span>Community Driven</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-green-100">
                <Leaf className="w-5 h-5" />
                <span>Eco Friendly</span>
              </div>
            </div>
          </FloatingElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}