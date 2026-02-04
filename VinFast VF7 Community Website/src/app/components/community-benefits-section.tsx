import { Map, Bot, MessageSquare, Calendar, Newspaper, Gift } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function CommunityBenefitsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const benefits = [
    {
      icon: Map,
      title: 'Tra cứu map trạm sạc & gara miễn phí',
      description: 'Tìm kiếm nhanh chóng các điểm sạc và gara gần bạn với dữ liệu được cập nhật liên tục.',
      color: 'from-[#1A73E8] to-[#00D2D3]',
    },
    {
      icon: Bot,
      title: 'AI hỗ trợ tức thì',
      description: 'Trợ lý thông minh giải đáp mọi thắc mắc về VF7 bất cứ lúc nào, 24/7.',
      color: 'from-[#00D2D3] to-[#1A73E8]',
    },
    {
      icon: MessageSquare,
      title: 'Đăng bài & hỏi đáp không cần đăng nhập',
      description: 'Chia sẻ kinh nghiệm và đặt câu hỏi ngay lập tức, không rào cản.',
      color: 'from-[#1A73E8] to-[#2ECC71]',
    },
    {
      icon: Calendar,
      title: 'Tham gia sự kiện & meetup',
      description: 'Gặp gỡ các chủ xe VF7 khác, tham gia hành trình và sự kiện cộng đồng.',
      color: 'from-[#2ECC71] to-[#00D2D3]',
    },
    {
      icon: Newspaper,
      title: 'Nhận tin tức VF7 mới nhất',
      description: 'Cập nhật tin tức, bản cập nhật phần mềm và tính năng mới từ VinFast.',
      color: 'from-[#1A73E8] to-[#8B5CF6]',
    },
    {
      icon: Gift,
      title: 'Ưu đãi từ đối tác',
      description: 'Nhận các ưu đãi độc quyền từ mạng lưới đối tác dành riêng cho thành viên.',
      color: 'from-[#8B5CF6] to-[#1A73E8]',
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-gradient-to-b from-white via-[#F5F6FA] to-white overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#2D3436]">
            Quyền lợi khi tham gia cộng đồng
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trở thành thành viên và tận hưởng những lợi ích độc quyền dành riêng cho cộng đồng VF7
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-2xl backdrop-blur-sm bg-white/80 border border-gray-200/50 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-[1500ms] transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              style={{
                transitionDelay: `${index * 225}ms`,
              }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />

              <div className="relative z-10">
                <div className={`w-14 h-14 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-md`}>
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold mb-3 text-[#2D3436] group-hover:text-[#1A73E8] transition-colors">
                  {benefit.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#1A73E8]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
