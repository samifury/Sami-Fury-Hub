import { useState } from 'react';
import { MessageSquarePlus, Send, Lightbulb, CheckCircle, Sparkles, Filter, User } from 'lucide-react';
import { ReaderFeedback } from '../types/index.ts';

interface FeedbackSectionProps {
  feedbacks: ReaderFeedback[];
  onAddFeedback: (fb: ReaderFeedback) => void;
  showToast: (msg: string) => void;
}

export default function FeedbackSection({ feedbacks, onAddFeedback, showToast }: FeedbackSectionProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ReaderFeedback['category']>('Video Idea');
  const [ratingTier, setRatingTier] = useState<ReaderFeedback['ratingTier']>('GOAT');
  const [message, setMessage] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      showToast('Please enter your name and message.');
      return;
    }

    setIsSubmitting(true);

    const newFeedback: ReaderFeedback = {
      id: `fb-${Date.now()}`,
      name: name.trim(),
      category,
      ratingTier,
      message: message.trim(),
      timestamp: 'Just now',
    };

    onAddFeedback(newFeedback);
    showToast('Feedback submitted! Thank you for supporting the channel.');

    setName('');
    setMessage('');
    setIsSubmitting(false);
  };

  const filteredFeedbacks = feedbacks.filter(
    (fb) => activeFilter === 'all' || fb.category === activeFilter
  );

  const getCategoryBadgeClass = (cat: ReaderFeedback['category']) => {
    switch (cat) {
      case 'Video Idea':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'SMP Suggestion':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
      case 'Website Feedback':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'General Cheer':
      default:
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
  };

  return (
    <section id="feedback" className="w-full py-10 sm:py-14 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1.5">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>READER &amp; VIEWER VOICES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Reader Feedback &amp; Video Suggestions
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Have an idea for a Minecraft 100 Days theme, SMP challenge, or feedback for Sami Fury? Share it directly below.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 border border-slate-800 px-3.5 py-2 rounded-xl">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Sami reviews viewer ideas for upcoming video series</span>
          </div>
        </div>

        {/* 2-Column Layout: Form on Left, Reader Feed on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form (5 Cols) */}
          <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-800">
              <MessageSquarePlus className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">Submit Your Thoughts</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                  Your Name / Minecraft IGN
                </label>
                <input
                  type="text"
                  placeholder="e.g. DiamondMiner_99"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={30}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ReaderFeedback['category'])}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option value="Video Idea">Video Idea</option>
                    <option value="SMP Suggestion">SMP Suggestion</option>
                    <option value="Website Feedback">Website Feedback</option>
                    <option value="General Cheer">General Cheer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                    Tier Rating
                  </label>
                  <select
                    value={ratingTier}
                    onChange={(e) => setRatingTier(e.target.value as ReaderFeedback['ratingTier'])}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-colors font-bold text-amber-400"
                  >
                    <option value="GOAT">GOAT 🐐</option>
                    <option value="Best">Best 🔥</option>
                    <option value="Better">Better ⚡</option>
                    <option value="Good">Good 👍</option>
                    <option value="Bad">Bad 👎</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                  Your Message &amp; Suggestions
                </label>
                <textarea
                  rows={4}
                  placeholder="Drop a Minecraft challenge idea, suggest a build for the SMP, or share your feedback..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={300}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  required
                />
                <span className="text-[11px] text-slate-500 float-right mt-1">
                  {300 - message.length} chars left
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold uppercase rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/10 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Feedback</span>
              </button>
            </form>
          </div>

          {/* Right Column: Feed of Reader Feedbacks (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Filter pills */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-900/90 border border-slate-800 rounded-xl">
                {['all', 'Video Idea', 'SMP Suggestion', 'Website Feedback', 'General Cheer'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                      activeFilter === cat
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cat === 'all' ? 'All Feedbacks' : cat}
                  </button>
                ))}
              </div>

              <span className="text-xs text-slate-500 font-medium">
                {filteredFeedbacks.length} messages
              </span>
            </div>

            {/* List */}
            <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
              {filteredFeedbacks.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-white">{item.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getCategoryBadgeClass(item.category)}`}>
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.ratingTier && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30">
                          {item.ratingTier}
                        </span>
                      )}
                      <span className="text-[11px] text-slate-500">{item.timestamp}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-8">
                    {item.message}
                  </p>
                </div>
              ))}

              {filteredFeedbacks.length === 0 && (
                <div className="p-8 text-center text-xs text-slate-500 rounded-xl bg-slate-900/30 border border-slate-800">
                  No feedback in this category yet. Be the first to share an idea!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
