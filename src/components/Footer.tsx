import { ArrowUp, Mail, ShieldCheck } from 'lucide-react';
import { CREATOR_PROFILE } from '../data/creatorData.ts';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#07080c] py-10 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Identity */}
          <div className="text-center md:text-left space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span 
                className="text-lg font-black tracking-wider text-white uppercase"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                SAMI FURY
              </span>
              <ShieldCheck className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-xs text-slate-500">
              Official Minecraft YouTuber Hub &amp; Social Directory
            </p>
          </div>

          {/* Quick links & Contact */}
          <div className="flex flex-col items-center md:items-end gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-3.5 flex-wrap justify-center">
              <a href="#links" className="hover:text-amber-400 transition-colors">Official Links</a>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <a href="#social-updates" className="hover:text-red-400 transition-colors">Social Updates</a>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <a href="#community-updates" className="hover:text-indigo-400 transition-colors">Community Updates</a>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <a href="#rating" className="hover:text-amber-400 transition-colors">Rate Sami (GOAT)</a>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <a href="#feedback" className="hover:text-emerald-400 transition-colors">Reader Feedback</a>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-500 flex-wrap justify-center">
              <a href="https://youtube.com/@samifuryofficial?si=sZ1ou7C0hae0scRP" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">
                YouTube
              </a>
              <span>·</span>
              <a href="https://discord.gg/K5f2Jnexf" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
                Discord
              </a>
              <span>·</span>
              <a href="https://www.instagram.com/sami_fury_official?igsh=MXVwMWFlZzhpbjhobw==" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
                Instagram
              </a>
              <span>·</span>
              <a href="https://www.facebook.com/share/1CpqiUitDS/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                Facebook
              </a>
            </div>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600 gap-3">
          <p>© {new Date().getFullYear()} Sami Fury. All rights reserved.</p>
          <p className="text-slate-600">Built for the Fury Squad &amp; Gaming Community</p>
        </div>
      </div>
    </footer>
  );
}
