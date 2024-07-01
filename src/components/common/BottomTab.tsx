"use client";

import { memo } from 'react';
import Link from 'next/link';

const BottomTab = memo(() => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="flex justify-around">
        <Link href="/home" className="p-4">Home</Link>
        <Link href="/search" className="p-4">Search</Link>
        <Link href="/add" className="p-4">Add</Link>
        <Link href="/shop" className="p-4">Shop</Link>
        <Link href="/mypage" className="p-4">My Page</Link>
      </div>
    </nav>
  );
});

export default BottomTab;
