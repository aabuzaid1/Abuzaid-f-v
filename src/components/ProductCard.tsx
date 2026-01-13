import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types';
import QuantityStepper from './QuantityStepper';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { language, t } = useLanguage();
    const { items, addToCart, updateQuantity } = useCart();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const cartItem = items.find(item => item.product.id === product.id);
    const quantity = cartItem?.quantity || 0;

    const displayPrice = product.isDeal && product.dealPrice ? product.dealPrice : product.price;
    const unitLabel = t(product.unit as any);

    const handleAddToCart = () => {
        if (product.inStock) {
            addToCart(product);
        }
    };

    const handleIncrease = () => {
        updateQuantity(product.id, quantity + 1);
    };

    const handleDecrease = () => {
        updateQuantity(product.id, quantity - 1);
    };

    return (
        <div className={`group bg-white rounded-3xl shadow-premium overflow-hidden card-hover relative ${!product.inStock ? 'opacity-75' : ''}`}>
            {/* Deal Badge */}
            {product.isDeal && (
                <div className="absolute top-3 start-3 z-10 bg-gradient-gold text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg glow-gold badge-pulse">
                    🔥 {t('dealBadge')}
                </div>
            )}

            {/* Best Seller Badge */}
            {product.isBestSeller && !product.isDeal && (
                <div className="absolute top-3 start-3 z-10 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    ⭐ الأفضل
                </div>
            )}

            {/* Out of Stock Overlay */}
            {!product.inStock && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex items-center justify-center">
                    <span className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg">
                        {t('outOfStock')}
                    </span>
                </div>
            )}

            {/* Image */}
            <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 shimmer" />
                )}
                <img
                    src={imageError ? 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400' : product.image}
                    alt={product.name[language]}
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                        setImageError(true);
                        setImageLoaded(true);
                    }}
                    loading="lazy"
                />
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {product.name[language]}
                </h3>

                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-primary font-extrabold text-2xl">
                        {displayPrice.toFixed(2)}
                    </span>
                    <span className="text-gray-400 text-sm font-medium">
                        {t('currency')} / {unitLabel}
                    </span>

                    {product.isDeal && product.dealPrice && (
                        <span className="text-gray-300 line-through text-sm ms-1">
                            {product.price.toFixed(2)}
                        </span>
                    )}
                </div>

                {/* Add to Cart / Quantity Stepper */}
                {quantity > 0 ? (
                    <div className="flex justify-center">
                        <QuantityStepper
                            quantity={quantity}
                            onIncrease={handleIncrease}
                            onDecrease={handleDecrease}
                        />
                    </div>
                ) : (
                    <button
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                        className="w-full py-3 px-4 bg-gradient-premium hover:shadow-lg disabled:bg-gray-300 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 btn-press btn-premium"
                    >
                        <Plus size={20} strokeWidth={2.5} />
                        {t('addToCart')}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
