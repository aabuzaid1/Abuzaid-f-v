import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Apple, Carrot, Sparkles, Filter, Leaf } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Category: React.FC = () => {
    const { language, t } = useLanguage();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');

    const activeCategory = searchParams.get('cat') || 'all';

    const categories = [
        { id: 'all', label: t('allProducts'), icon: Sparkles },
        { id: 'fruits', label: t('fruits'), icon: Apple },
        { id: 'vegetables', label: t('vegetables'), icon: Carrot },
        { id: 'herbs', label: t('herbs'), icon: Leaf },
    ];

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            if (activeCategory !== 'all' && product.category !== activeCategory) {
                return false;
            }
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesAr = product.name.ar.toLowerCase().includes(query);
                const matchesEn = product.name.en.toLowerCase().includes(query);
                if (!matchesAr && !matchesEn) {
                    return false;
                }
            }
            return true;
        });
    }, [activeCategory, searchQuery]);

    const handleCategoryChange = (categoryId: string) => {
        if (categoryId === 'all') {
            searchParams.delete('cat');
        } else {
            searchParams.set('cat', categoryId);
        }
        setSearchParams(searchParams);
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            {/* Hero Section */}
            <section className="relative bg-gradient-premium text-white py-16 lg:py-20 overflow-hidden">
                {/* Animated Background - Premium */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Floating Gradient Orbs */}
                    <div className="absolute -top-20 -end-20 w-[30rem] h-[30rem] bg-gradient-to-br from-green-400/30 to-emerald-600/20 rounded-full blur-3xl animate-float" />
                    <div className="absolute -bottom-20 -start-20 w-[35rem] h-[35rem] bg-gradient-to-br from-lime-400/20 to-green-600/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
                    <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-white/5 rounded-full blur-3xl animate-breathe" />

                    {/* Floating Particles */}
                    <div className="absolute top-10 start-[10%] w-3 h-3 bg-yellow-400/70 rounded-full animate-bounce" style={{ animationDuration: '2s' }} />
                    <div className="absolute top-20 end-[15%] w-4 h-4 bg-lime-300/60 rounded-full animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }} />
                    <div className="absolute bottom-10 start-[20%] w-2 h-2 bg-green-300/70 rounded-full animate-bounce" style={{ animationDuration: '1.8s', animationDelay: '0.7s' }} />
                    <div className="absolute top-1/2 end-[5%] w-3 h-3 bg-emerald-400/60 rounded-full animate-bounce" style={{ animationDuration: '2.2s', animationDelay: '1s' }} />
                    <div className="absolute bottom-5 end-[30%] w-2 h-2 bg-yellow-300/60 rounded-full animate-bounce" style={{ animationDuration: '2.8s', animationDelay: '0.5s' }} />

                    {/* Animated Rings */}
                    <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] border border-white/10 rounded-full animate-spin" style={{ animationDuration: '50s' }} />
                    <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] border border-white/5 rounded-full animate-spin" style={{ animationDuration: '35s', animationDirection: 'reverse' }} />

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_4s_infinite]" />
                </div>

                {/* Animated Pattern overlay */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '30px 30px',
                }}>
                    <div className="absolute inset-0 animate-pulse" style={{ animationDuration: '3s' }} />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full mb-6 border border-white/20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <Filter size={16} className="animate-pulse" />
                            <span className="text-sm font-medium">{t('browseOurProducts')}</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-black mb-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                            <span className="inline-block hover:scale-110 transition-transform duration-300">{t('products')}</span>
                        </h1>
                        <p className="text-white/80 text-lg animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                            {language === 'ar' ? 'اختر من بين تشكيلة واسعة من الفواكه والخضروات الطازجة' : 'Choose from a wide selection of fresh fruits and vegetables'}
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-10">
                {/* Search & Filter Bar */}
                <div className="flex flex-col lg:flex-row gap-6 mb-10">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search size={22} className="absolute start-5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('search')}
                                className="w-full ps-14 pe-5 py-4 bg-white rounded-2xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm text-lg"
                            />
                        </div>
                    </div>

                    {/* Category Pills */}
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0">
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategoryChange(cat.id)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold whitespace-nowrap transition-all duration-300 ${isActive
                                        ? 'bg-gradient-premium text-white shadow-lg scale-105'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-primary/30'
                                        }`}
                                >
                                    <Icon size={20} />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-8">
                    <p className="text-gray-600 font-medium">
                        <span className="text-primary font-bold text-xl">{filteredProducts.length}</span>
                        {' '}
                        {language === 'ar' ? 'منتج متوفر' : 'products available'}
                    </p>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-8">
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="fade-in"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search size={48} className="text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-700 mb-2">{t('noProducts')}</h3>
                        <p className="text-gray-500">جرب البحث بكلمات مختلفة</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Category;
