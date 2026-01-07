'use client';

import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();

  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="bg-[#F5F5F5] min-h-screen">
        <div className="mx-auto px-6 py-8">
          <div className="bg-white rounded-2xl p-12 text-center">
            <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <Link
              href="/"
              className="inline-block bg-[#0B5394] hover:bg-[#094A7D] text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row gap-6"
              >
                {/* Product Image */}
                <Link href={`/product/${item.id}`} className="shrink-0">
                  <div className="relative w-32 h-32 bg-gray-100 rounded-xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </Link>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/product/${item.id}`}>
                      <h3 className="text-xl font-bold text-gray-900 hover:text-[#0B5394] transition-colors mb-2">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-2">{item.category}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${item.price}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-semibold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Subtotal</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#0B5394] hover:bg-[#094A7D] text-white font-semibold py-4 px-6 rounded-lg transition-colors mb-3">
                Proceed to Checkout
              </button>

              <button
                onClick={clearCart}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Clear Cart
              </button>

              <Link
                href="/"
                className="block text-center text-[#0B5394] hover:text-[#094A7D] font-medium mt-4 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
