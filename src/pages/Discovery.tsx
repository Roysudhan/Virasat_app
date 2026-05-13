import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { GlassCard, AppHeader } from '../components/CoreUI';
import { MONUMENTS, monument } from '../constants';
import { Search, QrCode, ChevronRight, Compass, Filter } from 'lucide-react';

interface DiscoveryProps {
  onSelectMonument: (m: monument) => void;
  onOpenScanner: () => void;
  onOpenProfile: () => void;
  onOpenMenu: () => void;
  id?: string;
}

export default function Discovery({ onSelectMonument, onOpenScanner, onOpenProfile, onOpenMenu, id }: DiscoveryProps) {
  const [search, setSearch] = useState("");
  const filtered = MONUMENTS.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageTransition id={id}>
      <AppHeader title="DISCOVERY" onProfileClick={onOpenProfile} onMenuClick={onOpenMenu} />
      
      <main className="pt-24 px-6 pb-32">
        {/* Search & Actions Bar */}
        <section className="mb-10">
          <div className="flex gap-4">
            <div className="flex-1 relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 group-focus-within:text-primary transition-colors">
                <Search size={20} />
              </div>
              <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-surface-container/40 backdrop-blur-xl border border-primary/10 focus:border-primary/40 focus:ring-0 rounded-2xl h-16 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/40 transition-all"
                placeholder="Search monuments, eras..."
              />
            </div>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={onOpenScanner}
              className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-on-primary shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all"
            >
              <QrCode size={24} />
            </motion.button>
          </div>

          <div className="flex items-center gap-4 mt-8 pb-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-container border border-primary/10 text-primary flex-shrink-0">
              <Filter size={18} />
            </div>
            {["All", "Temples", "UNESCO", "Palaces", "Caves"].map((tag) => (
              <button 
                key={tag}
                className={`px-6 h-10 rounded-xl font-label-md text-[10px] uppercase tracking-widest border transition-all flex-shrink-0 ${
                  tag === "All" 
                    ? "bg-primary text-on-primary border-primary" 
                    : "border-primary/10 bg-surface-container/40 text-on-surface-variant hover:border-primary/30"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        {/* Results Grid - Bento Style */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((m, idx) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                layout
                className="group cursor-pointer"
                onClick={() => onSelectMonument(m)}
              >
                <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden border border-primary/10 group-hover:border-primary/40 transition-all duration-500 shadow-2xl">
                  <img src={m.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  <div className="absolute top-6 left-6 flex items-center gap-2">
                    <div className="p-1.5 bg-primary rounded-lg text-on-primary">
                      <Compass size={14} />
                    </div>
                    <span className="px-3 py-1 bg-surface/60 backdrop-blur-md rounded-lg text-[10px] uppercase tracking-widest text-primary font-bold border border-primary/20">
                      {m.category}
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div className="space-y-1">
                      <h4 className="font-display-lg text-3xl text-on-surface tracking-wide">{m.name}</h4>
                      <p className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-[0.2em] opacity-80">{m.location}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all group-hover:border-primary">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      </main>
    </PageTransition>
  );
}
