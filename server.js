import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const distPath = path.join(__dirname, 'dist');

let cachedStats = null;
let lastFetchTime = 0;

let currentInstaFollowers = '385';
let currentFbFollowers = '565';

let cachedVideos = null;
let lastVideoFetchTime = 0;

const DEFAULT_REAL_VIDEOS = [
  {
    id: 'yt-ZQtWc_29o8I',
    videoId: 'ZQtWc_29o8I',
    title: 'Minecraft for Free Now! 😱 Download from Play Store (Nobody Knows!)',
    url: 'https://www.youtube.com/watch?v=ZQtWc_29o8I',
    thumbnail: 'https://i.ytimg.com/vi/ZQtWc_29o8I/hq720.jpg',
  },
  {
    id: 'yt-6WfBir8XgBc',
    videoId: '6WfBir8XgBc',
    title: 'বান্ধবীর সাথে REAL VERITY খেলতে গিয়ে যা হলো! 😱',
    url: 'https://www.youtube.com/watch?v=6WfBir8XgBc',
    thumbnail: 'https://i.ytimg.com/vi/6WfBir8XgBc/hq720.jpg',
  },
  {
    id: 'yt-IWqa2pVhhEA',
    videoId: 'IWqa2pVhhEA',
    title: 'UNLIMITED IRON on DAY 1?! | Minecraft Hardcore',
    url: 'https://www.youtube.com/watch?v=IWqa2pVhhEA',
    thumbnail: 'https://i.ytimg.com/vi/IWqa2pVhhEA/hq720.jpg',
  },
  {
    id: 'yt-fGEapYwbik0',
    videoId: 'fGEapYwbik0',
    title: 'Minecraft But I Have to Stay on ONE BOAT for 24 HOURS! 💀',
    url: 'https://www.youtube.com/watch?v=fGEapYwbik0',
    thumbnail: 'https://i.ytimg.com/vi/fGEapYwbik0/hq720.jpg',
  },
  {
    id: 'yt-u8s9btluE1w',
    videoId: 'u8s9btluE1w',
    title: 'Minecraft But ONE BLOCK 🤓 in Bangla || Sami Fury',
    url: 'https://www.youtube.com/watch?v=u8s9btluE1w',
    thumbnail: 'https://i.ytimg.com/vi/u8s9btluE1w/hq720.jpg',
  },
  {
    id: 'yt-PTGI0ypQx10',
    videoId: 'PTGI0ypQx10',
    title: 'Can I escape from the SIREN HEAD ☠️ || It was creepy || Sami Fury',
    url: 'https://www.youtube.com/watch?v=PTGI0ypQx10',
    thumbnail: 'https://i.ytimg.com/vi/PTGI0ypQx10/hq720.jpg',
  },
  {
    id: 'yt-qJ1CwaFN4QY',
    videoId: 'qJ1CwaFN4QY',
    title: 'Why MOJO Launcher got BANNED from Play Store in all countries🤔 | HIDDEN truth behind',
    url: 'https://www.youtube.com/watch?v=qJ1CwaFN4QY',
    thumbnail: 'https://i.ytimg.com/vi/qJ1CwaFN4QY/hq720.jpg',
  },
  {
    id: 'yt-LR4tOMxK2gw',
    videoId: 'LR4tOMxK2gw',
    title: 'I beat MINECRAFT but in CREATIVE | But without using any items 🤯 | Sami Fury',
    url: 'https://www.youtube.com/watch?v=LR4tOMxK2gw',
    thumbnail: 'https://i.ytimg.com/vi/LR4tOMxK2gw/hq720.jpg',
  },
  {
    id: 'yt-ylaCdJdEh-I',
    videoId: 'ylaCdJdEh-I',
    title: 'Look how beautiful my country looks in Minecraft!',
    url: 'https://www.youtube.com/watch?v=ylaCdJdEh-I',
    thumbnail: 'https://i.ytimg.com/vi/ylaCdJdEh-I/hqdefault.jpg',
  },
  {
    id: 'yt-bR2jUXJdzzQ',
    videoId: 'bR2jUXJdzzQ',
    title: 'Best Friend Turned Killer In This Minecraft SMP! 💀',
    url: 'https://www.youtube.com/watch?v=bR2jUXJdzzQ',
    thumbnail: 'https://i.ytimg.com/vi/bR2jUXJdzzQ/hq720.jpg',
  },
  {
    id: 'yt-Wj6459yM6Io',
    videoId: 'Wj6459yM6Io',
    title: 'This is why JAVA players are afraid of Pocket 🤯🤯 || Pt-1 || Sami Fury',
    url: 'https://www.youtube.com/watch?v=Wj6459yM6Io',
    thumbnail: 'https://i.ytimg.com/vi/Wj6459yM6Io/hq720.jpg',
  },
  {
    id: 'yt-bPRkYwqGs7w',
    videoId: 'bPRkYwqGs7w',
    title: 'WHITE SULTAN unexpected incident on the day of sacrifice 😨 || Sami Fury',
    url: 'https://www.youtube.com/watch?v=bPRkYwqGs7w',
    thumbnail: 'https://i.ytimg.com/vi/bPRkYwqGs7w/hq720.jpg',
  },
];

// API endpoint for real-time live subscriber, member, and follower stats
app.get('/api/live-stats', async (req, res) => {
  const now = Date.now();
  if (cachedStats && now - lastFetchTime < 30000) {
    return res.json(cachedStats);
  }

  let ytSubs = '766';
  let discordMembers = 152;
  let discordOnline = 44;
  let fbFollowers = '565';

  try {
    const discordRes = await fetch('https://discord.com/api/v10/invites/K5f2Jnexf?with_counts=true', {
      signal: AbortSignal.timeout(4000),
    });
    if (discordRes.ok) {
      const dData = await discordRes.json();
      if (dData.approximate_member_count) {
        discordMembers = dData.approximate_member_count;
      }
      if (dData.approximate_presence_count) {
        discordOnline = dData.approximate_presence_count;
      }
    }
  } catch (err) {
    console.error('Discord fetch error:', err.message);
  }

  try {
    const ytRes = await fetch('https://www.youtube.com/@samifuryofficial', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: AbortSignal.timeout(4000),
    });
    if (ytRes.ok) {
      const html = await ytRes.text();
      const match = html.match(/@SamiFuryOfficial[^•]*•[^\d]*(\d[\d,KkMm.]*)\s+subscribers?/i);
      if (match && match[1]) {
        ytSubs = match[1];
      }
    }
  } catch (err) {
    console.error('YouTube fetch error:', err.message);
  }

  cachedStats = {
    youtube: {
      subscribers: ytSubs,
      subscribersText: `${ytSubs} Subscribers`,
      videos: '29 Videos',
    },
    discord: {
      members: String(discordMembers),
      membersText: `${discordMembers} Members`,
      online: String(discordOnline),
      onlineText: `${discordOnline} Online`,
    },
    facebook: {
      followers: currentFbFollowers || fbFollowers,
      followersText: `${currentFbFollowers || fbFollowers} Followers`,
      status: 'Live',
    },
    instagram: {
      followers: currentInstaFollowers,
      followersText: `${currentInstaFollowers} Followers`,
      handle: '@sami_fury_official',
      status: 'Live',
      url: 'https://www.instagram.com/sami_fury_official?igsh=MXVwMWFlZzhpbjhobw==',
    },
    lastUpdated: new Date().toISOString(),
  };
  lastFetchTime = now;

  res.json(cachedStats);
});

// Update live counts in real time (e.g. Instagram, Facebook, etc.)
app.post('/api/live-stats', express.json(), (req, res) => {
  const { instagramFollowers, facebookFollowers, youtubeSubs } = req.body || {};
  if (instagramFollowers) currentInstaFollowers = String(instagramFollowers).trim();
  if (facebookFollowers) currentFbFollowers = String(facebookFollowers).trim();
  
  if (cachedStats) {
    if (instagramFollowers && cachedStats.instagram) {
      cachedStats.instagram.followers = currentInstaFollowers;
      cachedStats.instagram.followersText = `${currentInstaFollowers} Followers`;
    }
    if (facebookFollowers && cachedStats.facebook) {
      cachedStats.facebook.followers = currentFbFollowers;
      cachedStats.facebook.followersText = `${currentFbFollowers} Followers`;
    }
    if (youtubeSubs && cachedStats.youtube) {
      cachedStats.youtube.subscribers = String(youtubeSubs).trim();
      cachedStats.youtube.subscribersText = `${youtubeSubs} Subscribers`;
    }
    cachedStats.lastUpdated = new Date().toISOString();
  }
  lastFetchTime = 0; // force refresh
  res.json({ success: true, stats: cachedStats });
});

// API route for real latest YouTube uploads
app.get('/api/latest-videos', async (req, res) => {
  const now = Date.now();
  if (cachedVideos && now - lastVideoFetchTime < 60000) {
    return res.json(cachedVideos);
  }

  try {
    const ytRes = await fetch('https://www.youtube.com/@samifuryofficial/videos', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: AbortSignal.timeout(5000),
    });

    if (ytRes.ok) {
      const html = await ytRes.text();
      const match = html.match(/var ytInitialData = ({.*?});<\/script>/s);
      if (match) {
        const data = JSON.parse(match[1]);
        const contents =
          data.contents?.twoColumnBrowseResultsRenderer?.tabs?.[1]?.tabRenderer?.content?.richGridRenderer?.contents || [];
        const parsedList = [];
        for (const item of contents) {
          const vm = item.richItemRenderer?.content?.lockupViewModel;
          if (vm && vm.contentId) {
            const videoId = vm.contentId;
            const title = vm.metadata?.lockupMetadataViewModel?.title?.content || 'Sami Fury Video';
            const thumbs = vm.contentImage?.thumbnailViewModel?.image?.sources || [];
            const thumbnail = thumbs.length
              ? thumbs[thumbs.length - 1].url
              : `https://i.ytimg.com/vi/${videoId}/hq720.jpg`;
            parsedList.push({
              id: `yt-${videoId}`,
              videoId,
              title,
              url: `https://www.youtube.com/watch?v=${videoId}`,
              thumbnail,
            });
          }
        }
        if (parsedList.length > 0) {
          cachedVideos = parsedList;
          lastVideoFetchTime = now;
          return res.json(parsedList);
        }
      }
    }
  } catch (err) {
    console.error('Error fetching latest videos:', err.message);
  }

  cachedVideos = DEFAULT_REAL_VIDEOS;
  lastVideoFetchTime = now;
  res.json(DEFAULT_REAL_VIDEOS);
});

// Serve static assets from dist
app.use(express.static(distPath));

// Health check endpoint
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// Fallback to index.html for SPA client-side routing
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send('App is building, please refresh in a moment.');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
