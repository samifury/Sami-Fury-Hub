import { useState } from 'react';
import { 
  ExternalLink, 
  Copy, 
  Check, 
  Search, 
  Users, 
  Mail, 
  Tv, 
  MessageSquare, 
  Instagram, 
  Facebook, 
  Youtube, 
  Video, 
  Send 
} from 'lucide-react';
import { SocialLink } from '../types/index.ts';

interface LinksSectionProps {
  links: SocialLink[];
  showToast: (msg: string) => void;
  isBioMode: boolean;
}

export default function LinksSection({ links, showToast, isBioMode }: LinksSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'social' | 'gaming' | 'contact'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getPlatformIcon = (platform: SocialLink['platform']) => {
    switch (platform) {
      case 'discord':
        return <MessageSquare className="w-5 h-5 text-[#5865F2]" />;
      case 'facebook':
        return <Facebook className="w-5 h-5 text-[#1877F2]" />;
      case 'instagram':
        return <Instagram className="w-5 h-5 text-[#E1306C]" />;
      case 'youtube':
        return <Youtube className="w-5 h-5 text-[#FF0000]" />;
      case 'tiktok':
        return <Video className="w-5 h-5 text-[#00F2FE]" />;
      case 'twitch':
        return <Tv className="w-5 h-5 text-[#9146FF]" />;
      case 'telegram':
        return <Send className="w-5 h-5 text-[#229ED9]" />;
      case 'email':
        return <Mail className="w-5 h-5 text-[#10B981]" />;
      default:
        return <ExternalLink className="w-5 h-5 text-slate-400" />;
    }
  };

  const handleCopyLink = (link: SocialLink, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(link.url);
    setCopiedId(link.id);
    showToast(`Copied ${link.name} link!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredLinks = links.filter((link) => {
    const matchesFilter = activeFilter === 'all' || link.category === activeFilter;
    const matchesSearch = 
      link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="links" className="w-full py-8 sm:py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-widest mb-1">
              <span>OFFICIAL CHANNELS</span>
              <span aria-hidden="true">·</span>
              <span>VERIFIED DIRECTORY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Official Links &amp; Communities
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Connect directly with Minecraft YouTuber Sami Fury across all verified channels — YouTube videos, Sami's Empire Discord [Actual Minecraft], Instagram, and Facebook.
            </p>
          </div>

          {/* Interactive Category Filter (Buttons with click handlers) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl overflow-x-auto self-start md:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Links ({links.length})
            </button>
            <button
              onClick={() => setActiveFilter('gaming')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'gaming'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              YouTube
            </button>
            <button
              onClick={() => setActiveFilter('social')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'social'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Discord &amp; Socials
            </button>
          </div>
        </div>

        {/* Search input if in full mode */}
        {!isBioMode && (
          <div className="relative mb-6 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search YouTube, Discord [Actual Minecraft], Instagram, Facebook..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-900/60 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/60 transition-colors"
            />
          </div>
        )}

        {/* Cards Grid */}
        <div 
          className={
            isBioMode 
              ? "max-w-xl mx-auto space-y-3.5" 
              : "grid grid-cols-1 md:grid-cols-2 gap-4"
          }
        >
          {filteredLinks.map((link) => {
            const isCopied = copiedId === link.id;

            if (isBioMode) {
              // Compact Bio Tree Item
              return (
                <div
                  key={link.id}
                  className="group relative flex items-center justify-between p-4 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-purple-500/50 hover:bg-slate-800/70 transition-all shadow-md hover:shadow-purple-950/20"
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 flex-1 min-w-0 pr-2"
                  >
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-950 border border-slate-800 shrink-0 group-hover:scale-105 transition-transform"
                      style={{ borderColor: `${link.accentColor}40` }}
                    >
                      {getPlatformIcon(link.platform)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white group-hover:text-purple-300 transition-colors truncate">
                          {link.name}
                        </span>
                        {link.badge && (
                          <span className="text-[10px] text-amber-400 font-medium">
                            · {link.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 truncate">
                        {link.followersOrMembers || link.handle}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={(e) => handleCopyLink(link, e)}
                      className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/60 transition-colors"
                      title="Copy Link"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-purple-400 hover:text-purple-300 rounded-lg hover:bg-purple-950/50 transition-colors"
                      title="Open Link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            }

            // Full Rich Link Card
            return (
              <div
                key={link.id}
                className="group relative flex flex-col justify-between p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 hover:bg-slate-900/90 transition-all shadow-sm hover:shadow-lg hover:shadow-purple-950/20"
              >
                <div>
                  {/* Top Bar inside card */}
                  <div className="flex items-start justify-between gap-3 mb-3.5">
                    <div 
                      className="w-11 h-11 rounded-xl flex items-center justify-center bg-slate-950/80 border border-slate-800 group-hover:scale-105 transition-transform"
                      style={{ borderColor: `${link.accentColor}50` }}
                    >
                      {getPlatformIcon(link.platform)}
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      {link.followersOrMembers && (
                        <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                          <Users className="w-3 h-3 text-slate-500" />
                          <span>{link.followersOrMembers}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Title & Handle */}
                  <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                    {link.name}
                  </h3>
                  <p className="text-xs text-amber-400 font-mono mt-0.5">
                    {link.handle}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mt-2.5 line-clamp-2">
                    {link.description}
                  </p>
                </div>

                {/* Actions bottom row */}
                <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={(e) => handleCopyLink(link, e)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white bg-slate-950/60 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase rounded-lg text-white transition-all shadow-sm ${
                      link.platform === 'youtube'
                        ? 'bg-red-600 hover:bg-red-500 shadow-red-950/40'
                        : link.platform === 'discord'
                        ? 'bg-[#5865F2] hover:bg-[#4752c4] shadow-indigo-950/40'
                        : link.platform === 'instagram'
                        ? 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90'
                        : 'bg-blue-600 hover:bg-blue-500 shadow-blue-950/40'
                    }`}
                  >
                    <span>{link.platform === 'youtube' ? 'Subscribe' : link.platform === 'discord' ? 'Join Server' : 'Follow'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state if search doesn't match */}
        {filteredLinks.length === 0 && (
          <div className="text-center py-12 rounded-2xl bg-slate-900/30 border border-slate-800">
            <p className="text-slate-400 text-sm">No official links matched your search "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="mt-3 px-4 py-2 text-xs font-semibold text-purple-400 hover:text-purple-300"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
