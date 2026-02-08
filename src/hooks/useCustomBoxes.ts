import { useState, useEffect, useCallback } from 'react';
import { CustomBox, CustomBoxProduct } from '../types';

const STORAGE_KEY = 'abuziad-custom-boxes';

export const useCustomBoxes = () => {
    const [customBoxes, setCustomBoxes] = useState<CustomBox[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setCustomBoxes(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse custom boxes:', e);
            }
        }
    }, []);

    // Save to localStorage whenever boxes change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(customBoxes));
    }, [customBoxes]);

    const generateContents = (products: CustomBoxProduct[], language: 'ar' | 'en'): string[] => {
        return products.map(item => {
            const unitMap: Record<string, { ar: string; en: string }> = {
                kg: { ar: 'كيلو', en: 'kg' },
                piece: { ar: 'حبة', en: 'pc' },
                bunch: { ar: 'ربطة', en: 'bunch' },
                gram250: { ar: '250 غرام', en: '250g' },
                gram500: { ar: '500 غرام', en: '500g' },
                box: { ar: 'صندوق', en: 'box' },
            };
            const unit = unitMap[item.product.unit]?.[language] || item.product.unit;
            return `${item.quantity} ${unit} ${item.product.name[language]}`;
        });
    };

    const calculatePrice = (products: CustomBoxProduct[]): number => {
        return products.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    const saveBox = useCallback((name: { ar: string; en: string }, products: CustomBoxProduct[], existingId?: string) => {
        const price = calculatePrice(products);

        const newBox: CustomBox = {
            id: existingId || `custom-${Date.now()}`,
            name,
            description: {
                ar: 'صندوق مخصص من اختيارك',
                en: 'Custom box of your choice',
            },
            contents: {
                ar: generateContents(products, 'ar'),
                en: generateContents(products, 'en'),
            },
            price,
            image: products[0]?.product.image || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
            inStock: true,
            isCustom: true,
            selectedProducts: products,
            createdAt: existingId ? customBoxes.find(b => b.id === existingId)?.createdAt || new Date().toISOString() : new Date().toISOString(),
        };

        if (existingId) {
            setCustomBoxes(prev => prev.map(box => box.id === existingId ? newBox : box));
        } else {
            setCustomBoxes(prev => [...prev, newBox]);
        }

        return newBox;
    }, [customBoxes]);

    const deleteBox = useCallback((id: string) => {
        setCustomBoxes(prev => prev.filter(box => box.id !== id));
    }, []);

    const getBox = useCallback((id: string) => {
        return customBoxes.find(box => box.id === id);
    }, [customBoxes]);

    return {
        customBoxes,
        saveBox,
        deleteBox,
        getBox,
        calculatePrice,
    };
};
