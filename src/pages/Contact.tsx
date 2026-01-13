import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, Send, CheckCircle, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WHATSAPP_NUMBER = '962790796457';

const Contact: React.FC = () => {
    const { language, t } = useLanguage();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
    };

    const contactInfo = [
        {
            icon: Phone,
            label: t('phoneLabel'),
            value: '+962 79 079 6457',
            href: 'tel:+962790796457',
            color: 'from-blue-400 to-cyan-600',
            bgColor: 'bg-blue-50',
        },
        {
            icon: MessageCircle,
            label: t('whatsapp'),
            value: '+962 79 079 6457',
            href: `https://wa.me/${WHATSAPP_NUMBER}`,
            color: 'from-green-400 to-emerald-600',
            bgColor: 'bg-green-50',
        },
        {
            icon: MapPin,
            label: t('location'),
            value: t('locationValue'),
            href: '#',
            color: 'from-red-400 to-rose-600',
            bgColor: 'bg-red-50',
        },
        {
            icon: Clock,
            label: t('hours'),
            value: t('hoursValue'),
            href: '#',
            color: 'from-purple-400 to-violet-600',
            bgColor: 'bg-purple-50',
        },
    ];

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            {/* Hero Section */}
            <section className="relative bg-gradient-premium text-white py-20 lg:py-28 overflow-hidden">
                {/* Animated Background - Premium */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Floating Gradient Orbs */}
                    <div className="absolute -top-40 -end-40 w-[30rem] h-[30rem] bg-gradient-to-br from-blue-400/20 to-cyan-600/15 rounded-full blur-3xl animate-float" />
                    <div className="absolute -bottom-40 -start-40 w-[35rem] h-[35rem] bg-gradient-to-br from-green-400/20 to-emerald-600/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
                    <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-white/5 rounded-full blur-3xl animate-breathe" />

                    {/* Floating Particles */}
                    <div className="absolute top-10 start-[15%] w-3 h-3 bg-yellow-400/70 rounded-full animate-bounce" style={{ animationDuration: '2s' }} />
                    <div className="absolute top-20 end-[20%] w-4 h-4 bg-cyan-300/60 rounded-full animate-bounce" style={{ animationDuration: '2.3s', animationDelay: '0.4s' }} />
                    <div className="absolute bottom-20 start-[25%] w-2 h-2 bg-green-300/70 rounded-full animate-bounce" style={{ animationDuration: '1.9s', animationDelay: '0.8s' }} />
                    <div className="absolute top-1/2 end-[8%] w-3 h-3 bg-blue-400/60 rounded-full animate-bounce" style={{ animationDuration: '2.4s', animationDelay: '1.2s' }} />
                    <div className="absolute bottom-10 end-[35%] w-2 h-2 bg-lime-300/60 rounded-full animate-bounce" style={{ animationDuration: '2.6s', animationDelay: '0.6s' }} />

                    {/* Animated Rings */}
                    <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] border border-white/10 rounded-full animate-spin" style={{ animationDuration: '55s' }} />
                    <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[38rem] border border-white/5 rounded-full animate-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_4s_infinite]" />
                </div>

                {/* Animated Pattern overlay */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '30px 30px',
                }}>
                    <div className="absolute inset-0 animate-pulse" style={{ animationDuration: '3s' }} />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl lg:text-6xl font-black mb-5 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <span className="inline-block hover:scale-105 transition-transform duration-300">{t('contactTitle')}</span>
                    </h1>
                    <p className="text-xl text-white/90 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">{t('contactSubtitle')}</p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-2xl lg:text-3xl font-black mb-8 flex items-center gap-3">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <Phone size={24} className="text-primary" />
                                </div>
                                {t('contactUs')}
                            </h2>

                            <div className="space-y-4">
                                {contactInfo.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href}
                                        target={item.href.startsWith('http') ? '_blank' : undefined}
                                        rel="noopener noreferrer"
                                        className={`flex items-center gap-5 p-5 ${item.bgColor} rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}
                                    >
                                        <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                            <item.icon size={26} className="text-white" />
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm font-medium">{item.label}</p>
                                            <p className="font-bold text-gray-800 text-lg" dir="ltr">{item.value}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            {/* WhatsApp CTA */}
                            <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-8 flex items-center justify-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-8 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <MessageCircle size={26} />
                                تواصل عبر واتساب
                            </a>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <h2 className="text-2xl lg:text-3xl font-black mb-8 flex items-center gap-3">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <Mail size={24} className="text-primary" />
                                </div>
                                {t('sendMessage')}
                            </h2>

                            {submitted ? (
                                <div className="bg-primary/5 border-2 border-primary/20 rounded-3xl p-12 text-center">
                                    <div className="w-20 h-20 bg-gradient-premium rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                        <CheckCircle size={40} className="text-white" />
                                    </div>
                                    <h3 className="text-primary font-black text-2xl mb-2">
                                        {language === 'ar' ? 'شكراً لتواصلك معنا!' : 'Thank you for contacting us!'}
                                    </h3>
                                    <p className="text-gray-500">سنقوم بالرد عليك في أقرب وقت</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-premium space-y-5">
                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-gray-700">{t('yourName')}</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                            required
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-lg"
                                            placeholder="الاسم الكامل"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-gray-700">{t('yourEmail')}</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                            required
                                            dir="ltr"
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-lg"
                                            placeholder="example@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-gray-700">{t('yourMessage')}</label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                            required
                                            rows={5}
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none text-lg"
                                            placeholder="اكتب رسالتك هنا..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-5 bg-gradient-premium text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
                                    >
                                        <Send size={22} />
                                        {t('sendMessage')}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-10">
                            <span className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase mb-4 bg-primary/5 px-6 py-2 rounded-full">
                                <MapPin size={18} />
                                موقعنا
                            </span>
                            <h2 className="text-3xl lg:text-4xl font-black text-gray-900">{t('locationValue')}</h2>
                        </div>
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl h-72 lg:h-96 flex items-center justify-center shadow-inner">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <MapPin size={40} className="text-primary" />
                                </div>
                                <p className="text-gray-600 font-medium">{t('locationValue')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
