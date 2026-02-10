import React, { useState, useEffect } from 'react';
import { X, Save, Image } from 'lucide-react';

interface ProductFormData {
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

interface ProductFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ProductFormData) => void;
    initialData?: ProductFormData | null;
    loading?: boolean;
}

const defaultFormData: ProductFormData = {
    name: { ar: '', en: '' },
    price: 0,
    category: 'vegetables',
    unit: 'kg',
    image: '',
    inStock: true,
    isDeal: false,
    dealPrice: 0,
    isBestSeller: false,
};

const ProductForm: React.FC<ProductFormProps> = ({ isOpen, onClose, onSubmit, initialData, loading }) => {
    const [formData, setFormData] = useState<ProductFormData>(defaultFormData);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(defaultFormData);
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scale-in">
                {/* Header */}
                <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-8 py-5 border-b border-gray-100 flex items-center justify-between rounded-t-3xl z-10">
                    <h2 className="text-xl font-bold text-gray-900">
                        {initialData ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Name (Arabic)</label>
                            <input
                                type="text"
                                value={formData.name.ar}
                                onChange={(e) => setFormData({ ...formData, name: { ...formData.name, ar: e.target.value } })}
                                placeholder="اسم المنتج بالعربي"
                                required
                                dir="rtl"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Name (English)</label>
                            <input
                                type="text"
                                value={formData.name.en}
                                onChange={(e) => setFormData({ ...formData, name: { ...formData.name, en: e.target.value } })}
                                placeholder="Product name in English"
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>
                    </div>

                    {/* Price & Category */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price (JOD)</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            >
                                <option value="vegetables">🥕 Vegetables</option>
                                <option value="fruits">🍎 Fruits</option>
                                <option value="herbs">🌿 Herbs</option>
                                <option value="organic">🍃 Organic</option>
                                <option value="imported">✈️ Imported</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Unit</label>
                            <select
                                value={formData.unit}
                                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            >
                                <option value="kg">Kilogram (kg)</option>
                                <option value="piece">Piece</option>
                                <option value="bunch">Bunch</option>
                                <option value="gram250">250g</option>
                                <option value="gram500">500g</option>
                                <option value="box">Box</option>
                            </select>
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <input
                                    type="url"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://example.com/image.jpg"
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                            {formData.image && (
                                <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-gray-200 flex-shrink-0">
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=100';
                                        }}
                                    />
                                </div>
                            )}
                            {!formData.image && (
                                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                                    <Image size={20} className="text-gray-400" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Toggles */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                            <input
                                type="checkbox"
                                checked={formData.inStock}
                                onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                                className="w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                            />
                            <span className="text-sm font-medium text-gray-700">In Stock</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                            <input
                                type="checkbox"
                                checked={formData.isBestSeller}
                                onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                                className="w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                            />
                            <span className="text-sm font-medium text-gray-700">Best Seller ⭐</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                            <input
                                type="checkbox"
                                checked={formData.isDeal}
                                onChange={(e) => setFormData({ ...formData, isDeal: e.target.checked })}
                                className="w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                            />
                            <span className="text-sm font-medium text-gray-700">On Deal 🔥</span>
                        </label>
                    </div>

                    {/* Deal Price (conditional) */}
                    {formData.isDeal && (
                        <div className="fade-in">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Deal Price (JOD)</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.dealPrice}
                                onChange={(e) => setFormData({ ...formData, dealPrice: parseFloat(e.target.value) || 0 })}
                                className="w-full px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 transition-all"
                            />
                        </div>
                    )}

                    {/* Submit */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3.5 bg-gradient-to-r from-primary to-green-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Save size={18} />
                                    {initialData ? 'Update Product' : 'Add Product'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
