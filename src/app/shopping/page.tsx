"use client"

import Header from "@/components/common/Header";
import Image from "next/image";
import { useState } from "react";

const clothesTypes = [
  { label: 'ALL', value: 'all', icon: '/images/home/allIcon.png' },
  { label: '랭킹별', value: 'ranking', icon: '/images/home/rankingIcon.png' },
  { label: '체형별', value: 'body', icon: '/images/home/bodyIcon.png' },
  { label: '상의', value: 'topClothes', icon: '/images/home/topClothesIcon.png' },
  { label: '하의', value: 'bottomClothes', icon: '/images/home/bottomClothesIcon.png' },
]

const filterTypes = [
  { label: '추천순', value: 'recommendation' },
  { label: '최신순', value: 'new' },
  { label: '인기순', value: 'popularity' },
  { label: '맞춤형', value: 'customization' },
]

const clothesStyles = [
  { name: '샤넬 스타일 반팔티', price: '19000', image: '/images/home/samples/sample1.png', numOfLikes: 50, numOfComments: '52' },
  { name: '샤넬 스타일 반팔티', price: '19000', image: '/images/home/samples/sample1.png', numOfLikes: 50, numOfComments: '52' },
  { name: '샤넬 스타일 반팔티', price: '19000', image: '/images/home/samples/sample1.png', numOfLikes: 50, numOfComments: '52' },
  { name: '샤넬 스타일 반팔티', price: '19000', image: '/images/home/samples/sample1.png', numOfLikes: 50, numOfComments: '52' },
  { name: '샤넬 스타일 반팔티', price: '19000', image: '/images/home/samples/sample1.png', numOfLikes: 50, numOfComments: '52' },
  { name: '샤넬 스타일 반팔티', price: '19000', image: '/images/home/samples/sample1.png', numOfLikes: 50, numOfComments: '52' },
  { name: '샤넬 스타일 반팔티', price: '19000', image: '/images/home/samples/sample1.png', numOfLikes: 50, numOfComments: '52' },
  { name: '샤넬 스타일 반팔티', price: '19000', image: '/images/home/samples/sample1.png', numOfLikes: 50, numOfComments: '52' },
  { name: '샤넬 스타일 반팔티', price: '19000', image: '/images/home/samples/sample1.png', numOfLikes: 50, numOfComments: '52' },
  { name: '샤넬 스타일 반팔티', price: '19000', image: '/images/home/samples/sample1.png', numOfLikes: 50, numOfComments: '52' },
  { name: '샤넬 스타일 반팔티', price: '19000', image: '/images/home/samples/sample1.png', numOfLikes: 50, numOfComments: '52' },
]


export default function Shopping() {

  const [selectedFilter, setSelectedFilter] = useState("")

  const windowWidth = window.innerWidth > 600 ? 600 : window.innerWidth
  const clothesStyleHeight = windowWidth * (7 / 18)

  return (
    <div>
      <div className="px-3">
        <Header title="쇼핑하기" />
      </div>

      <div className='flex flex-row justify-between mt-4 px-3'>

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

      <div className='flex flex-row mt-4 px-2'>
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
            style={{ backgroundColor: selectedFilter == filterType.value ? 'var(--main-color)' : '#F5EFE1', borderColor: selectedFilter == filterType.value ? '#BFA054' : '#E3D4B5', borderWidth: 1, paddingTop: 1, paddingBottom: 1 }}
            onClick={() => setSelectedFilter(filterType.value)}
          >
            <p className='text-sm text-bold' style={{ color: '#787486', fontSize: 8 }}>{filterType.label}</p>
          </div>
        ))}

      </div>

      <div className='px-2 mt-2.5 w-full grid grid-cols-3 gap-0.5'>

        {clothesStyles.map((clothesStyle) => (
          <div className="relative rounded-b-lg">
            <img src='/images/home/samples/sample1.png' alt='1' className='w-full rounded-b-lg' style={{ height: clothesStyleHeight }} />
            <div
              className="absolute w-full rounded-b-lg bottom-0 px-2.5 py-1"
              style={{ backgroundColor: '#0ED6D0' }}
            >
              <div
                className="flex flex-row w-full justify-between"
              >
                <div className="text-bold text-white" style={{ fontSize: 10 }}>{clothesStyle.name}</div>
                <Image
                  src='/images/add/star.svg'
                  alt='heart icon'
                  width={14}
                  height={11}
                />
              </div>

              <div className="flex flex-row justify-between">
                <div className="text-bold" style={{ color: '#5A5858', fontSize: 7 }}>
                  {clothesStyle.price} 원
                </div>

                <div className="flex flex-row">
                  <Image
                    src='/images/common/heartIcon.svg'
                    alt='heart icon'
                    width={8}
                    height={8}
                  />
                  <div className="text-bold text-white ms-1 me-2" style={{ fontSize: 7 }}>{clothesStyle.numOfLikes}</div>
                  <Image
                    src='/images/common/commentIcon.svg'
                    alt='comment icon'
                    width={6}
                    height={6}
                  />
                  <div className="text-bold text-white ms-1" style={{ fontSize: 7 }}>{clothesStyle.numOfComments}</div>

                </div>

              </div>

              {/* <div className="text-bold text-white" style={{ fontSize: 10 }}>{clothesStyle.name}</div> */}
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}
