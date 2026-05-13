import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { APIProvider, Map, AdvancedMarker, Pin, useMap, useMapsLibrary, useAdvancedMarkerRef, InfoWindow } from '@vis.gl/react-google-maps';
import { PageTransition } from '../components/PageTransition';
import { AppHeader, PremiumButton } from '../components/CoreUI';
import { MONUMENTS, monument } from '../constants';
import { getHeritageRecommendations, HeritageRecommendation } from '../services/geminiService';
import { 
  Landmark, 
  Navigation, 
  MapPin, 
  Compass, 
  Search, 
  Filter, 
  ChevronRight, 
  Heart, 
  Clock, 
  Award,
  Sparkles,
  Info,
  Map as MapIcon,
  Loader2
} from 'lucide-react';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

// Default center (Karnataka center)
const DEFAULT_CENTER = { lat: 15.3173, lng: 75.7139 };

interface MapViewProps {
  onSelectMonument: (m: monument) => void;
  onOpenProfile: () => void;
  onOpenMenu: () => void;
  id?: string;
}

export default function MapView({ onSelectMonument, onOpenProfile, onOpenMenu, id }: MapViewProps) {
  const [selectedMonument, setSelectedMonument] = useState<monument | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [radius, setRadius] = useState(25); // km
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState<HeritageRecommendation[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const fetchRecommendations = async () => {
    if (showRecommendations) return; // Toggle off
    setIsAiLoading(true);
    setShowRecommendations(true);
    const gems = await getHeritageRecommendations(searchQuery || "Ancient Temples");
    setRecommendations(gems);
    setIsAiLoading(false);
  };

  const handleNavigate = (m: monument) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${m.coordinates?.lat},${m.coordinates?.lng}&travelmode=driving`;
    window.open(url, '_blank');
  };

  const filteredMonuments = useMemo(() => {
    return MONUMENTS.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'All' || m.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  if (!hasValidKey) {
    return (
      <PageTransition id={id}>
        <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-background">
          <Landmark size={64} className="text-primary mb-6 animate-pulse" />
          <h2 className="font-display-lg text-2xl text-primary mb-4 uppercase tracking-[0.2em]">Google Maps Required</h2>
          <p className="text-on-surface-variant mb-8 max-w-md font-body-md leading-relaxed">
            To explore the heritage of Karnataka on an interactive map, please provide a Google Maps Platform API key.
          </p>
          <div className="bg-surface-container/40 p-6 rounded-3xl border border-primary/20 text-left w-full max-w-lg">
            <h3 className="font-bold text-primary mb-3 text-sm uppercase">Setup Instructions:</h3>
            <ol className="text-xs space-y-3 text-on-surface-variant list-decimal list-inside">
              <li>Get an API key from the <a href="https://console.cloud.google.com/google/maps-apis/start" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Cloud Console</a>.</li>
              <li>Open <strong>Settings</strong> (gear icon) in AI Studio.</li>
              <li>Go to <strong>Secrets</strong> and add <code>GOOGLE_MAPS_PLATFORM_KEY</code>.</li>
              <li>The app will automatically rebuild.</li>
            </ol>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition id={id}>
      <AppHeader title="HERITAGE DISCOVERY" onProfileClick={onOpenProfile} onMenuClick={onOpenMenu} />
      
      <main className="relative w-full h-[100vh] overflow-hidden bg-black pt-20">
        <APIProvider apiKey={API_KEY} version="weekly">
          <div className="absolute inset-0 z-0">
            <HeritageMap 
              center={userLocation || DEFAULT_CENTER}
              monuments={filteredMonuments}
              onMarkerClick={setSelectedMonument}
              userLocation={userLocation}
            />
          </div>

          {/* Map Controls */}
          <div className="absolute top-24 left-6 right-6 z-10 flex flex-col gap-4 pointer-events-none">
            {/* Search Bar */}
            <div className="pointer-events-auto group">
              <div className="flex items-center gap-3 bg-surface/60 backdrop-blur-2xl border border-primary/20 rounded-2xl px-4 py-3 shadow-2xl transition-all focus-within:border-primary">
                <Search size={20} className="text-primary opacity-60" />
                <input 
                  type="text" 
                  placeholder="Search temples, forts, ruins..." 
                  className="bg-transparent border-none outline-none flex-1 text-sm text-on-surface placeholder:text-on-surface-variant/40"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="p-1 hover:bg-primary/10 rounded-lg text-primary">
                  <Filter size={18} />
                </button>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pointer-events-auto pb-2">
              {['All', 'UNESCO Heritage', 'World Heritage Series', 'Rock-cut Architecture', 'Royal Heritage'].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                    activeFilter === f 
                    ? 'bg-primary text-on-primary border-primary shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
                    : 'bg-surface/60 backdrop-blur-xl text-primary border-primary/20 hover:border-primary/50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Side Tools */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4 pointer-events-auto">
            <MapControlBtn icon={<Navigation size={20} />} onClick={() => {}} tooltip="Locate Me" />
            <MapControlBtn icon={<Compass size={20} />} onClick={() => {}} tooltip="Compass" />
            <MapControlBtn icon={<MapIcon size={20} />} onClick={() => {}} tooltip="Layer Style" />
            <div className="h-px bg-primary/20 my-1 mx-2" />
            <MapControlBtn 
              icon={isAiLoading ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} className={showRecommendations ? "text-primary" : "text-primary/60"} />} 
              onClick={() => showRecommendations ? setShowRecommendations(false) : fetchRecommendations()} 
              active={showRecommendations}
              tooltip="AI Recommendations"
            />
          </div>

          {/* AI Recommendations Panel */}
          <AnimatePresence>
            {showRecommendations && (
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                className="absolute top-64 right-20 z-20 w-72 bg-surface/80 backdrop-blur-3xl border border-primary/20 rounded-3xl p-5 shadow-2xl max-h-[50vh] overflow-y-auto no-scrollbar"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-primary" />
                    <h3 className="font-display-lg text-[10px] uppercase tracking-widest text-primary">AI Suggestions</h3>
                  </div>
                  <button onClick={() => setShowRecommendations(false)} className="text-primary opacity-40 hover:opacity-100">
                    <ChevronRight size={14} className="rotate-180" />
                  </button>
                </div>
                
                {isAiLoading ? (
                  <div className="flex flex-col items-center justify-center py-8 gap-3">
                    <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-[10px] text-primary/60 uppercase tracking-widest animate-pulse">Consulting Scholars...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {recommendations.map((rec, i) => (
                      <RecommendationItem 
                        key={i}
                        name={rec.name} 
                        distance={rec.location} 
                        desc={rec.description} 
                        why={rec.whySuggested}
                      />
                    ))}
                  </div>
                )}
                
                {!isAiLoading && (
                  <button onClick={fetchRecommendations} className="w-full mt-6 py-2 bg-primary/5 border border-primary/20 rounded-xl text-[8px] uppercase tracking-[0.2em] text-primary hover:bg-primary/20 transition-colors">
                    Refresh AI
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Monument Preview Mini-Sheet */}
          <AnimatePresence>
            {selectedMonument && (
              <motion.div
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 200, opacity: 0 }}
                className="absolute bottom-32 left-6 right-6 z-30"
              >
                <div className="max-w-md mx-auto bg-surface/80 backdrop-blur-3xl border border-primary/20 rounded-[2.5rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,1)] relative overflow-hidden">
                  <div className="flex gap-4">
                    <div className="w-32 h-40 rounded-3xl overflow-hidden shadow-xl border border-white/5 flex-shrink-0">
                      <img src={selectedMonument.imageUrl} alt={selectedMonument.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h2 className="font-display-lg text-lg text-on-surface leading-tight">{selectedMonument.name}</h2>
                          <button onClick={() => setSelectedMonument(null)} className="p-1 hover:bg-white/10 rounded-full text-on-surface-variant">
                            <ChevronRight size={20} className="rotate-90" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1 text-primary">
                            <Clock size={10} />
                            <span className="text-[10px] uppercase tracking-wider font-bold">{selectedMonument.year || "Ancient"}</span>
                          </div>
                          {selectedMonument.isUnesco && (
                            <div className="flex items-center gap-1 text-green-500">
                              <Award size={10} />
                              <span className="text-[10px] uppercase tracking-wider font-bold">UNESCO</span>
                            </div>
                          )}
                        </div>
                        <p className="font-body-md text-[10px] text-on-surface-variant line-clamp-2 mt-3 leading-relaxed opacity-70">
                          {selectedMonument.description}
                        </p>
                      </div>

                      <div className="flex gap-3 mt-4">
                        <PremiumButton 
                          onClick={() => onSelectMonument(selectedMonument)}
                          className="flex-1 h-12 rounded-2xl items-center justify-center p-0"
                        >
                          <span className="text-[10px] tracking-widest">DETAILS</span>
                        </PremiumButton>
                        <button 
                          onClick={() => handleNavigate(selectedMonument)}
                          className="w-12 h-12 bg-surface-container rounded-2xl flex items-center justify-center text-primary border border-primary/10 hover:bg-primary/10 transition-colors"
                        >
                          <Navigation size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </APIProvider>
      </main>
    </PageTransition>
  );
}

function MapControlBtn({ icon, onClick, tooltip, active = false }: { icon: React.ReactNode, onClick: () => void, tooltip: string, active?: boolean }) {
  return (
    <div className="relative group">
      <button 
        onClick={onClick}
        className={`w-14 h-14 bg-surface/60 backdrop-blur-2xl border ${active ? 'border-primary' : 'border-primary/20'} rounded-2xl flex items-center justify-center text-primary shadow-2xl hover:border-primary transition-all group active:scale-95`}
      >
        <span className="group-hover:scale-110 transition-transform">{icon}</span>
      </button>
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-surface/90 backdrop-blur-xl border border-primary/20 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none transform translate-x-2 group-hover:translate-x-0">
        <span className="text-[8px] uppercase tracking-widest text-primary">{tooltip}</span>
      </div>
    </div>
  );
}

function RecommendationItem({ name, distance, desc, why }: { name: string, distance: string, desc: string, why: string }) {
  return (
    <div className="group cursor-pointer">
      <div className="flex justify-between items-center mb-1">
        <h4 className="text-[11px] font-bold text-on-surface group-hover:text-primary transition-colors">{name}</h4>
        <span className="text-[8px] text-primary/60">{distance}</span>
      </div>
      <p className="text-[9px] text-on-surface-variant leading-relaxed line-clamp-2 opacity-60 mb-2">{desc}</p>
      <div className="bg-primary/5 p-2 rounded-lg border border-primary/10">
        <p className="text-[8px] text-primary/80 italic font-body-md leading-tight">"{why}"</p>
      </div>
    </div>
  );
}

// Sub-component for the actual Map logic
function HeritageMap({ center, monuments, onMarkerClick, userLocation }: { 
  center: google.maps.LatLngLiteral, 
  monuments: monument[], 
  onMarkerClick: (m: monument) => void,
  userLocation: google.maps.LatLngLiteral | null
}) {
  const map = useMap();
  
  // Custom Map styling
  const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    mapId: 'HERITAGE_MAP_ID', 
    styles: DARK_HERITAGE_STYLE,
    gestureHandling: 'greedy'
  };

  useEffect(() => {
    if (map && center) {
      map.panTo(center);
    }
  }, [map, center]);

  return (
    <Map
      defaultCenter={center}
      defaultZoom={7}
      disableDefaultUI={true}
      mapId={mapOptions.mapId}
      styles={mapOptions.styles}
      gestureHandling={mapOptions.gestureHandling}
      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
      className="w-full h-full"
    >
      {/* Markers */}
      {monuments.map((m) => (
        m.coordinates && (
          <AdvancedMarker
            key={m.id}
            position={m.coordinates}
            onClick={() => onMarkerClick(m)}
          >
            <div className="relative transform -translate-y-5 transition-transform hover:scale-110">
              <div className="w-12 h-12 rounded-2xl bg-surface/80 backdrop-blur-lg border-2 border-primary/40 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20"></div>
                <Landmark size={20} className="text-primary relative z-10" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-primary/40 mt-[-2px]"></div>
            </div>
          </AdvancedMarker>
        )
      ))}

      {/* User Location Marker */}
      {userLocation && (
        <AdvancedMarker position={userLocation}>
          <div className="relative">
            <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-xl animate-pulse"></div>
            <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping"></div>
          </div>
        </AdvancedMarker>
      )}
    </Map>
  );
}

const DARK_HERITAGE_STYLE = [
  { "elementType": "geometry", "stylers": [{ "color": "#1a1a1a" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#1a1a1a" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#8a6d3b" }] },
  { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#333333" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#0a0a0a" }] },
  { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#4d4d4d" }] },
  { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#0d0d0d" }] },
  { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#262626" }] },
  { "featureType": "poi", "stylers": [{ "visibility": "off" }] }
];
