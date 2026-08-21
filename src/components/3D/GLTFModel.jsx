import React, { useRef, useState } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useLanguage } from '../../i18n/LanguageContext';

export const GLTFModel = ({ url, hotspots, onHotspotClick }) => {
  const { lang } = useLanguage();
  const group = useRef();
  
  // Attempt to load the model. In a real app, you'd want ErrorBoundary to catch loading failures
  // For the MVP, if the model fails, it usually throws. We will wrap the suspense boundary in the parent.
  const { scene } = url ? useGLTF(url) : { scene: null };

  return (
    <group ref={group} dispose={null}>
      {scene && <primitive object={scene} />}
      
      {/* Render Hotspots */}
      {hotspots && hotspots.map((hotspot) => (
        <Html 
          key={hotspot.id} 
          position={hotspot.position} 
          center 
          distanceFactor={15} // Scale based on distance
          zIndexRange={[100, 0]}
        >
          <div 
            onClick={(e) => {
              e.stopPropagation();
              onHotspotClick(hotspot);
            }}
            style={{
              cursor: 'pointer',
              background: 'rgba(20, 20, 24, 0.85)',
              border: '1px solid var(--accent-gold)',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(212, 175, 55, 0.5)',
              transition: 'transform 0.2s, background 0.2s'
            }}
            className="hotspot-marker"
            title={hotspot.title[lang]}
          >
            <div style={{ width: '10px', height: '10px', background: 'var(--accent-gold)', borderRadius: '50%' }} />
          </div>
        </Html>
      ))}
    </group>
  );
};

// Preload is good practice for 3D assets, though for an MVP with missing assets we might avoid it
// useGLTF.preload('/assets/3d/petra.glb');
