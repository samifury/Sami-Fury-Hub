import { MessageSquare, ShieldCheck, Users, ExternalLink, Calendar, Swords, Trophy, Sparkles } from 'lucide-react';
import { CommunityUpdate } from '../types/index.ts';

interface CommunityUpdatesSectionProps {
  updates: CommunityUpdate[];
  showToast: (msg: string) => void;
}

export default function CommunityUpdatesSection({ updates }: CommunityUpdatesSectionProps) {
  const getTypeIcon = (type: CommunityUpdate['type']) => {
    switch (type) {
      case 'Whitelist':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'Bedwars':
        return <Swords className="w-4 h-4 text-amber-400" />;
      case 'Milestone':
        return <Trophy className="w-4 h-4 text-purple-400" />;
      case 'Discord Event':
      case 'SMP Server':
      default:
        return <MessageSquare className="w-4 h-4 text-indigo-400" />;
    }
  };

  const getTypeStyle = (type: CommunityUpdate['type']) => {
    switch (type) {
      case 'Whitelist':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40';
      case 'Bedwars':
        return 'bg-amber-950/60 text-amber-300 border-amber-500/40';
      case 'Milestone':
        return 'bg-purple-950/60 text-purple-300 border-purple-500/40';
      case 'Discord Event':
      case 'SMP Server':
      default:
        return 'bg-indigo-950/60 text-indigo-300 border-indigo-500/40';
    }
  };

  return (
    <section id="community-updates" className="w-full py-10 sm:py-14 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1.5">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>SAMI'S EMPIRE SMP &amp; DISCORD</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Community Updates &amp; Events
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Server whitelist status, Bedwars brackets, Realm events, and community milestones for Sami's Empire Discord members.
            </p>
          </div>

          <a
            href="https://discord.gg/K5f2Jnexf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wide uppercase text-white bg-[#5865F2] hover:bg-[#4752c4] rounded-xl transition-all shadow-md shadow-indigo-950/40 whitespace-nowrap self-start md:self-auto"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Join Sami's Empire Discord</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Highlight Banner: SMP Whitelist Status */}
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900/90 to-purple-950/40 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Current Server Status</span>
                <span className="text-xs text-slate-500">·</span>
                <span className="text-xs text-slate-300">Minecraft Java 1.21.x</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                Sami's Empire SMP Whitelist: Season 3 Applications ACTIVE
              </h3>
              <p className="text-xs text-slate-400">
                Submit your Minecraft IGN &amp; building portfolio in the Discord #smp-whitelist channel to join the realm.
              </p>
            </div>
          </div>

          <a
            href="https://discord.gg/K5f2Jnexf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm shrink-0 whitespace-nowrap"
          >
            <span>Apply on Discord</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {updates.map((item) => (
            <article
              key={item.id}
              className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-900/90 transition-all flex flex-col justify-between group shadow-sm hover:shadow-lg hover:shadow-indigo-950/20"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${getTypeStyle(item.type)}`}>
                    {getTypeIcon(item.type)}
                    <span>{item.badge}</span>
                  </span>

                  <div className="flex items-center gap-2.5 text-xs text-slate-500">
                    {item.participantsOrMembers && (
                      <span className="text-slate-400 font-medium">{item.participantsOrMembers}</span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{item.date}</span>
                    </span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400">Sami's Empire Community</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase rounded-lg text-white bg-[#5865F2] hover:bg-[#4752c4] transition-all shadow-sm shadow-indigo-950/40"
                >
                  <span>Open Discord</span>
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
