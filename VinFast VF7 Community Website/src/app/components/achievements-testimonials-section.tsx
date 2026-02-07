import { Star, MapPin, Users, MessageCircle, TrendingUp, Calendar, FileText, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Helper component for animated numbers
function NumberCounter({ value, isVisible }: { value: string, isVisible: boolean }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const suffix = value.replace(/[0-9,]/g, '');

  useEffect(() => {
    if (!isVisible || !nodeRef.current) return;

    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        current = numericValue;
        clearInterval(timer);
      }
      if (nodeRef.current) {
        nodeRef.current.textContent = Math.floor(current).toLocaleString();
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, numericValue]);

  return (
    <span>
      <span ref={nodeRef}>0</span>{suffix}
    </span>
  );
}

export function AchievementsTestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMoreStats, setShowMoreStats] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.disconnect();
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const primaryStats = [
    {
      icon: Users,
      value: '2,500+',
      label: 'Thành viên',
      color: 'from-[#D4AF37] to-[#FFA500]', // Gold for Members (Prestige)
      textColor: 'text-[#D4AF37]',
    },
    {
      icon: FileText,
      value: '8,200+',
      label: 'Bài viết đóng góp',
      color: 'from-[#FFFFFF] to-[#E0E0E0]', // White for Posts
      textColor: 'text-white',
    },
    {
      icon: TrendingUp,
      value: '98%',
      label: 'Tỷ lệ hài lòng',
      color: 'from-[#00F0FF] to-[#0088CC]', // Cyan for Tech/Satisfaction
      textColor: 'text-[#00F0FF]',
    },
    {
      icon: Calendar,
      value: '35+',
      label: 'Sự kiện tổ chức',
      color: 'from-[#D61C2B] to-[#990F1B]', // Red for Events (Excitement)
      textColor: 'text-[#D61C2B]',
    },
  ];


  const secondaryStats = [
    {
      icon: MapPin,
      value: '125K+',
      label: 'Lượt tra cứu map',
    },
    {
      icon: CheckCircle,
      value: '3.2K+',
      label: 'Vấn đề đã giải quyết',
    },
    {
      icon: MessageCircle,
      value: '150+',
      label: 'Điểm hẹn cộng đồng',
    },
    {
      icon: Users,
      value: '850+',
      label: 'Người tham gia sự kiện',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Nguyễn Văn Minh',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      rating: 5,
      text: 'Tính năng map giúp tôi tìm trạm sạc cực kỳ nhanh chóng. Đã nhiều lần đi xa không còn lo lắng về pin nữa!',
      tag: 'Tra map hiệu quả',
      model: 'VF7 Plus',
      role: 'Thành viên Tiên phong',
    },
    {
      id: 2,
      name: 'Trần Thị Hương',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      rating: 5,
      text: 'Cộng đồng rất nhiệt tình! Lần xe gặp sự cố nhỏ, hỏi trong group và được anh em hướng dẫn xử lý ngay.',
      tag: 'Cộng đồng hỗ trợ',
      model: 'VF7 Base',
      role: 'Thành viên Tích cực',
    },
    {
      id: 3,
      name: 'Lê Hoàng Nam',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      rating: 5,
      text: 'AI chatbot trả lời cực nhanh và chính xác. Giải quyết được 90% thắc mắc của tôi mà không cần gọi hotline.',
      tag: 'AI hỗ trợ xuất sắc',
      model: 'VF7 Plus',
      role: 'Chuyên gia Công nghệ',
    },
    {
      id: 4,
      name: 'Phạm Mai Anh',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      rating: 5,
      text: 'Tham gia meetup offline rất vui! Gặp được nhiều người cùng đam mê và học được nhiều kinh nghiệm hay.',
      tag: 'Sự kiện tuyệt vời',
      model: 'VF7 Dragon',
      role: 'Thành viên Mới',
    },
    {
      id: 5,
      name: 'Bùi Tuấn Anh',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      rating: 5,
      text: 'Offroad nhẹ nhàng với VF7 phê thật sự. Hệ thống treo làm việc rất tốt, đi đường xấu mà vẫn êm ru.',
      tag: 'Cảm giác lái đỉnh',
      model: 'VF7 Plus',
      role: 'Admin Group',
    },
    {
      id: 6,
      name: 'Ngô Thanh Vân',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      rating: 5,
      text: 'Thiết kế của VF7 quá đẹp, đi đâu cũng có người hỏi. Mình cực thích cái đuôi xe kiểu phi thuyền.',
      tag: 'Thiết kế ấn tượng',
      model: 'VF7 Base',
      role: 'Thành viên Mới',
    },
    {
      id: 7,
      name: 'Phan Quốc Huy',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
      rating: 5,
      text: 'Sạc tại nhà rất tiện, chi phí vận hành rẻ hơn xe xăng nhiều. Đi xuyên Việt một mạch mà không lo nghĩ gì.',
      tag: 'Tiết kiệm chi phí',
      model: 'VF7 Dragon',
      role: 'Thành viên Vip',
    },
    {
      id: 8,
      name: 'Đặng Thùy Linh',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
      rating: 5,
      text: 'Yêu nhất là trợ lý ảo ViVi, thông minh và hiểu tiếng Việt rất tốt. Mở nhạc, chỉnh điều hòa chỉ cần ra lệnh.',
      tag: 'Trợ lý ảo thông minh',
      model: 'VF7 Plus',
      role: 'Thành viên Tích cực',
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-[#0F0F0F] text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D61C2B]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00F0FF]/10 rounded-full blur-[120px]" />

        {/* Metallic Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-wide">
              Niềm tin <span className="text-gradient-gold">Cộng đồng</span>
            </h2>
            <div className="h-1 w-1/3 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#A3A3A3] max-w-2xl mx-auto mt-6"
          >
            Con số và trải nghiệm thực tế từ cộng đồng VF7 Việt Nam
          </motion.p>
        </div>

        {/* Part 1: Key KPIs - Angular Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {primaryStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className="group relative h-full"
            >
              <div
                className="relative h-full bg-gradient-to-br from-[#333] via-[#111] to-[#333] p-[2px] transition-all duration-300 group-hover:-translate-y-2"
                style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}
              >
                {/* Content */}
                <div className="h-full bg-[#151515] hover:bg-[#1A1A1A] p-6 flex flex-col items-center justify-center text-center transition-colors"
                  style={{ clipPath: 'polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px)' }}>

                  <div className={`w-16 h-16 mb-4 rounded-xl flex items-center justify-center bg-gradient-to-br ${stat.color} bg-opacity-10 group-hover:scale-110 transition-transform duration-500`}>
                    <stat.icon className="w-8 h-8 text-white drop-shadow-md" />
                  </div>

                  <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.textColor} drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`}>
                    <NumberCounter value={stat.value} isVisible={isVisible} />
                  </div>

                  <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary Stats Toggle */}
        <div className="text-center mb-20">
          <AnimatePresence>
            {showMoreStats && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 overflow-hidden"
              >
                {secondaryStats.map((stat, index) => (
                  <div key={index} className="relative group">
                    {/* Simplified Metallic Frame for Secondary Stats */}
                    <div className="bg-[#1A1A1A] p-[1px]" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>
                      <div className="bg-[#151515] p-6 flex flex-col items-center justify-center h-full hover:bg-[#1C1C1C] transition-colors"
                        style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>
                        <stat.icon className="w-6 h-6 text-[#00F0FF] mb-3 group-hover:text-white transition-colors" />
                        <div className="text-2xl font-bold text-white mb-1"><NumberCounter value={stat.value} isVisible={isVisible} /></div>
                        <div className="text-xs text-[#A3A3A3] uppercase">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setShowMoreStats(!showMoreStats)}
            className="inline-flex items-center gap-3 px-8 py-3 bg-[#1A1A1A] border border-[#333] hover:border-[#D4AF37] text-[#A3A3A3] hover:text-[#D4AF37] transition-all uppercase text-sm font-bold tracking-widest group"
            style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
          >
            {showMoreStats ? 'Thu gọn' : 'Xem thêm thống kê'}
            <div className={`transform transition-transform duration-300 ${showMoreStats ? 'rotate-180' : ''}`}>
              {showMoreStats ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>
        </div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative w-full overflow-hidden max-w-6xl mx-auto px-4 md:px-0"
        >
          {/* Gradient Masks - Adjusted for dark theme */}
          <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-[#0F0F0F] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-6 md:gap-8 cursor-grab active:cursor-grabbing"
            animate={{ x: `-${currentSlide * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="min-w-[100%] md:min-w-[calc(50%-1rem)] lg:min-w-[calc(33.33%-1.33rem)] relative group"
              >
                {/* Angular Card Frame */}
                <div className="h-full relative transition-transform duration-300 hover:-translate-y-2">
                  {/* Border Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#333] via-[#444] to-[#333] p-[1px]"
                    style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }} />

                  {/* Inner Content */}
                  <div className="h-full bg-[#151515] p-8 relative flex flex-col"
                    style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>

                    {/* Quote Icon Background */}
                    <div className="absolute top-4 right-4 opacity-10">
                      <MessageCircle className="w-16 h-16 text-white" />
                    </div>

                    <div className="flex items-center gap-4 mb-6 relative z-10">
                      <div className="relative">
                        {/* Hexagon-like Avatar Frame */}
                        <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#8B0000] p-[2px]" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-full h-full object-cover bg-[#1A1A1A]"
                            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white group-hover:text-[#D4AF37] transition-colors">{testimonial.name}</h3>
                        <div className="flex text-[#D4AF37] text-xs mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-[#A3A3A3] italic flex-1 mb-6 leading-relaxed relative z-10 border-l-2 border-[#333] pl-4 group-hover:border-[#D4AF37] transition-colors">
                      "{testimonial.text}"
                    </p>

                    <div className="flex justify-between items-end mt-2 pt-4 border-t border-[#222]">
                      <div className="inline-block px-3 py-1 bg-[#1A1A1A] text-[#00F0FF] text-[10px] font-bold uppercase tracking-wider border border-[#00F0FF]/25"
                        style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}>
                        {testimonial.tag}
                      </div>

                      <div className="text-right">
                        <div className="text-white font-bold text-sm">{testimonial.model}</div>
                        <div className="text-[10px] text-[#666] uppercase tracking-wide font-medium">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 transition-all duration-300 ${index === currentSlide
                  ? 'bg-[#D4AF37] w-12 shadow-[0_0_10px_rgba(212,175,55,0.5)]'
                  : 'bg-[#333] w-4 hover:bg-[#555]'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-[#1A1A1A]/80 border border-[#333] hover:border-[#D4AF37] text-white hover:text-[#D4AF37] z-20 transition-all hidden md:flex items-center justify-center group"
            style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' }}
          >
            <ChevronDown className="w-6 h-6 rotate-90 group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % testimonials.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-[#1A1A1A]/80 border border-[#333] hover:border-[#D4AF37] text-white hover:text-[#D4AF37] z-20 transition-all hidden md:flex items-center justify-center group"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' }}
          >
            <ChevronDown className="w-6 h-6 -rotate-90 group-hover:scale-110 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
