import { useState } from 'react';
import { Menu, X, Share2, ExternalLink } from 'lucide-react';
import { CREATOR_PROFILE } from '../data/creatorData.ts';

interface NavbarProps {
  onOpenShare: () => void;
}

export default function Navbar({ onOpenShare }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Official Links', href: '#links' },
    { label: 'Social Updates', href: '#social-updates' },
    { label: 'Community Updates', href: '#community-updates' },
    { label: 'Rate Sami', href: '#rating' },
    { label: 'Reader Feedback', href: '#feedback' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#08090d]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand wordmark with exact logo thumbnail */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 group shrink-0"
        >
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-amber-400/60 shadow-md shadow-amber-500/20 shrink-0 group-hover:scale-105 transition-transform bg-amber-400">
            <img 
              src={CREATOR_PROFILE.avatarImage} 
              alt="Sami Fury Logo" 
              className="w-full h-full object-cover" 
            />
          </div>
          <span 
            className="text-xl sm:text-2xl font-black tracking-wider text-white group-hover:text-amber-400 transition-colors uppercase"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            SAMI FURY
          </span>
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block" title="Official Verified Page" />
        </a>

        {/* Zone 2: Navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-amber-400 transition-colors whitespace-nowrap py-1 font-semibold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-2.5">
          {/* Share Button */}
          <button
            onClick={onOpenShare}
            className="p-2 text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/70 rounded-lg transition-colors cursor-pointer"
            title="Share Sami Fury's profile"
            aria-label="Share profile"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Primary YouTube CTA */}
          <a
            href="https://youtube.com/@samifuryofficial?si=sZ1ou7C0hae0scRP"
            target="_blank"
            rel="noopener noreferrer"
            title="Subscribe to Sami Fury on YouTube"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold tracking-wide uppercase text-white bg-red-600 hover:bg-red-500 rounded-lg transition-all shadow-md shadow-red-950/40 whitespace-nowrap"
          >
            <span>Subscribe (766)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0c13] border-b border-slate-800 px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-md text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60"
            >
              <span>{link.label}</span>
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="https://youtube.com/@samifuryofficial?si=sZ1ou7C0hae0scRP"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold tracking-wide uppercase text-white bg-red-600 rounded-lg"
            >
              <span>Subscribe on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://discord.gg/K5f2Jnexf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold tracking-wide uppercase text-white bg-purple-600 rounded-lg"
            >
              <span>Join Sami's Empire Discord</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
