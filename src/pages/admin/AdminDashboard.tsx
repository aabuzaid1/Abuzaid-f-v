import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { products as staticProducts } from '../../data/products';
import { useAuth } from '../../contexts/AuthContext';
import ProductForm from '../../components/admin/ProductForm';
import ProductTable from '../../components/admin/ProductTable';
import {
    LogOut, Plus, Search, Filter, Package, LayoutDashboard, Leaf,
    RefreshCw, Apple, Carrot, Sparkles, Upload
} from 'lucide-react';

interface FirestoreProduct {
    id: string;
    name: { ar: string; en: string };
    price: number;
    category: string;
    unit: string;
    image: string;
    inStock: boolean;
    isDeal?: boolean;
    dealPrice?: number;
    isBestSeller?: boolean;
}

const AdminDashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState<FirestoreProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [formOpen, setFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<FirestoreProduct | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [seeding, setSeeding] = useState(false);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Real-time listener for products
    useEffect(() => {
        setLoading(true);
        const productsRef = collection(db, 'products');
        const q = query(productsRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (snapshot.empty) {
                // Fallback to static products when Firestore is empty
                const deletedIds = JSON.parse(localStorage.getItem('deletedStaticProducts') || '[]');
                const fallback: FirestoreProduct[] = staticProducts
                    .filter(p => !deletedIds.includes((p as any).id))
                    .map(p => ({
                        id: (p as any).id || '',
                        name: p.name,
                        price: p.price,
                        category: p.category,
                        unit: p.unit,
                        image: p.image,
                        inStock: p.inStock,
                        isDeal: (p as any).isDeal,
                        dealPrice: (p as any).dealPrice,
                        isBestSeller: (p as any).isBestSeller,
                    }));
                setProducts(fallback);
            } else {
                const data = snapshot.docs.map(d => ({
                    id: d.id,
                    ...d.data()
                })) as FirestoreProduct[];
                setProducts(data);
            }
            setLoading(false);
        }, (err) => {
            console.error('Error listening to products:', err);
            // Fallback to static products on error
            const deletedIds = JSON.parse(localStorage.getItem('deletedStaticProducts') || '[]');
            const fallback: FirestoreProduct[] = staticProducts
                .filter(p => !deletedIds.includes((p as any).id))
                .map(p => ({
                    id: (p as any).id || '',
                    name: p.name,
                    price: p.price,
                    category: p.category,
                    unit: p.unit,
                    image: p.image,
                    inStock: p.inStock,
                    isDeal: (p as any).isDeal,
                    dealPrice: (p as any).dealPrice,
                    isBestSeller: (p as any).isBestSeller,
                }));
            setProducts(fallback);
            showToast('Using local products (database unavailable)', 'error');
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Add product
    const handleAddProduct = async (formData: any) => {
        setSaving(true);
        try {
            // Remove id and undefined values (Firestore doesn't accept undefined)
            const { id, ...rest } = formData;
            const cleanData = Object.fromEntries(
                Object.entries(rest).filter(([_, value]) => value !== undefined)
            );

            await addDoc(collection(db, 'products'), {
                ...cleanData,
                createdAt: serverTimestamp(),
            });
            showToast('Product added successfully! ✅');
            setFormOpen(false);
            // No need to refetch — onSnapshot will update automatically
        } catch (err: any) {
            console.error('Error adding product:', err);
            const errorMsg = err?.message || 'Unknown error';
            showToast(`Failed: ${errorMsg}`, 'error');
        } finally {
            setSaving(false);
        }
    };

    // Update product
    const handleUpdateProduct = async (formData: any) => {
        if (!editingProduct) return;
        setSaving(true);
        try {
            // Strip id and undefined values — id is NOT a data field in Firestore
            const { id, ...rest } = formData;
            const cleanData = Object.fromEntries(
                Object.entries(rest).filter(([_, value]) => value !== undefined)
            );

            const productRef = doc(db, 'products', editingProduct.id);
            await updateDoc(productRef, cleanData as any);

            showToast('Product updated successfully! ✅');
            setFormOpen(false);
            setEditingProduct(null);
            // No need to refetch — onSnapshot will update automatically
        } catch (err: any) {
            console.error('Error updating product:', err);
            const errorMsg = err?.message || 'Unknown error';
            showToast(`Failed: ${errorMsg}`, 'error');
        } finally {
            setSaving(false);
        }
    };

    // Delete product
    const handleDeleteProduct = async (productId: string, productName: string) => {
        try {
            const productRef = doc(db, 'products', productId);
            await deleteDoc(productRef);
            showToast(`"${productName}" deleted successfully`);
            // onSnapshot will automatically remove it from the UI
        } catch (err: any) {
            console.error('Error deleting product:', err);
            // Fallback: if it was a static product (not in Firestore), track in localStorage
            const deletedIds = JSON.parse(localStorage.getItem('deletedStaticProducts') || '[]');
            if (!deletedIds.includes(productId)) {
                deletedIds.push(productId);
                localStorage.setItem('deletedStaticProducts', JSON.stringify(deletedIds));
            }
            setProducts(prev => prev.filter(p => p.id !== productId));
            showToast(`"${productName}" deleted successfully`);
        }
    };

    // Handle form submit (add or update)
    const handleFormSubmit = (formData: any) => {
        if (editingProduct) {
            handleUpdateProduct(formData);
        } else {
            handleAddProduct(formData);
        }
    };

    // Open edit form
    const handleEdit = (product: FirestoreProduct) => {
        setEditingProduct(product);
        setFormOpen(true);
    };

    // Handle logout
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/admin/login');
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    // Stats
    const totalProducts = products.length;
    const inStockCount = products.filter(p => p.inStock).length;
    const categoryCounts = products.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Seed products from static data
    const handleSeedProducts = async () => {
        setSeeding(true);
        try {
            let count = 0;
            for (const product of staticProducts) {
                const { id, ...productData } = product as any;
                await addDoc(collection(db, 'products'), {
                    ...productData,
                    createdAt: serverTimestamp(),
                });
                count++;
            }
            showToast(`${count} products seeded successfully! 🎉`);
            fetchProducts();
        } catch (err) {
            console.error('Error seeding products:', err);
            showToast('Failed to seed products', 'error');
        } finally {
            setSeeding(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-600 rounded-xl flex items-center justify-center shadow-md">
                                <Leaf size={22} className="text-white" />
                            </div>
                            <div>
                                <h1 className="font-bold text-gray-900 text-lg">Abu Zaid Admin</h1>
                                <p className="text-xs text-gray-400">{user?.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <a
                                href="/"
                                className="text-sm text-gray-500 hover:text-primary font-medium transition-colors hidden sm:block"
                            >
                                View Store →
                            </a>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors"
                            >
                                <LogOut size={16} />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Dashboard Title */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <LayoutDashboard size={24} className="text-primary" />
                            <h2 className="text-2xl font-black text-gray-900">Dashboard</h2>
                        </div>
                        <p className="text-gray-500 text-sm">Manage your store products</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {totalProducts === 0 && (
                            <button
                                onClick={handleSeedProducts}
                                disabled={seeding}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 transition-all duration-300"
                            >
                                {seeding ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Upload size={20} />
                                )}
                                {seeding ? 'Seeding...' : 'Seed Products'}
                            </button>
                        )}
                        <button
                            onClick={() => {
                                setEditingProduct(null);
                                setFormOpen(true);
                            }}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-green-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                        >
                            <Plus size={20} />
                            Add Product
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover-lift">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                <Package size={20} className="text-primary" />
                            </div>
                            <span className="text-sm font-medium text-gray-500">Total Products</span>
                        </div>
                        <p className="text-3xl font-black text-gray-900">{totalProducts}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover-lift">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                                <Sparkles size={20} className="text-green-500" />
                            </div>
                            <span className="text-sm font-medium text-gray-500">In Stock</span>
                        </div>
                        <p className="text-3xl font-black text-green-600">{inStockCount}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover-lift">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                                <Apple size={20} className="text-red-500" />
                            </div>
                            <span className="text-sm font-medium text-gray-500">Fruits</span>
                        </div>
                        <p className="text-3xl font-black text-gray-900">{categoryCounts['fruits'] || 0}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover-lift">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                                <Carrot size={20} className="text-orange-500" />
                            </div>
                            <span className="text-sm font-medium text-gray-500">Vegetables</span>
                        </div>
                        <p className="text-3xl font-black text-gray-900">{categoryCounts['vegetables'] || 0}</p>
                    </div>
                </div>

                {/* Products Section */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Toolbar */}
                    <div className="px-6 py-4 border-b border-gray-100">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full ps-11 pe-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>

                            {/* Filter */}
                            <div className="relative">
                                <Filter size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <select
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                    className="ps-9 pe-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                                >
                                    <option value="all">All Categories</option>
                                    <option value="vegetables">🥕 Vegetables</option>
                                    <option value="fruits">🍎 Fruits</option>
                                    <option value="herbs">🌿 Herbs</option>
                                    <option value="organic">🍃 Organic</option>
                                    <option value="imported">✈️ Imported</option>
                                </select>
                            </div>

                            {/* Live indicator */}
                            <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 border border-green-200 rounded-xl text-sm text-green-600 font-medium">
                                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                                {loading ? 'Syncing...' : 'Live'}
                            </div>
                        </div>
                    </div>

                    {/* Table / Content */}
                    <div className="p-4 sm:p-6">
                        {loading ? (
                            <div className="text-center py-16">
                                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                                <p className="text-gray-500 font-medium">Loading products...</p>
                            </div>
                        ) : (
                            <ProductTable
                                products={products}
                                onEdit={handleEdit}
                                onDelete={handleDeleteProduct}
                                searchTerm={searchTerm}
                                filterCategory={filterCategory}
                            />
                        )}
                    </div>
                </div>
            </main>

            {/* Product Form Modal */}
            <ProductForm
                isOpen={formOpen}
                onClose={() => {
                    setFormOpen(false);
                    setEditingProduct(null);
                }}
                onSubmit={handleFormSubmit}
                initialData={editingProduct}
                loading={saving}
            />

            {/* Toast Notification */}
            {toast && (
                <div className="fixed bottom-6 end-6 z-50 fade-in">
                    <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl text-white font-medium ${toast.type === 'success'
                        ? 'bg-gradient-to-r from-primary to-green-600'
                        : 'bg-gradient-to-r from-red-500 to-red-600'
                        }`}>
                        {toast.message}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
