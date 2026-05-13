import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { GlassCard, PremiumButton } from '../components/CoreUI';
import { MONUMENTS, monument } from '../constants';
import { X, Zap, Sparkles, BrainCircuit, Scan, ShieldCheck, Bookmark } from 'lucide-react';

interface ScannerProps {
  onClose: () => void;
  onIdentify: (m: monument) => void;
  id?: string;
}

export default function Scanner({ onClose, onIdentify, id }: ScannerProps) {
  const [analyzing, setAnalyzing] = useState(true);
  const identified = MONUMENTS.find(m => m.id === 'belur')!;

  useEffect(() => {
    const timer = setTimeout(() => setAnalyzing(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageTransition id={id}>
      <main className="relative h-[100vh] w-screen overflow-hidden bg-black">
        {/* Cinematic Feed Simulation */}
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover grayscale-[0.2] brightness-[0.7]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPHDVglgtFJMMhf1pCzDYxjifF2fPrguV4yT6O4R1T1dOahyfMH7QhtnV1J7oTNCUa8H6uGzdUrzSAt-szUiSbPcMf5V9On2pWfhdqn1dTZJUOiCaiuwbxwL55_LozstTYR3NXa51jVWK8pB6zW2FibzttUNqFBXLS0zvP86NeE9Qsz-r67ljjRTzU7LKNdDJ9hThclkuf1gdldULE9BbK6oWIyUDJnak8Y1tbB3awcmOLEUF5eGC1ggg--xhqOU_66QPha2wx6LRy" 
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0)_20%,rgba(0,0,0,0)_80%,rgba(0,0,0,0.6)_100%)]"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* UI Header */}
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 h-20 w-full">
          <button 
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-black/40 backdrop-blur-2xl border border-white/10 text-primary hover:bg-primary hover:text-on-primary transition-all shadow-2xl"
          >
            <X size={24} />
          </button>
          <div className="flex flex-col items-center">
            <h1 className="font-display-lg text-lg tracking-[0.4em] text-primary uppercase font-bold">Virasat Scan</h1>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
              <span className="text-[8px] text-white/40 uppercase tracking-widest font-bold">Neural Engine Active</span>
            </div>
          </div>
          <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-black/40 backdrop-blur-2xl border border-white/10 text-primary">
            <Zap size={24} />
          </button>
        </header>

        {/* Scanner Frame */}
        <div className="absolute inset-0 flex items-center justify-center z-10 p-10">
          <div className="relative w-full max-w-sm aspect-square">
            {/* Corner Brackets - Modern Stylized */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-primary rounded-tl-3xl shadow-[0_0_30px_rgba(212,175,55,0.6)]"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-primary rounded-tr-3xl shadow-[0_0_30px_rgba(212,175,55,0.6)]"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-primary rounded-bl-3xl shadow-[0_0_30px_rgba(212,175,55,0.6)]"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-primary rounded-br-3xl shadow-[0_0_30px_rgba(212,175,55,0.6)]"></div>
            
            {/* Neural Pulse Layer */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div 
                animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-full h-full border-2 border-primary/20 rounded-3xl"
              />
              <Scan size={64} className="text-primary/20 animate-pulse" />
            </div>

            {/* Scanning Line - Cinematic Glow */}
            <motion.div 
              animate={{ top: ['4%', '92%', '4%'] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute inset-x-4 h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_25px_#D4AF37] opacity-100 z-20 rounded-full"
            />
            
            {/* Target Reticle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_#D4AF37] z-20"></div>
          </div>

          <div className="absolute bottom-32 text-center w-full px-10">
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-black/40 backdrop-blur-2xl border border-white/5"
            >
              <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#D4AF37]"></div>
              <p className="font-label-md text-[10px] text-primary tracking-[0.4em] font-bold uppercase transition-all">
                {analyzing ? 'Analyzing Architecture' : 'Marker Identified'}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Identification Toast */}
        <AnimatePresence>
          {!analyzing && (
            <motion.div 
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute bottom-10 left-6 right-6 z-50"
            >
              <GlassCard className="p-8 rounded-[2.5rem] border-primary/30 bg-surface/80 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.9)] overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-primary/10 -rotate-12 pointer-events-none">
                  <ShieldCheck size={120} />
                </div>
                
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-start">
                    <div className="p-4 bg-primary/20 rounded-2xl text-primary animate-bounce">
                      <Sparkles size={28} fill="currentColor" />
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/20 text-[8px] font-bold text-primary uppercase tracking-widest">
                        High Confidence
                      </div>
                      <p className="font-display-lg text-lg text-primary mt-1 italic">98.4% Match</p>
                    </div>
                  </div>

                  <div>
                    <h2 className="font-display-lg text-3xl text-on-surface mb-2 leading-tight tracking-wide">{identified.name}</h2>
                    <div className="flex gap-2 mb-4">
                      <span className="text-[10px] text-on-surface-variant uppercase tracking-widest bg-white/5 px-2 py-1 rounded-lg">Dynasty: Hoysala</span>
                      <span className="text-[10px] text-on-surface-variant uppercase tracking-widest bg-white/5 px-2 py-1 rounded-lg">Stellate Plan</span>
                    </div>
                    <p className="font-body-md text-sm text-on-surface-variant leading-relaxed opacity-80">
                      Vision system confirms star-shaped foundation with elaborate friezes characteristic of 12th-century Hoysala master craftsmanship.
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-white/5">
                    <PremiumButton 
                      onClick={() => onIdentify(identified)}
                      className="flex-1 py-4 text-xs font-bold tracking-[0.2em]"
                    >
                      EXPLORE SANCTUARY
                    </PremiumButton>
                    <button className="w-16 h-16 bg-white/5 hover:bg-primary hover:text-on-primary rounded-2xl flex items-center justify-center transition-all border border-white/5">
                      <Bookmark size={24} />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </PageTransition>
  );
}
