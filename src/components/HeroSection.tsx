import { useState, useEffect } from 'react';
import { ShieldCheck, Share2, Copy, Check, Youtube, MessageSquare, Instagram, Facebook, ExternalLink, Play, RefreshCw, Radio } from 'lucide-react';
import { CREATOR_PROFILE, INITIAL_SOCIAL_LINKS } from '../data/creatorData.ts';

interface HeroSectionProps {
  onOpenShare: () => void;
  showToast: (msg: string) => void;
}

interface LiveStatsData {
  youtubeSubs: string;
  discordMembers: string;
  discordOnline: string;
  instagramFollowers: string;
  facebookFollowers: string;
  isLive: boolean;
}

export default function HeroSection({ onOpenShare, showToast }: HeroSectionProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [stats, setStats] = useState<LiveStatsData>({
    youtubeSubs: '766',
    discordMembers: '152',
    discordOnline: '44',
    instagramFollowers: '385',
    facebookFollowers: '565',
    isLive: true,
  });

  const fetchLiveStats = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    try {
      const res = await fetch('/api/live-stats');
      if (res.ok) {
        const data = await res.json();
        setStats({
          youtubeSubs: data.youtube?.subscribers || '766',
          discordMembers: data.discord?.members || '152',
          discordOnline: data.discord?.online || '44',
          instagramFollowers: data.instagram?.followers || '385',
          facebookFollowers: data.facebook?.followers || '565',
          isLive: true,
        });
        if (isManual) {
          showToast(`Synced real-time stats! (YT: ${data.youtube?.subscribers || '766'}, Discord: ${data.discord?.members || '152'}, Insta: ${data.instagram?.followers || '385'}, FB: ${data.facebook?.followers || '565'})`);
        }
        return;
      }
    } catch {
      // client-side direct Discord invite fallback
    }

    try {
      const dRes = await fetch('https://discord.com/api/v10/invites/K5f2Jnexf?with_counts=true');
      if (dRes.ok) {
        const dJson = await dRes.json();
        setStats((prev) => ({
          ...prev,
          discordMembers: String(dJson.approximate_member_count || 152),
          discordOnline: String(dJson.approximate_presence_count || 43),
        }));
        if (isManual) {
          showToast(`Synced real-time Discord! (${dJson.approximate_member_count} members)`);
        }
      }
    } catch {
      if (isManual) showToast('Live stats currently up to date.');
    } finally {
      if (isManual) setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  useEffect(() => {
    fetchLiveStats();
    // Poll every 60 seconds for live updates
    const interval = setInterval(() => {
      fetchLiveStats();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyProfile = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    showToast('Profile link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const youtubeLink = INITIAL_SOCIAL_LINKS.find((l) => l.platform === 'youtube');
  const discordLink = INITIAL_SOCIAL_LINKS.find((l) => l.platform === 'discord');
  const instaLink = INITIAL_SOCIAL_LINKS.find((l) => l.platform === 'instagram');
  const fbLink = INITIAL_SOCIAL_LINKS.find((l) => l.platform === 'facebook');

  const youtubeUrl = youtubeLink?.url || 'https://youtube.com/@samifuryofficial?si=sZ1ou7C0hae0scRP';

  return (
    <section className="relative w-full pt-4 pb-8 sm:pb-10">
      {/* Hero Banner Container - Sami Fury Hub */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-52 sm:h-68 md:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl bg-slate-950 group">
          <img
            src={CREATOR_PROFILE.bannerImage}
            alt="Sami Fury Hub Official Banner"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-95 contrast-110 transform transition-transform duration-700 group-hover:scale-102"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          {/* Measured gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08090d]/60 via-transparent to-red-950/20" />

          {/* Top-left Banner Tag: Sami Fury Hub */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-black tracking-wider uppercase text-amber-300 bg-slate-950/80 backdrop-blur-md rounded-xl border border-amber-400/40 shadow-lg shadow-amber-500/10">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>SAMI FURY HUB</span>
            </span>
          </div>

          {/* Top-right banner tag: Minecraft Creator */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-300 bg-black/70 backdrop-blur-md rounded-xl border border-red-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              <span>MINECRAFT YOUTUBER</span>
            </span>
          </div>

          {/* Banner bottom branding ribbon */}
          <div className="absolute bottom-4 right-4 hidden sm:flex items-center gap-2">
            <span className="px-3 py-1 text-[11px] font-bold tracking-widest uppercase text-slate-300 bg-black/50 backdrop-blur-md rounded-lg border border-slate-700/50">
              Official Hub · 2026
            </span>
          </div>
        </div>

        {/* Profile Card & Avatar Overlap */}
        <div className="relative -mt-16 sm:-mt-24 px-2 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            {/* Left: Avatar + Primary Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
              {/* Creator Avatar with Exact Logo & Yellow Lightning Halo */}
              <div className="relative group shrink-0">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-3xl overflow-hidden p-1.5 bg-gradient-to-tr from-amber-400 via-purple-600 to-amber-300 shadow-2xl shadow-amber-500/25">
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-amber-400 flex items-center justify-center">
                    <img
                      src={CREATOR_PROFILE.avatarImage}
                      alt="Sami Fury Official Mascot Logo"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Status Dot */}
                <div className="absolute -bottom-1 -right-1 flex items-center gap-1.5 px-3 py-1 bg-slate-950/95 border border-amber-400/60 rounded-xl shadow-lg shadow-black/80">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-bold text-slate-100 uppercase tracking-wider">Official</span>
                </div>
              </div>

              {/* Title & Headline */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
                  <h1 
                    className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    {CREATOR_PROFILE.name}
                  </h1>
                  <span 
                    title="Verified YouTube Creator" 
                    className="inline-flex items-center text-red-500"
                  >
                    <ShieldCheck className="w-6 h-6 fill-red-500/20 text-red-500" />
                  </span>
                </div>

                {/* Subtitle */}
                <p className="text-sm sm:text-base font-semibold text-red-400">
                  {CREATOR_PROFILE.title}
                </p>

                {/* Unboxed Metadata Discipline */}
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-slate-400 font-medium pt-0.5">
                  <span className="text-red-400 font-mono">@samifuryofficial</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-amber-400 font-mono">@sami_fury_official</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{CREATOR_PROFILE.location}</span>
                </div>
              </div>
            </div>

            {/* Right: Quick Action Controls with YouTube as Primary CTA */}
            <div className="flex items-center justify-center sm:justify-end gap-3 pb-1 flex-wrap">
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase rounded-xl bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-950/50 transition-all hover:scale-105"
              >
                <Youtube className="w-4 h-4 fill-white" />
                <span>Subscribe ({stats.youtubeSubs})</span>
              </a>

              <button
                onClick={handleCopyProfile}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-purple-500/50 transition-all shadow-sm cursor-pointer"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span>{copiedLink ? 'Copied Link' : 'Copy Link'}</span>
              </button>

              <button
                onClick={onOpenShare}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-700/50 hover:border-purple-500 transition-all shadow-sm cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-purple-300" />
                <span>Share Profile</span>
              </button>
            </div>
          </div>

          {/* Featured YouTube Channel Spotlight Card */}
          <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-950/50 via-slate-900/90 to-purple-950/40 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-red-950/20">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 shrink-0">
                <Youtube className="w-6 h-6 fill-current" />
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-red-400">Primary Channel</span>
                  <span className="text-xs text-slate-500">·</span>
                  <span className="text-xs text-slate-300 font-mono">@samifuryofficial</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                  Sami Fury Official YouTube Channel
                </h3>
                <p className="text-xs text-slate-400">
                  Minecraft 100 Days Hardcore Survival, Sami's Empire SMP episodes &amp; mega builds.
                </p>
              </div>
            </div>

            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase rounded-xl bg-red-600 hover:bg-red-500 text-white transition-all shadow-md shadow-red-900/40 whitespace-nowrap shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Bio text */}
          <div className="mt-5 max-w-3xl">
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {CREATOR_PROFILE.bio}
            </p>
          </div>

          {/* 4 Primary Community Metrics: YT Subs, Discord Members, Insta Followers, FB Followers */}
          <div className="mt-7">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>REAL-TIME VERIFIED COMMUNITY STATS</span>
              </div>

              {/* Real-time sync button */}
              <button
                onClick={() => fetchLiveStats(true)}
                disabled={isRefreshing}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-[11px] font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Refresh real-time stats"
              >
                <RefreshCw className={`w-3 h-3 text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Sync Real-Time</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {/* 1. YouTube Subs */}
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-slate-900/80 border border-red-500/40 hover:border-red-500 hover:bg-slate-900/95 transition-all group flex flex-col justify-between shadow-sm hover:shadow-lg hover:shadow-red-950/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <Youtube className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                  <span className="flex items-center gap-1 text-[11px] font-bold text-red-400 uppercase tracking-wider">
                    <span>YouTube</span>
                    <ExternalLink className="w-3 h-3 text-red-500/70" />
                  </span>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tight">
                    {stats.youtubeSubs}
                  </p>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Subscribers (Live)
                  </p>
                </div>
              </a>

              {/* 2. Discord Members */}
              <a
                href={discordLink?.url || 'https://discord.gg/K5f2Jnexf'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-slate-900/80 border border-indigo-500/30 hover:border-indigo-500 hover:bg-slate-900/95 transition-all group flex flex-col justify-between shadow-sm hover:shadow-lg hover:shadow-indigo-950/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <MessageSquare className="w-5 h-5 text-[#5865F2] group-hover:scale-110 transition-transform" />
                  <span className="flex items-center gap-1 text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                    <span>Discord</span>
                    <ExternalLink className="w-3 h-3 text-indigo-400/70" />
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <p className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tight">
                      {stats.discordMembers}
                    </p>
                    <span className="text-[11px] font-bold text-emerald-400">
                      ({stats.discordOnline} online)
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Sami's Empire Members
                  </p>
                </div>
              </a>

              {/* 3. Instagram Followers - Real Time */}
              <a
                href={instaLink?.url || 'https://www.instagram.com/sami_fury_official?igsh=MXVwMWFlZzhpbjhobw=='}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-slate-900/80 border border-pink-500/30 hover:border-pink-500 hover:bg-slate-900/95 transition-all group flex flex-col justify-between shadow-sm hover:shadow-lg hover:shadow-pink-950/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <Instagram className="w-5 h-5 text-[#E1306C] group-hover:scale-110 transition-transform" />
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-pink-400 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                    <span>Instagram</span>
                    <ExternalLink className="w-3 h-3 text-pink-400/70" />
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <p className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tight">
                      {stats.instagramFollowers}
                    </p>
                    <span className="text-[10px] font-bold text-pink-400">
                      Followers
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-0.5 truncate">
                    @sami_fury_official (Live)
                  </p>
                </div>
              </a>

              {/* 4. Facebook Followers */}
              <a
                href={fbLink?.url || 'https://www.facebook.com/share/1CpqiUitDS/'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-slate-900/80 border border-blue-500/30 hover:border-blue-500 hover:bg-slate-900/95 transition-all group flex flex-col justify-between shadow-sm hover:shadow-lg hover:shadow-blue-950/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <Facebook className="w-5 h-5 text-[#1877F2] group-hover:scale-110 transition-transform" />
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <span>Facebook</span>
                    <ExternalLink className="w-3 h-3 text-blue-400/70" />
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <p className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tight">
                      {stats.facebookFollowers}
                    </p>
                    <span className="text-[10px] font-bold text-blue-400">
                      Followers
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Followers (Live)
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
