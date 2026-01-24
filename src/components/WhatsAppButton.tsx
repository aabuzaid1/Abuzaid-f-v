import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WHATSAPP_NUMBER = '962790796457';

const WhatsAppButton: React.FC = () => {
    const { language } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Show button after a short delay for smooth entrance
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    // Show tooltip periodically to attract attention
    useEffect(() => {
        const showTimer = setTimeout(() => setShowTooltip(true), 3000);
        const hideTimer = setTimeout(() => setShowTooltip(false), 8000);
        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    const tooltipText = language === 'ar' ? 'تحتاج مساعدة؟ تواصل معنا!' : 'Need help? Chat with us!';
    const buttonText = language === 'ar' ? 'تواصل معنا' : 'Chat with us';

    return (
        <div
            className={`fixed bottom-6 z-50 transition-all duration-700 ease-out ${language === 'ar' ? 'left-6' : 'right-6'
                } ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        >
            {/* Tooltip */}
            <div
                className={`absolute bottom-full mb-3 ${language === 'ar' ? 'left-0' : 'right-0'
                    } transition-all duration-500 ${showTooltip && !isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                    }`}
            >
                <div className="relative bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-xl whitespace-nowrap">
                    {tooltipText}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowTooltip(false);
                        }}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                    >
                        <X size={12} />
                    </button>
                    {/* Arrow */}
                    <div className={`absolute top-full ${language === 'ar' ? 'left-6' : 'right-6'
                        } border-8 border-transparent border-t-gray-900`} />
                </div>
            </div>

            {/* Main WhatsApp Button */}
            <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative flex items-center"
            >
                {/* Expanded Text on Hover */}
                <div
                    className={`absolute ${language === 'ar' ? 'left-full ml-3' : 'right-full mr-3'
                        } bg-[#25D366] text-white px-4 py-3 rounded-full font-bold text-sm shadow-lg whitespace-nowrap transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none ' + (language === 'ar' ? '-translate-x-4' : 'translate-x-4')
                        }`}
                >
                    {buttonText}
                </div>

                {/* Button Circle */}
                <div className="relative">
                    {/* Pulse Animation Rings */}
                    <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-25" />
                    <div className="absolute inset-0 bg-[#25D366] rounded-full animate-pulse opacity-40" style={{ animationDuration: '2s' }} />

                    {/* Main Button */}
                    <div className={`relative w-16 h-16 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] ${isHovered ? 'rotate-0' : ''
                        }`}>
                        {/* WhatsApp Icon */}
                        <MessageCircle
                            size={32}
                            className="text-white transition-all duration-300 group-hover:scale-110"
                            fill="white"
                            strokeWidth={0}
                        />

                        {/* Shine Effect */}
                        <div className="absolute inset-0 rounded-full overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        </div>
                    </div>

                    {/* Online Status Indicator */}
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white shadow-md flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </div>
                </div>
            </a>
        </div>
    );
};

export default WhatsAppButton;
