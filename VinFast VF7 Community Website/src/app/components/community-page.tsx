
import { useState } from 'react';
import { Bot, Heart, MessageCircle, Share2, TrendingUp, Send, Search, Plus, Filter, MessageSquare, X, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

// --- Interfaces ---
interface Comment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  time: string;
}

interface Post {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  time: string;
  tag: string;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
  commentsList?: Comment[];
}

// --- Mock Data ---
const initialMockPosts: Post[] = [
  {
    id: 1,
    author: {
      name: 'Nguyễn Văn An',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200',
    },
    time: '2 giờ trước',
    tag: 'Kinh nghiệm',
    content: 'Vừa hoàn thành chuyến đi Hà Nội - Đà Nẵng với VF7. Quãng đường 700km, chỉ phải sạc 2 lần. Xe rất êm và thoải mái cho hành trình dài. Chia sẻ một số tips cho anh em nhé! 🚗⚡',
    images: [
      'https://images.unsplash.com/photo-1727802329382-b9f080571270?w=800',
      'https://images.unsplash.com/photo-1761320142429-0672277fc080?w=800',
    ],
    likes: 245,
    comments: 34,
    shares: 12,
    commentsList: [
      { id: 1, author: { name: 'Trần Minh', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' }, content: 'Tuyệt vời quá bạn! Cho mình hỏi sạc ở đâu vậy?', time: '1 giờ trước' },
      { id: 2, author: { name: 'Lê Hương', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' }, content: 'Cảm ơn bạn chia sẻ!', time: '30 phút trước' },
    ],
  },
  {
    id: 2,
    author: {
      name: 'Trần Thị Mai',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    },
    time: '5 giờ trước',
    tag: 'Hỏi đáp',
    content: 'Cho mình hỏi, làm thế nào để tối ưu pin khi đi trong thành phố? Mình thấy pin xuống khá nhanh. Cảm ơn anh em!',
    likes: 89,
    comments: 56,
    shares: 3,
    commentsList: [
      { id: 1, author: { name: 'Nguyễn Hải', avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100' }, content: 'Bạn thử bật chế độ Eco nhé, mình thấy tiết kiệm hơn nhiều.', time: '4 giờ trước' },
    ],
  },
  {
    id: 3,
    author: {
      name: 'Lê Hoàng Nam',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    },
    time: '1 ngày trước',
    tag: 'Sự kiện',
    content: 'Offline meet-up VF7 Hà Nội vào Chủ nhật tuần sau tại Hồ Tây. Ai rảnh thì tham gia nhé! Sẽ có nhiều hoạt động thú vị và chia sẻ kinh nghiệm. 🎉',
    images: [
      'https://images.unsplash.com/photo-1762158008280-3dcb1d1cbd99?w=800',
    ],
    likes: 432,
    comments: 98,
    shares: 45,
    commentsList: [],
  },
];

const trendingTopics = [
  { name: '#TipsXeĐiện', posts: 1234 },
  { name: '#VF7Community', posts: 2456 },
  { name: '#HànhTrìnhXanh', posts: 890 },
  { name: '#TraCứuSạc', posts: 567 },
];

const categories = [
  { value: 'kinh-nghiem', label: 'Kinh nghiệm' },
  { value: 'meo-vat', label: 'Mẹo vặt' },
  { value: 'hoi-dap', label: 'Hỏi đáp' },
  { value: 'thao-luan', label: 'Thảo luận' },
];

// Captcha helper
function generateCaptcha() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return { question: `${num1} + ${num2} = ?`, answer: num1 + num2 };
}

export function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'forum' | 'ai'>('forum');
  const [aiMessage, setAiMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: 'Xin chào! Tôi là Trợ lý AI VF7. Tôi có thể giúp gì cho bạn hôm nay?' }
  ]);

  // Posts state
  const [posts, setPosts] = useState<Post[]>(initialMockPosts);

  // Comment state
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());
  const [newComment, setNewComment] = useState<Record<number, string>>({});
  const [commenterNames, setCommenterNames] = useState<Record<number, string>>({});

  // Comment Captcha state
  const [commentCaptchas, setCommentCaptchas] = useState<Record<number, { question: string, answer: number }>>({});
  const [commentCaptchaInputs, setCommentCaptchaInputs] = useState<Record<number, string>>({});
  const [commentCaptchaErrors, setCommentCaptchaErrors] = useState<Record<number, boolean>>({});

  // Filter & Sort state
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Create Post Modal state
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [newPost, setNewPost] = useState({
    authorName: '',
    category: '',
    topic: '',
    content: '',
  });
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  // Notification state
  const [notification, setNotification] = useState<{ show: boolean; message: string; type: 'success' | 'info' } | null>(null);

  const currentUser = {
    name: 'Người dùng VF7',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=200',
  };

  const handleAiSend = () => {
    if (!aiMessage.trim()) return;

    const newHistory = [...chatHistory, { role: 'user' as const, content: aiMessage }];
    setChatHistory(newHistory);
    setAiMessage('');

    setTimeout(() => {
      setChatHistory([...newHistory, { role: 'ai', content: 'Cảm ơn câu hỏi của bạn. Đây là tính năng đang phát triển, tôi sẽ sớm có thể trả lời chi tiết hơn!' }]);
    }, 1000);
  };

  // Toggle comment section
  const toggleComments = (postId: number) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
        // Generate captcha for this post if not exists
        if (!commentCaptchas[postId]) {
          setCommentCaptchas(prevCaptchas => ({
            ...prevCaptchas,
            [postId]: generateCaptcha()
          }));
        }
      }
      return newSet;
    });
  };

  // Handle comment submit
  const handleCommentSubmit = (postId: number) => {
    const commentText = newComment[postId]?.trim();
    if (!commentText) return;

    // Validate Captcha
    const currentCaptcha = commentCaptchas[postId];
    const userInput = parseInt(commentCaptchaInputs[postId]);

    if (!currentCaptcha || userInput !== currentCaptcha.answer) {
      setCommentCaptchaErrors(prev => ({ ...prev, [postId]: true }));
      return;
    }

    const comment: Comment = {
      id: Date.now(),
      author: {
        name: commenterNames[postId]?.trim() || 'Ẩn danh',
        avatar: currentUser.avatar,
      },
      content: commentText,
      time: 'Vừa xong',
      features: undefined
    } as unknown as Comment; // Simplified for this context

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1,
          commentsList: [...(post.commentsList || []), comment],
        };
      }
      return post;
    }));

    // Reset fields and generate new captcha
    setNewComment(prev => ({ ...prev, [postId]: '' }));
    setCommenterNames(prev => ({ ...prev, [postId]: '' }));
    setCommentCaptchaInputs(prev => ({ ...prev, [postId]: '' }));
    setCommentCaptchaErrors(prev => ({ ...prev, [postId]: false }));
    setCommentCaptchas(prev => ({ ...prev, [postId]: generateCaptcha() }));
  };

  // Handle create post
  const handleCreatePost = () => {
    if (parseInt(captchaInput) !== captcha.answer) {
      setCaptchaError(true);
      return;
    }

    if (!newPost.content.trim() || !newPost.category || !newPost.authorName.trim()) {
      return;
    }

    // Simulate sending to admin for approval
    setShowCreatePostModal(false);
    setNotification({
      show: true,
      message: 'Bài viết của bạn đã được gửi và đang chờ quản trị viên duyệt.',
      type: 'success'
    });

    // Reset form
    setNewPost({ authorName: '', category: '', topic: '', content: '' });
    setCaptchaInput('');
    setCaptchaError(false);
    setCaptcha(generateCaptcha());

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Reset modal
  const handleCloseModal = () => {
    setShowCreatePostModal(false);
    setNewPost({ authorName: '', category: '', topic: '', content: '' });
    setCaptchaInput('');
    setCaptchaError(false);
    setCaptcha(generateCaptcha());
  };

  // Filter Logic
  const filteredPosts = posts.filter(post => {
    // Category Filter
    if (filterCategory !== 'all') {
      const categoryLabel = categories.find(c => c.value === filterCategory)?.label;
      if (post.tag !== categoryLabel) return false;
    }

    // Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return post.content.toLowerCase().includes(query) || post.author.name.toLowerCase().includes(query);
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'newest') {
      return b.id - a.id;
    } else if (sortBy === 'oldest') {
      return a.id - b.id;
    } else {
      return (b.likes + b.comments) - (a.likes + a.comments);
    }
  });

  const getSortLabel = () => {
    switch (sortBy) {
      case 'newest': return 'Mới nhất';
      case 'oldest': return 'Cũ nhất';
      case 'popular': return 'Tương tác cao';
      default: return 'Sắp xếp';
    }
  };

  // Suggestions Logic
  const suggestions = searchQuery.trim()
    ? posts.filter(post =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5)
    : [];

  return (
    <div className="min-h-screen bg-[#0F0F0F] pt-16 relative text-[#E0E0E0]">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D61C2B] opacity-5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4AF37] opacity-5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white uppercase tracking-wider">
              Cộng đồng <span className="text-[#D4AF37]">VF7</span>
            </h1>
            <button
              onClick={() => setShowCreatePostModal(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#D61C2B] to-[#990F1B] text-white rounded-sm font-medium hover:shadow-[0_0_15px_rgba(214,28,43,0.5)] transition-all shadow-md group"
              style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
            >
              <div className="bg-white/20 p-1 rounded-sm group-hover:bg-white/30 transition-colors">
                <Plus className="w-4 h-4" />
              </div>
              <span className="uppercase tracking-wider text-sm font-bold">Tạo bài đăng</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 border-b border-[#333]">
            <button
              onClick={() => setActiveTab('forum')}
              className={`flex items-center gap-2 pb-4 px-2 font-medium transition-all relative ${activeTab === 'forum' ? 'text-[#D4AF37]' : 'text-[#888] hover:text-white'
                }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="uppercase tracking-wide text-sm font-bold">Diễn đàn</span>
              {activeTab === 'forum' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-2 pb-4 px-2 font-medium transition-all relative ${activeTab === 'ai' ? 'text-[#D4AF37]' : 'text-[#888] hover:text-white'
                }`}
            >
              <Bot className="w-5 h-5" />
              <span className="uppercase tracking-wide text-sm font-bold">Trợ lý AI</span>
              {activeTab === 'ai' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
              )}
            </button>
          </div>
        </div>

        {activeTab === 'forum' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Forum Feed */}
            <div className="lg:col-span-2 space-y-6">

              {/* Search & Filters */}
              <div className="flex flex-col gap-4 bg-[#151515] p-5 rounded-sm border border-[#333]" style={{ clipPath: 'polygon(20px 0, 100% 0, 100% 100%, 0 100%, 0 20px)' }}>
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <div className="relative flex-1 w-full z-20">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666] group-focus-within:text-[#D4AF37] transition-colors" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm bài viết..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      className="w-full pl-12 pr-4 py-3 bg-[#0F0F0F] border border-[#333] rounded-sm focus:outline-none focus:border-[#D4AF37] text-white placeholder-[#555] transition-all"
                    />

                    {/* Suggestions Dropdown */}
                    {showSuggestions && searchQuery && suggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-[#1A1A1A] rounded-sm shadow-xl border border-[#333] overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
                        {suggestions.map(post => (
                          <button
                            key={post.id}
                            onClick={() => {
                              setSearchQuery(post.content);
                              setShowSuggestions(false);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-[#252525] transition-colors flex items-start gap-3 border-b border-[#333] last:border-0"
                          >
                            <Search className="w-4 h-4 text-[#666] mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-[#E0E0E0] font-medium line-clamp-1">{post.content}</p>
                              <p className="text-xs text-[#888]">từ {post.author.name}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShowSortDropdown(!showSortDropdown)}
                      className="px-4 py-3 bg-[#0F0F0F] text-[#A3A3A3] border border-[#333] rounded-sm font-medium text-sm hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors flex items-center gap-2 min-w-[160px] justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        <span>{getSortLabel()}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showSortDropdown && (
                      <div className="absolute right-0 mt-2 w-full min-w-[180px] bg-[#1A1A1A] rounded-sm shadow-xl border border-[#333] py-2 z-30 animate-in fade-in zoom-in-95 duration-200">
                        <button
                          onClick={() => { setSortBy('newest'); setShowSortDropdown(false); }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-[#252525] transition-colors ${sortBy === 'newest' ? 'text-[#D4AF37] font-medium' : 'text-[#A3A3A3]'}`}
                        >
                          Mới nhất
                        </button>
                        <button
                          onClick={() => { setSortBy('oldest'); setShowSortDropdown(false); }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-[#252525] transition-colors ${sortBy === 'oldest' ? 'text-[#D4AF37] font-medium' : 'text-[#A3A3A3]'}`}
                        >
                          Cũ nhất
                        </button>
                        <button
                          onClick={() => { setSortBy('popular'); setShowSortDropdown(false); }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-[#252525] transition-colors ${sortBy === 'popular' ? 'text-[#D4AF37] font-medium' : 'text-[#A3A3A3]'}`}
                        >
                          Tương tác cao
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                  <button
                    onClick={() => setFilterCategory('all')}
                    className={`px-5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${filterCategory === 'all' ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-[#0F0F0F] text-[#888] border-[#333] hover:border-[#666] hover:text-white'}`}
                    style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' }}
                  >
                    Tất cả
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.value}
                      onClick={() => setFilterCategory(cat.value)}
                      className={`px-5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${filterCategory === cat.value ? 'bg-[#D61C2B] text-white border-[#D61C2B] shadow-[0_0_10px_rgba(214,28,43,0.4)]' : 'bg-[#0F0F0F] text-[#888] border-[#333] hover:border-[#666] hover:text-white'}`}
                      style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Post Feed */}
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-[#151515] rounded-sm shadow-sm overflow-hidden border border-[#333] hover:border-[#444] transition-colors group">
                  {/* Post Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="relative">
                          <ImageWithFallback
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-12 h-12 rounded-full object-cover border border-[#444]"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#00C853] rounded-full border-2 border-[#151515]"></div>
                        </div>
                        <div>
                          <h3 className="font-bold text-white hover:text-[#D4AF37] cursor-pointer transition-colors text-lg">{post.author.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-[#888]">
                            <span>{post.time}</span>
                            <span className="text-[#444]">|</span>
                            <span className="px-2 py-0.5 bg-[#D61C2B]/10 text-[#D61C2B] border border-[#D61C2B]/30 rounded-sm text-xs font-bold uppercase tracking-wider">
                              {post.tag}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p className="mt-4 text-[#E0E0E0] leading-relaxed text-base">{post.content}</p>
                  </div>

                  {/* Post Images */}
                  {post.images && (
                    <div className={`grid gap-1 ${post.images.length > 1 ? 'grid-cols-2' : ''} border-y border-[#222]`}>
                      {post.images.map((image, index) => (
                        <ImageWithFallback
                          key={index}
                          src={image}
                          alt={`Post image ${index + 1}`}
                          className="w-full h-80 object-cover hover:opacity-90 transition-opacity cursor-pointer"
                        />
                      ))}
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="p-4 px-6 flex items-center justify-between border-t border-[#333] bg-[#0F0F0F]/50">
                    <div className="flex gap-6">
                      <button className="flex items-center gap-2 text-[#888] hover:text-[#FF4757] transition-colors group">
                        <Heart className="w-5 h-5 group-hover:fill-[#FF4757] transition-colors" />
                        <span className="text-sm font-medium">{post.likes}</span>
                      </button>
                      <button
                        onClick={() => toggleComments(post.id)}
                        className={`flex items-center gap-2 transition-colors group ${expandedComments.has(post.id) ? 'text-[#D4AF37]' : 'text-[#888] hover:text-[#D4AF37]'}`}
                      >
                        <MessageCircle className={`w-5 h-5 ${expandedComments.has(post.id) ? 'fill-[#D4AF37]/20 text-[#D4AF37]' : 'group-hover:text-[#D4AF37]'}`} />
                        <span className="text-sm font-medium">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-[#888] hover:text-[#D4AF37] transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm font-medium">{post.shares}</span>
                      </button>
                    </div>
                    <button className="px-4 py-2 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 rounded-sm text-sm font-bold uppercase tracking-wider hover:bg-[#D4AF37]/20 transition-all flex items-center gap-2">
                      <Bot className="w-4 h-4" />
                      <span>Hỏi AI</span>
                    </button>
                  </div>

                  {/* Comment Section */}
                  {expandedComments.has(post.id) && (
                    <div className="border-t border-[#333] bg-[#0F0F0F] p-5">
                      {/* Existing Comments */}
                      {post.commentsList && post.commentsList.length > 0 && (
                        <div className="space-y-4 mb-6">
                          {post.commentsList.map((comment) => (
                            <div key={comment.id} className="flex gap-3 group">
                              <ImageWithFallback
                                src={comment.author.avatar}
                                alt={comment.author.name}
                                className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-[#333]"
                              />
                              <div className="flex-1 bg-[#1A1A1A] rounded-sm rounded-tl-none p-3 border border-[#333] group-hover:border-[#444] transition-colors">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-bold text-sm text-[#D4AF37]">{comment.author.name}</span>
                                  <span className="text-xs text-[#666]">{comment.time}</span>
                                </div>
                                <p className="text-sm text-[#CCC]">{comment.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Comment Input */}
                      <div className="space-y-4 bg-[#151515] p-4 rounded-sm border border-[#333]">
                        {/* Captcha Field */}
                        {commentCaptchas[post.id] && (
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1.5 rounded-sm border border-[#D4AF37]/30 whitespace-nowrap">
                              {commentCaptchas[post.id].question}
                            </span>
                            <input
                              type="text"
                              placeholder="?"
                              value={commentCaptchaInputs[post.id] || ''}
                              onChange={(e) => {
                                setCommentCaptchaInputs(prev => ({ ...prev, [post.id]: e.target.value }));
                                setCommentCaptchaErrors(prev => ({ ...prev, [post.id]: false }));
                              }}
                              className={`w-14 px-2 py-1.5 text-center bg-[#222] border rounded-sm text-sm focus:outline-none transition-all text-white ${commentCaptchaErrors[post.id] ? 'border-red-500 bg-red-900/20' : 'border-[#333] focus:border-[#D4AF37]'}`}
                            />
                            {commentCaptchaErrors[post.id] && <span className="text-xs text-red-500 font-medium">Sai kết quả</span>}
                          </div>
                        )}

                        <div className="flex gap-3">
                          <ImageWithFallback
                            src={currentUser.avatar}
                            alt="You"
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-[#333]"
                          />
                          <div className="flex-1 space-y-3">
                            <input
                              type="text"
                              value={commenterNames[post.id] || ''}
                              onChange={(e) => setCommenterNames(prev => ({ ...prev, [post.id]: e.target.value }))}
                              placeholder="Tên hiển thị (Tùy chọn)"
                              className="w-full px-4 py-2 bg-[#222] border border-[#333] rounded-sm text-sm focus:outline-none focus:border-[#D4AF37] text-white placeholder-[#666] transition-all"
                            />
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={newComment[post.id] || ''}
                                onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                                onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                                placeholder="Viết bình luận..."
                                className="flex-1 px-4 py-2.5 bg-[#222] border border-[#333] rounded-sm text-sm focus:outline-none focus:border-[#D4AF37] text-white placeholder-[#666] transition-all"
                              />
                              <button
                                onClick={() => handleCommentSubmit(post.id)}
                                disabled={!newComment[post.id]?.trim() || !commentCaptchaInputs[post.id]}
                                className="px-5 py-2 bg-[#D4AF37] text-black rounded-sm font-bold hover:bg-[#FFD700] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Send className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Trending Topics */}
              <div className="bg-[#151515] rounded-sm p-6 shadow-sm border border-[#333] sticky top-24" style={{ clipPath: 'polygon(20px 0, 100% 0, 100% 100%, 0 100%, 0 20px)' }}>
                <div className="flex items-center gap-2 mb-6 border-b border-[#333] pb-4">
                  <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="font-bold text-white uppercase tracking-wider">Chủ đề thịnh hành</h3>
                </div>
                <div className="space-y-4">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex justify-between items-center group cursor-pointer hover:bg-[#222] p-2 rounded-sm -mx-2 transition-colors">
                      <div>
                        <h4 className="font-medium text-[#E0E0E0] group-hover:text-[#D4AF37] transition-colors">{topic.name}</h4>
                        <p className="text-xs text-[#888] mt-1">{topic.posts.toLocaleString()} bài viết</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors border border-[#333] group-hover:border-[#D4AF37]/30">
                        <ChevronRight className="w-4 h-4 text-[#666] group-hover:text-[#D4AF37]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] rounded-sm p-1 border border-[#333]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}>
                <div className="bg-[#151515] p-6 text-center border border-[#333] hover:border-[#D61C2B]/50 transition-colors group">
                  <h3 className="font-bold text-xl mb-3 text-white group-hover:text-[#D61C2B] transition-colors">Tham gia nhóm Facebook</h3>
                  <p className="text-[#A3A3A3] text-sm mb-6 leading-relaxed">
                    Kết nối, chia sẻ và học hỏi từ hơn 10,000+ thành viên tích cực khác.
                  </p>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-3 bg-[#D61C2B] text-white rounded-sm font-bold uppercase tracking-wider hover:shadow-[0_0_20px_rgba(214,28,43,0.4)] hover:bg-[#B71C1C] transition-all block"
                  >
                    Tham gia ngay
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* AI Chat Interface */
          <div className="bg-[#151515] rounded-sm shadow-sm border border-[#333] h-[700px] flex flex-col overflow-hidden relative" style={{ clipPath: 'polygon(20px 0, 100% 0, 100% 100%, 0 100%, 0 20px)' }}>
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] opacity-5 blur-[100px] pointer-events-none" />

            {/* Chat Header */}
            <div className="p-5 border-b border-[#333] bg-[#1A1A1A] flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <Bot className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg uppercase tracking-wider">Trợ lý AI <span className="text-[#D4AF37]">VF7</span></h3>
                <p className="text-xs text-[#888] flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 bg-[#00C853] rounded-full inline-block animate-pulse shadow-[0_0_8px_rgba(0,200,83,0.8)]" />
                  Sẵn sàng hỗ trợ
                </p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0F0F0F] custom-scrollbar relative z-10">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] rounded-sm p-4 border ${msg.role === 'user'
                    ? 'bg-[#1A1A1A] border-[#D4AF37]/50 text-[#E0E0E0] shadow-[0_0_10px_rgba(212,175,55,0.1)]'
                    : 'bg-[#1A1A1A] border-[#D4AF37]/30 text-[#E0E0E0] shadow-[0_0_10px_rgba(212,175,55,0.1)]'
                    }`}
                    style={{
                      clipPath: msg.role === 'user'
                        ? 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
                        : 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                    }}
                  >
                    <p className="leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-5 bg-[#1A1A1A] border-t border-[#333] relative z-10">
              <div className="flex gap-3 max-w-4xl mx-auto">
                <input
                  type="text"
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAiSend()}
                  placeholder="Hỏi về lỗi xe, trạm sạc, bảo dưỡng..."
                  className="flex-1 px-5 py-3.5 bg-[#0F0F0F] border border-[#333] rounded-sm focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] text-white placeholder-[#555] transition-all"
                />
                <button
                  onClick={handleAiSend}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-black px-6 rounded-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:brightness-110 transition-all flex items-center justify-center font-bold"
                  style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' }}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-center text-[10px] text-[#666] mt-3 uppercase tracking-wider">
                AI có thể đưa ra thông tin không chính xác. Hãy kiểm tra lại với tài liệu chính thức.
              </p>
            </div>
          </div>
        )}

        {/* Notification Toast */}
        {notification && (
          <div className="fixed top-24 right-4 z-[60] bg-[#1A1A1A] border border-[#00C853] p-4 rounded-sm shadow-[0_0_20px_rgba(0,200,83,0.2)] flex items-center gap-3 animate-in slide-in-from-right duration-300">
            <div className="w-8 h-8 bg-[#00C853]/20 rounded-full flex items-center justify-center text-[#00C853] border border-[#00C853]/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            </div>
            <p className="text-white font-medium">{notification.message}</p>
          </div>
        )}

        {/* Create Post Modal */}
        {showCreatePostModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={handleCloseModal}
            />

            {/* Modal */}
            <div className="relative bg-[#151515] border border-[#333] rounded-sm shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200" style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#333] bg-[#1A1A1A]">
                <h2 className="text-xl font-bold text-white uppercase tracking-wider">Tạo bài đăng mới</h2>
                <button
                  onClick={handleCloseModal}
                  className="w-8 h-8 rounded-sm bg-[#222] hover:bg-[#333] flex items-center justify-center transition-colors text-[#888] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {/* Author Input (Manual) */}
                <div>
                  <label className="block text-sm font-bold text-[#A3A3A3] mb-2 uppercase tracking-wide">
                    Người đăng bài <span className="text-[#D61C2B]">*</span>
                  </label>
                  <input
                    type="text"
                    value={newPost.authorName}
                    onChange={(e) => setNewPost(prev => ({ ...prev, authorName: e.target.value }))}
                    placeholder="Nhập tên hiển thị của bạn"
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#333] rounded-sm focus:outline-none focus:border-[#D4AF37] text-white placeholder-[#555] transition-all"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-bold text-[#A3A3A3] mb-2 uppercase tracking-wide">
                    Thể loại <span className="text-[#D61C2B]">*</span>
                  </label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#333] rounded-sm focus:outline-none focus:border-[#D4AF37] text-white transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Chọn thể loại</option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Topic */}
                <div>
                  <label className="block text-sm font-bold text-[#A3A3A3] mb-2 uppercase tracking-wide">
                    Chủ đề
                  </label>
                  <input
                    type="text"
                    value={newPost.topic}
                    onChange={(e) => setNewPost(prev => ({ ...prev, topic: e.target.value }))}
                    placeholder="Ví dụ: Tips tiết kiệm pin"
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#333] rounded-sm focus:outline-none focus:border-[#D4AF37] text-white placeholder-[#555] transition-all"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-bold text-[#A3A3A3] mb-2 uppercase tracking-wide">
                    Nội dung <span className="text-[#D61C2B]">*</span>
                  </label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Chia sẻ kinh nghiệm hoặc câu hỏi của bạn..."
                    rows={5}
                    className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#333] rounded-sm focus:outline-none focus:border-[#D4AF37] text-white placeholder-[#555] transition-all resize-none"
                  />
                </div>

                {/* Captcha */}
                <div className="bg-[#1A1A1A] p-4 border border-[#333] rounded-sm">
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-[#0F0F0F] border border-[#444] rounded-sm select-none font-mono text-lg font-bold text-[#D4AF37] tracking-widest">
                      {captcha.question}
                    </div>
                    <input
                      type="text"
                      value={captchaInput}
                      onChange={(e) => {
                        setCaptchaInput(e.target.value);
                        setCaptchaError(false);
                      }}
                      placeholder="Kết quả?"
                      className={`w-24 px-3 py-2 bg-[#0F0F0F] border rounded-sm focus:outline-none text-white transition-all ${captchaError ? 'border-red-500' : 'border-[#333] focus:border-[#D4AF37]'}`}
                    />
                  </div>
                  {captchaError && <p className="text-red-500 text-xs mt-2 font-bold">Kết quả không chính xác!</p>}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-[#333] bg-[#1A1A1A] flex justify-end gap-4">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 bg-transparent border border-[#333] text-[#AAA] rounded-sm font-bold hover:text-white hover:border-[#666] transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleCreatePost}
                  className="px-8 py-2.5 bg-gradient-to-r from-[#D61C2B] to-[#990F1B] text-white rounded-sm font-bold uppercase tracking-wider hover:shadow-[0_0_20px_rgba(214,28,43,0.4)] transition-all"
                  style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' }}
                >
                  Đăng bài
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Helper component for arrow icon in trending
function ChevronRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
