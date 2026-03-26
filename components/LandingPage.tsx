import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { Language } from '../types';
import { Truck, TrendingUp, Search, MessageCircle, ArrowRight, Globe, ShieldCheck, Users, MapPin, CheckCircle2, Package, User, Tractor, ShoppingBag, Settings, Phone, Mail, HelpCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AIAssistant } from './AIAssistant';

interface LandingPageProps {
  onGetStarted: () => void;
}

const TransactionAnimation = () => {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { text: t('step1Text'), icon: Package, color: 'text-green-600' },
    { text: t('step2Text'), icon: User, color: 'text-blue-600' },
    { text: t('step3Text'), icon: Truck, color: 'text-orange-600' },
    { text: t('step4Text'), icon: CheckCircle2, color: 'text-green-600' }
  ];

  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-gray-100 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
            <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
            <span>{language === Language.HINDI ? 'लाइव प्रक्रिया' : 'Live Process'}</span>
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">
            {language === Language.HINDI ? 'खेत से मंडी तक का सफर' : 'Farm to Mandi Journey'}
          </h2>
          
          <div className="space-y-6">
            {steps.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0.3, x: -20 }}
                animate={{ 
                  opacity: step === i ? 1 : 0.3,
                  x: step === i ? 0 : -20,
                  scale: step === i ? 1.05 : 1
                }}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${step === i ? 'bg-gray-50 shadow-sm border border-gray-100' : ''}`}
              >
                <div className={`p-3 rounded-xl bg-white shadow-sm ${step === i ? s.color : 'text-gray-400'}`}>
                  <s.icon size={24} />
                </div>
                <p className={`font-bold text-lg ${step === i ? 'text-gray-900' : 'text-gray-400'}`}>
                  {s.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative h-[400px] bg-green-50 rounded-[2rem] border border-green-100 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/india-map/800/800')] bg-cover grayscale" />
          
          <div className="absolute inset-0 p-8">
            <motion.div 
              className="absolute top-1/4 left-1/4"
              animate={{ scale: step >= 0 ? 1 : 0.8, opacity: step >= 0 ? 1 : 0.3 }}
            >
              <div className="bg-white p-3 rounded-2xl shadow-lg border border-green-100 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <User className="text-green-600" />
                </div>
                <p className="text-[10px] font-black uppercase text-gray-400">{t('farmer')}</p>
              </div>
            </motion.div>

            <motion.div 
              className="absolute bottom-1/4 right-1/4"
              animate={{ scale: step >= 1 ? 1 : 0.8, opacity: step >= 1 ? 1 : 0.3 }}
            >
              <div className="bg-white p-3 rounded-2xl shadow-lg border border-blue-100 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Users className="text-blue-600" />
                </div>
                <p className="text-[10px] font-black uppercase text-gray-400">{t('buyer')}</p>
              </div>
            </motion.div>

            <AnimatePresence>
              {step >= 2 && (
                <motion.div 
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <svg className="w-full h-full">
                    <motion.path
                      d="M 120 120 Q 200 200 280 280"
                      fill="none"
                      stroke="#16a34a"
                      strokeWidth="4"
                      strokeDasharray="8 8"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2 }}
                    />
                  </svg>
                  
                  <motion.div 
                    initial={{ left: "25%", top: "25%" }}
                    animate={{ 
                      left: step === 3 ? "70%" : "25%",
                      top: step === 3 ? "70%" : "25%"
                    }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                    className="absolute bg-white p-2 rounded-lg shadow-xl border border-orange-100"
                  >
                    <Truck className="text-orange-600" size={20} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {step === 3 && (
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-green-600/10 backdrop-blur-[2px]"
              >
                <div className="bg-white p-6 rounded-3xl shadow-2xl border border-green-100 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-xl font-black text-gray-900">{t('saudaPuraHua')}</h3>
                  <p className="text-sm text-gray-500">{t('step4Text')}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const { t, language, setLanguage } = useLanguage();
  const [isAiOpen, setIsAiOpen] = useState(false);

  const features = [
    {
      title: t('easyBooking'),
      desc: language === Language.HINDI ? 'गाड़ी बुक करना अब आपके हाथ में है।' : 'Book transport easily from your farm.',
      icon: Truck,
      color: "bg-green-100 text-green-600"
    },
    {
      title: t('directFarmerBuyer'),
      desc: language === Language.HINDI ? 'बिचौलियों को हटाएँ, सीधा व्यापारी से जुड़ें।' : 'Connect directly with buyers and mandis.',
      icon: Users,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: t('priceTransparency'),
      desc: language === Language.HINDI ? 'मंडी के सही भाव जानें और ज्यादा कमाएं।' : 'Get real-time mandi rates and fair prices.',
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: t('liveTracking'),
      desc: language === Language.HINDI ? 'अपनी गाड़ी की लोकेशन लाइव देखें।' : 'Track your shipment in real-time.',
      icon: MapPin,
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const personaCards = [
    { id: 'farmer', icon: Tractor, label: t('farmer'), color: 'bg-green-600' },
    { id: 'transporter', icon: Truck, label: t('transporter'), color: 'bg-orange-600' },
    { id: 'buyer', icon: ShoppingBag, label: t('buyer'), color: 'bg-blue-600' },
    { id: 'admin', icon: Settings, label: t('admin'), color: 'bg-gray-600' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2 rounded-xl shadow-lg shadow-green-200">
              <Truck className="text-white w-6 h-6" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-gray-900">Saarthi</span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#home" className="text-sm font-bold text-gray-600 hover:text-green-600 transition-colors">{t('home')}</a>
            <a href="#features" className="text-sm font-bold text-gray-600 hover:text-green-600 transition-colors">{t('features')}</a>
            <a href="#how-it-works" className="text-sm font-bold text-gray-600 hover:text-green-600 transition-colors">{t('howItWorks')}</a>
            <a href="#contact" className="text-sm font-bold text-gray-600 hover:text-green-600 transition-colors">{t('contact')}</a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200">
              <button 
                onClick={() => setLanguage(Language.ENGLISH)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${language === Language.ENGLISH ? 'bg-white shadow-sm text-green-600' : 'text-gray-500'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage(Language.HINDI)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${language === Language.HINDI ? 'bg-white shadow-sm text-green-600' : 'text-gray-500'}`}
              >
                हिन्दी
              </button>
            </div>
            <button 
              onClick={onGetStarted}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-black hover:bg-black transition shadow-xl"
            >
              {t('login')}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-40 pb-24 px-4 bg-gradient-to-b from-green-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 relative z-10">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2.5 rounded-full text-sm font-black tracking-wide">
              <Globe size={18} />
              <span>{t('connectAll')}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.85] tracking-tighter">
              {language === Language.HINDI ? 'किसान से बाजार तक — अब सब आसान' : 'From Farm to Market — Now Simple'}
            </h1>
            <p className="text-xl text-gray-600 max-w-lg leading-relaxed font-medium">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button 
                onClick={onGetStarted}
                className="bg-green-600 text-white px-10 py-5 rounded-[2rem] font-black text-xl hover:bg-green-700 transition flex items-center justify-center gap-3 shadow-2xl shadow-green-200 group active:scale-95"
              >
                {t('startNow')} <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-sm">
                    <img src={`https://picsum.photos/seed/indian-farmer-${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <p className="font-black text-gray-900 text-lg leading-none">{t('farmerCount')}</p>
                <p className="text-gray-500 font-bold">{t('trustSaarthi')}</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-green-200/40 rounded-full blur-[100px]" />
            <div className="relative bg-white p-5 rounded-[3.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] border border-gray-100 transform lg:rotate-2 hover:rotate-0 transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1590684153482-d330a6898281?auto=format&fit=crop&q=80&w=1200&h=1500" 
                alt="Indian Farming Scene" 
                className="rounded-[2.5rem] w-full h-[600px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 max-w-[280px] animate-bounce-slow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{language === Language.HINDI ? 'लाइव बुकिंग' : 'Live Booking'}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 p-3 rounded-2xl text-orange-600">
                    <Truck size={28} />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-gray-900">₹2,450</p>
                    <p className="text-xs text-gray-500 font-black uppercase tracking-wider">{language === Language.HINDI ? 'गेहूँ (Wheat)' : 'Wheat'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Persona Selection Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-sm font-black text-green-600 uppercase tracking-[0.3em]">{t('joinSaarthi')}</h2>
            <p className="text-5xl font-black text-gray-900 tracking-tight">{t('whatDoYouWantToDo')}</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {personaCards.map((card) => (
              <button 
                key={card.id}
                onClick={onGetStarted}
                className="group p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:bg-white hover:border-green-200 hover:shadow-2xl transition-all duration-500 text-center space-y-6"
              >
                <div className={`w-20 h-20 rounded-3xl ${card.color} text-white flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-xl`}>
                  <card.icon size={36} />
                </div>
                <h3 className="text-xl font-black text-gray-900">{card.label}</h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-sm font-black text-green-600 uppercase tracking-[0.3em]">{t('saarthiAdvantage')}</h2>
            <p className="text-5xl font-black text-gray-900 tracking-tight">{t('saarthiWhatDoesItDo')}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="group p-10 rounded-[3rem] bg-white border border-gray-100 hover:border-green-200 hover:shadow-2xl transition-all duration-500">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${f.color} group-hover:scale-110 transition-transform shadow-sm`}>
                  <f.icon size={32} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Animation Section */}
      <section id="how-it-works" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-sm font-black text-green-600 uppercase tracking-[0.3em]">{t('howItWorks')}</h2>
            <p className="text-5xl font-black text-gray-900 tracking-tight">{language === Language.HINDI ? 'खेत से बाजार तक का सफर' : 'Farm to Market Journey'}</p>
          </div>
          <TransactionAnimation />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-sm font-black text-green-600 uppercase tracking-[0.3em]">{t('contact')}</h2>
            <p className="text-5xl font-black text-gray-900 tracking-tight">{t('madadChahiye')}</p>
            <p className="text-xl text-gray-600 font-medium leading-relaxed">{t('humeCallKarein')}</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6 p-6 bg-white rounded-3xl shadow-sm border border-green-100">
                <div className="bg-green-100 p-4 rounded-2xl text-green-600">
                  <Phone size={28} />
                </div>
                <div>
                  <p className="text-sm font-black text-gray-400 uppercase tracking-widest">{t('phone')}</p>
                  <p className="text-2xl font-black text-gray-900">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-6 p-6 bg-white rounded-3xl shadow-sm border border-green-100">
                <div className="bg-blue-100 p-4 rounded-2xl text-blue-600">
                  <Mail size={28} />
                </div>
                <div>
                  <p className="text-sm font-black text-gray-400 uppercase tracking-widest">{t('email')}</p>
                  <p className="text-2xl font-black text-gray-900">help@saarthi.in</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-10 rounded-[3.5rem] shadow-2xl border border-gray-100">
            <img 
              src="https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=800&h=600" 
              alt="Customer Support" 
              className="rounded-[2.5rem] w-full h-[400px] object-cover mb-8"
              referrerPolicy="no-referrer"
            />
            <div className="text-center">
              <p className="text-2xl font-black text-gray-900 mb-2">{t('helpNeeded')}</p>
              <p className="text-gray-500 font-bold">{language === Language.HINDI ? 'हम आपकी सेवा के लिए 24/7 उपलब्ध हैं।' : 'We are available 24/7 to help you.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-600 p-2 rounded-xl">
                  <Truck className="text-white w-6 h-6" />
                </div>
                <span className="font-black text-2xl tracking-tighter">Saarthi</span>
              </div>
              <p className="text-gray-400 font-medium leading-relaxed">
                {language === Language.HINDI ? 'भारत का नंबर 1 खेती और गाड़ी ऐप। किसान से बाजार तक का सफर अब आसान।' : 'India\'s #1 Agri-Logistics Platform. Connecting farmers, transporters, and buyers.'}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-black mb-6 uppercase tracking-widest text-green-500">{t('features')}</h4>
              <ul className="space-y-4 text-gray-400 font-bold">
                <li><a href="#" className="hover:text-white transition-colors">{t('bookTransport')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('mandiRates')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('liveTracking')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('aiAssistant')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-black mb-6 uppercase tracking-widest text-green-500">{t('contact')}</h4>
              <ul className="space-y-4 text-gray-400 font-bold">
                <li>+91 98765 43210</li>
                <li>help@saarthi.in</li>
                <li>{language === Language.HINDI ? 'इंदौर, मध्य प्रदेश' : 'Indore, Madhya Pradesh'}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-black mb-6 uppercase tracking-widest text-green-500">{t('joinSaarthi')}</h4>
              <button 
                onClick={onGetStarted}
                className="w-full bg-green-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-green-700 transition shadow-xl shadow-green-900/20"
              >
                {t('startNow')}
              </button>
            </div>
          </div>
          
          <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-gray-500 text-sm font-bold">© 2026 Saarthi Agri-Logistics. {language === Language.HINDI ? 'भारतीय किसानों के लिए ❤️ के साथ बनाया गया।' : 'Made with ❤️ for Indian Farmers.'}</p>
            <div className="flex gap-8 text-gray-500 text-sm font-black uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">{t('privacy')}</a>
              <a href="#" className="hover:text-white transition-colors">{t('terms')}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating AI Assistant Button */}
      <div className="fixed bottom-8 right-8 z-[60]">
        <AnimatePresence>
          {isAiOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden"
            >
              <div className="bg-gray-900 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-green-600 p-2 rounded-xl">
                    <MessageCircle className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-black">{t('aiAssistant')}</p>
                    <p className="text-green-500 text-[10px] font-black uppercase tracking-widest">Online</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAiOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="h-[calc(100%-80px)]">
                <AIAssistant />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setIsAiOpen(!isAiOpen)}
          className="bg-green-600 text-white p-5 rounded-[2rem] shadow-2xl shadow-green-200 hover:bg-green-700 transition-all duration-300 hover:scale-110 active:scale-95 group relative"
        >
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full animate-bounce">1</div>
          <MessageCircle size={32} className={isAiOpen ? 'hidden' : 'block'} />
          <X size={32} className={isAiOpen ? 'block' : 'hidden'} />
        </button>
      </div>
    </div>
  );
};
