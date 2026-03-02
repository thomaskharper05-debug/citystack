import { useState, useEffect, useRef } from "react";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://uvjwvalaqpwljbxmlvn.supabase.co";
const SUPABASE_KEY = "sb_publishable_mPfF9lIS9JJyukbFnsVW5g_tt0lz0dl";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ============================================================
// DATA — Census Bureau / UN verified populations
// ============================================================
const CITIES_100K = [
  { name: "New York", state: "NY", pop: 8336817 },
  { name: "Los Angeles", state: "CA", pop: 3979576 },
  { name: "Chicago", state: "IL", pop: 2693976 },
  { name: "Houston", state: "TX", pop: 2304580 },
  { name: "Phoenix", state: "AZ", pop: 1608139 },
  { name: "Philadelphia", state: "PA", pop: 1603797 },
  { name: "San Antonio", state: "TX", pop: 1434625 },
  { name: "San Diego", state: "CA", pop: 1386932 },
  { name: "Dallas", state: "TX", pop: 1304379 },
  { name: "San Jose", state: "CA", pop: 1013240 },
  { name: "Austin", state: "TX", pop: 978908 },
  { name: "Jacksonville", state: "FL", pop: 949611 },
  { name: "Fort Worth", state: "TX", pop: 918915 },
  { name: "Columbus", state: "OH", pop: 905748 },
  { name: "Charlotte", state: "NC", pop: 874579 },
  { name: "Indianapolis", state: "IN", pop: 887642 },
  { name: "San Francisco", state: "CA", pop: 873965 },
  { name: "Seattle", state: "WA", pop: 737255 },
  { name: "Denver", state: "CO", pop: 715522 },
  { name: "Nashville", state: "TN", pop: 689447 },
  { name: "Oklahoma City", state: "OK", pop: 681054 },
  { name: "El Paso", state: "TX", pop: 678815 },
  { name: "Washington", state: "DC", pop: 689545 },
  { name: "Boston", state: "MA", pop: 675647 },
  { name: "Memphis", state: "TN", pop: 633104 },
  { name: "Louisville", state: "KY", pop: 617638 },
  { name: "Portland", state: "OR", pop: 652503 },
  { name: "Las Vegas", state: "NV", pop: 641903 },
  { name: "Milwaukee", state: "WI", pop: 577222 },
  { name: "Albuquerque", state: "NM", pop: 564559 },
  { name: "Tucson", state: "AZ", pop: 542629 },
  { name: "Fresno", state: "CA", pop: 542107 },
  { name: "Sacramento", state: "CA", pop: 524943 },
  { name: "Kansas City", state: "MO", pop: 508090 },
  { name: "Mesa", state: "AZ", pop: 504258 },
  { name: "Atlanta", state: "GA", pop: 498715 },
  { name: "Omaha", state: "NE", pop: 486051 },
  { name: "Colorado Springs", state: "CO", pop: 478961 },
  { name: "Raleigh", state: "NC", pop: 467665 },
  { name: "Long Beach", state: "CA", pop: 466742 },
  { name: "Virginia Beach", state: "VA", pop: 459470 },
  { name: "Minneapolis", state: "MN", pop: 429954 },
  { name: "Tampa", state: "FL", pop: 399700 },
  { name: "New Orleans", state: "LA", pop: 383997 },
  { name: "Arlington", state: "TX", pop: 394266 },
  { name: "Bakersfield", state: "CA", pop: 380874 },
  { name: "Honolulu", state: "HI", pop: 347397 },
  { name: "Anaheim", state: "CA", pop: 346824 },
  { name: "Aurora", state: "CO", pop: 366623 },
  { name: "Santa Ana", state: "CA", pop: 332318 },
  { name: "Corpus Christi", state: "TX", pop: 326586 },
  { name: "Riverside", state: "CA", pop: 314998 },
  { name: "Lexington", state: "KY", pop: 322570 },
  { name: "St. Louis", state: "MO", pop: 301578 },
  { name: "Pittsburgh", state: "PA", pop: 302971 },
  { name: "Stockton", state: "CA", pop: 311963 },
  { name: "Cincinnati", state: "OH", pop: 309317 },
  { name: "St. Paul", state: "MN", pop: 311527 },
  { name: "Greensboro", state: "NC", pop: 299035 },
  { name: "Toledo", state: "OH", pop: 270871 },
  { name: "Newark", state: "NJ", pop: 311549 },
  { name: "Plano", state: "TX", pop: 285494 },
  { name: "Henderson", state: "NV", pop: 320189 },
  { name: "Orlando", state: "FL", pop: 307573 },
  { name: "Chandler", state: "AZ", pop: 261165 },
  { name: "Laredo", state: "TX", pop: 255205 },
  { name: "Madison", state: "WI", pop: 269840 },
  { name: "Durham", state: "NC", pop: 278993 },
  { name: "Lubbock", state: "TX", pop: 258862 },
  { name: "Winston-Salem", state: "NC", pop: 249545 },
  { name: "Garland", state: "TX", pop: 246018 },
  { name: "Glendale", state: "AZ", pop: 248325 },
  { name: "Hialeah", state: "FL", pop: 223109 },
  { name: "Reno", state: "NV", pop: 255601 },
  { name: "Baton Rouge", state: "LA", pop: 227470 },
  { name: "Irvine", state: "CA", pop: 307670 },
  { name: "Chesapeake", state: "VA", pop: 249422 },
  { name: "Irving", state: "TX", pop: 239798 },
  { name: "Scottsdale", state: "AZ", pop: 258069 },
  { name: "North Las Vegas", state: "NV", pop: 262527 },
  { name: "Fremont", state: "CA", pop: 230504 },
  { name: "Gilbert", state: "AZ", pop: 267918 },
  { name: "San Bernardino", state: "CA", pop: 222101 },
  { name: "Birmingham", state: "AL", pop: 212237 },
  { name: "Rochester", state: "NY", pop: 206284 },
  { name: "Richmond", state: "VA", pop: 230436 },
  { name: "Spokane", state: "WA", pop: 222081 },
  { name: "Des Moines", state: "IA", pop: 214133 },
  { name: "Montgomery", state: "AL", pop: 199518 },
  { name: "Modesto", state: "CA", pop: 218464 },
  { name: "Fayetteville", state: "NC", pop: 208501 },
  { name: "Tacoma", state: "WA", pop: 219346 },
  { name: "Shreveport", state: "LA", pop: 187593 },
  { name: "Akron", state: "OH", pop: 190469 },
  { name: "Yonkers", state: "NY", pop: 211464 },
  { name: "Little Rock", state: "AR", pop: 197881 },
  { name: "Amarillo", state: "TX", pop: 200393 },
  { name: "Huntsville", state: "AL", pop: 215006 },
  { name: "Grand Rapids", state: "MI", pop: 198917 },
  { name: "Salt Lake City", state: "UT", pop: 200567 },
  { name: "Tallahassee", state: "FL", pop: 196169 },
  { name: "Knoxville", state: "TN", pop: 190740 },
  { name: "Brownsville", state: "TX", pop: 182781 },
  { name: "Providence", state: "RI", pop: 179335 },
  { name: "Chattanooga", state: "TN", pop: 181099 },
  { name: "Fort Lauderdale", state: "FL", pop: 182760 },
  { name: "Tempe", state: "AZ", pop: 192364 },
  { name: "Cape Coral", state: "FL", pop: 194016 },
  { name: "Overland Park", state: "KS", pop: 197238 },
  { name: "Eugene", state: "OR", pop: 176654 },
  { name: "Vancouver", state: "WA", pop: 190915 },
  { name: "Sioux Falls", state: "SD", pop: 192517 },
  { name: "McKinney", state: "TX", pop: 199177 },
  { name: "Frisco", state: "TX", pop: 200509 },
  { name: "Cary", state: "NC", pop: 174721 },
  { name: "Murfreesboro", state: "TN", pop: 152769 },
  { name: "Gainesville", state: "FL", pop: 141085 },
];

const STATE_CAPITALS = [
  { name: "Montgomery", state: "AL", pop: 199518 },
  { name: "Juneau", state: "AK", pop: 32255 },
  { name: "Phoenix", state: "AZ", pop: 1608139 },
  { name: "Little Rock", state: "AR", pop: 197881 },
  { name: "Sacramento", state: "CA", pop: 524943 },
  { name: "Denver", state: "CO", pop: 715522 },
  { name: "Hartford", state: "CT", pop: 121054 },
  { name: "Dover", state: "DE", pop: 39403 },
  { name: "Tallahassee", state: "FL", pop: 196169 },
  { name: "Atlanta", state: "GA", pop: 498715 },
  { name: "Honolulu", state: "HI", pop: 347397 },
  { name: "Boise", state: "ID", pop: 235984 },
  { name: "Springfield", state: "IL", pop: 114230 },
  { name: "Indianapolis", state: "IN", pop: 887642 },
  { name: "Des Moines", state: "IA", pop: 214133 },
  { name: "Topeka", state: "KS", pop: 125310 },
  { name: "Frankfort", state: "KY", pop: 27741 },
  { name: "Baton Rouge", state: "LA", pop: 227470 },
  { name: "Augusta", state: "ME", pop: 18899 },
  { name: "Annapolis", state: "MD", pop: 40812 },
  { name: "Boston", state: "MA", pop: 675647 },
  { name: "Lansing", state: "MI", pop: 112644 },
  { name: "St. Paul", state: "MN", pop: 311527 },
  { name: "Jackson", state: "MS", pop: 153701 },
  { name: "Jefferson City", state: "MO", pop: 43228 },
  { name: "Helena", state: "MT", pop: 32091 },
  { name: "Lincoln", state: "NE", pop: 292657 },
  { name: "Carson City", state: "NV", pop: 58639 },
  { name: "Concord", state: "NH", pop: 43976 },
  { name: "Trenton", state: "NJ", pop: 90448 },
  { name: "Santa Fe", state: "NM", pop: 84683 },
  { name: "Albany", state: "NY", pop: 97856 },
  { name: "Raleigh", state: "NC", pop: 467665 },
  { name: "Bismarck", state: "ND", pop: 73622 },
  { name: "Columbus", state: "OH", pop: 905748 },
  { name: "Oklahoma City", state: "OK", pop: 681054 },
  { name: "Salem", state: "OR", pop: 175535 },
  { name: "Harrisburg", state: "PA", pop: 50099 },
  { name: "Providence", state: "RI", pop: 179335 },
  { name: "Columbia", state: "SC", pop: 134309 },
  { name: "Pierre", state: "SD", pop: 14091 },
  { name: "Nashville", state: "TN", pop: 689447 },
  { name: "Austin", state: "TX", pop: 978908 },
  { name: "Salt Lake City", state: "UT", pop: 200567 },
  { name: "Montpelier", state: "VT", pop: 7855 },
  { name: "Richmond", state: "VA", pop: 230436 },
  { name: "Olympia", state: "WA", pop: 52555 },
  { name: "Charleston", state: "WV", pop: 48864 },
  { name: "Madison", state: "WI", pop: 269840 },
  { name: "Cheyenne", state: "WY", pop: 63957 },
];

const SMALL_TOWNS = [
  { name: "Limon", state: "CO", pop: 1880 },
  { name: "Truth or Consequences", state: "NM", pop: 5765 },
  { name: "Valentine", state: "TX", pop: 134 },
  { name: "Boring", state: "OR", pop: 8067 },
  { name: "Peculiar", state: "MO", pop: 5413 },
  { name: "Sandwich", state: "MA", pop: 20675 },
  { name: "Tuba City", state: "AZ", pop: 8611 },
  { name: "Wisdom", state: "MT", pop: 94 },
  { name: "Cut and Shoot", state: "TX", pop: 1158 },
  { name: "Why", state: "AZ", pop: 116 },
  { name: "Halfway", state: "OR", pop: 288 },
  { name: "Happy", state: "TX", pop: 592 },
  { name: "Hope", state: "AR", pop: 9452 },
  { name: "Zigzag", state: "OR", pop: 599 },
  { name: "Climax", state: "MI", pop: 6249 },
  { name: "Uncertain", state: "TX", pop: 94 },
  { name: "Embarrass", state: "MN", pop: 671 },
  { name: "Gallup", state: "NM", pop: 21678 },
  { name: "Laramie", state: "WY", pop: 32158 },
  { name: "Dodge City", state: "KS", pop: 27340 },
  { name: "Deadwood", state: "SD", pop: 1270 },
  { name: "Tombstone", state: "AZ", pop: 1579 },
  { name: "Gettysburg", state: "PA", pop: 7620 },
  { name: "Marathon", state: "FL", pop: 8305 },
  { name: "Calais", state: "ME", pop: 3052 },
  { name: "Kodiak", state: "AK", pop: 5937 },
  { name: "Sitka", state: "AK", pop: 8493 },
  { name: "Moab", state: "UT", pop: 5268 },
  { name: "Kanab", state: "UT", pop: 4803 },
  { name: "Lander", state: "WY", pop: 7487 },
  { name: "Cody", state: "WY", pop: 9985 },
  { name: "Thermopolis", state: "WY", pop: 2643 },
  { name: "Havre", state: "MT", pop: 9510 },
  { name: "Miles City", state: "MT", pop: 8313 },
  { name: "Devils Lake", state: "ND", pop: 7270 },
  { name: "Huron", state: "SD", pop: 14263 },
  { name: "Alliance", state: "NE", pop: 8148 },
  { name: "Scottsbluff", state: "NE", pop: 14732 },
  { name: "Garden City", state: "KS", pop: 26658 },
  { name: "Liberal", state: "KS", pop: 19825 },
  { name: "Colby", state: "KS", pop: 5387 },
  { name: "Alpine", state: "TX", pop: 5905 },
  { name: "Marfa", state: "TX", pop: 1728 },
  { name: "Fort Stockton", state: "TX", pop: 8283 },
  { name: "Presidio", state: "TX", pop: 3978 },
  { name: "Ruidoso", state: "NM", pop: 7971 },
  { name: "Silver City", state: "NM", pop: 9990 },
  { name: "Lordsburg", state: "NM", pop: 2432 },
  { name: "Show Low", state: "AZ", pop: 11361 },
  { name: "Winslow", state: "AZ", pop: 9009 },
  { name: "Holbrook", state: "AZ", pop: 5053 },
  { name: "Page", state: "AZ", pop: 7247 },
  { name: "Elko", state: "NV", pop: 20332 },
  { name: "Winnemucca", state: "NV", pop: 7731 },
  { name: "Ely", state: "NV", pop: 3941 },
  { name: "Fallon", state: "NV", pop: 8606 },
  { name: "Alturas", state: "CA", pop: 2827 },
  { name: "Bishop", state: "CA", pop: 3879 },
  { name: "Mammoth Lakes", state: "CA", pop: 8272 },
  { name: "Astoria", state: "OR", pop: 9611 },
  { name: "Burns", state: "OR", pop: 2711 },
  { name: "Winthrop", state: "WA", pop: 442 },
];

const WORLD_CITIES = [
  { name: "Tokyo", country: "Japan", pop: 13960000 },
  { name: "Delhi", country: "India", pop: 32941000 },
  { name: "Shanghai", country: "China", pop: 24870000 },
  { name: "São Paulo", country: "Brazil", pop: 22430000 },
  { name: "Mexico City", country: "Mexico", pop: 21671000 },
  { name: "Cairo", country: "Egypt", pop: 21323000 },
  { name: "Dhaka", country: "Bangladesh", pop: 23210000 },
  { name: "Mumbai", country: "India", pop: 20667000 },
  { name: "Beijing", country: "China", pop: 21540000 },
  { name: "Osaka", country: "Japan", pop: 19059000 },
  { name: "Karachi", country: "Pakistan", pop: 17236000 },
  { name: "Istanbul", country: "Turkey", pop: 15415000 },
  { name: "Kinshasa", country: "DR Congo", pop: 16316000 },
  { name: "Lagos", country: "Nigeria", pop: 15388000 },
  { name: "Buenos Aires", country: "Argentina", pop: 15618000 },
  { name: "Kolkata", country: "India", pop: 15134000 },
  { name: "Manila", country: "Philippines", pop: 14158000 },
  { name: "Rio de Janeiro", country: "Brazil", pop: 13634000 },
  { name: "Guangzhou", country: "China", pop: 13501000 },
  { name: "Shenzhen", country: "China", pop: 12831000 },
  { name: "Lahore", country: "Pakistan", pop: 13095000 },
  { name: "Moscow", country: "Russia", pop: 12506000 },
  { name: "Paris", country: "France", pop: 11142000 },
  { name: "London", country: "UK", pop: 9541000 },
  { name: "Bangkok", country: "Thailand", pop: 11070000 },
  { name: "Lima", country: "Peru", pop: 11204000 },
  { name: "Bangalore", country: "India", pop: 12765000 },
  { name: "Bogotá", country: "Colombia", pop: 11167000 },
  { name: "Jakarta", country: "Indonesia", pop: 10770000 },
  { name: "Tehran", country: "Iran", pop: 9381000 },
  { name: "Johannesburg", country: "South Africa", pop: 9249000 },
  { name: "Baghdad", country: "Iraq", pop: 7711000 },
  { name: "Santiago", country: "Chile", pop: 6812000 },
  { name: "Riyadh", country: "Saudi Arabia", pop: 7538000 },
  { name: "Singapore", country: "Singapore", pop: 5850000 },
  { name: "Dar es Salaam", country: "Tanzania", pop: 7405000 },
  { name: "Hanoi", country: "Vietnam", pop: 5253000 },
  { name: "Barcelona", country: "Spain", pop: 5687000 },
  { name:: "Cape Town", country: "South Africa", pop: 4618000 },
  { name: "Nairobi", country: "Kenya", pop: 5118000 },
  { name: "Addis Ababa", country: "Ethiopia", pop: 5006000 },
  { name: "Accra", country: "Ghana", pop: 3630000 },
  { name: "Madrid", country: "Spain", pop: 3332000 },
  { name: "Berlin", country: "Germany", pop: 3769000 },
  { name: "Rome", country: "Italy", pop: 4355000 },
  { name: "Sydney", country: "Australia", pop: 5312000 },
  { name: "Melbourne", country: "Australia", pop: 5159000 },
  { name: "Toronto", country: "Canada", pop: 6197000 },
  { name: "Montreal", country: "Canada", pop: 4221000 },
  { name: "Seoul", country: "South Korea", pop: 9776000 },
  { name: "Taipei", country: "Taiwan", pop: 2646000 },
  { name: "Kuala Lumpur", country: "Malaysia", pop: 8419000 },
  { name: "Dubai", country: "UAE", pop: 3604000 },
  { name: "Doha", country: "Qatar", pop: 2382000 },
  { name: "Amman", country: "Jordan", pop: 4007000 },
  { name: "Dakar", country: "Senegal", pop: 3731000 },
  { name: "Kampala", country: "Uganda", pop: 3652000 },
  { name: "Lusaka", country: "Zambia", pop: 3360000 },
  { name: "Caracas", country: "Venezuela", pop: 2900000 },
  { name: "Guatemala City", country: "Guatemala", pop: 3010000 },
  { name: "Havana", country: "Cuba", pop: 2100000 },
  { name: "Santo Domingo", country: "Dominican Republic", pop: 3524000 },
  { name: "Oslo", country: "Norway", pop: 1064000 },
  { name: "Stockholm", country: "Sweden", pop: 1653000 },
  { name: "Amsterdam", country: "Netherlands", pop: 1157000 },
  { name: "Vienna", country: "Austria", pop: 1931000 },
  { name: "Warsaw", country: "Poland", pop: 1862000 },
  { name: "Budapest", country: "Hungary", pop: 1752000 },
  { name: "Prague", country: "Czech Republic", pop: 1335000 },
  { name: "Lisbon", country: "Portugal", pop: 2957000 },
  { name: "Auckland", country: "New Zealand", pop: 1657000 },
  { name: "Dublin", country: "Ireland", pop: 1439000 },
  { name: "Ulaanbaatar", country: "Mongolia", pop: 1639000 },
  { name: "Tashkent", country: "Uzbekistan", pop: 2571000 },
  { name: "Almaty", country: "Kazakhstan", pop: 1977000 },
  { name: "Reykjavik", country: "Iceland", pop: 233034 },
];

// ============================================================
// HELPERS
// ============================================================
function formatPop(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(2).replace(/\.?0+$/, "") + "M";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.?0+$/, "") + "K";
  return n.toLocaleString();
}
function getDataset(mode) {
  if (mode === "capitals") return STATE_CAPITALS;
  if (mode === "small") return SMALL_TOWNS;
  if (mode === "world") return WORLD_CITIES;
  return CITIES_100K;
}
function pickTwo(pool, lastPair) {
  let attempts = 0, a, b;
  do {
    a = pool[Math.floor(Math.random() * pool.length)];
    b = pool[Math.floor(Math.random() * pool.length)];
    attempts++;
  } while ((a === b || a.pop === b.pop || (lastPair && (a === lastPair[0] || a === lastPair[1] || b === lastPair[0] || b === lastPair[1]))) && attempts < 50);
  return [a, b];
}
function getLocalStreak() { try { return parseInt(localStorage.getItem("cs_streak") || "0", 10); } catch { return 0; } }
function saveLocalStreak(s) { try { if (s > getLocalStreak()) localStorage.setItem("cs_streak", String(s)); } catch { } }
function getLocalUser() { try { return localStorage.getItem("cs_user") || ""; } catch { return ""; } }
function saveLocalUser(u) { try { localStorage.setItem("cs_user", u); } catch { } }

const TIMER_MAX = 12;
const MODES = [
  { id: "cities", label: "Major Cities", sub: "US cities 100K+", icon: "🏙️" },
  { id: "capitals", label: "State Capitals", sub: "All 50 capitals", icon: "🏛️" },
  { id: "small", label: "Small Towns", sub: "Under 25K pop", icon: "🌾" },
  { id: "world", label: "World Cities", sub: "Hard Mode 🌍", icon: "🌐" },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function CityStack() {
  const [screen, setScreen] = useState("home");
  const [mode, setMode] = useState("cities");
  const [username, setUsername] = useState(getLocalUser);
  const [inputName, setInputName] = useState("");
  const [showNameModal, setShowNameModal] = useState(false);

  const [pair, setPair] = useState(null);
  const [score, setScore] = useState(0);
  const [sessionStreak, setSessionStreak] = useState(0);
  const [allTimeStreak, setAllTimeStreak] = useState(getLocalStreak);
  const [timer, setTimer] = useState(TIMER_MAX);
  const [phase, setPhase] = useState("waiting");
  const [correct, setCorrect] = useState(null);
  const [lastPair, setLastPair] = useState(null);
  const timerRef = useRef(null);
  const nextRef = useRef(null);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);

  const [leaderFilter, setLeaderFilter] = useState("all");
  const [board, setBoard] = useState([]);
  const [boardLoading, setBoardLoading] = useState(false);
  const [topScore, setTopScore] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [dbOk, setDbOk] = useState(true);

  // ---- supabase helpers ----
  async function fetchBoard(filter) {
    setBoardLoading(true);
    try {
      let q = supabase.from("scores").select("username,score,mode,created_at").order("score", { ascending: false }).limit(50);
      const now = new Date();
      if (filter === "daily") q = q.gte("created_at", new Date(now - 86400000).toISOString());
      if (filter === "weekly") q = q.gte("created_at", new Date(now - 604800000).toISOString());
      if (filter === "monthly") q = q.gte("created_at", new Date(now - 2592000000).toISOString());
      const { data, error } = await q;
      if (error) setDbOk(false);
      setBoard(data || []);
    } catch { setDbOk(false); }
    setBoardLoading(false);
  }

  async function fetchHomeStats() {
    try {
      const { data: top } = await supabase.from("scores").select("score").order("score", { ascending: false }).limit(1);
      const { count } = await supabase.from("scores").select("*", { count: "exact", head: true });
      setTopScore(top?.[0]?.score ?? 0);
      setGamesPlayed(count ?? 0);
    } catch { }
  }

  useEffect(() => { fetchHomeStats(); }, []);
  useEffect(() => { if (screen === "leaderboard") fetchBoard(leaderFilter); }, [screen, leaderFilter]);

  async function pushScore(user, sc, md) {
    try { await supabase.from("scores").insert({ username: user, score: sc, mode: md }); } catch { }
  }
  async function pushStreak(user, st) {
    try { await supabase.from("streaks").insert({ username: user, streak: st }); } catch { }
  }

  // ---- timer ----
  useEffect(() => {
    if (screen !== "play" || phase !== "waiting") return;
    setTimer(TIMER_MAX);
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) { clearInterval(timerRef.current); doEndGame(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [pair, screen, phase]);

  function doEndGame() {
    clearInterval(timerRef.current);
    setPhase("reveal");
    setCorrect(null);
    const finalScore = scoreRef.current;
    const finalStreak = streakRef.current;
    if (username) {
      pushScore(username, finalScore, mode);
      if (finalStreak > 0) pushStreak(username, finalStreak);
    }
    fetchHomeStats();
    nextRef.current = setTimeout(() => setScreen("gameover"), 1000);
  }

  function startGame(m) {
    clearTimeout(nextRef.current);
    clearInterval(timerRef.current);
    const pool = getDataset(m || mode);
    const p = pickTwo(pool, null);
    scoreRef.current = 0;
    streakRef.current = 0;
    setPair(p);
    setLastPair(p);
    setScore(0);
    setSessionStreak(0);
    setPhase("waiting");
    setCorrect(null);
    setScreen("play");
  }

  function handleGuess(side) {
    if (phase !== "waiting") return;
    clearInterval(timerRef.current);
    const [left, right] = pair;
    const correctSide = left.pop >= right.pop ? "left" : "right";
    const isCorrect = side === correctSide;
    setCorrect(correctSide);
    setPhase("reveal");

    if (isCorrect) {
      scoreRef.current += 1;
      streakRef.current += 1;
      setScore(scoreRef.current);
      setSessionStreak(streakRef.current);
      saveLocalStreak(streakRef.current);
      setAllTimeStreak(a => Math.max(a, streakRef.current));
      nextRef.current = setTimeout(() => {
        const pool = getDataset(mode);
        const p = pickTwo(pool, lastPair);
        setPair(p);
        setLastPair(p);
        setPhase("waiting");
        setCorrect(null);
      }, 1300);
    } else {
      nextRef.current = setTimeout(() => doEndGame(), 1300);
    }
  }

  function saveUsername() {
    const name = inputName.trim();
    if (!name) return;
    setUsername(name);
    saveLocalUser(name);
    setShowNameModal(false);
  }

  const timerPct = (timer / TIMER_MAX) * 100;
  const timerColor = timer > 7 ? "#4ade80" : timer > 4 ? "#fbbf24" : "#f87171";

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div style={s.root}>
      <div style={s.grain} />

      {screen !== "play" && (
        <nav style={s.nav}>
          <span style={s.logo} onClick={() => setScreen("home")}><span style={s.logoC}>City</span>Stack</span>
          <div style={s.navLinks}>
            <button style={s.navBtn} onClick={() => setScreen("leaderboard")}>🏆 Board</button>
            <button style={s.navBtn} onClick={() => setScreen("howto")}>? How</button>
            {username
              ? <span style={s.userChip}>👤 {username}</span>
              : <button style={s.navBtnAccent} onClick={() => setShowNameModal(true)}>Sign In</button>}
          </div>
        </nav>
      )}

      {/* HOME */}
      {screen === "home" && (
        <div style={s.homeWrap}>
          <div style={s.heroText}>
            <div style={s.eyebrow}>🗺️ THE POPULATION GUESSING GAME</div>
            <h1 style={s.heroTitle}>Which city is<br /><span style={s.heroAccent}>bigger?</span></h1>
            <p style={s.heroSub}>Tap the city with more people. Beat the clock. Build your streak.</p>
          </div>
          <div style={s.modeGrid}>
            {MODES.map(m => (
              <button key={m.id} style={{ ...s.modeCard, ...(mode === m.id ? s.modeCardActive : {}) }} onClick={() => setMode(m.id)}>
                <span style={s.modeIcon}>{m.icon}</span>
                <span style={s.modeLabel}>{m.label}</span>
                <span style={s.modeSub}>{m.sub}</span>
              </button>
            ))}
          </div>
          <button style={s.playBtn} onClick={() => startGame(mode)}>PLAY NOW</button>
          <div style={s.statsRow}>
            <div style={s.statBox}><span style={s.statNum}>{allTimeStreak}</span><span style={s.statLabel}>My Best Streak</span></div>
            <div style={s.statBox}><span style={s.statNum}>{gamesPlayed.toLocaleString()}</span><span style={s.statLabel}>Global Games</span></div>
            <div style={s.statBox}><span style={s.statNum}>{topScore}</span><span style={s.statLabel}>Global Best</span></div>
          </div>
          {!dbOk && <p style={{ color: "#f87171", fontSize: 12, textAlign: "center" }}>⚠️ Database connection issue — scores may not save.</p>}
          {!username && (
            <p style={s.guestNote}>Playing as guest. <button style={s.inlineBtn} onClick={() => setShowNameModal(true)}>Create account</button> to appear on the global leaderboard.</p>
          )}
        </div>
      )}

      {/* PLAY */}
      {screen === "play" && pair && (
        <div style={s.playWrap}>
          <div style={s.playHeader}>
            <button style={s.exitBtn} onClick={() => { clearInterval(timerRef.current); clearTimeout(nextRef.current); setScreen("home"); }}>✕</button>
            <div style={s.scoreDisplay}><span style={s.scoreNum}>{score}</span><span style={s.scoreLbl}>score</span></div>
            <div style={s.streakDisplay}>🔥 {sessionStreak}</div>
          </div>
          <div style={s.timerTrack}>
            <div style={{ ...s.timerFill, width: `${timerPct}%`, background: timerColor, transition: "width 1s linear, background 0.3s" }} />
          </div>
          <div style={{ color: timerColor, fontFamily: "monospace", fontSize: 13, textAlign: "right", padding: "2px 16px 0" }}>{timer}s</div>
          <div style={s.questionLabel}>Which city has a larger population?</div>
          <div style={s.cardsRow}>
            {[pair[0], pair[1]].map((city, i) => {
              const side = i === 0 ? "left" : "right";
              let cs = { ...s.cityCard };
              if (phase === "reveal") cs = side === correct ? { ...cs, ...s.cardCorrect } : { ...cs, ...s.cardWrong };
              return (
                <button key={i} style={cs} onClick={() => handleGuess(side)} disabled={phase !== "waiting"}>
                  <span style={s.cityName}>{city.name}</span>
                  <span style={s.cityMeta}>{city.country || city.state}</span>
                  {phase === "reveal" && <span style={s.popReveal}>{formatPop(city.pop)}</span>}
                  {phase === "waiting" && <span style={s.tapHint}>TAP TO PICK</span>}
                </button>
              );
            })}
          </div>
          <div style={s.vsBadge}>VS</div>
          <div style={s.modeTag}>{MODES.find(m => m.id === mode)?.label}</div>
        </div>
      )}

      {/* GAME OVER */}
      {screen === "gameover" && (
        <div style={s.goWrap}>
          <div style={s.goCard}>
            <div style={s.goIcon}>💥</div>
            <h2 style={s.goTitle}>Game Over</h2>
            <div style={s.goScore}>{score}</div>
            <div style={s.goScoreLbl}>questions answered</div>
            <div style={s.goStreak}>🔥 Streak this game: {sessionStreak}</div>
            <div style={s.goStreak}>⚡ All-time best: {allTimeStreak}</div>
            {username
              ? <p style={{ color: "#4ade80", fontSize: 13, margin: 0 }}>✅ Score saved to global leaderboard as <strong>{username}</strong></p>
              : <p style={s.goGuest}><button style={s.inlineBtn} onClick={() => setShowNameModal(true)}>Create an account</button> to save scores globally!</p>}
            <div style={s.goBtns}>
              <button style={s.playBtn} onClick={() => startGame(mode)}>Play Again</button>
              <button style={s.secBtn} onClick={() => setScreen("leaderboard")}>View Leaderboard</button>
              <button style={s.secBtn} onClick={() => setScreen("home")}>Home</button>
            </div>
          </div>
        </div>
      )}

      {/* LEADERBOARD */}
      {screen === "leaderboard" && (
        <div style={s.lbWrap}>
          <h2 style={s.lbTitle}>🏆 Global Leaderboard</h2>
          <div style={s.filterRow}>
            {["daily", "weekly", "monthly", "all"].map(f => (
              <button key={f} style={{ ...s.filterBtn, ...(leaderFilter === f ? s.filterBtnActive : {}) }} onClick={() => setLeaderFilter(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div style={s.lbList}>
            {boardLoading && <div style={{ color: "#8899aa", textAlign: "center", padding: 40 }}>Loading global scores...</div>}
            {!boardLoading && board.length === 0 && <div style={{ color: "#8899aa", textAlign: "center", padding: 40 }}>No scores yet — be the first!</div>}
            {!boardLoading && board.map((e, i) => (
              <div key={i} style={{ ...s.lbRow, ...(e.username === username ? s.lbRowMe : {}) }}>
                <span style={s.lbRank}>{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}</span>
                <span style={s.lbName}>{e.username}</span>
                <span style={s.lbMode}>{MODES.find(m => m.id === e.mode)?.icon}</span>
                <span style={s.lbScore}>{e.score}</span>
              </div>
            ))}
          </div>
          <button style={s.secBtn} onClick={() => setScreen("home")}>← Back</button>
        </div>
      )}

      {/* HOW TO */}
      {screen === "howto" && (
        <div style={s.howWrap}>
          <h2 style={s.lbTitle}>How to Play</h2>
          <div style={s.howCard}>
            {[
              ["1", "Choose a game mode — Major Cities, State Capitals, Small Towns, or World (Hard)."],
              ["2", "Two cities appear — tap the one with the larger population."],
              ["3", "You have 12 seconds per question. Running out of time counts as a wrong answer."],
              ["4", "One wrong answer ends your run. Build the longest streak you can!"],
              ["5", "Create a free account to save your score to the global leaderboard."],
            ].map(([n, t]) => <p key={n} style={s.howStep}><span style={s.howNum}>{n}</span>{t}</p>)}
            <div style={s.howSources}>
              <strong>✅ Verified Data Sources</strong><br />
              🇺🇸 US cities & capitals: U.S. Census Bureau Population Estimates Program<br />
              🌍 World cities: UN World Urbanization Prospects / GeoNames.org
            </div>
          </div>
          <button style={s.secBtn} onClick={() => setScreen("home")}>← Back</button>
        </div>
      )}

      {/* MODAL */}
      {showNameModal && (
        <div style={s.modalOverlay} onClick={() => setShowNameModal(false)}>
          <div style={s.modalBox} onClick={e => e.stopPropagation()}>
            <h3 style={s.modalTitle}>Create Account</h3>
            <p style={s.modalSub}>Pick a username to appear on the global leaderboard. Your scores will be visible to all players worldwide.</p>
            <input style={s.nameInput} placeholder="Enter username..." value={inputName} onChange={e => setInputName(e.target.value)} onKeyDown={e => e.key === "Enter" && saveUsername()} autoFocus maxLength={20} />
            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <button style={s.playBtn} onClick={saveUsername}>Save</button>
              <button style={s.secBtn} onClick={() => setShowNameModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const s = {
  root: { minHeight: "100vh", background: "#0a0e1a", color: "#e8eaf0", fontFamily: "'Space Grotesk','Segoe UI',sans-serif", position: "relative", overflowX: "hidden" },
  grain: { position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")", opacity: 0.4 },
  nav: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: "1px solid #1e2840", position: "relative", zIndex: 10 },
  logo: { fontSize: 22, fontWeight: 800, cursor: "pointer", letterSpacing: -0.5 },
  logoC: { color: "#38bdf8" },
  navLinks: { display: "flex", alignItems: "center", gap: 10 },
  navBtn: { background: "transparent", border: "1px solid #2a3550", color: "#8899bb", padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontFamily: "inherit" },
  navBtnAccent: { background: "#38bdf8", border: "none", color: "#0a0e1a", padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "inherit" },
  userChip: { background: "#1a2235", border: "1px solid #2a3550", color: "#38bdf8", padding: "6px 12px", borderRadius: 20, fontSize: 13 },
  homeWrap: { maxWidth: 520, margin: "0 auto", padding: "40px 20px 60px", display: "flex", flexDirection: "column", alignItems: "center", gap: 28, position: "relative", zIndex: 1 },
  eyebrow: { fontSize: 11, letterSpacing: 3, color: "#38bdf8", fontWeight: 600, textTransform: "uppercase", marginBottom: 8 },
  heroText: { textAlign: "center" },
  heroTitle: { fontSize: 52, fontWeight: 900, lineHeight: 1.05, margin: "0 0 12px", letterSpacing: -2 },
  heroAccent: { color: "#38bdf8", fontStyle: "italic" },
  heroSub: { color: "#6677aa", fontSize: 15, margin: 0 },
  modeGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, width: "100%" },
  modeCard: { background: "#111827", border: "2px solid #1e2840", borderRadius: 14, padding: "18px 16px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4, transition: "all 0.2s", fontFamily: "inherit" },
  modeCardActive: { border: "2px solid #38bdf8", background: "#0f1e30", boxShadow: "0 0 20px rgba(56,189,248,0.15)" },
  modeIcon: { fontSize: 24, marginBottom: 4 },
  modeLabel: { fontSize: 14, fontWeight: 700, color: "#e8eaf0" },
  modeSub: { fontSize: 11, color: "#5566aa" },
  playBtn: { background: "linear-gradient(135deg,#38bdf8,#0ea5e9)", border: "none", color: "#fff", fontWeight: 900, fontSize: 18, letterSpacing: 2, padding: "16px 48px", borderRadius: 14, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 24px rgba(56,189,248,0.3)", width: "100%" },
  statsRow: { display: "flex", gap: 16, width: "100%" },
  statBox: { flex: 1, background: "#111827", borderRadius: 12, padding: "16px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, border: "1px solid #1e2840" },
  statNum: { fontSize: 28, fontWeight: 800, color: "#38bdf8" },
  statLabel: { fontSize: 10, color: "#5566aa", textTransform: "uppercase", letterSpacing: 1 },
  guestNote: { color: "#5566aa", fontSize: 13, textAlign: "center", margin: 0 },
  inlineBtn: { background: "none", border: "none", color: "#38bdf8", cursor: "pointer", textDecoration: "underline", fontSize: "inherit", padding: 0, fontFamily: "inherit" },
  playWrap: { minHeight: "100vh", display: "flex", flexDirection: "column", background: "#0a0e1a", position: "relative", zIndex: 1 },
  playHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #1e2840" },
  exitBtn: { background: "#1e2840", border: "none", color: "#8899bb", width: 36, height: 36, borderRadius: 8, cursor: "pointer", fontSize: 16, fontFamily: "inherit" },
  scoreDisplay: { display: "flex", flexDirection: "column", alignItems: "center" },
  scoreNum: { fontSize: 32, fontWeight: 900, color: "#38bdf8", lineHeight: 1 },
  scoreLbl: { fontSize: 10, color: "#5566aa", textTransform: "uppercase", letterSpacing: 1 },
  streakDisplay: { fontSize: 22, fontWeight: 700 },
  timerTrack: { height: 6, background: "#1e2840" },
  timerFill: { height: "100%" },
  questionLabel: { textAlign: "center", color: "#6677aa", fontSize: 13, letterSpacing: 1, textTransform: "uppercase", padding: "20px 20px 10px" },
  cardsRow: { flex: 1, display: "flex", gap: 0, padding: "10px 16px", justifyContent: "center", alignItems: "stretch", flexWrap: "wrap" },
  cityCard: { flex: 1, minWidth: 140, maxWidth: 200, margin: 8, background: "#111827", border: "2px solid #1e2840", borderRadius: 20, padding: "32px 20px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.15s", fontFamily: "inherit", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" },
  cardCorrect: { background: "#052e16", border: "2px solid #4ade80", boxShadow: "0 0 30px rgba(74,222,128,0.3)" },
  cardWrong: { background: "#2d0000", border: "2px solid #f87171", boxShadow: "0 0 30px rgba(248,113,113,0.3)" },
  cityName: { fontSize: 22, fontWeight: 800, textAlign: "center", lineHeight: 1.2 },
  cityMeta: { fontSize: 12, color: "#6677aa", textTransform: "uppercase", letterSpacing: 1 },
  popReveal: { fontSize: 26, fontWeight: 900, color: "#38bdf8", marginTop: 8 },
  tapHint: { fontSize: 9, color: "#3a4560", textTransform: "uppercase", letterSpacing: 2, marginTop: 4 },
  vsBadge: { position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", background: "#1e2840", borderRadius: 50, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "#6677aa", pointerEvents: "none", zIndex: 5 },
  modeTag: { textAlign: "center", color: "#3a4560", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", padding: "8px 0 20px" },
  goWrap: { minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, position: "relative", zIndex: 1 },
  goCard: { background: "#111827", border: "1px solid #1e2840", borderRadius: 24, padding: "40px 32px", maxWidth: 400, width: "100%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 },
  goIcon: { fontSize: 56 },
  goTitle: { fontSize: 32, fontWeight: 900, margin: 0 },
  goScore: { fontSize: 72, fontWeight: 900, color: "#38bdf8", lineHeight: 1 },
  goScoreLbl: { color: "#5566aa", fontSize: 13, letterSpacing: 1 },
  goStreak: { color: "#8899bb", fontSize: 14 },
  goGuest: { color: "#5566aa", fontSize: 13, margin: 0 },
  goBtns: { display: "flex", flexDirection: "column", gap: 10, width: "100%", marginTop: 8 },
  secBtn: { background: "#1e2840", border: "1px solid #2a3550", color: "#8899bb", padding: "12px 24px", borderRadius: 10, cursor: "pointer", fontSize: 14, fontFamily: "inherit", fontWeight: 600 },
  lbWrap: { maxWidth: 500, margin: "0 auto", padding: "40px 20px", position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 16 },
  lbTitle: { fontSize: 28, fontWeight: 900, margin: 0, textAlign: "center" },
  filterRow: { display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" },
  filterBtn: { background: "#111827", border: "1px solid #1e2840", color: "#6677aa", padding: "7px 18px", borderRadius: 20, cursor: "pointer", fontSize: 13, fontFamily: "inherit" },
  filterBtnActive: { background: "#0f1e30", border: "1px solid #38bdf8", color: "#38bdf8" },
  lbList: { display: "flex", flexDirection: "column", gap: 6 },
  lbRow: { display: "flex", alignItems: "center", background: "#111827", border: "1px solid #1e2840", borderRadius: 10, padding: "12px 16px", gap: 12 },
  lbRowMe: { border: "1px solid #38bdf8", background: "#0f1e30" },
  lbRank: { color: "#5566aa", fontSize: 13, width: 32 },
  lbName: { flex: 1, fontWeight: 700 },
  lbMode: { fontSize: 18 },
  lbScore: { color: "#38bdf8", fontWeight: 900, fontSize: 18, minWidth: 40, textAlign: "right" },
  howWrap: { maxWidth: 500, margin: "0 auto", padding: "40px 20px", position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 16 },
  howCard: { background: "#111827", border: "1px solid #1e2840", borderRadius: 16, padding: "24px", display: "flex", flexDirection: "column", gap: 16 },
  howStep: { margin: 0, display: "flex", alignItems: "flex-start", gap: 14, fontSize: 15, lineHeight: 1.5 },
  howNum: { background: "#38bdf8", color: "#0a0e1a", borderRadius: "50%", width: 26, height: 26, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, flexShrink: 0 },
  howSources: { background: "#0a0e1a", borderRadius: 10, padding: "14px 16px", fontSize: 12, color: "#6677aa", lineHeight: 1.8, marginTop: 4 },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 },
  modalBox: { background: "#111827", border: "1px solid #2a3550", borderRadius: 20, padding: "32px 28px", maxWidth: 380, width: "100%" },
  modalTitle: { fontSize: 22, fontWeight: 900, margin: "0 0 8px" },
  modalSub: { color: "#6677aa", fontSize: 13, margin: "0 0 20px", lineHeight: 1.5 },
  nameInput: { width: "100%", background: "#0a0e1a", border: "1px solid #2a3550", borderRadius: 10, padding: "12px 16px", color: "#e8eaf0", fontSize: 16, fontFamily: "inherit", boxSizing: "border-box", outline: "none" },
};
