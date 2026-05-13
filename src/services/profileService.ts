
export type HeritageRank = 'Explorer' | 'Temple Seeker' | 'Dynasty Scholar' | 'Rajaguru' | 'Heritage Guardian';
export type Dynasty = 'Chalukya' | 'Hoysala' | 'Vijayanagara' | 'Mysore Wodeyar' | 'Kadamba';
export type HeritageTheme = 'Light Heritage' | 'Dark Imperial';

export interface UserProfile {
  id: string;
  fullName: string;
  username: string;
  avatarUrl: string;
  rank: HeritageRank;
  level: number;
  xp: number;
  nextLevelXp: number;
  memberSince: string;
  bio: string;
  passportId: string;
  stats: {
    sitesVisited: number;
    stampsCollected: number;
    pointsEarned: number;
    explorationStreak: number;
    hiddenGemsDiscovered: number;
  };
  preferences: {
    favoriteDynasty: Dynasty;
    favoriteSite: string;
    language: string;
    theme: HeritageTheme;
    interests: string[];
  };
}

const DEFAULT_PROFILE: UserProfile = {
  id: 'usr_12345',
  fullName: 'Ananya Sharma',
  username: 'ananya_heritage',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7N6I3IzjeFhhhls95R3jXdIhcWD8P8Q_pnGYBJd3dcymO5nXAK8AwUvIZ3ZJW0BuVEdEzkPC6NK1gBaAawFsjcmsTY_46KysAo7y5Mw4dJjWPhJ1aDUnXb7Pbgg3FfJnCbDIGkjGo7fdhfGjkjX3wr9AqWWXcuj0lIh7jFX_Y7Oh_HLaw5EOKhuTXzUv0zh4PvITKqfY643E6rTUadybFezmo_Fvi4JSOeEbCPZC8Hty4zWIjb5-oJJe9mhPhP4IcsS_Sp52EMD0m',
  rank: 'Dynasty Scholar',
  level: 42,
  xp: 2450,
  nextLevelXp: 3000,
  memberSince: 'Oct 2023',
  bio: 'A passionate explorer uncovering the lost narratives of Karnataka. Lover of Hoysala architecture and ancient inscriptions.',
  passportId: 'KNV-2024-8892',
  stats: {
    sitesVisited: 24,
    stampsCollected: 12,
    pointsEarned: 8500,
    explorationStreak: 5,
    hiddenGemsDiscovered: 7,
  },
  preferences: {
    favoriteDynasty: 'Hoysala',
    favoriteSite: 'Chennakeshava Temple, Belur',
    language: 'Kannada',
    theme: 'Dark Imperial',
    interests: ['Architecture', 'Inscriptions', 'Sacred Geometry'],
  }
};

export const getProfile = (): UserProfile => {
  const saved = localStorage.getItem('virasat_profile');
  if (saved) return JSON.parse(saved);
  return DEFAULT_PROFILE;
};

export const saveProfile = (profile: UserProfile): void => {
  localStorage.setItem('virasat_profile', JSON.stringify(profile));
};
