import { useState } from 'react';
import { X, Copy, Check, QrCode, Share2, Facebook, Instagram, MessageSquare } from 'lucide-react';
import { CREATOR_PROFILE } from '../data/creatorData.ts';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  showToast: (msg: string) => void;
}

export default function ShareModal({ isOpen, onClose, showToast }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    showToast('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-[#0d0f17] border border-purple-500/40 p-6 sm:p-7 shadow-2xl text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors"
          aria-label="Close share modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Profile</span>
        </div>
        <h3 className="text-xl font-bold text-white">Share Sami Fury Hub</h3>
        <p className="text-xs text-slate-400 mt-1 mb-5">
          Share this official link with friends, squad mates, or add it to your social media bio.
        </p>

        {/* Mini QR Code visual container */}
        <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950 border border-slate-800 mb-5">
          <div className="w-36 h-36 bg-white p-3 rounded-xl flex items-center justify-center shadow-inner">
            {/* SVG simulated crisp QR code with Sami Fury crest in center */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-slate-950 fill-current">
              {/* Corner position markers */}
              <rect x="0" y="0" width="30" height="30" rx="3" />
              <rect x="5" y="5" width="20" height="20" rx="2" fill="#fff" />
              <rect x="9" y="9" width="12" height="12" rx="1" />

              <rect x="70" y="0" width="30" height="30" rx="3" />
              <rect x="75" y="5" width="20" height="20" rx="2" fill="#fff" />
              <rect x="79" y="9" width="12" height="12" rx="1" />

              <rect x="0" y="70" width="30" height="30" rx="3" />
              <rect x="5" y="75" width="20" height="20" rx="2" fill="#fff" />
              <rect x="9" y="79" width="12" height="12" rx="1" />

              {/* Data module pattern */}
              <rect x="36" y="6" width="6" height="6" />
              <rect x="48" y="6" width="14" height="6" />
              <rect x="36" y="18" width="8" height="6" />
              <rect x="50" y="18" width="12" height="6" />
              <rect x="6" y="36" width="6" height="8" />
              <rect x="18" y="36" width="12" height="8" />
              <rect x="6" y="48" width="14" height="6" />
              <rect x="24" y="48" width="6" height="14" />
              <rect x="36" y="36" width="28" height="28" rx="4" fill="#7c3aed" />
              <text x="50" y="54" fontSize="18" fontWeight="bold" fill="#fff" textAnchor="middle" dominantBaseline="middle">S</text>
              <rect x="70" y="36" width="10" height="6" />
              <rect x="86" y="36" width="8" height="6" />
              <rect x="70" y="48" width="14" height="8" />
              <rect x="36" y="70" width="6" height="14" />
              <rect x="48" y="70" width="14" height="6" />
              <rect x="70" y="70" width="8" height="8" />
              <rect x="84" y="70" width="10" height="6" />
              <rect x="70" y="84" width="24" height="6" />
            </svg>
          </div>
          <span className="text-[11px] text-slate-400 mt-2 font-mono">Scan for Instant Mobile Link</span>
        </div>

        {/* Copy Link Input Bar */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-950 border border-slate-800">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="flex-1 bg-transparent px-2.5 text-xs text-slate-300 font-mono focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Quick Social Shares */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 transition-colors"
          >
            <Facebook className="w-3.5 h-3.5" />
            <span>Facebook</span>
          </a>
          <a
            href="https://discord.gg/K5f2Jnexf"
            target="_blank"
            rel="noopener noreferrer"
            title="Join Sami's Empire Discord"
            className="flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Discord</span>
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Check out Sami Fury Official Page: ' + currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 transition-colors"
          >
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
