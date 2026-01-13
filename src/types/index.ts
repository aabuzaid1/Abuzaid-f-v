export interface Product {
    id: string;
    name: {
        ar: string;
        en: string;
    };
    category: 'vegetables' | 'fruits' | 'herbs' | 'organic' | 'imported';
    price: number;
    unit: 'kg' | 'piece' | 'bunch' | 'gram250' | 'gram500' | 'box';
    image: string;
    inStock: boolean;
    isDeal?: boolean;
    dealPrice?: number;
    isBestSeller?: boolean;
}

export interface Box {
    id: string;
    name: {
        ar: string;
        en: string;
    };
    description: {
        ar: string;
        en: string;
    };
    contents: {
        ar: string[];
        en: string[];
    };
    price: number;
    image: string;
    inStock: boolean;
}

export interface CartItem {
    product: Product | Box;
    quantity: number;
    isBox?: boolean;
}

export interface CustomerInfo {
    name: string;
    phone: string;
    address: string;
    area: string;
    deliverySlot: string;
    notes?: string;
}

export type Language = 'ar' | 'en';

export interface Translations {
    [key: string]: {
        ar: string;
        en: string;
    };
}
