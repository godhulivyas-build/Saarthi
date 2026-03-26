import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from './types';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

const translations: Translations = {
  // Landing Page
  heroTitle: {
    [Language.ENGLISH]: "Saarthi: Your AI Partner for Farm-to-Market",
    [Language.HINDI]: "किसान से मंडी तक — अब सब आसान",
    [Language.KANNADA]: "ಸಾರಥಿ: ಹೊಲದಿಂದ ಮಾರುಕಟ್ಟೆಯವರೆಗೆ ನಿಮ್ಮ ಎಐ ಪಾಲುದಾರ"
  },
  heroSubtitle: {
    [Language.ENGLISH]: "India's first AI-powered execution platform for logistics, intelligence, and direct selling.",
    [Language.HINDI]: "Saarthi आपके फसल को सही दाम और सही जगह तक पहुँचाने में मदद करता है",
    [Language.KANNADA]: "ಲಾಜಿಸ್ಟಿಕ್ಸ್, ಇಂಟೆಲಿಜೆನ್ಸ್ ಮತ್ತು ನೇರ ಮಾರಾಟಕ್ಕಾಗಿ ಭಾರತದ ಮೊದಲ ಎಐ-ಚಾಲಿತ ಎಕ್ಸಿಕ್ಯೂಶನ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್."
  },
  joinSaarthi: {
    [Language.ENGLISH]: "Join Saarthi",
    [Language.HINDI]: "सारथी से जुड़ें",
    [Language.KANNADA]: "ಸಾರಥಿ ಸೇರಿ"
  },
  // Dashboard
  namaste: {
    [Language.ENGLISH]: "Namaste!",
    [Language.HINDI]: "नमस्ते!",
    [Language.KANNADA]: "ನಮಸ್ತೆ!"
  },
  bookTransport: {
    [Language.ENGLISH]: "Book Transport",
    [Language.HINDI]: "गाड़ी बुक करें",
    [Language.KANNADA]: "ಸಾರಿಗೆ ಬುಕ್ ಮಾಡಿ"
  },
  mandiRates: {
    [Language.ENGLISH]: "Mandi Rates",
    [Language.HINDI]: "मंडी भाव",
    [Language.KANNADA]: "ಮಾರುಕಟ್ಟೆ ದರಗಳು"
  },
  trackShipment: {
    [Language.ENGLISH]: "Track Shipment",
    [Language.HINDI]: "गाड़ी कहाँ है देखें",
    [Language.KANNADA]: "ಸಾಗಣೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ"
  },
  aiAssistant: {
    [Language.ENGLISH]: "AI Assistant",
    [Language.HINDI]: "मददगार साथी",
    [Language.KANNADA]: "ಎಐ ಸಹಾಯಕ"
  },
  wallet: {
    [Language.ENGLISH]: "Wallet",
    [Language.HINDI]: "बटुआ",
    [Language.KANNADA]: "ವ್ಯಾಲೆಟ್"
  },
  // New Translations
  getStarted: {
    [Language.ENGLISH]: "Get Started",
    [Language.HINDI]: "शुरू करें",
    [Language.KANNADA]: "ಪ್ರಾರಂಭಿಸಿ"
  },
  getStartedNow: {
    [Language.ENGLISH]: "Get Started Now",
    [Language.HINDI]: "अभी शुरू करें",
    [Language.KANNADA]: "ಈಗಲೇ ಪ್ರಾರಂಭಿಸಿ"
  },
  indiaAgriPlatform: {
    [Language.ENGLISH]: "India's #1 Agri-Logistics Platform",
    [Language.HINDI]: "भारत का नंबर 1 खेती और गाड़ी ऐप",
    [Language.KANNADA]: "ಭಾರತದ #1 ಕೃಷಿ-ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್"
  },
  farmerCount: {
    [Language.ENGLISH]: "50,000+ Farmers",
    [Language.HINDI]: "50,000+ किसान",
    [Language.KANNADA]: "50,000+ ರೈತರು"
  },
  trustSaarthi: {
    [Language.ENGLISH]: "Trust Saarthi daily",
    [Language.HINDI]: "रोजाना सारथी का उपयोग करते हैं",
    [Language.KANNADA]: "ಪ್ರತಿದಿನ ಸಾರಥಿಯನ್ನು ನಂಬುತ್ತಾರೆ"
  },
  saarthiAdvantage: {
    [Language.ENGLISH]: "The Saarthi Advantage",
    [Language.HINDI]: "सारथी के फायदे",
    [Language.KANNADA]: "ಸಾರಥಿ ಅನುಕೂಲ"
  },
  whyChooseSaarthi: {
    [Language.ENGLISH]: "Why choose Saarthi over traditional middlemen?",
    [Language.HINDI]: "बिचौलियों के बजाय सारथी को क्यों चुनें?",
    [Language.KANNADA]: "ಸಾಂಪ್ರದಾಯಿಕ ಮಧ್ಯವರ್ತಿಗಳಿಗಿಂತ ಸಾರಥಿಯನ್ನು ಏಕೆ ಆರಿಸಬೇಕು?"
  },
  securePayments: {
    [Language.ENGLISH]: "100% Secure",
    [Language.HINDI]: "100% सुरक्षित",
    [Language.KANNADA]: "100% ಸುರಕ್ಷಿತ"
  },
  digitalTracking: {
    [Language.ENGLISH]: "Digital payments & tracking",
    [Language.HINDI]: "मोबाइल से पैसे और गाड़ी की जानकारी",
    [Language.KANNADA]: "ಡಿಜಿಟಲ್ ಪಾವತಿಗಳು ಮತ್ತು ಟ್ರ್ಯಾಕಿಂಗ್"
  },
  directConnect: {
    [Language.ENGLISH]: "Direct Connect",
    [Language.HINDI]: "सीधा संपर्क",
    [Language.KANNADA]: "ನೇರ ಸಂಪರ್ಕ"
  },
  farmersToRetailers: {
    [Language.ENGLISH]: "Farmers to Retailers",
    [Language.HINDI]: "किसान से दुकानदार तक",
    [Language.KANNADA]: "ರೈತರಿಂದ ಚಿಲ್ಲರೆ ವ್ಯಾಪಾರಿಗಳಿಗೆ"
  },
  higherProfit: {
    [Language.ENGLISH]: "Higher Profit",
    [Language.HINDI]: "ज्यादा मुनाफा",
    [Language.KANNADA]: "ಹೆಚ್ಚಿನ ಲಾಭ"
  },
  saveCommissions: {
    [Language.ENGLISH]: "Save 15-20% on commissions",
    [Language.HINDI]: "कमीशन के 15-20% पैसे बचाएं",
    [Language.KANNADA]: "ಕಮಿಷನ್‌ನಲ್ಲಿ 15-20% ಉಳಿಸಿ"
  },
  readyToTransform: {
    [Language.ENGLISH]: "Ready to transform your farming business?",
    [Language.HINDI]: "क्या आप अपनी खेती की कमाई बढ़ाना चाहते हैं?",
    [Language.KANNADA]: "ನಿಮ್ಮ ಕೃಷಿ ವ್ಯವಹಾರವನ್ನು ಪರಿವರ್ತಿಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ?"
  },
  joinThousands: {
    [Language.ENGLISH]: "Join thousands of farmers who are earning more and worrying less with Saarthi.",
    [Language.HINDI]: "उन हजारों किसानों से जुड़ें जो सारथी के साथ ज्यादा कमा रहे हैं।",
    [Language.KANNADA]: "ಸಾರಥಿಯೊಂದಿಗೆ ಹೆಚ್ಚು ಸಂಪಾದಿಸುತ್ತಿರುವ ಮತ್ತು ಕಡಿಮೆ ಚಿಂತಿಸುತ್ತಿರುವ ಸಾವಿರಾರು ರೈತರನ್ನು ಸೇರಿ."
  },
  downloadApp: {
    [Language.ENGLISH]: "Download Saarthi App",
    [Language.HINDI]: "सारथी ऐप डाउनलोड करें",
    [Language.KANNADA]: "ಸಾರಥಿ ಆಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ"
  },
  privacy: {
    [Language.ENGLISH]: "Privacy",
    [Language.HINDI]: "गोपनीयता",
    [Language.KANNADA]: "ಗೌಪ್ಯತೆ"
  },
  terms: {
    [Language.ENGLISH]: "Terms",
    [Language.HINDI]: "शर्तें",
    [Language.KANNADA]: "ನಿಯಮಗಳು"
  },
  contact: {
    [Language.ENGLISH]: "Contact",
    [Language.HINDI]: "संपर्क करें",
    [Language.KANNADA]: "ಸಂಪರ್ಕ"
  },
  findLoads: {
    [Language.ENGLISH]: "Find Loads",
    [Language.HINDI]: "लोड (सामान) खोजें",
    [Language.KANNADA]: "ಲೋಡ್‌ಗಳನ್ನು ಹುಡುಕಿ"
  },
  findCrops: {
    [Language.ENGLISH]: "Find Crops",
    [Language.HINDI]: "फसलें खोजें",
    [Language.KANNADA]: "ಬೆಳೆಗಳನ್ನು ಹುಡುಕಿ"
  },
  myTrips: {
    [Language.ENGLISH]: "My Trips",
    [Language.HINDI]: "मेरी बुकिंग",
    [Language.KANNADA]: "ನನ್ನ ಪ್ರವಾಸಗಳು"
  },
  support: {
    [Language.ENGLISH]: "Support",
    [Language.HINDI]: "मदद",
    [Language.KANNADA]: "ಬೆಂಬಲ"
  },
  profile: {
    [Language.ENGLISH]: "Profile",
    [Language.HINDI]: "मेरी जानकारी",
    [Language.KANNADA]: "ಪ್ರೊಫೈಲ್"
  },
  logout: {
    [Language.ENGLISH]: "Logout",
    [Language.HINDI]: "बाहर निकलें",
    [Language.KANNADA]: "ಲಾಗ್ ಔಟ್"
  },
  home: {
    [Language.ENGLISH]: "Home",
    [Language.HINDI]: "मुख्य पेज",
    [Language.KANNADA]: "ಹೋಮ್"
  },
  ai: {
    [Language.ENGLISH]: "AI",
    [Language.HINDI]: "मदद",
    [Language.KANNADA]: "ಎಐ"
  },
  track: {
    [Language.ENGLISH]: "Track",
    [Language.HINDI]: "गाड़ी देखें",
    [Language.KANNADA]: "ಟ್ರ್ಯಾಕ್"
  },
  trips: {
    [Language.ENGLISH]: "Trips",
    [Language.HINDI]: "बुकिंग",
    [Language.KANNADA]: "ಪ್ರವಾಸಗಳು"
  },
  help: {
    [Language.ENGLISH]: "Help",
    [Language.HINDI]: "सहायता",
    [Language.KANNADA]: "ಸಹಾಯ"
  },
  backToPersona: {
    [Language.ENGLISH]: "Back to Persona Selection",
    [Language.HINDI]: "वापस जाएं",
    [Language.KANNADA]: "ವ್ಯಕ್ತಿತ್ವ ಆಯ್ಕೆಗೆ ಹಿಂತಿರುಗಿ"
  },
  backToHome: {
    [Language.ENGLISH]: "Back to Home",
    [Language.HINDI]: "होम पर जाएं",
    [Language.KANNADA]: "ಹೋಮ್‌ಗೆ ಹಿಂತಿರುಗಿ"
  },
  completeProfile: {
    [Language.ENGLISH]: "Complete Profile",
    [Language.HINDI]: "अपनी जानकारी पूरी करें",
    [Language.KANNADA]: "ಪ್ರೊಫೈಲ್ ಪೂರ್ಣಗೊಳಿಸಿ"
  },
  completeProfileDesc: {
    [Language.ENGLISH]: "Add your location & crop details to get accurate mandi rates and transport options.",
    [Language.HINDI]: "मंडी भाव और गाड़ी की जानकारी के लिए अपनी जगह और फसल बताएं।",
    [Language.KANNADA]: "ನಿಖರವಾದ ಮಾರುಕಟ್ಟೆ ದರಗಳು ಮತ್ತು ಸಾರಿಗೆ ಆಯ್ಕೆಗಳನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ಸ್ಥಳ ಮತ್ತು ಬೆಳೆ ವಿವರಗಳನ್ನು ಸೇರಿಸಿ."
  },
  setupNow: {
    [Language.ENGLISH]: "Setup Now",
    [Language.HINDI]: "अभी भरें",
    [Language.KANNADA]: "ಈಗಲೇ ಹೊಂದಿಸಿ"
  },
  askSaarthiAI: {
    [Language.ENGLISH]: "Ask Saarthi AI",
    [Language.HINDI]: "सारथी से पूछें",
    [Language.KANNADA]: "ಸಾರಥಿ ಎಐ ಕೇಳಿ"
  },
  getMandiRatesHelp: {
    [Language.ENGLISH]: "Get mandi rates, transport help & more",
    [Language.HINDI]: "मंडी भाव, गाड़ी की मदद और बहुत कुछ",
    [Language.KANNADA]: "ಮಾರುಕಟ್ಟೆ ದರಗಳು, ಸಾರಿಗೆ ಸಹಾಯ ಮತ್ತು ಹೆಚ್ಚಿನದನ್ನು ಪಡೆಯಿರಿ"
  },
  recentActivity: {
    [Language.ENGLISH]: "Recent Activity",
    [Language.HINDI]: "हाल का काम",
    [Language.KANNADA]: "ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ"
  },
  noActiveShipments: {
    [Language.ENGLISH]: "No active shipments",
    [Language.HINDI]: "अभी कोई बुकिंग नहीं है",
    [Language.KANNADA]: "ಯಾವುದೇ ಸಕ್ರಿಯ ಸಾಗಣೆಗಳಿಲ್ಲ"
  },
  bookFirstLoad: {
    [Language.ENGLISH]: "Book your first load",
    [Language.HINDI]: "अपनी पहली गाड़ी बुक करें",
    [Language.KANNADA]: "ನಿಮ್ಮ ಮೊದಲ ಲೋಡ್ ಬುಕ್ ಮಾಡಿ"
  },
  findCropsToBuy: {
    [Language.ENGLISH]: "Find crops to buy",
    [Language.HINDI]: "खरीदने के लिए फसलें खोजें",
    [Language.KANNADA]: "ಖರೀದಿಸಲು ಬೆಳೆಗಳನ್ನು ಹುಡುಕಿ"
  },
  // Roles
  farmer: {
    [Language.ENGLISH]: "Farmer",
    [Language.HINDI]: "किसान",
    [Language.KANNADA]: "ರೈತ"
  },
  transporter: {
    [Language.ENGLISH]: "Transporter",
    [Language.HINDI]: "गाड़ी वाला",
    [Language.KANNADA]: "ಸಾರಿಗೆದಾರ"
  },
  buyer: {
    [Language.ENGLISH]: "Buyer",
    [Language.HINDI]: "खरीदार (व्यापारी)",
    [Language.KANNADA]: "ಖರೀದಿದಾರ"
  },
  fpo: {
    [Language.ENGLISH]: "FPO / Admin",
    [Language.HINDI]: "किसान समूह (FPO)",
    [Language.KANNADA]: "ಎಫ್‌ಪಿಒ"
  },
  // AI Assistant
  askMeAnything: {
    [Language.ENGLISH]: "Ask me anything about farming, rates, or transport...",
    [Language.HINDI]: "खेती, भाव या गाड़ी के बारे में कुछ भी पूछें...",
    [Language.KANNADA]: "ಕೃಷಿ, ದರಗಳು ಅಥವಾ ಸಾರಿಗೆಯ ಬಗ್ಗೆ ಏನನ್ನಾದರೂ ಕೇಳಿ..."
  },
  voiceAssistant: {
    [Language.ENGLISH]: "Voice Assistant",
    [Language.HINDI]: "बोलकर पूछें",
    [Language.KANNADA]: "ಧ್ವನಿ ಸಹಾಯಕ"
  },
  sendToMandi: {
    [Language.ENGLISH]: "Send to Mandi",
    [Language.HINDI]: "मंडी भेजें",
    [Language.KANNADA]: "ಮಾರುಕಟ್ಟೆಗೆ ಕಳುಹಿಸಿ"
  },
  nearbyVehicles: {
    [Language.ENGLISH]: "Nearby Vehicles",
    [Language.HINDI]: "पास की गाड़ी देखें",
    [Language.KANNADA]: "ಹತ್ತಿರದ ವಾಹನಗಳು"
  },
  selectCrop: {
    [Language.ENGLISH]: "Select Crop",
    [Language.HINDI]: "फसल चुनें",
    [Language.KANNADA]: "ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ"
  },
  quantity: {
    [Language.ENGLISH]: "Quantity",
    [Language.HINDI]: "कितना वजन",
    [Language.KANNADA]: "ಪ್ರಮಾಣ"
  },
  bags: {
    [Language.ENGLISH]: "Bags",
    [Language.HINDI]: "बोरी",
    [Language.KANNADA]: "ಚೀಲಗಳು"
  },
  kg: {
    [Language.ENGLISH]: "kg",
    [Language.HINDI]: "किलो",
    [Language.KANNADA]: "ಕೆಜಿ"
  },
  vehicleComing: {
    [Language.ENGLISH]: "Vehicle is coming",
    [Language.HINDI]: "गाड़ी आ रही है",
    [Language.KANNADA]: "ವಾಹನ ಬರುತ್ತಿದೆ"
  },
  reachedMandi: {
    [Language.ENGLISH]: "Reached Mandi",
    [Language.HINDI]: "मंडी पहुँच गई",
    [Language.KANNADA]: "ಮಾರುಕಟ್ಟೆ ತಲುಪಿದೆ"
  },
  sendToThisMandi: {
    [Language.ENGLISH]: "Send to this Mandi",
    [Language.HINDI]: "इस मंडी में भेजें",
    [Language.KANNADA]: "ಈ ಮಾರುಕಟ್ಟೆಗೆ ಕಳುಹಿಸಿ"
  },
  pickupLocation: {
    [Language.ENGLISH]: "Pickup Location",
    [Language.HINDI]: "कहाँ से उठाना है",
    [Language.KANNADA]: "ಪಿಕಪ್ ಸ್ಥಳ"
  },
  autoDetect: {
    [Language.ENGLISH]: "Auto-detect",
    [Language.HINDI]: "अपने आप पता करें",
    [Language.KANNADA]: "ಸ್ವಯಂ ಪತ್ತೆ"
  },
  bookNow: {
    [Language.ENGLISH]: "Book Now",
    [Language.HINDI]: "बुक करें",
    [Language.KANNADA]: "ಈಗಲೇ ಬುಕ್ ಮಾಡಿ"
  },
  eta: {
    [Language.ENGLISH]: "ETA",
    [Language.HINDI]: "पहुँचने का समय",
    [Language.KANNADA]: "ತಲುಪುವ ಸಮಯ"
  },
  viewMandi: {
    [Language.ENGLISH]: "View Mandi",
    [Language.HINDI]: "मंडी देखें",
    [Language.KANNADA]: "ಮಂಡಿ ನೋಡಿ"
  },
  farmerDashboard: {
    [Language.ENGLISH]: "Farmer Dashboard",
    [Language.HINDI]: "किसान डैशबोर्ड",
    [Language.KANNADA]: "ರೈತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್"
  },
  driverDashboard: {
    [Language.ENGLISH]: "Driver Dashboard",
    [Language.HINDI]: "ड्राइवर डैशबोर्ड",
    [Language.KANNADA]: "ಚಾಲಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್"
  },
  buyerDashboard: {
    [Language.ENGLISH]: "Buyer Dashboard",
    [Language.HINDI]: "खरीदार डैशबोर्ड",
    [Language.KANNADA]: "ಖರೀದಿದಾರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್"
  },
  fpoDashboard: {
    [Language.ENGLISH]: "FPO Dashboard",
    [Language.HINDI]: "FPO डैशबोर्ड",
    [Language.KANNADA]: "ಎಫ್‌ಪಿಒ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್"
  },
  step1Text: {
    [Language.ENGLISH]: "Farmer added crop details",
    [Language.HINDI]: "किसान ने फसल की जानकारी डाली",
    [Language.KANNADA]: "ರೈತ ಬೆಳೆ ವಿವರಗಳನ್ನು ಸೇರಿಸಿದ್ದಾರೆ"
  },
  step2Text: {
    [Language.ENGLISH]: "Buyer confirmed the deal",
    [Language.HINDI]: "खरीदार ने सौदा पक्का किया",
    [Language.KANNADA]: "ಖರೀದಿದಾರ ಒಪ್ಪಂದವನ್ನು ಖಚಿತಪಡಿಸಿದ್ದಾರೆ"
  },
  step3Text: {
    [Language.ENGLISH]: "Transport booked",
    [Language.HINDI]: "गाड़ी बुक हो गई",
    [Language.KANNADA]: "ಸಾರಿಗೆ ಬುಕ್ ಮಾಡಲಾಗಿದೆ"
  },
  step4Text: {
    [Language.ENGLISH]: "Delivery complete - Deal done",
    [Language.HINDI]: "फसल पहुँच गई — सौदा पूरा हुआ",
    [Language.KANNADA]: "ವಿತರಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ - ಒಪ್ಪಂದ ಮುಗಿದಿದೆ"
  },
  mandiMeBechen: {
    [Language.ENGLISH]: "Sell in Mandi",
    [Language.HINDI]: "मंडी में बेचें",
    [Language.KANNADA]: "ಮಂಡಿಯಲ್ಲಿ ಮಾರಿ"
  },
  saudaPuraHua: {
    [Language.ENGLISH]: "Deal Done",
    [Language.HINDI]: "सौदा पूरा हुआ",
    [Language.KANNADA]: "ಒಪ್ಪಂದ ಮುಗಿದಿದೆ"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);

  const t = (key: string): string => {
    if (!translations[key]) return key;
    return translations[key][language] || translations[key][Language.ENGLISH];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
