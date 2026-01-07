'use client';
import { Suspense } from 'react';
import HomeContent from '@/components/HomeContent';

export default function Home() {
  return (
    <Suspense fallback={<div className="bg-[#F5F5F5] min-h-screen flex items-center justify-center"><div className="text-xl text-gray-600">Loading...</div></div>}>
      <HomeContent />
    </Suspense>
  );
}
