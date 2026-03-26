import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../LanguageContext';
import { Truck, MapPin, Package, ChevronRight, User, Clock, CheckCircle, Map as MapIcon, Phone, Star, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Driver {
  id: string;
  name: string;
  photo: string;
  vehicle: string;
  eta: string;
  price: number;
  rating: number;
}

const MOCK_DRIVERS: Driver[] = [
  { id: '1', name: 'Rajesh Kumar', photo: 'https://picsum.photos/seed/driver1/100/100', vehicle: 'Tata Ace (Chota Hathi)', eta: '10 min', price: 1200, rating: 4.8 },
  { id: '2', name: 'Suresh Singh', photo: 'https://picsum.photos/seed/driver2/100/100', vehicle: 'Mahindra Bolero Pickup', eta: '15 min', price: 1500, rating: 4.5 },
  { id: '3', name: 'Amit Yadav', photo: 'https://picsum.photos/seed/driver3/100/100', vehicle: 'Eicher 10.59', eta: '25 min', price: 2200, rating: 4.9 },
];

interface Mandi {
  id: string;
  name: string;
  distance: string;
  price: number;
  trend: 'up' | 'down';
}

const MOCK_MANDIS: Mandi[] = [
  { id: '1', name: 'Azadpur Mandi', distance: '12 km', price: 2450, trend: 'up' },
  { id: '2', name: 'Okhla Mandi', distance: '18 km', price: 2380, trend: 'down' },
  { id: '3', name: 'Ghazipur Mandi', distance: '22 km', price: 2510, trend: 'up' },
];

export const PrototypeFlow: React.FC<{ 
  initialStep: 'BOOKING' | 'MANDI' | 'NEARBY' | 'TRACKING';
  onComplete: () => void;
}> = ({ initialStep, onComplete }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<'BOOKING' | 'MANDI' | 'NEARBY' | 'TRACKING' | 'SUCCESS'>(initialStep);
  const [selectedCrop, setSelectedCrop] = useState('Wheat (गेहूँ)');
  const [quantity, setQuantity] = useState('50');
  const [unit, setUnit] = useState('Bags (बोरी)');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [trackingStatus, setTrackingStatus] = useState<'COMING' | 'REACHED'>('COMING');

  // Auto-detect location simulation
  const [location, setLocation] = useState('Detecting...');
  useEffect(() => {
    const timer = setTimeout(() => setLocation('Village Rampur, Sector 4'), 1500);
    return () => clearTimeout(timer);
  }, []);

  const renderBooking = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 space-y-6"
    >
      <div className="flex items-center gap-3">
        <button onClick={onComplete} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} className="text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Truck className="text-green-600" /> {t('bookTransport')}
        </h2>
      </div>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">{t('pickupLocation')}</label>
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200">
            <MapPin className="text-red-500" size={20} />
            <span className="font-medium text-gray-700">{location}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">{t('selectCrop')}</label>
          <div className="grid grid-cols-2 gap-2">
            {['Wheat (गेहूँ)', 'Rice (चावल)', 'Potato (आलू)', 'Onion (प्याज)'].map(c => (
              <button 
                key={c}
                onClick={() => setSelectedCrop(c)}
                className={`p-3 rounded-xl border text-sm font-bold transition-all ${selectedCrop === c ? 'bg-green-600 border-green-600 text-white shadow-md' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">{t('quantity')}</label>
          <div className="flex gap-2">
            <input 
              type="number" 
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 p-3 rounded-xl font-bold text-lg"
            />
            <select 
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="bg-gray-50 border border-gray-200 p-3 rounded-xl font-bold"
            >
              <option>{t('bags')}</option>
              <option>{t('kg')}</option>
            </select>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setStep('NEARBY')}
        className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-xl shadow-lg shadow-green-200 flex items-center justify-center gap-2"
      >
        {t('nearbyVehicles')} <ChevronRight />
      </button>
    </motion.div>
  );

  const renderNearby = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-4 space-y-4"
    >
      <div className="flex items-center gap-3">
        <button onClick={() => setStep('BOOKING')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} className="text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">{t('nearbyVehicles')}</h2>
      </div>
      <div className="space-y-3">
        {MOCK_DRIVERS.map(d => (
          <div 
            key={d.id}
            onClick={() => {
              setSelectedDriver(d);
              setStep('DRIVER_MATCH');
            }}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:border-green-400 transition-all"
          >
            <img src={d.photo} alt={d.name} className="w-16 h-16 rounded-xl object-cover" referrerPolicy="no-referrer" />
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">{d.vehicle}</h3>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Clock size={12} /> {d.eta} • <Star size={12} className="text-yellow-500 fill-yellow-500" /> {d.rating}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600 text-lg">₹{d.price}</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold">{t('bookNow')}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderDriverMatch = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 space-y-6"
    >
      <div className="flex items-center gap-3">
        <button onClick={() => setStep('NEARBY')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} className="text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">{t('driverDetails')}</h2>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 text-center space-y-4">
        <div className="relative inline-block">
          <img src={selectedDriver?.photo} alt={selectedDriver?.name} className="w-32 h-32 rounded-full border-4 border-green-100 shadow-lg mx-auto" referrerPolicy="no-referrer" />
          <div className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full shadow-md">
            <CheckCircle size={20} />
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{selectedDriver?.name}</h2>
          <p className="text-gray-500 font-medium">{selectedDriver?.vehicle}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-50">
          <div className="text-center">
            <p className="text-xs text-gray-400 font-bold uppercase">{t('eta')}</p>
            <p className="text-xl font-bold text-gray-800">{selectedDriver?.eta}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400 font-bold uppercase">Price</p>
            <p className="text-xl font-bold text-green-600">₹{selectedDriver?.price}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
            <Phone size={20} /> Call
          </button>
          <button 
            onClick={() => setStep('TRACKING')}
            className="flex-[2] bg-green-600 text-white py-4 rounded-2xl font-bold text-xl shadow-lg shadow-green-200"
          >
            {t('bookNow')}
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderTracking = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col"
    >
      <div className="flex-1 bg-gray-200 relative overflow-hidden min-h-[300px]">
        {/* Mock Map */}
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/map/800/800')] bg-cover opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center"
          >
            <div className="w-4 h-4 bg-green-600 rounded-full shadow-lg" />
          </motion.div>
        </div>
        
        <div className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg text-green-600">
              <Truck size={20} />
            </div>
            <div>
              <p className="font-bold text-gray-800">{trackingStatus === 'COMING' ? t('vehicleComing') : t('reachedMandi')}</p>
              <p className="text-xs text-gray-500">Driver: {selectedDriver?.name || 'Rajesh Kumar'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-t-[32px] shadow-2xl space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">Status</h3>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">Live</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="mt-1 w-2 h-2 rounded-full bg-green-600 ring-4 ring-green-100" />
            <div className="flex-1">
              <p className="font-bold text-gray-800 text-sm">Pickup Confirmed</p>
              <p className="text-xs text-gray-500">Driver is arriving at your location</p>
            </div>
            <p className="text-xs font-bold text-gray-400">10:30 AM</p>
          </div>
          <div className="flex items-start gap-4 opacity-40">
            <div className="mt-1 w-2 h-2 rounded-full bg-gray-300" />
            <div className="flex-1">
              <p className="font-bold text-gray-800 text-sm">Loaded</p>
              <p className="text-xs text-gray-500">Waiting for loading to complete</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setStep('SUCCESS')}
          className="w-full bg-green-600 text-white py-4 rounded-2xl font-black text-xl shadow-lg shadow-green-200 active:scale-95"
        >
          {t('saudaPuraHua')}
        </button>
      </div>
    </motion.div>
  );

  const renderMandi = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 space-y-6"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button onClick={onComplete} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">{t('sendToMandi')}</h2>
        </div>
        <div className="bg-green-100 px-3 py-1 rounded-full text-green-700 text-xs font-bold">Live Prices</div>
      </div>

      <div className="space-y-4">
        {MOCK_MANDIS.map(m => (
          <div key={m.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{m.name}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <MapPin size={14} /> {m.distance} away
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-gray-900">₹{m.price}</p>
                <p className={`text-xs font-bold flex items-center justify-end gap-1 ${m.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {m.trend === 'up' ? '▲' : '▼'} {m.trend === 'up' ? '+₹40' : '-₹20'}
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setStep('BOOKING')}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-bold shadow-md shadow-green-100 flex items-center justify-center gap-2"
            >
              {t('sendToThisMandi')} <ChevronRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderSuccess = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 h-full flex items-center justify-center"
    >
      <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-gray-100 text-center space-y-8 w-full max-w-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-green-600" />
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-inner">
          <CheckCircle size={56} />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-gray-900 leading-tight">{t('saudaPuraHua')}</h2>
          <p className="text-gray-500 font-medium">{t('step4Text')}</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-3xl space-y-3 text-left">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400 font-bold uppercase tracking-wider">Order ID</span>
            <span className="text-gray-900 font-black">#SR-9921</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400 font-bold uppercase tracking-wider">Payment</span>
            <span className="text-green-600 font-black">₹{selectedDriver?.price} Paid</span>
          </div>
        </div>

        <button 
          onClick={onComplete}
          className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-black transition shadow-xl active:scale-95"
        >
          {t('backToHome')}
        </button>
      </div>
    </motion.div>
  );

  switch (step) {
    case 'BOOKING': return renderBooking();
    case 'NEARBY': return renderNearby();
    case 'DRIVER_MATCH': return renderDriverMatch();
    case 'TRACKING': return renderTracking();
    case 'MANDI': return renderMandi();
    case 'SUCCESS': return renderSuccess();
    default: return renderBooking();
  }
};
