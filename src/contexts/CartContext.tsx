import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, Box } from '../types';

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product | Box, isBox?: boolean) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    subtotal: number;
    deliveryFee: number;
    total: number;
    isMinimumMet: boolean;
    remainingForMinimum: number;
}

const DELIVERY_FEE = 1;
const MINIMUM_ORDER = 10;

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('cart');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return [];
            }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product | Box, isBox: boolean = false) => {
        setItems(prev => {
            const existingIndex = prev.findIndex(item => item.product.id === product.id);
            if (existingIndex >= 0) {
                const updated = [...prev];
                updated[existingIndex].quantity += 1;
                return updated;
            }
            return [...prev, { product, quantity: 1, isBox }];
        });
    };

    const removeFromCart = (productId: string) => {
        setItems(prev => prev.filter(item => item.product.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setItems(prev =>
            prev.map(item =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const subtotal = items.reduce((sum, item) => {
        const price = 'dealPrice' in item.product && item.product.dealPrice
            ? item.product.dealPrice
            : item.product.price;
        return sum + price * item.quantity;
    }, 0);

    const deliveryFee = DELIVERY_FEE;
    const total = subtotal + deliveryFee;
    const isMinimumMet = subtotal >= MINIMUM_ORDER;
    const remainingForMinimum = isMinimumMet ? 0 : MINIMUM_ORDER - subtotal;

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
                subtotal,
                deliveryFee,
                total,
                isMinimumMet,
                remainingForMinimum,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
