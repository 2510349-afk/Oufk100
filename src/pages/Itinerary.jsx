import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useJourney } from '../context/JourneyContext';

const Itinerary = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { journeyData } = useJourney();

  useEffect(() => {
    if (!journeyData) {
      navigate('/preferences');
    }
  }, [journeyData, navigate]);

  if (!journeyData) return null;

  return (
    <div style={{ padding: '6rem 2rem', maxWidth: '1000px', margin: '0 auto' }} className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem' }} className="title-gradient">
          {journeyData.journeyTitle[lang]}
        </h1>
        <button className="btn-primary" onClick={() => navigate('/map')}>
          {lang === 'en' ? 'View on Map' : 'عرض على الخريطة'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {journeyData.days.map((dayPlan, index) => (
          <div key={index} className="glass-panel" style={{ padding: '2rem', borderLeft: '4px solid var(--accent-gold)' }}>
            <h2 style={{ marginBottom: '0.5rem', color: 'var(--accent-gold)' }}>
              {lang === 'en' ? `Day ${dayPlan.day}` : `اليوم ${dayPlan.day}`}
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              {dayPlan.description[lang]}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {dayPlan.sites.map(site => (
                <div key={site.id} style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', overflow: 'hidden' }}>
                  {/* Pseudo-image placeholder */}
                  <div style={{ height: '150px', background: 'linear-gradient(45deg, #1a1a2e, #16213e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ opacity: 0.5 }}>{site.name[lang]}</span>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h3 style={{ margin: 0 }}>{site.name[lang]}</h3>
                      <div style={{ background: 'rgba(212, 175, 55, 0.1)', color: 'var(--accent-gold)', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.9rem' }}>
                        {site.matchScore}% MATCH
                      </div>
                    </div>
                    
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', borderLeft: '2px solid var(--accent-teal)' }}>
                      <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--accent-teal)', marginBottom: '0.5rem' }}>
                        {lang === 'en' ? 'Why this place?' : 'لماذا هذا المكان؟'}
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                        {site.whyThisPlace[lang]}
                      </p>
                    </div>

                    <button 
                      className="btn-outline" 
                      style={{ width: '100%', marginTop: '1.5rem', padding: '10px' }}
                      onClick={() => navigate(`/site/${site.slug}`)}
                    >
                      {lang === 'en' ? 'Explore in 3D' : 'استكشف بتقنية 3D'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;
