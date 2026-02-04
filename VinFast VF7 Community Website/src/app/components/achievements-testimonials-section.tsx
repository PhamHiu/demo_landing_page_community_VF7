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
      color: 'from-[#1A73E8] to-[#00D2D3]',
    },
    {
      icon: FileText,
      value: '8,200+',
      label: 'Bài viết đóng góp',
      color: 'from-[#8B5CF6] to-[#F472B6]',
    },
    {
      icon: TrendingUp,
      value: '98%',
      label: 'Tỷ lệ hài lòng',
      color: 'from-[#00D2D3] to-[#2ECC71]',
    },
    {
      icon: Calendar,
      value: '35+',
      label: 'Sự kiện tổ chức',
      color: 'from-[#F59E0B] to-[#F97316]',
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
    },
    {
      id: 2,
      name: 'Trần Thị Hương',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      rating: 5,
      text: 'Cộng đồng rất nhiệt tình! Lần xe gặp sự cố nhỏ, hỏi trong group và được anh em hướng dẫn xử lý ngay.',
      tag: 'Cộng đồng hỗ trợ',
    },
    {
      id: 3,
      name: 'Lê Hoàng Nam',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      rating: 5,
      text: 'AI chatbot trả lời cực nhanh và chính xác. Giải quyết được 90% thắc mắc của tôi mà không cần gọi hotline.',
      tag: 'AI hỗ trợ xuất sắc',
    },
    {
      id: 4,
      name: 'Phạm Mai Anh',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      rating: 5,
      text: 'Tham gia meetup offline rất vui! Gặp được nhiều người cùng đam mê và học được nhiều kinh nghiệm hay.',
      tag: 'Sự kiện tuyệt vời',
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-cyan-200 to-white"
          >
            Niềm tin được xây dựng từ cộng đồng
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Con số và trải nghiệm thực tế từ cộng đồng VF7 Việt Nam
          </motion.p>
        </div>

        {/* Part 1: Key KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {primaryStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className="relative p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
                <NumberCounter value={stat.value} isVisible={isVisible} />
              </div>
              <div className="text-sm md:text-base text-gray-400 font-medium">{stat.label}</div>
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
                  <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center">
                    <stat.icon className="w-5 h-5 text-cyan-400 mb-2" />
                    <div className="text-xl font-bold">
                      <NumberCounter value={stat.value} isVisible={isVisible} />
                    </div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setShowMoreStats(!showMoreStats)}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-sm font-medium text-cyan-300"
          >
            {showMoreStats ? 'Thu gọn' : 'Xem thêm thống kê'}
            {showMoreStats ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative w-full overflow-hidden max-w-6xl mx-auto"
        >
          {/* Gradient Masks */}
          <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-[#0f172a] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-[#0f172a] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-6 md:gap-8"
            animate={{ x: `-${currentSlide * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="min-w-[100%] md:min-w-[calc(50%-1rem)] lg:min-w-[calc(33.33%-1.33rem)] relative"
              >
                <div className="h-full bg-[#1e1b4b]/80 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 shadow-xl hover:border-cyan-400/30 transition-colors duration-300 flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full border-2 border-cyan-400/30 object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-white">{testimonial.name}</h3>
                      <div className="flex text-yellow-400 text-xs">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 italic flex-1 mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  <div className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full text-xs font-medium border border-cyan-500/20 w-fit">
                    {testimonial.tag}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
                  ? 'bg-[#00D2D3] w-8'
                  : 'bg-white/20 w-2 hover:bg-white/40'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white z-20 transition-all hidden md:block"
          >
            <ChevronDown className="w-6 h-6 rotate-90" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % testimonials.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white z-20 transition-all hidden md:block"
          >
            <ChevronDown className="w-6 h-6 -rotate-90" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
