import { useState } from 'react';
import { Youtube, Instagram, Facebook, ExternalLink, Sparkles, Clock, Eye } from 'lucide-react';
import { SocialUpdate } from '../types/index.ts';

interface SocialUpdatesSectionProps {
  updates: SocialUpdate[];
  showToast: (msg: string) => void;
}

export default function SocialUpdatesSection({ updates, showToast }: SocialUpdatesSectionProps) {
  const [filter, setFilter] = useState<'all' | 'youtube' | 'instagram' | 'facebook'>('all');

  const filteredUpdates = updates.filter(
    (item) => filter === 'all' || item.platform === filter
  );

  const getPlatformIcon = (platform: SocialUpdate['platform']) => {
    switch (platform) {
      case 'youtube':
        return <Youtube className="w-4 h-4 text-red-500" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-[#E1306C]" />;
      case 'facebook':
        return <Facebook className="w-4 h-4 text-[#1877F2]" />;
    }
  };

  const getPlatformBadge = (platform: SocialUpdate['platform']) => {
    switch (platform) {
      case 'youtube':
        return 'bg-red-600/10 text-red-400 border-red-500/30';
      case 'instagram':
        return 'bg-pink-600/10 text-pink-400 border-pink-500/30';
      case 'facebook':
        return 'bg-blue-600/10 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <section id="social-updates" className="w-full py-10 sm:py-14 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-widest mb-1.5">
              <Sparkles className="w-4 h-4 text-red-400" />
              <span>CONTENT &amp; MEDIA DISPATCH</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Social Updates &amp; Releases
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Latest video uploads, Minecraft episode premieres, behind-the-scenes reels, and announcements across YouTube, Instagram, and Facebook.
            </p>
          </div>

          {/* Platform Filters */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl overflow-x-auto self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Socials ({updates.length})
            </button>
            <button
              onClick={() => setFilter('youtube')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filter === 'youtube'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Youtube className="w-3.5 h-3.5" />
              <span>YouTube</span>
            </button>
            <button
              onClick={() => setFilter('instagram')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filter === 'instagram'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </button>
            <button
              onClick={() => setFilter('facebook')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filter === 'facebook'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Facebook className="w-3.5 h-3.5" />
              <span>Facebook</span>
            </button>
          </div>
        </div>

        {/* Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredUpdates.map((item) => (
            <article
              key={item.id}
              className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-red-500/40 hover:bg-slate-900/90 transition-all flex flex-col justify-between group shadow-sm hover:shadow-lg hover:shadow-red-950/20"
            >
              <div>
                {/* Card Top Meta */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${getPlatformBadge(item.platform)}`}>
                      {getPlatformIcon(item.platform)}
                      <span>{item.badge}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    {item.viewsOrLikes && (
                      <span className="flex items-center gap-1 text-slate-400 font-medium">
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>{item.viewsOrLikes}</span>
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {item.platform === 'youtube' ? 'Uploaded to @samifuryofficial' : item.platform === 'instagram' ? 'Posted on @sami_fury_official' : 'Posted on Sami Fury Page'}
                </span>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase rounded-lg text-white transition-all shadow-sm ${
                    item.platform === 'youtube'
                      ? 'bg-red-600 hover:bg-red-500 shadow-red-950/40'
                      : item.platform === 'instagram'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90'
                      : 'bg-blue-600 hover:bg-blue-500 shadow-blue-950/40'
                  }`}
                >
                  <span>{item.platform === 'youtube' ? 'Watch Video' : 'View Post'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
