import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Deals: React.FC = () => {
    const { t } = useLanguage();

    const dealProducts = products.filter((p) => p.isDeal);

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                        🔥 {t('dealBadge')} {t('deals')}
                    </h1>
                    <p className="text-gray-600 text-lg">
                        {dealProducts.length} {t('dealBadge').toLowerCase()}
                    </p>
                </div>

                {/* Deals Grid */}
                {dealProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                        {dealProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">{t('noProducts')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Deals;
