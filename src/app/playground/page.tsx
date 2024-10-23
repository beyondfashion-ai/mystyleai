"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import db from "../../../firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

interface Style {
  label: string;
  image: string;
  gender: string;
  season: string;
}

const styles: Style[] = [
  { label: 'CH*NE*', image: '/images/playground/chanel.png', gender: 'WOMEN', season: 'FW' },
  { label: 'CEL*N*', image: '/images/playground/celine.png', gender: 'WOMEN', season: 'FW' },
  { label: 'MIUM**', image: '/images/playground/miumiu.png', gender: 'WOMEN', season: 'FW' },
  { label: 'LOU*S VU*TTON', image: '/images/playground/louisButton.png', gender: 'MEN', season: 'FW' },
  { label: 'BAL*NCI*GA', image: '/images/playground/balenciaga.png', gender: 'MEN', season: 'FW' },
  { label: 'F*NDI', image: '/images/playground/fendi.png', gender: 'MEN', season: 'FW' }
]

export default function Playground() {

  const router = useRouter()

  const [selectedStyle, setSelectedStyle] = useState<Style>()
  const [selectedStyleImagePath, setSelectedStyleImagePath] = useState('')
  const [prompt, setPrompt] = useState('')

  const handleStyleClick = (style: Style) => {
    setSelectedStyle(style)
    setSelectedStyleImagePath(style.image)
  }

  const handleGenerateCollection = async () => {
    console.log("handlegenerationcollection")

    // const date = new Date();
    // const koreanTime = date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' });

    // try {
    //   const docRef = await addDoc(collection(db, 'generation_alpha'), {
    //     prompt,
    //     style: selectedStyle?.label,
    //     date: koreanTime,
    //   })

    //   const documentId = docRef.id
    //   console.log(documentId)

    // } catch (error) {
    //   console.log(error)
    // }

    
  }

  return (
    <div className="flex relative flex-col pt-3 pb-8 px-3" >
      <Image
        src="/images/mainLogoAlpha.png"
        alt="mainLogo"
        width={144}
        height={39}
      />

      <div
        className="flex flex-col w-full items-center my-10"
      >
        <div
          className="relative flex justify-center"
        >

        <div
          className="absolute flex items-center justify-center text-center w-full text-bold px-2"
          style={{
            top: '70%',
          }}
        >

          <div
            className="w-full py-1"
            style={{
              fontSize: 10,
              backgroundColor: 'rgba(249, 239, 225, 0.7)',
              borderRadius: 8,
              
            }}
          >
            { selectedStyle === undefined ? '2024 FW의 디자이너가 되어보세요.' : `${selectedStyle.label} 2024 ${selectedStyle.season} ${selectedStyle.gender}` }
            

          </div>
        </div>


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
        </div>


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
              {selectedStyle?.label === style.label && (
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
          className="mt-8 text-medium p-1 cursor-pointer"
          style={{ color: 'white', backgroundColor: 'var(--main-color)', borderRadius: 8 }}
          onClick={handleGenerateCollection}
        >
          <div
            className="text-medium py-2"
            style={{ color: 'white', backgroundColor: 'var(--main-color)', borderRadius: 8, paddingLeft: 60, paddingRight: 60, border: '2px dashed white' }}

          >
            컬렉션 제작

          </div>

        </div>




      </div>
    </div>
  )

}



