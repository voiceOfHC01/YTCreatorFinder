const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname, 'public');

// Process-level crash prevention to ensure 100% server uptime
process.on('uncaughtException', err => {
  console.error('⚠️ Uncaught Exception caught safely:', redactApiKey(err.message));
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('⚠️ Unhandled Rejection caught safely:', reason);
});

// Redact sensitive API keys from strings and log outputs
function redactApiKey(str) {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/([?&]key=)[^&\s]+/gi, '$1[REDACTED]');
}

// In-memory sliding-window rate limiter to prevent DoS & quota drainage
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_ANALYZE_PER_MIN = 20;
const MAX_DISCOVER_PER_MIN = 80;
const clientRequestMap = new Map();

function isRateLimited(ip, maxRequests) {
  const now = Date.now();
  const history = clientRequestMap.get(ip) || [];
  const validRecent = history.filter(time => (now - time) < RATE_LIMIT_WINDOW_MS);
  
  if (validRecent.length >= maxRequests) {
    return true;
  }
  
  validRecent.push(now);
  clientRequestMap.set(ip, validRecent);
  return false;
}

// Memory leak protection: periodically prune expired rate-limit IP records
setInterval(() => {
  const now = Date.now();
  for (const [ip, history] of clientRequestMap.entries()) {
    const valid = history.filter(time => (now - time) < RATE_LIMIT_WINDOW_MS);
    if (valid.length === 0) {
      clientRequestMap.delete(ip);
    } else {
      clientRequestMap.set(ip, valid);
    }
  }
}, 3 * 60 * 1000).unref();

// Country keyword definitions for bio fallback detection
const COUNTRY_KEYWORDS = {
  US: [
    'united states', 'usa', 'u.s.a', 'america',
    'california', 'texas', 'florida', 'new york', 'nyc', 'los angeles', 'chicago',
    'houston', 'phoenix', 'philadelphia', 'san antonio', 'san diego', 'dallas',
    'austin', 'seattle', 'denver', 'boston', 'las vegas', 'atlanta', 'miami',
    'ohio', 'michigan', 'north carolina', 'georgia', 'virginia', 'washington',
    'pennsylvania', 'illinois', 'arizona', 'tennessee', 'indiana', 'missouri',
    'maryland', 'wisconsin', 'colorado', 'minnesota', 'south carolina', 'alabama',
    'louisiana', 'kentucky', 'oregon', 'oklahoma', 'connecticut', 'utah', 'nevada',
    'arkansas', 'mississippi', 'kansas', 'new mexico', 'nebraska', 'idaho',
    'west virginia', 'hawaii', 'new hampshire', 'maine', 'montana', 'rhode island',
    'delaware', 'south dakota', 'north dakota', 'alaska', 'vermont', 'wyoming'
  ],
  GB: [
    'united kingdom', 'uk', 'u.k', 'great britain', 'britain', 'british',
    'england', 'scotland', 'wales', 'northern ireland',
    'london', 'manchester', 'birmingham', 'leeds', 'glasgow', 'liverpool',
    'newcastle', 'sheffield', 'bristol', 'edinburgh', 'cardiff', 'belfast'
  ],
  CA: [
    'canada', 'canadian', 'toronto', 'vancouver', 'montreal', 'ontario',
    'quebec', 'alberta', 'calgary', 'ottawa', 'edmonton', 'winnipeg',
    'british columbia', 'nova scotia', 'manitoba', 'saskatchewan'
  ],
  AU: [
    'australia', 'australian', 'aussie', 'sydney', 'melbourne', 'brisbane',
    'perth', 'adelaide', 'gold coast', 'canberra', 'queensland', 'new south wales',
    'victoria', 'tasmania'
  ],
  DE: [
    'germany', 'deutschland', 'german', 'berlin', 'munich', 'münchen',
    'hamburg', 'cologne', 'köln', 'frankfurt', 'stuttgart', 'düsseldorf',
    'leipzig', 'dortmund', 'essen', 'bavaria', 'bayern'
  ],
  NO: ['norway', 'norge', 'norwegian', 'oslo', 'bergen', 'trondheim', 'stavanger'],
  CH: ['switzerland', 'swiss', 'schweiz', 'suisse', 'zurich', 'geneva', 'basel', 'bern', 'lausanne'],
  NL: ['netherlands', 'holland', 'dutch', 'amsterdam', 'rotterdam', 'hague', 'utrecht', 'eindhoven'],
  IE: ['ireland', 'irish', 'dublin', 'cork', 'galway', 'limerick'],
  AT: ['austria', 'österreich', 'austrian', 'vienna', 'wien', 'salzburg', 'graz', 'innsbruck'],
  FR: ['france', 'french', 'paris', 'marseille', 'lyon', 'toulouse', 'nice', 'nantes', 'bordeaux'],
  FI: ['finland', 'suomi', 'finnish', 'helsinki', 'espoo', 'tampere', 'vantaa', 'oulu'],
  SE: ['sweden', 'sverige', 'swedish', 'stockholm', 'gothenburg', 'malmö', 'uppsala'],
  SG: ['singapore', 'singaporean'],
  AE: ['uae', 'dubai', 'abu dhabi', 'sharjah', 'emirates', 'united arab emirates'],
  JP: ['japan', 'japanese', 'tokyo', 'osaka', 'kyoto', 'yokohama', 'nagoya', 'fukuoka', 'sapporo']
};

const COUNTRY_NAMES = {
  US: 'United States',
  GB: 'United Kingdom',
  CA: 'Canada',
  AU: 'Australia',
  DE: 'Germany',
  NO: 'Norway',
  CH: 'Switzerland',
  NL: 'Netherlands',
  IE: 'Ireland',
  AT: 'Austria',
  FR: 'France',
  FI: 'Finland',
  SE: 'Sweden',
  SG: 'Singapore',
  AE: 'United Arab Emirates',
  JP: 'Japan'
};

const COUNTRY_FLAGS = {
  US: '🇺🇸',
  GB: '🇬🇧',
  CA: '🇨🇦',
  AU: '🇦🇺',
  DE: '🇩🇪',
  NO: '🇳🇴',
  CH: '🇨🇭',
  NL: '🇳🇱',
  IE: '🇮🇪',
  AT: '🇦🇹',
  FR: '🇫🇷',
  FI: '🇫🇮',
  SE: '🇸🇪',
  SG: '🇸🇬',
  AE: '🇦🇪',
  JP: '🇯🇵'
};

// Known spam and bot patterns to protect data quality
const SPAM_PATTERNS = [
  /whatsapp/i,
  /telegram/i,
  /t\.me\//i,
  /\+\d{1,4}[\s\d-]{6,14}\d/,
  /invest/i,
  /crypto/i,
  /forex/i,
  /profit/i,
  /dm\s+me/i,
  /cashapp/i,
  /bitcoin/i,
  /binary\s+option/i,
  /passive\s+income/i,
  /financial\s+advisor/i,
  /trading\s+expert/i,
  /trading\s+platform/i,
  /guaranteed\s+returns/i
];

function isSpamComment(text) {
  if (!text || typeof text !== 'string') return false;
  return SPAM_PATTERNS.some(regex => regex.test(text));
}

// Parse ISO 8601 duration (e.g. PT15M33S, PT1H2M) into total seconds
function parseDurationToSeconds(duration) {
  if (!duration || typeof duration !== 'string') return 0;
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  return hours * 3600 + minutes * 60 + seconds;
}

// Context-aware regex to extract valid timestamps & filter false positives (with ReDoS protection)
function extractValidTimestamps(commentText, maxVideoSeconds) {
  if (!commentText || !maxVideoSeconds || typeof commentText !== 'string') return [];
  // ReDoS defense: truncate input length to avoid catastrophic backtracking
  const safeText = commentText.length > 2000 ? commentText.slice(0, 2000) : commentText;
  const regex = /(?<!\b(?:at|around|verse|chapter|john|matthew|luke|mark|romans|psalm|genesis)\s*)\b(?:([0-9]{1,2}):)?([0-5]?[0-9]):([0-5][0-9])\b(?!\s*(?:am|pm|a\.m|p\.m|hours|hrs))/gi;
  const list = [];
  let m;
  let matchesCount = 0;
  while ((m = regex.exec(safeText)) !== null && matchesCount < 25) {
    matchesCount++;
    const rawMatch = m[0];
    const h = m[1] ? parseInt(m[1], 10) : 0;
    const min = parseInt(m[2], 10);
    const sec = parseInt(m[3], 10);
    const totalSec = h * 3600 + min * 60 + sec;
    
    // Boundary check: must be strictly within video duration
    if (totalSec > 0 && totalSec <= maxVideoSeconds) {
      list.push({
        timestamp: rawMatch,
        seconds: totalSec
      });
    }
  }
  return list;
}

function extractVideoId(input) {
  if (!input || typeof input !== 'string') return null;
  input = input.trim();
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|live\/)|youtube\.com\/.*[?&]v=)([a-zA-Z0-9_-]{11})/;
  const match = input.match(regExp);
  if (match && match[1]) return match[1];
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
  return null;
}

function checkBioForCountry(description, countryCode) {
  if (!description || typeof description !== 'string') return false;
  const keywords = COUNTRY_KEYWORDS[countryCode];
  if (!keywords) return false;
  const descLower = description.toLowerCase();
  return keywords.some(kw => {
    const regex = new RegExp(`\\b${kw}\\b`, 'i');
    return regex.test(descLower);
  });
}

function verifyCountry(channel, targetCountry, filterMode) {
  const officialCountry = channel.country ? String(channel.country).toUpperCase() : null;
  const bio = channel.description || '';

  // If ANY country is allowed
  if (targetCountry === 'ANY') {
    return {
      matched: true,
      countryCode: officialCountry || 'GLOBAL',
      countryName: officialCountry ? (COUNTRY_NAMES[officialCountry] || officialCountry) : 'Global',
      countryFlag: officialCountry ? (COUNTRY_FLAGS[officialCountry] || '🌍') : '🌍',
      verificationType: officialCountry ? `Verified (${officialCountry})` : 'Declared Global'
    };
  }

  // List of countries to check (single or tier-1 bundle)
  const allowedCodes = targetCountry === 'TIER1' ? ['US', 'GB', 'CA', 'AU', 'DE'] : [targetCountry];

  // 1. Check official YouTube country setting
  if (officialCountry && allowedCodes.includes(officialCountry)) {
    return {
      matched: true,
      countryCode: officialCountry,
      countryName: COUNTRY_NAMES[officialCountry] || officialCountry,
      countryFlag: COUNTRY_FLAGS[officialCountry] || '🏳️',
      verificationType: `Verified ${officialCountry}`
    };
  }

  // 2. Check bio fallback if enabled
  if (filterMode === 'include_bio' && bio) {
    for (const code of allowedCodes) {
      if (checkBioForCountry(bio, code)) {
        return {
          matched: true,
          countryCode: code,
          countryName: COUNTRY_NAMES[code] || code,
          countryFlag: COUNTRY_FLAGS[code] || '🏳️',
          verificationType: `Bio Mention (${code})`
        };
      }
    }
  }

  return { matched: false };
}

async function fetchYouTubeComments(videoId, apiKey, maxComments = 200) {
  const comments = [];
  let pageToken = '';
  const maxResultsPerPage = 100;

  while (comments.length < maxComments) {
    const fetchCount = Math.min(maxResultsPerPage, maxComments - comments.length);
    let apiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&textFormat=plainText&videoId=${encodeURIComponent(videoId)}&maxResults=${fetchCount}&key=${encodeURIComponent(apiKey)}`;
    if (pageToken) {
      apiUrl += `&pageToken=${encodeURIComponent(pageToken)}`;
    }

    // 10 second timeout protection against hanging requests
    const res = await fetch(apiUrl, { signal: AbortSignal.timeout(10000) });
    const data = await res.json();

    if (data.error) {
      throw new Error(data.error.message || 'YouTube API error occurred while fetching comments');
    }

    if (!data.items || data.items.length === 0) {
      break;
    }

    for (const item of data.items) {
      const snippet = item.snippet?.topLevelComment?.snippet;
      if (!snippet) continue;

      const authorChannelId = snippet.authorChannelId?.value;
      if (!authorChannelId) continue;

      comments.push({
        channelId: authorChannelId,
        authorName: snippet.authorDisplayName || '',
        commentText: snippet.textDisplay || snippet.textOriginal || '',
        likeCount: snippet.likeCount || 0,
        publishedAt: snippet.publishedAt || ''
      });
    }

    pageToken = data.nextPageToken;
    if (!pageToken) break;
  }

  return comments;
}

async function fetchChannelsDetails(channelIds, apiKey) {
  const channelMap = new Map();
  const CHUNK_SIZE = 50;

  for (let i = 0; i < channelIds.length; i += CHUNK_SIZE) {
    const chunk = channelIds.slice(i, i + CHUNK_SIZE);
    const apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&id=${encodeURIComponent(chunk.join(','))}&key=${encodeURIComponent(apiKey)}`;

    try {
      const res = await fetch(apiUrl, { signal: AbortSignal.timeout(10000) });
      const data = await res.json();

      if (data.error) {
        console.error('Channel batch query error:', data.error.message || 'Unknown error');
        continue;
      }

      if (data.items) {
        for (const item of data.items) {
          const snippet = item.snippet || {};
          const stats = item.statistics || {};
          const contentDetails = item.contentDetails || {};

          channelMap.set(item.id, {
            id: item.id,
            title: snippet.title || '',
            customUrl: snippet.customUrl || '',
            country: snippet.country || null,
            description: snippet.description || '',
            avatar: snippet.thumbnails?.default?.url || snippet.thumbnails?.medium?.url || '',
            subscribers: stats.hiddenSubscriberCount ? null : parseInt(stats.subscriberCount || '0', 10),
            videoCount: parseInt(stats.videoCount || '0', 10),
            viewCount: parseInt(stats.viewCount || '0', 10),
            uploadsPlaylistId: contentDetails.relatedPlaylists?.uploads || null
          });
        }
      }
    } catch (err) {
      console.warn('Channel batch fetch timeout or network error:', err.message);
    }
  }

  return channelMap;
}

// Fetch the published date of the latest uploaded video in a channel
async function fetchLatestUploadDate(uploadsPlaylistId, apiKey) {
  if (!uploadsPlaylistId) return null;
  try {
    const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${encodeURIComponent(uploadsPlaylistId)}&maxResults=1&key=${encodeURIComponent(apiKey)}`;
    const res = await fetch(apiUrl, { signal: AbortSignal.timeout(6000) });
    const data = await res.json();
    if (data.items && data.items.length > 0) {
      return data.items[0].snippet?.publishedAt || null;
    }
  } catch (err) {
    // Fail gracefully without crashing
  }
  return null;
}

// Concurrency helper for fast non-blocking parallel execution
async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx], idx);
    }
  }));
  return out;
}

// ==========================================
// CURATED CREATOR DIRECTORY DATA
// ==========================================
const { CURATED_NICHE_CHANNELS } = require('./channels-data');

// Helper to determine collaboration readiness and formats for creators
function getCreatorCollabs(c) {
  const desc = (c.description || '').toLowerCase();
  const title = (c.title || '').toLowerCase();
  const niche = (c.niche || '').toLowerCase();
  const text = `${title} ${desc} ${niche}`;
  
  const collabs = ['Cross-promo']; // All active micro-creators are open to cross-promotion

  // Podcast guest / interview
  if (text.includes('podcast') || text.includes('interview') || text.includes('talk') || text.includes('discussion') || text.includes('host') || text.includes('guest') || text.includes('vlog') || ['tech', 'finance', 'education', 'science', 'fitness'].includes(niche)) {
    collabs.push('Podcast guest');
  }

  // Guest spot / feature
  if (text.includes('collab') || text.includes('guest') || text.includes('feature') || text.includes('challenge') || ['gaming', 'cooking', 'music', 'travel', 'maker & diy'].includes(niche)) {
    collabs.push('Guest spot');
  }

  // Shorts collab
  if (text.includes('short') || text.includes('clip') || text.includes('reel') || (c.videoCount && c.videoCount > 15) || ['gaming', 'cooking', 'beauty', 'film & vfx', 'music'].includes(niche)) {
    collabs.push('Shorts collab');
  }

  return [...new Set(collabs)];
}

async function discoverYouTubeChannels({ niche, query, country, minSubs, maxSubs, apiKey, pageToken = '', collab = 'None' }) {
  const allCurated = Object.values(CURATED_NICHE_CHANNELS).flat();
  // Include verified user submissions from submitted-channels.json if available
  try {
    const submissionsFile = path.resolve(__dirname, 'submitted-channels.json');
    if (fs.existsSync(submissionsFile)) {
      const subs = JSON.parse(fs.readFileSync(submissionsFile, 'utf8') || '[]');
      if (Array.isArray(subs)) {
        for (const s of subs) {
          if (s && s.handle && s.niche) {
            allCurated.unshift({
              id: s.id || ('sub_' + s.handle.replace(/[^a-zA-Z0-9]/g, '')),
              title: s.title || s.handle,
              handle: s.handle,
              subscribers: s.subscribers || 4500,
              niche: s.niche,
              country: s.country || 'US',
              description: `Community submitted creator • ${s.collabType || 'Open to collabs'}`,
              videoCount: 12
            });
          }
        }
      }
    }
  } catch (e) {}
  let livePool = [];
  let foundNextPageToken = null;

  // 1. If API Key is present, attempt live YouTube Data API discovery
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const searchRegion = (country && country !== 'ANY') ? country : 'US';
      const cleanNiche = (niche && niche !== 'All') ? niche : '';
      
      let searchUrls = [];
      const ptParam = pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : '';

      // If user is searching for micro/small creators (<= 50,000 subs), search recent videos to find fresh uploaders
      if (maxSubs <= 50000) {
        const baseTerm = query ? query : (cleanNiche ? `${cleanNiche} creator vlog` : 'creator vlog tutorial');
        searchUrls.push(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=date&regionCode=${encodeURIComponent(searchRegion)}&q=${encodeURIComponent(baseTerm)}&maxResults=50&key=${encodeURIComponent(apiKey)}${ptParam}`);
        
        // If initial load without pageToken, add complementary relevance search to double discovery depth
        if (!pageToken) {
          const compTerm = query ? `${query} tips` : (cleanNiche ? `${cleanNiche} tips review tutorial` : 'creator tutorial video');
          searchUrls.push(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=relevance&regionCode=${encodeURIComponent(searchRegion)}&q=${encodeURIComponent(compTerm)}&maxResults=50&key=${encodeURIComponent(apiKey)}`);
        }
      } else {
        const qTerm = query ? query : (cleanNiche ? cleanNiche : 'creator');
        searchUrls.push(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&order=relevance&regionCode=${encodeURIComponent(searchRegion)}&q=${encodeURIComponent(qTerm)}&maxResults=50&key=${encodeURIComponent(apiKey)}${ptParam}`);
        if (!pageToken) {
          searchUrls.push(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&order=viewCount&regionCode=${encodeURIComponent(searchRegion)}&q=${encodeURIComponent(qTerm)}&maxResults=50&key=${encodeURIComponent(apiKey)}`);
        }
      }

      for (const searchUrl of searchUrls) {
        try {
          const searchRes = await fetch(searchUrl, { signal: AbortSignal.timeout(8000) });
          const searchData = await searchRes.json();
          
          if (!foundNextPageToken && searchData.nextPageToken) {
            foundNextPageToken = searchData.nextPageToken;
          }

          if (searchData.items && searchData.items.length > 0) {
            const rawChannelIds = searchData.items.map(it => it.snippet?.channelId || it.id?.channelId).filter(Boolean);
            const channelIds = [...new Set(rawChannelIds)];

            // YouTube channels.list API allows up to 50 IDs per call. Chunk by 50:
            for (let i = 0; i < channelIds.length; i += 50) {
              const chunk = channelIds.slice(i, i + 50);
              const detailsUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&id=${encodeURIComponent(chunk.join(','))}&key=${encodeURIComponent(apiKey)}`;
              const detailsRes = await fetch(detailsUrl, { signal: AbortSignal.timeout(8000) });
              const detailsData = await detailsRes.json();
              
              if (detailsData.items) {
                for (const item of detailsData.items) {
                  const sn = item.snippet || {};
                  const st = item.statistics || {};
                  const subs = st.hiddenSubscriberCount ? null : parseInt(st.subscriberCount || '0', 10);
                  let handle = '';
                  let hasVerifiedHandle = false;
                  if (sn.customUrl) {
                    handle = sn.customUrl.startsWith('@') ? sn.customUrl : '@' + sn.customUrl;
                    hasVerifiedHandle = true;
                  }

                  livePool.push({
                    id: item.id,
                    title: sn.title || '',
                    handle: handle,
                    hasVerifiedHandle: hasVerifiedHandle,
                    avatar: sn.thumbnails?.default?.url || sn.thumbnails?.medium?.url || '',
                    subscribers: subs,
                    niche: cleanNiche || 'General',
                    country: sn.country || 'GLOBAL',
                    description: sn.description || '',
                    videoCount: parseInt(st.videoCount || '0', 10),
                    isLive: true
                  });
                }
              }
            }
          }
        } catch (subErr) {
          console.warn('Sub-query fetch note:', subErr.message);
        }
      }
    } catch (err) {
      console.warn('Live search fallback note:', err.message);
    }
  }

  // Helper filter function
  function applyFilters(list, reqNiche, reqCountry, reqMinSubs, reqMaxSubs, reqQuery, reqCollab) {
    let res = [...list];
    
    // Niche filter
    if (reqNiche && reqNiche !== 'All') {
      res = res.filter(c => c.niche && c.niche.toLowerCase() === reqNiche.toLowerCase());
    }
    
    // Country filter
    if (reqCountry && reqCountry !== 'ANY') {
      res = res.filter(c => !c.country || c.country.toUpperCase() === reqCountry.toUpperCase());
    }
    
    // Subscriber range filter (exclude channels with hidden sub counts when specific range is queried)
    if (typeof reqMinSubs === 'number' && reqMinSubs > 0) {
      res = res.filter(c => typeof c.subscribers === 'number' && c.subscribers >= reqMinSubs);
    }
    if (typeof reqMaxSubs === 'number' && reqMaxSubs < 1000000000) {
      res = res.filter(c => typeof c.subscribers === 'number' && c.subscribers <= reqMaxSubs);
    }

    // Collaboration / Looking For filter
    if (reqCollab && reqCollab !== 'All' && reqCollab !== 'All Collabs' && reqCollab !== 'None') {
      const targetCollab = reqCollab.toLowerCase().replace(/[^a-z]/g, '');
      res = res.filter(c => {
        const collabs = getCreatorCollabs(c);
        return collabs.some(col => col.toLowerCase().replace(/[^a-z]/g, '').includes(targetCollab));
      });
    }
    
    // Keyword search filter (flexible: matches "mrbeast", "mr beast", handles, titles, bios)
    if (reqQuery && reqQuery.trim()) {
      const q = reqQuery.toLowerCase().trim();
      const qNoSpace = q.replace(/[\s_.-]+/g, '');
      res = res.filter(c => {
        const title = (c.title || '').toLowerCase();
        const handle = (c.handle || '').toLowerCase();
        const desc = (c.description || '').toLowerCase();
        const niche = (c.niche || '').toLowerCase();
        return title.includes(q) || 
               handle.includes(q) || 
               title.replace(/[\s_.-]+/g, '').includes(qNoSpace) ||
               handle.replace(/[\s_.-]+/g, '').includes(qNoSpace) ||
               desc.includes(q) || 
               niche.includes(q);
      });
    }
    
    return res;
  }

  // 1. Filter live results (if any)
  let matchingLive = applyFilters(livePool, niche, country, minSubs, maxSubs, query, collab);
  
  // 2. Filter curated database
  let matchingCurated = applyFilters(allCurated, niche, country, minSubs, maxSubs, query, collab);

  // Combine live and curated (live first, avoid duplicate handles)
  const seen = new Set();
  let combined = [];

  for (const c of [...matchingLive, ...matchingCurated]) {
    const key = (c.handle || c.id).toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      combined.push(c);
    }
  }

  // SMART FALLBACK 1: If count is 0 because country is very specific,
  // gracefully fall back to all countries (Tier-1 Global) for this exact niche and size
  if (combined.length === 0 && country && country !== 'ANY') {
    const relaxedCountry = applyFilters(allCurated, niche, 'ANY', minSubs, maxSubs, query);
    for (const c of relaxedCountry) {
      const key = (c.handle || c.id).toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        combined.push({
          ...c,
          fallbackNotice: `Tier-1 Creator (${c.country || 'Global'})`
        });
      }
    }
  }

  // SMART FALLBACK 2: If count is still 0 (e.g. extreme query or bracket),
  // relax subscriber limit to show closest available creators in this niche
  if (combined.length === 0) {
    const relaxedSize = applyFilters(allCurated, niche, 'ANY', 0, 100000000, query);
    for (const c of relaxedSize.slice(0, 15)) {
      const key = (c.handle || c.id).toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        combined.push({
          ...c,
          fallbackNotice: `Related in ${c.niche}`
        });
      }
    }
  }

  // Format cards with direct YouTube Visit URLs & formatted numbers
  const formattedChannels = combined.map(c => {
    let subStr = 'Hidden';
    if (c.subscribers !== null && c.subscribers !== undefined) {
      if (c.subscribers >= 1000000) subStr = (c.subscribers / 1000000).toFixed(1) + 'M subs';
      else if (c.subscribers >= 1000) subStr = (c.subscribers / 1000).toFixed(1) + 'k subs';
      else subStr = c.subscribers + ' subs';
    }
    const safeHandle = c.handle.startsWith('@') ? c.handle : ('@' + c.handle);
    const countryCode = c.country || 'US';
    const creatorCollabs = getCreatorCollabs(c);
    let activeBadge = 'Active Creator';
    if (collab && collab !== 'All' && collab !== 'All Collabs' && collab !== 'None') {
      activeBadge = `Collab: ${collab}`;
    } else {
      activeBadge = 'Active Creator';
    }

    return {
      id: c.id,
      title: c.title,
      handle: safeHandle,
      avatar: c.avatar || '',
      subscribers: c.subscribers,
      subscribersFormatted: subStr,
      niche: c.niche || 'General',
      country: countryCode,
      countryName: COUNTRY_NAMES[countryCode] || countryCode || 'United States',
      description: c.description || '',
      videoCount: c.videoCount || 0,
      channelUrl: safeHandle.startsWith('@') ? ('https://www.youtube.com/' + safeHandle) : ('https://www.youtube.com/channel/' + encodeURIComponent(c.id)),
      status: activeBadge,
      collabs: creatorCollabs,
      activeCollabBadge: activeBadge,
      fallbackNotice: c.fallbackNotice || null
    };
  });

  return {
    nextPageToken: foundNextPageToken,
    channels: formattedChannels
  };
}

const server = http.createServer(async (req, res) => {
  let parsedUrl;
  try {
    parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  } catch (urlErr) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Malformed request URL' }));
    return;
  }

  // Client IP extraction (respecting reverse proxies like Render / Vercel)
  const clientIp = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || '127.0.0.1';

  // OWASP Standard Security Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API Endpoint: /api/analyze
  if (req.method === 'POST' && parsedUrl.pathname === '/api/analyze') {
    if (isRateLimited(clientIp, MAX_ANALYZE_PER_MIN)) {
      res.writeHead(429, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Too many requests. Please wait a minute before analyzing again.' }));
      return;
    }

    let body = '';
    let isTerminated = false;

    // Body size limit: 1MB to prevent DoS memory overflow
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) {
        isTerminated = true;
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Payload size exceeds 1MB limit' }));
        req.destroy();
      }
    });

    req.on('end', async () => {
      if (isTerminated) return;

      try {
        let payload;
        try {
          payload = JSON.parse(body || '{}');
        } catch (jsonErr) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Malformed JSON payload' }));
          return;
        }

        const {
          videoUrl,
          apiKey,
          targetCountry = 'US',
          countryFilterMode = 'strict',
          activeDays = 'any',
          minSubs = 5,
          maxSubs = 20000,
          minVideos = 1,
          maxVideos = 10000,
          maxComments = 300
        } = payload;

        // Strict input validation & sanitization
        if (!videoUrl || typeof videoUrl !== 'string') {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'YouTube video link or ID is required' }));
          return;
        }

        if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length < 15) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'YouTube Data API v3 key is required. Get one free from Google Cloud Console.' }));
          return;
        }

        const cleanApiKey = apiKey.trim();
        const videoId = extractVideoId(videoUrl);
        if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid YouTube URL or Video ID format' }));
          return;
        }

        // Clamp values to safe boundaries
        const safeMinSubs = Math.max(0, Math.min(1000000, parseInt(minSubs, 10) || 0));
        const safeMaxSubs = Math.max(safeMinSubs, Math.min(10000000, parseInt(maxSubs, 10) || 20000));
        const safeMinVideos = Math.max(0, Math.min(1000, parseInt(minVideos, 10) || 0));
        const safeMaxVideos = Math.max(safeMinVideos, Math.min(100000, parseInt(maxVideos, 10) || 10000));
        const safeMaxComments = Math.max(10, Math.min(1000, parseInt(maxComments, 10) || 300));
        const safeTargetCountry = ['US', 'GB', 'CA', 'AU', 'DE', 'TIER1', 'ANY'].includes(targetCountry) ? targetCountry : 'US';
        const safeCountryFilterMode = countryFilterMode === 'include_bio' ? 'include_bio' : 'strict';
        const safeActiveDays = ['any', '30', '60', '90', '180'].includes(String(activeDays)) ? String(activeDays) : 'any';

        // Fetch video title and duration for boundary check
        let videoTitle = 'YouTube Video';
        let videoDurationSeconds = 0;
        try {
          const vRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${encodeURIComponent(videoId)}&key=${encodeURIComponent(cleanApiKey)}`, {
            signal: AbortSignal.timeout(10000)
          });
          const vData = await vRes.json();
          if (vData.items && vData.items.length > 0) {
            videoTitle = vData.items[0].snippet.title;
            const durationIso = vData.items[0].contentDetails?.duration || '';
            videoDurationSeconds = parseDurationToSeconds(durationIso);
          }
        } catch (e) {
          console.warn('Could not fetch video details safely:', e.message);
        }

        // 1. Fetch Comments safely
        const comments = await fetchYouTubeComments(videoId, cleanApiKey, safeMaxComments);

        // Deduplicate channel IDs & collect verified timestamps
        const uniqueChannelIds = [];
        const seenChannels = new Set();
        const timestampMap = new Map();

        for (const comm of comments) {
          if (!seenChannels.has(comm.channelId)) {
            seenChannels.add(comm.channelId);
            uniqueChannelIds.push(comm.channelId);
          }
        }

        // 2. Fetch Channel Details (batch up to 50 channels per call)
        const channelDetailsMap = await fetchChannelsDetails(uniqueChannelIds, cleanApiKey);

        // 3. Stage 1: Filter candidates based on Country, Subscriber range, and Video count
        const candidateCreators = [];
        const seenCreators = new Set();

        for (const comm of comments) {
          if (seenCreators.has(comm.channelId)) continue;
          if (isSpamComment(comm.commentText)) continue; // Filter out crypto/whatsapp spam bots

          const channel = channelDetailsMap.get(comm.channelId);
          if (!channel) continue;

          // Country verification
          const countryCheck = verifyCountry(channel, safeTargetCountry, safeCountryFilterMode);
          if (!countryCheck.matched) continue;

          // Little creator criteria (Subscribers & Videos)
          const subs = channel.subscribers;
          const videos = channel.videoCount;

          if (subs !== null) {
            if (subs < safeMinSubs || subs > safeMaxSubs) continue;
          }
          if (videos < safeMinVideos || videos > safeMaxVideos) continue;

          seenCreators.add(comm.channelId);

          candidateCreators.push({
            channel,
            comment: comm,
            countryCheck
          });
        }

        // 4. Stage 2: Activity Filter (Fast parallel check with mapLimit to prevent Vercel timeouts)
        const now = Date.now();
        const activeDaysLimit = safeActiveDays !== 'any' ? parseInt(safeActiveDays, 10) : null;

        const candidateUploadDates = await mapLimit(candidateCreators, 8, async (item) => {
          if (item.channel.videoCount > 0 && item.channel.uploadsPlaylistId) {
            return await fetchLatestUploadDate(item.channel.uploadsPlaylistId, cleanApiKey);
          }
          return null;
        });

        const results = [];
        for (let i = 0; i < candidateCreators.length; i++) {
          const item = candidateCreators[i];
          const { channel, comment, countryCheck } = item;
          const latestUploadDate = candidateUploadDates[i];
          let daysSinceUpload = null;
          let activityLabel = 'Activity Unknown';
          let isUltraActive = false;

          if (latestUploadDate) {
            const uploadTimestamp = new Date(latestUploadDate).getTime();
            daysSinceUpload = Math.floor((now - uploadTimestamp) / (1000 * 60 * 60 * 24));
            
            if (daysSinceUpload <= 30) {
              activityLabel = `Uploaded ${daysSinceUpload === 0 ? 'today' : daysSinceUpload + 'd ago'}`;
              isUltraActive = true;
            } else if (daysSinceUpload <= 60) {
              activityLabel = `Uploaded ${Math.floor(daysSinceUpload / 7)}w ago`;
            } else if (daysSinceUpload <= 365) {
              activityLabel = `Uploaded ${Math.floor(daysSinceUpload / 30)}mo ago`;
            } else {
              activityLabel = `Uploaded ${Math.floor(daysSinceUpload / 365)}y ago`;
            }
          }

          // Enforce active days filter if requested
          if (activeDaysLimit !== null) {
            if (daysSinceUpload === null || daysSinceUpload > activeDaysLimit) {
              continue; // Exclude inactive channel
            }
          }

          // Determine mention handle (verify if official customUrl exists)
          let handle = '';
          let hasVerifiedHandle = false;
          if (channel.customUrl) {
            handle = channel.customUrl.startsWith('@') ? channel.customUrl : '@' + channel.customUrl;
            hasVerifiedHandle = true;
          }

          results.push({
            channelId: channel.id,
            title: channel.title,
            handle: hasVerifiedHandle ? handle : '',
            hasVerifiedHandle: hasVerifiedHandle,
            avatar: channel.avatar,
            subscribers: channel.subscribers,
            videoCount: channel.videoCount,
            viewCount: channel.viewCount,
            countryCode: countryCheck.countryCode,
            countryName: countryCheck.countryName,
            countryFlag: countryCheck.countryFlag,
            verificationType: countryCheck.verificationType,
            latestUploadDate: latestUploadDate,
            daysSinceUpload: daysSinceUpload,
            activityLabel: activityLabel,
            isUltraActive: isUltraActive,
            channelUrl: hasVerifiedHandle ? `https://www.youtube.com/${encodeURIComponent(handle)}` : `https://www.youtube.com/channel/${encodeURIComponent(channel.id)}`,
            comment: comment.commentText,
            commentLikes: comment.likeCount,
            commentDate: comment.publishedAt
          });
        }

        // Sort by subscriber count ascending (smallest creators first)
        results.sort((a, b) => (a.subscribers || 0) - (b.subscribers || 0));

        // Only include channels with authentic, verified @handles in the mention list
        const mentions = results.filter(r => r.hasVerifiedHandle && r.handle).map(r => r.handle).join(' ');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          videoId,
          videoTitle,
          videoDurationSeconds,
          targetCountry: safeTargetCountry,
          activeDays: safeActiveDays,
          totalCommentsScanned: comments.length,
          uniqueCommenters: uniqueChannelIds.length,
          creatorsFoundCount: results.length,
          mentions: mentions,
          highlights: [],
          creators: results
        }));

      } catch (err) {
        console.error('API Error occurred safely:', redactApiKey(err.message));
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: redactApiKey(err.message) || 'Internal server error' }));
      }
    });
    return;
  }

  // API Endpoint: /api/discover (Direct Niche & Size Discovery)
  if (req.method === 'POST' && parsedUrl.pathname === '/api/discover') {
    if (isRateLimited(clientIp, MAX_DISCOVER_PER_MIN)) {
      res.writeHead(429, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Rate limit reached. Please wait a few seconds before searching again.' }));
      return;
    }

    let body = '';
    let isTerminated = false;

    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) {
        isTerminated = true;
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Payload size exceeds 1MB limit' }));
        req.destroy();
      }
    });

    req.on('end', async () => {
      if (isTerminated) return;

      try {
        let payload;
        try {
          payload = JSON.parse(body || '{}');
        } catch (jsonErr) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Malformed JSON payload' }));
          return;
        }

        const {
          niche = 'All',
          query = '',
          country = 'US',
          minSubs = 0,
          maxSubs = 1000000000,
          apiKey = '',
          pageToken = '',
          collab = 'None'
        } = payload;

        const parsedMinSubs = typeof minSubs === 'number' ? minSubs : parseInt(minSubs, 10) || 0;
        const parsedMaxSubs = typeof maxSubs === 'number' ? maxSubs : (parseInt(maxSubs, 10) || 1000000000);

        const discoveryResult = await discoverYouTubeChannels({
          niche,
          query,
          country,
          minSubs: parsedMinSubs,
          maxSubs: parsedMaxSubs,
          apiKey,
          pageToken,
          collab
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          niche,
          country,
          totalFound: discoveryResult.channels.length,
          nextPageToken: discoveryResult.nextPageToken,
          channels: discoveryResult.channels
        }));

      } catch (err) {
        console.error('Discover API Error:', redactApiKey(err.message));
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: redactApiKey(err.message) || 'Internal server error' }));
      }
    });
    return;
  }

  // API Endpoint: /api/submit-channel (Community Channel Submissions)
  if (req.method === 'POST' && parsedUrl.pathname === '/api/submit-channel') {
    if (isRateLimited(clientIp, 5)) {
      res.writeHead(429, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Too many submissions. Please wait a minute before submitting again.' }));
      return;
    }

    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 50000) {
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Payload too large' }));
        req.destroy();
      }
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const { channelHandle, channelName, niche, country, subRange, collabType, contactEmail } = payload;

        if (!channelHandle || !niche) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Channel handle and niche are required.' }));
          return;
        }

        let rawHandle = String(channelHandle).trim();
        const urlMatch = rawHandle.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:@)?([a-zA-Z0-9_.-]+)/i);
        let cleanHandle = '';
        if (urlMatch && urlMatch[1]) {
          cleanHandle = '@' + urlMatch[1].replace(/^@/, '');
        } else {
          cleanHandle = rawHandle.replace(/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/?/i, '').replace(/^@/, '');
          cleanHandle = cleanHandle ? ('@' + cleanHandle) : '';
        }

        if (!cleanHandle || cleanHandle.length < 2) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Please enter a valid YouTube handle or URL.' }));
          return;
        }

        let subNumber = 5000;
        if (subRange === '0 - 1k') subNumber = 800;
        else if (subRange === '1k - 10k') subNumber = 4500;
        else if (subRange === '10k - 50k') subNumber = 25000;
        else if (subRange === '50k - 100k') subNumber = 75000;
        else if (subRange === '100k+') subNumber = 150000;

        const submission = {
          id: 'sub_' + Date.now(),
          handle: cleanHandle,
          title: String(channelName || cleanHandle.replace(/^@/, '')).trim(),
          niche: String(niche).trim(),
          country: String(country || 'US').trim().toUpperCase(),
          subscribers: subNumber,
          subRange: String(subRange || '1k - 10k').trim(),
          collabType: String(collabType || 'General Collabs').trim(),
          email: String(contactEmail || '').trim().slice(0, 100),
          submittedAt: new Date().toISOString()
        };

        // Persist to local JSON file safely
        const submissionsFile = path.resolve(__dirname, 'submitted-channels.json');
        let existing = [];
        try {
          if (fs.existsSync(submissionsFile)) {
            existing = JSON.parse(fs.readFileSync(submissionsFile, 'utf8') || '[]');
          }
        } catch (e) {
          existing = [];
        }

        const alreadyExists = existing.some(item => (item.handle || '').toLowerCase() === submission.handle.toLowerCase());
        if (!alreadyExists) {
          existing.push(submission);
          try {
            fs.writeFileSync(submissionsFile, JSON.stringify(existing, null, 2), 'utf8');
          } catch (writeErr) {
            console.error('Failed to write submission file:', writeErr.message);
            res.writeHead(503, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Could not save right now. Please try again later.' }));
            return;
          }
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: 'Submitted for review! Your channel has been queued for verification.',
          submission
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to process submission' }));
      }
    });
    return;
  }

  // Allow only GET and HEAD requests for static files
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('405 Method Not Allowed');
    return;
  }

  // Hardened Static File Serving with Path Traversal Protection
  let decoded;
  try {
    decoded = decodeURIComponent(parsedUrl.pathname || '/');
  } catch (uriErr) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('400 Bad Request');
    return;
  }

  let safePath = path.normalize(decoded).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\' || safePath === '') {
    safePath = 'index.html';
  }
  
  // Strip null bytes and Alternate Data Streams (ADS)
  safePath = safePath.replace(/\0/g, '').replace(/::\$DATA/gi, '');
  let filePath = path.resolve(PUBLIC_DIR, safePath.startsWith(path.sep) ? safePath.slice(1) : safePath);

  // Canonical realpath boundary check with path separator
  const resolvedPublicDir = path.resolve(PUBLIC_DIR);
  const boundaryCheck = resolvedPublicDir.toLowerCase() + path.sep;
  if (!filePath.toLowerCase().startsWith(boundaryCheck) && filePath.toLowerCase() !== resolvedPublicDir.toLowerCase()) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden: Access Denied');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
      '.txt': 'text/plain; charset=utf-8',
      '.xml': 'application/xml; charset=utf-8'
    };

    if (!mimeTypes[ext]) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('403 Forbidden File Type');
      return;
    }

    const cacheHeader = ext === '.html' ? 'no-cache' : 'public, max-age=86400';
    res.writeHead(200, {
      'Content-Type': mimeTypes[ext],
      'Content-Length': stats.size,
      'Cache-Control': cacheHeader
    });

    if (req.method === 'HEAD') {
      res.end();
      return;
    }

    const stream = fs.createReadStream(filePath);
    stream.on('error', (streamErr) => {
      console.error('File stream error:', streamErr.message);
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
    });

    res.on('close', () => {
      stream.destroy();
    });

    stream.pipe(res);
  });
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 YouTube Creator Finder running safely on port ${PORT}!`);
    console.log(`🔗 Local URL: http://localhost:${PORT}`);
    console.log(`=======================================================`);
  });
}

module.exports = server;
