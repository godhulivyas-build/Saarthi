import React from 'react';
import { UserRole, Language } from '../types';
import { Tractor, Users, ShoppingBag, Truck, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface LoginScreenProps {
  onRoleSelect: (role: UserRole) => void;
  onBack: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onRoleSelect, onBack }) => {
  const { t, language } = useLanguage();
  
  const roles = [
    { id: UserRole.FARMER, icon: Tractor, color: "bg-green-100 text-green-700 border-green-200", label: t('farmer') },
    { id: UserRole.FPO, icon: Users, color: "bg-blue-100 text-blue-700 border-blue-200", label: t('fpo') },
    { id: UserRole.BUYER, icon: ShoppingBag, color: "bg-purple-100 text-purple-700 border-purple-200", label: t('buyer') },
    { id: UserRole.TRANSPORTER, icon: Truck, color: "bg-orange-100 text-orange-700 border-orange-200", label: t('transporter') },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-green-50 to-white relative">
      <button 
        onClick={onBack}
        className="absolute top-6 left-6 p-2 hover:bg-white/50 rounded-full transition-colors flex items-center gap-1 text-gray-600 font-bold"
      >
        <ChevronLeft size={24} />
        <span className="text-sm">{language === Language.HINDI ? 'पीछे' : 'Back'}</span>
      </button>

      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-600 mb-4 shadow-lg">
          <Truck className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Saarthi</h1>
        <p className="text-gray-600 font-medium">{language === Language.HINDI ? 'आपका कृषि-लॉजिस्टिक्स साथी' : 'Your Agri-Logistics Companion'}</p>
      </div>

      <div className="w-full max-w-md space-y-4">
        <p className="text-center text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6">
          {language === Language.HINDI ? 'अपनी भूमिका चुनें' : 'Select your Role'}
        </p>
        <div className="grid grid-cols-1 gap-4">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => onRoleSelect(role.id)}
              className={`flex items-center p-5 border-2 rounded-2xl hover:shadow-xl transition-all duration-300 ${role.color.replace('bg-', 'hover:bg-opacity-80 ')} border-transparent bg-white shadow-sm group active:scale-95`}
            >
              <div className={`p-4 rounded-2xl mr-4 ${role.color} group-hover:scale-110 transition-transform`}>
                <role.icon size={28} />
              </div>
              <span className="text-xl font-black text-gray-800">{role.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
