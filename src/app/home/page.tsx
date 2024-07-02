"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const topMenus = [
  { label: 'AI 추천', value: 'recommendation' },
  { label: 'AI 제작 랭킹', value: 'ranking' },
  { label: '팔로잉', value: 'following' }
]

const clothesTypes = [
  { label: 'ALL', value: 'all', icon: '/images/home/allIcon.png' },
  { label: '랭킹별', value: 'ranking', icon: '/images/home/rankingIcon.png' },
  { label: '체형별', value: 'body', icon: '/images/home/bodyIcon.png' },
  { label: '상의', value: 'topClothes', icon: '/images/home/topClothesIcon.png' },
  { label: '하의', value: 'bottomClothes', icon: '/images/home/bottomClothesIcon.png' },
]

const filterTypes = [
  { label: '남', value: 'men' },
  { label: '여', value: 'women' },
  { label: '미니멀', value: 'minimal' },
  { label: '아우터', value: 'outer' },
  { label: '스트릿', value: 'street' },
  { label: '키워드', value: 'valueword' },
]


export default function Home() {

  const [selectedMenu, setSelectedMenu] = useState('recommendation')
  const [selectedFilter, setSelectedFilter] = useState('men')
  

  return (
    <div className='w-full h-full'>
      <div className='p-3'>
        <div className='flex flex-row justify-between'>
          <p>MY_AI FASHION</p>
          <Image src='/images/svgs/alarmIcon.svg' alt='alarm icon' width={11} height={12} />
        </div>

        <div className='flex flex-row mt-5 rounded-lg p-0.5' style={{ backgroundColor: '#E8E7D6' }}>
          {topMenus.map((menu) => (
            <div
              key={menu.value}
              className={`flex flex-col items-center justify-center w-1/3 py-3 rounded-lg cursor-pointer text-bold`}
              style={{
                backgroundColor: selectedMenu === menu.value ? 'var(--main-color)' : 'initial',
                color: selectedMenu === menu.value ? 'white' : 'black',
                fontSize: 10,
              }}
              onClick={() => setSelectedMenu(menu.value)}
            >
              <p>{menu.label}</p>
            </div>
          ))}
        </div>

        <div className='flex mt-4 p-4 rounded-lg justify-between items-center' style={{ backgroundColor: 'var(--main-color)' }}>
          <div className='flex flex-col'>
            <p style={{ fontSize: 30 }}>
              <span className="text-bold">옷</span> 어떻게 <span className="text-bold">만들어요?</span>
            </p>
            <p style={{ fontSize: 15 }}>
              <span className="text-bold">AI</span> 옷 만들기, 어렵지 않아요!
            </p>
          </div>
          <div className='flex items-center'>
            <Image
              src='/images/home/magicBar.png'
              alt='arrow right'
              width={43}
              height={43}
            >
            </Image>
          </div>
        </div>

        <div className='flex flex-row justify-between mt-4'>

          {clothesTypes.map((clothesType) => (
            <div
              key={clothesType.value}
              className='flex flex-col items-center justify-center'
            >

              <Image
                src={clothesType.icon}
                alt={clothesType.label}
                width={50}
                height={50}
              />

              <p className='mt-2.5 text-sm' style={{ color: '#2E2D2D' }}>{clothesType.label}</p>
            </div>
          ))}

        </div>

        <div className='flex flex-row mt-4'>
          <div 
            className='flex height-full bg-white py-1 px-2 rounded-md cursor-pointer'
            style={{ backgroundColor: '#F5EFE1', borderColor: '#E3D4B5', borderWidth: 1 }}
          >
            <Image
              src='/images/home/filterIcon.svg'
              alt='filter icon'
              width={12}
              height={12}
            />
          </div>

          {filterTypes.map((filterType) => (
            <div
              key={filterType.value}
              className='flex flex-col items-center justify-center ms-1 px-3.5 rounded-md cursor-pointer'
              style={{ backgroundColor: '#F5EFE1', borderColor: selectedFilter == filterType.value ? '#BFA054' : '#E3D4B5', borderWidth: 1, paddingTop: 1, paddingBottom: 1 }}
              onClick={() => setSelectedFilter(filterType.value)}
            >
              <p className='text-sm text-bold' style={{ color: '#787486', fontSize: 8 }}>{filterType.label}</p>
            </div>
          ))}

        </div>

      </div>

      <div className='mt-2.5 w-full grid grid-cols-3 gap-0.5'>
        <img src='/images/home/samples/sample1.png' alt='1' className='w-full h-full' />
        <img src='/images/home/samples/sample1.png' alt='1' className='w-full h-full' />
        <img src='/images/home/samples/sample1.png' alt='1' className='w-full h-full' />
        <img src='/images/home/samples/sample1.png' alt='1' className='w-full h-full' />
        <img src='/images/home/samples/sample1.png' alt='1' className='w-full h-full' />
        <img src='/images/home/samples/sample1.png' alt='1' className='w-full h-full' />
        <img src='/images/home/samples/sample1.png' alt='1' className='w-full h-full' />
      </div>

    </div>
  );
}
