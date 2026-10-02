import { useState, useEffect } from 'react';
import { Crown, ThumbsDown, ThumbsUp, Zap, Flame, Award, CheckCircle2, Sparkles } from 'lucide-react';
import { TierLevel, TierVoteState } from '../types/index.ts';
import { INITIAL_TIER_VOTES } from '../data/creatorData.ts';

interface RatingSectionProps {
  showToast: (msg: string) => void;
}

export default function RatingSection({ showToast }: RatingSectionProps) {
  const [votes, setVotes] = useState<TierVoteState>(() => {
    try {
      const saved = localStorage.getItem('sami_fury_tier_votes_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_TIER_VOTES;
  });

  const [selectedTier, setSelectedTier] = useState<TierLevel | null>(() => {
    try {
      return (localStorage.getItem('sami_fury_user_tier_vote') as TierLevel) || null;
    } catch {
      return null;
    }
  });

  const [showCelebration, setShowCelebration] = useState(false);

  const totalVotes = votes.bad + votes.good + votes.better + votes.best + votes.goat;

  const getPercentage = (count: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((count / totalVotes) * 100);
  };

  const handleVote = (tier: TierLevel) => {
    if (selectedTier === tier) {
      showToast(`You already rated Sami Fury as ${tier.toUpperCase()}!`);
      return;
    }

    const updatedVotes = { ...votes };
    if (selectedTier) {
      updatedVotes[selectedTier] = Math.max(0, updatedVotes[selectedTier] - 1);
    }
    updatedVotes[tier] = updatedVotes[tier] + 1;

    setVotes(updatedVotes);
    setSelectedTier(tier);

    try {
      localStorage.setItem('sami_fury_tier_votes_v1', JSON.stringify(updatedVotes));
      localStorage.setItem('sami_fury_user_tier_vote', tier);
    } catch {
      // ignore
    }

    if (tier === 'goat') {
      setShowCelebration(true);
      showToast('🐐 Voted GOAT! Greatest Of All Time!');
      setTimeout(() => setShowCelebration(false), 3500);
    } else {
      showToast(`Voted ${tier.toUpperCase()}! Thank you for the rating.`);
    }
  };

  const tiers: {
    id: TierLevel;
    label: string;
    sublabel: string;
    icon: any;
    color: string;
    borderColor: string;
    bgHover: string;
    accentClass: string;
  }[] = [
    {
      id: 'bad',
      label: 'Bad',
      sublabel: 'Room to improve',
      icon: ThumbsDown,
      color: 'text-slate-400',
      borderColor: 'border-slate-700/60 hover:border-slate-500',
      bgHover: 'hover:bg-slate-900/80',
      accentClass: 'bg-slate-700',
    },
    {
      id: 'good',
      label: 'Good',
      sublabel: 'Solid Minecraft content',
      icon: ThumbsUp,
      color: 'text-blue-400',
      borderColor: 'border-blue-500/30 hover:border-blue-500',
      bgHover: 'hover:bg-blue-950/20',
      accentClass: 'bg-blue-500',
    },
    {
      id: 'better',
      label: 'Better',
      sublabel: 'Great gameplay & builds',
      icon: Zap,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/30 hover:border-cyan-500',
      bgHover: 'hover:bg-cyan-950/20',
      accentClass: 'bg-cyan-500',
    },
    {
      id: 'best',
      label: 'Best',
      sublabel: 'Elite top-tier YouTuber',
      icon: Flame,
      color: 'text-amber-400',
      borderColor: 'border-amber-500/40 hover:border-amber-500',
      bgHover: 'hover:bg-amber-950/20',
      accentClass: 'bg-amber-500',
    },
    {
      id: 'goat',
      label: 'GOAT',
      sublabel: 'Greatest Of All Time! 🐐👑',
      icon: Crown,
      color: 'text-amber-300',
      borderColor: 'border-amber-400/80 hover:border-amber-300 ring-2 ring-amber-400/30',
      bgHover: 'hover:bg-amber-950/40',
      accentClass: 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500',
    },
  ];

  return (
    <section id="rating" className="w-full py-10 sm:py-14 border-t border-slate-800/80 relative overflow-hidden">
      {/* Visual celebration effects for GOAT vote */}
      {showCelebration && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
          <div className="animate-ping absolute w-96 h-96 rounded-full bg-amber-400/20 blur-2xl" />
          <div className="text-center p-6 rounded-2xl bg-black/80 backdrop-blur-md border border-amber-400 shadow-2xl animate-bounce">
            <span className="text-4xl sm:text-5xl">👑 🐐 ⚡</span>
            <p className="text-lg font-black text-amber-300 mt-2">GOAT TIER CONFIRMED!</p>
            <p className="text-xs text-slate-300">You rated Sami Fury Greatest Of All Time</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-950/40 border border-amber-500/30 mb-2">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>COMMUNITY TIER POLL</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Rate Sami Fury: Choose Your Tier
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            What tier does Sami Fury belong in as a Minecraft YouTuber and creator? Vote below to see live community consensus.
          </p>
        </div>

        {/* 5 Tiers Interactive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            const isSelected = selectedTier === tier.id;
            const voteCount = votes[tier.id];
            const pct = getPercentage(voteCount);

            return (
              <button
                key={tier.id}
                onClick={() => handleVote(tier.id)}
                className={`relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl text-left transition-all group border ${
                  isSelected
                    ? `${tier.borderColor} bg-slate-900 shadow-xl shadow-amber-500/10 scale-[1.02]`
                    : `bg-slate-900/60 ${tier.borderColor} ${tier.bgHover}`
                }`}
              >
                {/* Selected Checkmark Badge */}
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-bold text-emerald-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Your Pick</span>
                  </div>
                )}

                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-slate-950 border border-slate-800 ${tier.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className={`text-lg sm:text-xl font-black uppercase tracking-wide text-white group-hover:${tier.color} transition-colors`}>
                    {tier.label}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    {tier.sublabel}
                  </p>
                </div>

                {/* Live Count & Progress Bar */}
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-white tabular-nums">{voteCount.toLocaleString()}</span>
                    <span className="text-slate-400 font-medium tabular-nums">{pct}%</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${tier.accentClass}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Aggregate Tally Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Total Reader &amp; Viewer Votes
              </p>
              <p className="text-lg font-black text-white tabular-nums">
                {totalVotes.toLocaleString()} votes cast
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-400">
            {selectedTier ? (
              <span>
                You currently voted <strong className="text-amber-400 uppercase">{selectedTier}</strong>. Click another tier to switch anytime!
              </span>
            ) : (
              <span>Click any box above to cast your vote!</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
