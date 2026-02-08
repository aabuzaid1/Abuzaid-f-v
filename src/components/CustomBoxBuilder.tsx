import React, { useState, useMemo } from 'react';
import { X, Plus, Minus, Search, Package, Save, Trash2, ShoppingBag, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { products } from '../data/products';
import { CustomBoxProduct, CustomBox, Product } from '../types';
import { useCustomBoxes } from '../hooks/useCustomBoxes';

interface CustomBoxBuilderProps {
    isOpen: boolean;
    onClose: () => void;
    editingBox?: CustomBox;
}

const CustomBoxBuilder: React.FC<CustomBoxBuilderProps> = ({ isOpen, onClose, editingBox }) => {
    const { language, t } = useLanguage();
    const { addToCart } = useCart();
    const { saveBox } = useCustomBoxes();

    const [selectedProducts, setSelectedProducts] = useState<CustomBoxProduct[]>(
        editingBox?.selectedProducts || []
    );
    const [boxName, setBoxName] = useState(editingBox?.name[language] || '');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showCart, setShowCart] = useState(false);

    const categories = [
        { id: 'all', name: { ar: 'الكل', en: 'All' }, icon: '🛒' },
        { id: 'vegetables', name: { ar: 'خضار', en: 'Vegetables' }, icon: '🥬' },
        { id: 'fruits', name: { ar: 'فواكه', en: 'Fruits' }, icon: '🍎' },
        { id: 'herbs', name: { ar: 'حشائش', en: 'Herbs' }, icon: '🌿' },
    ];

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
            const matchesSearch = searchQuery === '' ||
                product.name.ar.includes(searchQuery) ||
                product.name.en.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch && product.inStock;
        });
    }, [activeCategory, searchQuery]);

    const totalPrice = useMemo(() => {
        return selectedProducts.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    }, [selectedProducts]);

    const totalItems = useMemo(() => {
        return selectedProducts.reduce((total, item) => total + item.quantity, 0);
    }, [selectedProducts]);

    const addProduct = (product: Product) => {
        setSelectedProducts(prev => {
            const existing = prev.find(p => p.product.id === product.id);
            if (existing) {
                return prev.map(p =>
                    p.product.id === product.id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
    };

    const removeProduct = (productId: string) => {
        setSelectedProducts(prev => {
            const existing = prev.find(p => p.product.id === productId);
            if (existing && existing.quantity > 1) {
                return prev.map(p =>
                    p.product.id === productId
                        ? { ...p, quantity: p.quantity - 1 }
                        : p
                );
            }
            return prev.filter(p => p.product.id !== productId);
        });
    };

    const getProductQuantity = (productId: string) => {
        return selectedProducts.find(p => p.product.id === productId)?.quantity || 0;
    };

    const handleSave = () => {
        if (selectedProducts.length === 0 || !boxName.trim()) return;

        const name = {
            ar: boxName,
            en: boxName,
        };

        saveBox(name, selectedProducts, editingBox?.id);

        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setSelectedProducts([]);
            setBoxName('');
            onClose();
        }, 1500);
    };

    const handleAddToCart = () => {
        if (selectedProducts.length === 0) return;

        const name = boxName.trim() || (language === 'ar' ? 'صندوق مخصص' : 'Custom Box');
        const boxData = saveBox({ ar: name, en: name }, selectedProducts, editingBox?.id);

        addToCart(boxData, true);

        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setSelectedProducts([]);
            setBoxName('');
            onClose();
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm">
            <div
                className="bg-gradient-to-b from-gray-50 to-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-5xl h-[95vh] sm:h-[90vh] sm:max-h-[800px] overflow-hidden flex flex-col animate-slide-up"
                style={{ animation: 'slideUp 0.3s ease-out' }}
            >
                {/* Header - Premium Gradient */}
                <div className="relative bg-gradient-premium text-white p-4 sm:p-6">
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-10 -end-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl" />
                        <div className="absolute -bottom-10 -start-10 w-40 h-40 bg-green-400/15 rounded-full blur-2xl" />
                    </div>

                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                <Package size={24} className="text-yellow-400" />
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold">{t('buildYourBox')}</h2>
                                <p className="text-white/70 text-sm hidden sm:block">
                                    {language === 'ar' ? 'اختر منتجاتك المفضلة' : 'Choose your favorite products'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Drag Indicator for Mobile */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/30 rounded-full sm:hidden" />
                </div>

                {/* Success Message */}
                {showSuccess && (
                    <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <div className="bg-white rounded-3xl p-8 text-center mx-4 shadow-2xl animate-bounce-in">
                            <div className="w-20 h-20 bg-gradient-premium rounded-full flex items-center justify-center mx-auto mb-4">
                                <Sparkles size={36} className="text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('customBoxCreated')}</h3>
                            <p className="text-gray-500">
                                {language === 'ar' ? 'تم إضافة الصندوق بنجاح' : 'Box added successfully'}
                            </p>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-1 overflow-hidden flex flex-col">
                    {/* Search & Categories */}
                    <div className="p-4 bg-white border-b border-gray-100 space-y-3">
                        <div className="relative">
                            <Search className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder={t('search')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full ps-12 pe-4 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition text-base"
                            />
                        </div>

                        {/* Category Pills */}
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap text-sm font-medium transition-all ${activeCategory === cat.id
                                            ? 'bg-gradient-premium text-white shadow-lg shadow-primary/30 scale-105'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    <span>{cat.icon}</span>
                                    <span>{cat.name[language]}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Products Grid - Scrollable */}
                    <div className="flex-1 overflow-y-auto p-4 pb-32 sm:pb-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            {filteredProducts.map(product => {
                                const qty = getProductQuantity(product.id);
                                return (
                                    <div
                                        key={product.id}
                                        className={`bg-white rounded-2xl overflow-hidden border-2 transition-all ${qty > 0
                                                ? 'border-primary shadow-lg shadow-primary/10'
                                                : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
                                            }`}
                                    >
                                        <div className="relative aspect-square bg-gray-50">
                                            <img
                                                src={product.image}
                                                alt={product.name[language]}
                                                className="w-full h-full object-cover"
                                            />
                                            {qty > 0 && (
                                                <div className="absolute top-2 end-2 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                                                    {qty}
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-3">
                                            <p className="font-semibold text-gray-800 text-sm truncate mb-1">
                                                {product.name[language]}
                                            </p>
                                            <p className="text-primary font-bold mb-3">
                                                {product.price.toFixed(2)} <span className="text-xs">{t('currency')}</span>
                                            </p>

                                            {qty > 0 ? (
                                                <div className="flex items-center justify-between bg-gray-50 rounded-xl p-1">
                                                    <button
                                                        onClick={() => removeProduct(product.id)}
                                                        className="w-9 h-9 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition"
                                                    >
                                                        <Minus size={18} />
                                                    </button>
                                                    <span className="font-bold text-gray-800 text-lg">{qty}</span>
                                                    <button
                                                        onClick={() => addProduct(product)}
                                                        className="w-9 h-9 flex items-center justify-center text-primary hover:bg-primary/10 rounded-lg transition"
                                                    >
                                                        <Plus size={18} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => addProduct(product)}
                                                    className="w-full py-2.5 bg-gradient-premium text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-1.5"
                                                >
                                                    <Plus size={16} />
                                                    <span>{language === 'ar' ? 'أضف' : 'Add'}</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Mobile Cart Summary Bar */}
                <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl">
                    {showCart ? (
                        /* Expanded Cart */
                        <div className="animate-slide-up">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                    <ShoppingBag size={20} className="text-primary" />
                                    {t('contents')} ({selectedProducts.length})
                                </h3>
                                <button onClick={() => setShowCart(false)} className="text-gray-400">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Box Name Input */}
                            <input
                                type="text"
                                placeholder={t('boxNamePlaceholder')}
                                value={boxName}
                                onChange={(e) => setBoxName(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl mb-3 focus:ring-2 focus:ring-primary/20"
                            />

                            {/* Selected Items */}
                            <div className="max-h-40 overflow-y-auto space-y-2 mb-4">
                                {selectedProducts.length === 0 ? (
                                    <p className="text-center text-gray-400 py-4">{t('boxEmpty')}</p>
                                ) : (
                                    selectedProducts.map(item => (
                                        <div key={item.product.id} className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl">
                                            <img src={item.product.image} alt="" className="w-12 h-12 object-cover rounded-lg" />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-800 text-sm truncate">{item.product.name[language]}</p>
                                                <p className="text-xs text-gray-500">{item.quantity} × {item.product.price.toFixed(2)}</p>
                                            </div>
                                            <button
                                                onClick={() => setSelectedProducts(prev => prev.filter(p => p.product.id !== item.product.id))}
                                                className="p-2 text-red-400"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={selectedProducts.length === 0}
                                    className="py-3.5 bg-gradient-premium text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <ShoppingBag size={18} />
                                    {t('addToCart')}
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={selectedProducts.length === 0 || !boxName.trim()}
                                    className="py-3.5 bg-gray-800 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <Save size={18} />
                                    {t('saveBox')}
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Collapsed Cart Bar */
                        <button
                            onClick={() => setShowCart(true)}
                            className="w-full flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gradient-premium rounded-xl flex items-center justify-center">
                                        <ShoppingBag size={20} className="text-white" />
                                    </div>
                                    {totalItems > 0 && (
                                        <div className="absolute -top-1 -end-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                            {totalItems}
                                        </div>
                                    )}
                                </div>
                                <div className="text-start">
                                    <p className="font-bold text-gray-800">{totalPrice.toFixed(2)} {t('currency')}</p>
                                    <p className="text-xs text-gray-500">{totalItems} {language === 'ar' ? 'منتج' : 'items'}</p>
                                </div>
                            </div>
                            <div className="bg-primary text-white px-6 py-3 rounded-xl font-bold">
                                {language === 'ar' ? 'عرض السلة' : 'View Cart'}
                            </div>
                        </button>
                    )}
                </div>

                {/* Desktop Sidebar Summary */}
                <div className="hidden sm:flex absolute top-20 end-4 bottom-4 w-80 flex-col bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-4 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            <Package size={20} className="text-primary" />
                            {t('contents')} ({selectedProducts.length})
                        </h3>
                    </div>

                    {/* Box Name */}
                    <div className="p-4 border-b border-gray-100">
                        <input
                            type="text"
                            placeholder={t('boxNamePlaceholder')}
                            value={boxName}
                            onChange={(e) => setBoxName(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20"
                        />
                    </div>

                    {/* Selected Items */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {selectedProducts.length === 0 ? (
                            <div className="text-center text-gray-400 py-12">
                                <Package size={48} className="mx-auto mb-3 opacity-30" />
                                <p>{t('boxEmpty')}</p>
                                <p className="text-sm mt-1">{language === 'ar' ? 'أضف منتجات من القائمة' : 'Add products from the list'}</p>
                            </div>
                        ) : (
                            selectedProducts.map(item => (
                                <div key={item.product.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl hover:bg-gray-100 transition">
                                    <img src={item.product.image} alt="" className="w-14 h-14 object-cover rounded-lg" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-800 text-sm truncate">{item.product.name[language]}</p>
                                        <p className="text-xs text-gray-500">{item.quantity} × {item.product.price.toFixed(2)}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedProducts(prev => prev.filter(p => p.product.id !== item.product.id))}
                                        className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Total & Actions */}
                    <div className="p-4 bg-gradient-to-t from-gray-50 to-white border-t border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-medium text-gray-600">{t('totalPrice')}</span>
                            <span className="text-2xl font-bold text-primary">
                                {totalPrice.toFixed(2)} <span className="text-sm">{t('currency')}</span>
                            </span>
                        </div>

                        <div className="space-y-2">
                            <button
                                onClick={handleAddToCart}
                                disabled={selectedProducts.length === 0}
                                className="w-full py-3.5 bg-gradient-premium text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                <ShoppingBag size={20} />
                                {t('addToCart')}
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={selectedProducts.length === 0 || !boxName.trim()}
                                className="w-full py-3.5 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                            >
                                <Save size={20} />
                                {t('saveBox')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animation Keyframes */}
            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-up {
                    animation: slideUp 0.3s ease-out;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default CustomBoxBuilder;
