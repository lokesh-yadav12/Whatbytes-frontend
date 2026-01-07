'use client';

import { Product } from '@/types/product';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  /* ================= FEATURED CARD ================= */
  if (featured) {
    return (
      <Link href={`/product/${product.id}`} className="bg-white rounded-2xl p-6 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-shadow cursor-pointer">
        
        {/* Image */}
        <div className="shrink-0">
          <div className="w-48 h-60 relative">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain rounded-xl"
              priority
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h3>

            <p className="text-3xl font-bold text-gray-900 mb-3">
              ${product.price}
            </p>

            {product.rating && (
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating!)
                        ? 'fill-blue-600 text-blue-600'
                        : 'fill-gray-300 text-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}

            <p className="text-gray-600 mb-4 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Category</p>
              <p className="text-gray-900 font-medium">{product.category}</p>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-[#0B5394] hover:bg-[#094A7D] text-white font-semibold py-3 px-8 rounded-lg transition-colors w-full md:w-auto"
          >
            Add to Cart
          </button>
        </div>
      </Link>
    );
  }

  /* ================= NORMAL CARD ================= */
  return (
    <Link href={`/product/${product.id}`} className="bg-white rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow cursor-pointer">
      
      {/* Image */}
      <div className="relative w-full h-48 bg-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4"
        />
      </div>

      <div className="p-5 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-1 min-h-[3rem]">
          {product.title}
        </h3>

        <p className="text-2xl font-bold text-gray-900 mb-4">
          ${product.price}
        </p>

        <button
          onClick={handleAddToCart}
          className="bg-[#0B5394] hover:bg-[#094A7D] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
