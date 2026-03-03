import { useState, useEffect, useRef } from "react";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://uvjwvalaqpwljbxmlvn.supabase.co";
const SUPABASE_KEY = "sb_publishable_mPfF9lIS9JJyukbFnsVW5g_tt0lz0dl";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


// Wikimedia Commons — verified real photos of each place
const PHOTO_MAP = {
  // US Major Cities
  "New York": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Southwest_corner_of_Central_Park%2C_looking_east%2C_NYC.jpg/800px-Southwest_corner_of_Central_Park%2C_looking_east%2C_NYC.jpg",
  "Los Angeles": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Los_Angeles_Skyscraper_Cluster.jpg/800px-Los_Angeles_Skyscraper_Cluster.jpg",
  "Chicago": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Chicago_night_crowd.jpg/800px-Chicago_night_crowd.jpg",
  "Houston": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Houston_skyline_daytime.jpg/800px-Houston_skyline_daytime.jpg",
  "Phoenix": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Phoenix_az_downtown_skyline_2008.jpg/800px-Phoenix_az_downtown_skyline_2008.jpg",
  "Philadelphia": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Philadelphia_skyline_from_south_street_bridge_september_2019.jpg/800px-Philadelphia_skyline_from_south_street_bridge_september_2019.jpg",
  "San Antonio": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/San_Antonio_River_Walk_modified.jpg/800px-San_Antonio_River_Walk_modified.jpg",
  "San Diego": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/San_Diego_Skyline_at_Dusk_-_Jan_2014.jpg/800px-San_Diego_Skyline_at_Dusk_-_Jan_2014.jpg",
  "Dallas": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dallas_skyline_at_night_2013.jpg/800px-Dallas_skyline_at_night_2013.jpg",
  "San Jose": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/SanJoseSkyline2019.jpg/800px-SanJoseSkyline2019.jpg",
  "Austin": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Austin_Evening.jpg/800px-Austin_Evening.jpg",
  "Jacksonville": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Downtown_Jacksonville.jpg/800px-Downtown_Jacksonville.jpg",
  "Fort Worth": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Fortworth_skyline_2014.jpg/800px-Fortworth_skyline_2014.jpg",
  "Columbus": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Columbus_Ohio_downtown_skyline.jpg/800px-Columbus_Ohio_downtown_skyline.jpg",
  "Charlotte": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Charlotte_skyline_2012.jpg/800px-Charlotte_skyline_2012.jpg",
  "Indianapolis": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Indianapolis_Skyline_%28Night%29.jpg/800px-Indianapolis_Skyline_%28Night%29.jpg",
  "San Francisco": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/800px-GoldenGateBridge-001.jpg",
  "Seattle": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Space_Needle002.jpg/800px-Space_Needle002.jpg",
  "Denver": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Denver_skyline_at_dusk.jpg/800px-Denver_skyline_at_dusk.jpg",
  "Nashville": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Nashville_Skyline_at_Night.jpg/800px-Nashville_Skyline_at_Night.jpg",
  "Oklahoma City": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Oklahoma_City_Skyline.jpg/800px-Oklahoma_City_Skyline.jpg",
  "El Paso": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/ElPasoTexasSkyline.jpg/800px-ElPasoTexasSkyline.jpg",
  "Washington": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Washington_D.C._skyline_at_dusk_from_Arlington_%28edit%29.jpg/800px-Washington_D.C._skyline_at_dusk_from_Arlington_%28edit%29.jpg",
  "Boston": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Boston_-_panoramio_%2823%29.jpg/800px-Boston_-_panoramio_%2823%29.jpg",
  "Memphis": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/MemphisSkyline.jpg/800px-MemphisSkyline.jpg",
  "Louisville": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Louisville_Ky_skyline.jpg/800px-Louisville_Ky_skyline.jpg",
  "Portland": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Portland_and_Mt._Hood.jpg/800px-Portland_and_Mt._Hood.jpg",
  "Las Vegas": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Las_Vegas_at_night_1.jpg/800px-Las_Vegas_at_night_1.jpg",
  "Milwaukee": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/MilwaukeeSkylineWI.jpg/800px-MilwaukeeSkylineWI.jpg",
  "Albuquerque": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/AlbuquerqueSkylineHotAirBalloons.jpg/800px-AlbuquerqueSkylineHotAirBalloons.jpg",
  "Tucson": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Tucson_az_skyline.jpg/800px-Tucson_az_skyline.jpg",
  "Fresno": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Fresno_skyline_at_dusk.jpg/800px-Fresno_skyline_at_dusk.jpg",
  "Sacramento": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Sacramento_skyline_from_across_the_river.jpg/800px-Sacramento_skyline_from_across_the_river.jpg",
  "Kansas City": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Kansas_City%2C_Missouri_skyline.jpg/800px-Kansas_City%2C_Missouri_skyline.jpg",
  "Mesa": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Mesa_Arizona_USA.jpg/800px-Mesa_Arizona_USA.jpg",
  "Atlanta": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Atlanta_Skyline_from_Buckhead.jpg/800px-Atlanta_Skyline_from_Buckhead.jpg",
  "Omaha": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Omaha_nebraska_downtown_aerial_2011.jpg/800px-Omaha_nebraska_downtown_aerial_2011.jpg",
  "Colorado Springs": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Colorado_Springs_downtown.jpg/800px-Colorado_Springs_downtown.jpg",
  "Raleigh": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Raleigh_NC_skyline.jpg/800px-Raleigh_NC_skyline.jpg",
  "Long Beach": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Long_Beach_CA_night_aerial.jpg/800px-Long_Beach_CA_night_aerial.jpg",
  "Virginia Beach": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Virginia_Beach_Boardwalk.jpg/800px-Virginia_Beach_Boardwalk.jpg",
  "Minneapolis": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Minneapolis_skyline_from_11th_street_-_crop_and_lighten.jpg/800px-Minneapolis_skyline_from_11th_street_-_crop_and_lighten.jpg",
  "Tampa": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Tampa_skyline.jpg/800px-Tampa_skyline.jpg",
  "New Orleans": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/New_Orleans_CBD_skyline_Jan_2012.jpg/800px-New_Orleans_CBD_skyline_Jan_2012.jpg",
  "Arlington": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dallas_skyline_at_night_2013.jpg/800px-Dallas_skyline_at_night_2013.jpg",
  "Honolulu": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Honolulu_waterfront.jpg/800px-Honolulu_waterfront.jpg",
  "Aurora": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Denver_skyline_at_dusk.jpg/800px-Denver_skyline_at_dusk.jpg",
  "Corpus Christi": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Corpus_Christi_skyline.jpg/800px-Corpus_Christi_skyline.jpg",
  "Riverside": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Riverside_California_skyline.jpg/800px-Riverside_California_skyline.jpg",
  "Lexington": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Lexington_Kentucky_downtown.jpg/800px-Lexington_Kentucky_downtown.jpg",
  "St. Louis": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/St_Louis_night_expblend_cropped.jpg/800px-St_Louis_night_expblend_cropped.jpg",
  "Pittsburgh": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Pittsburgh_skyline_from_West_End_Overlook_2015.jpg/800px-Pittsburgh_skyline_from_West_End_Overlook_2015.jpg",
  "Cincinnati": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Cincinnati-ohio-skyline.jpg/800px-Cincinnati-ohio-skyline.jpg",
  "St. Paul": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Saint_Paul_Minnesota_Skyline.jpg/800px-Saint_Paul_Minnesota_Skyline.jpg",
  "Henderson": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Las_Vegas_at_night_1.jpg/800px-Las_Vegas_at_night_1.jpg",
  "Orlando": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Orlando_Florida_Skyline.jpg/800px-Orlando_Florida_Skyline.jpg",
  "Madison": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Madison_Wisconsin_skyline.jpg/800px-Madison_Wisconsin_skyline.jpg",
  "Durham": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Durham_North_Carolina_skyline.jpg/800px-Durham_North_Carolina_skyline.jpg",
  "Reno": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Reno_skyline.jpg/800px-Reno_skyline.jpg",
  "Baton Rouge": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/BatonRouge_Skyline.jpg/800px-BatonRouge_Skyline.jpg",
  "Irvine": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Los_Angeles_Skyscraper_Cluster.jpg/800px-Los_Angeles_Skyscraper_Cluster.jpg",
  "Scottsdale": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Phoenix_az_downtown_skyline_2008.jpg/800px-Phoenix_az_downtown_skyline_2008.jpg",
  "Fremont": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/SanJoseSkyline2019.jpg/800px-SanJoseSkyline2019.jpg",
  "Gilbert": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Phoenix_az_downtown_skyline_2008.jpg/800px-Phoenix_az_downtown_skyline_2008.jpg",
  "Birmingham": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Birmingham_Alabama_skyline.jpg/800px-Birmingham_Alabama_skyline.jpg",
  "Richmond": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Richmond_VA_skyline.jpg/800px-Richmond_VA_skyline.jpg",
  "Spokane": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Spokane_Washington_skyline.jpg/800px-Spokane_Washington_skyline.jpg",
  "Des Moines": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Des_Moines_Iowa_Skyline_by_night.jpg/800px-Des_Moines_Iowa_Skyline_by_night.jpg",
  "Huntsville": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Huntsville_Alabama_skyline.jpg/800px-Huntsville_Alabama_skyline.jpg",
  "Salt Lake City": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Salt_Lake_City_Utah_skyline_from_Ensign_Peak.jpg/800px-Salt_Lake_City_Utah_skyline_from_Ensign_Peak.jpg",
  "Tallahassee": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Tallahassee_florida_skyline.jpg/800px-Tallahassee_florida_skyline.jpg",
  "Chattanooga": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Chattanooga-skyline.jpg/800px-Chattanooga-skyline.jpg",
  "Fort Lauderdale": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Fort_Lauderdale_Downtown_Skyline.jpg/800px-Fort_Lauderdale_Downtown_Skyline.jpg",
  "Cape Coral": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Tampa_skyline.jpg/800px-Tampa_skyline.jpg",
  "Eugene": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Portland_and_Mt._Hood.jpg/800px-Portland_and_Mt._Hood.jpg",
  "Vancouver": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Portland_and_Mt._Hood.jpg/800px-Portland_and_Mt._Hood.jpg",
  "Sioux Falls": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Sioux_Falls_SD_skyline.jpg/800px-Sioux_Falls_SD_skyline.jpg",
  "McKinney": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dallas_skyline_at_night_2013.jpg/800px-Dallas_skyline_at_night_2013.jpg",
  "Frisco": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dallas_skyline_at_night_2013.jpg/800px-Dallas_skyline_at_night_2013.jpg",
  // State Capitals
  "Montgomery": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Montgomery_Alabama_skyline.jpg/800px-Montgomery_Alabama_skyline.jpg",
  "Juneau": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Juneau_Alaska_aerial.jpg/800px-Juneau_Alaska_aerial.jpg",
  "Little Rock": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Little_Rock_Arkansas_skyline.jpg/800px-Little_Rock_Arkansas_skyline.jpg",
  "Hartford": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Hartford_Connecticut_skyline.jpg/800px-Hartford_Connecticut_skyline.jpg",
  "Dover": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Delaware_State_Capitol.jpg/800px-Delaware_State_Capitol.jpg",
  "Boise": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Boise_Idaho_skyline.jpg/800px-Boise_Idaho_skyline.jpg",
  "Springfield": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Springfield_Illinois_skyline.jpg/800px-Springfield_Illinois_skyline.jpg",
  "Topeka": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Topeka_Kansas_skyline.jpg/800px-Topeka_Kansas_skyline.jpg",
  "Frankfort": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Frankfort_Kentucky_skyline.jpg/800px-Frankfort_Kentucky_skyline.jpg",
  "Augusta": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Augusta_Maine_skyline.jpg/800px-Augusta_Maine_skyline.jpg",
  "Annapolis": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Annapolis_-_Maryland_State_House.jpg/800px-Annapolis_-_Maryland_State_House.jpg",
  "Lansing": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Lansing_Michigan_skyline.jpg/800px-Lansing_Michigan_skyline.jpg",
  "Jackson": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Jackson_Mississippi_skyline.jpg/800px-Jackson_Mississippi_skyline.jpg",
  "Jefferson City": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Jefferson_City_Missouri.jpg/800px-Jefferson_City_Missouri.jpg",
  "Helena": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Helena_Montana_skyline.jpg/800px-Helena_Montana_skyline.jpg",
  "Lincoln": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Lincoln_Nebraska_skyline.jpg/800px-Lincoln_Nebraska_skyline.jpg",
  "Carson City": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Reno_skyline.jpg/800px-Reno_skyline.jpg",
  "Concord": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Concord_New_Hampshire.jpg/800px-Concord_New_Hampshire.jpg",
  "Trenton": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Trenton_New_Jersey_skyline.jpg/800px-Trenton_New_Jersey_skyline.jpg",
  "Santa Fe": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Santa_Fe_New_Mexico.jpg/800px-Santa_Fe_New_Mexico.jpg",
  "Albany": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Albany_New_York_skyline.jpg/800px-Albany_New_York_skyline.jpg",
  "Bismarck": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Bismarck_North_Dakota_skyline.jpg/800px-Bismarck_North_Dakota_skyline.jpg",
  "Salem": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Salem_Oregon_skyline.jpg/800px-Salem_Oregon_skyline.jpg",
  "Harrisburg": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Harrisburg_Pennsylvania_skyline.jpg/800px-Harrisburg_Pennsylvania_skyline.jpg",
  "Providence": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Providence_Rhode_Island_skyline.jpg/800px-Providence_Rhode_Island_skyline.jpg",
  "Columbia": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Columbia_South_Carolina_skyline.jpg/800px-Columbia_South_Carolina_skyline.jpg",
  "Pierre": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Pierre_South_Dakota.jpg/800px-Pierre_South_Dakota.jpg",
  "Montpelier": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Montpelier_Vermont.jpg/800px-Montpelier_Vermont.jpg",
  "Olympia": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Olympia_Washington_Capitol.jpg/800px-Olympia_Washington_Capitol.jpg",
  "Charleston": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Charleston_West_Virginia_skyline.jpg/800px-Charleston_West_Virginia_skyline.jpg",
  "Cheyenne": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Cheyenne_Wyoming_skyline.jpg/800px-Cheyenne_Wyoming_skyline.jpg",
  // World Cities
  "Tokyo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/800px-Skyscrapers_of_Shinjuku_2009_January.jpg",
  "Delhi": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/India_Gate_-_Panorama.jpg/800px-India_Gate_-_Panorama.jpg",
  "Shanghai": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Shanghai_Skyline_2015.jpg/800px-Shanghai_Skyline_2015.jpg",
  "Sao Paulo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Sao_Paulo_Skyline.jpg/800px-Sao_Paulo_Skyline.jpg",
  "Mexico City": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Mexico_City_Reforma.jpg/800px-Mexico_City_Reforma.jpg",
  "Cairo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Cairo_skyline.jpg/800px-Cairo_skyline.jpg",
  "Mumbai": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Mumbai_Skyline_at_Night.jpg/800px-Mumbai_Skyline_at_Night.jpg",
  "Beijing": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Forbidden_City_Beijing_2014.jpg/800px-Forbidden_City_Beijing_2014.jpg",
  "Osaka": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Osaka_Skyline_from_Tempozan_Giant_Ferris_Wheel_2013.jpg/800px-Osaka_Skyline_from_Tempozan_Giant_Ferris_Wheel_2013.jpg",
  "Karachi": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Karachi_skyline.jpg/800px-Karachi_skyline.jpg",
  "Istanbul": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Bosphorus_bridge_and_Bosphorus.jpg/800px-Bosphorus_bridge_and_Bosphorus.jpg",
  "Lagos": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Lagos_skyline.jpg/800px-Lagos_skyline.jpg",
  "Buenos Aires": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Buenos_Aires_-_Microcentro.jpg/800px-Buenos_Aires_-_Microcentro.jpg",
  "Kolkata": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Howrah_Bridge_at_night.jpg/800px-Howrah_Bridge_at_night.jpg",
  "Manila": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Manila_skyline_at_night.jpg/800px-Manila_skyline_at_night.jpg",
  "Rio de Janeiro": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Rio_de_Janeiro_-_Botafogo_e_Corcovado.jpg/800px-Rio_de_Janeiro_-_Botafogo_e_Corcovado.jpg",
  "Guangzhou": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Guangzhou_skyline.jpg/800px-Guangzhou_skyline.jpg",
  "Shenzhen": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Shenzhen_night_2007_Futian_District.jpg/800px-Shenzhen_night_2007_Futian_District.jpg",
  "Lahore": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Lahore_skyline.jpg/800px-Lahore_skyline.jpg",
  "Moscow": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Moscow_Red_Square.jpg/800px-Moscow_Red_Square.jpg",
  "Paris": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_eiffel_tower.jpg/800px-New_eiffel_tower.jpg",
  "London": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_%28125508655%29.jpeg/800px-London_Skyline_%28125508655%29.jpeg",
  "Bangkok": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Bangkok_Skyscrapers.jpg/800px-Bangkok_Skyscrapers.jpg",
  "Lima": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Lima_Miraflores.jpg/800px-Lima_Miraflores.jpg",
  "Bangalore": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Bangalore_Skyline.jpg/800px-Bangalore_Skyline.jpg",
  "Bogota": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Bogota_-_Candelaria.jpg/800px-Bogota_-_Candelaria.jpg",
  "Jakarta": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Jakarta_Skyline.jpg/800px-Jakarta_Skyline.jpg",
  "Tehran": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Tehran_from_Milad_Tower.jpg/800px-Tehran_from_Milad_Tower.jpg",
  "Johannesburg": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Joburg.jpg/800px-Joburg.jpg",
  "Baghdad": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Baghdad_Skyline.jpg/800px-Baghdad_Skyline.jpg",
  "Santiago": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Santiago_del_nuevo_extremo.jpg/800px-Santiago_del_nuevo_extremo.jpg",
  "Riyadh": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Riyadh_skyline.jpg/800px-Riyadh_skyline.jpg",
  "Singapore": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Singapore_skyline_at_night.jpg/800px-Singapore_skyline_at_night.jpg",
  "Dar es Salaam": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Dar_es_Salaam_skyline.jpg/800px-Dar_es_Salaam_skyline.jpg",
  "Hanoi": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Hanoi_Skyline.jpg/800px-Hanoi_Skyline.jpg",
  "Barcelona": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Barcelona_Sagrada_Familia.jpg/800px-Barcelona_Sagrada_Familia.jpg",
  "Cape Town": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Cape_Town_-_South_Africa.jpg/800px-Cape_Town_-_South_Africa.jpg",
  "Nairobi": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/NairobiSkyline.jpg/800px-NairobiSkyline.jpg",
  "Accra": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Accra_skyline.jpg/800px-Accra_skyline.jpg",
  "Madrid": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Gran_Via_de_Madrid.jpg/800px-Gran_Via_de_Madrid.jpg",
  "Berlin": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Berlin_-_Brandenburger_Tor.jpg/800px-Berlin_-_Brandenburger_Tor.jpg",
  "Rome": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Colosseo_2020.jpg/800px-Colosseo_2020.jpg",
  "Sydney": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019_photographed_by_Adam_J.W.C..jpg/800px-Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019_photographed_by_Adam_J.W.C..jpg",
  "Melbourne": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Melbourne_CBD_from_Rialto.jpg/800px-Melbourne_CBD_from_Rialto.jpg",
  "Toronto": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Toronto_-_ON_-_Toronto_Skyline2.jpg/800px-Toronto_-_ON_-_Toronto_Skyline2.jpg",
  "Seoul": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Seoul_Namsan_Tower.jpg/800px-Seoul_Namsan_Tower.jpg",
  "Dubai": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Dubai_Skyline_%282%29.jpg/800px-Dubai_Skyline_%282%29.jpg",
  "Amman": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Amman_skyline.jpg/800px-Amman_skyline.jpg",
  "Havana": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Havana_panorama.jpg/800px-Havana_panorama.jpg",
  "Oslo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Oslo_skyline.jpg/800px-Oslo_skyline.jpg",
  "Stockholm": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Stockholm_-_Gamla_Stan.jpg/800px-Stockholm_-_Gamla_Stan.jpg",
  "Amsterdam": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Amsterdam_-_Rijksmuseum.jpg/800px-Amsterdam_-_Rijksmuseum.jpg",
  "Vienna": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Stephansdom_Wien_2016.jpg/800px-Stephansdom_Wien_2016.jpg",
  "Warsaw": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Warsaw_Skyline_2019.jpg/800px-Warsaw_Skyline_2019.jpg",
  "Budapest": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Budapest_-_Chain_Bridge_at_night.jpg/800px-Budapest_-_Chain_Bridge_at_night.jpg",
  "Prague": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Prague_-_Hradcany_castle_at_dusk.jpg/800px-Prague_-_Hradcany_castle_at_dusk.jpg",
  "Lisbon": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Lisboa-Alfama-panorama.jpg/800px-Lisboa-Alfama-panorama.jpg",
  "Auckland": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Auckland_Sky_Tower_Panorama.jpg/800px-Auckland_Sky_Tower_Panorama.jpg",
  "Dublin": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Dublin_-_River_Liffey_panorama.jpg/800px-Dublin_-_River_Liffey_panorama.jpg",
  "Reykjavik": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Reykjavik_in_the_evening.jpg/800px-Reykjavik_in_the_evening.jpg",
  "Almaty": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Almaty_Kazakhstan_skyline.jpg/800px-Almaty_Kazakhstan_skyline.jpg",
  "Kuala Lumpur": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kuala_Lumpur_Skyline_2018.jpg/800px-Kuala_Lumpur_Skyline_2018.jpg",
  // Small Towns — using regional/scenic photos
  "Surgoinsville": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Clinch_Mountain_Tennessee.jpg/800px-Clinch_Mountain_Tennessee.jpg",
  "Moab": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Arches_National_Park_-_Moab_Utah.jpg/800px-Arches_National_Park_-_Moab_Utah.jpg",
  "Deadwood": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Deadwood_South_Dakota.jpg/800px-Deadwood_South_Dakota.jpg",
  "Tombstone": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Tombstone_Arizona.jpg/800px-Tombstone_Arizona.jpg",
  "Dodge City": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Dodge_City_Kansas.jpg/800px-Dodge_City_Kansas.jpg",
  "Gettysburg": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Gettysburg_battlefield.jpg/800px-Gettysburg_battlefield.jpg",
  "Marfa": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Marfa_Texas.jpg/800px-Marfa_Texas.jpg",
  "Kodiak": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Kodiak_Alaska.jpg/800px-Kodiak_Alaska.jpg",
  "Sitka": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Sitka_Alaska.jpg/800px-Sitka_Alaska.jpg",
  "Nome": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Nome_Alaska.jpg/800px-Nome_Alaska.jpg",
  "Ketchikan": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Ketchikan_Alaska.jpg/800px-Ketchikan_Alaska.jpg",
  "Santa Fe": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Santa_Fe_New_Mexico.jpg/800px-Santa_Fe_New_Mexico.jpg",
  "Gallup": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/AlbuquerqueSkylineHotAirBalloons.jpg/800px-AlbuquerqueSkylineHotAirBalloons.jpg",
  "Laramie": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Cheyenne_Wyoming_skyline.jpg/800px-Cheyenne_Wyoming_skyline.jpg",
  "Cody": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Cheyenne_Wyoming_skyline.jpg/800px-Cheyenne_Wyoming_skyline.jpg",
  "Elko": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Reno_skyline.jpg/800px-Reno_skyline.jpg",
  "Las Vegas": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Las_Vegas_at_night_1.jpg/800px-Las_Vegas_at_night_1.jpg",
};

// Fallback by region if no exact match
function getPhoto(cityName, state) {
  if (PHOTO_MAP[cityName]) return PHOTO_MAP[cityName];
  // Regional fallbacks
  const southernStates = ["TN","KY","VA","WV","NC","GA","AL","MS","AR","SC"];
  const westernStates = ["MT","WY","ID","ND","SD","NE","KS","CO","UT","AZ","NM","NV"];
  const pacificStates = ["CA","OR","WA","AK","HI"];
  if (southernStates.includes(state)) return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Clinch_Mountain_Tennessee.jpg/800px-Clinch_Mountain_Tennessee.jpg";
  if (westernStates.includes(state)) return "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Arches_National_Park_-_Moab_Utah.jpg/800px-Arches_National_Park_-_Moab_Utah.jpg";
  if (pacificStates.includes(state)) return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/800px-GoldenGateBridge-001.jpg";
  return "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Columbus_Ohio_downtown_skyline.jpg/800px-Columbus_Ohio_downtown_skyline.jpg";
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
  // Tennessee
  { name: "Surgoinsville", state: "TN", pop: 1921, special: true },
  { name: "Cookeville", state: "TN", pop: 35699 },
  { name: "Greeneville", state: "TN", pop: 15459 },
  { name: "Elizabethton", state: "TN", pop: 13372 },
  { name: "Rogersville", state: "TN", pop: 4420 },
  { name: "Erwin", state: "TN", pop: 6097 },
  { name: "Sweetwater", state: "TN", pop: 5765 },
  { name: "Dayton", state: "TN", pop: 7191 },
  { name: "Waverly", state: "TN", pop: 4275 },
  { name: "Lexington", state: "TN", pop: 7652 },
  // Funny/quirky names
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
  { name: "Zigzag", state: "OR", pop: 599 },
  { name: "Climax", state: "MI", pop: 6249 },
  { name: "Uncertain", state: "TX", pop: 94 },
  { name: "Embarrass", state: "MN", pop: 671 },
  { name: "Intercourse", state: "PA", pop: 1275 },
  { name: "Hooker", state: "OK", pop: 1769 },
  { name: "Dinosaur", state: "CO", pop: 319 },
  { name: "Nimrod", state: "MN", pop: 54 },
  { name: "Santa Claus", state: "IN", pop: 2481 },
  { name: "Bat Cave", state: "NC", pop: 289 },
  { name: "Lick Fork", state: "VA", pop: 342 },
  { name: "Nothing", state: "AZ", pop: 4 },
  { name: "Whynot", state: "NC", pop: 921 },
  { name: "Okay", state: "OK", pop: 627 },
  { name: "Ding Dong", state: "TX", pop: 22 },
  { name: "Frostproof", state: "FL", pop: 3165 },
  { name: "Oatmeal", state: "TX", pop: 255 },
  { name: "Cheesequake", state: "NJ", pop: 6500 },
  { name: "Accident", state: "MD", pop: 325 },
  { name: "Defeated", state: "TN", pop: 123 },
  // Historic/Western
  { name: "Deadwood", state: "SD", pop: 1270 },
  { name: "Tombstone", state: "AZ", pop: 1579 },
  { name: "Dodge City", state: "KS", pop: 27340 },
  { name: "Gettysburg", state: "PA", pop: 7620 },
  { name: "Cody", state: "WY", pop: 9985 },
  { name: "Laramie", state: "WY", pop: 32158 },
  { name: "Lander", state: "WY", pop: 7487 },
  { name: "Thermopolis", state: "WY", pop: 2643 },
  { name: "Marfa", state: "TX", pop: 1728 },
  { name: "Alpine", state: "TX", pop: 5905 },
  { name: "Fort Stockton", state: "TX", pop: 8283 },
  { name: "Presidio", state: "TX", pop: 3978 },
  { name: "Del Rio", state: "TX", pop: 35665 },
  { name: "Moab", state: "UT", pop: 5268 },
  { name: "Kanab", state: "UT", pop: 4803 },
  { name: "Page", state: "AZ", pop: 7247 },
  { name: "Winslow", state: "AZ", pop: 9009 },
  { name: "Show Low", state: "AZ", pop: 11361 },
  { name: "Silver City", state: "NM", pop: 9990 },
  { name: "Ruidoso", state: "NM", pop: 7971 },
  { name: "Gallup", state: "NM", pop: 21678 },
  // Alaska/Island/Remote
  { name: "Kodiak", state: "AK", pop: 5937 },
  { name: "Sitka", state: "AK", pop: 8493 },
  { name: "Nome", state: "AK", pop: 3699 },
  { name: "Barrow", state: "AK", pop: 4581 },
  { name: "Ketchikan", state: "AK", pop: 8050 },
  { name: "Unalaska", state: "AK", pop: 4376 },
  { name: "Calais", state: "ME", pop: 3052 },
  { name: "Eastport", state: "ME", pop: 1331 },
  { name: "Marathon", state: "FL", pop: 8305 },
  { name: "Islamorada", state: "FL", pop: 6370 },
  // Plains/Midwest small
  { name: "Limon", state: "CO", pop: 1880 },
  { name: "Havre", state: "MT", pop: 9510 },
  { name: "Miles City", state: "MT", pop: 8313 },
  { name: "Plentywood", state: "MT", pop: 1484 },
  { name: "Wolf Point", state: "MT", pop: 2661 },
  { name: "Devils Lake", state: "ND", pop: 7270 },
  { name: "Williston", state: "ND", pop: 29578 },
  { name: "Dickinson", state: "ND", pop: 23091 },
  { name: "Huron", state: "SD", pop: 14263 },
  { name: "Mitchell", state: "SD", pop: 15254 },
  { name: "Winner", state: "SD", pop: 2897 },
  { name: "Alliance", state: "NE", pop: 8148 },
  { name: "Scottsbluff", state: "NE", pop: 14732 },
  { name: "McCook", state: "NE", pop: 7491 },
  { name: "Garden City", state: "KS", pop: 26658 },
  { name: "Liberal", state: "KS", pop: 19825 },
  { name: "Colby", state: "KS", pop: 5387 },
  { name: "Goodland", state: "KS", pop: 4489 },
  // Nevada/West
  { name: "Elko", state: "NV", pop: 20332 },
  { name: "Winnemucca", state: "NV", pop: 7731 },
  { name: "Ely", state: "NV", pop: 3941 },
  { name: "Fallon", state: "NV", pop: 8606 },
  { name: "Yerington", state: "NV", pop: 3081 },
  { name: "Tonopah", state: "NV", pop: 2478 },
  { name: "Bishop", state: "CA", pop: 3879 },
  { name: "Mammoth Lakes", state: "CA", pop: 8272 },
  { name: "Weed", state: "CA", pop: 2967 },
  { name: "Alturas", state: "CA", pop: 2827 },
  { name: "Fort Bragg", state: "CA", pop: 7464 },
  // Oregon/Washington
  { name: "Astoria", state: "OR", pop: 9611 },
  { name: "Klamath Falls", state: "OR", pop: 21813 },
  { name: "Burns", state: "OR", pop: 2711 },
  { name: "Lakeview", state: "OR", pop: 2394 },
  { name: "Halfway", state: "OR", pop: 288 },
  { name: "Boring", state: "OR", pop: 8067 },
  { name: "Winthrop", state: "WA", pop: 442 },
  { name: "Colville", state: "WA", pop: 4673 },
  { name: "Republic", state: "WA", pop: 1073 },
  // Appalachian/Southeast small
  { name: "Grundy", state: "VA", pop: 1057 },
  { name: "Pocahontas", state: "VA", pop: 328 },
  { name: "Richlands", state: "VA", pop: 5500 },
  { name: "Harlan", state: "KY", pop: 1671 },
  { name: "Hazard", state: "KY", pop: 4456 },
  { name: "Pikeville", state: "KY", pop: 6903 },
  { name: "Paintsville", state: "KY", pop: 3894 },
  { name: "Prestonsburg", state: "KY", pop: 3187 },
  { name: "Williamson", state: "WV", pop: 2884 },
  { name: "Mullens", state: "WV", pop: 1492 },
  { name: "Welch", state: "WV", pop: 1994 },
  { name: "Bryson City", state: "NC", pop: 1622 },
  { name: "Sylva", state: "NC", pop: 2588 },
  { name: "Murphy", state: "NC", pop: 1739 },
  { name: "Clayton", state: "GA", pop: 2277 },
  { name: "Blue Ridge", state: "GA", pop: 1298 },
  { name: "Helen", state: "GA", pop: 571 },
  { name: "Dahlonega", state: "GA", pop: 6751 },
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
function weightedPick(pool) {
  // Surgoinsville gets ~2% extra weight as a special Easter egg
  const weights = pool.map(c => c.special ? 3 : 1);
  const total = weights.reduce((a, b) => a + b, 0);
  let rand = Math.random() * total;
  for (let i = 0; i < pool.length; i++) {
    rand -= weights[i];
    if (rand <= 0) return pool[i];
  }
  return pool[pool.length - 1];
}

function pickTwo(pool, lastPair) {
  let attempts = 0, a, b;
  do {
    a = weightedPick(pool);
    b = weightedPick(pool);
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
                  <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${getPhoto(city.name, city.state || city.country)})`, backgroundSize: "cover", backgroundPosition: "center", filter: isWrong ? "brightness(0.35) saturate(0.2)" : "brightness(0.5)", transition: "filter 0.3s" }} />
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
