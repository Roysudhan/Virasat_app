import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { GlassCard, AppHeader, PremiumButton } from '../components/CoreUI';
import { monument } from '../constants';
import { MapPin, Calendar, Sparkles, ArrowRight, ZoomIn, Scaling, Ruler, Users, Hourglass, X, Navigation, Heart } from 'lucide-react';

interface MonumentDetailProps {
  monument: monument;
  onBack: () => void;
  onOpenProfile: () => void;
  onOpenMenu: () => void;
  onStartNavigation: () => void;
  id?: string;
}

export default function MonumentDetail({ monument, onBack, onOpenProfile, onOpenMenu, onStartNavigation, id }: MonumentDetailProps) {
  const [showMacro, setShowMacro] = useState(false);

  return (
    <PageTransition id={id}>
      <AppHeader showBack onBack={onBack} onProfileClick={onOpenProfile} onMenuClick={onOpenMenu} title={monument.name.split(' ')[0].toUpperCase()} />
      
      <main className="pb-24">
        {/* Cinematic Hero */}
        <section className="relative h-[700px] w-full overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full object-cover" 
            src={monument.imageUrl} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 mb-8">
            <span className="font-label-md text-[10px] text-primary tracking-[0.3em] uppercase mb-3 block">{monument.category}</span>
            <h1 className="font-display-lg text-5xl text-on-background leading-tight mb-6">{monument.name}</h1>
            
            <GlassCard className="p-6 max-w-2xl bg-surface-container/20 border-primary/20 backdrop-blur-md">
              <p className="font-body-lg text-lg text-on-surface-variant italic mb-6 leading-relaxed">
                "{monument.description}"
              </p>
              <div className="flex gap-8 items-center">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-primary shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                  <span className="font-label-md text-xs text-on-surface uppercase tracking-wider">{monument.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-primary shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                  <span className="font-label-md text-xs text-on-surface uppercase tracking-wider">{monument.year || 'Ancient Era'}</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* AI Insight Card */}
        <section className="px-6 -mt-12 relative z-10 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-8 border-primary/30 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30 text-primary">
                  <Sparkles size={24} fill="currentColor" className="animate-pulse" />
                </div>
                <h2 className="font-display-lg text-2xl text-primary">AI Insight: Hidden Geometry</h2>
              </div>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Virasat AI has analyzed the site's layout. Our algorithm detected a perfect mathematical alignment with the celestial cycles of {monument.year || 'the construction era'}, suggesting the builders used advanced astronomical mapping.
              </p>
              <button className="mt-8 flex items-center gap-2 text-primary font-label-md text-xs uppercase tracking-widest group">
                Explore Full Analysis 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </GlassCard>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              onClick={() => setShowMacro(true)}
              className="relative rounded-xl overflow-hidden min-h-[300px] border border-outline-variant/30 cursor-pointer shadow-2xl"
            >
              <img 
                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-nFV-VsgAVcaNocr-XFOSsw-eBKRNMvbgXzafsWImTj9_oPgL1bRaTemXxSWgS6ofR5E4WzwiZ-4JIReq3oAEEL2_yoHLLAtzBUpePTH5Enu-MyQ9wHEv_PlcX0Ew07GUYsWZg6MJjRRxODJfUGwBwp03RWboU2GKsn1RebjNzusZpsOGcyNkWMFeRvEA3IK2vcxm73EEizW-Vt23qgCQPpTRee6qf4xJb1fQS35RhRR1u3ybE7ue2yzqoVulRz3JlkkFFYFkxdDS" 
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="font-label-md text-[10px] text-on-primary bg-primary px-6 py-2.5 rounded-full flex items-center gap-3 uppercase tracking-[0.2em] font-bold shadow-lg">
                  <ZoomIn size={18} /> 8K Macro View
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Architecture Schematic Segment */}
        {monument.details && (
          <section className="px-6 mb-16">
            <div className="text-center mb-12">
              <h3 className="font-display-lg text-4xl text-on-background tracking-widest uppercase">Architectural Schematic</h3>
              <p className="font-label-md text-[10px] text-primary tracking-[0.5em] uppercase mt-2">Precision Engineering</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Pillars', value: monument.details.pillars, icon: Ruler },
                { label: 'Madanikas', value: monument.details.madanikas, icon: Users },
                { label: 'Artifacts', value: monument.details.elephants, icon: Scaling },
                { label: 'History', value: monument.details.yearsToBuild, icon: Hourglass }
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-surface-container/40 rounded-xl border border-outline-variant/20 text-center flex flex-col justify-center group hover:border-primary/40 transition-all shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                >
                  <div className="flex justify-center mb-4 text-primary opacity-40 group-hover:opacity-100 transition-opacity">
                    <stat.icon size={24} />
                  </div>
                  <span className="block text-primary font-display-lg text-4xl mb-2">{stat.value}</span>
                  <span className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-widest">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* AR Modal Simulation */}
        <AnimatePresence>
          {showMacro && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black bg-opacity-95 flex flex-col pt-12"
            >
              <button 
                onClick={() => setShowMacro(false)}
                className="absolute top-8 right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-on-surface transition-all"
              >
                <X size={24} />
              </button>
              
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="relative w-full max-w-4xl aspect-[4/5] md:aspect-video rounded-2xl overflow-hidden border border-primary/40 shadow-[0_0_100px_rgba(212,175,55,0.2)]">
                  <img 
                    className="w-full h-full object-cover scale-150" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-nFV-VsgAVcaNocr-XFOSsw-eBKRNMvbgXzafsWImTj9_oPgL1bRaTemXxSWgS6ofR5E4WzwiZ-4JIReq3oAEEL2_yoHLLAtzBUpePTH5Enu-MyQ9wHEv_PlcX0Ew07GUYsWZg6MJjRRxODJfUGwBwp03RWboU2GKsn1RebjNzusZpsOGcyNkWMFeRvEA3IK2vcxm73EEizW-Vt23qgCQPpTRee6qf4xJb1fQS35RhRR1u3ybE7ue2yzqoVulRz3JlkkFFYFkxdDS" 
                  />
                  <div className="absolute inset-0 pointer-events-none border-[40px] border-black/20"></div>
                  {/* AR UI details */}
                  <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                    <div className="glass-panel p-4 rounded-lg bg-black/60 border-primary/40">
                      <p className="font-label-md text-[10px] text-primary uppercase mb-1">Material Source</p>
                      <p className="font-body-md text-sm text-on-surface">Chloritic Schist (Soapstone)</p>
                    </div>
                    <div className="glass-panel p-4 rounded-lg bg-black/60 border-primary/40 text-right">
                      <p className="font-label-md text-[10px] text-primary uppercase mb-1">Carving Depth</p>
                      <p className="font-body-md text-sm text-on-surface">14.5 cm undercut</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sticky Actions */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent z-40 flex gap-4">
           <PremiumButton 
             onClick={onStartNavigation}
             className="flex-1 h-14 flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(212,175,55,0.4)]"
           >
             <Navigation size={20} className="group-hover:rotate-45 transition-transform" />
             NAVIGATE TO SITE
           </PremiumButton>
           <button className="w-14 h-14 bg-surface-container rounded-lg border border-outline-variant/30 flex items-center justify-center text-primary group active:scale-95 transition-all hover:border-primary/40">
             <Heart size={24} className="transition-all group-hover:scale-110 group-hover:fill-primary" />
           </button>
        </div>
      </main>
    </PageTransition>
  );
}
