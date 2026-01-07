'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, ChevronLeft } from 'lucide-react';
import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="bg-[#F5F5F5] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-[#0B5394] hover:bg-[#094A7D] text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    router.push('/cart');
  };

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 99) {
      setQuantity(value);
    }
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>

        {/* Product Detail Card */}
        <div className="bg-white rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Image Section */}
            <div className="flex items-center justify-center">
              <div className="relative w-full h-96">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              <p className="text-3xl font-bold text-[#0B5394] mb-4">
                ${product.price}
              </p>

              {product.rating && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-1">
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
                  <span className="text-gray-600 text-sm">
                    ({product.rating} / 5)
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Category</h2>
                <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg">
                  {product.category}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h2>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-20 h-10 text-center border-2 border-gray-300 rounded-lg font-semibold text-gray-900 focus:outline-none focus:border-[#0B5394]"
                    min="1"
                    max="99"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="bg-[#0B5394] hover:bg-[#094A7D] text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
