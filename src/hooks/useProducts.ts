import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Product } from '../types';
import { products as staticProducts } from '../data/products';

interface UseProductsReturn {
    products: Product[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export const useProducts = (): UseProductsReturn => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        const productsRef = collection(db, 'products');
        const q = query(productsRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (snapshot.empty) {
                // Fallback to static products if Firestore is empty, but filter deleted ones
                const deletedIds = JSON.parse(localStorage.getItem('deletedStaticProducts') || '[]');
                const filteredStatic = staticProducts.filter(p => !deletedIds.includes(p.id));
                setProducts(filteredStatic);
            } else {
                const firestoreProducts: Product[] = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Product[];
                setProducts(firestoreProducts);
            }
            setLoading(false);
        }, (err) => {
            console.warn('Firestore listener failed, using static products:', err);
            setError('Failed to fetch from database, showing cached products.');
            const deletedIds = JSON.parse(localStorage.getItem('deletedStaticProducts') || '[]');
            const filteredStatic = staticProducts.filter(p => !deletedIds.includes(p.id));
            setProducts(filteredStatic);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // refetch is now a no-op since onSnapshot handles real-time updates
    return { products, loading, error, refetch: () => { } };
};
