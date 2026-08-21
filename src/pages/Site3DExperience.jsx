import React, { Suspense, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useLanguage } from '../i18n/LanguageContext';
import { sites } from '../data/sites';
import { GLTFModel } from '../components/3D/GLTFModel';
import { CameraRig } from '../components/3D/CameraRig';
import { ErrorBoundary } from 'react-error-boundary';

// Simple Fallback if GLB is missing
const FallbackGeometry = ({ site, hotspots, onHotspotClick }) => {
  return (
    <group>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 4, 4]} />
        <meshStandardMaterial color="#3a2f28" roughness={0.9} wireframe />
      </mesh>
      {/* We can still render hotspots even on a fallback geometry */}
      {hotspots && <GLTFModel url={null} hotspots={hotspots} onHotspotClick={onHotspotClick} />}
    </group>
  );
};

const ErrorFallback = ({ error }) => {
  return (
    <Html center>
      <div style={{ color: 'red', background: 'rgba(0,0,0,0.8)', padding: '10px' }}>
        Failed to load 3D Asset.
      </div>
    </Html>
  );
};

const Site3DExperience = () => {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const site = sites.find(s => s.slug === slug);

  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const orbitControlsRef = useRef();

  if (!site) return <div>Site not found</div>;

  const handleHotspotClick = (hotspot) => {
    setActiveHotspot(hotspot);
    setIsAnimating(true);
    if (orbitControlsRef.current) {
      orbitControlsRef.current.enabled = false; // Disable manual controls during transition
    }
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
    if (orbitControlsRef.current) {
      orbitControlsRef.current.target.set(...activeHotspot.cameraTarget);
      orbitControlsRef.current.enabled = true; // Re-enable manual controls around the new target
    }
  };

  const handleResetCamera = () => {
    setActiveHotspot(null);
    if (orbitControlsRef.current) {
      orbitControlsRef.current.target.set(0, 0, 0);
      orbitControlsRef.current.enabled = true;
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', background: '#050505' }}>
      
      {/* Disclaimer Overlay */}
      <div style={{ position: 'absolute', top: '80px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: 'rgba(0,0,0,0.6)', padding: '5px 15px', borderRadius: '20px', border: '1px solid var(--accent-gold)' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {lang === 'en' ? 'CyArk Architecture Test Mode' : 'وضع اختبار معمارية CyArk'}
        </span>
      </div>

      {/* UI Overlay */}
      <div 
        className="glass-panel"
        style={{ 
          position: 'absolute', bottom: '2rem', left: lang === 'en' ? '2rem' : 'auto', right: lang === 'ar' ? '2rem' : 'auto', 
          zIndex: 10, padding: '2rem', maxWidth: '400px'
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--accent-gold)' }}>{site.name[lang]}</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{site.historicalPeriod[lang]}</p>
        
        {/* Hotspot Info Panel */}
        {activeHotspot && (
          <div className="animate-fade-in" style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(212, 175, 55, 0.1)', borderLeft: '3px solid var(--accent-gold)', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 10px 0', color: 'var(--accent-gold)' }}>{activeHotspot.title[lang]}</h3>
            <p style={{ fontSize: '0.9rem', margin: 0 }}>{activeHotspot.description[lang]}</p>
            <button className="btn-outline" style={{ marginTop: '10px', padding: '5px 10px', fontSize: '0.8rem' }} onClick={handleResetCamera}>
              {lang === 'en' ? 'Close' : 'إغلاق'}
            </button>
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => navigate(`/site/${slug}/story`)}>
            {lang === 'en' ? 'Start Story Mode' : 'بدء وضع القصة'}
          </button>
          <button className="btn-outline" onClick={() => navigate('/itinerary')} style={{ width: '100%', marginTop: '10px' }}>
             {lang === 'en' ? 'Back to Journey' : 'العودة للرحلة'}
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas shadows camera={{ position: [5, 3, 10], fov: 50 }}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        
        <Suspense fallback={<FallbackGeometry site={site} hotspots={site.hotspots} onHotspotClick={handleHotspotClick} />}>
          {site.model ? (
            <ErrorBoundary FallbackComponent={() => <FallbackGeometry site={site} hotspots={site.hotspots} onHotspotClick={handleHotspotClick} />}>
              <GLTFModel url={site.model} hotspots={site.hotspots} onHotspotClick={handleHotspotClick} />
            </ErrorBoundary>
          ) : (
            <FallbackGeometry site={site} hotspots={site.hotspots} onHotspotClick={handleHotspotClick} />
          )}
          <Environment preset="sunset" />
        </Suspense>
        
        <CameraRig 
          targetPos={activeHotspot?.cameraPos} 
          targetLookAt={activeHotspot?.cameraTarget} 
          isAnimating={isAnimating} 
          onAnimationComplete={handleAnimationComplete} 
        />

        <OrbitControls 
          ref={orbitControlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2 - 0.1}
          makeDefault
        />
      </Canvas>
    </div>
  );
};

export default Site3DExperience;
