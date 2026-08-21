import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';

const Landing = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  
  // Cinematic fallback using opacity and scale transformations bound to scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const opacityScene1 = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]);
  const opacityScene2 = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
  const opacityScene3 = useTransform(scrollYProgress, [0.6, 0.8, 1], [0, 1, 1]);

  return (
    <div style={{ height: '300vh', background: '#000', position: 'relative' }}>
      
      {/* Scrollable Cinematic Engine Fallback */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        
        {/* Scene 1: Jordan */}
        <motion.div 
          style={{ 
            position: 'absolute', inset: 0, scale, opacity: opacityScene1,
            background: 'linear-gradient(to bottom, #1a1a2e, #16213e)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
          }}
        >
          <h1 className="title-gradient" style={{ fontSize: '4rem', marginBottom: '1rem' }}>
            {lang === 'en' ? 'JORDAN 2076' : 'الأردن 2076'}
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#ccc' }}>
            {lang === 'en' ? 'Scroll to explore the future of the past.' : 'قم بالتمرير لاستكشاف مستقبل الماضي.'}
          </p>
        </motion.div>

        {/* Scene 2: Ancient Jordan */}
        <motion.div 
          style={{ 
            position: 'absolute', inset: 0, scale, opacity: opacityScene2,
            background: 'linear-gradient(to bottom, #4a2d1d, #1a0f0a)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
          }}
        >
          <h2 style={{ fontSize: '3rem', color: '#D4AF37' }}>
            {lang === 'en' ? 'Ancient Jordan' : 'الأردن القديم'}
          </h2>
        </motion.div>

        {/* Scene 3: CTA */}
        <motion.div 
          style={{ 
            position: 'absolute', inset: 0, scale, opacity: opacityScene3,
            background: 'linear-gradient(to bottom, #0a0a0c, #000)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
          }}
        >
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', maxWidth: '600px' }}>
            <h1 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              {lang === 'en' ? 'Discover Jordan through a journey built around YOU.' : 'اكتشف الأردن عبر رحلة صُممت خصيصاً لك.'}
            </h1>
            <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              {lang === 'en' 
                ? 'Your interests. Your journey. Jordan\'s story.' 
                : 'اهتماماتك. رحلتك. قصة الأردن.'}
            </p>
            <button 
              className="btn-primary animate-fade-in" 
              onClick={() => navigate('/preferences')}
            >
              {lang === 'en' ? 'Start Your Journey' : 'ابدأ رحلتك'}
            </button>
          </div>
        </motion.div>

      </div>
      
      {/* Scroll Prompt indicator */}
      <div style={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 50, color: 'white', opacity: 0.7, pointerEvents: 'none' }}>
        <div style={{ animation: 'bounce 2s infinite', textAlign: 'center' }}>
          ↓
        </div>
      </div>
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

export default Landing;
