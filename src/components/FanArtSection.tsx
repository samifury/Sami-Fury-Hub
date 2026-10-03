import { useState, useRef } from 'react';
import { 
  Palette, 
  Upload, 
  Image as ImageIcon, 
  Film, 
  Sparkles, 
  Heart, 
  ExternalLink, 
  X, 
  Plus, 
  Play, 
  Check, 
  Download, 
  Share2, 
  FileCode, 
  Trash2,
  Maximize2
} from 'lucide-react';
import { FanArtPost, FanMediaType } from '../types/index.ts';

interface FanArtSectionProps {
  posts: FanArtPost[];
  onAddPost: (post: FanArtPost) => void;
  onToggleLike: (id: string) => void;
  onDeletePost: (id: string) => void;
  showToast: (msg: string) => void;
}

export default function FanArtSection({
  posts,
  onAddPost,
  onToggleLike,
  onDeletePost,
  showToast,
}: FanArtSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<FanArtPost | null>(null);

  // Form State
  const [authorName, setAuthorName] = useState('');
  const [authorHandle, setAuthorHandle] = useState('');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState<FanArtPost['category']>('Fan Art');
  const [mediaType, setMediaType] = useState<FanMediaType>('image');
  const [mediaUrl, setMediaUrl] = useState('');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories: string[] = [
    'all',
    'Fan Art',
    'Pixel Art / PNG',
    'GIF / Animation',
    'Gameplay Clip',
    'Skin / Build',
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: max 10MB
    if (file.size > 10 * 1024 * 1024) {
      showToast('File size must be under 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setFilePreview(result);
      setMediaUrl(result);

      if (file.type.includes('gif')) {
        setMediaType('gif');
      } else if (file.type.includes('png')) {
        setMediaType('png');
      } else if (file.type.includes('video')) {
        setMediaType('video');
      } else {
        setMediaType('image');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (url: string) => {
    setMediaUrl(url);
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      setMediaType('youtube');
    } else if (url.endsWith('.gif') || url.includes('giphy.com') || url.includes('tenor.com')) {
      setMediaType('gif');
    } else if (url.endsWith('.png')) {
      setMediaType('png');
    } else if (url.endsWith('.mp4') || url.endsWith('.webm')) {
      setMediaType('video');
    } else {
      setMediaType('image');
    }
  };

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim()) {
      showToast('Please enter your name or handle');
      return;
    }
    if (!title.trim()) {
      showToast('Please enter a title for your creation');
      return;
    }
    if (!mediaUrl.trim()) {
      showToast('Please upload a file or provide a valid media link');
      return;
    }

    const newPost: FanArtPost = {
      id: `fan-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      authorName: authorName.trim(),
      authorHandle: authorHandle.trim() ? (authorHandle.startsWith('@') ? authorHandle.trim() : `@${authorHandle.trim()}`) : `@${authorName.trim().toLowerCase().replace(/\s+/g, '_')}`,
      title: title.trim(),
      caption: caption.trim() || undefined,
      category,
      mediaType,
      mediaUrl: mediaUrl.trim(),
      thumbnailUrl: mediaType === 'youtube' && getYouTubeId(mediaUrl) 
        ? `https://i.ytimg.com/vi/${getYouTubeId(mediaUrl)}/hqdefault.jpg` 
        : undefined,
      likesCount: 1,
      likedByMe: true,
      createdAt: 'Just now',
    };

    onAddPost(newPost);
    showToast('Your fan art / creation has been posted to the hub!');

    // Reset Form
    setAuthorName('');
    setAuthorHandle('');
    setTitle('');
    setCaption('');
    setMediaUrl('');
    setFilePreview(null);
    setIsUploadModalOpen(false);
  };

  const filteredPosts = posts.filter((post) => {
    if (activeCategory === 'all') return true;
    return post.category === activeCategory;
  });

  return (
    <section id="fan-art" className="w-full py-12 sm:py-16 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1.5">
              <Palette className="w-4 h-4 text-amber-400" />
              <span>COMMUNITY CREATIVE ZONE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>Fan Art & Media Showcase</span>
              <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full">
                {posts.length} Fan Creations
              </span>
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Post your Sami Fury fan arts, PNG skins, GIF animations, YouTube clips, and Minecraft builds. Share your creativity with the Empire!
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all transform hover:scale-102 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Post Your Art / Media</span>
            </button>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Creations' : cat}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="group flex flex-col rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-400/50 hover:bg-slate-900/90 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-amber-500/10"
            >
              {/* Media Thumbnail / Viewport */}
              <div 
                className="relative aspect-square w-full overflow-hidden bg-slate-950 cursor-pointer flex items-center justify-center"
                onClick={() => setSelectedPost(post)}
              >
                {post.mediaType === 'youtube' ? (
                  <div className="relative w-full h-full">
                    <img
                      src={post.thumbnailUrl || `https://i.ytimg.com/vi/${getYouTubeId(post.mediaUrl)}/hqdefault.jpg`}
                      alt={post.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                      <div className="w-11 h-11 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                ) : post.mediaType === 'video' ? (
                  <div className="relative w-full h-full">
                    <video
                      src={post.mediaUrl}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-amber-500/90 text-slate-950 flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={post.mediaUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                )}

                {/* Top Badge: Media Type & Category */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md bg-black/75 backdrop-blur-md text-amber-300 border border-amber-400/30">
                    {post.category}
                  </span>
                  <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase rounded bg-slate-950/80 text-slate-300 border border-slate-700">
                    {post.mediaType.toUpperCase()}
                  </span>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                  <span className="text-xs text-white font-semibold flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Click to view</span>
                  </span>
                </div>
              </div>

              {/* Card Footer / Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 
                    onClick={() => setSelectedPost(post)}
                    className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1 cursor-pointer"
                  >
                    {post.title}
                  </h3>
                  {post.caption && (
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {post.caption}
                    </p>
                  )}
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="truncate pr-2">
                    <p className="text-xs font-bold text-slate-200 truncate">
                      {post.authorName}
                    </p>
                    <p className="text-[10px] text-amber-400/80 font-mono truncate">
                      {post.authorHandle || `@${post.authorName.toLowerCase()}`}
                    </p>
                  </div>

                  {/* Likes and actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onToggleLike(post.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        post.likedByMe
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${post.likedByMe ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span>{post.likesCount}</span>
                    </button>

                    {post.id.startsWith('fan-') && (
                      <button
                        onClick={() => onDeletePost(post.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Delete this post"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 rounded-3xl bg-slate-900/40 border border-slate-800 p-8">
            <Palette className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No creations in this category yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              Be the first fan to upload artwork, PNG skins, GIF animations, or video clips for Sami Fury!
            </p>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-amber-400 text-slate-950 uppercase tracking-wider hover:bg-amber-300 transition-colors"
            >
              Post First Fan Art
            </button>
          </div>
        )}
      </div>

      {/* Upload Post Modal */}
      {isUploadModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in"
          onClick={() => setIsUploadModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-lg bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl shadow-amber-500/10 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Post Fan Art or Media</h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Author & Handle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Name / Nickname *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DiamondMiner"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 focus:border-amber-400 focus:outline-none text-white placeholder-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Social Handle (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="@yourhandle"
                    value={authorHandle}
                    onChange={(e) => setAuthorHandle(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 focus:border-amber-400 focus:outline-none text-white placeholder-slate-500 font-mono"
                  />
                </div>
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Creation Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sami Fury Anime Artwork"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 focus:border-amber-400 focus:outline-none text-white placeholder-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as FanArtPost['category'])}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 focus:border-amber-400 focus:outline-none text-white"
                  >
                    <option value="Fan Art">Fan Art</option>
                    <option value="Pixel Art / PNG">Pixel Art / PNG</option>
                    <option value="GIF / Animation">GIF / Animation</option>
                    <option value="Gameplay Clip">Gameplay Clip</option>
                    <option value="Skin / Build">Skin / Build</option>
                  </select>
                </div>
              </div>

              {/* Upload Mode Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Media Source
                </label>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setUploadMode('file')}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      uploadMode === 'file'
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload File (PNG, GIF, MP4, Pic)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadMode('url')}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      uploadMode === 'url'
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Media URL / YouTube link</span>
                  </button>
                </div>

                {uploadMode === 'file' ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-800 hover:border-amber-400/60 rounded-2xl p-5 text-center cursor-pointer bg-slate-900/40 hover:bg-slate-900/80 transition-colors"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,image/png,image/gif,image/webp,video/mp4,video/webm"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Upload className="w-7 h-7 text-amber-400 mx-auto mb-2" />
                    <p className="text-xs font-bold text-white mb-0.5">
                      {filePreview ? 'File Selected! Click to change' : 'Click to select picture, PNG, GIF, or Video'}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Supports PNG, JPG, GIF, WebM, MP4 (up to 10MB)
                    </p>
                  </div>
                ) : (
                  <div>
                    <input
                      type="url"
                      placeholder="Paste image URL, GIF link (Tenor/Giphy), or YouTube link"
                      value={mediaUrl}
                      onChange={(e) => handleUrlChange(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-800 focus:border-amber-400 focus:outline-none text-white placeholder-slate-500"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                      Direct image/gif URLs or YouTube video links supported
                    </p>
                  </div>
                )}
              </div>

              {/* Preview if uploaded */}
              {mediaUrl && (
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg bg-black overflow-hidden shrink-0 flex items-center justify-center">
                    {mediaType === 'youtube' ? (
                      <div className="text-red-500 text-xs font-bold">YouTube</div>
                    ) : mediaType === 'video' ? (
                      <video src={mediaUrl} className="w-full h-full object-cover" />
                    ) : (
                      <img src={mediaUrl} alt="Preview" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Media Ready ({mediaType.toUpperCase()})</span>
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">
                      {mediaUrl.substring(0, 45)}...
                    </p>
                  </div>
                </div>
              )}

              {/* Caption */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Message / Caption
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe your creation or say hello to Sami..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 focus:border-amber-400 focus:outline-none text-white placeholder-slate-500 resize-none"
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  Publish Creation to Fan Hub
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox / Fullscreen Viewer Modal */}
      {selectedPost && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedPost(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/90">
              <div className="flex items-center gap-2.5 truncate pr-4">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  {selectedPost.category}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white truncate">
                  {selectedPost.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {selectedPost.mediaType !== 'youtube' && (
                  <a
                    href={selectedPost.mediaUrl}
                    download={`${selectedPost.title}.png`}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Download file"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                )}
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Media Display */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] max-h-[60vh]">
              {selectedPost.mediaType === 'youtube' ? (
                <div className="w-full aspect-video">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(selectedPost.mediaUrl)}?autoplay=1&rel=0`}
                    title={selectedPost.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              ) : selectedPost.mediaType === 'video' ? (
                <video
                  src={selectedPost.mediaUrl}
                  controls
                  autoPlay
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <img
                  src={selectedPost.mediaUrl}
                  alt={selectedPost.title}
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </div>

            {/* Lightbox Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">By {selectedPost.authorName}</span>
                  <span className="text-[11px] font-mono text-amber-400">{selectedPost.authorHandle}</span>
                  <span className="text-[10px] text-slate-500">• {selectedPost.createdAt}</span>
                </div>
                {selectedPost.caption && (
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    {selectedPost.caption}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => onToggleLike(selectedPost.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedPost.likedByMe
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${selectedPost.likedByMe ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{selectedPost.likesCount} Likes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
