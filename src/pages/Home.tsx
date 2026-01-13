import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Scale, Award, Leaf, Apple, Carrot, Sparkles, Star, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
    const { t, isRTL } = useLanguage();

    const categories = [
        { id: 'fruits', icon: Apple, color: 'from-red-500 via-rose-500 to-pink-600', bgImage: '🍎🍊🍋🍇🍓', path: '/category?cat=fruits' },
        { id: 'vegetables', icon: Carrot, color: 'from-green-500 via-emerald-500 to-teal-600', bgImage: '🥕🥦🌽🍅🥬', path: '/category?cat=vegetables' },
    ];

    const features = [
        { key: 'freshDaily', icon: Leaf, desc: 'freshDailyDesc', color: 'from-green-400 to-emerald-600', accent: '#10B981' },
        { key: 'fairWeight', icon: Scale, desc: 'fairWeightDesc', color: 'from-blue-400 to-cyan-600', accent: '#0EA5E9' },
        { key: 'familyTrust', icon: Award, desc: 'familyTrustDesc', color: 'from-amber-400 to-orange-600', accent: '#F59E0B' },
        { key: 'fastDelivery', icon: Truck, desc: 'fastDeliveryDesc', color: 'from-purple-400 to-violet-600', accent: '#8B5CF6' },
    ];

    const stats = [
        { number: '33', labelKey: 'yearsExperience', icon: Clock, suffix: '+' },
        { number: '50', labelKey: 'freshProducts', icon: Apple, suffix: '+' },
        { number: '100', labelKey: 'dailyDelivery', icon: Truck, suffix: '%' },
    ];

    return (
        <div className="min-h-screen overflow-hidden">
            {/* ==== HERO SECTION ==== */}
            <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070&auto=format&fit=crop"
                        alt="Fresh Fruits and Vegetables"
                        className="w-full h-full object-cover animate-slow-zoom"
                    />
                    {/* Multi-layer gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
                    <div className="absolute inset-0 hero-gradient mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 animate-gradient" />
                </div>

                {/* Floating Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
                    <div className="absolute top-20 start-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-shape" style={{ animationDelay: '0s' }} />
                    <div className="absolute top-40 end-20 w-40 h-40 bg-green-400/20 rounded-full blur-shape" style={{ animationDelay: '2s' }} />
                    <div className="absolute bottom-40 start-1/4 w-24 h-24 bg-orange-400/20 rounded-full blur-shape" style={{ animationDelay: '4s' }} />
                    <div className="absolute top-1/3 end-1/4 w-20 h-20 bg-red-400/20 rounded-full blur-shape" style={{ animationDelay: '1s' }} />
                </div>

                {/* Hero Content */}
                <div className="container mx-auto px-4 relative z-10 text-center pt-10">
                    <div className="max-w-5xl mx-auto">
                        {/* Premium Badge with Glow */}
                        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-8 py-4 rounded-full mb-8 border border-white/30 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 animate-glow">
                            <div className="relative">
                                <Sparkles size={24} className="text-yellow-400 animate-pulse" />
                                <div className="absolute inset-0 bg-yellow-400/50 rounded-full blur-md animate-breathe" />
                            </div>
                            <span className="text-lg font-black text-white tracking-wider">{t('since')}</span>
                            <div className="w-px h-6 bg-white/30" />
                            <span className="text-yellow-400 font-black text-lg">{t('years33')}</span>
                        </div>

                        {/* Main Title with Gradient */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                            <span className="text-white drop-shadow-2xl">{t('heroTitle')}</span>
                        </h1>

                        {/* Animated Subtitle */}
                        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-4 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                                {t('heroSubtitle')}
                            </p>
                            <p className="text-lg md:text-xl text-yellow-400/90 font-bold tracking-wide">
                                ✨ {t('qualityUnmatched')} ✨
                            </p>
                        </div>

                        {/* Stats Bar */}
                        <div className="grid grid-cols-3 gap-4 mt-12 mb-12 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
                            {stats.map((stat, index) => (
                                <div
                                    key={stat.labelKey}
                                    className="stats-gradient rounded-2xl p-5 text-center hover-lift"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="flex items-center justify-center gap-1 mb-2">
                                        <span className="text-3xl md:text-4xl font-black text-white counter-number">{stat.number}</span>
                                        <span className="text-xl text-yellow-400 font-bold">{stat.suffix}</span>
                                    </div>
                                    <p className="text-white/80 text-sm font-medium">{t(stat.labelKey as any)}</p>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons with Premium Effects */}
                        <div className="flex flex-col sm:flex-row gap-5 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                            <Link
                                to="/category"
                                className="group relative inline-flex items-center justify-center gap-4 bg-gradient-to-r from-primary via-green-500 to-primary bg-[length:200%_100%] hover:bg-right text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-[0_20px_50px_rgba(46,125,50,0.5)] hover:shadow-[0_25px_60px_rgba(46,125,50,0.7)] hover:-translate-y-2 transition-all duration-500 ripple-effect overflow-hidden"
                            >
                                <span className="relative z-10">{t('shopNow')}</span>
                                <ArrowRight size={24} className={`relative z-10 transition-transform duration-300 group-hover:translate-x-2 ${isRTL ? 'rotate-180 group-hover:-translate-x-2' : ''}`} />
                            </Link>

                            <Link
                                to="/boxes"
                                className="group inline-flex items-center justify-center gap-4 bg-white/10 backdrop-blur-xl text-white px-12 py-5 rounded-2xl font-bold text-xl border-2 border-white/40 hover:bg-white/20 hover:border-white/60 hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-2xl"
                            >
                                <span className="text-2xl group-hover:scale-125 transition-transform">📦</span>
                                {t('boxes')}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Wave Transition */}
                <div className="absolute bottom-0 left-0 right-0 z-10">
                    <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
                        <path d="M0,60 C360,120 720,0 1440,60 L1440,120 L0,120 Z" fill="#FAFAFA" />
                    </svg>
                </div>
            </section>

            {/* ==== CATEGORIES ==== */}
            <section className="py-24 lg:py-32 bg-[#FAFAFA] relative">
                {/* Background decoration */}
                <div className="absolute top-0 start-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 end-0 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase mb-4 bg-primary/5 px-6 py-2 rounded-full">
                            <Sparkles size={16} />
                            {t('wideSelection')}
                        </span>
                        <h2 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6">
                            {t('browseCategories')}
                        </h2>
                        <div className="w-32 h-2 bg-gradient-to-r from-primary via-green-400 to-primary mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {categories.map((cat, index) => (
                            <Link
                                key={cat.id}
                                to={cat.path}
                                className="group relative flex flex-col items-center justify-center p-12 bg-white rounded-[2.5rem] shadow-premium hover:shadow-premium-lg transition-all duration-500 hover-lift border border-gray-100/50 overflow-hidden fade-in"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                {/* Background gradient on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                {/* Emoji decoration */}
                                <div className="absolute top-4 end-4 text-4xl opacity-20 group-hover:opacity-40 transition-opacity">
                                    {cat.bgImage.substring(0, 2)}
                                </div>

                                <div className={`relative w-28 h-28 bg-gradient-to-br ${cat.color} rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                    <cat.icon size={56} className="text-white drop-shadow-lg" />
                                    {/* Glow effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} rounded-[2rem] blur-xl opacity-50 group-hover:opacity-80 transition-opacity -z-10`} />
                                </div>

                                <span className="font-black text-3xl text-gray-800 group-hover:text-primary transition-colors mb-2">
                                    {t(cat.id as any)}
                                </span>
                                <span className="text-gray-500 text-sm">{t('clickToBrowse')}</span>

                                {/* Arrow indicator */}
                                <div className={`absolute bottom-6 ${isRTL ? 'start-6' : 'end-6'} w-10 h-10 rounded-full bg-gray-100 group-hover:bg-primary flex items-center justify-center transition-all duration-300`}>
                                    <ArrowRight size={20} className={`text-gray-400 group-hover:text-white transition-colors ${isRTL ? 'rotate-180' : ''}`} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==== FEATURED PRODUCTS ==== */}
            <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-1/2 start-0 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl" />
                <div className="absolute top-1/4 end-0 w-[400px] h-[400px] bg-gradient-to-l from-yellow-400/5 to-transparent rounded-full blur-3xl" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-16 gap-6">
                        <div>
                            <span className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase mb-4 bg-primary/5 px-6 py-2 rounded-full">
                                <Star size={16} className="fill-primary" />
                                الأكثر مبيعاً
                            </span>
                            <h2 className="text-4xl lg:text-6xl font-black text-gray-900 mb-3">
                                {t('products')}
                            </h2>
                            <p className="text-gray-500 text-lg">أفضل المنتجات الطازجة المختارة بعناية لك</p>
                        </div>
                        <Link
                            to="/category"
                            className="group hidden lg:inline-flex items-center gap-3 text-lg font-bold bg-gradient-to-r from-primary to-green-600 text-white px-8 py-4 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            {t('viewAll')}
                            <ArrowRight size={22} className={`transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {products.filter(p => p.inStock).slice(0, 8).map((product, index) => (
                            <div key={product.id} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    {/* Mobile View All */}
                    <div className="mt-14 text-center lg:hidden">
                        <Link
                            to="/category"
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                        >
                            {t('viewAll')}
                            <ArrowRight size={22} className={isRTL ? 'rotate-180' : ''} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ==== WHY CHOOSE US ==== */}
            <section className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, #2E7D32 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                }} />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase mb-4 bg-primary/5 px-6 py-2 rounded-full">
                            <Award size={16} />
                            {t('whyUs')}
                        </span>
                        <h2 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6">
                            نتميز بالجودة والثقة
                        </h2>
                        <div className="w-32 h-2 bg-gradient-to-r from-primary via-green-400 to-primary mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={feature.key}
                                className="group text-center p-10 bg-white rounded-[2.5rem] shadow-premium hover:shadow-premium-lg hover-lift border border-gray-100/50 fade-in relative overflow-hidden"
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                {/* Highlight bar */}
                                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className={`w-24 h-24 bg-gradient-to-br ${feature.color} rounded-[1.8rem] flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 icon-premium`}>
                                    <feature.icon size={44} className="text-white drop-shadow-md" />
                                </div>
                                <h3 className="font-black text-2xl text-gray-900 mb-4">{t(feature.key as any)}</h3>
                                <p className="text-gray-500 text-base leading-relaxed">{t(feature.desc as any)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==== ABOUT/CTA SECTION ==== */}
            <section className="py-24 lg:py-32 bg-gradient-premium text-white relative overflow-hidden">
                {/* Animated Background shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -end-40 w-[30rem] h-[30rem] bg-white/5 rounded-full blur-3xl animate-float" />
                    <div className="absolute -bottom-40 -start-40 w-[35rem] h-[35rem] bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
                    <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-white/3 rounded-full blur-3xl animate-breathe" />
                </div>

                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '30px 30px',
                }} />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full mb-10 border border-white/20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            <Leaf size={22} className="text-green-300" />
                            <span className="text-lg font-bold">منذ 1993</span>
                            <div className="w-px h-5 bg-white/30" />
                            <span className="text-yellow-300 font-bold">33 عاماً من التميز</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 leading-tight">
                            {t('aboutSection')}
                        </h2>

                        <p className="text-white/90 text-xl lg:text-2xl leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 max-w-3xl mx-auto">
                            {t('aboutText')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                            <Link
                                to="/about"
                                className="group inline-flex items-center gap-3 bg-white text-primary px-12 py-5 rounded-2xl font-bold text-xl hover:bg-white/95 hover:-translate-y-2 transition-all duration-300 shadow-2xl ripple-effect"
                            >
                                {t('about')}
                                <ArrowRight size={24} className={`transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                            </Link>

                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-12 py-5 rounded-2xl font-bold text-xl border-2 border-white/30 hover:bg-white/20 hover:border-white/50 hover:-translate-y-2 transition-all duration-300"
                            >
                                {t('contact')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
