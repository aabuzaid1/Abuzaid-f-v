import React from 'react';
import { Leaf, Scale, Award, Calendar, Clock, Users, Star, Heart, Sparkles, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
    const { t } = useLanguage();

    const timeline = [
        { year: t('year1993'), event: t('event1993'), icon: '🌱' },
        { year: t('year1997'), event: t('event1997'), icon: '🏪' },
        { year: t('today'), event: t('eventToday'), icon: '🚀' },
    ];

    const stats = [
        { number: '33', label: 'سنة خبرة', icon: Clock, suffix: '+' },
        { number: '1000', label: 'عميل سعيد', icon: Users, suffix: '+' },
        { number: '5', label: 'تقييم', icon: Star, suffix: '⭐' },
        { number: '100', label: 'رضا العملاء', icon: Heart, suffix: '%' },
    ];

    const values = [
        { icon: Leaf, title: t('freshDaily'), desc: 'منتجات طازجة يومياً من أفضل المزارع', color: 'from-green-400 to-emerald-600' },
        { icon: Scale, title: t('fairWeight'), desc: 'وزن دقيق وعادل بدون زيادة أو نقصان', color: 'from-blue-400 to-cyan-600' },
        { icon: Award, title: t('familyTrust'), desc: 'ثقة بُنيت على مدار ثلاثة عقود', color: 'from-amber-400 to-orange-600' },
    ];

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            {/* Hero Section */}
            <section className="relative bg-gradient-premium text-white py-20 lg:py-28 overflow-hidden">
                {/* Background decoration */}
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
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-8 border border-white/20">
                        <Sparkles size={18} className="text-yellow-400" />
                        <span className="font-bold">منذ 1993</span>
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-black mb-5">{t('aboutTitle')}</h1>
                    <p className="text-2xl text-white/90 font-bold">{t('brandName')}</p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white relative -mt-10 mx-4 lg:mx-auto max-w-6xl rounded-3xl shadow-premium z-20">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-6 lg:px-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="inline-flex items-center gap-1 mb-2">
                                <span className="text-4xl lg:text-5xl font-black text-primary">{stat.number}</span>
                                <span className="text-xl font-bold text-yellow-500">{stat.suffix}</span>
                            </div>
                            <p className="text-gray-600 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 lg:py-28">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase mb-4 bg-primary/5 px-6 py-2 rounded-full">
                            قصتنا
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-8">
                            رحلة ثلاثة عقود من التميز
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            {t('aboutText')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase mb-4 bg-primary/5 px-6 py-2 rounded-full">
                            <Calendar size={18} />
                            مسيرتنا
                        </span>
                        <h2 className="text-3xl lg:text-5xl font-black text-gray-900">{t('ourJourney')}</h2>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="relative">
                            {/* Line */}
                            <div className="absolute start-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-green-400 to-primary rounded-full" />

                            {/* Events */}
                            <div className="space-y-10">
                                {timeline.map((item, index) => (
                                    <div key={index} className="relative flex items-start gap-8 ps-24 fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                                        {/* Dot */}
                                        <div className="absolute start-4 w-10 h-10 bg-gradient-premium rounded-full flex items-center justify-center text-xl shadow-lg ring-4 ring-white">
                                            {item.icon}
                                        </div>

                                        {/* Content */}
                                        <div className="bg-gray-50 rounded-3xl p-8 flex-1 hover-lift border border-gray-100">
                                            <span className="inline-block px-4 py-1 bg-primary/10 text-primary font-black rounded-full text-lg mb-3">
                                                {item.year}
                                            </span>
                                            <p className="text-gray-700 text-lg leading-relaxed">{item.event}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 start-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
                <div className="absolute bottom-0 end-0 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl translate-x-1/2" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase mb-4 bg-primary/5 px-6 py-2 rounded-full">
                            <CheckCircle size={18} />
                            مبادئنا
                        </span>
                        <h2 className="text-3xl lg:text-5xl font-black text-gray-900">{t('ourValues')}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="text-center p-10 bg-white rounded-[2rem] shadow-premium hover-lift fade-in"
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <div className={`w-24 h-24 bg-gradient-to-br ${value.color} rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                                    <value.icon size={44} className="text-white" />
                                </div>
                                <h3 className="font-black text-2xl text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
