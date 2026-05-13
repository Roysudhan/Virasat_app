import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { GlassCard, AppHeader } from '../components/CoreUI';
import { Award, Castle, Shield, Landmark, Trophy, Library, Clock, ChevronRight, User, Fingerprint, Settings } from 'lucide-react';
import { getProfile, UserProfile } from '../services/profileService';

export default function Passport({ onOpenProfile, onOpenMenu, id }: { onOpenProfile: () => void, onOpenMenu: () => void, id?: string }) {
  const [profile, setProfile] = useState<UserProfile>(getProfile());
  const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

  useEffect(() => {
    // Refresh profile when page opens
    setProfile(getProfile());
  }, []);

  return (
    <PageTransition id={id}>
      <AppHeader title="PASSPORT" onMenuClick={onOpenMenu} action={
        <button 
          onClick={onOpenProfile}
          className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary"
        >
          <Settings size={20} />
        </button>
      } />
      
      <main className="pt-24 pb-32 px-6 space-y-12 h-[100vh] overflow-y-auto no-scrollbar bg-black">
        {/* Passport Card - High Luxury */}
        <section className="relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative px-8 py-12 rounded-[2.5rem] border border-primary/20 bg-surface/40 backdrop-blur-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
          >
            {/* Background Texture/Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/black-paper.png')" }}></div>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
            
            <div className="absolute top-8 right-8 text-primary/20">
              <Award size={120} strokeWidth={0.5} />
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <button 
                onClick={onOpenProfile}
                className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-primary/20 to-transparent p-0.5 border border-primary/30 mb-6 shadow-2xl relative group"
              >
                <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-[2rem] transition-transform group-hover:scale-105" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-black shadow-lg border-2 border-black">
                  <Fingerprint size={16} strokeWidth={3} />
                </div>
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] flex items-center justify-center">
                  <User size={24} className="text-white drop-shadow-lg" />
                </div>
              </button>

              <h2 className="font-display-lg text-4xl text-primary tracking-[0.2em] uppercase text-center">Imperial <br /> Passport</h2>
              <p className="font-label-md text-[10px] text-primary/60 uppercase tracking-[0.4em] mt-2">Series {profile.passportId.split('-')[0]}-{profile.passportId.split('-')[1]}</p>
            </div>

            <div className="mt-16 space-y-6 relative z-10">
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Bearer Name</p>
                  <span className="font-display-lg text-2xl text-on-surface">{profile.fullName}</span>
                </div>
                <div className="text-right">
                  <p className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Rank</p>
                  <span className="font-display-lg text-2xl text-primary font-bold italic">{profile.rank}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                  <span className="text-on-surface-variant">Karma Level {profile.level}</span>
                  <span className="text-primary">Next: Immortal</span>
                </div>
                <div className="h-2 w-full bg-black rounded-full overflow-hidden border border-primary/10 p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(profile.xp / profile.nextLevelXp) * 100}%` }}
                    transition={{ delay: 0.8, duration: 2, ease: "circOut" }}
                    className="h-full bg-gradient-to-r from-primary/40 via-primary to-primary/40 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.6)]" 
                  />
                </div>
                <p className="text-right font-mono text-[10px] text-primary/60">{profile.xp.toLocaleString()} / {profile.nextLevelXp.toLocaleString()} XP</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Dynasty Mastery - Bento Grid */}
        <section className="space-y-8">
          <div className="flex items-end gap-3">
            <h3 className="font-display-lg text-3xl text-on-surface">Royal Seals</h3>
            <div className="h-px flex-1 bg-white/5 mb-2"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: '1', title: 'Hoysala\nArchitect', icon: Castle, active: true },
              { id: '2', title: 'Chola\nVoyager', icon: Landmark, active: false },
              { id: '3', title: 'Chalukya\nSage', icon: Shield, active: true },
              { id: '4', title: 'Vijayanagara\nKing', icon: Trophy, active: false }
            ].map((badge, i) => (
              <motion.div 
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "relative p-6 rounded-[2rem] border transition-all duration-500 overflow-hidden group",
                  badge.active 
                    ? "bg-surface/40 border-primary/20 shadow-2xl" 
                    : "bg-surface/20 border-white/5 opacity-40 grayscale"
                )}
              >
                {badge.active && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent group-hover:opacity-100 transition-opacity"></div>
                )}
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 relative z-10",
                  badge.active ? "bg-primary/20 text-primary shadow-[0_0_20px_rgba(212,175,55,0.2)]" : "bg-white/5 text-white/20"
                )}>
                  <badge.icon size={24} />
                </div>
                <span className={cn(
                  "font-display-lg text-lg leading-relaxed whitespace-pre-wrap relative z-10",
                  badge.active ? "text-on-surface" : "text-white/40"
                )}>{badge.title}</span>
                <ChevronRight size={16} className="absolute bottom-6 right-6 text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline - Elegant Modern List */}
        <section className="space-y-8 pb-40">
          <div className="flex items-center justify-between">
            <h3 className="font-display-lg text-3xl text-on-surface">Visits Timeline</h3>
            <Library size={24} className="text-primary/40" />
          </div>
          
          <div className="space-y-6">
            {[
              { site: 'Chennakeshava Temple', date: '2 days ago', note: 'Unlocked "Darpana Sundari" insight.', xp: '+50', icon: Clock },
              { site: 'Badami Caves', date: 'Oct 15', note: 'Explored the sandstone carvings of Cave 3.', xp: '+120', icon: Clock }
            ].map((v, i) => (
              <GlassCard key={v.site} className="p-8 rounded-[2.5rem] border-white/5 hover:border-primary/20 transition-all group">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-white/5 rounded-[1.25rem] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-500">
                    <v.icon size={24} />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-display-lg text-xl text-on-surface mb-1">{v.site}</h4>
                        <span className="font-label-md text-[10px] text-primary uppercase tracking-[0.2em] font-bold">{v.date}</span>
                      </div>
                      <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-xl border border-primary/20 text-[10px] font-bold uppercase tracking-widest">{v.xp} XP</span>
                    </div>
                    <p className="font-body-md text-sm text-on-surface-variant italic leading-relaxed backdrop-blur-sm bg-white/5 p-4 rounded-2xl border border-white/5">
                      "{v.note}"
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
