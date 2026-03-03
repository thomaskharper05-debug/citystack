import { useState, useEffect, useRef } from "react";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://uvjwvalaqpwljbxmlvn.supabase.co";
const SUPABASE_KEY = "sb_publishable_mPfF9lIS9JJyukbFnsVW5g_tt0lz0dl";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const CITY_PHOTOS = {
  "New York": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80",
  "Los Angeles": "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=600&q=80",
  "Chicago": "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
  "Houston": "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=600&q=80",
  "Phoenix": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  "Philadelphia": "https://images.unsplash.com/photo-1601332069835-6cf9b6e60b4d?w=600&q=80",
  "San Diego": "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80",
  "Dallas": "https://images.unsplash.com/photo-1545194445-dddb8f4487c6?w=600&q=80",
  "Austin": "https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=600&q=80",
  "Seattle": "https://images.unsplash.com/photo-1502175353174-a7a70e73b362?w=600&q=80",
  "Denver": "https://images.unsplash.com/photo-1546156929-a4c0ac411f47?w=600&q=80",
  "Nashville": "https://images.unsplash.com/photo-1545419913-775e3e82a0b2?w=600&q=80",
  "Boston": "https://images.unsplash.com/photo-1501979376754-f529e2bace3d?w=600&q=80",
  "Las Vegas": "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=600&q=80",
  "Portland": "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=600&q=80",
  "Memphis": "https://images.unsplash.com/photo-1570197571499-166b36435e9f?w=600&q=80",
  "Atlanta": "https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?w=600&q=80",
  "Minneapolis": "https://images.unsplash.com/photo-1569388037243-dfa034f93e99?w=600&q=80",
  "New Orleans": "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&q=80",
  "Tampa": "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?w=600&q=80",
  "Washington": "https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=600&q=80",
  "San Francisco": "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80",
  "Orlando": "https://images.unsplash.com/photo-1575931953324-df3ef4eb34de?w=600&q=80",
  "Sacramento": "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=600&q=80",
  "Pittsburgh": "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=80",
  "Honolulu": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
  "Salt Lake City": "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
  "Raleigh": "https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?w=600&q=80",
  "Richmond": "https://images.unsplash.com/photo-1575931953324-df3ef4eb34de?w=600&q=80",
  "Louisville": "https://images.unsplash.com/photo-1570197571499-166b36435e9f?w=600&q=80",
  "Milwaukee": "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=80",
  "Kansas City": "https://images.unsplash.com/photo-1546156929-a4c0ac411f47?w=600&q=80",
  "Reno": "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=600&q=80",
  "Baton Rouge": "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&q=80",
  "Tokyo": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
  "Delhi": "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80",
  "Shanghai": "https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=600&q=80",
  "Sao Paulo": "https://images.unsplash.com/photo-1559333086-b0a56225a93c?w=600&q=80",
  "Mexico City": "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=600&q=80",
  "Cairo": "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=600&q=80",
  "Mumbai": "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=600&q=80",
  "Beijing": "https://images.unsplash.com/photo-1508804052814-cd3ba865a116?w=600&q=80",
  "London": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",
  "Paris": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
  "Moscow": "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=600&q=80",
  "Istanbul": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80",
  "Bangkok": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=80",
  "Seoul": "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=600&q=80",
  "Lagos": "https://images.unsplash.com/photo-1555990538-c4e389c3d2ec?w=600&q=80",
  "Buenos Aires": "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=600&q=80",
  "Rio de Janeiro": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80",
  "Lima": "https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=600&q=80",
  "Singapore": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80",
  "Dubai": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
  "Sydney": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80",
  "Melbourne": "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=600&q=80",
  "Toronto": "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=600&q=80",
  "Berlin": "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
  "Madrid": "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80",
  "Rome": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80",
  "Barcelona": "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80",
  "Vienna": "https://images.unsplash.com/photo-1516550893885-f5e7c0b0dc2d?w=600&q=80",
  "Amsterdam": "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&q=80",
  "Prague": "https://images.unsplash.com/photo-1541849546-216549ae216d?w=600&q=80",
  "Budapest": "https://images.unsplash.com/photo-1551867633-194f125bddfa?w=600&q=80",
  "Lisbon": "https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=600&q=80",
  "Dublin": "https://images.unsplash.com/photo-1549918864-48ac978761a4?w=600&q=80",
  "Stockholm": "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=600&q=80",
  "Nairobi": "https://images.unsplash.com/photo-1518491247-b0c2d9cb0e1b?w=600&q=80",
  "Cape Town": "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=80",
  "Havana": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80",
  "Reykjavik": "https://images.unsplash.com/photo-1531168386169-0b6fb7a4b3f4?w=600&q=80",
};

function getPhoto(name) {
  return CITY_PHOTOS[name] || "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80";
}

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
  { name: "Honolulu", state: "HI", pop: 347397 },
  { name: "Aurora", state: "CO", pop: 366623 },
  { name: "Corpus Christi", state: "TX", pop: 326586 },
  { name: "Riverside", state: "CA", pop: 314998 },
  { name: "Lexington", state: "KY", pop: 322570 },
  { name: "St. Louis", state: "MO", pop: 301578 },
  { name: "Pittsburgh", state: "PA", pop: 302971 },
  { name: "Cincinnati", state: "OH", pop: 309317 },
  { name: "St. Paul", state: "MN", pop: 311527 },
  { name: "Greensboro", state: "NC", pop: 299035 },
  { name: "Toledo", state: "OH", pop: 270871 },
  { name: "Henderson", state: "NV", pop: 320189 },
  { name: "Orlando", state: "FL", pop: 307573 },
  { name: "Madison", state: "WI", pop: 269840 },
  { name: "Durham", state: "NC", pop: 278993 },
  { name: "Reno", state: "NV", pop: 255601 },
  { name: "Baton Rouge", state: "LA", pop: 227470 },
  { name: "Irvine", state: "CA", pop: 307670 },
  { name: "Scottsdale", state: "AZ", pop: 258069 },
  { name: "Fremont", state: "CA", pop: 230504 },
  { name: "Gilbert", state: "AZ", pop: 267918 },
  { name: "Birmingham", state: "AL", pop: 212237 },
  { name: "Richmond", state: "VA", pop: 230436 },
  { name: "Spokane", state: "WA", pop: 222081 },
  { name: "Des Moines", state: "IA", pop: 214133 },
  { name: "Huntsville", state: "AL", pop: 215006 },
  { name: "Salt Lake City", state: "UT", pop: 200567 },
  { name: "Tallahassee", state: "FL", pop: 196169 },
  { name: "Chattanooga", state: "TN", pop: 181099 },
  { name: "Fort Lauderdale", state: "FL", pop: 182760 },
  { name: "Cape Coral", state: "FL", pop: 194016 },
  { name: "Eugene", state: "OR", pop: 176654 },
  { name: "Vancouver", state: "WA", pop: 190915 },
  { name: "Sioux Falls", state: "SD", pop: 192517 },
  { name: "McKinney", state: "TX", pop: 199177 },
  { name: "Frisco", state: "TX", pop: 200509 },
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
  { name: "Moab", state: "UT", pop: 5268 },
  { name: "Kanab", state: "UT", pop: 4803 },
  { name: "Lander", state: "WY", pop: 7487 },
  { name: "Cody", state: "WY", pop: 9985 },
  { name: "Havre", state: "MT", pop: 9510 },
  { name: "Devils Lake", state: "ND", pop: 7270 },
  { name: "Huron", state: "SD", pop: 14263 },
  { name: "Alliance", state: "NE", pop: 8148 },
  { name: "Garden City", state: "KS", pop: 26658 },
  { name: "Marfa", state: "TX", pop: 1728 },
  { name: "Ruidoso", state: "NM", pop: 7971 },
  { name: "Silver City", state: "NM", pop: 9990 },
  { name: "Show Low", state: "AZ", pop: 11361 },
  { name: "Winslow", state: "AZ", pop: 9009 },
  { name: "Elko", state: "NV", pop: 20332 },
  { name: "Winnemucca", state: "NV", pop: 7731 },
  { name: "Ely", state: "NV", pop: 3941 },
  { name: "Bishop", state: "CA", pop: 3879 },
  { name: "Astoria", state: "OR", pop: 9611 },
  { name: "Burns", state: "OR", pop: 2711 },
  { name: "Winthrop", state: "WA", pop: 442 },
];

const WORLD_CITIES = [
  { name: "Tokyo", country: "Japan", pop: 13960000 },
  { name: "Delhi", country: "India", pop: 32941000 },
  { name: "Shanghai", country: "China", pop: 24870000 },
  { name: "Sao Paulo", country: "Brazil", pop: 22430000 },
  { name: "Mexico City", country: "Mexico", pop: 21671000 },
  { name: "Cairo", country: "Egypt", pop: 21323000 },
  { name: "Mumbai", country: "India", pop: 20667000 },
  { name: "Beijing", country: "China", pop: 21540000 },
  { name: "Osaka", country: "Japan", pop: 19059000 },
  { name: "Karachi", country: "Pakistan", pop: 17236000 },
  { name: "Istanbul", country: "Turkey", pop: 15415000 },
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
  { name: "Bogota", country: "Colombia", pop: 11167000 },
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
  { name: "Cape Town", country: "South Africa", pop: 4618000 },
  { name: "Nairobi", country: "Kenya", pop: 5118000 },
  { name: "Accra", country: "Ghana", pop: 3630000 },
  { name: "Madrid", country: "Spain", pop: 3332000 },
  { name: "Berlin", country: "Germany", pop: 3769000 },
  { name: "Rome", country: "Italy", pop: 4355000 },
  { name: "Sydney", country: "Australia", pop: 5312000 },
  { name: "Melbourne", country: "Australia", pop: 5159000 },
  { name: "Toronto", country: "Canada", pop: 6197000 },
  { name: "Seoul", country: "South Korea", pop: 9776000 },
  { name: "Dubai", country: "UAE", pop: 3604000 },
  { name: "Amman", country: "Jordan", pop: 4007000 },
  { name: "Havana", country: "Cuba", pop: 2100000 },
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
  { name: "Reykjavik", country: "Iceland", pop: 233034 },
  { name: "Almaty", country: "Kazakhstan", pop: 1977000 },
];

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
function getLS(k, def) { try { return localStorage.getItem(k) || def; } catch { return def; } }
function setLS(k, v) { try { localStorage.setItem(k, v); } catch { } }

const TIMER_MAX = 12;
const MODES = [
  { id: "cities", label: "Major Cities", sub: "US cities 100K+", icon: "🏙️" },
  { id: "capitals", label: "State Capitals", sub: "All 50 capitals", icon: "🏛️" },
  { id: "small", label: "Small Towns", sub: "Under 25K pop", icon: "🌾" },
  { id: "world", label: "World Cities", sub: "Hard Mode 🌍", icon: "🌐" },
];

const DARK = { bg: "#0a0e1a", text: "#e8eaf0", subtext: "#6677aa", card: "#111827", cardActive: "#0f1e30", border: "#1e2840" };
const LIGHT = { bg: "#f0f4f8", text: "#0a0e1a", subtext: "#4a5568", card: "#ffffff", cardActive: "#e8f4fd", border: "#d1dce8" };

export default function CityStack() {
  const [darkMode, setDarkMode] = useState(true);
  const [screen, setScreen] = useState("home");
  const [mode, setMode] = useState("cities");
  const [username, setUsername] = useState(() => getLS("cs_user", ""));
  const [inputName, setInputName] = useState("");
  const [showNameModal, setShowNameModal] = useState(false);
  const [pair, setPair] = useState(null);
  const [score, setScore] = useState(0);
  const [sessionStreak, setSessionStreak] = useState(0);
  const [allTimeStreak, setAllTimeStreak] = useState(() => parseInt(getLS("cs_streak", "0")));
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
  const d = darkMode ? DARK : LIGHT;

  async function fetchBoard(filter) {
    setBoardLoading(true);
    try {
      let q = supabase.from("scores").select("username,score,mode,created_at").order("score", { ascending: false }).limit(50);
      const now = new Date();
      if (filter === "daily") q = q.gte("created_at", new Date(now - 86400000).toISOString());
      if (filter === "weekly") q = q.gte("created_at", new Date(now - 604800000).toISOString());
      if (filter === "monthly") q = q.gte("created_at", new Date(now - 2592000000).toISOString());
      const { data } = await q;
      setBoard(data || []);
    } catch { }
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
    if (username) pushScore(username, scoreRef.current, mode);
    fetchHomeStats();
    nextRef.current = setTimeout(() => setScreen("gameover"), 1100);
  }

  function startGame(m) {
    clearTimeout(nextRef.current);
    clearInterval(timerRef.current);
    const pool = getDataset(m || mode);
    const p = pickTwo(pool, null);
    scoreRef.current = 0;
    streakRef.current = 0;
    setPair(p); setLastPair(p); setScore(0); setSessionStreak(0);
    setPhase("waiting"); setCorrect(null); setScreen("play");
  }

  function handleGuess(side) {
    if (phase !== "waiting") return;
    clearInterval(timerRef.current);
    const [left, right] = pair;
    const correctSide = left.pop >= right.pop ? "left" : "right";
    setCorrect(correctSide);
    setPhase("reveal");
    if (side === correctSide) {
      scoreRef.current += 1;
      streakRef.current += 1;
      setScore(scoreRef.current);
      setSessionStreak(streakRef.current);
      const best = Math.max(parseInt(getLS("cs_streak", "0")), streakRef.current);
      setLS("cs_streak", String(best));
      setAllTimeStreak(best);
      nextRef.current = setTimeout(() => {
        const p = pickTwo(getDataset(mode), lastPair);
        setPair(p); setLastPair(p); setPhase("waiting"); setCorrect(null);
      }, 1400);
    } else {
      nextRef.current = setTimeout(() => doEndGame(), 1400);
    }
  }

  function saveUsername() {
    const name = inputName.trim();
    if (!name) return;
    setUsername(name); setLS("cs_user", name); setShowNameModal(false);
  }

  const timerPct = (timer / TIMER_MAX) * 100;
  const timerColor = timer > 7 ? "#4ade80" : timer > 4 ? "#fbbf24" : "#f87171";
  const secBtn = { background: d.card, border: `1px solid ${d.border}`, color: d.subtext, padding: "12px 24px", borderRadius: 10, cursor: "pointer", fontSize: 14, fontFamily: "inherit", fontWeight: 600 };
  const playBtn = { background: "linear-gradient(135deg,#38bdf8,#0ea5e9)", border: "none", color: "#fff", fontWeight: 900, fontSize: 18, letterSpacing: 2, padding: "16px 48px", borderRadius: 14, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 24px rgba(56,189,248,0.3)", width: "100%" };

  return (
    <div style={{ minHeight: "100vh", background: d.bg, color: d.text, fontFamily: "'Space Grotesk','Segoe UI',sans-serif", overflowX: "hidden" }}>

      {screen !== "play" && (
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", borderBottom: `1px solid ${d.border}`, position: "sticky", top: 0, background: d.bg, zIndex: 20 }}>
          <span style={{ fontSize: 22, fontWeight: 800, cursor: "pointer", letterSpacing: -0.5 }} onClick={() => setScreen("home")}>
            <span style={{ color: "#38bdf8" }}>City</span>Stack
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button style={{ background: "transparent", border: `1px solid ${d.border}`, color: d.subtext, padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }} onClick={() => setScreen("leaderboard")}>🏆 Board</button>
            <button style={{ background: "transparent", border: `1px solid ${d.border}`, color: d.subtext, padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }} onClick={() => setScreen("howto")}>? How</button>
            <button style={{ background: "transparent", border: `1px solid ${d.border}`, color: d.subtext, padding: "5px 10px", borderRadius: 8, cursor: "pointer", fontSize: 18, fontFamily: "inherit" }} onClick={() => setDarkMode(dm => !dm)} title="Toggle light/dark">{darkMode ? "☀️" : "🌙"}</button>
            {username
              ? <span style={{ background: d.card, border: `1px solid ${d.border}`, color: "#38bdf8", padding: "6px 12px", borderRadius: 20, fontSize: 13 }}>👤 {username}</span>
              : <button style={{ background: "#38bdf8", border: "none", color: "#0a0e1a", padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "inherit" }} onClick={() => setShowNameModal(true)}>Sign In</button>}
          </div>
        </nav>
      )}

      {/* HOME */}
      {screen === "home" && (
        <div style={{ maxWidth: 520, margin: "0 auto", padding: "40px 20px 60px", display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "#38bdf8", fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>🗺️ THE POPULATION GUESSING GAME</div>
            <h1 style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.05, margin: "0 0 12px", letterSpacing: -2, color: d.text }}>Which city is<br /><span style={{ color: "#38bdf8", fontStyle: "italic" }}>bigger?</span></h1>
            <p style={{ color: d.subtext, fontSize: 15, margin: 0 }}>Tap the city with more people. Beat the clock. Build your streak.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, width: "100%" }}>
            {MODES.map(m => (
              <button key={m.id} style={{ background: mode === m.id ? d.cardActive : d.card, border: `2px solid ${mode === m.id ? "#38bdf8" : d.border}`, borderRadius: 14, padding: "18px 16px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4, fontFamily: "inherit", transition: "all 0.2s", boxShadow: mode === m.id ? "0 0 20px rgba(56,189,248,0.15)" : "none" }} onClick={() => setMode(m.id)}>
                <span style={{ fontSize: 24, marginBottom: 4 }}>{m.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: d.text }}>{m.label}</span>
                <span style={{ fontSize: 11, color: d.subtext }}>{m.sub}</span>
              </button>
            ))}
          </div>
          <button style={playBtn} onClick={() => startGame(mode)}>PLAY NOW</button>
          <div style={{ display: "flex", gap: 16, width: "100%" }}>
            {[["My Best Streak", allTimeStreak], ["Global Games", gamesPlayed.toLocaleString()], ["Global Best", topScore]].map(([label, val]) => (
              <div key={label} style={{ flex: 1, background: d.card, borderRadius: 12, padding: "16px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, border: `1px solid ${d.border}` }}>
                <span style={{ fontSize: 28, fontWeight: 800, color: "#38bdf8" }}>{val}</span>
                <span style={{ fontSize: 10, color: d.subtext, textTransform: "uppercase", letterSpacing: 1 }}>{label}</span>
              </div>
            ))}
          </div>
          {!username && (
            <p style={{ color: d.subtext, fontSize: 13, textAlign: "center", margin: 0 }}>
              Playing as guest. <button style={{ background: "none", border: "none", color: "#38bdf8", cursor: "pointer", textDecoration: "underline", fontSize: "inherit", padding: 0, fontFamily: "inherit" }} onClick={() => setShowNameModal(true)}>Create account</button> to appear on the leaderboard.
            </p>
          )}
        </div>
      )}

      {/* PLAY */}
      {screen === "play" && pair && (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: d.bg }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderBottom: `1px solid ${d.border}`, flexShrink: 0 }}>
            <button style={{ background: d.card, border: "none", color: d.subtext, width: 36, height: 36, borderRadius: 8, cursor: "pointer", fontSize: 16, fontFamily: "inherit" }} onClick={() => { clearInterval(timerRef.current); clearTimeout(nextRef.current); setScreen("home"); }}>✕</button>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#38bdf8", lineHeight: 1 }}>{score}</div>
              <div style={{ fontSize: 10, color: d.subtext, textTransform: "uppercase", letterSpacing: 1 }}>score</div>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>🔥 {sessionStreak}</div>
          </div>
          {/* Timer */}
          <div style={{ height: 5, background: d.border, flexShrink: 0 }}>
            <div style={{ height: "100%", width: `${timerPct}%`, background: timerColor, transition: "width 1s linear, background 0.3s" }} />
          </div>
          <div style={{ color: timerColor, fontFamily: "monospace", fontSize: 12, textAlign: "right", padding: "2px 16px 0", flexShrink: 0 }}>{timer}s</div>
          <div style={{ textAlign: "center", color: d.subtext, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", padding: "10px 20px 6px", flexShrink: 0 }}>Which city has a larger population?</div>

          {/* CARDS — SIDE BY SIDE HORIZONTAL */}
          <div style={{ flex: 1, display: "flex", flexDirection: "row", gap: 10, padding: "6px 12px 12px", minHeight: 0 }}>
            {[pair[0], pair[1]].map((city, i) => {
              const side = i === 0 ? "left" : "right";
              const isCorrect = phase === "reveal" && side === correct;
              const isWrong = phase === "reveal" && side !== correct;
              return (
                <button key={i} onClick={() => handleGuess(side)} disabled={phase !== "waiting"}
                  style={{ flex: 1, position: "relative", borderRadius: 18, overflow: "hidden", border: isCorrect ? "3px solid #4ade80" : isWrong ? "3px solid #f87171" : `2px solid ${d.border}`, cursor: phase === "waiting" ? "pointer" : "default", padding: 0, background: "transparent", boxShadow: isCorrect ? "0 0 30px rgba(74,222,128,0.4)" : isWrong ? "0 0 30px rgba(248,113,113,0.4)" : "0 4px 20px rgba(0,0,0,0.3)", transition: "all 0.15s" }}>
                  {/* Photo bg */}
                  <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${getPhoto(city.name)})`, backgroundSize: "cover", backgroundPosition: "center", filter: isWrong ? "brightness(0.35) saturate(0.2)" : "brightness(0.5)", transition: "filter 0.3s" }} />
                  {/* Gradient */}
                  <div style={{ position: "absolute", inset: 0, background: isCorrect ? "linear-gradient(to top, rgba(5,46,22,0.95) 0%, rgba(5,46,22,0.2) 70%, transparent 100%)" : isWrong ? "linear-gradient(to top, rgba(45,0,0,0.95) 0%, rgba(45,0,0,0.2) 70%, transparent 100%)" : "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.15) 70%, transparent 100%)" }} />
                  {/* Content */}
                  <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "16px 14px", alignItems: "center", textAlign: "center" }}>
                    {phase === "waiting" && (
                      <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", background: "rgba(255,255,255,0.18)", borderRadius: 20, padding: "4px 12px", fontSize: 9, color: "rgba(255,255,255,0.9)", letterSpacing: 2, textTransform: "uppercase", backdropFilter: "blur(4px)", whiteSpace: "nowrap" }}>TAP TO PICK</div>
                    )}
                    {phase === "reveal" && <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", fontSize: 28 }}>{isCorrect ? "✅" : "❌"}</div>}
                    <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", textShadow: "0 2px 10px rgba(0,0,0,0.9)", lineHeight: 1.15, marginBottom: 4 }}>{city.name}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: 2, marginBottom: phase === "reveal" ? 8 : 0 }}>{city.country || city.state}</div>
                    {phase === "reveal" && <div style={{ fontSize: 26, fontWeight: 900, color: isCorrect ? "#4ade80" : "#f87171", textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>{formatPop(city.pop)}</div>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* VS badge — centered between cards */}
          <div style={{ position: "fixed", left: "50%", top: "52%", transform: "translate(-50%,-50%)", background: d.card, border: `2px solid ${d.border}`, borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12, color: d.subtext, pointerEvents: "none", zIndex: 15, boxShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>VS</div>

          <div style={{ textAlign: "center", color: d.subtext, fontSize: 10, letterSpacing: 2, textTransform: "uppercase", padding: "4px 0 10px", flexShrink: 0 }}>{MODES.find(m => m.id === mode)?.label}</div>
        </div>
      )}

      {/* GAME OVER */}
      {screen === "gameover" && (
        <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: d.card, border: `1px solid ${d.border}`, borderRadius: 24, padding: "40px 32px", maxWidth: 400, width: "100%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 56 }}>💥</div>
            <h2 style={{ fontSize: 32, fontWeight: 900, margin: 0, color: d.text }}>Game Over</h2>
            <div style={{ fontSize: 72, fontWeight: 900, color: "#38bdf8", lineHeight: 1 }}>{score}</div>
            <div style={{ color: d.subtext, fontSize: 13 }}>questions answered</div>
            <div style={{ color: d.subtext, fontSize: 14 }}>🔥 Streak: {sessionStreak} &nbsp;⚡ Best: {allTimeStreak}</div>
            {username
              ? <p style={{ color: "#4ade80", fontSize: 13, margin: 0 }}>✅ Saved as <strong>{username}</strong></p>
              : <p style={{ color: d.subtext, fontSize: 13, margin: 0 }}><button style={{ background: "none", border: "none", color: "#38bdf8", cursor: "pointer", textDecoration: "underline", fontSize: "inherit", padding: 0, fontFamily: "inherit" }} onClick={() => setShowNameModal(true)}>Create account</button> to save scores!</p>}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", marginTop: 8 }}>
              <button style={playBtn} onClick={() => startGame(mode)}>Play Again</button>
              <button style={secBtn} onClick={() => setScreen("leaderboard")}>View Leaderboard</button>
              <button style={secBtn} onClick={() => setScreen("home")}>Home</button>
            </div>
          </div>
        </div>
      )}

      {/* LEADERBOARD */}
      {screen === "leaderboard" && (
        <div style={{ maxWidth: 500, margin: "0 auto", padding: "40px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, margin: 0, textAlign: "center", color: d.text }}>🏆 Global Leaderboard</h2>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {["daily", "weekly", "monthly", "all"].map(f => (
              <button key={f} style={{ background: leaderFilter === f ? d.cardActive : d.card, border: `1px solid ${leaderFilter === f ? "#38bdf8" : d.border}`, color: leaderFilter === f ? "#38bdf8" : d.subtext, padding: "7px 18px", borderRadius: 20, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }} onClick={() => setLeaderFilter(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {boardLoading && <div style={{ color: d.subtext, textAlign: "center", padding: 40 }}>Loading...</div>}
            {!boardLoading && board.length === 0 && <div style={{ color: d.subtext, textAlign: "center", padding: 40 }}>No scores yet — be the first!</div>}
            {!boardLoading && board.map((e, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", background: e.username === username ? d.cardActive : d.card, border: `1px solid ${e.username === username ? "#38bdf8" : d.border}`, borderRadius: 10, padding: "12px 16px", gap: 12 }}>
                <span style={{ color: d.subtext, fontSize: 13, width: 32 }}>{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}</span>
                <span style={{ flex: 1, fontWeight: 700, color: d.text }}>{e.username}</span>
                <span style={{ fontSize: 18 }}>{MODES.find(m => m.id === e.mode)?.icon}</span>
                <span style={{ color: "#38bdf8", fontWeight: 900, fontSize: 18 }}>{e.score}</span>
              </div>
            ))}
          </div>
          <button style={secBtn} onClick={() => setScreen("home")}>← Back</button>
        </div>
      )}

      {/* HOW TO */}
      {screen === "howto" && (
        <div style={{ maxWidth: 500, margin: "0 auto", padding: "40px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, margin: 0, textAlign: "center", color: d.text }}>How to Play</h2>
          <div style={{ background: d.card, border: `1px solid ${d.border}`, borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            {[["1","Choose a game mode from the home screen."],["2","Two cities appear — tap the one with the larger population."],["3","You have 12 seconds per question. Running out counts as wrong."],["4","One wrong answer ends your run. Build the longest streak!"],["5","Create a free account to appear on the global leaderboard."]].map(([n,t]) => (
              <p key={n} style={{ margin: 0, display: "flex", alignItems: "flex-start", gap: 14, fontSize: 15, lineHeight: 1.5, color: d.text }}>
                <span style={{ background: "#38bdf8", color: "#0a0e1a", borderRadius: "50%", width: 26, height: 26, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, flexShrink: 0 }}>{n}</span>{t}
              </p>
            ))}
            <div style={{ background: darkMode ? "#0a0e1a" : "#f0f4f8", borderRadius: 10, padding: "14px 16px", fontSize: 12, color: d.subtext, lineHeight: 1.8 }}>
              <strong>✅ Verified Data Sources</strong><br />
              🇺🇸 US cities: U.S. Census Bureau Population Estimates Program<br />
              🌍 World cities: UN World Urbanization Prospects / GeoNames.org
            </div>
          </div>
          <button style={secBtn} onClick={() => setScreen("home")}>← Back</button>
        </div>
      )}

      {/* MODAL */}
      {showNameModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }} onClick={() => setShowNameModal(false)}>
          <div style={{ background: d.card, border: `1px solid ${d.border}`, borderRadius: 20, padding: "32px 28px", maxWidth: 380, width: "100%" }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: 22, fontWeight: 900, margin: "0 0 8px", color: d.text }}>Create Account</h3>
            <p style={{ color: d.subtext, fontSize: 13, margin: "0 0 20px", lineHeight: 1.5 }}>Pick a username to appear on the global leaderboard.</p>
            <input style={{ width: "100%", background: darkMode ? "#0a0e1a" : "#f0f4f8", border: `1px solid ${d.border}`, borderRadius: 10, padding: "12px 16px", color: d.text, fontSize: 16, fontFamily: "inherit", boxSizing: "border-box", outline: "none" }} placeholder="Enter username..." value={inputName} onChange={e => setInputName(e.target.value)} onKeyDown={e => e.key === "Enter" && saveUsername()} autoFocus maxLength={20} />
            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <button style={playBtn} onClick={saveUsername}>Save</button>
              <button style={secBtn} onClick={() => setShowNameModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
