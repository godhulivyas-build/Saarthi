import React from 'react';
import { UserRole, Language } from '../types';
import { Tractor, Users, ShoppingBag, Truck, ChevronLeft, Settings } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface LoginScreenProps {
  onRoleSelect: (role: UserRole) => void;
  onBack: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onRoleSelect, onBack }) => {
  const { t, language } = useLanguage();
  
  const roles = [
    { id: UserRole.FARMER, icon: Tractor, color: "bg-green-600", label: t('farmer'), desc: language === Language.HINDI ? 'फसल बेचें और गाड़ी बुक करें' : 'Sell crops & book transport' },
    { id: UserRole.TRANSPORTER, icon: Truck, color: "bg-orange-600", label: t('transporter'), desc: language === Language.HINDI ? 'लोड खोजें और कमाई बढ़ाएं' : 'Find loads & earn more' },
    { id: UserRole.BUYER, icon: ShoppingBag, color: "bg-blue-600", label: t('buyer'), desc: language === Language.HINDI ? 'सीधे किसानों से माल खरीदें' : 'Buy directly from farmers' },
    { id: UserRole.FPO, icon: Settings, label: t('admin'), desc: language === Language.HINDI ? 'प्लेटफॉर्म और डेटा मैनेज करें' : 'Manage platform & data' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-green-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-200/40 rounded-full blur-3xl" />

      <button 
        onClick={onBack}
        className="absolute top-8 left-8 p-3 bg-white shadow-lg rounded-2xl hover:bg-gray-50 transition-all flex items-center gap-2 text-gray-900 font-black z-10"
      >
        <ChevronLeft size={24} />
        <span className="text-sm uppercase tracking-widest">{t('backToHome')}</span>
      </button>

      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-gray-900 mb-6 shadow-2xl">
          <Truck className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">Saarthi</h1>
        <p className="text-2xl font-black text-green-600 tracking-tight">{t('whatDoYouWantToDo')}</p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => onRoleSelect(role.id)}
            className="group flex items-center p-8 bg-white rounded-[2.5rem] border-2 border-transparent hover:border-green-500 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all duration-500 text-left active:scale-95"
          >
            <div className={`p-5 rounded-3xl mr-6 ${role.color} text-white group-hover:scale-110 transition-transform shadow-xl`}>
              <role.icon size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900 mb-1">{role.label}</h3>
              <p className="text-sm text-gray-500 font-bold leading-tight">{role.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-12 text-center text-gray-400 font-bold text-sm">
        <p>{language === Language.HINDI ? 'मदद चाहिए? हमें कॉल करें: +91 98765 43210' : 'Need help? Call us: +91 98765 43210'}</p>
      </div>
    </div>
  );
};
