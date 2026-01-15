import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

const Cart: React.FC = () => {
    const { language, t, isRTL } = useLanguage();
    const { items, subtotal, deliveryFee, total, isMinimumMet, remainingForMinimum, updateQuantity, removeFromCart, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-[#FAFAFA]">
                {/* Hero */}
                <section className="bg-gradient-premium text-white py-12 lg:py-16 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '30px 30px',
                    }} />
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <h1 className="text-3xl lg:text-4xl font-black flex items-center justify-center gap-3">
                            <ShoppingCart size={36} />
                            {t('shoppingCart')}
                        </h1>
                    </div>
                </section>

                <div className="flex items-center justify-center py-20">
                    <div className="text-center max-w-md mx-auto px-4">
                        <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <ShoppingBag size={56} className="text-gray-300" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-800 mb-3">{t('cartEmpty')}</h2>
                        <p className="text-gray-500 mb-8">{t('startShopping')}</p>
                        <Link
                            to="/category"
                            className="inline-flex items-center gap-3 bg-gradient-premium text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                        >
                            {t('browseProducts')}
                            <ArrowLeft size={20} className={isRTL ? '' : 'rotate-180'} />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            {/* Hero Header */}
            <section className="bg-gradient-premium text-white py-12 lg:py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '30px 30px',
                }} />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-black flex items-center gap-3">
                                <ShoppingCart size={36} />
                                {t('shoppingCart')}
                            </h1>
                            <p className="text-white/80 mt-2">{items.length} {t('productInCart')}</p>
                        </div>
                        <Link
                            to="/category"
                            className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-5 py-3 rounded-xl font-bold border border-white/20 hover:bg-white/20 transition-all"
                        >
                            <ShoppingBag size={20} />
                            {t('continueBrowsing')}
                        </Link>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Header Row */}
                        <div className="hidden md:flex items-center justify-between px-6 py-3 bg-gray-100 rounded-2xl text-sm font-bold text-gray-600">
                            <span className="flex-1">{t('productLabel')}</span>
                            <span className="w-32 text-center">{t('quantityLabel')}</span>
                            <span className="w-28 text-center">{t('priceLabel')}</span>
                            <span className="w-20 text-center">{t('deleteLabel')}</span>
                        </div>

                        {/* Items */}
                        {items.map((item, index) => {
                            const price = 'dealPrice' in item.product && item.product.dealPrice
                                ? item.product.dealPrice
                                : item.product.price;
                            const itemTotal = price * item.quantity;

                            return (
                                <div
                                    key={item.product.id}
                                    className="bg-white rounded-3xl p-5 shadow-premium hover-lift fade-in"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        {/* Product Info */}
                                        <div className="flex items-center gap-4 flex-1">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name[language]}
                                                className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl object-cover shadow-md"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg text-gray-900">
                                                    {item.product.name[language]}
                                                </h3>
                                                <p className="text-primary font-bold text-lg mt-1">
                                                    {price.toFixed(2)} {t('currency')}
                                                    {'unit' in item.product && (
                                                        <span className="text-gray-400 text-sm font-normal"> / {t(item.product.unit as any)}</span>
                                                    )}
                                                </p>
                                                {'isDeal' in item.product && item.product.isDeal && (
                                                    <span className="inline-flex items-center gap-1 text-xs bg-gradient-gold text-white px-2 py-1 rounded-full mt-2">
                                                        <Sparkles size={12} />
                                                        {t('specialOffer')}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Quantity */}
                                        <div className="flex items-center justify-between md:justify-center gap-6">
                                            <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                                                >
                                                    <Minus size={18} />
                                                </button>
                                                <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                                                >
                                                    <Plus size={18} />
                                                </button>
                                            </div>

                                            {/* Item Total - Mobile */}
                                            <div className="md:hidden text-end">
                                                <span className="font-black text-xl text-gray-900">
                                                    {itemTotal.toFixed(2)} {t('currency')}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Item Total - Desktop */}
                                        <div className="hidden md:block w-28 text-center">
                                            <span className="font-black text-xl text-gray-900">
                                                {itemTotal.toFixed(2)}
                                            </span>
                                            <span className="text-gray-500 text-sm block">{t('currency')}</span>
                                        </div>

                                        {/* Delete */}
                                        <div className="hidden md:flex w-20 justify-center">
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="w-12 h-12 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                            >
                                                <Trash2 size={22} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Mobile Delete Button */}
                                    <button
                                        onClick={() => removeFromCart(item.product.id)}
                                        className="md:hidden flex items-center gap-2 text-red-500 mt-4 pt-4 border-t border-gray-100 w-full justify-center font-medium"
                                    >
                                        <Trash2 size={18} />
                                        {t('removeFromCart')}
                                    </button>
                                </div>
                            );
                        })}

                        {/* Clear Cart */}
                        <div className="flex items-center justify-between pt-4">
                            <Link
                                to="/category"
                                className="flex items-center gap-2 text-primary font-bold hover:underline"
                            >
                                <ArrowRight size={18} className={isRTL ? '' : 'rotate-180'} />
                                {t('continueBrowsing')}
                            </Link>
                            <button
                                onClick={clearCart}
                                className="flex items-center gap-2 text-red-500 font-bold hover:underline"
                            >
                                <Trash2 size={18} />
                                {t('clearCart')}
                            </button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-premium sticky top-24">
                            <h2 className="text-xl font-black mb-6">{t('orderSummaryTitle')}</h2>

                            {/* Summary Details */}
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>{t('subtotalItems')} ({items.length})</span>
                                    <span className="font-bold">{subtotal.toFixed(2)} {t('currency')}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>{t('deliveryLabel')}</span>
                                    <span className="font-bold">{deliveryFee.toFixed(2)} {t('currency')}</span>
                                </div>
                                <div className="border-t-2 border-dashed border-gray-200 pt-4">
                                    <div className="flex justify-between text-xl font-black">
                                        <span>{t('total')}</span>
                                        <span className="text-primary">{total.toFixed(2)} {t('currency')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Minimum Order Warning */}
                            {!isMinimumMet && (
                                <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-6 text-center">
                                    <p className="text-amber-800 font-bold text-sm">
                                        {t('addForMinimum')}: {remainingForMinimum.toFixed(2)} {t('currency')}
                                    </p>
                                    <div className="w-full bg-amber-200 rounded-full h-2 mt-3">
                                        <div
                                            className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${Math.min((subtotal / 5) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Checkout Button */}
                            <Link
                                to="/checkout"
                                className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all duration-300 ${isMinimumMet
                                    ? 'bg-gradient-premium text-white hover:shadow-xl hover:-translate-y-1'
                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed pointer-events-none'
                                    }`}
                            >
                                {t('proceedToCheckout')}
                                <ArrowLeft size={22} className={isRTL ? '' : 'rotate-180'} />
                            </Link>

                            {/* Trust Note */}
                            <p className="text-center text-gray-500 text-sm mt-4">
                                🔒 {t('secureTransaction')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
