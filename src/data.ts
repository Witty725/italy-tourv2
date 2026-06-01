export interface ChecklistItem {
  id: string;
  category: string;
  text: string;
  subText?: string;
}

export const packingList: ChecklistItem[] = [
  // Documents & Finance
  { id: 'doc-1', category: 'Documents & Finance', text: 'Passports (both)', subText: 'Global Entry Cards' },
  { id: 'doc-3', category: 'Documents & Finance', text: 'Airline Tickets', subText: 'Digital/Printed Boarding Passes (Delta)' },
  { id: 'doc-4', category: 'Documents & Finance', text: 'MSC Splendida Cruise Boarding Passes', subText: 'Embarkation vouchers & luggage tags' },
  { id: 'doc-6', category: 'Documents & Finance', text: 'Travel Insurance Policies', subText: 'Printed papers + mobile app access' },
  { id: 'doc-7', category: 'Documents & Finance', text: 'Hotel Confirmations', subText: 'Pontremoli Napoleon Hotel reservations' },
  { id: 'doc-8', category: 'Documents & Finance', text: 'Car Rental Confirmations', subText: 'Private transfer summaries & Tesla rentals' },
  { id: 'doc-9', category: 'Documents & Finance', text: 'Prescription Records' },
  { id: 'doc-11', category: 'Documents & Finance', text: 'List of Medications & Allergies' },
  { id: 'doc-12', category: 'Documents & Finance', text: 'Emergency Contacts', subText: 'Family, pet details + essential medical phone list' },
  { id: 'doc-13', category: 'Documents & Finance', text: 'Credit & Debit Cards', subText: 'Notify bank of travel, carry backup cards' },
  { id: 'doc-15', category: 'Documents & Finance', text: 'Cash (Euros)', subText: 'Small currency bills for quick tips and local gelaterias' },
  { id: 'doc-18', category: 'Documents & Finance', text: 'Vet and Emergency Vet Contact Information' },
  { id: 'doc-19', category: 'Documents & Finance', text: 'Check with phone provider for international service rates', subText: 'Ensure cellular data or daily passes (such as AT&T International Day Pass or Verizon TravelPass) are activated' },

  // Packing Essentials
  { id: 'pe-1', category: 'Packing Essentials', text: '5-6 Casual Dresses / Lightweight Pants', subText: 'Light khakis, skorts, or grey chinos' },
  { id: 'pe-2', category: 'Packing Essentials', text: '4-5 Pairs of Skorts or Shorts', subText: 'Athletic + casual options for daily port excursions' },
  { id: 'pe-3', category: 'Packing Essentials', text: '6-8 Versatile Tops & T-Shirts', subText: 'Mix of light blouses, athletic, and casual wear' },
  { id: 'pe-4', category: 'Packing Essentials', text: '4-5 Polos', subText: 'Comfortable shirts for dinners, Mass, and cruise ship days' },
  { id: 'pe-5', category: 'Packing Essentials', text: '1-2 Light Layers', subText: 'Cardigans, shawls, or long-sleeve button-ups (AC & sun protection)' },
  { id: 'pe-6', category: 'Packing Essentials', text: '1 Church Proper Attire Outfit', subText: 'Modest long dress/skirt or light pants covering knees for historic churches' },
  { id: 'pe-7', category: 'Packing Essentials', text: '10x Underwear & 6-8x Pairs of Performance Socks', subText: 'Comfortable performance fabrics or merino wool for sightseeing' },
  { id: 'pe-8', category: 'Packing Essentials', text: '2 Swimwear Sets', subText: 'Pack 2 beach sets / swim trunks + light cover-ups' },
  { id: 'pe-9', category: 'Packing Essentials', text: '2-3 Athletic Clothing Sets', subText: 'For active days (e-bikes, gorge floating, gym)' },
  { id: 'pe-10', category: 'Packing Essentials', text: '1-2 Pairs of Walking Sneakers', subText: 'Well broken-in athletic shoes for continuous exploration' },
  { id: 'pe-11', category: 'Packing Essentials', text: '1-2 Pairs of Casual Footwear', subText: 'Sandals, flats, or comfortable dinner shoes' },
  { id: 'pe-12', category: 'Packing Essentials', text: '1 Pair of Flip-Flops', subText: 'Ideal for cruise cabin, deck pools, and sandy beaches' },
  { id: 'pe-13', category: 'Packing Essentials', text: 'Solar & Insect Protection', subText: 'High-SPF reef-safe sunscreen, travel bug spray' },
  { id: 'pe-14', category: 'Packing Essentials', text: 'Blister Plasters (Compeed)', subText: 'Essential for long trail walking + mini first-aid kit' },
  { id: 'pe-19', category: 'Packing Essentials', text: 'Pepto Tablets', subText: 'Relief tablets for indigestion, sour stomach, or travelers diarrhea' },
  { id: 'pe-15', category: 'Packing Essentials', text: 'Travel Detergent Sheets', subText: 'Compact paper sheets + universal flat sink stoppers' },
  { id: 'pe-16', category: 'Packing Essentials', text: '1 Small Rain Umbrella', subText: 'Pocket size for unexpected continental rain showers' },
  { id: 'pe-17', category: 'Packing Essentials', text: 'Travel Size Toiletries', subText: 'TSA 3-1-1 compliant bottles & liquids bag' },
  { id: 'pe-18', category: 'Packing Essentials', text: '1 Microfiber Travel Towel', subText: 'Highly absorbent and rapid air-drying' },

  // Electronics & Gear
  { id: 'elec-1', category: 'Electronics & Gear', text: 'Anti-Theft Gear', subText: 'Neck wallet or RFID-blocking security pouch' },
  { id: 'elec-2', category: 'Electronics & Gear', text: 'Collapsible Water Bottle', subText: 'Reusable companion for scenic day walks, hot port excursions, and airport/cruise transits' },
  { id: 'elec-3', category: 'Electronics & Gear', text: 'Personal Devices', subText: 'Mobile phone, chargers, and compact personal tech' },
  { id: 'elec-4', category: 'Electronics & Gear', text: 'Work & Travel Laptop', subText: 'Laptop + power adapter packed safely in backpack' },
  { id: 'elec-5', category: 'Electronics & Gear', text: 'Power Banks', subText: 'High capacity backup battery for mobile phone cameras' },
  { id: 'elec-6', category: 'Electronics & Gear', text: 'EU Plug Adapters', subText: '2-3 portable adapters (Type C or F for Italy/Malta/Spain)' },
];

export interface ItineraryActivity {
  time?: string;
  title: string;
  description: string;
  guidedBy?: string;
  transport?: string;
  menu?: string;
  location?: string;
  coordinates?: string;
  icon?: 'hotel' | 'tour' | 'food' | 'concert' | 'ship' | 'church' | 'explore' | 'alert' | 'transfer' | 'unclassified';
  isFamilyEvent?: boolean;
}

export interface ItineraryDay {
  date: string;
  dayNum: number;
  month: 'June' | 'July';
  location: string;
  highF: number;
  lowF: number;
  weather: string;
  weatherDetails?: string;
  warning?: string;
  hotel?: {
    name: string;
    address: string;
    phone: string;
    notes?: string;
    coordinates?: string;
  };
  activities?: ItineraryActivity[];
}

export const itinerary: ItineraryDay[] = [
  {
    date: 'June 18, 2026',
    dayNum: 18,
    month: 'June',
    location: 'PONTREMOLI, ITALY',
    highF: 77,
    lowF: 58,
    weather: 'Mostly Sunny',
    weatherDetails: 'High: 77°F, Low: 58°F. Mostly sunny with a refreshing mountain breeze. Light humidity with a 15% chance of localized evening showers in the Lunigiana Valley mountains.',
    hotel: {
      name: 'Hotel Napoleon',
      address: 'Piazza Italia, 2, 54027 Pontremoli MS, Italy',
      phone: '+39 0187 830544',
      notes: 'Welcome to Pontremoli! Settle into your accommodations at Hotel Napoleon (Check-in starts at 15:00) and relax after your long journey. Ground transportation arrangements are ready.',
      coordinates: '44.3791,9.8784'
    },
    activities: [
      {
        title: 'Walk the historic Chiosi Bridge',
        description: 'Take a picturesque stroll over the 14th-century Chiosi Bridge (Ponte Chiosi) crossing the Verde river. The riverbed stones and historical arches make it a fantastic photo spot.',
        location: 'Ponte Chiosi, Pontremoli',
        coordinates: '44.3804,9.8821',
        icon: 'explore'
      },
      {
        title: 'Savor Amor cookies at Caffè Svizzer',
        description: 'Visit the historic Caffè Svizzer, open in Piazza della Repubblica since 1842. It has gorgeous wooden interiors. Pair your morning espresso with Pontremoli\'s signature Amor cream cake.',
        location: 'Piazza della Repubblica, Pontremoli',
        coordinates: '44.3778,9.8814',
        icon: 'food'
      },
      {
        title: 'Visit the historic Campanone Tower',
        description: 'Stand under the grand 14th-century defensive bell tower (Cacciaguerra) that separates the old Guelph and Ghibelline quarters. It has stood since 1322 as the iconic heart of the town.',
        location: 'Piazza del Duomo, Pontremoli',
        coordinates: '44.3789,9.8804',
        icon: 'explore'
      },
      {
        title: 'Admire the Golden Splendor of Pontremoli Cathedral',
        description: 'Step inside the light-filled Baroque interior of the Cathedral of Santa Maria Assunta. It features a giant, masterfully painted cupola, detailed gold stuccos, and spectacular marble altars.',
        location: 'Cattedrale di Santa Maria Assunta, Pontremoli',
        coordinates: '44.3787,9.8805',
        icon: 'tour'
      },
      {
        title: 'Enjoy Baci di Pontremoli at Pasticceria Della Cresa',
        description: 'Try their other super famous regional cookies, the chocolate and hazelnut Baci di Pontremoli (kisses), beautifully prepared at Pasticceria Della Cresa right near the river.',
        location: 'Pasticceria Della Cresa, Pontremoli',
        coordinates: '44.3791,9.8789',
        icon: 'food'
      },
      {
        title: 'Dinner at Osteria della Sanacore',
        description: 'Indulge in authentic Testaroli pasta—traditional dough baked in red-hot cast-iron testi pans and dressed in fresh basil pesto. Pair it with local Lunigiana white wine.',
        location: 'Osteria della Sanacore, Pontremoli',
        coordinates: '44.3785,9.8816',
        icon: 'food'
      }
    ]
  },
  {
    date: 'June 19, 2026',
    dayNum: 19,
    month: 'June',
    location: 'PONTREMOLI, ITALY',
    highF: 78,
    lowF: 57,
    weather: 'Mild & Clear',
    weatherDetails: 'High: 78°F, Low: 57°F. Gorgeous clear skies during the day. Ideal temperature for outdoor exploring. Dry conditions with light wind from the north of around 6 mph.',
    hotel: {
      name: 'Hotel Napoleon',
      address: 'Piazza Italia, 2, 54027 Pontremoli MS, Italy',
      phone: '+39 0187 830544',
      notes: 'Night 2 of stay in Pontremoli. Walking distance to local cafes and piazzas.',
      coordinates: '44.3791,9.8784'
    },
    activities: [
      {
        title: 'Walk the historic Chiosi Bridge',
        description: 'Take a picturesque stroll over the 14th-century Chiosi Bridge (Ponte Chiosi) crossing the Verde river. The riverbed stones and historical arches make it a fantastic photo spot.',
        location: 'Ponte Chiosi, Pontremoli',
        coordinates: '44.3804,9.8821',
        icon: 'explore'
      },
      {
        title: 'Savor Amor cookies at Caffè Svizzer',
        description: 'Visit the historic Caffè Svizzer, open in Piazza della Repubblica since 1842. It has gorgeous wooden interiors. Pair your morning espresso with Pontremoli\'s signature Amor cream cake.',
        location: 'Piazza della Repubblica, Pontremoli',
        coordinates: '44.3778,9.8814',
        icon: 'food'
      },
      {
        title: 'Visit the historic Campanone Tower',
        description: 'Stand under the grand 14th-century defensive bell tower (Cacciaguerra) that separates the old Guelph and Ghibelline quarters. It has stood since 1322 as the iconic heart of the town.',
        location: 'Piazza del Duomo, Pontremoli',
        coordinates: '44.3789,9.8804',
        icon: 'explore'
      },
      {
        title: 'Admire the Golden Splendor of Pontremoli Cathedral',
        description: 'Step inside the light-filled Baroque interior of the Cathedral of Santa Maria Assunta. It features a giant, masterfully painted cupola, detailed gold stuccos, and spectacular marble altars.',
        location: 'Cattedrale di Santa Maria Assunta, Pontremoli',
        coordinates: '44.3787,9.8805',
        icon: 'tour'
      },
      {
        title: 'Enjoy Baci di Pontremoli at Pasticceria Della Cresa',
        description: 'Try their other super famous regional cookies, the chocolate and hazelnut Baci di Pontremoli (kisses), beautifully prepared at Pasticceria Della Cresa right near the river.',
        location: 'Pasticceria Della Cresa, Pontremoli',
        coordinates: '44.3791,9.8789',
        icon: 'food'
      },
      {
        title: 'Dinner at Osteria della Sanacore',
        description: 'Indulge in authentic Testaroli pasta—traditional dough baked in red-hot cast-iron testi pans and dressed in fresh basil pesto. Pair it with local Lunigiana white wine.',
        location: 'Osteria della Sanacore, Pontremoli',
        coordinates: '44.3785,9.8816',
        icon: 'food'
      }
    ]
  },
  {
    date: 'June 20, 2026',
    dayNum: 20,
    month: 'June',
    location: 'PONTREMOLI, ITALY',
    highF: 76,
    lowF: 59,
    weather: 'Mostly Sunny',
    weatherDetails: 'High: 76°F, Low: 59°F. Pleasant day with some high-altitude clouds. High UV index of 8, so make sure to wear sunscreen during the walking tour.',
    hotel: {
      name: 'Hotel Napoleon',
      address: 'Piazza Italia, 2, 54027 Pontremoli MS, Italy',
      phone: '+39 0187 830544',
      notes: 'Settle into your accommodations at Hotel Napoleon and relax.',
      coordinates: '44.3791,9.8784'
    },
    activities: [
      {
        time: '14:00',
        title: 'Walking Tour of Piagnaro Castle and Museum of Lunigiana Stele Statues',
        description: 'A spectacular tour exploring the robust fortress of Piagnaro Castle and the mysterious ancient Stele Statues, fascinating prehistoric stone monuments.',
        guidedBy: 'Laura Consonni (Local Expert)',
        transport: 'Private Van Service provided',
        coordinates: '44.3809,9.8803',
        icon: 'tour'
      },
      {
        time: '18:00',
        title: 'Light Dinner Buffet & Historical Presentation',
        description: 'An exclusive history session and social gathering hosted by local scholar Paolo. Please note this is a standing-room event with only a few small tables and chairs for comfort.',
        guidedBy: 'Paolo (Historian & Presenter)',
        menu: 'Savory pies (Torta d’Erbi), authentic focaccia with cured meats and local cheeses, spritz cocktail, sparkling prosecco, soft drinks, and mineral water.',
        coordinates: '44.3787,9.8805',
        icon: 'food'
      }
    ]
  },
  {
    date: 'June 21, 2026',
    dayNum: 21,
    month: 'June',
    location: 'PONTREMOLI COUNTRYSIDE',
    highF: 79,
    lowF: 58,
    weather: 'Warm & Sunny',
    weatherDetails: 'High: 79°F, Low: 58°F. Absolutely perfect warm and clear summer weather. Strong sun, clear mountain valley vistas.',
    hotel: {
      name: 'Hotel Napoleon',
      address: 'Piazza Italia, 2, 54027 Pontremoli MS, Italy',
      phone: '+39 0187 830544',
      notes: 'Settle into your accommodations at Hotel Napoleon and relax.',
      coordinates: '44.3791,9.8784'
    },
    activities: [
      {
        time: '08:15',
        title: 'Guided Village Touring',
        description: 'Set off early to visit and tour the lovely surrounding hill villages of Cargalla, Molinello, and Toplecca.',
        transport: 'Two comfortable Maxi Vans provided',
        coordinates: '44.4022,9.8978',
        icon: 'explore'
      },
      {
        time: '10:45',
        title: 'Holy Mass at Santissima Annunziata Church',
        description: 'Observe or participate in a Traditional holy Catholic liturgy in the stunning Baroque interior of the Santissima Annunziata Church.',
        transport: 'Shuttle service from Hotel Napoleon to the church',
        coordinates: '44.3712,9.8828',
        icon: 'church'
      },
      {
        time: '13:00',
        title: 'Lunch at Ristorante Abramo',
        description: 'Enjoy a rich traditional Lunigiana feast at the highly-rated local hostelry Ristorante Abramo.',
        transport: 'Shuttle service provided after Mass directly from the church',
        coordinates: '44.3790,9.8804',
        icon: 'food'
      },
      {
        time: '16:30',
        title: 'Jack White Concert Transfer',
        description: 'Ready for action! Private transfer to the coastal concert venue in Lido di Camaiore.',
        transport: 'Transfer provided for up to six (6) passengers',
        coordinates: '43.9105,10.2229',
        icon: 'concert'
      }
    ]
  },
  {
    date: 'June 22, 2026',
    dayNum: 22,
    month: 'June',
    location: 'PONTREMOLI COUNTRYSIDE',
    highF: 77,
    lowF: 56,
    weather: 'Clear, Cool Night',
    weatherDetails: 'High: 77°F, Low: 56°F. Pleasant during the day, but a sharp temperature drop after sunset. Highly recommend taking a light layer or cardigan for the evening.',
    warning: 'Cooler evening - carry light layers!',
    hotel: {
      name: 'Hotel Napoleon',
      address: 'Piazza Italia, 2, 54027 Pontremoli MS, Italy',
      phone: '+39 0187 830544',
      notes: 'Settle into your accommodations at Hotel Napoleon and relax.',
      coordinates: '44.3791,9.8784'
    },
    activities: [
      {
        time: '09:00',
        title: 'Guided Village Touring',
        description: 'Second round of exploration into Pontremoli\'s rich hills, specifically visiting countryside clusters of Cargalla, Molinello, and Toplecca.',
        transport: 'Two Maxi Vans provided for comfortable transit',
        coordinates: '44.4022,9.8978',
        icon: 'explore'
      },
      {
        time: '11:30',
        title: 'Guided Visit to Villa Dosi Delfini',
        description: 'A magical guided tour of the breath-taking Villa Dosi Delfini, a masterpiece of Baroque architecture and theatrical fresco painting in Pontremoli. Run from 11:30 to 13:00.',
        guidedBy: 'Villa Tour Coordinator',
        coordinates: '44.3813,9.8755',
        icon: 'tour'
      },
      {
        time: '13:00',
        title: 'Farewell Luncheon at Ristorante Locanda Ca\' del Moro',
        description: 'Celebrate our stay in Pontremoli with a luxury farewell lunch at the pristine Locanda Ca\' del Moro restaurant.',
        transport: 'Shuttle transport provided back to Hotel Napoleon after lunch',
        coordinates: '44.3644,9.8885',
        icon: 'food'
      }
    ]
  },
  {
    date: 'June 23, 2026',
    dayNum: 23,
    month: 'June',
    location: 'LIVORNO (CRUISE EMBARKATION)',
    highF: 82,
    lowF: 65,
    weather: 'Sunny & Coastal Breezy',
    weatherDetails: 'High: 82°F, Low: 65°F. Sunny and warm port conditions with an refreshing coastal breeze. Ideal cruise start!',
    activities: [
      {
        title: 'Fortezza Vecchia (Old Fortress)',
        description: 'Explore the majestic 16th-century red-brick citadel guarding the port entrance. Walk along its high brick parapets for stunning, panoramic views of the cruise ships. Located literally steps from the cruise terminal gates.',
        location: 'Piazza del Pamiglione',
        coordinates: '43.5524,10.3039',
        icon: 'explore'
      },
      {
        title: 'Venezia Nuova (New Venice) Canal District',
        description: 'Explore the historic, picturesque 17th-century district built on water canals; walk over peaceful stone bridges and explore local shops. Highly walkable if you are in Livorno early or taking a short taxi.',
        location: 'Livorno Venezia Nuova quarter',
        coordinates: '43.5539,10.3079',
        icon: 'explore'
      },
      {
        title: 'Schiacciata Break at Panificio Fabbri',
        description: 'Grab a fresh, hot slice of crispy schiacciata (Tuscan olive oil flatbread) stuffed with fresh pecorino and local salumi. A beloved neighborhood bakery very close to the port gates.',
        location: 'Via San Giovanni 42',
        coordinates: '43.5532,10.3059',
        icon: 'food'
      },
      {
        title: 'Ponce Livornese at Pasticceria Castalie',
        description: 'Stop by this legendary spot near the Central Market to taste Ponce Livornese, the signature hot, sweet, punchy coffee concoction made of dark rum, cognac, sugar, and lemon zest. Loved by old sailors. Easily walkable from the public transit drop-off or center.',
        location: 'Mercato delle Vettovaglie area',
        coordinates: '43.5516,10.3129',
        icon: 'food'
      },
      {
        title: 'Sunset views at Terrazza Mascagni',
        description: 'Marvel at this spectacular, massive waterfront promenade lined by 34,000 black-and-white checkered checkerboard floor tiles. Need a brief taxi or local Bus Route 1 from harbor gates.',
        location: 'Terrazza Mascagni coastal walkway',
        coordinates: '43.5358,10.3014',
        icon: 'explore'
      },
      {
        time: '18:00',
        title: 'MSC Splendida Cruise Departure',
        description: 'Ship cast-off is scheduled. Watch the sail-away from the balcony or high deck!',
        coordinates: '43.5518,10.2987',
        icon: 'ship'
      }
    ]
  },
  {
    date: 'June 24, 2026',
    dayNum: 24,
    month: 'June',
    location: 'CAGLIARI, SARDINIA',
    highF: 84,
    lowF: 68,
    weather: 'Hot & Clear',
    weatherDetails: 'High: 84°F, Low: 68°F. Classic Mediterranean summer heat. Marine sea temperature is 73°F. Heavy sea breeze makes walking along the bastions delightful but hold onto your sunhats!',
    activities: [
      {
        title: 'Beach Club',
        description: 'Vibrant sunshine, private luxury beach loungers, and sparkling clear waters. A wonderful day to swim, relax, and share refreshing sea breezes together with the family.',
        location: 'Cagliari Beach, Sardinia, Italy',
        coordinates: '39.2064,9.1578',
        icon: 'explore',
        isFamilyEvent: true
      },
      {
        title: 'Port Arrival: Cagliari',
        description: 'Deep-water docking at Cagliari Port. The historic bastions loom high over the harbor as the ship settles.',
        coordinates: '39.2132,9.1121',
        icon: 'explore'
      },
      {
        title: 'Seafood Venture at San Benedetto Market',
        description: 'Skip the overcrowded waterfront. Head directly to San Benedetto Market, one of Europe\'s largest enclosed fresh markets. The seafood section on the lower level is a theater of sensory overload. Taste local Burrida (shark marinated in walnuts and vinegar paste).',
        coordinates: '39.2227,9.1245',
        icon: 'food'
      },
      {
        title: 'Lunch at Stella Marina di Montecristo',
        description: 'Tucked away in a humble brick alleyway, Stella Marina di Montecristo is a legendary, no-nonsense local tavern serving incredibly fresh seafood, handmade culurgiones (stuffed pasta pockets), and crisp Sardinian Vermentino wine.',
        coordinates: '39.2139,9.1158',
        icon: 'food'
      },
      {
        title: 'Caffè Libarium Nostrum Sunset Aperitivo',
        description: 'Sit on the ancient golden limestone bastions of the hilltop Castello district, enjoying local pecorino cheese and cold Ichnusa beer while overlooking the whole harbor. Easily walkable, though steep uphill—it is highly recommended to take the public elevator from Piazza Yenne.',
        location: 'Castello district fortress peaks',
        coordinates: '39.2178,9.1152',
        icon: 'food'
      },
      {
        title: 'San Pancrazio Tower & Roman Amphitheatre',
        description: 'Exquisite 14th-century white limestone military watchtower. Walk along its high brick parapet paths. Accessible by taking local Line 7 bus or steep uphill walk.',
        location: 'Upper Castello historic ring',
        coordinates: '39.2215,9.1165',
        icon: 'tour'
      },
      {
        title: 'Observe wild flamingos at Molentargius Saline Park',
        description: 'Witness thousands of wild, nesting candy-pink flamingos in the natural saltwater marshes directly adjacent to the city. Highly recommend a fast 10-minute taxi from the main cruise dock gates.',
        location: 'Parco Naturale Molentargius',
        coordinates: '39.2241,9.1481',
        icon: 'explore'
      },
      {
        title: 'Coastal Hike to Sella del Diavolo',
        description: 'For a spectacular escape from the city streets, take a quick transit to the trailhead of Sella del Diavolo (Devil\'s Saddle). This scenic dirt path climbs through fragrant wild sage and juniper to sheer white limestone cliffs overlooking the sparkling turquoise waters of the Gulf of Angels.',
        coordinates: '39.1884,9.1558',
        icon: 'explore'
      }
    ]
  },
  {
    date: 'June 25, 2026',
    dayNum: 25,
    month: 'June',
    location: 'PALERMO, SICILY',
    highF: 86,
    lowF: 70,
    weather: 'Warm & Sunny',
    weatherDetails: 'High: 86°F, Low: 70°F. Sicily is hot! Light southern scirocco wind might bring warm air from North Africa. Drink water, carry shades, and walk on the shady side of the streets.',
    activities: [
      {
        title: 'Moreal Cathedral',
        description: 'A spectacular, must-see family excursion to admire the majestic golden Byzantine mosaics, stunning medieval architecture, and historic quiet cloisters of the Cathedral of Monreale.',
        location: 'Moreal Cathedral, Palermo, Sicily',
        coordinates: '38.0818,13.2925',
        icon: 'church',
        isFamilyEvent: true
      },
      {
        title: 'Port Arrival: Palermo',
        description: 'Ship docks. Settle in and prepare for a vibrant, chaotic collision of history, culture, and street food.',
        coordinates: '38.1292,13.3647',
        icon: 'explore'
      },
      {
        title: 'Mosaics at Martorana Church & Monastic Pastries',
        description: 'Marvel at the stunning Byzantine gold mosaics at Martorana Church (Santa Maria dell\'Ammiraglio). Afterward, sneak into the adjacent Monastero di Santa Caterina where cloistered nuns once baked. Today, local bakers still use their historic secrets and recipes to sell cannoli, cassata, and almond cookies in the courtyard.',
        coordinates: '38.1130,13.3626',
        icon: 'tour'
      },
      {
        title: 'Street Food Lunch at Friggitoria Chiluzzo',
        description: 'Escape the rowdy shouting of Ballarò and have lunch in the historic Kalsa district at Friggitoria Chiluzzo, an old-school neighborhood kiosk. Taste real Palermo street food classics: Panelle (chickpea fritters in bread), Crocchè (potato croquettes), and Arancine.',
        coordinates: '38.1172,13.3688',
        icon: 'food'
      },
      {
        title: 'Sarde a Beccafico at La Vucciria local street stalls',
        description: 'Wander deep into the heart of Palermo\'s ancient market, La Vucciria. Stop by Piazza Caracciolo to eat fresh Sardines stuffed with pine nuts, raisins, and bay leaves. Easily walkable from the ship docks.',
        location: 'La Vucciria historical markets',
        coordinates: '38.1175,13.3639',
        icon: 'food'
      },
      {
        title: 'Tropical giants of the Orto Botanico',
        description: 'Escape the city rush into this massive, lush botanical garden filled with enormous exotic tree species, including the iconic giant strangler fig. Walkable or short taxi ride for convenience.',
        location: 'Orto Botanico green refuge',
        coordinates: '38.1124,13.3739',
        icon: 'explore'
      },
      {
        title: 'Seven layers of chocolate at Pasticceria Cappello',
        description: 'Indulge in Palermo\'s legendary Setteveli (seven-layer chocolate and hazelnut cake) at this historical bakery. Accessible via walking or a direct city cab.',
        location: 'Via Colonna Rotta 68',
        coordinates: '38.1118,13.3441',
        icon: 'food'
      },
      {
        title: 'Historical Descent to the Capuchin Catacombs',
        description: 'For a solemn, fascinating, and cooler experience (underground temperatures are a refreshing 60°F), visit the Capuchin Catacombs. Here lie over 8,000 preserved bodies from the 16th to 19th centuries, organized by profession, gender, and social status.',
        coordinates: '38.1116,13.3400',
        icon: 'explore'
      }
    ]
  },
  {
    date: 'June 26, 2026',
    dayNum: 26,
    month: 'June',
    location: 'VALLETTA, MALTA',
    highF: 83,
    lowF: 69,
    weather: 'Pleasant Summer Day',
    weatherDetails: 'High: 83°F, Low: 69°F. Mild coastal wind, absolute blue skies. Humidity is minimal, making outdoor walking extremely comfortable.',
    activities: [
      {
        title: 'Port Arrival: Valletta Grand Harbour',
        description: 'Secure mooring in the grandiose limestone fortress of the Grand Harbour. Ensure you are on deck early to witness Malta entering view!',
        coordinates: '35.8893,14.5094',
        icon: 'explore'
      },
      {
        title: 'Serene Views of Lower Barrakka Gardens & Valletta Underground',
        description: 'Skip the dense crowds at Upper Barrakka Gardens. Walk over to the peaceful Lower Barrakka Gardens and the impressive Siege Bell War Memorial to capture stunning harbor photos in quiet air. If you\'re daring, take a guided tour of the Valletta Underground tunnels built by the Knights of St. John.',
        coordinates: '35.8973,14.5169',
        icon: 'explore'
      },
      {
        title: 'Walk the cozy Strait Street Jazz Passages',
        description: 'Stroll the narrowest street in Valletta. Once the rowdy nightlife center for WWII navy sailors, it now hosts high-end, tucked-away local wine taverns and live jazz steps. Easily walkable after using the main Barrakka Harbour lift.',
        location: 'Strait Street historical passage',
        coordinates: '35.8988,14.5126',
        icon: 'explore'
      },
      {
        title: 'Cisk & Craft Beers at Gżira Waterfront',
        description: 'Taste authentic Maltese microbrews and crisp Cisk lager at The Brew right next to the local docks. Grab a fast coastal ferry across Sliema or a quick taxi.',
        location: 'Sliema ferry outer ring',
        coordinates: '35.9048,14.4968',
        icon: 'food'
      },
      {
        title: 'Blue Grotto Sea Cave Adventure',
        description: 'Explore the spectacular natural limestone arches and deep sea caverns reflecting rich, glowing neon-blue waters. You must take a taxi or arranged driver.',
        location: 'Malta Southern coast',
        coordinates: '35.8219,14.4528',
        icon: 'explore'
      },
      {
        title: 'Traditional Boat Crossing to Birgu',
        description: 'Walk down to the custom wooden boat landing at the harbor bottom. Board a tiny, traditional "Dghajsa" water taxi for €3 across the water to the quiet, medieval streets of Birgu (Vittoriosa).',
        coordinates: '35.8887,14.5205',
        icon: 'explore'
      },
      {
        title: 'Decadent Lunch & Pastizzi at Crystal Palace pastizzi',
        description: 'Have a long rustic lunch in the historic harbor. Seek out authentic, flaky, pea-and-ricotta savories known as pastizzi from local gems like Crystal Palace pastizzi, paired with a cold can of Kinnie (made of bittersweet Maltese oranges and herbs).',
        coordinates: '35.8858,14.4034',
        icon: 'food'
      }
    ]
  },
  {
    date: 'June 27, 2026',
    dayNum: 27,
    month: 'June',
    location: 'AT SEA',
    highF: 82,
    lowF: 68,
    weather: 'Calm & Oceanic',
    weatherDetails: 'High: 82°F, Low: 68°F. Gentle waves, warm breeze. Excellent relaxation day on board the MSC Splendida.',
    activities: [
      {
        title: 'Panoramic Deck Viewing at the Aft & Bow',
        description: 'Discover the secret, quiet deck space at the absolute forward tip of Decks 14 and 15 right below the bridge. It provides an unobstructed 180° view of nothing but deep ocean indigo and clear horizons, with virtually no foot traffic.',
        icon: 'explore'
      },
      {
        title: 'The Secret Bow Deck 11 Stargazing',
        description: 'Step into the quiet escape deck walkway when looking forward on Deck 11. It remains private and dark, making it an incredible vantage point to watch stars reflecting on the deep Mediterranean waves with zero light pollution.',
        location: 'MSC Splendida Deck 11 Forward',
        icon: 'explore'
      },
      {
        title: 'Cannoli & Espresso under the Piazza Club dome',
        description: 'Bypass the chaotic main buffet floors. Drop down to the beautiful mid-ship Italian Piazza square to sip traditional espresso and eat fresh cannoli hand-piped with sweet Sicilian ricotta.',
        location: 'MSC Splendida Deck 6 Midship',
        icon: 'food'
      },
      {
        title: 'Catch the Sunset from the Aft-Port Deck 14 corner',
        description: 'Secure a cozy, wind-free lounge spot tucked right behind the tall glass windscreen panels at the absolute aft-left of the sports deck for spectacular ocean sunsets.',
        location: 'MSC Splendida Deck 14 Aft',
        icon: 'explore'
      }
    ]
  },
  {
    date: 'June 28, 2026',
    dayNum: 28,
    month: 'June',
    location: 'BARCELONA, SPAIN',
    highF: 85,
    lowF: 67,
    weather: 'Warm & Dynamic',
    weatherDetails: 'High: 85°F, Low: 67°F. High sun, dynamic city hum. Barcelona coast is sunny & glorious.',
    activities: [
      {
        title: 'Sagrada Familia',
        description: 'An unforgettable family pilgrimage to Antoni Gaudí\'s towering, world-famous basilica masterpiece. Witness the incredible tree-like columns and spectacular, colorful stained-glass window reflections.',
        location: 'Sagrada Familia, Barcelona, Spain',
        coordinates: '41.4036,2.1744',
        icon: 'church',
        isFamilyEvent: true
      },
      {
        title: 'Port Arrival: Barcelona',
        description: 'Welcome to Spain! The ship docks at the central terminal. Prepare your walking shoes.',
        coordinates: '41.3688,2.1729',
        icon: 'explore'
      },
      {
        title: 'Hospital de Sant Pau Masterpiece',
        description: 'Instead of standing in lines for the busy Gaudí sites, stroll through the breathtaking and peaceful Hospital de Sant Pau. This is a magnificent, vast Art Nouveau garden complex with bright mosaic domes designed by Lluís Domènech i Montaner, a true hidden gem of Barcelona architecture.',
        coordinates: '41.4124,2.1745',
        icon: 'tour'
      },
      {
        title: 'Alleyway Tapas Explorer at Carrer dels Flassaders',
        description: 'Skip modern tourist restaurants on La Rambla. Wander deep into the El Born medieval district, finding the small secret passages like Carrer dels Flassaders. Eat Basque-style pintxos and classical dishes at El Xampanyet, a historic, tiny champagne tapas bar open since 1929.',
        coordinates: '41.3854,2.1818',
        icon: 'food'
      },
      {
        title: 'Stand-up Cava & Chorizo at Can Paixano',
        description: 'Enjoy a rowdy, standing-room-only Catalan experience drinking cheap pink sparkling Cava paired with warm, freshly grilled spicy chorizo sausages in flatbread. Easily walkable from the lower port gates (near Barceloneta).',
        location: 'La Xampanyeria bodega, Born borders',
        coordinates: '41.3814,2.1868',
        icon: 'food'
      },
      {
        title: 'Hidden Columns at Roman Temple of Augustus',
        description: 'Marvel at four colossal, 2,000-year-old Corinthian columns tucked completely inside a quiet, medieval residential courtyard in the Gothic Quarter. Walkable from the main cathedral.',
        location: 'Carrer Paradís 10, Gothic Quarter',
        coordinates: '41.3835,2.1775',
        icon: 'tour'
      },
      {
        title: 'Green Labyrinth of Parc del Laberint d\'Horta',
        description: 'Get lost in Barcelona\'s oldest neoclassical garden, boasting a pristine cypress maze and marble temple structures. Need to take the L3 Green Metro Line directly from Drassanes near the port.',
        location: 'Horta-Guinardó district',
        coordinates: '41.4398,2.1465',
        icon: 'explore'
      },
      {
        title: 'Panoramic Bunkers del Carmel',
        description: 'Head up out of the city sprawl to the Bunkers del Carmel. Here, you will stand on concrete command bunkers from the Spanish Civil War and experience an incredible, windy 360° panoramic vista of the entire city skyline, mountains, and sea.',
        coordinates: '41.4193,2.1620',
        icon: 'explore'
      },
      {
        title: 'Relaxation & Spa Solarium',
        description: 'Take a break inside the thermal suites or enjoy the hydrotherapy pools. If you\'re feeling hungry, the late-night pizzeria station at the aft of Deck 14 serves fresh, thin-crust Neapolitan-style pizza that is continuously baked to order.',
        icon: 'explore'
      }
    ]
  },
  {
    date: 'June 29, 2026',
    dayNum: 29,
    month: 'June',
    location: 'MARSEILLE, FRANCE',
    highF: 81,
    lowF: 66,
    weather: 'Light Coastal Winds',
    weatherDetails: 'High: 81°F, Low: 66°F. Lovely breezy Southern France weather. Excellent time to buy famed Marseille olive oil soaps.',
    activities: [
      {
        title: 'Port Arrival: Marseille',
        description: 'Marseille welcoming morning light reflecting on the white coastal limestone cliffs.',
        coordinates: '43.3444,5.3404',
        icon: 'explore'
      },
      {
        title: 'Le Panier Hidden Courtyard & Soap Shopping',
        description: 'Explore Le Panier, the oldest neighborhood in France. Its narrow, pastel-painted lanes are filled with colorful laundry, murals, small artisan shops, and hidden staircases. Browse for authentic olive oil soaps.',
        coordinates: '43.2995,5.3681',
        icon: 'explore'
      },
      {
        title: 'Secrets of Vallon des Auffes',
        description: 'Take a wander over to Vallon des Auffes. This is a tiny, incredibly picturesque, traditional French fishing harbor tucked completely underneath an enormous stone road archway. It contains traditional wooden boats, tiny pastel shacks, and zero industrial noise.',
        coordinates: '43.2851,5.3505',
        icon: 'tour'
      },
      {
        title: 'Rustic wood-fired pizza at Chez Étienne',
        description: 'Stop by this legendary Le Panier bistro to grab delicious, thin-crust anchovy-and-garlic pizza or pan-seared calamari. Note: Cash-only and no reservations. Easily walkable from the Vieux-Port shuttle drop.',
        location: 'Rue de Lorette, old Marseille',
        coordinates: '43.2996,5.3692',
        icon: 'food'
      },
      {
        title: 'Mucem suspended Rooftop Footbridge walk',
        description: 'Stroll the awesome open-air concrete canopy of the Museum of European Civilisations. Walk across the 130-meter suspended bridge that floats high over the sea. Easily walkable from old harbor docks.',
        location: 'Fort Saint-Jean ramparts',
        coordinates: '43.2969,5.3611',
        icon: 'explore'
      },
      {
        title: 'Swimming cove at Plage de Malmousque',
        description: 'Sunbathe like a local on flat stone platforms tucked within narrow sea-facing passages. Take beautiful pictures of Marseille bay away from tourists. Take local City Bus 83 along the Corniche Kennedy.',
        location: 'Malmousque coastal rocks',
        coordinates: '43.2801,5.3488',
        icon: 'explore'
      },
      {
        title: 'Lunch & Pastis at La Caravelle',
        description: 'Eat incredible bouillabaisse fish stew or fresh salads. Follow it up by sipping a classic anise-flavored pastis cocktail on the small balcony of La Caravelle, a secret second-story bar overlooking the Vieux-Port that has welcomed patrons since the 1920s.',
        coordinates: '43.2965,5.3725',
        icon: 'food'
      },
      {
        title: 'Fjord Escape to Calanque de Sugiton',
        description: 'If you want dramatic nature, visit the incredible Calanque de Sugiton, a stunning narrow sea inlet bordered by towering white rocky cliffs and sapphire maritime pools.',
        coordinates: '43.2181,5.4542',
        icon: 'explore'
      }
    ]
  },
  {
    date: 'June 30, 2026',
    dayNum: 30,
    month: 'June',
    location: 'LIVORNO / DEPARTURE',
    highF: 83,
    lowF: 66,
    weather: 'Sunny & Warm',
    weatherDetails: 'High: 83°F, Low: 66°F. High summer warmth. Disembarkation and journey to airport for return transit to USA.',
    activities: [
      {
        title: 'Airport Transfer & Departure',
        description: 'Private coach group transfer to the airport (Pisa, Florence, or FCO) to check in for flights back to the US.',
        transport: 'Private charter coach service',
        coordinates: '43.8100,11.2012',
        icon: 'unclassified'
      },
      {
        title: 'Tasting market bites at Mercato delle Vettovaglie',
        description: 'Explore the monumental iron-and-glass Central Market hall in Livorno. Sample local pecorino, salumi, or cold pastries. Easily walkable or short taxi from port gates.',
        location: 'Scali Aurelio Saffi, Livorno',
        icon: 'food',
        coordinates: '43.5516,10.3129'
      },
      {
        title: 'Grab-and-Go Torta di Ceci at Gagarin',
        description: 'Before departing Livorno, run quickly to Gagarin, a legendary, tiny shop near central market specializing in Torta di Ceci / Cinque e Cinque (a rich savory chickpea pancake seasoned with black pepper, served inside hot focaccia). Highly recommended local treat! Easily walkable from central shops.',
        icon: 'food',
        coordinates: '43.5516,10.3119'
      },
      {
        title: 'Pisan poet coffee at Caffè dell\'Ussero',
        description: 'Part of your private charger road-trip route! Sip historical coffee at this River Arno riverside café open since 1775. Accessible as a beautiful stopping point during your private coach transfer route.',
        location: 'Lungarno Pacinotti, Pisa',
        icon: 'food',
        coordinates: '43.7164,10.4005'
      },
      {
        title: 'Historical Walk in Fortezza Nuova gardens',
        description: 'Briefly stroll the quiet public park tucked completely inside Livorno\'s enormous, water-surrounded pentagonal red-brick fortress. Easily walkable or a fast cab ride.',
        location: 'Fortezza Nuova canals ring',
        icon: 'explore',
        coordinates: '43.5539,10.3162'
      }
    ]
  }
];

export const laundryStrategy = [
  { id: 'ls-1', dates: 'June 18-22', location: 'Pontremoli Countryside (Small Hotel)', rules: 'NO washer/dryer in hotel. Self-service laundromat: "Lavanderia Il Giglio" (Via Sismondo 13/15) ~5 min walk. Bring detergent sheets + portable sink stopper.' },
  { id: 'ls-2', dates: 'June 23-30', location: 'MSC Splendida Cruise (Balcony Cabin)', rules: 'NO self-service laundry on MSC ships. Paid valet service only (Pre-purchase "Back Home Clean" 40-item package online for ~$50-55). Drop bag before noon, returned in 48 hours.' }
];

export const emergencyContacts = {
  euEmergency: '112',
  usEmbassy: '+39 06 46741'
};

export interface FunFact {
  id: string;
  category: string;
  fact: string;
  italianTranslation?: string;
}

export const italyFunFacts: FunFact[] = [
  {
    id: 'f-1',
    category: 'Coffee Wisdom',
    fact: 'Ordering a "latte" in Italy will get you a glass of cold milk. You must ask for a "Caffè Latte" if you want espresso with hot steamed milk!',
    italianTranslation: 'Un caffè latte, per favore.'
  },
  {
    id: 'f-2',
    category: 'Pisa Tower',
    fact: 'The Leaning Tower of Pisa took nearly 200 years to build because of wars and political disruptions. The lean actually started during construction of the second floor in 1178 because of soft, sandy soil!',
    italianTranslation: 'La Torre pendente di Pisa.'
  },
  {
    id: 'f-3',
    category: 'Culinaria Guideline',
    fact: 'Pasta water must be salted heavily—legend says it should taste like the Mediterranean sea. Adding olive oil to boiling pasta water is considered a sin; it prevents the sauce from adhering!',
    italianTranslation: 'L\'acqua del pastaiolo deve essere salata!'
  },
  {
    id: 'f-4',
    category: 'Bella Figura',
    fact: 'The concept of "Bella Figura" goes far beyond clothing. It embodies elegance, grace, hospitality, and demonstrating moral respect to surrounding citizens.',
    italianTranslation: 'Fare una bella figura.'
  },
  {
    id: 'f-5',
    category: 'Tuscan Landscapes',
    fact: 'Tuscany is home to six world-famous UNESCO World Heritage sites, including the historic centers of Florence, Siena, San Gimignano, and the Piazza del Duomo in Pisa.',
    italianTranslation: 'La bellissima Toscana.'
  },
  {
    id: 'f-6',
    category: 'Pontremoli Fact',
    fact: 'Pontremoli is famous for its unique Stele Statues, dating back and carved between 3000 BC and 200 BC, depicting ancient tribal leaders and warriors.',
    italianTranslation: 'Le Statue Stele della Lunigiana.'
  },
  {
    id: 'f-7',
    category: 'Pontremoli Sweet',
    fact: 'Pontremoli has local pastry royalty: the "Amor" cookie. It features a secret, incredibly smooth custard filling flavored with vanilla and lemon, sandwiched between crisp wafers.',
    italianTranslation: 'Un dolce Amor di Pontremoli, per favore!'
  },
  {
    id: 'f-8',
    category: 'Tuscan Valley History',
    fact: 'The surrounding Tuscan Lunigiana valley is historically called "The Land of One Hundred Castles" because of its deep medieval history, mountain defense forts, and stone tower gates.',
    italianTranslation: 'La Lunigiana, terra dei cento castelli.'
  },
  {
    id: 'f-9',
    category: 'Tuscan Food Wisdom',
    fact: 'Tuscan mountain valleys are famous for sweet chestnuts. Traditional "Testaroli" are considered the oldest pasta format, baked in red-hot cast-iron "testi" pans and dressed with fresh basil pesto.',
    italianTranslation: 'I testaroli caldi fatti nei testi d\'argilla.'
  },
  {
    id: 'f-10',
    category: 'Livorno Coffee',
    fact: 'In Livorno, the dockside sailors drink "Ponce alla Livornese", a hot, sugary drink made with strong espresso, a splash of dark rum, a dash of cognac, and a thin, zesty curl of lemon peel.',
    italianTranslation: 'Un Ponce livornese per scaldarmi l\'anima!'
  },
  {
    id: 'f-11',
    category: 'Sardinian Longevity',
    fact: 'Cagliari (Sardinia) belongs to one of the world\'s prestigious culinary "Blue Zones". Local longevity is linked directly to cannonau red wine (rich in antioxidants) and pecorino sardo cheese.',
    italianTranslation: 'Un bicchiere di Cannonau e del buon pecorino.'
  },
  {
    id: 'f-12',
    category: 'Sardinian Pasta',
    fact: 'Cagliari serves incredible "Culurgiones" pasta. These handmade pockets are stuffed with potato, wild mint, and aged pecorino, and hand-sewn with a beautiful wheat-ear pattern.',
    italianTranslation: 'I culurgiones sardi al pomodoro fresco.'
  },
  {
    id: 'f-13',
    category: 'Palermo Street Food',
    fact: 'In Palermo, street food is a centuries-old way of life. The ultimate local sandwich features "Panelle" – crisp, hot, salted chickpea flour fritters spiked with parsley inside soft sesame rolls.',
    italianTranslation: 'Un panino con panelle calde e limone!'
  },
  {
    id: 'f-14',
    category: 'Maltese Pastries',
    fact: 'Valletta (Malta) is famous for its delicious "Pastizzi". These golden, buttery pastries are stuffed with either yellow curried split peas or rich ricotta, cooked until incredibly flaky.',
    italianTranslation: 'Vorrei due pastizzi caldi di ricotta.'
  },
  {
    id: 'f-15',
    category: 'Barcelona Tapas',
    fact: 'In Barcelona, you will find "Pan con Tomate" (known in Catalan as Pa amb Tomàquet). It is rustic sourdough bread rubbed with raw garlic, ripe tomatoes, olive oil, and salt.',
    italianTranslation: 'Un plato de pan con tomate, por favor.'
  },
  {
    id: 'f-16',
    category: 'Marseille Magic',
    fact: 'Marseille\'s culinary masterpiece is "Bouillabaisse" seafood stew. Traditionally, local fishermen boiled their unsellable bony rockfish in a broth loaded with saffron, garlic, and wild fennel.',
    italianTranslation: 'Una bouillabaisse tradizionale nel porto vecchio.'
  }
];
