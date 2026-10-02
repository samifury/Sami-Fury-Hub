import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.NODE_ENV === 'production' ? (Number(process.env.PORT) || 3000) : 3000;

let cachedStats: any = null;
let lastFetchTime = 0;

// API route for live stats
app.get('/api/live-stats', async (req, res) => {
  const now = Date.now();
  if (cachedStats && now - lastFetchTime < 30000) {
    return res.json(cachedStats);
  }

  let ytSubs = '766';
  let discordMembers = 152;
  let discordOnline = 43;
  let fbFollowers = '565';
  let instaFollowers = '380+';

  try {
    const discordRes = await fetch('https://discord.com/api/v10/invites/K5f2Jnexf?with_counts=true', {
      signal: AbortSignal.timeout(4000),
    });
    if (discordRes.ok) {
      const dData: any = await discordRes.json();
      if (dData.approximate_member_count) {
        discordMembers = dData.approximate_member_count;
      }
      if (dData.approximate_presence_count) {
        discordOnline = dData.approximate_presence_count;
      }
    }
  } catch (err: any) {
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
  } catch (err: any) {
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
      followers: fbFollowers,
      followersText: `${fbFollowers} Followers`,
    },
    instagram: {
      followers: instaFollowers,
      followersText: `${instaFollowers} Followers`,
    },
    lastUpdated: new Date().toISOString(),
  };
  lastFetchTime = now;

  res.json(cachedStats);
});

// Vite middleware in dev
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
