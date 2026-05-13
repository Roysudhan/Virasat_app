import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { GlassCard, AppHeader } from '../components/CoreUI';
import { SendHorizontal, Mic, Sparkles, Wand2, Info, Headphones, Loader2 } from 'lucide-react';
import { chatWithSage, ChatHistoryItem } from '../services/geminiService';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  images?: string[];
}

export default function Guide({ onOpenProfile, onOpenMenu, id }: { onOpenProfile: () => void, onOpenMenu: () => void, id?: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Greetings, Traveler. I am Master Sage, your Virasat guide. The stones of Karnataka have whispered their stories for centuries. What architectural marvel shall we uncover together today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSend = async (textOverride?: string) => {
    const messageText = textOverride || input;
    if (!messageText.trim() || isThinking) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setChatHistory(prev => [...prev, { role: 'user', parts: [{ text: messageText }] }]);
    if (!textOverride) setInput('');
    setIsThinking(true);

    try {
      const response = await chatWithSage(messageText, chatHistory);
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, aiMsg]);
      setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: response }] }]);
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <PageTransition id={id}>
      <AppHeader title="SAGE AI GUIDE" onProfileClick={onOpenProfile} onMenuClick={onOpenMenu} />
      
      <main className="relative flex flex-col h-[100vh] pt-20 overflow-hidden bg-black">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img 
            className="w-full h-full object-cover grayscale brightness-50" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL8C_TLH5cOPcrtZT1KEHooJHV-HqT0ZS3-dnJ_QT87g48XKVPT-F77fc6VQlxoVPyJa-XqocfCxTtTPUpFe4WapRR7kdh4SwA4OyW6Q6-K7JnzIeBHa_XHQNZPaA406EnT_QjDMcXh_e_VbBSYNI5On694bJccU7xYtRcjALoObaLohRObYxosKIe1KCatMGS5mHbk7FE87knNcQpuqPqfVjI4pm7EafKDNnW7f3U0zuaOIOFBOIjsOE6RsHjDkGvZDozNVl5ZqCQ" 
            alt="Archeology background"
          />
        </div>

        {/* Chat Area */}
        <section ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto px-6 py-8 space-y-10 no-scrollbar">
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-[90%] ${msg.sender === 'user' ? 'ml-auto' : ''}`}
            >
              <div className={cn(
                "p-6 rounded-[2rem] relative overflow-hidden backdrop-blur-2xl shadow-2xl",
                msg.sender === 'ai' 
                  ? "bg-surface/60 border border-primary/20 rounded-tl-none" 
                  : "bg-primary text-on-primary rounded-tr-none"
              )}>
                {msg.sender === 'ai' && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-primary/20 rounded-lg text-primary">
                      <Sparkles size={16} />
                    </div>
                    <h4 className="font-display-lg text-lg text-primary uppercase tracking-widest">Master Sage</h4>
                  </div>
                )}
                <p className={cn(
                  "font-body-md text-sm leading-relaxed whitespace-pre-wrap",
                  msg.sender === 'ai' ? "text-on-surface" : "text-black font-bold"
                )}>
                  {msg.text}
                </p>
                {msg.images && (
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {msg.images.map((img, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="relative group cursor-pointer"
                      >
                        <img src={img} className="w-full h-32 object-cover rounded-2xl border border-white/10 group-hover:scale-105 transition-transform duration-500" alt="Monument" />
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-3 px-2 flex items-center gap-2 opacity-40">
                <span className="text-[10px] uppercase tracking-widest font-bold">
                  {msg.sender === 'ai' ? 'Virasat Engine 5.0' : 'Heritage Seeker'}
                </span>
                <div className="w-1 h-1 bg-on-surface rounded-full"></div>
                <span className="text-[10px] uppercase tracking-widest font-bold">{msg.timestamp}</span>
              </div>
            </motion.div>
          ))}

          {isThinking && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col items-start max-w-[90%]"
            >
              <div className="p-6 rounded-[2rem] bg-surface/60 border border-primary/20 rounded-tl-none backdrop-blur-2xl shadow-2xl flex items-center gap-3">
                <Loader2 size={18} className="text-primary animate-spin" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-primary animate-pulse">Sage is consulting the ancient scrolls...</span>
              </div>
            </motion.div>
          )}
        </section>

        {/* Input Dock - Bento Style */}
        <section className="relative z-20 px-6 pb-32 pt-8">
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none -z-10"></div>
          
          <div className="flex gap-3 overflow-x-auto no-scrollbar mb-6 pb-2">
            {[
              { text: "Legend of Hampi", icon: Wand2 },
              { text: "Hoysala Secrets", icon: Info },
              { text: "Voice Narration", icon: Headphones }
            ].map((hint, i) => (
              <motion.button 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                onClick={() => handleSend(hint.text)}
                disabled={isThinking}
                className="flex-shrink-0 bg-surface/40 backdrop-blur-xl border border-primary/10 text-on-surface-variant px-5 h-12 rounded-2xl text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <hint.icon size={14} />
                {hint.text}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 relative group h-16">
              <div className="absolute inset-0 bg-surface/40 backdrop-blur-2xl rounded-2xl border border-primary/20 group-focus-within:border-primary/50 transition-all"></div>
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={isThinking}
                className="absolute inset-0 bg-transparent border-none focus:ring-0 w-full px-6 text-on-surface placeholder:text-on-surface-variant/40 text-sm disabled:opacity-50"
                placeholder={isThinking ? "Sage is thinking..." : "Speak to the soul of the stones..."}
              />
              <button 
                onClick={() => handleSend()} 
                disabled={isThinking || !input.trim()}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-primary hover:bg-primary/10 rounded-xl transition-all disabled:opacity-30"
              >
                {isThinking ? <Loader2 size={24} className="animate-spin" /> : <SendHorizontal size={24} />}
              </button>
            </div>
            
            <div className="relative">
              <AnimatePresence>
                {isListening && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"
                    transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                  />
                )}
              </AnimatePresence>
              <button 
                onMouseDown={() => setIsListening(true)}
                onMouseUp={() => setIsListening(false)}
                disabled={isThinking}
                className={cn(
                  "relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-2xl disabled:opacity-50",
                  isListening 
                    ? "bg-red-500 text-white scale-95 shadow-[0_0_30px_rgba(239,68,68,0.5)]" 
                    : "bg-primary text-on-primary shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                )}
              >
                <Mic size={28} className={isListening ? "animate-pulse" : ""} />
              </button>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
