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
      color: 'from-[#00F0FF] to-[#0088CC]', // Cyan - Tech/App benefit
      category: 'tech',
      borderColor: 'group-hover:from-[#00F0FF] group-hover:to-[#0088CC]',
    },
    {
      icon: Bot,
      title: 'AI hỗ trợ tức thì',
      description: 'Trợ lý thông minh giải đáp mọi thắc mắc về VF7 bất cứ lúc nào, 24/7.',
      color: 'from-[#00F0FF] to-[#0088CC]', // Cyan - Tech/AI benefit
      category: 'tech',
      borderColor: 'group-hover:from-[#00F0FF] group-hover:to-[#0088CC]',
    },
    {
      icon: MessageSquare,
      title: 'Đăng bài & hỏi đáp không cần đăng nhập',
      description: 'Chia sẻ kinh nghiệm và đặt câu hỏi ngay lập tức, không rào cản.',
      color: 'from-[#D4AF37] to-[#FFA500]', // Gold - Community benefit
      category: 'community',
      borderColor: 'group-hover:from-[#D4AF37] group-hover:to-[#FFA500]',
    },
    {
      icon: Calendar,
      title: 'Tham gia sự kiện & meetup',
      description: 'Gặp gỡ các chủ xe VF7 khác, tham gia hành trình và sự kiện cộng đồng.',
      color: 'from-[#D4AF37] to-[#FFA500]', // Gold - Community/Events benefit
      category: 'community',
      borderColor: 'group-hover:from-[#D4AF37] group-hover:to-[#FFA500]',
    },
    {
      icon: Newspaper,
      title: 'Nhận tin tức VF7 mới nhất',
      description: 'Cập nhật tin tức, bản cập nhật phần mềm và tính năng mới từ VinFast.',
      color: 'from-[#00F0FF] to-[#0088CC]', // Cyan - Tech/News benefit
      category: 'tech',
      borderColor: 'group-hover:from-[#00F0FF] group-hover:to-[#0088CC]',
    },
    {
      icon: Gift,
      title: 'Ưu đãi từ đối tác',
      description: 'Nhận các ưu đãi độc quyền từ mạng lưới đối tác dành riêng cho thành viên.',
      color: 'from-[#D61C2B] to-[#990F1B]', // Red - Service/Partners benefit
      category: 'service',
      borderColor: 'group-hover:from-[#D61C2B] group-hover:to-[#990F1B]',
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-[#0F0F0F] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D61C2B]/5 rounded-full blur-[120px]" />

        {/* Metallic Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white uppercase tracking-wide">
            Quyền lợi <span className="text-gradient-gold">Cộng đồng</span>
          </h2>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-6" />
          <p className="text-lg text-[#A3A3A3] max-w-2xl mx-auto">
            Trở thành thành viên và tận hưởng những lợi ích độc quyền dành riêng cho cộng đồng VF7
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            return (
              <div
                key={index}
                className={`group relative h-full transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} hover:-translate-y-2`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                {/* Angular Frame Container */}
                <div
                  className="relative h-full bg-gradient-to-br from-[#333] via-[#111] to-[#333] p-[1px] transition-all duration-300"
                  style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}
                >

                  {/* Inner Content */}
                  <div
                    className="relative h-full bg-[#151515] group-hover:bg-[#1A1A1A] p-8 flex flex-col transition-colors duration-300"
                    style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}
                  >

                    {/* Icon Box */}
                    <div className="relative mb-6 self-start">
                      <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} p-[1px]`}
                        style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>
                        <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center"
                          style={{ clipPath: 'polygon(9px 0, 100% 0, 100% calc(100% - 9px), calc(100% - 9px) 100%, 0 100%, 0 9px)' }}>
                          <benefit.icon className="w-8 h-8 text-white group-hover:text-[#D4AF37] transition-colors duration-300" />
                        </div>
                        {/* Glow effect bg */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-20 group-hover:opacity-40 blur-md -z-10`} />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#D4AF37] transition-colors uppercase tracking-wide">
                      {benefit.title}
                    </h3>

                    <p className="text-[#A3A3A3] leading-relaxed text-sm border-l border-[#333] pl-4 group-hover:border-[#D4AF37] transition-colors">
                      {benefit.description}
                    </p>

                    {/* Corner Accent */}
                    <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
