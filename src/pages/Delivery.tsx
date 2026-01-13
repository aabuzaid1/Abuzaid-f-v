import React from 'react';
import { Truck, Clock, MapPin, CreditCard, CheckCircle, ShieldCheck, Zap, Package } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Delivery: React.FC = () => {
    const { t } = useLanguage();

    const areas = [
        'areaAbdali', 'areaJabalAmman', 'areaJabalHussein', 'areaShmeisani',
        'areaSweifieh', 'areaKhalda', 'areaDahiya', 'areaJubeiha',
        'areaTlaAli', 'areaUmUthaina', 'areaMarka', 'areaWehdat',
        'areaHashmi', 'areaTabarbour', 'areaSahab',
    ];

    const infoCards = [
        {
            icon: Truck,
            titleKey: 'deliveryFeeLabel',
            value: '1',
            suffixKey: 'onlyJod',
            descKey: 'deliverToAllAreas',
            color: 'from-green-400 to-emerald-600',
        },
        {
            icon: Package,
            titleKey: 'minOrderLabel',
            value: '10',
            suffixKey: 'currency',
            descKey: 'toQualifyDelivery',
            color: 'from-blue-400 to-cyan-600',
        },
        {
            icon: CreditCard,
            titleKey: 'paymentMethod',
            valueKey: 'cashLabel',
            suffixKey: 'uponDelivery',
            descKey: 'safeConvenient',
            color: 'from-purple-400 to-violet-600',
        },
        {
            icon: Clock,
            titleKey: 'deliveryHours',
            valueKey: 'daily',
            suffixKey: 'timeRange',
            descKey: 'allWeek',
            color: 'from-orange-400 to-red-500',
        },
    ];

    const slots = [
        { id: 'morning', icon: '🌤️', titleKey: 'morningSlot', timeKey: 'morningTime', color: 'from-amber-100 to-yellow-100' },
        { id: 'evening', icon: '🌆', titleKey: 'eveningSlot', timeKey: 'eveningTime', color: 'from-indigo-100 to-purple-100' },
        { id: 'asap', icon: '⚡', titleKey: 'expressDelivery', timeKey: 'withinTwoHours', color: 'from-green-100 to-emerald-100', featured: true },
    ];

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            {/* Hero Section */}
            <section className="relative bg-gradient-premium text-white py-20 lg:py-28 overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -end-40 w-[30rem] h-[30rem] bg-white/5 rounded-full blur-3xl animate-float" />
                    <div className="absolute -bottom-40 -start-40 w-[35rem] h-[35rem] bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
                </div>

                {/* Pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '30px 30px',
                }} />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-8 border border-white/20 fade-in">
                        <Truck size={18} className="animate-bounce" />
                        <span className="font-bold">{t('fastReliableDelivery')}</span>
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-black mb-5 fade-in" style={{ animationDelay: '0.1s' }}>
                        {t('deliveryService')}
                    </h1>
                    <p className="text-xl text-white/90 flex items-center justify-center gap-2 fade-in" style={{ animationDelay: '0.2s' }}>
                        <MapPin size={20} />
                        {t('deliverToAllAmman')}
                    </p>
                </div>
            </section>

            {/* Info Cards */}
            <section className="py-16 relative -mt-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {infoCards.map((card, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-3xl p-8 shadow-premium hover-lift text-center fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className={`w-20 h-20 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg`}>
                                    <card.icon size={36} className="text-white" />
                                </div>
                                <h3 className="font-bold text-lg mb-3 text-gray-700">{t(card.titleKey as any)}</h3>
                                <div className="flex items-baseline justify-center gap-1 mb-2">
                                    <span className="text-3xl font-black text-gray-900">
                                        {card.value || t(card.valueKey as any)}
                                    </span>
                                    <span className="text-lg font-bold text-primary">{t(card.suffixKey as any)}</span>
                                </div>
                                <p className="text-gray-500 text-sm">{t(card.descKey as any)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Delivery Times */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase mb-4 bg-primary/5 px-6 py-2 rounded-full">
                            <Clock size={18} />
                            {t('chooseTime')}
                        </span>
                        <h2 className="text-3xl lg:text-5xl font-black text-gray-900">{t('availableSlots')}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {slots.map((slot, index) => (
                            <div
                                key={slot.id}
                                className={`relative bg-gradient-to-br ${slot.color} rounded-3xl p-8 text-center hover-lift fade-in ${slot.featured ? 'ring-4 ring-primary ring-offset-4' : ''}`}
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                {slot.featured && (
                                    <div className="absolute -top-3 start-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                                        <Zap size={12} className="inline me-1" />
                                        {t('fastest')}
                                    </div>
                                )}
                                <div className="text-6xl mb-5">{slot.icon}</div>
                                <h3 className="font-black text-xl text-gray-900 mb-2">{t(slot.titleKey as any)}</h3>
                                <p className="text-primary font-bold text-lg">{t(slot.timeKey as any)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Areas */}
            <section className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
                <div className="absolute top-0 end-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase mb-4 bg-primary/5 px-6 py-2 rounded-full">
                            <MapPin size={18} />
                            {t('coverageAreas')}
                        </span>
                        <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-4">{t('deliverEverywhere')}</h2>
                        <p className="text-gray-500 text-lg">{t('selectYourArea')}</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
                        {areas.map((area, index) => (
                            <span
                                key={area}
                                className="bg-white px-6 py-3 rounded-2xl text-gray-700 font-medium shadow-sm hover:shadow-md hover:bg-primary hover:text-white transition-all duration-300 cursor-default fade-in"
                                style={{ animationDelay: `${index * 0.03}s` }}
                            >
                                {t(area as any)}
                            </span>
                        ))}
                    </div>

                    {/* Call to action */}
                    <div className="text-center mt-16">
                        <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-2xl shadow-premium">
                            <CheckCircle className="text-primary" size={24} />
                            <span className="font-bold text-gray-800">{t('areaNotListed')}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Payment Info */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-gradient-premium rounded-[2rem] p-10 lg:p-14 text-white text-center relative overflow-hidden">
                        {/* Pattern */}
                        <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '20px 20px',
                        }} />

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 bg-white/10 px-6 py-2 rounded-full mb-6 border border-white/20">
                                <ShieldCheck size={20} />
                                <span className="font-bold">{t('safePayment')}</span>
                            </div>

                            <h2 className="text-3xl lg:text-4xl font-black mb-4">{t('payOnDelivery')}</h2>
                            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                                {t('noPrePayment')}
                            </p>

                            <div className="flex items-center justify-center gap-4 flex-wrap">
                                <div className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-xl">
                                    <span className="text-2xl">💵</span>
                                    <span className="font-bold">{t('cashPaymentLabel')}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-xl">
                                    <span className="text-2xl">🔒</span>
                                    <span className="font-bold">{t('secure100')}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-xl">
                                    <span className="text-2xl">✅</span>
                                    <span className="font-bold">{t('noExtraFees')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Delivery;
