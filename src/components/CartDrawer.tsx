import React from 'react';
import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import QuantityStepper from './QuantityStepper';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
    const { language, t, isRTL } = useLanguage();
    const { items, removeFromCart, updateQuantity, subtotal, deliveryFee, total, isMinimumMet, remainingForMinimum } = useCart();

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-50"
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 ${isRTL ? 'left-0 animate-slide-in-left' : 'right-0 animate-slide-in-right'} h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShoppingCart size={24} className="text-primary" />
                        {t('cartTitle')}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <ShoppingCart size={48} className="text-gray-300" />
                            </div>
                            <p className="text-gray-500 mb-4">{t('cartEmpty')}</p>
                            <Link
                                to="/category"
                                onClick={onClose}
                                className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                            >
                                {t('continueShopping')}
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => {
                                const price = 'dealPrice' in item.product && item.product.dealPrice
                                    ? item.product.dealPrice
                                    : item.product.price;

                                return (
                                    <div
                                        key={item.product.id}
                                        className="flex gap-3 p-3 bg-gray-50 rounded-xl"
                                    >
                                        {/* Image */}
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name[language]}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />

                                        {/* Details */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-gray-800 truncate">
                                                {item.product.name[language]}
                                            </h4>
                                            <p className="text-primary font-semibold">
                                                {price.toFixed(2)} {t('currency')}
                                            </p>

                                            <div className="flex items-center justify-between mt-2">
                                                <QuantityStepper
                                                    quantity={item.quantity}
                                                    onIncrease={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    onDecrease={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    size="sm"
                                                />
                                                <button
                                                    onClick={() => removeFromCart(item.product.id)}
                                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer - Only show if cart has items */}
                {items.length > 0 && (
                    <div className="border-t p-4 space-y-4 bg-white">
                        {/* Minimum Order Warning */}
                        {!isMinimumMet && (
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                                <p className="text-amber-800 text-sm font-medium">
                                    {t('remaining').replace('{amount}', remainingForMinimum.toFixed(2))}
                                </p>
                            </div>
                        )}

                        {/* Summary */}
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">{t('subtotal')}</span>
                                <span className="font-medium">{subtotal.toFixed(2)} {t('currency')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">{t('deliveryLabel')}</span>
                                <span className="font-medium">{deliveryFee.toFixed(2)} {t('currency')}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-2 border-t">
                                <span>{t('total')}</span>
                                <span className="text-primary">{total.toFixed(2)} {t('currency')}</span>
                            </div>
                        </div>

                        {/* Checkout Button */}
                        <Link
                            to="/checkout"
                            onClick={onClose}
                            className={`block w-full py-3 text-center rounded-xl font-semibold transition-colors ${isMinimumMet
                                    ? 'bg-primary text-white hover:bg-primary-700'
                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed pointer-events-none'
                                }`}
                        >
                            {isMinimumMet ? t('checkout') : t('orderDisabled')}
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
