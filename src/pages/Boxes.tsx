import React from 'react';
import { Package, Sparkles, Gift } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { boxes } from '../data/boxes';
import BoxCard from '../components/BoxCard';

const Boxes: React.FC = () => {
    const { t, language } = useLanguage();

    const features = [
        { icon: '🎁', textAr: 'تشكيلة منتقاة', textEn: 'Curated Selection' },
        { icon: '💰', textAr: 'سعر موفّر', textEn: 'Great Value' },
        { icon: '🚚', textAr: 'توصيل مجاني للطلبات الكبيرة', textEn: 'Free Delivery for Large Orders' },
    ];

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            {/* Hero Section */}
            <section className="relative bg-gradient-premium text-white py-16 lg:py-24 overflow-hidden">
                {/* Premium Animated Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Floating Orbs */}
                    <div className="absolute -top-40 -end-40 w-[30rem] h-[30rem] bg-gradient-to-br from-yellow-400/20 to-orange-500/10 rounded-full blur-3xl animate-float" />
                    <div className="absolute -bottom-40 -start-40 w-[35rem] h-[35rem] bg-gradient-to-tr from-green-300/15 to-emerald-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-gradient-to-r from-white/5 to-yellow-300/5 rounded-full blur-3xl animate-breathe" />

                    {/* Animated Particles */}
                    <div className="absolute top-[10%] start-[15%] w-3 h-3 bg-yellow-400/60 rounded-full animate-float" style={{ animationDelay: '0s', animationDuration: '4s' }} />
                    <div className="absolute top-[20%] end-[20%] w-2 h-2 bg-white/50 rounded-full animate-float" style={{ animationDelay: '1s', animationDuration: '5s' }} />
                    <div className="absolute top-[60%] start-[10%] w-4 h-4 bg-emerald-300/40 rounded-full animate-float" style={{ animationDelay: '2s', animationDuration: '6s' }} />
                    <div className="absolute top-[70%] end-[15%] w-2 h-2 bg-yellow-300/50 rounded-full animate-float" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }} />
                    <div className="absolute top-[40%] start-[5%] w-3 h-3 bg-white/30 rounded-full animate-float" style={{ animationDelay: '1.5s', animationDuration: '5.5s' }} />
                    <div className="absolute top-[30%] end-[8%] w-2 h-2 bg-orange-300/40 rounded-full animate-float" style={{ animationDelay: '3s', animationDuration: '4s' }} />

                    {/* Shimmer Lines */}
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-[20%] start-0 w-full h-[1px] bg-gradient-to-l from-transparent via-white/20 to-transparent animate-shimmer-line" />
                        <div className="absolute top-[50%] start-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent animate-shimmer-line" style={{ animationDelay: '2s' }} />
                        <div className="absolute top-[80%] start-0 w-full h-[1px] bg-gradient-to-l from-transparent via-white/15 to-transparent animate-shimmer-line" style={{ animationDelay: '4s' }} />
                    </div>

                    {/* Glowing Rings */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem] border border-white/10 rounded-full animate-pulse-ring" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] border border-yellow-400/5 rounded-full animate-pulse-ring" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] border border-white/5 rounded-full animate-pulse-ring" style={{ animationDelay: '2s' }} />
                </div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '30px 30px',
                }} />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-8 border border-white/20">
                        <Gift size={18} className="text-yellow-400" />
                        <span className="font-bold">{language === 'ar' ? 'صناديق مميزة' : 'Premium Boxes'}</span>
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-black mb-5 flex items-center justify-center gap-4">
                        <Package size={48} className="text-yellow-400" />
                        {t('boxesTitle')}
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        {t('boxesSubtitle')}
                    </p>
                </div>
            </section>

            {/* Features */}
            <section className="py-10 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
                        {features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-2xl">{feature.icon}</span>
                                <span className="font-bold text-gray-700">{language === 'ar' ? feature.textAr : feature.textEn}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Boxes Grid */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
                        {boxes.map((box, index) => (
                            <div
                                key={box.id}
                                className="fade-in"
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <BoxCard box={box} />
                            </div>
                        ))}
                    </div>

                    {/* Info Note */}
                    <div className="mt-16 text-center">
                        <div className="inline-flex items-center gap-3 bg-primary/5 px-8 py-4 rounded-2xl border border-primary/10">
                            <Sparkles size={20} className="text-primary" />
                            <span className="font-medium text-gray-700">
                                {language === 'ar' ? 'يمكنك تخصيص محتويات الصندوق حسب رغبتك' : 'You can customize the box contents as you wish'}
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Boxes;
