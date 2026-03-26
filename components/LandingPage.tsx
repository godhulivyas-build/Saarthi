import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Language } from '../types';
import { Truck, TrendingUp, Search, MessageCircle, ArrowRight, Globe, ShieldCheck, Users, MapPin, CheckCircle2, Package, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const TransactionAnimation = () => {
  const { t, language } = useLanguage();
  const [step, setStep] = React.useState(0);

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
          {/* Mock India Map Background */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/india-map/800/800')] bg-cover grayscale" />
          
          <div className="absolute inset-0 p-8">
            {/* Farmer Node */}
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

            {/* Buyer Node */}
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

            {/* Connecting Line / Truck */}
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

            {/* Success State */}
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

  const features = [
    {
      title: "AI-Powered Intelligence",
      desc: "Real-time mandi rates and demand prediction in your local language.",
      icon: TrendingUp,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Smart Logistics",
      desc: "Farm-to-market pickup with route optimization and trusted partners.",
      icon: Truck,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Direct Marketplace",
      desc: "Sell directly to retailers and restaurants. No middlemen, more profit.",
      icon: Search,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Vernacular AI Assistant",
      desc: "Voice-first support in Hindi, Kannada, and more. Just ask Saarthi.",
      icon: MessageCircle,
      color: "bg-orange-100 text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 p-1.5 rounded-lg">
              <Truck className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">Saarthi</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
              <button 
                onClick={() => setLanguage(Language.ENGLISH)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${language === Language.ENGLISH ? 'bg-white shadow-sm text-green-600' : 'text-gray-500'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage(Language.HINDI)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${language === Language.HINDI ? 'bg-white shadow-sm text-green-600' : 'text-gray-500'}`}
              >
                हिन्दी
              </button>
              <button 
                onClick={() => setLanguage(Language.KANNADA)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${language === Language.KANNADA ? 'bg-white shadow-sm text-green-600' : 'text-gray-500'}`}
              >
                ಕನ್ನಡ
              </button>
            </div>
            <button 
              onClick={onGetStarted}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition shadow-lg shadow-green-200"
            >
              {t('joinSaarthi')}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-green-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
              <Globe size={16} />
              <span>{t('indiaAgriPlatform')}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[0.9] tracking-tighter">
              {t('heroTitle')}
            </h1>
            <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onGetStarted}
                className="bg-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition flex items-center justify-center gap-2 shadow-xl shadow-green-200 group"
              >
                {t('bookTransport')} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={onGetStarted}
                className="bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-green-50 transition flex items-center justify-center gap-2"
              >
                {t('viewMandi')}
              </button>
            </div>
            <div className="flex items-center gap-3 px-4">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img src={`https://picsum.photos/seed/indian-farmer-${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <p className="font-bold text-gray-900">{t('farmerCount')}</p>
                <p className="text-gray-500">{t('trustSaarthi')}</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-green-200/50 rounded-full blur-3xl" />
            <div className="relative bg-white p-4 rounded-[2.5rem] shadow-2xl border border-gray-100 transform md:rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1590684153482-d330a6898281?auto=format&fit=crop&q=80&w=800&h=1000" 
                alt="Indian Farming Scene" 
                className="rounded-[2rem] w-full h-[500px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 max-w-[220px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{language === Language.HINDI ? 'लाइव बुकिंग' : 'Live Booking'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                    <Truck size={20} />
                  </div>
                  <div>
                    <p className="text-lg font-black text-gray-900">₹2,450</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">{language === Language.HINDI ? 'गेहूँ (Wheat)' : 'Wheat'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transaction Animation Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <TransactionAnimation />
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-sm font-black text-green-600 uppercase tracking-[0.2em]">{t('saarthiAdvantage')}</h2>
            <p className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">{t('whyChooseSaarthi')}</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="group p-8 rounded-[2rem] bg-white border border-gray-100 hover:border-green-200 hover:shadow-xl transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${f.color} group-hover:scale-110 transition-transform`}>
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{language === Language.HINDI ? (i === 0 ? 'एआई-संचालित इंटेलिजेंस' : i === 1 ? 'स्मार्ट लॉजिस्टिक्स' : i === 2 ? 'सीधा बाजार' : 'वर्नाकुलर एआई सहायक') : f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{language === Language.HINDI ? (i === 0 ? 'आपकी स्थानीय भाषा में रीयल-टाइम मंडी भाव और मांग की भविष्यवाणी।' : i === 1 ? 'मार्ग अनुकूलन और विश्वसनीय भागीदारों के साथ खेत से बाजार तक पिकअप।' : i === 2 ? 'सीधे खुदरा विक्रेताओं और रेस्तरां को बेचें। कोई बिचौलिया नहीं, अधिक लाभ।' : 'हिंदी, कन्नड़ और अन्य भाषाओं में वॉयस-फर्स्ट सपोर्ट। बस सारथी से पूछें।') : f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="flex items-center gap-4">
            <div className="bg-gray-50 p-4 rounded-2xl shadow-sm">
              <ShieldCheck className="text-green-600 w-8 h-8" />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{t('securePayments')}</p>
              <p className="text-gray-500">{t('digitalTracking')}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-gray-50 p-4 rounded-2xl shadow-sm">
              <Users className="text-blue-600 w-8 h-8" />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{t('directConnect')}</p>
              <p className="text-gray-500">{t('farmersToRetailers')}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-gray-50 p-4 rounded-2xl shadow-sm">
              <TrendingUp className="text-purple-600 w-8 h-8" />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{t('higherProfit')}</p>
              <p className="text-gray-500">{t('saveCommissions')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-gray-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 rounded-full blur-3xl" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">{t('readyToTransform')}</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t('joinThousands')}</p>
            <button 
              onClick={onGetStarted}
              className="bg-green-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-green-700 transition shadow-2xl shadow-green-900/20"
            >
              {t('downloadApp')}
            </button>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 p-1.5 rounded-lg">
              <Truck className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">Saarthi</span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 Saarthi Agri-Logistics. {language === Language.HINDI ? 'भारतीय किसानों के लिए ❤️ के साथ बनाया गया।' : language === Language.KANNADA ? 'ಭಾರತೀಯ ರೈತರಿಗಾಗಿ ❤️ ನೊಂದಿಗೆ ಮಾಡಲ್ಪಟ್ಟಿದೆ.' : 'Made with ❤️ for Indian Farmers.'}</p>
          <div className="flex gap-6 text-gray-500 text-sm font-medium">
            <a href="#" className="hover:text-green-600">{t('privacy')}</a>
            <a href="#" className="hover:text-green-600">{t('terms')}</a>
            <a href="#" className="hover:text-green-600">{t('contact')}</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
