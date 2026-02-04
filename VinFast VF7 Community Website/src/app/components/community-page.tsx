
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
    };

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
    <div className="min-h-screen bg-[#F5F6FA] pt-16 relative">
      <div className="container mx-auto px-4 py-8 max-w-7xl">

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#2D3436]">Cộng đồng</h1>
            <button
              onClick={() => setShowCreatePostModal(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#1A73E8] text-white rounded-lg font-medium hover:bg-[#1557B0] transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" />
              <span>Tạo bài đăng</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('forum')}
              className={`flex items-center gap-2 pb-4 px-2 font-medium transition-all relative ${activeTab === 'forum' ? 'text-[#1A73E8]' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Diễn đàn</span>
              {activeTab === 'forum' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A73E8]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-2 pb-4 px-2 font-medium transition-all relative ${activeTab === 'ai' ? 'text-[#1A73E8]' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              <Bot className="w-5 h-5" />
              <span>Trợ lý AI</span>
              {activeTab === 'ai' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A73E8]" />
              )}
            </button>
          </div>
        </div>

        {activeTab === 'forum' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Forum Feed */}
            <div className="lg:col-span-2 space-y-6">

              {/* Search & Filters */}
              <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <div className="relative flex-1 w-full z-20">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                      className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1A73E8] focus:bg-white transition-all"
                    />

                    {/* Suggestions Dropdown */}
                    {showSuggestions && searchQuery && suggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {suggestions.map(post => (
                          <button
                            key={post.id}
                            onClick={() => {
                              setSearchQuery(post.content);
                              setShowSuggestions(false);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-start gap-3 border-b border-gray-50 last:border-0"
                          >
                            <Search className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-[#2D3436] font-medium line-clamp-1">{post.content}</p>
                              <p className="text-xs text-gray-500">từ {post.author.name}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShowSortDropdown(!showSortDropdown)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors flex items-center gap-2 min-w-[160px] justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        <span>{getSortLabel()}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showSortDropdown && (
                      <div className="absolute right-0 mt-2 w-full min-w-[180px] bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10 animate-in fade-in zoom-in-95 duration-200">
                        <button
                          onClick={() => { setSortBy('newest'); setShowSortDropdown(false); }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${sortBy === 'newest' ? 'text-[#1A73E8] font-medium' : 'text-gray-700'}`}
                        >
                          Mới nhất
                        </button>
                        <button
                          onClick={() => { setSortBy('oldest'); setShowSortDropdown(false); }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${sortBy === 'oldest' ? 'text-[#1A73E8] font-medium' : 'text-gray-700'}`}
                        >
                          Cũ nhất
                        </button>
                        <button
                          onClick={() => { setSortBy('popular'); setShowSortDropdown(false); }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${sortBy === 'popular' ? 'text-[#1A73E8] font-medium' : 'text-gray-700'}`}
                        >
                          Tương tác cao
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  <button
                    onClick={() => setFilterCategory('all')}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${filterCategory === 'all' ? 'bg-[#2D3436] text-white border-[#2D3436]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                  >
                    Tất cả
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.value}
                      onClick={() => setFilterCategory(cat.value)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${filterCategory === cat.value ? 'bg-[#1A73E8] text-white border-[#1A73E8]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Post Feed */}
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
                  {/* Post Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <ImageWithFallback
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-[#2D3436] hover:text-[#1A73E8] cursor-pointer transition-colors">{post.author.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{post.time}</span>
                            <span>•</span>
                            <span className="px-2 py-0.5 bg-[#1A73E8]/10 text-[#1A73E8] rounded-full text-xs font-medium">
                              {post.tag}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p className="mt-4 text-[#2D3436] leading-relaxed">{post.content}</p>
                  </div>

                  {/* Post Images */}
                  {post.images && (
                    <div className={`grid gap-1 ${post.images.length > 1 ? 'grid-cols-2' : ''}`}>
                      {post.images.map((image, index) => (
                        <ImageWithFallback
                          key={index}
                          src={image}
                          alt={`Post image ${index + 1}`}
                          className="w-full h-80 object-cover hover:opacity-95 transition-opacity cursor-pointer"
                        />
                      ))}
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="p-4 px-6 flex items-center justify-between border-t border-gray-100 bg-gray-50/50">
                    <div className="flex gap-6">
                      <button className="flex items-center gap-2 text-gray-600 hover:text-[#FF4757] transition-colors group">
                        <Heart className="w-5 h-5 group-hover:fill-[#FF4757] transition-colors" />
                        <span className="text-sm font-medium">{post.likes}</span>
                      </button>
                      <button
                        onClick={() => toggleComments(post.id)}
                        className={`flex items-center gap-2 transition-colors group ${expandedComments.has(post.id) ? 'text-[#1A73E8]' : 'text-gray-600 hover:text-[#1A73E8]'}`}
                      >
                        <MessageCircle className={`w-5 h-5 ${expandedComments.has(post.id) ? 'fill-[#1A73E8]/20' : 'group-hover:fill-[#1A73E8]/10'}`} />
                        <span className="text-sm font-medium">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-[#00D2D3] transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm font-medium">{post.shares}</span>
                      </button>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-[#1A73E8]/10 to-[#00D2D3]/10 text-[#1A73E8] rounded-full text-sm font-medium hover:shadow-md transition-all flex items-center gap-2">
                      <Bot className="w-4 h-4" />
                      <span>Hỏi AI</span>
                    </button>
                  </div>

                  {/* Comment Section */}
                  {expandedComments.has(post.id) && (
                    <div className="border-t border-gray-100 bg-gray-50 p-4">
                      {/* Existing Comments */}
                      {post.commentsList && post.commentsList.length > 0 && (
                        <div className="space-y-3 mb-4">
                          {post.commentsList.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                              <ImageWithFallback
                                src={comment.author.avatar}
                                alt={comment.author.name}
                                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                              />
                              <div className="flex-1 bg-white rounded-xl p-3 shadow-sm">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm text-[#2D3436]">{comment.author.name}</span>
                                  <span className="text-xs text-gray-400">{comment.time}</span>
                                </div>
                                <p className="text-sm text-gray-700">{comment.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Comment Input */}
                      <div className="space-y-3">
                        {/* Captcha Field */}
                        {commentCaptchas[post.id] && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#1A73E8] bg-blue-50 px-2 py-1 rounded-md border border-blue-100 whitespace-nowrap">
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
                              className={`w-12 px-2 py-1 text-center bg-white border rounded-lg text-sm focus:outline-none transition-all ${commentCaptchaErrors[post.id] ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#1A73E8]'}`}
                            />
                            {commentCaptchaErrors[post.id] && <span className="text-xs text-red-500">Sai kết quả</span>}
                          </div>
                        )}

                        <div className="flex gap-3">
                          <ImageWithFallback
                            src={currentUser.avatar}
                            alt="You"
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1">
                            <input
                              type="text"
                              value={commenterNames[post.id] || ''}
                              onChange={(e) => setCommenterNames(prev => ({ ...prev, [post.id]: e.target.value }))}
                              placeholder="Tên hiển thị (Tùy chọn)"
                              className="w-full mb-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1A73E8] transition-all"
                            />
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={newComment[post.id] || ''}
                                onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                                onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                                placeholder="Viết bình luận..."
                                className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1A73E8] transition-all"
                              />
                              <button
                                onClick={() => handleCommentSubmit(post.id)}
                                disabled={!newComment[post.id]?.trim() || !commentCaptchaInputs[post.id]}
                                className="px-4 py-2 bg-[#1A73E8] text-white rounded-xl hover:bg-[#1557B0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div className="space-y-6">
              {/* Trending Topics */}
              <div className="bg-white rounded-3xl p-6 shadow-sm sticky top-24 border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-5 h-5 text-[#1A73E8]" />
                  <h3 className="font-bold text-[#2D3436]">Chủ đề thịnh hành</h3>
                </div>
                <div className="space-y-4">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex justify-between items-center group cursor-pointer">
                      <div>
                        <h4 className="font-medium text-[#2D3436] group-hover:text-[#1A73E8] transition-colors">{topic.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{topic.posts.toLocaleString()} bài viết</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#1A73E8]/10 transition-colors">
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#1A73E8]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gradient-to-br from-[#1A73E8] to-[#00D2D3] rounded-3xl p-6 text-white text-center">
                <h3 className="font-bold text-xl mb-3">Tham gia nhóm Facebook</h3>
                <p className="text-white/90 text-sm mb-6 leading-relaxed">
                  Kết nối, chia sẻ và học hỏi từ hơn 10,000+ thành viên tích cực khác.
                </p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-3 bg-white text-[#1A73E8] rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all block"
                >
                  Tham gia ngay
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* AI Chat Interface */
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 h-[700px] flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1A73E8] to-[#00D2D3] rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#2D3436]">Trợ lý AI VF7</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse" />
                  Sẵn sàng hỗ trợ
                </p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F5F6FA]/50">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-2xl p-4 ${msg.role === 'user'
                    ? 'bg-[#1A73E8] text-white rounded-tr-sm'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'
                    }`}>
                    <p className="leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex gap-3 max-w-4xl mx-auto">
                <input
                  type="text"
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAiSend()}
                  placeholder="Hỏi về lỗi xe, trạm sạc, bảo dưỡng..."
                  className="flex-1 px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1A73E8] focus:bg-white transition-all"
                />
                <button
                  onClick={handleAiSend}
                  className="bg-[#1A73E8] text-white px-6 rounded-xl hover:bg-[#1557B0] transition-colors flex items-center justify-center shadow-lg shadow-blue-200"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-center text-xs text-gray-400 mt-3">
                AI có thể đưa ra thông tin không chính xác. Hãy kiểm tra lại với tài liệu chính thức.
              </p>
            </div>
          </div>
        )}

        {/* Notification Toast */}
        {notification && (
          <div className="fixed top-24 right-4 z-[60] bg-white border border-green-100 p-4 rounded-xl shadow-lg shadow-green-100 flex items-center gap-3 animate-in slide-in-from-right duration-300">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            </div>
            <p className="text-[#2D3436] font-medium">{notification.message}</p>
          </div>
        )}

        {/* Create Post Modal */}
        {showCreatePostModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleCloseModal}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-[#2D3436]">Tạo bài đăng mới</h2>
                <button
                  onClick={handleCloseModal}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
                {/* Author Input (Manual) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Người đăng bài <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newPost.authorName}
                    onChange={(e) => setNewPost(prev => ({ ...prev, authorName: e.target.value }))}
                    placeholder="Nhập tên hiển thị của bạn"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#1A73E8] transition-all"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thể loại <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#1A73E8] transition-all appearance-none cursor-pointer"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chủ đề
                  </label>
                  <input
                    type="text"
                    value={newPost.topic}
                    onChange={(e) => setNewPost(prev => ({ ...prev, topic: e.target.value }))}
                    placeholder="Ví dụ: Tips tiết kiệm pin"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#1A73E8] transition-all"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Chia sẻ kinh nghiệm, câu hỏi hoặc thảo luận của bạn..."
                    rows={5}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#1A73E8] transition-all resize-none"
                  />
                </div>

                {/* Captcha */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Xác thực không phải người máy <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-3 bg-gradient-to-r from-[#1A73E8]/10 to-[#00D2D3]/10 rounded-xl font-bold text-[#1A73E8] min-w-[120px] text-center">
                      {captcha.question}
                    </div>
                    <input
                      type="text"
                      value={captchaInput}
                      onChange={(e) => {
                        setCaptchaInput(e.target.value);
                        setCaptchaError(false);
                      }}
                      placeholder="Nhập kết quả"
                      className={`flex-1 px-4 py-3 bg-white border rounded-xl focus:outline-none transition-all ${captchaError ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#1A73E8]'
                        }`}
                    />
                  </div>
                  {captchaError && (
                    <p className="text-red-500 text-sm mt-2">Kết quả không chính xác. Vui lòng thử lại.</p>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 p-6 border-t border-gray-100 bg-gray-50">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleCreatePost}
                  disabled={!newPost.content.trim() || !newPost.category || !captchaInput || !newPost.authorName.trim()}
                  className="flex-1 px-6 py-3 bg-[#1A73E8] text-white rounded-xl font-medium hover:bg-[#1557B0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
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
