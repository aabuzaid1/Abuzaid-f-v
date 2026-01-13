import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Leaf, Instagram, Facebook, MessageCircle, ArrowUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WHATSAPP_NUMBER = '962790796457';

const Footer: React.FC = () => {
    const { t } = useLanguage();

    const quickLinks = [
        { path: '/', label: t('home') },
        { path: '/category', label: t('products') },
        { path: '/boxes', label: t('boxes') },
        { path: '/delivery', label: t('delivery') },
    ];

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -end-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -start-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            </div>

            {/* Main Footer */}
            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-14 h-14 bg-gradient-premium rounded-2xl flex items-center justify-center shadow-lg glow-green">
                                <Leaf className="text-white" size={30} />
                            </div>
                            <div>
                                <h3 className="font-black text-xl">{t('brandName')}</h3>
                                <p className="text-gray-400 text-sm">{t('since')}</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            {t('footerDescription')}
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-110"
                                aria-label="Instagram"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="#"
                                className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110"
                                aria-label="Facebook"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#25D366] transition-all duration-300 hover:scale-110"
                                aria-label="WhatsApp"
                            >
                                <MessageCircle size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-5 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-gradient-to-r from-primary to-green-400 rounded-full" />
                            {t('quickLinks')}
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-white hover:ps-2 transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <span className="w-0 h-0.5 bg-primary group-hover:w-3 transition-all duration-300 rounded-full" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-lg mb-5 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-gradient-to-r from-primary to-green-400 rounded-full" />
                            {t('contactUs')}
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href={`tel:+${WHATSAPP_NUMBER}`}
                                    className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group"
                                >
                                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                                        <Phone size={18} className="text-primary" />
                                    </div>
                                    <span dir="ltr">+962 79 079 6457</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 text-gray-400 hover:text-[#25D366] transition-colors group"
                                >
                                    <div className="w-10 h-10 bg-[#25D366]/20 rounded-xl flex items-center justify-center group-hover:bg-[#25D366]/30 transition-colors">
                                        <MessageCircle size={18} className="text-[#25D366]" />
                                    </div>
                                    <span>{t('whatsapp')}</span>
                                </a>
                            </li>
                            <li className="flex items-start gap-4 text-gray-400">
                                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <MapPin size={18} className="text-primary" />
                                </div>
                                <span className="mt-2">{t('locationValue')}</span>
                            </li>
                            <li className="flex items-center gap-4 text-gray-400">
                                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                                    <Clock size={18} className="text-primary" />
                                </div>
                                <span>{t('hoursValue')}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Payment & CTA */}
                    <div>
                        <h4 className="font-bold text-lg mb-5 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-gradient-to-r from-primary to-green-400 rounded-full" />
                            {t('paymentInfo')}
                        </h4>

                        <div className="p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 mb-6">
                            <p className="text-gray-400 text-sm mb-2">طريقة الدفع</p>
                            <p className="font-bold text-lg text-white">{t('cashOnDelivery')}</p>
                        </div>

                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-6 py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-[#25D366]/30 transition-all duration-300 hover:scale-105 w-full"
                        >
                            <MessageCircle size={22} />
                            اطلب الآن
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container mx-auto px-4 py-5 text-center">
                    {/* Developer Credit */}
                    <p className="text-sm text-gray-500 mb-2">
                        {t('developerCredit')} <span className="text-primary font-semibold">Abdelrahman Abuzaid</span>
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mb-3">
                        <a
                            href="tel:0790796457"
                            className="hover:text-white transition-colors flex items-center gap-1"
                        >
                            <Phone size={14} />
                            <span dir="ltr">0790796457</span>
                        </a>
                        <a
                            href="https://www.instagram.com/a.abuzaid06?igsh=MWF6MjF0cWcwZGhsYw=="
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-pink-500 transition-colors flex items-center gap-1"
                        >
                            <Instagram size={14} />
                            <span>@a.abuzaid06</span>
                        </a>
                    </div>
                    <p className="text-sm text-gray-500">
                        © 2025{' '}
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="text-primary hover:text-primary/80 transition-colors cursor-pointer font-semibold"
                        >
                            {t('brandName')}
                        </button>
                        . {t('rights')}
                    </p>
                    {/* Scroll to Top Button */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="mt-4 mx-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary/20 hover:bg-primary/30 text-primary rounded-full transition-all duration-300 hover:scale-105 group"
                    >
                        <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform" />
                        <span className="text-sm font-semibold">العودة للأعلى</span>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
