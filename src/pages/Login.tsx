import React from 'react';
import { motion } from 'motion/react';
import { PremiumButton, GlassCard } from '../components/CoreUI';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  id?: string;
}

export default function Login({ onLogin, id }: LoginProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background px-6"
    >
      <header className="w-full flex justify-center py-12">
        <div className="flex flex-col items-center">
          <span className="font-display-lg text-2xl text-primary tracking-[0.3em] uppercase">Virasat</span>
          <div className="h-px w-8 bg-primary mt-2"></div>
        </div>
      </header>

      <main className="w-full max-w-md space-y-12">
        <div className="text-center space-y-2">
          <h1 className="font-display-lg text-5xl text-on-surface">Welcome Back</h1>
          <p className="font-body-md text-on-surface-variant opacity-80">Continue your journey through Karnataka's heritage.</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="font-label-md text-xs text-outline px-1 uppercase tracking-wider">Email Address</label>
            <div className="flex items-center h-16 rounded-2xl border border-outline-variant/30 bg-surface-container/20 backdrop-blur-xl px-5 focus-within:border-primary transition-all shadow-xl group">
              <Mail size={20} className="text-primary/40 group-focus-within:text-primary transition-colors mr-4" />
              <input 
                className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/30 text-sm font-medium" 
                placeholder="Enter your email" 
                type="email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-label-md text-xs text-outline px-1 uppercase tracking-wider">Password</label>
            <div className="flex items-center h-16 rounded-2xl border border-outline-variant/30 bg-surface-container/20 backdrop-blur-xl px-5 focus-within:border-primary transition-all shadow-xl group">
              <Lock size={20} className="text-primary/40 group-focus-within:text-primary transition-colors mr-4" />
              <input 
                className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/30 text-sm font-medium tracking-[0.2em]" 
                placeholder="••••••••" 
                type={showPassword ? "text" : "password"}
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="text-primary/40 hover:text-primary transition-colors p-2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>

        <PremiumButton 
          id="sign-in-btn"
          onClick={onLogin}
          className="w-full h-14"
        >
          Sign In
        </PremiumButton>

        <div className="flex items-center gap-4 py-2">
          <div className="h-px flex-1 bg-outline-variant/30"></div>
          <span className="font-label-md text-[10px] text-outline-variant uppercase">Or connect via</span>
          <div className="h-px flex-1 bg-outline-variant/30"></div>
        </div>

        <GlassCard className="p-0 border-outline-variant/20">
          <button className="w-full h-14 flex items-center justify-center gap-3 hover:bg-white/5 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            <span className="font-label-md text-sm text-on-surface">Continue with Google</span>
          </button>
        </GlassCard>

        <footer className="text-center mt-12 pb-8">
          <p className="font-body-md text-on-surface-variant">
            New to the lineage? 
            <button className="text-primary font-bold ml-2 hover:underline">Request Entry</button>
          </p>
        </footer>
      </main>

      {/* Side Decorative (Hidden on mobile) */}
      <div className="hidden lg:block fixed right-0 top-0 bottom-0 w-1/3 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-l from-background via-transparent to-transparent z-10"></div>
        <img 
          className="h-full w-full object-cover grayscale-[30%] sepia-[15%] opacity-40 translate-x-12 scale-110" 
          src="https://images.unsplash.com/photo-1600063255140-6927d6364177?auto=format&fit=crop&q=80&w=2000" 
          alt="Karnataka Heritage"
          referrerPolicy="no-referrer"
        />
        {/* Cinematic Grit */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay z-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
      </div>
    </motion.div>
  );
}
