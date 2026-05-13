import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Search, 
  Map as MapIcon, 
  MessageSquare, 
  Fingerprint, 
  Heart, 
  Navigation, 
  Trophy, 
  Download, 
  Settings, 
  Info, 
  LogOut,
  X,
  Award,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { getProfile } from '../services/profileService';
import { NavTab } from './BottomNav';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenProfile: () => void;
  onLogout: () => void;
}

export const SideMenu = ({ isOpen, onClose, activeTab, onTabChange, onOpenProfile, onLogout }: SideMenuProps) => {
  const profile = getProfile();

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore Heritage', icon: Search },
    { id: 'map', label: 'Heritage Map', icon: MapIcon },
    { id: 'guide', label: 'Sage AI Guide', icon: MessageSquare },
    { id: 'passport', label: 'Imperial Passport', icon: Fingerprint },
    { id: 'saved', label: 'Saved Sites', icon: Heart },
    { id: 'trails', label: 'Heritage Trails', icon: Navigation },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'offline', label: 'Offline Guides', icon: Download },
  ];

  const secondaryItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'about', label: 'About Virasat', icon: Info },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[360px] bg-black z-[101] flex flex-col border-r border-primary/20 overflow-hidden"
          >
            {/* Texture background */}
            <div 
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{ 
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGhqTknV1-_565NJQQvgcXUVN1DiFhnGbatxRJgP-MQ4E2ZXoW8l4n0FITdEnJ3D5eW3FUw7pSR9LCKbmlpC3fRTARRHh8QNNOpDqZIowUT4FeuCJyGl-0yVt7FRptdEuXlGMdN3MUtxZG0bZ2CkbDJPtqnTlcy-atbfQu-lfeRcj6_h0XzpIJz800pNqErzUNhQUv4i0eq23AA5qD_lUop4WAnjWiQFCgLD-djOvFAibzmQovzx2QZQQF9jAhqIlW9qv-2Z-3bUFN')`,
                backgroundSize: 'cover'
              }}
            />

            {/* Header */}
            <div className="relative p-8 pt-12 bg-gradient-to-b from-primary/10 to-transparent">
              <button 
                onClick={onClose}
                className="absolute top-8 right-6 text-primary/60 hover:text-primary transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col gap-6">
                <div onClick={() => { onOpenProfile(); onClose(); }} className="cursor-pointer group relative">
                  <div className="w-20 h-20 rounded-2xl p-1 bg-gradient-to-br from-primary via-primary/50 to-primary border-2 border-black relative z-10 overflow-hidden shadow-2xl">
                    <img src={profile.avatarUrl} alt={profile.fullName} className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary text-black px-2 py-0.5 rounded-lg font-bold text-[8px] tracking-widest shadow-lg border-2 border-black z-20">
                    LVL {profile.level}
                  </div>
                </div>

                <div>
                  <h2 className="font-display-lg text-xl text-on-surface uppercase tracking-widest leading-tight">{profile.fullName}</h2>
                  <div className="flex items-center gap-2 text-primary">
                    <Award size={12} />
                    <span className="font-label-md text-[10px] uppercase tracking-widest font-black italic">{profile.rank}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[8px] uppercase tracking-widest font-bold text-primary/60">
                    <span>Royal Progress</span>
                    <span>{Math.round((profile.xp / profile.nextLevelXp) * 100)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(profile.xp / profile.nextLevelXp) * 100}%` }}
                      className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide space-y-8">
              <div className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onTabChange(item.id as NavTab);
                        onClose();
                      }}
                      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all relative group overflow-hidden ${
                        isActive ? 'text-black font-bold' : 'text-on-surface-variant hover:bg-white/5'
                      }`}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="active-bg"
                          className="absolute inset-0 bg-primary"
                        />
                      )}
                      
                      <div className={`relative z-10 ${isActive ? 'text-black' : 'text-primary/60 group-hover:text-primary transition-colors'}`}>
                        <item.icon size={20} />
                      </div>
                      
                      <span className="relative z-10 text-[10px] uppercase tracking-[0.2em]">{item.label}</span>
                      
                      {isActive && (
                        <motion.div 
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="relative z-10 ml-auto"
                        >
                          <Sparkles size={14} className="text-black/40" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Expandable / Categories Section */}
              <div className="space-y-4 px-6">
                <p className="text-[8px] uppercase tracking-[0.4em] text-primary/40 font-bold">Dynastic Archives</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Temples', 'Forts', 'Monuments', 'Palaces'].map(cat => (
                    <button key={cat} className="h-10 border border-white/5 bg-white/5 rounded-xl text-[8px] uppercase tracking-widest text-on-surface-variant hover:border-primary/20 hover:text-primary transition-all">
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Secondary Actions */}
              <div className="space-y-1">
                {secondaryItems.map((item) => (
                  <button
                    key={item.id}
                    className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-on-surface-variant hover:bg-white/5 transition-all text-left group"
                  >
                    <div className="text-primary/40 group-hover:text-primary transition-colors">
                      <item.icon size={18} />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em]">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/5 bg-gradient-to-t from-black to-transparent">
              <button 
                onClick={onLogout}
                className="w-full h-14 rounded-2xl border border-red-500/20 bg-red-500/5 flex items-center justify-center gap-3 text-red-400 font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-red-500/10 transition-all"
              >
                <LogOut size={16} />
                Ascend (Logout)
              </button>
              <p className="text-center text-[8px] text-white/20 mt-4 tracking-widest font-mono">VIRASAT v1.0.4 - KARNATAKA HERITAGE</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
