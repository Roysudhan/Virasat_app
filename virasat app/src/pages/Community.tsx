import React from 'react';
import { motion } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { GlassCard, AppHeader, PremiumButton } from '../components/CoreUI';
import { Heart, Bookmark, Share2, Mic2, Play, Camera, ChevronRight, MessageSquare, Quote } from 'lucide-react';

export default function Community({ onOpenProfile, onOpenMenu, id }: { onOpenProfile: () => void, onOpenMenu: () => void, id?: string }) {
  const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

  return (
    <PageTransition id={id}>
      <AppHeader title="COMMUNITY" onProfileClick={onOpenProfile} onMenuClick={onOpenMenu} />
      
      <main className="pt-24 pb-32 px-6 space-y-12 h-[100vh] overflow-y-auto no-scrollbar bg-black">
        {/* Heritage Hero Section */}
        <section className="relative rounded-[2.5rem] overflow-hidden h-[340px] flex items-end p-8 border border-primary/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <img className="absolute inset-0 w-full h-full object-cover grayscale brightness-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADg1UQen6sJK1mnaBuixTNLLpTFB3i9tKNzOhd7S8PesysclltFjvkiX-zcQ-TdkgFEhDVFu4NZp1xhu6zBuX6q4EBnUmSnFwwg_LX-hgTvhEDEBcmRwpT7ASZxfZfwRnwzISipK79nQ4_GbzpYjpSE_t6HoWqDLCEJTzctJxIz70SK7XDV1QJ0ACX6-yNXIvqMYrYTWrqHD82oT1ndAUY90co_j6SpgVyOAL9UKV5W4EUqvW0bj0m_kWDL05S9EKlNt9fRtumrJ3J" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-px bg-primary"></span>
              <span className="font-label-md text-[10px] text-primary uppercase tracking-[0.3em] font-bold">The Heritage Circle</span>
            </div>
            <h2 className="font-display-lg text-4xl text-on-surface leading-tight tracking-wide">Preserving the <br /> <span className="italic">Soul</span> of Karnataka</h2>
          </div>
        </section>

        {/* Stories - Bento Grid Approach */}
        <section className="space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="font-display-lg text-3xl text-on-surface">Traveler Stories</h3>
              <p className="font-label-md text-[10px] text-primary tracking-widest uppercase mt-2">Tales from the stones</p>
            </div>
            <button className="flex items-center gap-2 text-[10px] text-primary uppercase tracking-[0.2em] font-bold h-10 px-4 bg-primary/10 rounded-xl hover:bg-primary hover:text-on-primary transition-all">
              Join Circle
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <GlassCard className="rounded-[2.5rem] border-primary/10 overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZumxry7ZS63cyhqnFTYtuhNojunE0cZmPYNG6Yi73eTzvqUrTdxvQywJQAehcr6Lju0cYDMSK141cDBu7eWHzFRlr9crL_Q_LSfNQ9zDLKa8Ki2unB254rAfbuiyKU4V_vsYuaGb_C3eNc--snrY5pHnzD3bi3WiCgWinj4oDYCEMvS1W34SDBnF7X_utD4F-_UxgfFrGUMhOyBjx6VnhCp8lcyeAqyCBCTzLt_uY2phU0JT-XFzHmoeTVL_XwyCsVG3Vcfopd8Uf" />
                <div className="absolute top-6 right-6 bg-primary text-on-primary font-bold text-[8px] px-3 py-1 rounded-lg tracking-[0.2em] uppercase shadow-2xl">FEATURED STORY</div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/20 flex items-center justify-center font-display-lg text-xl text-primary overflow-hidden">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7N6I3IzjeFhhhls95R3jXdIhcWD8P8Q_pnGYBJd3dcymO5nXAK8AwUvIZ3ZJW0BuVEdEzkPC6NK1gBaAawFsjcmsTY_46KysAo7y5Mw4dJjWPhJ1aDUnXb7Pbgg3FfJnCbDIGkjGo7fdhfGjkjX3wr9AqWWXcuj0lIh7jFX_Y7Oh_HLaw5EOKhuTXzUv0zh4PvITKqfY643E6rTUadybFezmo_Fvi4JSOeEbCPZC8Hty4zWIjb5-oJJe9mhPhP4IcsS_Sp52EMD0m" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-display-lg text-lg text-on-surface">Ananya Sharma</p>
                    <p className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-widest opacity-60">Architect • 2h ago</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-2 text-primary/40">
                    <Quote size={24} fill="currentColor" className="rotate-180" />
                  </div>
                  <h4 className="font-display-lg text-2xl text-on-surface leading-snug group-hover:text-primary transition-colors">The Hidden Echoes of Chennakeshava</h4>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed opacity-80">The morning sun hit the pillars at exactly 7 AM, revealing carvings I had missed for years. It felt like the stone was breathing, whispering secrets of King Vishnuvardhana...</p>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-white/5">
                   <div className="flex gap-6">
                     <button className="flex items-center gap-2 text-primary group/btn">
                       <Heart size={18} className="group-hover/btn:scale-125 group-hover/btn:fill-primary transition-all" />
                       <span className="text-[10px] font-bold tracking-widest">1.2k</span>
                     </button>
                     <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors group/btn">
                       <MessageSquare size={18} className="group-hover/btn:scale-110" />
                       <span className="text-[10px] font-bold tracking-widest uppercase">84 Replies</span>
                     </button>
                   </div>
                   <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                     <Share2 size={18} />
                   </button>
                </div>
              </div>
            </GlassCard>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container/40 backdrop-blur-xl rounded-[2.5rem] border border-primary/10 p-6 flex flex-col justify-between group hover:border-primary/40 transition-all cursor-pointer">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Bookmark size={20} />
                </div>
                <div className="mt-4">
                  <h5 className="font-display-lg text-lg text-on-surface">Saved Discoveries</h5>
                  <p className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">12 Artifacts</p>
                </div>
              </div>
              <div className="bg-primary rounded-[2.5rem] p-6 flex flex-col justify-between shadow-2xl group cursor-pointer hover:brightness-110 transition-all">
                <div className="w-10 h-10 bg-black/10 rounded-xl flex items-center justify-center text-black">
                  <Play size={20} fill="currentColor" />
                </div>
                <div className="mt-4">
                  <h5 className="font-display-lg text-lg text-black">Watch Live Circle</h5>
                  <p className="font-label-md text-[10px] text-black/60 uppercase tracking-widest mt-1">320 Travelers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Oral Histories - Audio Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Mic2 size={24} />
            </div>
            <div>
              <h3 className="font-display-lg text-3xl text-on-surface">Oral Histories</h3>
              <p className="font-label-md text-[10px] text-primary tracking-widest uppercase mt-1">Living voices of Karnataka</p>
            </div>
          </div>
          <div className="space-y-4">
             {[
               { title: "The Legend of the Stone Chariot", narrator: "Shri Raghunath Rao", time: "4:22", active: true },
               { title: "Folklore of the Western Ghats", narrator: "Meera Bai", time: "3:15", active: false }
             ].map((audio, i) => (
               <div key={i} className="flex items-center gap-6 p-6 rounded-[2rem] bg-surface-container/20 border border-primary/5 hover:border-primary/20 hover:bg-surface-container/40 transition-all cursor-pointer group">
                 <button className={cn(
                   "w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-xl",
                   audio.active ? "bg-primary text-on-primary scale-105" : "bg-surface-container text-primary group-hover:scale-105"
                 )}>
                   <Play size={24} fill="currentColor" />
                 </button>
                 <div className="flex-1">
                    <h5 className="font-display-lg text-xl text-on-surface group-hover:text-primary transition-colors">{audio.title}</h5>
                    <p className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-widest opacity-60 mt-1">{audio.narrator} • {audio.time}</p>
                 </div>
                 <div className="hidden md:flex flex-shrink-0 items-center gap-1.5 h-8">
                    {[0.4, 0.7, 1, 0.6, 0.8, 0.3].map((h, j) => (
                      <motion.div 
                        key={j} 
                        animate={audio.active ? { height: [h*100+'%', (h*0.5)*100+'%', h*100+'%'] } : {}}
                        transition={{ repeat: Infinity, duration: 1 + j*0.1 }}
                        className={cn(
                          "w-1 rounded-full",
                          audio.active ? "bg-primary" : "bg-white/10"
                        )}
                        style={{ height: h*100 + '%' }}
                      />
                    ))}
                 </div>
                 <ChevronRight size={20} className="text-primary/40 group-hover:text-primary transition-colors" />
               </div>
             ))}
          </div>
        </section>

        {/* Global CTA */}
        <section className="pb-40 pt-10">
           <PremiumButton className="w-full h-20 rounded-[2.5rem] text-sm group">
             <div className="flex items-center justify-center gap-4">
               <div className="p-2 bg-on-primary/10 rounded-xl group-hover:scale-110 transition-transform">
                 <Camera size={24} />
               </div>
               <span className="tracking-[0.2em]">SHARE YOUR DISCOVERY</span>
             </div>
           </PremiumButton>
        </section>
      </main>
    </PageTransition>
  );
}
