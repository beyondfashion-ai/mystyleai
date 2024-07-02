"use client"

import Header from "@/components/common/Header";
import Image from "next/image";
import { useState } from "react";

const seachFilterOptions = [
  { label: 'Trending', value: 'trending', icon: '/images/search/trendingIcon.svg', width: 15, height: 16 },
  { label: 'New', value: 'new', icon: '/images/search/newIcon.svg', width: 16, height: 16 },
  { label: 'Hot', value: 'hot', icon: '/images/search/hotIcon.svg', width: 17, height: 16 },
  { label: 'Trending', value: 'trending', icon: '/images/search/trendingIcon.svg', width: 15, height: 16 },
  { label: 'New', value: 'new', icon: '/images/search/newIcon.svg', width: 16, height: 16 },
  { label: 'Hot', value: 'hot', icon: '/images/search/hotIcon.svg', width: 17, height: 16 },
]

const searchHistory = [
  { label: "미니멀", value: "minimal" },
  { label: "아우터", value: "outer" },
  { label: "스트릿", value: "street" },
  { label: "키워드", value: "keyword" },
]

const searchRanking = [
  { index: 1, name: "반팔", category: "상의", state: 'up' },
  { index: 2, name: "원피스", category: "상의", state: 'up' },
  { index: 3, name: "반바지", category: "하의", state: 'up' },
  { index: 4, name: "치마", category: "하의", state: 'maintain' },
  { index: 5, name: "셔츠", category: "상의", state: 'down' },
  { index: 6, name: "긴팔", category: "상의", state: 'maintain' },
  { index: 7, name: "니트", category: "상의", state: 'down' },
  { index: 8, name: "데님", category: "하의", state: 'maintain' },
  { index: 9, name: "네글자임", category: "하의", state: 'down' },
  { index: 10, name: "패딩", category: "상의", state: 'down' },
]

const categories = [
  { label: '미니멀', value: 'minimal', image: '/images/search/categorySamples/categorySample1.png' },
  { label: '미니멀', value: 'minimal', image: '/images/search/categorySamples/categorySample1.png' },
  { label: '미니멀', value: 'minimal', image: '/images/search/categorySamples/categorySample1.png' },
  { label: '미니멀', value: 'minimal', image: '/images/search/categorySamples/categorySample1.png' },
  { label: '미니멀', value: 'minimal', image: '/images/search/categorySamples/categorySample1.png' },
]

export default function Search() {

  const [selectedHistory, setSelectedHistory] = useState('trending')
  const rankingColumnName = { index: '랭킹', name: '품목', category: '카테고리' }


  const RankingItem = ({ item, index }: { item: any, index: number }) => (
    <div className="flex justify-between items-center w-full">
      <div className="flex flex-row text-bold" style={{ color: '#787486', fontSize: 8 }}>
        <div className="flex justify-center items-center w-10 py-2">{item.index}</div>
        <div className="flex justify-center items-center w-10 py-2">{item.name}</div>
        <div className="flex justify-center items-center w-10 py-2">{item.category}</div>
      </div>

      <div className="flex justify-center w-8">
        {item.state === 'up' && <Image src='/images/common/upperArrow.svg' alt='up icon' width={7} height={5} />}
        {item.state === 'down' && <Image src='/images/common/lowerArrow.svg' alt='up icon' width={7} height={5} />}
        {item.state === 'maintain' && <Image src='/images/common/maintain.svg' alt='up icon' width={5} height={1} />}
      </div>
    </div>
  );

  return (
    <div>
      <div className="px-3">
        <Header title="검색어" />

        <div className="flex flex-row mt-2 w-full" style={{ height: 37 }}>
          <div className="flex items-center justify-center rounded-lg" style={{ width: 40, backgroundColor: '#E8E7D6' }}>
            <Image
              src='/images/home/filterIcon.svg'
              alt='filter icon'
              width={16}
              height={14}
            />
          </div>

          <div className="flex flex-row items-center justify-between w-full h-full bg-black ms-3 rounded-lg py-2 px-4" style={{ backgroundColor: '#E8E7D6' }}>
            <p style={{ color: '#1E1E1E', fontSize: 7 }}>스타일, 아이템, 브랜드를 검색하세요</p>
            <Image
              src='/images/search/searchIcon.svg'
              alt='search icon'
              width={14}
              height={15}
            />
          </div>


        </div>
      </div>

      <div
        className="flex flex-row overflow-x-auto mt-4"
        style={{ scrollbarWidth: 'none' }}
      >
        {seachFilterOptions.map((filterOption) => (
          <div
            key={filterOption.value}
            className="flex flex-row items-center justify-center mx-2 py-2 px-4 rounded-md"
            style={{ backgroundColor: 'var(--main-color)' }}
          >
            <Image
              src={filterOption.icon}
              alt={filterOption.label}
              width={filterOption.width}
              height={filterOption.height}
            />

            <div className="text-white ms-1.5">
              {filterOption.label}
            </div>

            {/* <div className="mt-2.5 text-sm text-white" style={{ color: '#2E2D2D' }}>{filterOption.label}</div> */}
          </div>
        ))}

      </div>

      <div className="px-3">
        <div className="flex flex-row items-center justify-between w-full mt-6">
          <div className="text-bold" style={{ fontSize: 10 }}>
            최근검색어
          </div>
          <div className="text-bold" style={{ fontSize: 8, color: '#8A8888' }}>
            전체삭제
          </div>
        </div>

        <div className="flex flex-row mt-2">
          {searchHistory.map((history) => (
            <div
              className="flex flex-row relative items-center justify-between px-4 py-1 rounded-md mx-0.5 cursor-pointer"
              style={{ backgroundColor: '#F5EFE1', borderColor: selectedHistory == history.value ? '#BFA054' : '#E3D4B5', borderWidth: 1 }}
              onClick={() => setSelectedHistory(history.value)}
            >
              <div style={{ fontSize: 8, color: '#8A8888' }}>{history.label}</div>
              <div
                className="absolute top-1/2 transform -translate-y-1/2 right-1"
              >
                <Image
                  src='/images/common/closeIcon.svg'
                  alt='close icon'
                  width={4}
                  height={4}
                />
              </div>
            </div>
          ))}
        </div>

        

        <div className="w-full flex-col">
          <div className="text-bold mt-6" style={{ fontSize: 10 }}>
            인기검색어
          </div>
          <div className="flex flex-column mt-1">
            <div className="w-1/2">
              <RankingItem item={rankingColumnName} index={0} />
            </div>
          </div>

          <div className="flex flex-column mt-2">
            <div className="flex w-full flex-row">
              <div className="w-1/2 pr-2">
                {searchRanking.slice(0, 5).map((item, index) => (
                  <RankingItem key={index} item={item} index={index} />
                ))}
              </div>
              <div className="w-1/2 pl-2">
                {searchRanking.slice(5, 10).map((item, index) => (
                  <RankingItem key={index + 5} item={item} index={index + 5} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex-col">
          <div className="text-bold mt-6" style={{ fontSize: 10 }}>
            카테고리별 검색
          </div>

          <div className="w-full flex flex-row justify-between mt-4">
            {categories.map((category) => (
              <div
                key={category.value}
                className="flex flex-col items-center justify-center"
              >
                <Image
                  src={category.image}
                  alt={category.label}
                  width={56}
                  height={56}
                />

                <p className="mt-2.5 text-bold" style={{ color: '#787486', fontSize: 8 }}>{category.label}</p>
              </div>
            ))}  
          </div>
        </div>

        <div className="w-full flex-col">
          <div className="text-bold mt-6" style={{ fontSize: 10 }}>
            상황별 검색
          </div>

          <div className="w-full flex flex-row justify-between mt-4">
            {categories.map((category) => (
              <div
                key={category.value}
                className="flex flex-col items-center justify-center"
              >
                <Image
                  src={category.image}
                  alt={category.label}
                  width={56}
                  height={56}
                />

                <p className="mt-2.5 text-bold" style={{ color: '#787486', fontSize: 8 }}>{category.label}</p>
              </div>
            ))}  
          </div>
        </div>

      </div>


    </div>
  );
}
