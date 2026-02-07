
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

export function ChatbotCar() {
    const navigate = useNavigate();

    return (
        <div
            className="fixed bottom-4 right-4 z-50 cursor-pointer group animate-drive-in"
            onClick={() => navigate('/community?tab=ai')}
            title="Chat với trợ lý ảo VF7"
        >
            <div className="relative">
                {/* Speech Bubble */}
                <div className="absolute -top-12 right-10 bg-white text-black px-4 py-2 rounded-2xl rounded-tr-none shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-bold text-sm border-2 border-[#D4AF37]">
                    Cần hỗ trợ? Hỏi tôi ngay!
                </div>

                {/* Car Image Container with Bobbing Animation */}
                <div className="w-48 h-auto transform transition-transform group-hover:scale-110 hover:rotate-1 animate-bounce-gentle">
                    <img
                        src="C:/Users/Aquarius/.gemini/antigravity/brain/d77dc23f-1a43-47f3-b982-83a41c10bf80/vf7_chatbot_car_cartoon_1770403793776.png"
                        alt="VF7 Chatbot Car"
                        className="w-full h-full object-contain drop-shadow-2xl"
                    />
                </div>

                {/* Chat Icon Badge */}
                <div className="absolute -top-2 -right-2 bg-[#D61C2B] text-white p-2 rounded-full shadow-lg border-2 border-white animate-pulse">
                    <MessageCircle className="w-5 h-5" />
                </div>
            </div>
        </div>
    );
}
