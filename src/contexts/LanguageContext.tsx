import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, TranslationKey } from '../data/translations';
import { Language } from '../types';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: TranslationKey) => string;
    isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        const saved = localStorage.getItem('language');
        return (saved === 'ar' || saved === 'en') ? saved : 'ar';
    });

    const isRTL = language === 'ar';

    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.lang = language;
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        document.body.style.fontFamily = isRTL ? "'Cairo', sans-serif" : "'Inter', sans-serif";
    }, [language, isRTL]);

    const toggleLanguage = () => {
        // Add switching animation class
        document.body.classList.add('lang-switching');

        // Wait for fade out, then switch language
        setTimeout(() => {
            setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
            document.body.classList.remove('lang-switching');
            document.body.classList.add('lang-switched');

            // Remove animation class after fade in
            setTimeout(() => {
                document.body.classList.remove('lang-switched');
            }, 300);
        }, 150);
    };

    const t = (key: TranslationKey): string => {
        const translation = translations[key];
        if (!translation) {
            console.warn(`Translation missing for key: ${key}`);
            return key;
        }
        return translation[language];
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t, isRTL }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
