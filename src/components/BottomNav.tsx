import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Home, Map, Compass, Sparkles, Users, BookOpen } from 'lucide-react';

export type NavTab = 'home' | 'map' | 'explore' | 'guide' | 'community' | 'passport';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  id?: string;
}

export const BottomNav = ({ activeTab, onTabChange, id }: BottomNavProps) => {
  const tabs: { id: NavTab; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'guide', label: 'AI Guide', icon: Sparkles },
    { id: 'community', label: 'Culture', icon: Users },
    { id: 'passport', label: 'Passport', icon: BookOpen },
  ];

  return (
    <nav id={id} className="fixed bottom-6 left-6 right-6 z-50">
      <div className="bg-surface/30 backdrop-blur-2xl border border-primary/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex justify-around items-center h-20 px-4 relative overflow-hidden">
        {/* Glow Background Effect */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center transition-all duration-300 px-3 py-1 rounded-xl relative group",
                isActive ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="active-nav-bg"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  />
                )}
              </AnimatePresence>

              <div className="relative">
                <Icon 
                  size={22} 
                  strokeWidth={isActive ? 2.5 : 1.5}
                  className={cn(
                    "transition-all duration-300",
                    isActive ? "scale-110 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" : "group-hover:scale-110"
                  )}
                />
                {isActive && (
                  <motion.div 
                    layoutId="active-nav-dot"
                    className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(212,175,55,1)]"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  />
                )}
              </div>
              
              <span className={cn(
                "text-[10px] mt-1 font-bold tracking-[0.1em] transition-all uppercase",
                isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"
              )}>
                {tab.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute -bottom-1 w-8 h-0.5 bg-primary rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
