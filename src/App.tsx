import { useState } from 'react';
import Navbar from './components/Navbar.tsx';
import HeroSection from './components/HeroSection.tsx';
import LinksSection from './components/LinksSection.tsx';
import LatestUploadsSection from './components/LatestUploadsSection.tsx';
import RatingSection from './components/RatingSection.tsx';
import FeedbackSection from './components/FeedbackSection.tsx';
import ShareModal from './components/ShareModal.tsx';
import Footer from './components/Footer.tsx';
import Toast from './components/Toast.tsx';

import { 
  INITIAL_SOCIAL_LINKS, 
  INITIAL_READER_FEEDBACK 
} from './data/creatorData.ts';
import { ReaderFeedback } from './types/index.ts';

export default function App() {
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Fan feedback state - starts 100% clean with zero fake messages
  const [feedbacks, setFeedbacks] = useState<ReaderFeedback[]>(() => {
    try {
      const saved = localStorage.getItem('sami_fury_fan_feedback_clean');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_READER_FEEDBACK;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleAddFeedback = (newFb: ReaderFeedback) => {
    const updated = [newFb, ...feedbacks];
    setFeedbacks(updated);
    try {
      localStorage.setItem('sami_fury_fan_feedback_clean', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col relative selection:bg-purple-600 selection:text-white bg-grid-pattern">
      {/* Background ambient accents */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Bar Navigation */}
      <Navbar
        onOpenShare={() => setIsShareModalOpen(true)}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-2">
        {/* Hero Section: Exact Logo Mascot, YouTube Spotlight & Real Community Stats */}
        <HeroSection
          onOpenShare={() => setIsShareModalOpen(true)}
          showToast={showToast}
        />

        {/* 1. Official Links Section */}
        <LinksSection
          links={INITIAL_SOCIAL_LINKS}
          showToast={showToast}
          isBioMode={false}
        />

        {/* 2. Real Latest YouTube Uploads Section */}
        <LatestUploadsSection
          showToast={showToast}
        />

        {/* 3. Community Tier Rating: Rate Sami Fury (Bad, Good, Better, Best, GOAT) */}
        <RatingSection
          showToast={showToast}
        />

        {/* 4. Fan Feedback & Video Suggestions (Starts Clean, Real Submissions Only) */}
        <FeedbackSection
          feedbacks={feedbacks}
          onAddFeedback={handleAddFeedback}
          showToast={showToast}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Share / QR Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        showToast={showToast}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  );
}
