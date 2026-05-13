export interface monument {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  category: string;
  year?: string;
  isUnesco?: boolean;
  coordinates?: { lat: number; lng: number };
  details?: {
    pillars?: number;
    elephants?: number;
    yearsToBuild?: number;
    madanikas?: number;
  };
  history?: {
    year: string;
    event: string;
    description: string;
  }[];
}

export const MONUMENTS: monument[] = [
  {
    id: "hampi",
    name: "Hampi - The City of Victory",
    location: "Vijayanagara, KA",
    description: "Once the capital of the Vijayanagara Empire, Hampi is a mesmerizing landscape of granite boulders and majestic temple ruins that breathe the history of the 14th century.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKEe2U-h62fnsT8h4H2Uz08R4jVKRyjVWuce476hKbm8wRMI24d4bUN6M42Tp3Q4ZdbBV7JEmGE1bLkMX9dTm7wH9M427PKC42vMJLKMc_1cIHxtTaGa7mQcyF7FtJLefGPIYpgCo0eqUuLNNh1hwmR39G8m9VFCYbmdg-PzFKaAZALYawJNQ1kRw_rtsJ9OI6wrRIADdR2Cqyj5yB1t0xuUY-gBrFRlVA7fppSO1WuoUUaAed6smPKomsU74s6TSNtqX7i7geIDDT",
    category: "UNESCO Heritage",
    isUnesco: true,
    year: "1336 AD",
    coordinates: { lat: 15.3350, lng: 76.4600 },
    history: [
      { year: "1336 AD", event: "Foundation", description: "Established by Harihara I and Bukka Raya I as the capital of Vijayanagara Empire." },
      { year: "1509 AD", event: "Golden Era", description: "Reign of Krishna Deva Raya, the empire reached its cultural and territorial peak." },
      { year: "1565 AD", event: "Battle of Talikota", description: "The city was defeated and sacked by the Deccan Sultanates, leading to its slow decline." },
      { year: "1986 AD", event: "UNESCO Recognition", description: "Designated as a World Heritage Site for its exceptional architectural remains." }
    ]
  },
  {
    id: "belur",
    name: "Chennakeshava Temple",
    location: "Belur, Karnataka",
    description: "A poem in stone, where every carving tells a story of celestial beauty and architectural mastery. Built by the Hoysala King Vishnuvardhana.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZumxry7ZS63cyhqnFTYtuhNojunE0cZmPYNG6Yi73eTzvqUrTdxvQywJQAehcr6Lju0cYDMSK141cDBu7eWHzFRlr9crL_Q_LSfNQ9zDLKa8Ki2unB254rAfbuiyKU4V_vsYuaGb_C3eNc--snrY5pHnzD3bi3WiCgWinj4oDYCEMvS1W34SDBnF7X_utD4F-_UxgfFrGUMhOyBjx6VnhCp8lcyeAqyCBCTzLt_uY2phU0JT-XFzHmoeTVL_XwyCsVG3Vcfopd8Uf",
    category: "World Heritage Series",
    year: "1117 AD",
    coordinates: { lat: 13.1624, lng: 75.8596 },
    details: {
      pillars: 118,
      madanikas: 42,
      elephants: 644,
      yearsToBuild: 103
    },
    history: [
      { year: "1117 AD", event: "Commission", description: "King Vishnuvardhana commissioned the temple to celebrate his victory over the Cholas." },
      { year: "1220 AD", event: "Completion", description: "The inner sanctum was completed and the famous Kappe Chennigaraya temple was added." },
      { year: "2023 AD", event: "UNESCO Recognition", description: "Inscribed as a World Heritage Site under the Sacred Ensembles of the Hoysalas." }
    ]
  },
  {
    id: "badami",
    name: "Badami Caves",
    location: "Bagalkot, KA",
    description: "The breathtaking rock-cut cave temples of Badami carved into red sandstone cliffs. Masters of rock-cut architecture, the Chalukyas turned Badami into the cradle of Indian temple architecture.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4VsJp-inEEGH1T1BTJcebl_3uGFZ9BBmCibQpAYsE-tQTsyyPbmCtPBXmWsgi6N-M8P2yszfy4azyPvFIv7V3F_pfMUUqoTlEOvbQnnVU9w-EC-D_gMmN87pUT50Xb1yoGJvQsuA0jmjDA4Ls3cu4COKhQYN4J5xQKu8auXLCUybXqJo5bSJy4re7ClXo7UepU6PKLlodE7Gt6YUHgAKq5ObTOVoz8CFfLA__dPvXLDWF2JAgCXuoGDdIh-eEaITfqL2lgvq2cjwA",
    category: "Rock-cut Architecture",
    year: "6th Century AD",
    coordinates: { lat: 15.9189, lng: 75.6791 }
  },
  {
    id: "mysore-palace",
    name: "Mysore Palace",
    location: "Mysuru, KA",
    description: "Experience the Royal Splendor. Journey through the architectural poetry of the Wodeyars, where every stone whispers tales of a glorious past.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeZCNbRSlCOKwIms8A-15ruVNKK0ahBRn1F6IUeymKgPFWxernbV_kP6FfzpjPE2M0ej9MmBHdpeYrOy6c-E2gZgdC4azXiP27zq2CqbrM8jHl280U7fqoGPtVud4qqIOp0zXJ6B-HShJDGQAQ84nRDYeJsc-HsTcV-eDaExxvSjxd63h1U8YKlpYOj3Xi6zln2UH65j0I2LCYnlpH48pq_5lhdl2eOIWBQ8Q9dQnIS_qShlTCJDHjC2EOSgpPj1KkctbcIbi1Ub-m",
    category: "Royal Heritage",
    year: "1912 AD",
    coordinates: { lat: 12.3051, lng: 76.6552 }
  }
];

export const DYNASTIES = [
  { id: "hoysala", name: "Hoysala", icon: "Castle", period: "1026 – 1343 CE" },
  { id: "vijayanagara", name: "Vijayanagara", icon: "Shield", period: "1336 – 1646 CE" },
  { id: "chalukya", name: "Chalukya", icon: "Database", period: "543 – 753 CE" },
  { id: "kadamba", name: "Kadamba", icon: "Shield", period: "345 – 525 CE" }
];
