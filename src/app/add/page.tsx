"use client"

import Header from "@/components/common/Header";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const recommendedStyles = [
  { title: 'Dior Style', subTitle: 'AI 디올 디자이너', image: '/images/add/styles/styleDior.png' },
  { title: 'Dior Style', subTitle: 'AI 디올 디자이너', image: '/images/add/styles/styleDior.png' },
  { title: 'Dior Style', subTitle: 'AI 디올 디자이너', image: '/images/add/styles/styleDior.png' },
  { title: 'Dior Style', subTitle: 'AI 디올 디자이너', image: '/images/add/styles/styleDior.png' },
  { title: 'Dior Style', subTitle: 'AI 디올 디자이너', image: '/images/add/styles/styleDior.png' },
  { title: 'Dior Style', subTitle: 'AI 디올 디자이너', image: '/images/add/styles/styleDior.png' }
]

const basicStyles = [
  { label: '성별', value: 'gender' },
  { label: '체형', value: 'body' },
  { label: '스타일', value: 'style' },
  { label: '색상', value: 'color' },

]

export default function Add() {

  const router = useRouter()

  const [selectedBasicStyle, setSelectedBasicStyle] = useState('gender')
  const [prompt, setPrompt] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const createClothesImage = () => {
    console.log('create clothes image')
    setPrompt('')
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
  }

  const navigateToResultPage = () => {
    router.push('/add/result')
  }

  return (
    <div>
      

      <div className="px-3">
        <Header title="AI 제작하기" />

        <div className="text-bold" style={{ fontSize: 10 }}>
          추천 AI 스타일
        </div>
      </div>

      <div
        className="flex flex-row overflow-x-auto mt-4"
        style={{ scrollbarWidth: 'none' }}
      >
        {recommendedStyles.map((style, index) => (
          <div
            key={style.title}
            className={`flex ${index === 0 ? 'ms-3' : 'ms-2'} ${index === recommendedStyles.length - 1 ? 'me-3' : ''} rounded-md`}
          >
            <div
              className="relative"
              style={{ width: 102, height: 120 }}
            >
              <Image
                src={style.image}
                alt={style.title}
                width={102}
                height={120}
              />
              <div
                className="absolute w-full rounded-b-md bottom-0 backdrop-blur-md px-2.5 py-1"
                style={{ backgroundColor: 'rgba(14, 214, 208, 0.5)', width: 102 }}
              >
                <div
                  className="flex flex-row w-full justify-between"
                >
                  <div style={{ fontSize: 11, color: '#262626' }}>{style.title}</div>
                  <Image
                    src='/images/add/star.svg'
                    alt='heart icon'
                    width={14}
                    height={11}
                  />
                </div>
                <div className="text-bold text-white" style={{ fontSize: 10 }}>{style.subTitle}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 px-3">

        <div className="w-full" style={{ height: 2, backgroundColor: '#D9D9D9' }} />


        <div className="text-bold mt-3" style={{ fontSize: 10 }}>
          기본 스타일 정하기
        </div>

        <div className="flex flex-row mt-2">
          {basicStyles.map((basicStyle) => (
            <div
              className="flex flex-row relative items-center justify-between px-4 py-1 rounded-md mx-0.5 cursor-pointer"
              style={{ backgroundColor: '#F5EFE1', borderColor: selectedBasicStyle == basicStyle.value ? '#BFA054' : '#E3D4B5', borderWidth: 1 }}
              onClick={() => setSelectedBasicStyle(basicStyle.value)}
            >
              <div style={{ fontSize: 8, color: '#8A8888' }}>{basicStyle.label}</div>

            </div>
          ))}
        </div>

        <div className='mt-2.5 w-full grid grid-cols-4 gap-1'>
          <img src='/images/home/samples/sample1.png' alt='1' className='w-full h-full rounded-md' />
          <img src='/images/home/samples/sample1.png' alt='1' className='w-full h-full rounded-md' />
          <img src='/images/home/samples/sample1.png' alt='1' className='w-full h-full rounded-md' />
          <img src='/images/home/samples/sample1.png' alt='1' className='w-full h-full rounded-md' />
          <img src='/images/home/samples/sample1.png' alt='1' className='w-full h-full rounded-md' />
          <img src='/images/home/samples/sample1.png' alt='1' className='w-full h-full rounded-md' />
          <img src='/images/home/samples/sample1.png' alt='1' className='w-full h-full rounded-md' />
        </div>

        <div className="text-bold mt-2" style={{ color: '#B0B0B0', fontSize: 8 }}>
          * 원하는 이미지를 선택해 주세요. 한 개만 선택 가능합니다.
        </div>

        <div className="w-full mt-2" style={{ height: 2, backgroundColor: '#D9D9D9' }} />

        <div className="text-bold mt-3" style={{ fontSize: 10 }}>
          PROMPT 입력하기
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
          style={{ fontSize: 10, height: 90, resize: 'none', borderColor: '#BFA054', backgroundColor: '#F5EFE1' }}
          placeholder="이미지에 대한 설명을 입력해주세요."
        />

        <div
          className="flex w-full justify-end"
          style={{ fontSize: 7, color: '#B0B0B0' }}
        >
          전체삭제
        </div>


        <div
          className="flex w-full items-center justify-center py-2.5 bg-main-background rounded-md cursor-pointer"
          onClick={() => createClothesImage()}
          style={{ marginTop: 44 }}
        >
          <div className="flex flex-row items-center relative">
            <div className="text-white text-bold" style={{ fontSize: 15 }}>
              AI 옷 만들기
            </div>

            <div className="absolute" style={{ right: -24 }}>
              <Image
                src='/images/common/magicBar.svg'
                alt='arrow right'
                width={16}
                height={16}
              >
              </Image>
            </div>
          </div>

        </div>

      </div>

      {isModalVisible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="w-full mx-3 p-2 rounded-2xl bg-main-background"
            style={{ maxWidth: 343 }}
            // onClick={(e) => e.stopPropagation()}
            onClick={navigateToResultPage}
          >
            <div
              className="flex flex-col w-full p-2 rounded-2xl items-center justify-center"
              style={{ height: 312, border: '2px dashed white' }}
            >
              <div className="rounded-full" style={{ position: 'relative', width: 96, height: 96, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <Image
                  src='/images/add/processModalCircle.svg'
                  alt='plus'
                  width={96}
                  height={96}
                />

                <div
                  className="w-full h-full text-bold bg-white rounded-full flex items-center justify-center"
                  style={{
                    width: 80,
                    height: 80,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: 25,
                    color: 'var(--main-color)',

                  }}
                >
                  <div>
                    10%
                  </div>
                </div>

              </div>


              <div
                className="text-semiBold text-white mt-4"
                style={{ fontSize: 32, color: '#FCFDFE' }}
              >
                옷 제작중
              </div>

              <div
                className="text-medium text-white"
                style={{ fontSize: 13, color: '#FCFDFE' }}
              >
                열심히 디자이너님의 옷을 만드는 중이에요!
              </div>

            </div>

          </div>
        </div>
      )}




    </div>
  );
}
