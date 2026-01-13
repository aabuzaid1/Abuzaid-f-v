import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, MessageCircle, AlertCircle, ArrowRight, ShieldCheck, Truck, Clock, CreditCard, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

const WHATSAPP_NUMBER = '962790796457';

const Checkout: React.FC = () => {
    const { language, t, isRTL } = useLanguage();
    const { items, subtotal, deliveryFee, total, isMinimumMet, remainingForMinimum, clearCart } = useCart();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        area: '',
        address: '',
        slot: '',
        notes: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const areas = [
        'areaAbdali', 'areaJabalAmman', 'areaJabalHussein', 'areaShmeisani',
        'areaSweifieh', 'areaKhalda', 'areaDahiya', 'areaJubeiha',
        'areaTlaAli', 'areaUmUthaina', 'areaMarka', 'areaWehdat',
        'areaHashmi', 'areaTabarbour', 'areaSahab', 'areaOther',
    ];

    const slots = [
        { id: 'slot1', label: t('slot1'), icon: '🌤️' },
        { id: 'slot2', label: t('slot2'), icon: '🌆' },
        { id: 'asap', label: t('slotAsap'), icon: '⚡' },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = t('required');
        if (!formData.phone.trim()) {
            newErrors.phone = t('required');
        } else if (!/^(07[789]\d{7}|(\+?962)?7[789]\d{7})$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = t('invalidPhone');
        }
        if (!formData.area) newErrors.area = t('required');
        if (!formData.address.trim()) newErrors.address = t('required');
        if (!formData.slot) newErrors.slot = t('required');

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const buildWhatsAppMessage = () => {
        const itemsList = items.map(item => {
            const price = 'dealPrice' in item.product && item.product.dealPrice
                ? item.product.dealPrice
                : item.product.price;
            const itemTotal = price * item.quantity;
            const unit = 'unit' in item.product ? t(item.product.unit as any) : t('box');
            return `${item.product.name[language]} - ${item.quantity} ${unit} × ${price.toFixed(2)} ${t('currency')} = ${itemTotal.toFixed(2)} ${t('currency')}`;
        }).join('\n');

        const slotLabel = slots.find(s => s.id === formData.slot)?.label || '';
        const areaLabel = t(formData.area as any);

        if (language === 'ar') {
            return `مرحباً! أود تقديم طلب:

📦 الطلبات:
${itemsList}

💰 الإجمالي الفرعي: ${subtotal.toFixed(2)} د.أ
🚚 رسوم التوصيل: ${deliveryFee.toFixed(2)} د.أ
💵 الإجمالي: ${total.toFixed(2)} د.أ

👤 معلومات العميل:
الاسم: ${formData.name}
الهاتف: ${formData.phone}
المنطقة: ${areaLabel}
العنوان: ${formData.address}
${formData.notes ? `ملاحظات: ${formData.notes}` : ''}

🕐 وقت التوصيل المفضل: ${slotLabel}`;
        }

        return `Hello! I would like to place an order:

📦 Items:
${itemsList}

💰 Subtotal: ${subtotal.toFixed(2)} JOD
🚚 Delivery: ${deliveryFee.toFixed(2)} JOD
💵 Total: ${total.toFixed(2)} JOD

👤 Customer Information:
Name: ${formData.name}
Phone: ${formData.phone}
Area: ${areaLabel}
Address: ${formData.address}
${formData.notes ? `Notes: ${formData.notes}` : ''}

🕐 Preferred Delivery Time: ${slotLabel}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isMinimumMet || !validateForm()) return;

        const message = buildWhatsAppMessage();
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        clearCart();
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center py-8">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <ShoppingCart size={56} className="text-gray-300" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-800 mb-3">{t('cartEmpty')}</h2>
                    <p className="text-gray-500 mb-8">لم تقم بإضافة أي منتجات بعد</p>
                    <Link
                        to="/category"
                        className="inline-flex items-center gap-3 bg-gradient-premium text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    >
                        {t('continueShopping')}
                        <ArrowRight size={20} className={isRTL ? 'rotate-180' : ''} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            {/* Hero Header */}
            <section className="bg-gradient-premium text-white py-10 lg:py-14 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '30px 30px',
                }} />
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-3xl lg:text-4xl font-black text-center">{t('checkoutTitle')}</h1>
                    <p className="text-white/80 text-center mt-2">أكمل بياناتك لإتمام الطلب</p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8 lg:py-12">
                {/* Trust Badges */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {[
                        { icon: ShieldCheck, text: 'ضمان الجودة', color: 'text-green-600 bg-green-50' },
                        { icon: Truck, text: 'توصيل سريع', color: 'text-blue-600 bg-blue-50' },
                        { icon: Clock, text: 'دعم على مدار الساعة', color: 'text-purple-600 bg-purple-50' },
                        { icon: CreditCard, text: 'دفع عند الاستلام', color: 'text-orange-600 bg-orange-50' },
                    ].map((badge, i) => (
                        <div key={i} className={`flex items-center gap-3 p-4 rounded-2xl ${badge.color.split(' ')[1]} border border-gray-100`}>
                            <badge.icon size={24} className={badge.color.split(' ')[0]} />
                            <span className="font-semibold text-gray-800 text-sm">{badge.text}</span>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Customer Info */}
                            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-premium border border-gray-100">
                                <h2 className="text-xl font-black mb-6 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                        <User size={22} className="text-primary" />
                                    </div>
                                    {t('customerInfo')}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-gray-700">{t('fullName')} <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full px-5 py-4 rounded-2xl border-2 ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-primary focus:border-primary transition-all text-lg`}
                                            placeholder="الاسم الكامل"
                                        />
                                        {errors.name && <p className="text-red-500 text-sm mt-2 font-medium">{errors.name}</p>}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-gray-700">{t('phone')} <span className="text-red-500">*</span></label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="07X XXX XXXX"
                                            dir="ltr"
                                            className={`w-full px-5 py-4 rounded-2xl border-2 ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-primary focus:border-primary transition-all text-lg`}
                                        />
                                        {errors.phone && <p className="text-red-500 text-sm mt-2 font-medium">{errors.phone}</p>}
                                    </div>

                                    {/* Area */}
                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-gray-700">{t('area')} <span className="text-red-500">*</span></label>
                                        <select
                                            name="area"
                                            value={formData.area}
                                            onChange={handleChange}
                                            className={`w-full px-5 py-4 rounded-2xl border-2 ${errors.area ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-primary focus:border-primary transition-all text-lg appearance-none bg-white`}
                                        >
                                            <option value="">{t('selectArea')}</option>
                                            {areas.map((area) => (
                                                <option key={area} value={area}>{t(area as any)}</option>
                                            ))}
                                        </select>
                                        {errors.area && <p className="text-red-500 text-sm mt-2 font-medium">{errors.area}</p>}
                                    </div>

                                    {/* Delivery Slot */}
                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-gray-700">{t('deliverySlot')} <span className="text-red-500">*</span></label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {slots.map((slot) => (
                                                <button
                                                    key={slot.id}
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, slot: slot.id }))}
                                                    className={`p-3 rounded-xl border-2 text-center transition-all ${formData.slot === slot.id
                                                            ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <span className="text-xl block mb-1">{slot.icon}</span>
                                                    <span className="text-xs font-medium text-gray-700">{slot.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                        {errors.slot && <p className="text-red-500 text-sm mt-2 font-medium">{errors.slot}</p>}
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="mt-5">
                                    <label className="block text-sm font-bold mb-2 text-gray-700">{t('address')} <span className="text-red-500">*</span></label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        rows={2}
                                        placeholder="العنوان بالتفصيل (اسم الشارع، رقم البناية، الطابق)"
                                        className={`w-full px-5 py-4 rounded-2xl border-2 ${errors.address ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none text-lg`}
                                    />
                                    {errors.address && <p className="text-red-500 text-sm mt-2 font-medium">{errors.address}</p>}
                                </div>

                                {/* Notes */}
                                <div className="mt-5">
                                    <label className="block text-sm font-bold mb-2 text-gray-700">{t('notes')} <span className="text-gray-400 font-normal">(اختياري)</span></label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        rows={2}
                                        placeholder={t('notesPlaceholder')}
                                        className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none text-lg"
                                    />
                                </div>
                            </div>

                            {/* Submit Button - Mobile */}
                            <div className="lg:hidden">
                                {!isMinimumMet && (
                                    <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-4 flex items-center gap-3">
                                        <AlertCircle className="text-amber-600 flex-shrink-0" size={24} />
                                        <p className="text-amber-800 font-bold">
                                            {t('remaining').replace('{amount}', remainingForMinimum.toFixed(2))}
                                        </p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={!isMinimumMet}
                                    className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all duration-300 ${isMinimumMet
                                        ? 'bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white hover:shadow-2xl hover:-translate-y-1'
                                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    <MessageCircle size={26} />
                                    {isMinimumMet ? t('completeOrder') : t('orderDisabled')}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-6 shadow-premium border border-gray-100 sticky top-24">
                            <h2 className="text-xl font-black mb-6 flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <ShoppingCart size={22} className="text-primary" />
                                </div>
                                {t('orderSummary')}
                            </h2>

                            {/* Items */}
                            <div className="space-y-3 max-h-64 overflow-auto mb-6 pe-2">
                                {items.map((item) => {
                                    const price = 'dealPrice' in item.product && item.product.dealPrice
                                        ? item.product.dealPrice
                                        : item.product.price;

                                    return (
                                        <div key={item.product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                            <img
                                                src={item.product.image}
                                                alt=""
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-800 truncate text-sm">
                                                    {item.product.name[language]}
                                                </p>
                                                <p className="text-gray-500 text-xs">× {item.quantity}</p>
                                            </div>
                                            <span className="font-bold text-primary">
                                                {(price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Totals */}
                            <div className="border-t-2 border-dashed border-gray-200 pt-5 space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>{t('subtotal')}</span>
                                    <span className="font-bold">{subtotal.toFixed(2)} {t('currency')}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span className="flex items-center gap-2">
                                        <Truck size={16} />
                                        {t('deliveryLabel')}
                                    </span>
                                    <span className="font-bold">{deliveryFee.toFixed(2)} {t('currency')}</span>
                                </div>
                                <div className="flex justify-between text-xl font-black pt-3 border-t-2 border-gray-200">
                                    <span>{t('total')}</span>
                                    <span className="text-primary">{total.toFixed(2)} {t('currency')}</span>
                                </div>
                            </div>

                            {/* Desktop Submit */}
                            <div className="hidden lg:block mt-6">
                                {!isMinimumMet && (
                                    <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-4 text-center">
                                        <p className="text-amber-800 font-bold text-sm">
                                            {t('remaining').replace('{amount}', remainingForMinimum.toFixed(2))}
                                        </p>
                                    </div>
                                )}

                                <button
                                    onClick={handleSubmit}
                                    disabled={!isMinimumMet}
                                    className={`w-full py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all duration-300 ${isMinimumMet
                                        ? 'bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white hover:shadow-2xl hover:-translate-y-1'
                                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    <MessageCircle size={24} />
                                    {isMinimumMet ? t('completeOrder') : t('orderDisabled')}
                                </button>

                                {isMinimumMet && (
                                    <p className="text-center text-gray-500 text-sm mt-3 flex items-center justify-center gap-2">
                                        <CheckCircle size={16} className="text-green-500" />
                                        سيتم التواصل عبر واتساب
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
