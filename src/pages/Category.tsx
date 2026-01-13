import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Apple, Carrot, Sparkles, Filter } from 'lucide-react';
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
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-20 -end-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -start-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                </div>

                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '30px 30px',
                }} />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full mb-6 border border-white/20">
                            <Filter size={16} />
                            <span className="text-sm font-medium">تصفح منتجاتنا الطازجة</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-black mb-4">{t('products')}</h1>
                        <p className="text-white/80 text-lg">
                            اختر من بين تشكيلة واسعة من الفواكه والخضروات الطازجة
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
