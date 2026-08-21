import { sites } from '../data/sites';

// Mock AI engine for OUFQ 100 MVP
export const generateJourney = async (preferences) => {
  const { interests = [], duration = 3, style = 'Cultural' } = preferences;
  
  // Simulate network delay for AI processing
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Determine a simple scoring algorithm based on interest matching
  const scoredSites = sites.map(site => {
    let score = 50; // Base score
    let matchingInterests = [];
    
    interests.forEach(interest => {
      if (site.interests.includes(interest)) {
        score += 15;
        matchingInterests.push(interest);
      }
    });

    // Cap score at 98%
    if (score > 98) score = 98;
    
    // Generate explanation based on matched interests
    let whyEn = '';
    let whyAr = '';
    
    if (matchingInterests.length > 0) {
      whyEn = `${site.name.en} was selected because it strongly matches your interest in ${matchingInterests.join(', ').toLowerCase()}.`;
      whyAr = `تم اختيار ${site.name.ar} لأنه يتوافق بشدة مع اهتماماتك في ${matchingInterests.join(' و ')}.`;
    } else {
      whyEn = `${site.name.en} is a must-visit destination in Jordan offering rich cultural heritage.`;
      whyAr = `تعتبر ${site.name.ar} وجهة لا بد من زيارتها في الأردن لما تتمتع به من تراث ثقافي غني.`;
    }

    return {
      ...site,
      matchScore: score,
      whyThisPlace: { en: whyEn, ar: whyAr }
    };
  });

  // Sort by score descending
  scoredSites.sort((a, b) => b.matchScore - a.matchScore);

  // Group sites into days based on duration
  // For a fast demo, we distribute top sites into the requested days
  const journey = [];
  const totalSitesToSelect = Math.min(duration * 2, scoredSites.length); // Up to 2 sites per day
  const selectedSites = scoredSites.slice(0, totalSitesToSelect);
  
  for (let i = 0; i < duration; i++) {
    const daySites = [];
    if (selectedSites.length > 0) daySites.push(selectedSites.shift());
    if (selectedSites.length > 0 && Math.random() > 0.3) daySites.push(selectedSites.shift()); // Sometimes 2 sites per day
    
    if (daySites.length > 0) {
      journey.push({
        day: i + 1,
        sites: daySites,
        description: {
          en: `Day ${i + 1} will take you to explore ${daySites.map(s => s.name.en).join(' and ')}.`,
          ar: `اليوم ${i + 1} سيأخذك لاستكشاف ${daySites.map(s => s.name.ar).join(' و ')}.`
        }
      });
    }
  }

  return {
    journeyTitle: { en: 'Your Personalized Journey', ar: 'رحلتك المخصصة' },
    days: journey
  };
};
