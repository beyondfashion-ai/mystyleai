"use client";

import { memo } from 'react';
import Link from 'next/link';

const BottomTab = memo(() => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex justify-center"
      style={{ backgroundColor: 'red', maxWidth: 375, margin: '0 auto' }}
    >
      <div className="flex justify-around" style={{ width: '100%' }}>
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
