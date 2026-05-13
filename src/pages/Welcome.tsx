import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { PremiumButton } from '../components/CoreUI';
import { ChevronDown, Sparkles, Compass } from 'lucide-react';

interface WelcomeProps {
  onFinish: () => void;
  id?: string;
}

export default function Welcome({ onFinish, id }: WelcomeProps) {
  // Generate random particles for atmospheric effect
  const particles = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5
    }));
  }, []);

  return (
    <motion.div 
      id={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070502] overflow-hidden"
    >
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1, filter: 'blur(10px) brightness(0)' }}
          animate={{ scale: 1, filter: 'blur(0px) brightness(1)' }}
          transition={{ duration: 4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-full"
        >
          {/* Main Heritage Background - Hampi Corridor/Gateway Feel */}
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="w-full h-full relative"
          >
            <img 
              className="w-full h-full object-cover grayscale-[0.2] contrast-[1.2] brightness-[0.3]"
              src="https://images.unsplash.com/photo-1600063255140-6927d6364177?auto=format&fit=crop&q=80&w=2400" 
              alt="Ancient Temple Corridor"
              referrerPolicy="no-referrer"
            />
            {/* Perspective Overlay - Ancient Pathway feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070502] via-transparent to-transparent opacity-90"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(7,5,2,0.8)_100%)]"></div>
          </motion.div>
          
          {/* Layered Cinematic Fog/Mist */}
          <motion.div 
            animate={{ x: [-100, 100], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/40 via-white/5 to-transparent blur-3xl pointer-events-none"
          />

          {/* Divine Light Rays (God Rays) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`ray-${i}`}
                initial={{ opacity: 0, rotate: -25 }}
                animate={{ opacity: [0, 0.15, 0], x: [-20, 20] }}
                transition={{ duration: 10 + i * 2, repeat: Infinity, delay: i * 3 }}
                className="absolute top-[-50%] left-[20%] w-32 h-[200%] bg-gradient-to-b from-primary/30 to-transparent blur-[120px] origin-top"
                style={{ left: `${20 + i * 15}%` }}
              />
            ))}
          </div>

          {/* Glowing Diyas (Ancient Lamps) */}
          <div className="absolute bottom-20 left-0 right-0 h-32 z-10 pointer-events-none flex justify-around items-end px-12">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`diya-${i}`}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.7, 0.3],
                  filter: ['blur(10px)', 'blur(15px)', 'blur(10px)']
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }}
                className="w-12 h-12 rounded-full bg-[#ff9933] opacity-40 shadow-[0_0_60px_#ff6600]"
              />
            ))}
          </div>

          {/* Film Grain & Dust Particles texture */}
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-screen" 
               style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
        </motion.div>
      </div>

      {/* Atmospheric Particles */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: `${p.x}%`, y: `${p.y}%` }}
            animate={{ 
              opacity: [0, 0.4, 0],
              y: [`${p.y}%`, `${p.y - 20}%`],
              x: [`${p.x}%`, `${p.x + (Math.random() - 0.5) * 10}%`]
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity, 
              delay: p.delay,
              ease: "linear"
            }}
            className="absolute bg-primary/40 rounded-full blur-[1px]"
            style={{ width: p.size, height: p.size }}
          />
        ))}
      </div>

      {/* Main Content Assembly */}
      <main className="relative z-20 flex flex-col items-center justify-between h-full w-full max-w-4xl px-8 pt-24 pb-16">
        
        {/* Top Branding - Subtle */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.6 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          <span className="font-label-md text-[10px] uppercase tracking-[0.8em] font-bold text-primary">Imperial Chronicles of Karnataka</span>
        </motion.div>

        {/* Centerpiece Hero Text */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Title with Glow and Depth */}
            <h1 className="relative font-serif text-[15vw] md:text-9xl leading-none text-white tracking-[0.25em] font-black uppercase drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                style={{ fontFamily: "'Cinzel', serif" }}>
              VIRASAT
              <span className="absolute inset-0 text-primary mix-blend-overlay blur-[25px] opacity-60 select-none">VIRASAT</span>
            </h1>
            
            {/* Elegant Subtitle with Torch Glow effect */}
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.5, duration: 1.5 }}
              className="flex items-center gap-6 mt-6 justify-center"
            >
              <div className="h-px flex-1 bg-gradient-to-l from-primary/80 to-transparent"></div>
              <p className="font-serif italic text-2xl md:text-3xl text-primary/90 tracking-[0.15em] drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                The Sanctuary of Stone
              </p>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/80 to-transparent"></div>
            </motion.div>
          </motion.div>
          
          {/* Emotional Quote */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 2.2, duration: 1.5 }}
            className="mt-12 max-w-md font-body-md text-sm md:text-base text-on-surface/70 leading-relaxed tracking-wider font-light"
          >
            "When the gods carved their dreams into the bedrock of Karnataka, 
            they left behind a legacy that time itself could not erase."
          </motion.p>
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 1 }}
          className="flex flex-col items-center gap-12"
        >
          <div className="relative group cursor-pointer" onClick={onFinish}>
            {/* Animated Ring - Sacred Halo effect */}
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.1, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-12 rounded-full border border-primary/30 bg-primary/10 blur-xl"
            />
            
            <PremiumButton 
              id="enter-sanctuary"
              className="relative px-14 py-6 rounded-full bg-primary text-black font-bold uppercase tracking-[0.5em] text-[10px] transition-all hover:scale-105 shadow-[0_0_50px_rgba(212,175,55,0.4)] flex items-center gap-3 active:scale-95 group-hover:shadow-[0_0_80px_rgba(212,175,55,0.8)]"
            >
              <Sparkles size={18} className="animate-pulse" />
              Begin Pilgrimage
            </PremiumButton>
          </div>

          <motion.div
            animate={{ y: [0, 5, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[9px] uppercase tracking-[0.5em] text-primary/60 font-bold">Scroll to Enter</span>
            <ChevronDown size={20} className="text-primary/60" />
          </motion.div>
        </motion.div>

      </main>

      {/* Aesthetic Border Frame */}
      <div className="absolute inset-0 border-[3rem] border-black pointer-events-none z-30 opacity-40"></div>
      
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.9)] pointer-events-none z-30"></div>
    </motion.div>
  );
}
