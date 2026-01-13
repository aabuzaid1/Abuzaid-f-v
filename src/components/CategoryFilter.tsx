import React from 'react';

interface CategoryFilterProps {
    categories: { id: string; label: string }[];
    activeCategory: string;
    onCategoryChange: (categoryId: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    activeCategory,
    onCategoryChange,
}) => {
    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${activeCategory === category.id
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
                        }`}
                >
                    {category.label}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
