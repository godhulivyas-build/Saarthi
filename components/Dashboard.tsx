import React, { useState } from 'react';
import { DashboardView, Shipment, UserRole, DashboardProps, Language } from '../types';
import { BookingView } from './dashboard/BookingView';
import { TrackingView } from './dashboard/TrackingView';
import { SupportView } from './dashboard/SupportView';
import { WalletView } from './dashboard/WalletView';
import { MarketRatesView } from './dashboard/MarketRatesView';
import { CropDiscoveryView } from './dashboard/CropDiscoveryView';
import { AIAssistant } from './AIAssistant';
import { PersonaManager } from './PersonaManager';
import { useLanguage } from '../LanguageContext';
import { LayoutGrid, Truck, Map, Headphones, UserCircle, LogOut, Users, ChevronDown, Wallet, TrendingUp, DollarSign, AlertCircle, Search, Sparkles, ChevronLeft, MapPin } from 'lucide-react';

import { PrototypeFlow } from './dashboard/prototype/PrototypeFlow';

export const Dashboard: React.FC<DashboardProps> = ({ userRole, userPreferences, wallet, onLogout, onSwitchPersona, onEditPreferences }) => {
  const { t, language } = useLanguage();
  const [currentView, setCurrentView] = useState<DashboardView>(DashboardView.HOME);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [showPersonaManager, setShowPersonaManager] = useState(false);
  const [prototypeStep, setPrototypeStep] = useState<'BOOKING' | 'MANDI' | 'NEARBY' | 'TRACKING'>('BOOKING');

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case UserRole.FARMER: return t('farmer');
      case UserRole.TRANSPORTER: return t('transporter');
      case UserRole.BUYER: return t('buyer');
      case UserRole.FPO: return t('fpo');
      default: return role;
    }
  };

  const handleBack = () => {
    if (currentView === DashboardView.HOME) {
      onLogout();
    } else {
      setCurrentView(DashboardView.HOME);
    }
  };

  const handleBookShipment = (shipment: Shipment) => {
    setShipments(prev => [shipment, ...prev]);
  };

  const isProfileIncomplete = !userPreferences || !userPreferences.location || !userPreferences.primaryCrop;

  // Define menu items
  const allMenuItems = [
    { id: DashboardView.BOOK_TRANSPORT, label: t('bookTransport'), icon: Truck, color: 'text-green-600 bg-green-50', roles: [UserRole.FARMER, UserRole.FPO] },
    { id: DashboardView.BOOK_TRANSPORT, label: t('findLoads'), icon: Truck, color: 'text-orange-600 bg-orange-50', roles: [UserRole.TRANSPORTER] },
    
    // New Buyer View
    { id: DashboardView.CROP_DISCOVERY, label: t('findCrops'), icon: Search, color: 'text-purple-600 bg-purple-50', roles: [UserRole.BUYER] },

    // Admin Views
    { id: DashboardView.HOME, label: t('manageUsers'), icon: Users, color: 'text-blue-600 bg-blue-50', roles: [UserRole.FPO] },
    { id: DashboardView.HOME, label: t('viewReports'), icon: LayoutGrid, color: 'text-indigo-600 bg-indigo-50', roles: [UserRole.FPO] },

    { id: DashboardView.TRACK_SHIPMENT, label: t('trackShipment'), icon: Map, color: 'text-blue-600 bg-blue-50', roles: [UserRole.FARMER, UserRole.FPO, UserRole.BUYER] },
    { id: DashboardView.TRACK_SHIPMENT, label: t('myTrips'), icon: Map, color: 'text-blue-600 bg-blue-50', roles: [UserRole.TRANSPORTER] },
    { id: DashboardView.MARKET_RATES, label: t('mandiRates'), icon: TrendingUp, color: 'text-indigo-600 bg-indigo-50', roles: [UserRole.FARMER, UserRole.FPO] },
    { id: DashboardView.AI_ASSISTANT, label: t('aiAssistant'), icon: Sparkles, color: 'text-green-600 bg-green-100', roles: [UserRole.FARMER, UserRole.FPO, UserRole.BUYER, UserRole.TRANSPORTER] },
    { id: DashboardView.WALLET, label: t('wallet'), icon: Wallet, color: 'text-yellow-600 bg-yellow-50', roles: [UserRole.FARMER, UserRole.FPO, UserRole.BUYER, UserRole.TRANSPORTER] },
    { id: DashboardView.SUPPORT, label: t('support'), icon: Headphones, color: 'text-purple-600 bg-purple-50', roles: [UserRole.FARMER, UserRole.FPO, UserRole.BUYER, UserRole.TRANSPORTER] },
    { id: DashboardView.PROFILE, label: t('profile'), icon: UserCircle, color: 'text-gray-600 bg-gray-50', roles: [UserRole.FARMER, UserRole.FPO, UserRole.BUYER, UserRole.TRANSPORTER] },
  ];

  // Filter menu items based on role
  const menuItems = allMenuItems.filter(item => item.roles.includes(userRole));

  const renderContent = () => {
    switch (currentView) {
      case DashboardView.BOOK_TRANSPORT:
        return <PrototypeFlow initialStep="BOOKING" onComplete={() => setCurrentView(DashboardView.HOME)} />;
      case DashboardView.MANDI_CONNECT:
        return <PrototypeFlow initialStep="MANDI" onComplete={() => setCurrentView(DashboardView.HOME)} />;
      case DashboardView.NEARBY_VEHICLES:
        return <PrototypeFlow initialStep="NEARBY" onComplete={() => setCurrentView(DashboardView.HOME)} />;
      case DashboardView.LIVE_TRACKING:
        return <PrototypeFlow initialStep="TRACKING" onComplete={() => setCurrentView(DashboardView.HOME)} />;
      case DashboardView.TRACK_SHIPMENT:
        return <TrackingView activeShipments={shipments} />;
      case DashboardView.SUPPORT:
        return <SupportView />;
      case DashboardView.WALLET:
        return <WalletView wallet={wallet} />;
      case DashboardView.MARKET_RATES:
        return <MarketRatesView preferences={userPreferences} />;
      case DashboardView.CROP_DISCOVERY:
        return <CropDiscoveryView preferences={userPreferences} />;
      case DashboardView.AI_ASSISTANT:
        return <AIAssistant />;
      case DashboardView.PROFILE:
        return (
            <div className="p-6 text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <UserCircle size={40} className="text-gray-500" />
                </div>
                <h2 className="text-xl font-bold">{getRoleLabel(userRole)}</h2>
                <p className="text-gray-500 mb-6">{userPreferences?.location || (language === Language.HINDI ? 'स्थान निर्धारित नहीं है' : 'Location not set')} • {language === Language.HINDI ? 'सक्रिय सदस्य' : 'Active Member'}</p>
                <button onClick={onEditPreferences} className="mb-6 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200">
                    {language === Language.HINDI ? 'प्रोफ़ाइल विवरण संपादित करें' : 'Edit Profile Details'}
                </button>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-yellow-800 text-sm mb-6">
                    {language === Language.HINDI ? '2023 से सत्यापित सदस्य' : 'Verified Member since 2023'}
                </div>
                <button onClick={onLogout} className="text-red-600 font-medium hover:underline flex items-center justify-center gap-2 mx-auto">
                    <LogOut size={16} /> Logout
                </button>
            </div>
        );
      default:
        // Home View - Overview
        if (userRole === UserRole.FARMER) {
          return (
            <div className="p-4 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-black text-green-600 uppercase tracking-[0.2em]">{t('farmerDashboard')}</h2>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID: SR-2026-01</span>
              </div>
              {/* Header Card */}
              <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-[32px] p-6 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-black mb-1">{t('namaste')}</h2>
                    <p className="text-green-100 font-medium">{t('farmer')}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl text-right">
                    <p className="text-[10px] uppercase font-bold text-green-100">{t('wallet')}</p>
                    <p className="text-xl font-black">₹{wallet.balance.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                  <div className="bg-yellow-400 p-2 rounded-xl text-yellow-900">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-green-100">आज का भाव (Wheat)</p>
                    <p className="text-lg font-bold">₹2,450 <span className="text-xs font-normal text-green-200">/ quintal</span></p>
                  </div>
                </div>
              </div>

              {/* Big Action Buttons */}
              <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={() => setCurrentView(DashboardView.BOOK_TRANSPORT)}
                  className="bg-white p-6 rounded-[28px] shadow-sm border-2 border-transparent hover:border-green-500 transition-all flex items-center gap-6 text-left group active:scale-95"
                >
                  <div className="bg-green-100 p-5 rounded-3xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                    <Truck size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-800">{t('bookTransport')}</h3>
                    <p className="text-sm text-gray-500 font-medium">गाड़ी बुक करें</p>
                  </div>
                </button>

                <button 
                  onClick={() => setCurrentView(DashboardView.MANDI_CONNECT)}
                  className="bg-white p-6 rounded-[28px] shadow-sm border-2 border-transparent hover:border-orange-500 transition-all flex items-center gap-6 text-left group active:scale-95"
                >
                  <div className="bg-orange-100 p-5 rounded-3xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <LayoutGrid size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-800">{t('sendToMandi')}</h3>
                    <p className="text-sm text-gray-500 font-medium">मंडी भेजें</p>
                  </div>
                </button>

                <button 
                  onClick={() => setCurrentView(DashboardView.NEARBY_VEHICLES)}
                  className="bg-white p-6 rounded-[28px] shadow-sm border-2 border-transparent hover:border-blue-500 transition-all flex items-center gap-6 text-left group active:scale-95"
                >
                  <div className="bg-blue-100 p-5 rounded-3xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <MapPin size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-800">{t('nearbyVehicles')}</h3>
                    <p className="text-sm text-gray-500 font-medium">पास की गाड़ी</p>
                  </div>
                </button>
              </div>

              {/* AI Assistant Banner */}
              <div 
                onClick={() => setCurrentView(DashboardView.AI_ASSISTANT)}
                className="bg-green-50 border-2 border-green-200 rounded-[32px] p-6 flex items-center gap-4 cursor-pointer hover:bg-green-100 transition-all active:scale-95"
              >
                <div className="bg-green-600 p-4 rounded-2xl text-white shadow-lg shadow-green-200">
                  <Sparkles size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-green-900">{t('askSaarthiAI')}</h3>
                  <p className="text-sm text-green-700 font-medium">{t('getMandiRatesHelp')}</p>
                </div>
              </div>
            </div>
          );
        }

        if (userRole === UserRole.FPO) {
          return (
            <div className="p-4 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em]">{t('adminDashboard')}</h2>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">SYSTEM: ACTIVE</span>
              </div>
              
              {/* Admin Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100">
                  <div className="bg-blue-100 w-10 h-10 rounded-xl flex items-center justify-center text-blue-600 mb-3">
                    <Users size={20} />
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('totalUsers')}</p>
                  <p className="text-2xl font-black text-gray-800">1,240</p>
                </div>
                <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100">
                  <div className="bg-green-100 w-10 h-10 rounded-xl flex items-center justify-center text-green-600 mb-3">
                    <Truck size={20} />
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('activeLoads')}</p>
                  <p className="text-2xl font-black text-gray-800">84</p>
                </div>
                <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100">
                  <div className="bg-yellow-100 w-10 h-10 rounded-xl flex items-center justify-center text-yellow-600 mb-3">
                    <DollarSign size={20} />
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('totalEarnings')}</p>
                  <p className="text-2xl font-black text-gray-800">₹4.2L</p>
                </div>
                <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100">
                  <div className="bg-red-100 w-10 h-10 rounded-xl flex items-center justify-center text-red-600 mb-3">
                    <AlertCircle size={20} />
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('pendingApprovals')}</p>
                  <p className="text-2xl font-black text-gray-800">12</p>
                </div>
              </div>

              {/* Admin Actions */}
              <div className="space-y-4">
                <button className="w-full bg-blue-600 text-white p-4 rounded-2xl font-bold flex items-center justify-between hover:bg-blue-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <Users size={20} />
                    <span>{t('manageUsers')}</span>
                  </div>
                  <ChevronLeft size={20} className="rotate-180" />
                </button>
                <button className="w-full bg-white border-2 border-gray-100 p-4 rounded-2xl font-bold flex items-center justify-between hover:border-blue-200 transition-colors">
                  <div className="flex items-center gap-3 text-gray-700">
                    <LayoutGrid size={20} className="text-blue-500" />
                    <span>{t('viewReports')}</span>
                  </div>
                  <ChevronLeft size={20} className="rotate-180 text-gray-400" />
                </button>
              </div>

              {/* System Health */}
              <div className="bg-gray-900 rounded-[32px] p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">{t('systemHealth')}</h3>
                  <span className="flex items-center gap-1.5 text-green-400 text-xs font-bold">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    ONLINE
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Server Status</span>
                    <span className="text-green-400">99.9%</span>
                  </div>
                  <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full w-[99.9%]" />
                  </div>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="p-4 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-black text-green-600 uppercase tracking-[0.2em]">
                {userRole === UserRole.TRANSPORTER ? t('driverDashboard') : 
                 userRole === UserRole.BUYER ? t('buyerDashboard') : t('fpoDashboard')}
              </h2>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID: SR-2026-02</span>
            </div>
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="flex justify-between items-start relative z-10">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">{t('namaste')}</h2>
                        <div 
                          className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-white/30 transition-colors inline-flex mt-1"
                          onClick={() => setShowPersonaManager(true)}
                        >
                           <Users size={14} />
                           <span>{getRoleLabel(userRole)}</span>
                           <ChevronDown size={14} className="opacity-75" />
                        </div>
                    </div>
                    <div 
                        className="bg-white/20 backdrop-blur-md p-3 rounded-xl cursor-pointer hover:bg-white/30 transition"
                        onClick={() => setCurrentView(DashboardView.WALLET)}
                    >
                        <p className="text-xs text-green-100 mb-1">{t('wallet')}</p>
                        <p className="text-xl font-bold flex items-center"><DollarSign size={16}/> {wallet.balance.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {isProfileIncomplete && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex justify-between items-center animate-in fade-in slide-in-from-top-2">
                    <div className="flex-1 mr-4">
                        <h3 className="font-bold text-amber-900 text-sm flex items-center gap-2 mb-1">
                            <AlertCircle size={16} className="text-amber-600"/> {t('completeProfile')}
                        </h3>
                        <p className="text-xs text-amber-800 leading-tight">{t('completeProfileDesc')}</p>
                    </div>
                    <button 
                        onClick={onEditPreferences}
                        className="whitespace-nowrap px-3 py-2 bg-white border border-amber-200 text-amber-700 text-xs font-bold rounded-lg hover:bg-amber-50 shadow-sm"
                    >
                        {t('setupNow')}
                    </button>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                {menuItems.filter(item => item.id !== DashboardView.PROFILE && item.id !== DashboardView.SUPPORT).map((item, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setCurrentView(item.id)}
                        className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center h-32 hover:border-green-300 transition-all hover:shadow-md"
                    >
                        <div className={`p-3 rounded-full mb-2 ${item.color}`}>
                            <item.icon size={24} />
                        </div>
                        <span className="font-semibold text-gray-800 text-sm">{item.label}</span>
                    </button>
                ))}
            </div>

            {/* AI Assistant Quick Access */}
            <div 
                onClick={() => setCurrentView(DashboardView.AI_ASSISTANT)}
                className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-green-100 transition-colors"
            >
                <div className="bg-green-600 p-3 rounded-xl text-white shadow-lg shadow-green-200">
                    <Sparkles size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-green-900 text-sm">{t('askSaarthiAI')}</h3>
                    <p className="text-xs text-green-700">{t('getMandiRatesHelp')}</p>
                </div>
            </div>

            <div>
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <LayoutGrid size={18} className="text-gray-400"/> {t('recentActivity')}
                </h3>
                {shipments.length === 0 ? (
                    <div className="bg-gray-50 rounded-xl p-8 text-center border border-dashed border-gray-300">
                        <p className="text-gray-400 mb-2">{t('noActiveShipments')}</p>
                        {userRole === UserRole.FARMER && (
                            <button onClick={() => setCurrentView(DashboardView.BOOK_TRANSPORT)} className="text-green-600 font-medium text-sm hover:underline">
                                {t('bookFirstLoad')}
                            </button>
                        )}
                        {userRole === UserRole.BUYER && (
                            <button onClick={() => setCurrentView(DashboardView.CROP_DISCOVERY)} className="text-purple-600 font-medium text-sm hover:underline">
                                {t('findCropsToBuy')}
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {shipments.map(s => (
                            <div key={s.id} onClick={() => setCurrentView(DashboardView.TRACK_SHIPMENT)} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex justify-between items-center cursor-pointer">
                                <div>
                                    <p className="font-bold text-gray-800">{s.destination}</p>
                                    <p className="text-xs text-gray-500">{s.date} • {s.weight}</p>
                                </div>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                    {s.status}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0 relative">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-2">
                <button 
                    onClick={handleBack}
                    className="flex items-center gap-1 p-1.5 hover:bg-gray-100 rounded-lg transition-colors mr-1 text-gray-600 font-bold"
                    title={currentView === DashboardView.HOME ? t('backToPersona') : t('backToHome')}
                >
                    <ChevronLeft size={24} />
                    <span className="text-sm hidden sm:inline">{language === Language.HINDI ? 'पीछे' : 'Back'}</span>
                </button>
                <div 
                    className="flex items-center gap-2 cursor-pointer" 
                    onClick={() => setCurrentView(DashboardView.HOME)}
                >
                    <div className="bg-green-600 p-1.5 rounded-lg">
                        <Truck className="text-white w-5 h-5" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-gray-900">Saarthi</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                 <button 
                    onClick={() => setShowPersonaManager(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold uppercase transition-colors border border-gray-200"
                 >
                    {userRole.split(' ')[0]} <ChevronDown size={14} className="text-gray-500" />
                 </button>

                 <button onClick={() => setCurrentView(DashboardView.PROFILE)} className="p-2 hover:bg-gray-100 rounded-full">
                    <UserCircle className="text-gray-600" />
                 </button>
            </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-3xl mx-auto min-h-[calc(100vh-60px)]">
            {renderContent()}
        </main>

        {/* Mobile Bottom Navigation - 5 items max for spacing */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden flex justify-between px-2 p-2 pb-safe z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <button 
                onClick={() => setCurrentView(DashboardView.HOME)}
                className={`flex flex-col items-center p-2 rounded-lg min-w-[60px] ${currentView === DashboardView.HOME ? 'text-green-600' : 'text-gray-400'}`}
            >
                <LayoutGrid size={20} />
                <span className="text-[10px] mt-1 font-medium">{t('home')}</span>
            </button>
            
            <button 
                onClick={() => setCurrentView(DashboardView.AI_ASSISTANT)}
                className={`flex flex-col items-center p-2 rounded-lg min-w-[60px] ${currentView === DashboardView.AI_ASSISTANT ? 'text-green-600' : 'text-gray-400'}`}
            >
                <Sparkles size={20} />
                <span className="text-[10px] mt-1 font-medium">{t('ai')}</span>
            </button>

             <button 
                onClick={() => setCurrentView(DashboardView.TRACK_SHIPMENT)}
                className={`flex flex-col items-center p-2 rounded-lg min-w-[60px] ${currentView === DashboardView.TRACK_SHIPMENT ? 'text-green-600' : 'text-gray-400'}`}
            >
                <Map size={20} />
                <span className="text-[10px] mt-1 font-medium">{userRole === UserRole.TRANSPORTER ? t('trips') : t('track')}</span>
            </button>
            
            <button 
                onClick={() => setCurrentView(DashboardView.WALLET)}
                className={`flex flex-col items-center p-2 rounded-lg min-w-[60px] ${currentView === DashboardView.WALLET ? 'text-green-600' : 'text-gray-400'}`}
            >
                <Wallet size={20} />
                <span className="text-[10px] mt-1 font-medium">{t('wallet')}</span>
            </button>

             <button 
                onClick={() => setCurrentView(DashboardView.SUPPORT)}
                className={`flex flex-col items-center p-2 rounded-lg min-w-[60px] ${currentView === DashboardView.SUPPORT ? 'text-green-600' : 'text-gray-400'}`}
            >
                <Headphones size={20} />
                <span className="text-[10px] mt-1 font-medium">{t('help')}</span>
            </button>
        </nav>

        <PersonaManager 
            isOpen={showPersonaManager}
            onClose={() => setShowPersonaManager(false)}
            currentRole={userRole}
            onSwitch={onSwitchPersona}
        />
    </div>
  );
};