import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useJourney } from '../context/JourneyContext';
import { generateJourney } from '../services/aiProvider';
import { motion } from 'framer-motion';

const ALL_INTERESTS = ['History', 'Architecture', 'Culture', 'Photography', 'Nature', 'Adventure', 'Food', 'Family'];

const Preferences = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { preferences, setPreferences, setJourneyData, isGenerating, setIsGenerating } = useJourney();
  
  const toggleInterest = (interest) => {
    setPreferences(prev => {
      const current = prev.interests;
      if (current.includes(interest)) {
        return { ...prev, interests: current.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...current, interest] };
      }
    });
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Call the OUFQ AI Engine (Mock)
    const result = await generateJourney(preferences);
    setJourneyData(result);
    setIsGenerating(false);
    navigate('/itinerary');
  };

  if (isGenerating) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          style={{ width: '50px', height: '50px', border: '3px solid transparent', borderTopColor: 'var(--accent-gold)', borderRadius: '50%', marginBottom: '2rem' }}
        />
        <h2 className="title-gradient animate-fade-in">
          {lang === 'en' ? 'OUFQ AI is generating your journey...' : 'أفق AI يقوم بإنشاء رحلتك...'}
        </h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto' }} className="animate-fade-in">
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }} className="title-gradient">
        {lang === 'en' ? 'Tell us what you love.' : 'أخبرنا عما تحب.'}
      </h1>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>
          {lang === 'en' ? 'What are you interested in?' : 'ما هي اهتماماتك؟'}
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {ALL_INTERESTS.map(interest => {
            const isSelected = preferences.interests.includes(interest);
            return (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={isSelected ? 'btn-primary' : 'btn-outline'}
                style={{ borderRadius: '20px', padding: '8px 16px', fontSize: '0.9rem' }}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>
          {lang === 'en' ? 'How many days?' : 'كم عدد الأيام؟'}
        </h3>
        <input 
          type="range" 
          min="1" max="7" 
          value={preferences.duration} 
          onChange={(e) => setPreferences({...preferences, duration: parseInt(e.target.value)})}
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        <div style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent-gold)' }}>
          {preferences.duration} {lang === 'en' ? 'Days' : 'أيام'}
        </div>
      </div>
      
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>
          {lang === 'en' ? 'What\'s your travel style?' : 'ما هو أسلوب سفرك؟'}
        </h3>
        <select 
          className="btn-outline"
          value={preferences.style}
          onChange={(e) => setPreferences({...preferences, style: e.target.value})}
          style={{ width: '100%', appearance: 'none', textAlign: lang === 'ar' ? 'right' : 'left' }}
        >
          <option value="Deep Cultural Experience">{lang === 'en' ? 'Deep Cultural Experience' : 'تجربة ثقافية عميقة'}</option>
          <option value="Fast & Highlights">{lang === 'en' ? 'Fast & Highlights' : 'سريع وأهم المعالم'}</option>
          <option value="Relaxed">{lang === 'en' ? 'Relaxed' : 'مريح'}</option>
        </select>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button 
          className="btn-primary" 
          onClick={handleGenerate}
          disabled={preferences.interests.length === 0}
          style={{ width: '100%', padding: '15px', fontSize: '1.2rem', opacity: preferences.interests.length === 0 ? 0.5 : 1 }}
        >
          {lang === 'en' ? 'Generate My Journey' : 'أنشئ رحلتي'}
        </button>
      </div>
    </div>
  );
};

export default Preferences;
