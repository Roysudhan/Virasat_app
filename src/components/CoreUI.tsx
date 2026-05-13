import React from 'react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';
import { Menu, ArrowLeft } from 'lucide-react';

export const StoneTexture = () => (
  <div 
    className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100]" 
    style={{ 
      backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGhqTknV1-_565NJQQvgcXUVN1DiFhnGbatxRJgP-MQ4E2ZXoW8l4n0FITdEnJ3D5eW3FUw7pSR9LCKbmlpC3fRTARRHh8QNNOpDqZIowUT4FeuCJyGl-0yVt7FRptdEuXlGMdN3MUtxZG0bZ2CkbDJPtqnTlcy-atbfQu-lfeRcj6_h0XzpIJz800pNqErzUNhQUv4i0eq23AA5qD_lUop4WAnjWiQFCgLD-djOvFAibzmQovzx2QZQQF9jAhqIlW9qv-2Z-3bUFN')`,
      mixBlendMode: 'overlay'
    }} 
  />
);

export const GlassCard = ({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <div 
    id={id}
    className={cn(
      "bg-surface-container/20 backdrop-blur-2xl border border-primary/20 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-primary/40",
      className
    )}
  >
    {children}
  </div>
);

export const PremiumButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className,
  id,
  disabled = false
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  id?: string;
  disabled?: boolean;
}) => {
  const variants = {
    primary: "bg-primary text-on-primary shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30_px_rgba(212,175,55,0.5)]",
    secondary: "bg-surface-container/40 backdrop-blur-md text-on-surface border border-primary/20 hover:bg-surface-container/60 hover:border-primary/40",
    ghost: "bg-transparent text-primary hover:bg-primary/10"
  };

  return (
    <motion.button
      id={id}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={!disabled ? onClick : undefined}
      className={cn(
        "px-8 py-3 font-label-md text-xs font-bold rounded-xl uppercase tracking-[0.2em] transition-all",
        variants[variant],
        disabled && "opacity-50 grayscale cursor-not-allowed",
        className
      )}
    >
      {children}
    </motion.button>
  );
};

export const AppHeader = ({ 
  title = "VIRASAT", 
  showBack = false, 
  onBack, 
  onMenuClick,
  onProfileClick,
  action,
  id 
}: { 
  title?: string, 
  showBack?: boolean, 
  onBack?: () => void, 
  onMenuClick?: () => void,
  onProfileClick?: () => void,
  action?: React.ReactNode,
  id?: string 
}) => (
  <header id={id} className="fixed top-0 left-0 right-0 z-50 bg-surface/40 backdrop-blur-xl flex justify-between items-center px-6 h-20 w-full border-b border-primary/10">
    <div className="flex items-center gap-4">
      {(showBack || onBack) ? (
        <button onClick={onBack} className="text-primary hover:opacity-80 transition-opacity p-2 rounded-lg hover:bg-primary/10">
          <ArrowLeft size={20} />
        </button>
      ) : (
        <button 
          onClick={onMenuClick}
          className="text-primary hover:opacity-80 transition-opacity p-2 rounded-lg hover:bg-primary/10"
        >
          <Menu size={24} />
        </button>
      )}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary rotate-45 flex items-center justify-center">
          <div className="w-4 h-4 bg-primary rotate-[-45deg]"></div>
        </div>
        <h1 className="font-display-lg text-primary text-xl uppercase tracking-[0.25em]">{title}</h1>
      </div>
    </div>
    <div className="flex items-center">
      {action ? action : (
        <motion.div 
          onClick={onProfileClick}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="w-10 h-10 rounded-full border-2 border-primary/40 p-0.5 overflow-hidden cursor-pointer hover:border-primary transition-all relative group"
        >
          <img alt="User profile" className="w-full h-full rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7N6I3IzjeFhhhls95R3jXdIhcWD8P8Q_pnGYBJd3dcymO5nXAK8AwUvIZ3ZJW0BuVEdEzkPC6NK1gBaAawFsjcmsTY_46KysAo7y5Mw4dJjWPhJ1aDUnXb7Pbgg3FfJnCbDIGkjGo7fdhfGjkjX3wr9AqWWXcuj0lIh7jFX_Y7Oh_HLaw5EOKhuTXzUv0zh4PvITKqfY643E6rTUadybFezmo_Fvi4JSOeEbCPZC8Hty4zWIjb5-oJJe9mhPhP4IcsS_Sp52EMD0m" />
          <motion.div 
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-primary/20 transition-opacity flex items-center justify-center"
          >
            <div className="absolute inset-0 border-2 border-primary rounded-full animate-ping opacity-20"></div>
          </motion.div>
        </motion.div>
      )}
    </div>
  </header>
);
