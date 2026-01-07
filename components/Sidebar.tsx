'use client';

import { Category } from '@/types/product';

interface SidebarProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

export default function Sidebar({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
}: SidebarProps) {
  const categories: Category[] = ['All', 'Electronics', 'Clothing', 'Home'];

  return (
    <div className="space-y-6 px-4">
      {/* Main Filter Box */}
      <div className="bg-[#0B5394] text-white rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-6">Filters</h2>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-4">Category</h3>
          <div className="space-y-3">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category}
                  onChange={() => onCategoryChange(category)}
                  className="w-4 h-4 accent-white cursor-pointer"
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h3 className="text-base font-semibold mb-4">Price</h3>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => onPriceChange([0, parseInt(e.target.value)])}
              className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
            />
            <div className="flex justify-between text-sm">
              <span>{priceRange[0]}</span>
              <span>{priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cacyroy Filter Box */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-gray-900">Cacyroy</h2>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="space-y-3">
            {categories.map((category) => (
              <label
                key={`cacyroy-${category}`}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="cacyroy-category"
                  checked={selectedCategory === category}
                  onChange={() => onCategoryChange(category)}
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
                <span className="text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Input */}
        <div>
          <h3 className="text-base font-semibold mb-3 text-gray-900">Price</h3>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => onPriceChange([0, parseInt(e.target.value) || 0])}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="5000"
          />
        </div>
      </div>
    </div>
  );
}
