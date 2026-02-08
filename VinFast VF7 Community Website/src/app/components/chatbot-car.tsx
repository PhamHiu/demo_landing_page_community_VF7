
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ChatbotCar() {
    const navigate = useNavigate();
    const [bubbleText, setBubbleText] = useState<string>('');
    const [showBubble, setShowBubble] = useState(false);

    // Random Chat Messages
    const messages = [
        "Cần hỗ trợ về VF7? Hỏi tôi ngay!",
        "Tìm trạm sạc gần nhất?",
        "Thông số kỹ thuật VF7?",
        "Đặt lịch lái thử ngay!",
        "Tham gia cộng đồng VF7 nào!",
        "Tôi có thể giúp gì cho bạn?"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            setBubbleText(randomMsg);
            setShowBubble(true);

            // Hide bubble after 4 seconds
            setTimeout(() => {
                setShowBubble(false);
            }, 4000);

        }, 8000); // Show every 8 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="fixed bottom-4 right-4 z-50 cursor-pointer group animate-drive-back-and-forth"
            onClick={() => navigate('/community?tab=ai')}
            title="Chat với trợ lý ảo VF7"
        >
            <div className="relative">
                {/* Speech Bubble - Dynamic */}
                <div
                    className={`absolute -top-16 left-1/2 -translate-x-1/2 bg-[#0F0F0F]/90 backdrop-blur-md text-white px-4 py-3 rounded-xl rounded-bl-none shadow-[0_0_15px_rgba(212,175,55,0.3)] border border-[#D4AF37] transition-all duration-500 whitespace-nowrap font-bold text-sm z-20 ${showBubble ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                    {bubbleText}
                    <div className="absolute -bottom-2 left-0 w-4 h-4 bg-[#0F0F0F]/90 border-r border-b border-[#D4AF37] transform rotate-45 skew-x-12" />
                </div>

                {/* Video Container with Cyberpunk Effect */}
                <div className="w-48 h-32 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/20 to-transparent rounded-lg mix-blend-overlay pointer-events-none" />

                    {/* Placeholder Video */}
                    <video
                        src="https://cdn.pixabay.com/vimeo/475960098/robot-55268.mp4?width=640&hash=1d4f2963366c8e398000b000b000b000b000b000" // Placeholder Robot Video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover rounded-lg shadow-2xl border-2 border-[#D4AF37] relative z-10"
                        style={{
                            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                        }}
                    >
                        Your browser does not support the video tag.
                    </video>

                    {/* Cyberpunk Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#00F0FF] rounded-lg blur opacity-30 animate-pulse group-hover:opacity-75 transition-opacity duration-500 z-0" />
                </div>

                {/* Status Indicator */}
                <div className="absolute -top-2 -right-2 bg-[#00F0FF] text-black p-2 rounded-full shadow-lg border-2 border-white animate-bounce z-20">
                    <Zap className="w-4 h-4 fill-black" />
                </div>
            </div>

            <style>
                {`
                    @keyframes drive-back-and-forth {
                        0% { transform: translateX(0) scaleX(-1); } /* Start facing left */
                        45% { transform: translateX(-100px) scaleX(-1); } /* Move left */
                        50% { transform: translateX(-100px) scaleX(1); } /* Turn around (face right) */
                        95% { transform: translateX(0) scaleX(1); } /* Move back (right) */
                        100% { transform: translateX(0) scaleX(-1); } /* Turn back (face left) */
                    }
                    .animate-drive-back-and-forth {
                        animation: drive-back-and-forth 20s infinite linear;
                    }
                `}
            </style>
        </div>
    );
}
