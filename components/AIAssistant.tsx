import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { ChatMessage, Language } from '../types';
import { getChatResponse } from '../services/geminiService';
import { Mic, Send, X, Volume2, VolumeX, Sparkles, MessageSquare, ChevronDown, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AIAssistant: React.FC = () => {
  const { t, language } = useLanguage();
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
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getChatResponse(input, language);
      const modelMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: response };
      setMessages(prev => [...prev, modelMsg]);
      
      // Auto-speak if it's a short response or voice mode is active
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
      // In a real app, stop recognition here
    } else {
      setIsListening(true);
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false);
        setInput("Aaj mandi ka rate kya hai?");
      }, 2000);
    }
  };

  const suggestions = [
    "Aaj mandi ka rate kya hai?",
    "Fasal kahan bechni chahiye?",
    "Transport kaise milega?",
    "Weather update for Nashik"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 mx-4 my-2">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 text-white flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
            <Sparkles size={20} className="text-green-100" />
          </div>
          <div>
            <h2 className="font-black text-lg leading-tight">Saarthi AI</h2>
            <p className="text-[10px] text-green-100 uppercase tracking-widest font-bold">Vernacular Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsSpeaking(!isSpeaking)}
            className={`p-2 rounded-xl transition-colors ${isSpeaking ? 'bg-white/30' : 'hover:bg-white/10'}`}
          >
            {isSpeaking ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-green-600 text-white' : 'bg-white text-green-600 border border-gray-100'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-green-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
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

      {/* Suggestions */}
      {messages.length < 3 && (
        <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar bg-gray-50/50">
          {suggestions.map((s, i) => (
            <button 
              key={i}
              onClick={() => setInput(s)}
              className="whitespace-nowrap px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-600 hover:border-green-400 hover:text-green-600 transition-all shadow-sm"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-2xl border border-gray-200 focus-within:border-green-500 focus-within:bg-white transition-all">
          <button 
            onClick={toggleListening}
            className={`p-3 rounded-xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white text-gray-500 shadow-sm hover:text-green-600'}`}
          >
            <Mic size={20} />
          </button>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('askMeAnything')}
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium px-2"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-3 rounded-xl transition-all ${input.trim() ? 'bg-green-600 text-white shadow-lg shadow-green-200' : 'bg-gray-200 text-gray-400'}`}
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-400 mt-3 font-bold uppercase tracking-widest">
          Powered by Saarthi AI • Vernacular Engine
        </p>
      </div>
    </div>
  );
};
