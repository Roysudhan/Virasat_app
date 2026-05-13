import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { GlassCard, PremiumButton, AppHeader } from '../components/CoreUI';
import { 
  User, 
  Settings, 
  Award, 
  MapPin, 
  Calendar, 
  Trophy, 
  Zap, 
  Sparkles, 
  Camera, 
  Save, 
  X,
  ChevronRight,
  Globe,
  Palette,
  Fingerprint,
  Heart
} from 'lucide-react';
import { 
  getProfile, 
  saveProfile, 
  UserProfile, 
  HeritageRank, 
  Dynasty, 
  HeritageTheme 
} from '../services/profileService';

export default function Profile({ onBack, id }: { onBack: () => void, id?: string }) {
  const [profile, setProfile] = useState<UserProfile>(getProfile());
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    saveProfile(editedProfile);
    setProfile(editedProfile);
    setIsSaving(false);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <PageTransition id={id}>
      <AppHeader 
        title={isEditing ? "EDIT IDENTITY" : "HERITAGE IDENTITY"} 
        onBack={isEditing ? cancelEdit : onBack}
        action={!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary"
          >
            <Settings size={20} />
          </button>
        )}
      />

      <main className="pt-24 pb-32 px-6 space-y-8 h-[100vh] overflow-y-auto no-scrollbar bg-black">
        <AnimatePresence mode="wait">
          {isEditing ? (
            <EditMode 
              profile={editedProfile} 
              setProfile={setEditedProfile} 
              onSave={handleSave}
              isSaving={isSaving}
            />
          ) : (
            <ViewMode profile={profile} />
          )}
        </AnimatePresence>
      </main>
    </PageTransition>
  );
}

function ViewMode({ profile }: { profile: UserProfile }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 pb-12"
    >
      {/* Royal Header Section */}
      <section className="relative pt-8 flex flex-col items-center">
        <div className="relative group">
          <div className="w-32 h-32 rounded-[2.5rem] p-1 bg-gradient-to-br from-primary via-primary/50 to-primary border-4 border-black relative z-10 overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.3)]">
            <img src={profile.avatarUrl} alt={profile.fullName} className="w-full h-full object-cover rounded-[2rem]" />
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 border border-dashed border-primary/30 rounded-full pointer-events-none"
          />
          <div className="absolute -bottom-2 -right-2 bg-primary text-black px-3 py-1 rounded-xl font-bold text-[10px] tracking-widest shadow-lg border-2 border-black z-20">
            LVL {profile.level}
          </div>
        </div>

        <div className="text-center mt-8 space-y-1">
          <h2 className="font-display-lg text-3xl text-on-surface uppercase tracking-widest">{profile.fullName}</h2>
          <div className="flex items-center justify-center gap-2 text-primary">
            <Award size={14} />
            <span className="font-label-md text-xs uppercase tracking-widest font-black italic">{profile.rank}</span>
          </div>
        </div>

        {/* XP Bar */}
        <div className="w-full max-w-xs mt-8 space-y-2">
          <div className="flex justify-between text-[10px] uppercase tracking-widest font-black text-primary/60">
            <span>Progress to Sage</span>
            <span>{profile.xp} / {profile.nextLevelXp} XP</span>
          </div>
          <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden border border-white/5 p-0.5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(profile.xp / profile.nextLevelXp) * 100}%` }}
              className="h-full bg-gradient-to-r from-primary/60 via-primary to-primary/60 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]"
            />
          </div>
        </div>
      </section>

      {/* Stats Bento Grid */}
      <section className="grid grid-cols-2 gap-4">
        {[
          { label: 'Visited', value: profile.stats.sitesVisited, icon: MapPin },
          { label: 'Stamps', value: profile.stats.stampsCollected, icon: Award },
          { label: 'Points', value: profile.stats.pointsEarned.toLocaleString(), icon: Trophy },
          { label: 'Streak', value: `${profile.stats.explorationStreak} Days`, icon: Zap },
        ].map((stat) => (
          <GlassCard key={stat.label} className="p-6 border-white/5 flex flex-col items-center text-center gap-2">
            <div className="text-primary/40 mb-1">
              <stat.icon size={20} />
            </div>
            <span className="text-2xl font-display-lg text-on-surface">{stat.value}</span>
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">{stat.label}</span>
          </GlassCard>
        ))}
      </section>

      {/* Details List */}
      <section className="space-y-4">
        <h3 className="font-display-lg text-xl text-on-surface-variant px-2 flex items-center gap-2">
          <Fingerprint size={18} className="text-primary" />
          Royal Registry
        </h3>
        
        <div className="space-y-3">
          <DetailItem icon={Calendar} label="Member Since" value={profile.memberSince} />
          <DetailItem icon={Award} label="Explorer Rank" value={profile.rank} />
          <DetailItem icon={Heart} label="Favorite Dynasty" value={profile.preferences.favoriteDynasty} />
          <DetailItem icon={Globe} label="Preferred Language" value={profile.preferences.language} />
        </div>
      </section>

      {/* Bio Section */}
      <section className="bg-surface/30 backdrop-blur-3xl rounded-[2.5rem] border border-primary/10 p-8">
        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-4">Scholar's Note</h4>
        <p className="font-serif italic text-on-surface-variant leading-relaxed text-lg">
          "{profile.bio}"
        </p>
      </section>

      {/* Passport ID - Card Style */}
      <section className="bg-gradient-to-br from-primary/10 to-transparent p-1 rounded-[2.5rem] border border-primary/20">
        <div className="bg-black/60 backdrop-blur-xl p-8 rounded-[2.3rem] flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-primary/60 mb-1">Heritage Passport ID</p>
            <p className="font-mono text-xl tracking-widest text-primary font-bold">{profile.passportId}</p>
          </div>
          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
            <Award size={24} />
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function EditMode({ profile, setProfile, onSave, isSaving }: { 
  profile: UserProfile, 
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>,
  onSave: () => void,
  isSaving: boolean
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8 pb-32"
    >
      {/* Profile Pic Upload */}
      <section className="flex flex-col items-center">
        <div className="relative group cursor-pointer">
          <img 
            src={profile.avatarUrl} 
            alt="Upload" 
            className="w-32 h-32 rounded-[2.5rem] object-cover ring-2 ring-primary ring-offset-4 ring-offset-black transition-opacity group-hover:opacity-40" 
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera size={32} className="text-primary" />
          </div>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-primary font-bold mt-4">Change Avatar</p>
      </section>

      {/* Form Fields */}
      <div className="space-y-6">
        <InputField 
          label="Full Name" 
          value={profile.fullName} 
          onChange={(v) => setProfile({...profile, fullName: v})}
        />
        <InputField 
          label="Username" 
          value={profile.username} 
          onChange={(v) => setProfile({...profile, username: v})}
        />
        
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-black text-primary/60 px-2">Dynastic Allegiance</label>
          <select 
            className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 font-display-lg text-lg text-on-surface focus:border-primary transition-colors appearance-none"
            value={profile.preferences.favoriteDynasty}
            onChange={(e) => setProfile({...profile, preferences: {...profile.preferences, favoriteDynasty: e.target.value as Dynasty}})}
          >
            {['Chalukya', 'Hoysala', 'Vijayanagara', 'Mysore Wodeyar', 'Kadamba'].map(d => (
              <option key={d} value={d} className="bg-black">{d}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-black text-primary/60 px-2">Ancient Scroll (Bio)</label>
          <textarea 
            className="w-full bg-white/5 border border-white/5 rounded-2xl p-6 font-serif italic text-lg text-on-surface min-h-[120px] focus:border-primary transition-colors resize-none"
            value={profile.bio}
            onChange={(e) => setProfile({...profile, bio: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-black text-primary/60 px-2">Travel Interests</label>
          <div className="flex flex-wrap gap-2">
            {['Architecture', 'Food', 'Culture', 'Hiking', 'History', 'Sacred'].map(tag => (
              <button 
                key={tag}
                onClick={() => {
                  const interests = profile.preferences.interests.includes(tag)
                    ? profile.preferences.interests.filter(i => i !== tag)
                    : [...profile.preferences.interests, tag];
                  setProfile({...profile, preferences: {...profile.preferences, interests}});
                }}
                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${
                  profile.preferences.interests.includes(tag)
                    ? 'bg-primary border-primary text-black'
                    : 'bg-white/5 border-white/10 text-white/40'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-32 left-6 right-6 z-40">
        <PremiumButton 
          onClick={onSave}
          disabled={isSaving}
          className="w-full h-16 rounded-[2rem] items-center justify-center gap-3 shadow-[0_20px_50px_rgba(212,175,55,0.3)]"
        >
          {isSaving ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Save size={20} />
            </motion.div>
          ) : (
            <>
              <Save size={20} />
              <span className="text-xs tracking-[0.4em]">IMPRINT CHANGES</span>
            </>
          )}
        </PremiumButton>
      </div>
    </motion.div>
  );
}

function DetailItem({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex items-center justify-between bg-white/5 border border-white/5 rounded-2xl px-6 py-4 group hover:border-primary/20 transition-all">
      <div className="flex items-center gap-4">
        <div className="text-primary/40 group-hover:text-primary transition-colors">
          <Icon size={18} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant font-bold">{label}</span>
      </div>
      <span className="font-display-lg text-lg text-on-surface">{value}</span>
    </div>
  );
}

function InputField({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-widest font-black text-primary/60 px-2">{label}</label>
      <input 
        type="text"
        className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 font-display-lg text-lg text-on-surface focus:border-primary transition-colors outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
