export interface SocialLink {
  id: string;
  name: string;
  platform: 'discord' | 'facebook' | 'instagram' | 'youtube' | 'tiktok' | 'twitch' | 'telegram' | 'email';
  handle: string;
  url: string;
  description: string;
  badge?: string;
  category: 'social' | 'gaming' | 'contact';
  isPrimary?: boolean;
  accentColor: string;
  followersOrMembers?: string;
}

export interface SocialUpdate {
  id: string;
  platform: 'youtube' | 'instagram' | 'facebook';
  title: string;
  description: string;
  date: string;
  url: string;
  badge: string;
  viewsOrLikes?: string;
}

export interface CommunityUpdate {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'SMP Server' | 'Discord Event' | 'Bedwars' | 'Whitelist' | 'Milestone';
  url: string;
  badge: string;
  participantsOrMembers?: string;
}

export interface ReaderFeedback {
  id: string;
  name: string;
  category: 'Video Idea' | 'SMP Suggestion' | 'Website Feedback' | 'General Cheer';
  ratingTier?: 'Bad' | 'Good' | 'Better' | 'Best' | 'GOAT';
  message: string;
  timestamp: string;
}

export type TierLevel = 'bad' | 'good' | 'better' | 'best' | 'goat';

export interface TierVoteState {
  bad: number;
  good: number;
  better: number;
  best: number;
  goat: number;
}
