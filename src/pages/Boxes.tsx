import React, { useState } from 'react';
import { Package, Sparkles, Gift, Plus, Trash2, Edit3 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { boxes } from '../data/boxes';
import BoxCard from '../components/BoxCard';
import CustomBoxBuilder from '../components/CustomBoxBuilder';
import { useCustomBoxes } from '../hooks/useCustomBoxes';
import { CustomBox } from '../types';

const Boxes: React.FC = () => {
    const { t, language } = useLanguage();
    const { addToCart } = useCart();
    const { customBoxes, deleteBox } = useCustomBoxes();
    const [isBuilderOpen, setIsBuilderOpen] = useState(false);
    const [editingBox, setEditingBox] = useState<CustomBox | undefined>(undefined);

    const features = [
        { icon: '🎁', textAr: 'تشكيلة منتقاة', textEn: 'Curated Selection' },
        { icon: '💰', textAr: 'سعر موفّر', textEn: 'Great Value' },
        { icon: '🚚', textAr: 'توصيل مجاني للطلبات الكبيرة', textEn: 'Free Delivery for Large Orders' },
    ];

    const handleEditBox = (box: CustomBox) => {
        setEditingBox(box);
        setIsBuilderOpen(true);
    };

    const handleCloseBuilder = () => {
        setIsBuilderOpen(false);
        setEditingBox(undefined);
    };

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
                    <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                        {t('boxesSubtitle')}
                    </p>

                    {/* Create Custom Box Button */}
                    <button
                        onClick={() => setIsBuilderOpen(true)}
                        className="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-400 hover:text-white transition-all transform hover:scale-105 shadow-lg"
                    >
                        <Plus size={24} />
                        {t('createCustomBox')}
                    </button>
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

            {/* My Custom Boxes */}
            {customBoxes.length > 0 && (
                <section className="py-12 bg-gradient-to-b from-primary/5 to-transparent">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                            <Sparkles className="text-primary" size={28} />
                            {t('myCustomBoxes')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {customBoxes.map((box) => (
                                <div key={box.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="relative aspect-video bg-gray-50">
                                        <img
                                            src={box.image}
                                            alt={box.name[language]}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-3 end-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                                            {language === 'ar' ? 'مخصص' : 'Custom'}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-800 text-lg mb-2">{box.name[language]}</h3>
                                        <p className="text-gray-600 text-sm mb-3">
                                            {box.selectedProducts.length} {language === 'ar' ? 'منتج' : 'products'}
                                        </p>
                                        <p className="text-primary font-bold text-xl mb-4">
                                            {box.price.toFixed(2)} {t('currency')}
                                        </p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => addToCart(box, true)}
                                                className="flex-1 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary-700 transition flex items-center justify-center gap-2"
                                            >
                                                <Plus size={18} />
                                                {t('addToCart')}
                                            </button>
                                            <button
                                                onClick={() => handleEditBox(box)}
                                                className="p-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition"
                                            >
                                                <Edit3 size={18} />
                                            </button>
                                            <button
                                                onClick={() => deleteBox(box.id)}
                                                className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Ready-made Boxes Grid */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                        {language === 'ar' ? 'صناديق جاهزة' : 'Ready-made Boxes'}
                    </h2>
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
                        <button
                            onClick={() => setIsBuilderOpen(true)}
                            className="inline-flex items-center gap-3 bg-primary/10 hover:bg-primary/20 px-8 py-4 rounded-2xl border border-primary/20 transition-colors cursor-pointer"
                        >
                            <Sparkles size={20} className="text-primary" />
                            <span className="font-medium text-gray-700">
                                {t('customizeBox')}
                            </span>
                            <Plus size={20} className="text-primary" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Custom Box Builder Modal */}
            <CustomBoxBuilder
                isOpen={isBuilderOpen}
                onClose={handleCloseBuilder}
                editingBox={editingBox}
            />
        </div>
    );
};

export default Boxes;

