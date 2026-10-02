import { useState, useEffect } from 'react';
import { Youtube, Play, ExternalLink, RefreshCw, Search, X } from 'lucide-react';
import { YouTubeVideo } from '../types/index.ts';
import { REAL_YOUTUBE_UPLOADS } from '../data/creatorData.ts';

interface LatestUploadsSectionProps {
  showToast: (msg: string) => void;
}

export default function LatestUploadsSection({ showToast }: LatestUploadsSectionProps) {
  const [videos, setVideos] = useState<YouTubeVideo[]>(REAL_YOUTUBE_UPLOADS);
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchLatestVideos = async (manual = false) => {
    if (manual) setIsRefreshing(true);
    try {
      const res = await fetch('/api/latest-videos');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setVideos(data);
          if (manual) showToast(`Refreshed! Loaded ${data.length} latest YouTube videos.`);
          return;
        }
      }
    } catch {
      // fallback
    } finally {
      if (manual) setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  useEffect(() => {
    fetchLatestVideos();
  }, []);

  const filteredVideos = videos.filter((v) =>
    v.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="latest-uploads" className="w-full py-10 sm:py-14 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest mb-1.5">
              <Youtube className="w-4 h-4 text-red-500" />
              <span>OFFICIAL YOUTUBE CHANNEL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>Latest YouTube Uploads</span>
              <span className="px-2.5 py-0.5 text-xs font-bold bg-red-600/20 text-red-400 border border-red-500/30 rounded-full">
                {videos.length} Videos
              </span>
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Watch real, official gameplay uploads, survival challenges, and tutorials from Sami Fury's YouTube channel.
            </p>
          </div>

          {/* Action buttons & Search */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 focus:border-red-500/50 focus:outline-none text-slate-200 placeholder-slate-500 w-44 sm:w-56"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <button
              onClick={() => fetchLatestVideos(true)}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors cursor-pointer"
              title="Refresh latest uploads from YouTube"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-red-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <a
              href="https://youtube.com/@samifuryofficial?si=sZ1ou7C0hae0scRP"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase rounded-xl bg-red-600 hover:bg-red-500 text-white transition-all shadow-md shadow-red-950/40"
            >
              <span>Channel</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="group flex flex-col rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-red-500/50 hover:bg-slate-900/90 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-red-950/20"
            >
              {/* Thumbnail Container */}
              <div 
                className="relative aspect-video w-full overflow-hidden bg-slate-950 cursor-pointer"
                onClick={() => setActiveVideo(video)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to standard YouTube thumbnail
                    (e.currentTarget as HTMLImageElement).src = `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;
                  }}
                />
                
                {/* Overlay scrim */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center transform transition-transform duration-300 group-hover:scale-115 shadow-xl shadow-black/80">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Top Badge */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-black/75 backdrop-blur-md text-red-400 border border-red-500/20">
                    <Youtube className="w-3 h-3 text-red-500" />
                    <span>YouTube</span>
                  </span>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 
                    onClick={() => setActiveVideo(video)}
                    className="text-sm font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2 cursor-pointer leading-snug"
                    title={video.title}
                  >
                    {video.title}
                  </h3>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    @SamiFuryOfficial
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveVideo(video)}
                      className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                    >
                      Preview
                    </button>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-white transition-colors"
                      title="Open on YouTube"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12 rounded-2xl bg-slate-900/40 border border-slate-800">
            <p className="text-sm text-slate-400">No videos found matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-2 text-xs font-semibold text-red-400 hover:underline"
            >
              Clear search filter
            </button>
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl shadow-red-950/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/80">
              <div className="flex items-center gap-2.5 pr-4">
                <Youtube className="w-5 h-5 text-red-500 shrink-0" />
                <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-xl">
                  {activeVideo.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={activeVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors whitespace-nowrap"
                >
                  <span>Open on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                  title="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Video iFrame Embed */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.videoId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
