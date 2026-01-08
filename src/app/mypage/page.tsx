"use client"

import Header from "@/components/common/Header";
import Image from "next/image";
import { useState } from 'react';

const myPageMenus = [
  { label: 'AI 제작', value: 'history' },
  { label: '북마크', value: 'bookmark' },
]


const clothesStyles = [
  { name: '샤넬 스타일 반팔티', price: '19000', image: '/images/myPage/samples/sample1.png', numOfLikes: 50, numOfComments: '52', clothesType: '상의' },
  { name: '자라 스타일 반팔 셔츠', price: '19000', image: '/images/myPage/samples/sample2.png', numOfLikes: 50, numOfComments: '52', clothesType: '상의'  },
  { name: '아미 스타일 후드티', price: '19000', image: '/images/myPage/samples/sample3.png', numOfLikes: 50, numOfComments: '52', clothesType: '상의'  },
  { name: '샤넬 스타일 반팔티', price: '19000', image: '/images/myPage/samples/sample4.png', numOfLikes: 50, numOfComments: '52', clothesType: '상의'  },
  { name: '자라 스타일 반팔 셔츠', price: '19000', image: '/images/myPage/samples/sample5.png', numOfLikes: 50, numOfComments: '52', clothesType: '상의'  },
  { name: '아미 스타일 후드티', price: '19000', image: '/images/myPage/samples/sample6.png', numOfLikes: 50, numOfComments: '52', clothesType: '상의'  },
]

export default function MyPage() {

  const [selectedMenu, setSelectedMenu] = useState('history')

  // const windowWidth = window.innerWidth > 600 ? 600 : window.innerWidth
  // const clothesStyleHeight = windowWidth * (7 / 18)

  return (
    <div>
      <div className="px-3 flex justify-between">
        <Header title="마이페이지" />
        <div className="mt-2.5">
          <Image
            src="/images/common/setting.svg"
            alt="edit"
            width={26}
            height={26}
          />
        </div>
      </div>

      <div className="flex flex-row items-center mt-4 px-10">
        <div>
          <Image
            src="/images/myPage/profile.png"
            alt="profile"
            width={100}
            height={100}
          />
        </div>
        <div className="ms-10">
          <div className="text-bold" style={{ fontSize: 18 }}>
            AI Designer Kwon
          </div>

          <div className="" style={{ fontSize: 14, color: '#666666' }}>
            @Kwonbigre_
          </div>

          <div className="flex flex-row mt-2">
            <p className="text-bold" style={{ fontSize: 16 }}>팔로워</p>
            <p className="text-bold ms-2" style={{ fontSize: 16 }}>50</p>
            <p className="text-bold ms-3" style={{ fontSize: 16 }}>팔로워</p>
            <p className="text-bold ms-2" style={{ fontSize: 16 }}>90</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center rounded-md py-2 text-bold mt-4 mx-3" style={{ fontSize: 16, borderColor: 'var(--main-color)', borderWidth: 1, color: '#065653' }}>
        프로필 설정
      </div>

      <div className="flex bg-main-background px-3 py-3.5 my-4">

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-bold" style={{ color: '#27343E', fontSize: 16 }}>
            주문조회
          </div>
          <div className="text-bold text-white" style={{ fontSize: 24 }}>
            8
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-bold" style={{ color: '#27343E', fontSize: 16 }}>
            쿠폰
          </div>
          <div className="text-bold text-white" style={{ fontSize: 24 }}>
            3
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-bold" style={{ color: '#27343E', fontSize: 16 }}>
            마일리지
          </div>
          <div className="text-bold text-white" style={{ fontSize: 24 }}>
            12P
          </div>
        </div>

      </div>

      <div className="flex px-3">
        <div className='flex w-full flex-row mt-5 rounded-lg p-0.5' style={{ backgroundColor: '#EAEAEA' }}>
          {myPageMenus.map((menu) => (
            <div
              key={menu.value}
              className={`flex flex-col items-center justify-center w-1/2 py-3 rounded-lg cursor-pointer text-bold`}
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
      </div>


      <div className="flex flex-row mt-2 px-3">
        <div className="text-bold" style={{ fontSize: 8, color: '#065653' }}>
          추천 수
        </div>

        <Image
          src="/images/common/polygon.svg"
          className="ms-1"
          alt="arrow down"
          width={8}
          height={7}
        />
      </div>

      <div className='px-2 mt-2.5 w-full grid grid-cols-3 gap-0.5'>

        {clothesStyles.map((clothesStyle) => (
          <div className="flex relative rounded-b-lg">
            <div className="relative w-full" style={{ paddingTop: '125%' }}>
            <img
                src={clothesStyle.image}
                alt='1'
                className='absolute top-0 left-0 w-full h-full rounded-b-lg'

              />
              <div
                className="absolute"
                style={{ top: 4, left: 4 }}

              >
                <Image
                  src='/images/common/heartIcon.svg'
                  alt='heart icon'
                  width={15}
                  height={15}
                />
              </div>
              <div className="absolute w-full rounded-b-lg bottom-0 px-2.5 py-1" style={{ backgroundColor: '#0ED6D0' }}>
                <div className="flex flex-row w-full justify-between">
                  <div className="text-bold text-white" style={{ fontSize: 10 }}>{clothesStyle.name}</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="text-bold" style={{ color: '#5A5858', fontSize: 7 }}>
                    {clothesStyle.clothesType}
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
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
