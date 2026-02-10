import React from 'react';
import { Edit2, Trash2, Package, AlertTriangle } from 'lucide-react';

interface ProductData {
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

interface ProductTableProps {
    products: ProductData[];
    onEdit: (product: ProductData) => void;
    onDelete: (productId: string, productName: string) => void;
    searchTerm: string;
    filterCategory: string;
}

const categoryEmoji: Record<string, string> = {
    vegetables: '🥕',
    fruits: '🍎',
    herbs: '🌿',
    organic: '🍃',
    imported: '✈️',
};

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete, searchTerm, filterCategory }) => {
    const [deleteConfirm, setDeleteConfirm] = React.useState<string | null>(null);

    const filteredProducts = products.filter(p => {
        const matchesSearch = searchTerm === '' ||
            p.name.ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.name.en.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const handleDeleteClick = (productId: string, productName: string) => {
        if (deleteConfirm === productId) {
            onDelete(productId, productName);
            setDeleteConfirm(null);
        } else {
            setDeleteConfirm(productId);
            // Auto-reset after 3 seconds
            setTimeout(() => setDeleteConfirm(null), 3000);
        }
    };

    if (filteredProducts.length === 0) {
        return (
            <div className="text-center py-16">
                <Package size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-500 mb-1">No products found</h3>
                <p className="text-gray-400 text-sm">
                    {searchTerm || filterCategory !== 'all'
                        ? 'Try adjusting your search or filter'
                        : 'Add your first product to get started'}
                </p>
            </div>
        );
    }

    return (
        <div>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="text-start py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="text-start py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="text-start py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="text-start py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Unit</th>
                            <th className="text-start py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="text-end py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product, index) => (
                            <tr
                                key={product.id}
                                className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors fade-in"
                                style={{ animationDelay: `${index * 0.03}s` }}
                            >
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                            <img
                                                src={product.image}
                                                alt={product.name.en}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=100';
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm">{product.name.en}</p>
                                            <p className="text-gray-400 text-xs" dir="rtl">{product.name.ar}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-600 capitalize">
                                        {categoryEmoji[product.category] || '📦'} {product.category}
                                    </span>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-baseline gap-1">
                                        <span className="font-bold text-gray-900">{product.price.toFixed(2)}</span>
                                        <span className="text-xs text-gray-400">JOD</span>
                                    </div>
                                    {product.isDeal && product.dealPrice && (
                                        <span className="text-xs text-orange-500 font-medium">🔥 Deal: {product.dealPrice.toFixed(2)}</span>
                                    )}
                                </td>
                                <td className="py-3 px-4">
                                    <span className="text-sm text-gray-500 capitalize">{product.unit}</span>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${product.inStock
                                            ? 'bg-green-50 text-green-600'
                                            : 'bg-red-50 text-red-500'
                                            }`}>
                                            {product.inStock ? '● In Stock' : '● Out of Stock'}
                                        </span>
                                        {product.isBestSeller && (
                                            <span className="text-xs">⭐</span>
                                        )}
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(product)}
                                            className="w-9 h-9 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-600 transition-colors"
                                            title="Edit"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(product.id, product.name.en)}
                                            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${deleteConfirm === product.id
                                                ? 'bg-red-500 text-white animate-pulse'
                                                : 'bg-red-50 hover:bg-red-100 text-red-500'
                                                }`}
                                            title={deleteConfirm === product.id ? 'Click again to confirm' : 'Delete'}
                                        >
                                            {deleteConfirm === product.id ? <AlertTriangle size={16} /> : <Trash2 size={16} />}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-3">
                {filteredProducts.map((product, index) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                <img
                                    src={product.image}
                                    alt={product.name.en}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=100';
                                    }}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm truncate">{product.name.en}</p>
                                        <p className="text-gray-400 text-xs truncate" dir="rtl">{product.name.ar}</p>
                                    </div>
                                    <div className="flex gap-1.5 flex-shrink-0">
                                        <button
                                            onClick={() => onEdit(product)}
                                            className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(product.id, product.name.en)}
                                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${deleteConfirm === product.id
                                                ? 'bg-red-500 text-white'
                                                : 'bg-red-50 text-red-500'
                                                }`}
                                        >
                                            {deleteConfirm === product.id ? <AlertTriangle size={14} /> : <Trash2 size={14} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-2 flex-wrap">
                                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-md capitalize">
                                        {categoryEmoji[product.category]} {product.category}
                                    </span>
                                    <span className="font-bold text-primary text-sm">{product.price.toFixed(2)} JOD</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${product.inStock ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                                        {product.inStock ? 'In Stock' : 'Out'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Count */}
            <div className="mt-4 text-center">
                <p className="text-sm text-gray-400">
                    Showing {filteredProducts.length} of {products.length} products
                </p>
            </div>
        </div>
    );
};

export default ProductTable;
