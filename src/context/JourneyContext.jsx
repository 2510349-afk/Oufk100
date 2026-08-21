import React, { createContext, useState, useContext } from 'react';

const JourneyContext = createContext();

export const JourneyProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    interests: [],
    duration: 3,
    style: 'Deep Cultural Experience'
  });
  
  const [journeyData, setJourneyData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <JourneyContext.Provider value={{
      preferences,
      setPreferences,
      journeyData,
      setJourneyData,
      isGenerating,
      setIsGenerating
    }}>
      {children}
    </JourneyContext.Provider>
  );
};

export const useJourney = () => useContext(JourneyContext);
