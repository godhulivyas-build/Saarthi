import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { ChatMessage, Language } from '../types';
import { getChatResponse } from '../services/geminiService';
import { Mic, Send, X, Volume2, VolumeX, Sparkles, MessageSquare, User, Bot, HelpCircle, Info, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AIAssistant: React.FC = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: t('askMeAnything') }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: messageText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getChatResponse(messageText, language);
      const modelMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: response };
      setMessages(prev => [...prev, modelMsg]);
      
      if (isSpeaking) {
        speak(response);
      }
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "Sorry, I'm having trouble connecting right now.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === Language.HINDI ? 'hi-IN' : language === Language.KANNADA ? 'kn-IN' : 'en-IN';
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        setInput(language === Language.HINDI ? "आज मंडी का रेट क्या है?" : "What is the mandi rate today?");
      }, 2000);
    }
  };

  const quickActions = [
    { icon: HelpCircle, text: language === Language.HINDI ? 'गाड़ी कैसे बुक करें?' : 'How to book transport?' },
    { icon: Info, text: language === Language.HINDI ? 'मंडी के भाव क्या हैं?' : 'What are mandi prices?' },
    { icon: Phone, text: language === Language.HINDI ? 'कस्टमर केयर से बात करें' : 'Talk to customer care' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[380px] h-[550px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="p-6 bg-gray-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
                  <Bot size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-black text-lg leading-none mb-1">Saarthi AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Online Now</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsSpeaking(!isSpeaking)}
                  className={`p-2 rounded-xl transition-colors ${isSpeaking ? 'bg-white/30' : 'hover:bg-white/10'}`}
                >
                  {isSpeaking ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50"
            >
              {messages.length === 1 && (
                <div className="space-y-6 mb-4">
                  <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 text-green-600 mb-3">
                      <Sparkles size={20} />
                      <span className="font-black uppercase text-xs tracking-widest">{t('madadChahiye')}</span>
                    </div>
                    <p className="text-gray-600 font-bold text-lg leading-tight">
                      {language === Language.HINDI 
                        ? 'नमस्ते! मैं सारथी AI हूँ। मैं आपकी क्या मदद कर सकता हूँ?' 
                        : 'Hi! I am Saarthi AI. How can I help you today?'}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Quick Actions</p>
                    {quickActions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(action.text)}
                        className="w-full flex items-center gap-3 p-4 bg-white hover:bg-green-50 rounded-2xl border border-gray-100 hover:border-green-200 transition-all text-left group"
                      >
                        <div className="p-2 bg-gray-50 group-hover:bg-white rounded-xl text-gray-400 group-hover:text-green-600 transition-colors">
                          <action.icon size={18} />
                        </div>
                        <span className="text-sm font-bold text-gray-700">{action.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-[1.5rem] font-bold text-sm shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-green-600 text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white border-t border-gray-100">
              <div className="relative flex items-center gap-2">
                <button 
                  onClick={toggleListening}
                  className={`p-3 rounded-xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-500 hover:text-green-600'}`}
                >
                  <Mic size={20} />
                </button>
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={t('askMeAnything')}
                    className="w-full pl-6 pr-14 py-4 bg-gray-50 border-2 border-transparent focus:border-green-500 rounded-2xl outline-none font-bold text-sm transition-all"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-xl transition-all ${input.trim() ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' : 'bg-gray-200 text-gray-400'}`}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gray-900 text-white rounded-[1.5rem] shadow-2xl flex items-center justify-center relative group overflow-hidden"
      >
        <div className="absolute inset-0 bg-green-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="relative z-10"
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative z-10"
            >
              <MessageSquare size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
