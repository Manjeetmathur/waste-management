'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card3D from '@/components/Card3D';
import FloatingElement from '@/components/FloatingElement';
import { 
  Lightbulb, 
  Recycle, 
  Leaf, 
  Trash2, 
  Search,
  Filter,
  BookOpen,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Tip } from '@/types';

const TipsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Tip['category'] | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample tips data - In production, this would come from Firebase
  const tips: Tip[] = [
    {
      id: '1',
      title: 'Separate Wet and Dry Waste',
      titleHindi: 'गीले और सूखे कचरे को अलग करें',
      content: 'Always separate wet waste (food scraps, vegetable peels) from dry waste (paper, plastic, metal). Wet waste can be composted, while dry waste can be recycled.',
      contentHindi: 'हमेशा गीले कचरे (खाने के टुकड़े, सब्जी के छिलके) को सूखे कचरे (कागज, प्लास्टिक, धातु) से अलग करें। गीले कचरे को कंपोस्ट किया जा सकता है, जबकि सूखे कचरे को रीसाइकिल किया जा सकता है।',
      category: 'segregation',
      isActive: true
    },
    {
      id: '2',
      title: 'Clean Before Recycling',
      titleHindi: 'रीसाइकिलिंग से पहले साफ करें',
      content: 'Rinse containers before recycling. Food residue can contaminate recyclables and reduce their value. A quick rinse with water is sufficient.',
      contentHindi: 'रीसाइकिलिंग से पहले कंटेनरों को धोएं। खाद्य अवशेष रीसाइक्लेबल्स को दूषित कर सकते हैं और उनके मूल्य को कम कर सकते हैं। पानी से एक त्वरित कुल्ला पर्याप्त है।',
      category: 'recycling',
      isActive: true
    },
    {
      id: '3',
      title: 'Start a Compost Bin',
      titleHindi: 'एक कंपोस्ट बिन शुरू करें',
      content: 'Create a compost bin in your garden or balcony for organic waste. It reduces waste, creates nutrient-rich soil, and helps your plants grow.',
      contentHindi: 'जैविक कचरे के लिए अपने बगीचे या बालकनी में एक कंपोस्ट बिन बनाएं। यह कचरे को कम करता है, पोषक तत्वों से भरपूर मिट्टी बनाता है, और आपके पौधों को बढ़ने में मदद करता है।',
      category: 'composting',
      isActive: true
    },
    {
      id: '4',
      title: 'Use Reusable Bags',
      titleHindi: 'पुन: उपयोग योग्य बैग का उपयोग करें',
      content: 'Carry cloth or jute bags when shopping. This simple habit can prevent hundreds of plastic bags from entering landfills each year.',
      contentHindi: 'खरीदारी करते समय कपड़े या जूट के बैग ले जाएं। यह सरल आदत हर साल सैकड़ों प्लास्टिक बैग को लैंडफिल में जाने से रोक सकती है।',
      category: 'reduction',
      isActive: true
    },
    {
      id: '5',
      title: 'Donate Instead of Discarding',
      titleHindi: 'फेंकने के बजाय दान करें',
      content: 'Items in good condition like clothes, books, and electronics can be donated to charities or sold to recyclers rather than being thrown away.',
      contentHindi: 'अच्छी स्थिति में वस्तुएं जैसे कपड़े, किताबें और इलेक्ट्रॉनिक्स को फेंकने के बजाय दान किया जा सकता है या रीसाइक्लर्स को बेचा जा सकता है।',
      category: 'recycling',
      isActive: true
    },
    {
      id: '6',
      title: 'Avoid Single-Use Plastics',
      titleHindi: 'एकल-उपयोग प्लास्टिक से बचें',
      content: 'Say no to single-use plastics like straws, cutlery, and water bottles. Use steel or glass alternatives that can be reused multiple times.',
      contentHindi: 'स्ट्रॉ, कटलरी और पानी की बोतलों जैसे एकल-उपयोग प्लास्टिक से इनकार करें। स्टील या कांच के विकल्प का उपयोग करें जिन्हें कई बार पुन: उपयोग किया जा सकता है।',
      category: 'reduction',
      isActive: true
    },
    {
      id: '7',
      title: 'Proper E-Waste Disposal',
      titleHindi: 'उचित ई-वेस्ट निपटान',
      content: 'Electronic waste contains harmful chemicals. Always dispose of e-waste at designated collection centers or schedule a pickup with certified recyclers.',
      contentHindi: 'इलेक्ट्रॉनिक कचरे में हानिकारक रसायन होते हैं। हमेशा ई-वेस्ट को निर्दिष्ट संग्रह केंद्रों में फेंकें या प्रमाणित रीसाइक्लर्स के साथ पिकअप शेड्यूल करें।',
      category: 'recycling',
      isActive: true
    },
    {
      id: '8',
      title: 'Paper Waste Reduction',
      titleHindi: 'कागज कचरे में कमी',
      content: 'Go digital for bills, statements, and receipts. When printing, use both sides of paper and recycle used paper properly.',
      contentHindi: 'बिल, स्टेटमेंट और रसीदों के लिए डिजिटल जाएं। प्रिंट करते समय, कागज के दोनों तरफ का उपयोग करें और उपयोग किए गए कागज को ठीक से रीसाइकिल करें।',
      category: 'reduction',
      isActive: true
    },
    {
      id: '9',
      title: 'Segregation Color Codes',
      titleHindi: 'अलगाव रंग कोड',
      content: 'Remember: Green for wet/organic waste, Blue for dry/recyclable waste, Red for hazardous waste, and Yellow for biomedical waste.',
      contentHindi: 'याद रखें: गीले/जैविक कचरे के लिए हरा, सूखे/रीसाइक्लेबल कचरे के लिए नीला, खतरनाक कचरे के लिए लाल, और जैव चिकित्सा कचरे के लिए पीला।',
      category: 'segregation',
      isActive: true
    },
    {
      id: '10',
      title: 'Battery Disposal',
      titleHindi: 'बैटरी निपटान',
      content: 'Never throw batteries in regular trash. They contain toxic materials. Take them to designated e-waste centers or battery collection points.',
      contentHindi: 'कभी भी बैटरियों को सामान्य कचरे में न फेंकें। इनमें विषाक्त सामग्री होती है। इन्हें निर्दिष्ट ई-वेस्ट केंद्रों या बैटरी संग्रह बिंदुओं पर ले जाएं।',
      category: 'recycling',
      isActive: true
    }
  ];

  const categories = [
    { value: 'all' as const, label: 'All Tips', labelHindi: 'सभी सुझाव', icon: BookOpen },
    { value: 'segregation' as const, label: 'Segregation', labelHindi: 'अलगाव', icon: Trash2 },
    { value: 'recycling' as const, label: 'Recycling', labelHindi: 'रीसाइक्लिंग', icon: Recycle },
    { value: 'composting' as const, label: 'Composting', labelHindi: 'कंपोस्टिंग', icon: Leaf },
    { value: 'reduction' as const, label: 'Reduction', labelHindi: 'कमी', icon: Lightbulb }
  ];

  const filteredTips = tips.filter(tip => {
    const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tip.titleHindi && tip.titleHindi.includes(searchTerm)) ||
      (tip.contentHindi && tip.contentHindi.includes(searchTerm));
    
    return matchesCategory && matchesSearch && tip.isActive;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <Header />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <FloatingElement duration={2} delay={0} amplitude={5}>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Eco Tips & Guidelines
            </h1>
          </FloatingElement>
          <FloatingElement duration={2.5} delay={0.3} amplitude={3}>
            <p className="text-xl text-gray-600 mb-2">
              Learn how to manage waste effectively and contribute to a cleaner environment
            </p>
            <p className="text-lg text-gray-500">
              प्रभावी ढंग से कचरे का प्रबंधन करना सीखें और एक स्वच्छ वातावरण में योगदान दें
            </p>
          </FloatingElement>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <Card3D intensity="low">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tips..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400 z-10" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as Tip['category'] | 'all')}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </Card3D>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-200'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                <span>{category.label}</span>
                <span className="ml-2 text-xs opacity-75">({category.labelHindi})</span>
              </button>
            );
          })}
        </div>

        {/* Tips Grid */}
        {filteredTips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTips.map((tip, index) => (
              <FloatingElement 
                key={tip.id} 
                duration={3 + (index * 0.1)} 
                delay={index * 0.1} 
                amplitude={5}
              >
                <Card3D intensity="medium" glowEffect className="h-full">
                  <div className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col border border-green-100 hover:border-green-300 transition-colors">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        tip.category === 'segregation' ? 'bg-blue-100 text-blue-800' :
                        tip.category === 'recycling' ? 'bg-green-100 text-green-800' :
                        tip.category === 'composting' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {categories.find(c => c.value === tip.category)?.label || tip.category}
                      </span>
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {tip.title}
                    </h3>
                    <h4 className="text-sm font-medium text-gray-600 mb-4">
                      {tip.titleHindi}
                    </h4>

                    {/* Content */}
                    <p className="text-gray-700 mb-4 flex-grow">
                      {tip.content}
                    </p>
                    
                    {/* Hindi Content */}
                    {tip.contentHindi && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          {tip.contentHindi}
                        </p>
                      </div>
                    )}

                    {/* Icon */}
                    <div className="mt-4 flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span className="text-xs font-medium">Verified Tip</span>
                    </div>
                  </div>
                </Card3D>
              </FloatingElement>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No tips found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <FloatingElement duration={4} delay={0.5} amplitude={3}>
          <Card3D intensity="low" glowEffect>
            <div className="mt-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white text-center">
              <Lightbulb className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">
                Share Your Tips!
              </h2>
              <p className="text-green-100 mb-6 max-w-2xl mx-auto">
                Have a waste management tip that works for you? Share it with the community and help others learn effective waste management practices.
              </p>
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
                Submit a Tip
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </Card3D>
        </FloatingElement>
      </div>

      <Footer />
    </div>
  );
};

export default TipsPage;

