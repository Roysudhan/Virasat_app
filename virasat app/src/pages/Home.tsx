import React from 'react';
import { motion } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { GlassCard, PremiumButton, AppHeader } from '../components/CoreUI';
import { MONUMENTS, DYNASTIES, monument } from '../constants';
import { 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  History, 
  Camera, 
  Castle, 
  Shield, 
  Database,
  Search,
  Clock,
  Compass
} from 'lucide-react';

interface HomeProps {
  onSelectMonument: (m: monument) => void;
  onOpenProfile: () => void;
  onOpenMenu: () => void;
  id?: string;
}

export default function Home({ onSelectMonument, onOpenProfile, onOpenMenu, id }: HomeProps) {
  const featured = MONUMENTS.find(m => m.id === 'mysore-palace')!;
  const treasures = MONUMENTS.filter(m => m.id !== 'mysore-palace');

  const getDynastyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Castle': return <Castle size={28} />;
      case 'Shield': return <Shield size={28} />;
      case 'Database': return <Database size={28} />;
      default: return <Castle size={28} />;
    }
  };

  return (
    <PageTransition id={id}>
      <AppHeader onProfileClick={onOpenProfile} onMenuClick={onOpenMenu} />
      
      <main className="pt-16 pb-32">
        {/* Section 1: Immersive Hero */}
        <section className="relative h-[80vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <motion.img 
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 15, ease: "linear" }}
              className="w-full h-full object-cover" 
              src={featured.imageUrl} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2"
            >
              <span className="w-8 h-px bg-primary"></span>
              <span className="font-label-md text-xs text-primary tracking-[0.3em] uppercase">Featured Experience</span>
            </motion.div>
            
            <motion.h2 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="font-display-lg text-5xl md:text-7xl leading-tight text-on-surface"
            >
              Experience the <br/> <span className="text-primary italic">Royal</span> Splendor
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="font-body-md text-on-surface-variant max-w-md text-lg leading-relaxed"
            >
              Journey through the architectural poetry of the Wodeyars, where every stone whispers tales of a glorious past.
            </motion.p>
            
            <div className="pt-6 flex gap-4">
              <PremiumButton onClick={() => onSelectMonument(featured)}>Begin Journey</PremiumButton>
              <PremiumButton variant="secondary" className="group">
                <div className="flex items-center gap-2">
                  Watch Film
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                </div>
              </PremiumButton>
            </div>
          </div>
        </section>

        {/* Section 2: Dynasty Filters */}
        <section className="mt-16 px-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display-lg text-3xl text-on-surface">The Great Dynasties</h3>
            <div className="h-px flex-1 bg-primary/10 ml-8"></div>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
            {DYNASTIES.map((dynasty) => (
              <div key={dynasty.id} className="flex flex-col items-center gap-4 min-w-[120px] group cursor-pointer">
                <div className="w-20 h-20 rounded-2xl bg-surface-container border border-primary/10 flex items-center justify-center text-primary group-hover:border-primary group-hover:bg-primary/10 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-300">
                  {getDynastyIcon(dynasty.icon)}
                </div>
                <div className="text-center">
                  <span className="block font-display-lg text-lg text-on-surface group-hover:text-primary transition-colors">{dynasty.name}</span>
                  <span className="block font-label-md text-[10px] text-on-surface-variant uppercase tracking-widest mt-1 opacity-60">{dynasty.period}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Nearby Treasures */}
        <section className="mt-20">
          <div className="px-6 flex justify-between items-end mb-8">
            <div>
              <h3 className="font-display-lg text-3xl text-on-surface">Nearby Treasures</h3>
              <div className="flex items-center gap-2 mt-2">
                <Compass size={14} className="text-primary" />
                <p className="font-label-md text-[10px] text-primary tracking-[0.2em] uppercase">Within 50KM from you</p>
              </div>
            </div>
            <button className="flex items-center gap-2 font-label-md text-xs text-primary uppercase tracking-widest group">
              View All
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="flex gap-8 overflow-x-auto px-6 pb-8 no-scrollbar">
            {treasures.map((monument) => (
              <motion.div 
                key={monument.id} 
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectMonument(monument)}
                className="min-w-[320px] group cursor-pointer"
              >
                <div className="relative h-[480px] rounded-3xl overflow-hidden border border-primary/10 transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <img className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src={monument.imageUrl} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90"></div>
                  <div className="absolute bottom-0 p-8 w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-primary text-on-primary text-[8px] font-bold tracking-widest uppercase rounded">
                        {monument.category}
                      </span>
                    </div>
                    <h4 className="font-display-lg text-3xl text-on-surface mb-2">{monument.name}</h4>
                    <div className="flex items-center gap-2 text-primary/80">
                      <MapPin size={14} />
                      <span className="font-label-md text-[10px] uppercase tracking-widest">{monument.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 4: AI Insights - Bento Grid */}
        <section className="mt-20 px-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display-lg text-3xl text-on-surface">Curated For You</h3>
            <Sparkles size={24} className="text-primary animate-pulse" />
          </div>
          
          <div className="grid grid-cols-6 gap-4">
            <GlassCard className="col-span-6 md:col-span-4 p-8 border-primary/20 relative overflow-hidden min-h-[260px] flex flex-col justify-between group">
              <div className="absolute -top-12 -right-12 p-4 text-primary/5 group-hover:text-primary/10 transition-colors">
                <Sparkles size={320} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-label-md text-[10px] text-primary uppercase tracking-[0.3em] font-bold">AI Path Discovery</span>
                </div>
                <h4 className="font-display-lg text-4xl text-on-surface mt-2">The Hoysala Trail</h4>
                <p className="font-body-md text-on-surface-variant mt-4 max-w-lg leading-relaxed">
                  Based on your interest in stone carvings, we've synthesized a personalized trail exploring the twin wonders of Belur & Halebidu.
                </p>
              </div>
              <button className="flex items-center gap-3 text-primary font-label-md text-xs uppercase tracking-[0.2em] mt-8 group w-fit">
                Start Discovery 
                <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary group-hover:text-on-primary transition-all">
                  <ArrowRight size={16} />
                </div>
              </button>
            </GlassCard>

            <div className="col-span-3 md:col-span-2 bg-surface-container rounded-3xl p-6 flex flex-col justify-between border border-primary/10 hover:border-primary/30 transition-all group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <History size={24} />
              </div>
              <div>
                <h5 className="font-display-lg text-xl text-on-surface">Ancient Epics</h5>
                <p className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-widest mt-2 group-hover:text-primary transition-colors">Mahakuta Scripts</p>
              </div>
            </div>

            <div className="col-span-3 md:col-span-2 bg-surface-container rounded-3xl p-6 flex flex-col justify-between border border-primary/10 hover:border-primary/30 transition-all group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Camera size={24} />
              </div>
              <div>
                <h5 className="font-display-lg text-xl text-on-surface">Golden Hour</h5>
                <p className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-widest mt-2 group-hover:text-primary transition-colors">Tungabhadra Ghats</p>
              </div>
            </div>
            
            <div className="col-span-6 md:col-span-2 bg-primary text-on-primary rounded-3xl p-6 flex flex-col justify-between shadow-[0_20px_40px_rgba(212,175,55,0.2)] group cursor-pointer">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-black/10 rounded-xl flex items-center justify-center">
                  <Search size={24} />
                </div>
                <div className="px-3 py-1 bg-black/10 rounded-full text-[10px] uppercase tracking-widest font-bold">New</div>
              </div>
              <div>
                <h5 className="font-display-lg text-2xl">Symbol Quest</h5>
                <p className="text-black/60 font-label-md text-[10px] mt-2 uppercase tracking-widest">AR Scavenger Hunt</p>
              </div>
            </div>
            
            <div className="col-span-6 md:col-span-2 bg-surface-container rounded-3xl p-6 flex flex-col justify-between border border-primary/10 group">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-primary" />
                <span className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-widest">Live Updates</span>
              </div>
              <p className="font-display-lg text-lg text-on-surface group-hover:text-primary transition-colors">Crowd level: Low at Virupaksha</p>
            </div>
          </div>
        </section>

        {/* Section 5: The Immortals */}
        <section className="mt-24 mb-20 px-6">
          <div className="mb-10 text-center">
            <h3 className="font-display-lg text-4xl text-on-surface">The Immortals</h3>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="h-px w-12 bg-primary/30"></div>
              <p className="font-label-md text-[10px] text-primary tracking-[0.4em] uppercase">UNESCO World Heritage</p>
              <div className="h-px w-12 bg-primary/30"></div>
            </div>
          </div>
          
          <GlassCard className="relative w-full h-[400px] rounded-[2rem] overflow-hidden group cursor-pointer border-none">
            <img 
              className="w-full h-full object-cover transition-all duration-1500 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKEe2U-h62fnsT8h4H2Uz08R4jVKRyjVWuce476hKbm8wRMI24d4bUN6M42Tp3Q4ZdbBV7JEmGE1bLkMX9dTm7wH9M427PKC42vMJLKMc_1cIHxtTaGa7mQcyF7FtJLefGPIYpgCo0eqUuLNNh1hwmR39G8m9VFCYbmdg-PzFKaAZALYawJNQ1kRw_rtsJ9OI6wrRIADdR2Cqyj5yB1t0xuUY-gBrFRlVA7fppSO1WuoUUaAed6smPKomsU74s6TSNtqX7i7geIDDT" 
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700"></div>
            <div className="absolute inset-x-0 bottom-0 p-12 text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
              <h4 className="font-display-lg text-6xl md:text-8xl text-on-surface tracking-[0.2em] uppercase drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">HAMPI</h4>
              <p className="font-label-md text-xs text-primary uppercase tracking-[0.5em] mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">Kingdom of Victory</p>
            </div>
          </GlassCard>
        </section>
      </main>
    </PageTransition>
  );
}
