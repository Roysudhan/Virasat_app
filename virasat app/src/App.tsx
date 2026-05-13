import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { StoneTexture } from './components/CoreUI';
import { BottomNav, NavTab } from './components/BottomNav';
import Home from './pages/Home';
import Discovery from './pages/Discovery';
import Guide from './pages/Guide';
import Passport from './pages/Passport';
import Community from './pages/Community';
import MapView from './pages/MapView';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import MonumentDetail from './pages/MonumentDetail';
import Scanner from './pages/Scanner';
import NavigationMode from './pages/NavigationMode';
import Profile from './pages/Profile';
import { monument } from './constants';
import { getProfile } from './services/profileService';
import { SideMenu } from './components/SideMenu';

type AppState = 'welcome' | 'login' | 'main' | 'detail' | 'scanner' | 'navigation' | 'profile';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [appState, setAppState] = useState<AppState>('welcome');
  const [selectedMonument, setSelectedMonument] = useState<monument | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Simple state machine for navigation
  const navigateToMain = () => setAppState('main');
  const openMonument = (m: monument) => {
    setSelectedMonument(m);
    setAppState('detail');
  };
  const closeDetail = () => setAppState('main');
  const openScanner = () => setAppState('scanner');
  const closeScanner = () => setAppState('main');
  const startNavigation = (m: monument) => {
    setSelectedMonument(m);
    setAppState('navigation');
  };
  const endNavigation = () => setAppState('detail');
  const openProfile = () => setAppState('profile');
  const closeProfile = () => setAppState('main');

  const handleLogout = () => {
    setAppState('login');
    setIsMenuOpen(false);
  };

  return (
    <div id="app-root" className="bg-background text-on-background min-h-screen selection:bg-primary/30">
      <StoneTexture />
      
      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        activeTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenProfile={openProfile}
        onLogout={handleLogout}
      />

      <AnimatePresence mode="wait">
        {appState === 'welcome' && (
          <Welcome key="welcome" onFinish={() => setAppState('login')} />
        )}

        {appState === 'login' && (
          <Login key="login" onLogin={navigateToMain} />
        )}

        {appState === 'main' && (
          <div key="main-shell" className="pb-32">
            <AnimatePresence mode="wait">
              {currentTab === 'home' && (
                <Home 
                  key="home" 
                  onSelectMonument={openMonument} 
                  onOpenProfile={openProfile} 
                  onOpenMenu={() => setIsMenuOpen(true)}
                />
              )}
              {currentTab === 'explore' && (
                <Discovery 
                  key="explore" 
                  onSelectMonument={openMonument} 
                  onOpenScanner={openScanner} 
                  onOpenProfile={openProfile} 
                  onOpenMenu={() => setIsMenuOpen(true)}
                />
              )}
              {currentTab === 'map' && (
                <MapView 
                  key="map" 
                  onSelectMonument={openMonument} 
                  onOpenProfile={openProfile} 
                  onOpenMenu={() => setIsMenuOpen(true)}
                />
              )}
              {currentTab === 'guide' && (
                <Guide 
                  key="guide" 
                  onOpenProfile={openProfile} 
                  onOpenMenu={() => setIsMenuOpen(true)}
                />
              )}
              {currentTab === 'community' && (
                <Community 
                  key="community" 
                  onOpenProfile={openProfile} 
                  onOpenMenu={() => setIsMenuOpen(true)}
                />
              )}
              {currentTab === 'passport' && (
                <Passport 
                  key="passport" 
                  onOpenProfile={openProfile} 
                  onOpenMenu={() => setIsMenuOpen(true)}
                />
              )}
            </AnimatePresence>
            <BottomNav activeTab={currentTab} onTabChange={setCurrentTab} />
          </div>
        )}

        {appState === 'detail' && selectedMonument && (
          <MonumentDetail 
            key="detail" 
            monument={selectedMonument} 
            onBack={closeDetail} 
            onOpenProfile={openProfile}
            onOpenMenu={() => setIsMenuOpen(true)}
            onStartNavigation={() => startNavigation(selectedMonument)}
          />
        )}

        {appState === 'scanner' && (
          <Scanner 
            key="scanner" 
            onClose={closeScanner} 
            onIdentify={openMonument} 
          />
        )}

        {appState === 'navigation' && selectedMonument && (
          <NavigationMode 
            key="navigation"
            monument={selectedMonument}
            onClose={endNavigation}
          />
        )}

        {appState === 'profile' && (
          <Profile 
            key="profile"
            onBack={closeProfile}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
