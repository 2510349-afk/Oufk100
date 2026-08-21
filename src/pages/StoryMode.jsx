import React, { Suspense, useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useLanguage } from '../i18n/LanguageContext';
import { sites } from '../data/sites';
import { GLTFModel } from '../components/3D/GLTFModel';
import { CameraRig } from '../components/3D/CameraRig';
import { ErrorBoundary } from 'react-error-boundary';
import { motion, AnimatePresence } from 'framer-motion';

const FallbackGeometry = ({ site }) => {
  return (
    <mesh position={[0, 0, 0]} castShadow receiveShadow>
      <boxGeometry args={[4, 4, 4]} />
      <meshStandardMaterial color="#3a2f28" roughness={0.9} wireframe />
    </mesh>
  );
};

const StoryMode = () => {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const site = sites.find(s => s.slug === slug);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  if (!site) return <div>Site not found</div>;

  // Build a story sequence. First step is establishing shot, then hotspots.
  const storySequence = [
    {
      cameraTarget: [0, 1.5, 0],
      cameraPos: [0, 5, 12],
      title: site.name,
      description: site.history
    },
    ...(site.hotspots || []).map(hs => ({
      cameraTarget: hs.cameraTarget,
      cameraPos: hs.cameraPos,
      title: hs.title,
      description: hs.description
    }))
  ];

  const currentStory = storySequence[currentStep];

  const handleNext = () => {
    if (currentStep < storySequence.length - 1) {
      setCurrentStep(prev => prev + 1);
      setIsAnimating(true);
    } else {
      navigate('/itinerary'); // End of story
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setIsAnimating(true);
    }
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', background: '#000' }}>
      
      {/* UI Overlay */}
      <div 
        style={{ 
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: '2rem', zIndex: 10, pointerEvents: 'none'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', pointerEvents: 'auto' }}>
           <h2 style={{ color: 'var(--accent-gold)' }}>
             {lang === 'en' ? 'Guided Story' : 'القصة الموجهة'}
           </h2>
           <button className="btn-outline" onClick={() => navigate(`/site/${slug}`)}>
             {lang === 'en' ? 'Exit Story' : 'خروج من القصة'}
           </button>
        </div>
        
        {/* Cinematic Subtitles / Info Box */}
        <div style={{ display: 'flex', justifyContent: 'center', pointerEvents: 'auto' }}>
          <div className="glass-panel" style={{ padding: '2rem', maxWidth: '600px', width: '100%', textAlign: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
              >
                <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
                  {currentStory.title[lang]}
                </h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '2rem' }}>
                  {currentStory.description[lang]}
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button className="btn-outline" onClick={handlePrev} disabled={currentStep === 0 || isAnimating}>
                    {lang === 'en' ? 'Previous' : 'السابق'}
                  </button>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    {currentStep + 1} / {storySequence.length}
                  </span>
                  <button className="btn-primary" onClick={handleNext} disabled={isAnimating}>
                    {currentStep === storySequence.length - 1 ? (lang === 'en' ? 'Finish' : 'إنهاء') : (lang === 'en' ? 'Next' : 'التالي')}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas shadows camera={{ position: [0, 5, 12], fov: 45 }}>
        <color attach="background" args={['#020202']} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        
        <Suspense fallback={<FallbackGeometry />}>
          {site.model ? (
            <ErrorBoundary FallbackComponent={() => <FallbackGeometry />}>
              <GLTFModel url={site.model} hotspots={null} onHotspotClick={() => {}} />
            </ErrorBoundary>
          ) : (
            <FallbackGeometry />
          )}
          <Environment preset="night" />
        </Suspense>
        
        <CameraRig 
          targetPos={currentStory.cameraPos} 
          targetLookAt={currentStory.cameraTarget} 
          isAnimating={true} // Always animate to the current step target
          onAnimationComplete={handleAnimationComplete} 
        />
      </Canvas>
    </div>
  );
};

export default StoryMode;
