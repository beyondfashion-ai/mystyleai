"use client"

import Image from "next/image";
import { useState } from "react";

interface Style {
  label: string;
  image: string;
  gender: string;
}

const styles: Style[] = [
  { label: 'CH*NE*', image: '/images/playground/chanel.png', gender: 'WOMEN' },
  { label: 'CEL*N*', image: '/images/playground/celine.png', gender: 'WOMEN' },
  { label: 'MIUM**', image: '/images/playground/miumiu.png', gender: 'WOMEN' },
  { label: 'LOU*S VU*TTON', image: '/images/playground/louisButton.png', gender: 'MEN' },
  { label: 'BAL*NCI*GA', image: '/images/playground/balenciaga.png', gender: 'MEN' },
  { label: 'F*NDI', image: '/images/playground/fendi.png', gender: 'MEN' }
]

export default function Playground() {

  const [selectedStyle, setSelectedStyle] = useState('')
  const [selectedStyleImagePath, setSelectedStyleImagePath] = useState('')
  const [prompt, setPrompt] = useState('')

  const handleStyleClick = (style: Style) => {
    setSelectedStyle(style.label)
    setSelectedStyleImagePath(style.image)
  }



  return (
    <div className="flex relative flex-col pt-3 pb-8 px-3" >
      <Image
        src="/images/mainLogo.png"
        alt="mainLogo"
        width={144}
        height={39}
      />

      <div
        className="flex flex-col w-full items-center my-10"
      >

        {
          selectedStyleImagePath == '' ? (
            <Image
              src="/images/playground/playgroundSampleImage.png"
              alt="playgroundSampleImage"
              width={200}
              height={200}
              className="shadow-2xl"
            />
          ) : (
            <Image
              src={selectedStyleImagePath}
              // src="/images/playground/celine.png"
              alt="selectedStyle"
              width={200}
              height={200}
              className="shadow-2xl"
            />
          )}

        <div
          className="mt-8 text-medium"
        >
          지금까지 100분의 디자이너가 데뷔하였습니다.
        </div>

        <div
          className="mt-8 text-medium border-2 py-2 px-5 shadow-xl"
          style={{ color: 'var(--main-color)', borderColor: 'var(--main-color)', borderRadius: 8 }}
        >
          원하는 컬렉션을 선택해 주세요!
        </div>

        <div
          className='mt-10 grid grid-cols-3 gap-2.5'

        >
          {styles.map((style, index) => (
            <div
              key={style.label}
              className="relative items-center justify-center cursor-pointer"
              style={{
                // backgroundColor: selectedStyle === style.label ? 'var(--main-color)' : 'initial',
                // color: selectedStyle === style.label ? 'white' : 'black',
                // fontSize: 10,
                borderRadius: 8,
              }}
              onClick={() => handleStyleClick(style)}
            >
              {selectedStyle === style.label && (
                <div
                  className="absolute flex items-center justify-center w-full h-full text-center"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', // 반투명 검은색 배경
                    borderRadius: 8,
                    fontSize: 14
                  }}
                >
                  <span style={{ color: 'white', fontSize: 14 }}>{style.label}<br />2024 FW<br />{style.gender}</span> {/* 흰색 라벨 */}

                </div>
              )}

              <Image
                src={style.image}
                alt={style.label}
                style={{ borderRadius: 8 }}
                width={120}
                height={120}
              />



            </div>
          ))}
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="mt-2 p-2 border rounded-md mt-8 w-full"
          style={{ fontSize: 10, height: 90, resize: 'none', borderColor: '#BFA054', backgroundColor: '#F5EFE1' }}
          placeholder="이미지에 대한 설명을 입력해주세요."
        />

        <div
          className="mt-8 text-medium p-1"
          style={{ color: 'white', backgroundColor: 'var(--main-color)', borderRadius: 8 }}
        >
          <div
            className="text-medium py-2 cursor-pointer"
            style={{ color: 'white', backgroundColor: 'var(--main-color)', borderRadius: 8, paddingLeft: 60, paddingRight: 60, border: '2px dashed white' }}
            onClick={() => alert('컬렉션 제작')}
          >
            컬렉션 제작

          </div>

        </div>




      </div>
    </div>
  )

}



