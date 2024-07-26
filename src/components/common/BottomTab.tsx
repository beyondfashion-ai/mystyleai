"use client";

import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const BottomTab = memo(() => {
  const pathname = usePathname();
  const links = [
    { href: '/home', label: 'home', icon: '/images/bottomTab/homeIcon.png', highlightedIcon: '/images/bottomTab/hilightedHomeIcon.png', width: 21, height: 21 },
    { href: '/search', label: 'search', icon: '/images/bottomTab/searchIcon.png', highlightedIcon: '/images/bottomTab/hilightedSearchIcon.png', width: 19, height: 19 },
    { href: '/generate', label: 'generate', icon: '/images/bottomTab/addIcon.png', highlightedIcon: '/images/bottomTab/hilightedHomeIcon.png', width: 23, height: 23 },
    { href: '/shopping', label: 'shopping', icon: '/images/bottomTab/shoppingIcon.png', highlightedIcon: '/images/bottomTab/hilightedShoppingIcon.png', width: 24, height: 24 },
    { href: '/mypage', label: 'mypage', icon: '/images/bottomTab/myPageIcon.png', highlightedIcon: '/images/bottomTab/hilightedMyPageIcon.png', width: 22, height: 22 },
  ]


  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex justify-center"
      style={{ maxWidth: 'var(--max-width)', height: 84, margin: '0 auto', boxShadow: '0px -2px 1px rgba(0, 0, 0, 0.1)', backgroundColor: '#FBF8F2'  }}
    >
      <div className="flex justify-around py-4 items-center" style={{ width: '100%' }}>

        {links.map(({ href, label, icon, highlightedIcon, width, height }) => (
          <Link key={href} href={href} >
            {label == 'generate' ? (
              <div 
                className="flex flex-col items-center justify-center"
                style={{ 
                  width: 55, 
                  height: 55, 
                  backgroundColor: 'var(--main-color)',
                  border: pathname === href ? '1px solid #085757' : '1px solid #949494',
                  // backgroundColor: pathname === href ? 'var(--main-color)' : '#27343E', 
                  borderRadius: 55 / 2, 
                  color: 'white' 
                }}
              >
                <Image
                  src={icon}
                  alt={label}
                  width={width}
                  height={height}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Image
                  src={pathname === href ? highlightedIcon : icon}
                  alt={label}
                  width={width}
                  height={height}
                />
                {pathname === href && (
                  <div className="fixed bottom-4 bg-black rounded-full mt-1" style={{ width: 5, height: 5, backgroundColor: 'var(--main-color)' }} />
                )}
              </div>
            )}


          </Link>
        ))}
      </div>
    </nav>
  );
});

export default BottomTab;
