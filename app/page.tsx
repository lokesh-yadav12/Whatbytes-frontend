'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { Category } from '@/types/product';

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') as Category | null;
  const priceParam = searchParams.get('price') || '';
  
  const [selectedCategory, setSelectedCategory] = useState<Category>(categoryParam || 'All');
  const [priceRange, setPriceRange] = useState<[number, number]>(() => {
    if (priceParam) {
      const [min, max] = priceParam.split('-').map(Number);
      return [min || 0, max || 1000];
    }
    return [0, 1000];
  });

  // Sync URL with filters
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    
    if (selectedCategory !== 'All') {
      params.set('category', selectedCategory);
    }
    
    if (priceRange[0] !== 0 || priceRange[1] !== 1000) {
      params.set('price', `${priceRange[0]}-${priceRange[1]}`);
    }
    
    const newUrl = params.toString() ? `/?${params.toString()}` : '/';
    router.replace(newUrl, { scroll: false });
  }, [selectedCategory, priceRange, searchQuery, router]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        selectedCategory === 'All' || product.category === selectedCategory;
      const priceMatch =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const searchMatch =
        !searchQuery ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && priceMatch && searchMatch;
    });
  }, [selectedCategory, priceRange, searchQuery]);

  const featuredProduct = filteredProducts.find((p) => p.id === '8');
  const regularProducts = filteredProducts.filter((p) => p.id !== '8');

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className=" mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-72 shrink-0">
            <Sidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 pr-8 pl-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Product Listing
            </h1>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl">
                <p className="text-xl text-gray-600">No products found</p>
              </div>
            ) : (
              <>
                {/* Regular Products Grid */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {regularProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Featured Product */}
                {featuredProduct && (
                  <ProductCard product={featuredProduct} featured />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
