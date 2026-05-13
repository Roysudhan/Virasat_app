import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { APIProvider, Map, useMap, useMapsLibrary, AdvancedMarker } from '@vis.gl/react-google-maps';
import { monument } from '../constants';
import { PremiumButton, GlassCard } from '../components/CoreUI';
import { 
  Navigation, 
  MapPin, 
  Compass, 
  ArrowLeft, 
  Clock, 
  Car, 
  Footprints, 
  Bike,
  ChevronUp,
  Sparkles,
  Award,
  AlertCircle
} from 'lucide-react';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';

interface NavigationModeProps {
  monument: monument;
  onClose: () => void;
}

export default function NavigationMode({ monument, onClose }: NavigationModeProps) {
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [routeInfo, setRouteInfo] = useState<{ distance: string, duration: string } | null>(null);
  const [travelMode, setTravelMode] = useState<google.maps.TravelMode>(google.maps.TravelMode.DRIVING);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showArrival, setShowArrival] = useState(false);

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

  return (
    <div className="fixed inset-0 z-[100] bg-background">
      <APIProvider apiKey={API_KEY}>
        <div className="absolute inset-0 z-0">
          <HeritageNavMap 
            destination={monument.coordinates!} 
            userLocation={userLocation}
            travelMode={travelMode}
            onRouteUpdate={setRouteInfo}
            isNavigating={isNavigating}
          />
        </div>

        {/* Top Header - Glassmorphism */}
        <div className="absolute top-0 left-0 right-0 p-6 z-10 flex justify-between items-start pointer-events-none">
          <button 
            onClick={onClose}
            className="w-12 h-12 bg-black/60 backdrop-blur-xl border border-primary/20 rounded-2xl flex items-center justify-center text-primary pointer-events-auto hover:bg-primary/10 transition-all active:scale-90 shadow-2xl"
          >
            <ArrowLeft size={24} />
          </button>

          <div className="flex flex-col items-end gap-2 pointer-events-auto">
            <div className="bg-black/60 backdrop-blur-xl border border-primary/20 rounded-2xl px-4 py-3 flex items-center gap-3">
              <Compass size={18} className="text-primary animate-pulse" />
              <div className="text-right">
                <p className="font-label-md text-[8px] text-primary uppercase tracking-[0.2em] mb-0.5">Heading</p>
                <p className="font-display-lg text-sm text-on-surface">NORTH-WEST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Sheet */}
        <AnimatePresence>
          {!showArrival && (
            <motion.div 
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              className="absolute bottom-0 left-0 right-0 z-20"
            >
              <div className="max-w-xl mx-auto px-4 pb-8">
                <GlassCard className="p-0 border-primary/30 shadow-[0_-20px_100px_rgba(0,0,0,0.8)] overflow-hidden rounded-[2.5rem]">
                  <div className="p-1">
                    {/* Destination Banner */}
                    <div className="relative h-24 w-full">
                      <img src={monument.imageUrl} className="w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                      <div className="absolute bottom-3 left-6">
                        <h2 className="font-display-lg text-lg text-white mb-0.5">{monument.name}</h2>
                        <div className="flex items-center gap-2 text-primary">
                          <MapPin size={10} />
                          <span className="text-[10px] uppercase font-bold tracking-widest">{monument.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 group hover:border-primary/20 transition-all">
                          <div className="flex items-center gap-2 mb-1 opacity-60">
                            <Clock size={12} className="text-primary" />
                            <span className="text-[9px] uppercase tracking-widest">Time Remaining</span>
                          </div>
                          <span className="text-2xl font-display-lg text-on-surface">{routeInfo?.duration || '--'}</span>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 group hover:border-primary/20 transition-all">
                          <div className="flex items-center gap-2 mb-1 opacity-60">
                            <Navigation size={12} className="text-primary" />
                            <span className="text-[9px] uppercase tracking-widest">Distance</span>
                          </div>
                          <span className="text-2xl font-display-lg text-on-surface">{routeInfo?.distance || '--'}</span>
                        </div>
                      </div>

                      {/* Travel Mode Toggle */}
                      <div className="flex bg-black/40 p-1 rounded-2xl mb-8 border border-white/5">
                        {[
                          { mode: google.maps.TravelMode.DRIVING, icon: Car },
                          { mode: google.maps.TravelMode.WALKING, icon: Footprints },
                          { mode: google.maps.TravelMode.BICYCLING, icon: Bike }
                        ].map(({ mode, icon: Icon }) => (
                          <button
                            key={mode}
                            onClick={() => setTravelMode(mode)}
                            className={`flex-1 flex flex-col items-center py-3 gap-1 rounded-xl transition-all ${travelMode === mode ? 'bg-primary text-black shadow-lg scale-[1.02]' : 'text-primary/40 hover:text-primary'}`}
                          >
                            <Icon size={18} />
                            <span className="text-[8px] font-bold uppercase tracking-widest">{mode.toLowerCase()}</span>
                          </button>
                        ))}
                      </div>

                      {/* Action Button */}
                      <PremiumButton 
                        onClick={() => setIsNavigating(true)}
                        className="w-full h-16 rounded-3xl items-center justify-center gap-4 group"
                      >
                        <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
                        <span className="text-xs tracking-[0.4em]">START PILGRIMAGE</span>
                      </PremiumButton>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Arrival Screen */}
        <AnimatePresence>
          {showArrival && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 z-50 flex items-center justify-center p-8 bg-black/90 backdrop-blur-3xl"
            >
              <div className="text-center max-w-sm">
                <div className="w-32 h-32 mx-auto mb-8 relative">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl"
                  />
                  <div className="w-full h-full rounded-full bg-primary/10 border-2 border-primary/40 flex items-center justify-center text-primary relative z-10">
                    <Award size={64} className="animate-bounce" />
                  </div>
                </div>
                <h2 className="font-display-lg text-4xl text-primary mb-4">YOU HAVE ARRIVED</h2>
                <p className="font-serif italic text-lg text-on-surface-variant mb-12">
                  Welcome to {monument.name}. The spirits of the ancient {monument.category.split(' ')[0]} dynasty greet you.
                </p>
                <div className="space-y-4">
                  <PremiumButton onClick={onClose} className="w-full h-14 rounded-2xl items-center justify-center">
                    <span className="text-[10px] tracking-widest uppercase">ENTER SANCTUARY</span>
                  </PremiumButton>
                  <button onClick={() => setShowArrival(false)} className="w-full py-4 text-[10px] uppercase tracking-widest text-primary/60 border border-primary/20 rounded-2xl">
                    Back to Map
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating AI Gem Tip */}
        {isNavigating && (
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="absolute top-24 left-6 z-20 w-64"
          >
            <div className="bg-surface/80 backdrop-blur-2xl border border-primary/30 rounded-3xl p-4 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-20 transform translate-x-1 -translate-y-1">
                <Sparkles size={40} className="text-primary" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30">
                  <AlertCircle size={12} className="text-primary" />
                </div>
                <span className="text-[8px] font-bold uppercase tracking-widest text-primary">Hidden Gem Ahead</span>
              </div>
              <h4 className="text-[10px] font-bold text-on-surface mb-1 uppercase tracking-wider">Ancient Inscription Pillar</h4>
              <p className="text-[9px] text-on-surface-variant leading-relaxed opacity-70">
                In 2 km, you'll pass a 12th-century Halegannada inscription. Tap to add a stop.
              </p>
            </div>
          </motion.div>
        )}
      </APIProvider>
    </div>
  );
}

// Map Component with Directions
function HeritageNavMap({ destination, userLocation, travelMode, onRouteUpdate, isNavigating }: { 
  destination: google.maps.LatLngLiteral, 
  userLocation: google.maps.LatLngLiteral | null,
  travelMode: google.maps.TravelMode,
  onRouteUpdate: (info: { distance: string, duration: string }) => void,
  isNavigating: boolean
}) {
  const map = useMap();
  const routesLib = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    if (!routesLib || !map) return;
    setDirectionsService(new routesLib.DirectionsService());
    const renderer = new routesLib.DirectionsRenderer({
      map,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#D4AF37', // Antique Gold
        strokeWeight: 6,
        strokeOpacity: 0.8,
      }
    });
    setDirectionsRenderer(renderer);

    return () => {
      renderer.setMap(null);
    };
  }, [routesLib, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer || !userLocation || !destination) return;

    directionsService.route(
      {
        origin: userLocation,
        destination: destination,
        travelMode: travelMode
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          directionsRenderer.setDirections(result);
          const leg = result.routes[0].legs[0];
          onRouteUpdate({
            distance: leg.distance?.text || 'N/A',
            duration: leg.duration?.text || 'N/A'
          });

          // Animate camera to fit route
          const bounds = new google.maps.LatLngBounds();
          bounds.extend(userLocation);
          bounds.extend(destination);
          map?.fitBounds(bounds, { top: 100, bottom: 200, left: 100, right: 100 });
        }
      }
    );
  }, [directionsService, directionsRenderer, userLocation, destination, travelMode, map, onRouteUpdate]);

  useEffect(() => {
    if (isNavigating && map && userLocation) {
      map.setZoom(16);
      map.setTilt(45);
      map.panTo(userLocation);
    }
  }, [isNavigating, map, userLocation]);

  return (
    <Map
      defaultCenter={userLocation || destination}
      defaultZoom={12}
      disableDefaultUI={true}
      mapId="HERITAGE_NAV_MAP"
      styles={DARK_NAV_STYLE}
      className="w-full h-full"
    >
      {/* Starting Point Marker */}
      {userLocation && (
        <AdvancedMarker position={userLocation}>
          <div className="relative">
            <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-pulse" />
            <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping" />
          </div>
        </AdvancedMarker>
      )}

      {/* Destination Marker */}
      <AdvancedMarker position={destination}>
        <div className="relative transform -translate-y-5 group">
          <motion.div 
             animate={{ y: [0, -10, 0] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
             className="w-14 h-14 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center relative z-10 overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.4)]"
          >
            <div className="absolute inset-0 bg-primary/10 animate-pulse"></div>
            <Navigation size={24} className="text-primary" />
          </motion.div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-primary mt-[-2px]"></div>
        </div>
      </AdvancedMarker>
    </Map>
  );
}

const DARK_NAV_STYLE = [
  { "elementType": "geometry", "stylers": [{ "color": "#0a0a0a" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#0a0a0a" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#8a6d3b" }] },
  { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#1a1a1a" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }] },
  { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#0f0f0f" }] },
  { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#1f1f1f" }] },
  { "featureType": "poi", "stylers": [{ "visibility": "off" }] }
];
