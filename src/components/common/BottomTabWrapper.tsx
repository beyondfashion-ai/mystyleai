"use client";

import { usePathname } from 'next/navigation';
import BottomTab from './BottomTab';

export default function BottomTabWrapper() {
  const pathname = usePathname();

  // '/' 페이지에서는 BottomTab을 숨김
  if (pathname === '/') {
    return null;
  }

  return (
    <div>
      <div style={{ height: 60, backgroundColor: 'var(--background-color)' }} />
      <BottomTab />
    </div>
  )
}
