import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import CartDrawer from './CartDrawer';

const Header: React.FC = () => {
    const { language, toggleLanguage, t } = useLanguage();
    const { cartCount } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { path: '/', label: t('home') },
        { path: '/category', label: t('products') },
        { path: '/boxes', label: t('boxes') },
        { path: '/delivery', label: t('delivery') },
        { path: '/contact', label: t('contact') },
    ];

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <>
            {/* Info Ribbon - Premium with Animation */}
            <div className="bg-gradient-to-r from-primary via-green-600 to-primary bg-[length:200%_100%] animate-gradient text-white text-sm py-3 relative overflow-hidden">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />

                <div className="container mx-auto px-4 flex items-center justify-center gap-8 flex-wrap text-center relative z-10">
                    <span className="flex items-center gap-2 font-medium">
                        <span className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full">
                            🚚
                        </span>
                        {t('deliveryFee')}
                    </span>
                    <span className="hidden sm:inline text-white/40">•</span>
                    <span className="flex items-center gap-2 font-medium">
                        <span className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full">
                            💵
                        </span>
                        {t('cod')}
                    </span>
                </div>
            </div>

            {/* Main Header - Premium */}
            <header className="bg-white/95 backdrop-blur-lg shadow-premium sticky top-0 z-50 border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-18 lg:h-20">
                        {/* Brand Name */}
                        <Link
                            to="/"
                            className="flex items-center group"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            <h1 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-600 to-primary text-xl lg:text-2xl group-hover:from-green-600 group-hover:to-primary transition-all duration-500">
                                {t('brandName')}
                            </h1>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`relative px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${isActive(item.path)
                                        ? 'bg-gradient-premium text-white shadow-lg'
                                        : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                                        }`}
                                >
                                    {item.label}
                                    {isActive(item.path) && (
                                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                                    )}
                                </Link>
                            ))}
                        </nav>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-2">

                            {/* Language Toggle */}
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 hover:scale-105 border border-gray-100"
                            >
                                <Globe size={18} className="text-primary" />
                                <span className="text-sm font-bold text-gray-700">
                                    {language === 'ar' ? 'EN' : 'عربي'}
                                </span>
                            </button>

                            {/* Cart Button */}
                            <button
                                onClick={() => setCartDrawerOpen(true)}
                                className="relative p-2.5 rounded-xl bg-primary/5 hover:bg-primary/10 transition-all duration-300 hover:scale-105 group"
                            >
                                <ShoppingCart size={24} className="text-primary group-hover:scale-110 transition-transform" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -end-1 bg-gradient-gold text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg badge-pulse">
                                        {cartCount > 9 ? '9+' : cartCount}
                                    </span>
                                )}
                            </button>

                            {/* Mobile Menu Toggle - Animated Hamburger */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-green-500/10 hover:from-primary/20 hover:to-green-500/20 transition-all duration-300 hover:scale-105 group"
                                aria-label="Menu"
                            >
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
                                    <span className={`w-6 h-0.5 bg-primary rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                    <span className={`w-6 h-0.5 bg-primary rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-0' : ''}`} />
                                    <span className={`w-6 h-0.5 bg-primary rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu - Smooth Overlay */}
                <div className={`lg:hidden fixed inset-0 top-[calc(3rem+52px)] z-40 transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                    {/* Backdrop */}
                    <div
                        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Menu Panel */}
                    <div className={`relative bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-2xl transition-all duration-500 ease-out ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                        <nav className="container mx-auto px-4 py-6 space-y-2">
                            {navItems.map((item, index) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-semibold transition-all duration-300 ${isActive(item.path)
                                        ? 'bg-gradient-premium text-white shadow-lg shadow-primary/30'
                                        : 'text-gray-700 hover:bg-primary/5 hover:text-primary hover:translate-x-2'
                                        }`}
                                    style={{
                                        transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms',
                                        transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                                        opacity: mobileMenuOpen ? 1 : 0
                                    }}
                                >
                                    <span className={`w-2 h-2 rounded-full ${isActive(item.path) ? 'bg-white' : 'bg-primary'}`} />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Cart Drawer */}
            <CartDrawer isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
        </>
    );
};

export default Header;
