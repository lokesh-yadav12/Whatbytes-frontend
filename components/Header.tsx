'use client';

import { Search, ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    router.push('/');
  };

  return (
    <header className=" text-white bg-[#0B5394] rounded-2xl mt-2 px-4">
      <div className=" mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl px-4 font-bold whitespace-nowrap">
          WhatBytes
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 mx-12 max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white w-5 h-5" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-2.5 rounded-full bg-[#0B5394] border border-white text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#1976D2]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </form>

        {/* Cart Button */}
        <Link
          href="/cart"
          className="relative flex items-center gap-2 bg-[#0A3D66] hover:bg-[#083152] px-6 py-2.5 rounded-full transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="font-semibold">Cart</span>

          {mounted && totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-7 h-5 flex items-center justify-center px-1">
              {totalItems}
            </span>
          )}
        </Link>

      </div>
    </header>
  );
}
