import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { JourneyProvider } from './context/JourneyContext';
import './styles/global.css';

// Pages
import Landing from './pages/Landing';
import Preferences from './pages/Preferences';
import Itinerary from './pages/Itinerary';
import MapView from './pages/MapView';
import Site3DExperience from './pages/Site3DExperience';
import StoryMode from './pages/StoryMode';

const AppLayout = ({ children }) => {
  const { lang, toggleLanguage } = useLanguage();
  return (
    <div className="app-container">
      <header style={{ 
        position: 'fixed', top: 0, width: '100%', zIndex: 100, 
        padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '2px' }} className="title-gradient">
          OUFQ 100
        </div>
        <button 
          onClick={toggleLanguage} 
          className="btn-outline" 
          style={{ padding: '6px 12px', fontSize: '0.9rem' }}
        >
          {lang === 'en' ? 'عربي' : 'English'}
        </button>
      </header>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <JourneyProvider>
        <Router>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/preferences" element={<Preferences />} />
              <Route path="/itinerary" element={<Itinerary />} />
              <Route path="/map" element={<MapView />} />
              <Route path="/site/:slug" element={<Site3DExperience />} />
              <Route path="/site/:slug/story" element={<StoryMode />} />
            </Routes>
          </AppLayout>
        </Router>
      </JourneyProvider>
    </LanguageProvider>
  );
}

export default App;
