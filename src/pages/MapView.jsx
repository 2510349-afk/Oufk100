import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLanguage } from '../i18n/LanguageContext';
import { useJourney } from '../context/JourneyContext';

// Fix Leaflet's default icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const customIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapView = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { journeyData } = useJourney();
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    if (!journeyData) {
      navigate('/preferences');
      return;
    }
    
    // Extract ordered coordinates for the polyline
    const coords = [];
    journeyData.days.forEach(day => {
      day.sites.forEach(site => {
        coords.push(site.coordinates);
      });
    });
    setRouteCoordinates(coords);
  }, [journeyData, navigate]);

  if (!journeyData) return null;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', paddingTop: '70px' }}>
      
      {/* Floating Panel for Journey Info */}
      <div 
        className="glass-panel" 
        style={{ 
          position: 'absolute', top: '100px', left: lang === 'en' ? '20px' : 'auto', right: lang === 'ar' ? '20px' : 'auto', 
          zIndex: 1000, padding: '1.5rem', width: '300px'
        }}
      >
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--accent-gold)' }}>
          {lang === 'en' ? 'Your Journey Map' : 'خريطة رحلتك'}
        </h2>
        <button className="btn-outline" style={{ width: '100%', marginBottom: '1rem' }} onClick={() => navigate('/itinerary')}>
          {lang === 'en' ? 'Back to Itinerary' : 'العودة لخط سير الرحلة'}
        </button>
      </div>

      <MapContainer 
        center={[31.24, 36.51]} // Center of Jordan roughly
        zoom={7} 
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        {/* Using a dark themed map tile */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {/* Draw the journey route */}
        {routeCoordinates.length > 1 && (
          <Polyline 
            positions={routeCoordinates} 
            color="#D4AF37" 
            weight={4} 
            dashArray="10, 10" 
            className="animated-route" // We can animate this via CSS if needed
          />
        )}

        {/* Draw markers for selected sites */}
        {journeyData.days.map(day => (
          day.sites.map(site => (
            <Marker key={site.id} position={site.coordinates} icon={customIcon}>
              <Popup>
                <div style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{site.name[lang]}</h3>
                  <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#666' }}>
                    {site.historicalPeriod[lang]}
                  </p>
                  <button 
                    className="btn-primary" 
                    style={{ padding: '6px 12px', fontSize: '0.8rem', width: '100%' }}
                    onClick={() => navigate(`/site/${site.slug}`)}
                  >
                    {lang === 'en' ? 'Explore' : 'استكشف'}
                  </button>
                </div>
              </Popup>
            </Marker>
          ))
        ))}
      </MapContainer>
      
      <style>{`
        .animated-route {
          animation: dash 20s linear infinite;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}</style>
    </div>
  );
};

export default MapView;
