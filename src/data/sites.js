export const sites = [
  {
    id: 'petra',
    name: { en: 'Petra', ar: 'البتراء' },
    slug: 'petra',
    location: { en: 'Ma\'an Governorate', ar: 'محافظة معان' },
    coordinates: [30.3285, 35.4444],
    historicalPeriod: { en: 'Nabataean', ar: 'الأنباط' },
    history: {
      en: 'Petra, originally known to its inhabitants as Raqmu, is a historical and archaeological city in southern Jordan. It is famous for its rock-cut architecture and water conduit system.',
      ar: 'البتراء، التي عُرفت قديماً باسم "رقيم"، هي مدينة تاريخية وأثرية تقع في جنوب الأردن. تشتهر بعمارتها المنحوتة في الصخر ونظام قنوات المياه القديم.'
    },
    culture: { en: 'A blend of Nabataean and Hellenistic influences.', ar: 'مزيج من التأثيرات النبطية والهلنستية.' },
    architecture: { en: 'Rock-cut facades, elaborate tombs, and temples.', ar: 'واجهات منحوتة في الصخر، مقابر متقنة، ومعابد.' },
    story: {
      en: 'Walk through the Siq, a narrow gorge, to reveal the Treasury (Al-Khazneh), a breathtaking sight that has stood for over 2,000 years.',
      ar: 'امشِ عبر السيق، وهو مضيق ضيق، لتكتشف الخزنة، وهي مشهد يخطف الأنفاس صمد لأكثر من 2000 عام.'
    },
    highlights: ['The Siq', 'The Treasury', 'The Monastery', 'Royal Tombs', 'Street of Facades'],
    whyVisit: {
      en: 'It is a world wonder and the most famous archaeological site in Jordan.',
      ar: 'هي إحدى عجائب الدنيا وأشهر موقع أثري في الأردن.'
    },
    estimatedVisitTime: 8, // hours
    interests: ['History', 'Architecture', 'Photography', 'Adventure'],
    relatedSites: ['Little Petra', 'Wadi Rum'],
    image: '/images/petra.jpg',
    model: '/assets/3d/petra.glb',
    hotspots: [
      {
        id: 'hs1',
        position: [0, 2, 5],
        cameraTarget: [0, 2, 0],
        cameraPos: [0, 2, 10],
        title: { en: 'The Treasury', ar: 'الخزنة' },
        description: { en: 'The most famous facade in Petra, carved directly into the vibrant red sandstone cliff.', ar: 'أشهر واجهة في البتراء، منحوتة مباشرة في الجرف الرملي الأحمر النابض بالحياة.' }
      },
      {
        id: 'hs2',
        position: [3, 1, 0],
        cameraTarget: [3, 1, 0],
        cameraPos: [8, 2, 3],
        title: { en: 'The Siq', ar: 'السيق' },
        description: { en: 'The main entrance to the ancient Nabataean city of Petra, a dim, narrow gorge.', ar: 'المدخل الرئيسي لمدينة البتراء النبطية القديمة، وهو ممر ضيق معتم.' }
      },
      {
        id: 'hs3',
        position: [-4, 3, -2],
        cameraTarget: [-4, 3, -2],
        cameraPos: [-8, 4, -5],
        title: { en: 'Royal Tombs', ar: 'المقابر الملكية' },
        description: { en: 'A series of large mausoleums with impressive facades carved into the western flank of the Jabal al-Khubtha.', ar: 'سلسلة من الأضرحة الكبيرة بواجهات رائعة منحوتة في الجناح الغربي لجبل الخبثة.' }
      }
    ]
  },
  {
    id: 'jerash',
    name: { en: 'Jerash', ar: 'جرش' },
    slug: 'jerash',
    location: { en: 'Jerash Governorate', ar: 'محافظة جرش' },
    coordinates: [32.2723, 35.8914],
    historicalPeriod: { en: 'Roman', ar: 'الرومانية' },
    history: {
      en: 'Jerash is the site of the ruins of the Greco-Roman city of Gerasa, one of the best-preserved Roman provincial cities in the world.',
      ar: 'تضم جرش أطلال مدينة جراسا اليونانية الرومانية، وهي واحدة من أفضل المدن الرومانية المحفوظة في العالم.'
    },
    culture: { en: 'Roman provincial life, theater, and public gatherings.', ar: 'الحياة الإقليمية الرومانية، المسرح، والتجمعات العامة.' },
    architecture: { en: 'Colonnaded streets, monumental gates, and oval plazas.', ar: 'شوارع معمدة، بوابات ضخمة، وساحات بيضاوية.' },
    story: {
      en: 'Enter through Hadrian\'s Arch and walk the Cardo Maximus, where the chariot ruts can still be seen in the stones.',
      ar: 'ادخل عبر قوس هادريان وامش في شارع الأعمدة، حيث لا يزال من الممكن رؤية آثار عجلات العربات في الحجارة.'
    },
    highlights: ['Hadrian\'s Arch', 'Oval Plaza', 'Cardo Maximus', 'South Theater', 'Temple of Artemis'],
    whyVisit: {
      en: 'Experience the grandeur of the Roman Empire in the Middle East.',
      ar: 'عش عظمة الإمبراطورية الرومانية في الشرق الأوسط.'
    },
    estimatedVisitTime: 4,
    interests: ['History', 'Architecture', 'Photography', 'Culture'],
    relatedSites: ['Amman Citadel', 'Umm Qais'],
    image: '/images/jerash.jpg'
  },
  {
    id: 'amman-citadel',
    name: { en: 'Amman Citadel', ar: 'جبل القلعة' },
    slug: 'amman-citadel',
    location: { en: 'Amman', ar: 'عمان' },
    coordinates: [31.9544, 35.9355],
    historicalPeriod: { en: 'Multiple (Bronze Age to Islamic)', ar: 'عصور متعددة (البرونزي إلى الإسلامي)' },
    history: {
      en: 'The Amman Citadel is a historical site at the center of downtown Amman, Jordan. Known in Arabic as Jabal al-Qal\'a, it is one of the world\'s oldest continuously inhabited places.',
      ar: 'جبل القلعة هو موقع تاريخي في وسط العاصمة الأردنية عمان. يُعتبر من أقدم الأماكن المأهولة بالسكان باستمرار في العالم.'
    },
    culture: { en: 'A melting pot of Ammonite, Roman, Byzantine, and Umayyad cultures.', ar: 'بوتقة تنصهر فيها ثقافات العمونيين، الرومان، البيزنطيين، والأمويين.' },
    architecture: { en: 'Roman temples, Byzantine churches, and Umayyad palaces.', ar: 'معابد رومانية، كنائس بيزنطية، وقصور أموية.' },
    story: {
      en: 'Stand beside the towering pillars of the Temple of Hercules and look down upon the ancient Roman Theater and the bustling modern city of Amman.',
      ar: 'قف بجانب الأعمدة الشاهقة لمعبد هرقل وانظر إلى المسرح الروماني القديم والمدينة الحديثة الصاخبة.'
    },
    highlights: ['Temple of Hercules', 'Umayyad Palace', 'National Archaeological Museum', 'Byzantine Church'],
    whyVisit: {
      en: 'Offers a panoramic view of Amman alongside millennia of history.',
      ar: 'يوفر إطلالة بانورامية على عمان إلى جانب آلاف السنين من التاريخ.'
    },
    estimatedVisitTime: 2,
    interests: ['History', 'Culture', 'Photography', 'Family'],
    relatedSites: ['Roman Theater', 'Jerash'],
    image: '/images/citadel.jpg'
  },
  {
    id: 'ajloun-castle',
    name: { en: 'Ajloun Castle', ar: 'قلعة عجلون' },
    slug: 'ajloun-castle',
    location: { en: 'Ajloun Governorate', ar: 'محافظة عجلون' },
    coordinates: [32.325, 35.7275],
    historicalPeriod: { en: 'Ayyubid / Islamic', ar: 'الأيوبية / الإسلامية' },
    history: {
      en: 'Built in the 12th century by one of Saladin\'s generals, Ajloun Castle stands atop Mount \'Auf. It was constructed to protect the region from Crusader incursions.',
      ar: 'بُنيت في القرن الثاني عشر على يد أحد قادة صلاح الدين، وتقف قلعة عجلون على قمة جبل عوف. شُيدت لحماية المنطقة من غارات الصليبيين.'
    },
    culture: { en: 'Medieval Islamic military strategy and regional defense.', ar: 'الاستراتيجية العسكرية الإسلامية في العصور الوسطى والدفاع الإقليمي.' },
    architecture: { en: 'Islamic fortress architecture with thick walls, towers, and a moat.', ar: 'عمارة القلاع الإسلامية مع جدران سميكة وأبراج وخندق مائي.' },
    story: {
      en: 'Explore the labyrinth of vaulted passages, winding staircases, and massive towers that guarded the Jordan Valley.',
      ar: 'استكشف متاهة الممرات المقببة، والسلالم الحلزونية، والأبراج الضخمة التي كانت تحرس وادي الأردن.'
    },
    highlights: ['The Moat', 'Drawbridge', 'Watchtowers', 'Museum', 'Panoramic Views of the Jordan Valley'],
    whyVisit: {
      en: 'A prime example of Islamic military architecture set in lush greenery.',
      ar: 'مثال رئيسي للعمارة العسكرية الإسلامية وسط طبيعة خضراء.'
    },
    estimatedVisitTime: 3,
    interests: ['History', 'Architecture', 'Nature', 'Photography'],
    relatedSites: ['Jerash', 'Umm Qais'],
    image: '/images/ajloun.jpg'
  },
  {
    id: 'umm-qais',
    name: { en: 'Umm Qais (Gadara)', ar: 'أم قيس (جدارا)' },
    slug: 'umm-qais',
    location: { en: 'Irbid Governorate', ar: 'محافظة إربد' },
    coordinates: [32.654, 35.678],
    historicalPeriod: { en: 'Greco-Roman / Ottoman', ar: 'اليونانية الرومانية / العثمانية' },
    history: {
      en: 'Umm Qais is the site of the ancient Greco-Roman city of Gadara, perched on a hilltop overlooking the Sea of Galilee, the Golan Heights, and the Yarmouk River gorge.',
      ar: 'أم قيس هي موقع مدينة جدارا اليونانية الرومانية القديمة، وتقع على قمة تل يطل على بحيرة طبريا وهضبة الجولان ونهر اليرموك.'
    },
    culture: { en: 'A city of philosophers and poets, blending Hellenistic culture with local traditions.', ar: 'مدينة الفلاسفة والشعراء، حيث تمتزج الثقافة الهلنستية بالتقاليد المحلية.' },
    architecture: { en: 'Black basalt Roman ruins alongside an Ottoman village.', ar: 'أطلال رومانية من البازلت الأسود بجانب قرية عثمانية.' },
    story: {
      en: 'Wander through the ruins built of distinctive black basalt, and sit in the West Theater while taking in the stunning tri-country view.',
      ar: 'تجول بين الأطلال المبنية من البازلت الأسود المميز، واجلس في المسرح الغربي للاستمتاع بالإطلالة المذهلة على الدول الثلاث.'
    },
    highlights: ['West Theater', 'Basilica Terrace', 'Ottoman Village', 'View of the Sea of Galilee'],
    whyVisit: {
      en: 'Unique black basalt ruins and unparalleled views of the region.',
      ar: 'أطلال بازلتية سوداء فريدة وإطلالات لا مثيل لها على المنطقة.'
    },
    estimatedVisitTime: 3,
    interests: ['History', 'Nature', 'Photography'],
    relatedSites: ['Ajloun Castle', 'Jerash'],
    image: '/images/umm-qais.jpg'
  },
  {
    id: 'umm-al-jimal',
    name: { en: 'Umm Al-Jimal', ar: 'أم الجمال' },
    slug: 'umm-al-jimal',
    location: { en: 'Mafraq Governorate', ar: 'محافظة المفرق' },
    coordinates: [32.328, 36.368],
    historicalPeriod: { en: 'Nabataean / Roman / Byzantine', ar: 'النبطية / الرومانية / البيزنطية' },
    history: {
      en: 'Known as the "Black Oasis," Umm Al-Jimal is an ancient city built entirely out of black basalt rock. It flourished during the Roman and Byzantine periods as an agricultural and trading hub.',
      ar: 'تُعرف أم الجمال باسم "الواحة السوداء"، وهي مدينة قديمة مبنية بالكامل من صخور البازلت السوداء. ازدهرت خلال الفترتين الرومانية والبيزنطية كمركز زراعي وتجاري.'
    },
    culture: { en: 'Desert frontier life, trade, and early Christian communities.', ar: 'الحياة على الحدود الصحراوية، التجارة، والمجتمعات المسيحية المبكرة.' },
    architecture: { en: 'Cantilevered basalt stairs, multi-story houses, and numerous churches without the use of timber.', ar: 'سلالم بازلتية كابولية، منازل متعددة الطوابق، والعديد من الكنائس المبنية دون استخدام الخشب.' },
    story: {
      en: 'Discover how the inhabitants engineered sophisticated water harvesting systems to thrive in this stark, volcanic landscape.',
      ar: 'اكتشف كيف هندس السكان أنظمة متطورة لجمع المياه من أجل الازدهار في هذه المناظر الطبيعية البركانية القاسية.'
    },
    highlights: ['Barracks', 'Numerianos Church', 'Commodus Gate', 'Water Reservoirs'],
    whyVisit: {
      en: 'A fascinating study in desert adaptation and unique basalt architecture.',
      ar: 'دراسة رائعة في التكيف مع الصحراء والعمارة البازلتية الفريدة.'
    },
    estimatedVisitTime: 2.5,
    interests: ['History', 'Architecture', 'Culture'],
    relatedSites: ['Jerash', 'Amman Citadel'],
    image: '/images/umm-al-jimal.jpg'
  }
];
