import { SocialLink, ReaderFeedback, TierVoteState, YouTubeVideo } from '../types/index.ts';

export const CREATOR_PROFILE = {
  name: 'Sami Fury',
  handle: '@samifuryofficial',
  avatarImage: '/src/assets/images/sami_fury_official_logo.jpg',
  bannerImage: '/src/assets/images/sami_fury_hub_1790954865006.jpg',
  setupImage: '/src/assets/images/sami_gaming_setup_1790947448610.jpg',
  title: 'Minecraft YouTuber & Content Creator',
  bio: "Welcome to the official social & updates portal for Minecraft YouTuber Sami Fury! Watch my latest Minecraft challenges, survival videos, tutorials, and join Sami's Empire Discord community below.",
  location: 'Global Minecraft Community',
  email: 'sgprobd@gmail.com',
  isLive: false,
  nextStreamTime: 'Live Streams Announced on Discord',
  stats: [
    { label: 'YouTube Subscribers', value: '766' },
    { label: 'Discord Members', value: '152 (44 Online)' },
    { label: 'Instagram Profile', value: '@sami_fury_official' },
    { label: 'Facebook Followers', value: '565' },
  ],
  games: ['Minecraft Java', 'Minecraft Bedrock', 'Hardcore Survival', 'Custom SMP', 'Bedwars'],
};

// ONLY the official links requested by user
export const INITIAL_SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'youtube',
    name: 'Sami Fury',
    platform: 'youtube',
    handle: '@samifuryofficial',
    url: 'https://youtube.com/@samifuryofficial?si=sZ1ou7C0hae0scRP',
    description: 'Main Minecraft YouTube channel. Watch Minecraft challenges, survival gameplay, Bedwars, and tips in Bangla.',
    badge: 'Official YouTube Channel',
    category: 'gaming',
    isPrimary: true,
    accentColor: '#FF0000',
    followersOrMembers: '766 Subscribers (29 Videos)',
  },
  {
    id: 'discord',
    name: "Sami's Empire",
    platform: 'discord',
    handle: 'discord.gg/K5f2Jnexf',
    url: 'https://discord.gg/K5f2Jnexf',
    description: 'Official Discord server [Actual Minecraft]! Chat with Sami, join voice channels, and get new video pings.',
    badge: 'Actual Minecraft Server',
    category: 'social',
    isPrimary: true,
    accentColor: '#5865F2',
    followersOrMembers: '152 Members (44 Online)',
  },
  {
    id: 'instagram',
    name: 'Sami Fury',
    platform: 'instagram',
    handle: '@sami_fury_official',
    url: 'https://www.instagram.com/sami_fury_official?igsh=MXVwMWFlZzhpbjhobw==',
    description: 'Official Instagram profile. Follow for updates, stories, behind-the-scenes clips, and highlights.',
    badge: 'Official Instagram',
    category: 'social',
    isPrimary: true,
    accentColor: '#E1306C',
    followersOrMembers: 'Official Profile (@sami_fury_official)',
  },
  {
    id: 'facebook',
    name: 'Sami Fury',
    platform: 'facebook',
    handle: 'fb.com/share/1CpqiUitDS',
    url: 'https://www.facebook.com/share/1CpqiUitDS/',
    description: 'Official Facebook page. Follow for video clips, community posts, and stream announcements.',
    badge: 'Official Facebook',
    category: 'social',
    isPrimary: true,
    accentColor: '#1877F2',
    followersOrMembers: '565 Followers',
  },
];

// ACTUAL REAL YOUTUBE UPLOADS FROM @SamiFuryOfficial
export const REAL_YOUTUBE_UPLOADS: YouTubeVideo[] = [
  {
    id: 'yt-ZQtWc_29o8I',
    videoId: 'ZQtWc_29o8I',
    title: 'Minecraft for Free Now! 😱 Download from Play Store (Nobody Knows!)',
    url: 'https://www.youtube.com/watch?v=ZQtWc_29o8I',
    thumbnail: 'https://i.ytimg.com/vi/ZQtWc_29o8I/hq720.jpg',
  },
  {
    id: 'yt-6WfBir8XgBc',
    videoId: '6WfBir8XgBc',
    title: 'বান্ধবীর সাথে REAL VERITY খেলতে গিয়ে যা হলো! 😱',
    url: 'https://www.youtube.com/watch?v=6WfBir8XgBc',
    thumbnail: 'https://i.ytimg.com/vi/6WfBir8XgBc/hq720.jpg',
  },
  {
    id: 'yt-IWqa2pVhhEA',
    videoId: 'IWqa2pVhhEA',
    title: 'UNLIMITED IRON on DAY 1?! | Minecraft Hardcore',
    url: 'https://www.youtube.com/watch?v=IWqa2pVhhEA',
    thumbnail: 'https://i.ytimg.com/vi/IWqa2pVhhEA/hq720.jpg',
  },
  {
    id: 'yt-fGEapYwbik0',
    videoId: 'fGEapYwbik0',
    title: 'Minecraft But I Have to Stay on ONE BOAT for 24 HOURS! 💀',
    url: 'https://www.youtube.com/watch?v=fGEapYwbik0',
    thumbnail: 'https://i.ytimg.com/vi/fGEapYwbik0/hq720.jpg',
  },
  {
    id: 'yt-u8s9btluE1w',
    videoId: 'u8s9btluE1w',
    title: 'Minecraft But ONE BLOCK 🤓 in Bangla || Sami Fury',
    url: 'https://www.youtube.com/watch?v=u8s9btluE1w',
    thumbnail: 'https://i.ytimg.com/vi/u8s9btluE1w/hq720.jpg',
  },
  {
    id: 'yt-PTGI0ypQx10',
    videoId: 'PTGI0ypQx10',
    title: 'Can I escape from the SIREN HEAD ☠️ || It was creepy || Sami Fury',
    url: 'https://www.youtube.com/watch?v=PTGI0ypQx10',
    thumbnail: 'https://i.ytimg.com/vi/PTGI0ypQx10/hq720.jpg',
  },
  {
    id: 'yt-qJ1CwaFN4QY',
    videoId: 'qJ1CwaFN4QY',
    title: 'Why MOJO Launcher got BANNED from Play Store in all countries🤔 | HIDDEN truth behind',
    url: 'https://www.youtube.com/watch?v=qJ1CwaFN4QY',
    thumbnail: 'https://i.ytimg.com/vi/qJ1CwaFN4QY/hq720.jpg',
  },
  {
    id: 'yt-LR4tOMxK2gw',
    videoId: 'LR4tOMxK2gw',
    title: 'I beat MINECRAFT but in CREATIVE | But without using any items 🤯 | Sami Fury',
    url: 'https://www.youtube.com/watch?v=LR4tOMxK2gw',
    thumbnail: 'https://i.ytimg.com/vi/LR4tOMxK2gw/hq720.jpg',
  },
  {
    id: 'yt-ylaCdJdEh-I',
    videoId: 'ylaCdJdEh-I',
    title: 'Look how beautiful my country looks in Minecraft!',
    url: 'https://www.youtube.com/watch?v=ylaCdJdEh-I',
    thumbnail: 'https://i.ytimg.com/vi/ylaCdJdEh-I/hqdefault.jpg',
  },
  {
    id: 'yt-bR2jUXJdzzQ',
    videoId: 'bR2jUXJdzzQ',
    title: 'Best Friend Turned Killer In This Minecraft SMP! 💀',
    url: 'https://www.youtube.com/watch?v=bR2jUXJdzzQ',
    thumbnail: 'https://i.ytimg.com/vi/bR2jUXJdzzQ/hq720.jpg',
  },
  {
    id: 'yt-Wj6459yM6Io',
    videoId: 'Wj6459yM6Io',
    title: 'This is why JAVA players are afraid of Pocket 🤯🤯 || Pt-1 || Sami Fury',
    url: 'https://www.youtube.com/watch?v=Wj6459yM6Io',
    thumbnail: 'https://i.ytimg.com/vi/Wj6459yM6Io/hq720.jpg',
  },
  {
    id: 'yt-bPRkYwqGs7w',
    videoId: 'bPRkYwqGs7w',
    title: 'WHITE SULTAN unexpected incident on the day of sacrifice 😨 || Sami Fury',
    url: 'https://www.youtube.com/watch?v=bPRkYwqGs7w',
    thumbnail: 'https://i.ytimg.com/vi/bPRkYwqGs7w/hq720.jpg',
  },
];

// ZERO FAKE FEEDBACKS - Starts 100% clean for real user submissions
export const INITIAL_READER_FEEDBACK: ReaderFeedback[] = [];

// INITIAL TIER VOTES - Clean start
export const INITIAL_TIER_VOTES: TierVoteState = {
  bad: 0,
  good: 0,
  better: 0,
  best: 0,
  goat: 0,
};
