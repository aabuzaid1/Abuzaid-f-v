import React from 'react';
import { Package, Sparkles, Gift } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { boxes } from '../data/boxes';
import BoxCard from '../components/BoxCard';

const Boxes: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            {/* Hero Section */}
            <section className="relative bg-gradient-premium text-white py-16 lg:py-24 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -end-40 w-[30rem] h-[30rem] bg-white/5 rounded-full blur-3xl animate-float" />
                    <div className="absolute -bottom-40 -start-40 w-[35rem] h-[35rem] bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
                </div>

                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '30px 30px',
                }} />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-8 border border-white/20">
                        <Gift size={18} className="text-yellow-400" />
                        <span className="font-bold">صناديق مميزة</span>
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
                        {[
                            { icon: '🎁', text: 'تشكيلة منتقاة' },
                            { icon: '💰', text: 'سعر موفّر' },
                            { icon: '🚚', text: 'توصيل مجاني للطلبات الكبيرة' },
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-2xl">{feature.icon}</span>
                                <span className="font-bold text-gray-700">{feature.text}</span>
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
                                يمكنك تخصيص محتويات الصندوق حسب رغبتك
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Boxes;
