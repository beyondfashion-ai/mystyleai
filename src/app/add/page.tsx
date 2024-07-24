"use client"

import Header from "@/components/common/Header";
import Image from "next/image";
import { ChangeEvent, useCallback, useState } from "react";
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

const generationMenus = [
  { label: '프롬프터로 제작하기', value: 'prompt' },
  { label: '스케치로 제작하기', value: 'sketch' },
]

export default function Add() {

  const router = useRouter()

  const [selectedBasicStyle, setSelectedBasicStyle] = useState('gender')
  const [prompt, setPrompt] = useState('')
  const [selectedMenu, setSelectedMenu] = useState('prompt')
  const [sketchImage, setSketchImage] = useState<string | null>(null);


  const createClothesImage = async () => {
    console.log('create clothes image');
    router.push(`/add/result?type=${selectedMenu}`)
    
  };

  const generateTextToImage = async () => {
    console.log('generate text to image');
    router.push(`/add/result?type=${selectedMenu}&prompt=${prompt}`)
  }

  const generateSketchToImage = async () => {
    console.log('generate sketch to image');
    router.push(`/add/result?type=${selectedMenu}`)
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSketchImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          setSketchImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

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
        <div className='flex w-full flex-row mt-2 rounded-lg p-0.5' style={{ backgroundColor: '#EAEAEA' }}>
          {generationMenus.map((menu) => (
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


        {selectedMenu == 'prompt' ? (
          <div>
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




          </div>
        ) : (
          <div className="w-full mt-4 p-2">
            <label
              className="flex flex-col justify-center items-center w-full border rounded-md"
              style={{
                fontSize: 10,
                height: 294,
                resize: 'none',
                borderColor: 'var(--main-color)',
                backgroundColor: '#F5EFE1',
                borderWidth: 2,
                backgroundImage: sketchImage ? `url(${sketchImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                cursor: 'pointer',
              }}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
              {!sketchImage && (
                <>
                  <div className="p-4 bg-main-background rounded-full">
                    <Image
                      src='/images/add/plus.svg'
                      alt='plus'
                      width={14}
                      height={14}
                    />
                  </div>
                  <div
                    className="text-bold text-center mt-3.5"
                    style={{ fontSize: 13, color: '#9CA3AF' }}
                  >
                    스케치 파일을 업로드 하려면<br />클릭해 주세요!
                  </div>
                </>
              )}
            </label>
          </div>
        )}

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

        <div className="w-full mt-2" style={{ height: 2, backgroundColor: '#D9D9D9' }} />

        <div
          className="flex flex-col justify-center items-center w-full mt-4 p-2 border rounded-md"
          style={{ fontSize: 10, height: 294, resize: 'none', borderColor: 'var(--main-color)', backgroundColor: '#F5EFE1', borderWidth: 2 }}
        >
          <div
            className="p-3.5 bg-main-background rounded-md border"
            style={{ borderColor: '#374151' }}

          >
            <Image
              src='/images/common/magicBar.svg'
              alt='arrow right'
              width={30}
              height={30}
            />
          </div>

          <div
            className="text-bold text-center mt-3.5"
            style={{ fontSize: 13, color: '#9CA3AF' }}
          >
            아직 만들어진 옷이 없습니다.<br />옷을 만들어주세요!
          </div>

        </div>

        <div
          className="flex w-full items-center justify-center py-2.5 bg-main-background rounded-md cursor-pointer"
          // onClick={() => createClothesImage()}
          onClick={selectedMenu == 'prompt' ? generateTextToImage : generateSketchToImage}
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
              />
            </div>
          </div>

        </div>



      </div>
    </div>
  );
}
