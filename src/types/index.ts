export interface YouTubeVideo {
  id: string;
  videoId: string;
  title: string;
  url: string;
  thumbnail: string;
}

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

export type FanMediaType = 'image' | 'png' | 'gif' | 'video' | 'youtube';

export interface FanArtPost {
  id: string;
  authorName: string;
  authorHandle?: string;
  title: string;
  caption?: string;
  mediaType: FanMediaType;
  mediaUrl: string; // URL or base64 data URL
  thumbnailUrl?: string;
  category: 'Fan Art' | 'Pixel Art / PNG' | 'GIF / Animation' | 'Gameplay Clip' | 'Meme' | 'Skin / Build';
  likesCount: number;
  likedByMe?: boolean;
  createdAt: string;
}

export interface LiveStatsData {
  youtubeSubs: string;
  discordMembers: string;
  discordOnline: string;
  instagramFollowers: string;
  facebookFollowers: string;
  isLive: boolean;
}
