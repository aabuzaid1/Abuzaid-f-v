import React, { useState } from 'react';
import { ShoppingCart, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { Box } from '../types';

interface BoxCardProps {
    box: Box;
}

const BoxCard: React.FC<BoxCardProps> = ({ box }) => {
    const { language, t } = useLanguage();
    const { items, addToCart, updateQuantity } = useCart();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const cartItem = items.find(item => item.product.id === box.id);
    const quantity = cartItem?.quantity || 0;

    const handleAddToCart = () => {
        if (box.inStock) {
            addToCart(box, true);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover">
            {/* Image */}
            <div className="relative aspect-video bg-gray-50 overflow-hidden">
                {!imageLoaded && (
                    <div className="absolute inset-0 image-placeholder animate-pulse" />
                )}
                <img
                    src={box.image}
                    alt={box.name[language]}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                    loading="lazy"
                />

                {/* Price Badge */}
                <div className="absolute bottom-3 end-3 bg-primary text-white px-3 py-1.5 rounded-full font-bold">
                    {box.price.toFixed(2)} {t('currency')}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="font-bold text-gray-800 text-xl mb-2">
                    {box.name[language]}
                </h3>

                <p className="text-gray-600 text-sm mb-4">
                    {box.description[language]}
                </p>

                {/* Contents */}
                <div className="mb-4">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-primary font-medium text-sm flex items-center gap-1 hover:underline"
                    >
                        {t('contents')} {expanded ? '▲' : '▼'}
                    </button>

                    {expanded && (
                        <ul className="mt-2 space-y-1 bg-gray-50 rounded-lg p-3">
                            {box.contents[language].map((item, index) => (
                                <li key={index} className="text-gray-600 text-sm flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Add to Cart */}
                <button
                    onClick={handleAddToCart}
                    disabled={!box.inStock}
                    className="w-full py-3 px-4 bg-primary hover:bg-primary-700 disabled:bg-gray-300 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors btn-press"
                >
                    {quantity > 0 ? (
                        <>
                            <ShoppingCart size={18} />
                            {quantity} {t('box')}
                        </>
                    ) : (
                        <>
                            <Plus size={18} />
                            {t('addToCart')}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default BoxCard;
