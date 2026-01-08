"use client"

import GenerationProcessModal from "@/components/common/generationProcessModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";



interface Style {
  label: string;
  image: string;
  gender: string;
  season: string;
  index: number;
}

const styles: Style[] = [
  { label: 'CH*NE*', image: '/images/playground/chanel.png', gender: 'WOMEN', season: 'FW', index: 1 },
  { label: 'CEL*N*', image: '/images/playground/celine.png', gender: 'WOMEN', season: 'FW', index: 2 },
  { label: 'MIUM**', image: '/images/playground/miumiu.png', gender: 'WOMEN', season: 'FW', index: 3 },
  { label: 'LOU*S VU*TTON', image: '/images/playground/louisButton.png', gender: 'MEN', season: 'FW', index: 4 },
  { label: 'BAL*NCI*GA', image: '/images/playground/balenciaga.png', gender: 'MEN', season: 'FW', index: 5 },
  { label: 'F*NDI', image: '/images/playground/fendi.png', gender: 'MEN', season: 'FW', index: 6 }
]

const processStatus = [
  { number: 25, title: "디자인 일러스트 중", subTitle: "AI 패션 어시스턴트가 열심히 그리고 있어요" },
  { number: 50, title: "의상 봉제 중", subTitle: "디자이너님의 옷을 만드는 중이에요!" },
  { number: 75, title: "모델 준비중", subTitle: "탑 모델이 디자이너님의 옷을 착용하려 오고있어요" },
  { number: 90, title: "모델 착장중", subTitle: "이제 거의 다 되었어요!" },
]

export default function Playground() {

  const router = useRouter()

  const [selectedStyle, setSelectedStyle] = useState<Style>()
  const [selectedStyleImagePath, setSelectedStyleImagePath] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [modalContent, setModalContent] = useState({ number: 0, title: "", subTitle: "" });
  const [userGender, setUserGender] = useState('')

  const handleStyleClick = (style: Style) => {
    setSelectedStyle(style)
    setSelectedStyleImagePath(style.image)
  }

  const closeModal = () => {
    setIsModalVisible(false)
  }

  const handleGenerateCollection = async () => {

    setIsModalVisible(true)

    processStatus.forEach((status, index) => {
      setTimeout(() => {
        setModalContent(status);
      }, index * 2000);
    });


    const response = await fetch('/api/alpha/generateImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
        style: selectedStyle?.index,
        userGender
      })
    })

    const data = await response.json()

    const { status, generationId } = data

    setIsModalVisible(false)

    if (status === 'success') {
      router.push(`/playground/collection/${generationId}`)
    }

  }

  return (
    <div>

      {userGender === '' && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center z-50 text-white"
        >

          <div
            style={{ fontSize: 24, marginBottom: 78 }}
          >
            디자이너님의 성별을 알려주세요.
          </div>

          <div 
            className="bg-white cursor-pointer"
            style={{ paddingLeft: 80, paddingRight: 80, paddingTop: 60, paddingBottom: 60, color: 'var(--main-color)', fontSize: 36, borderRadius: 20 }}
            onClick={() => setUserGender('women')}
          >
            여성
          </div>

          <div 
            className="bg-white cursor-pointer"
            style={{ paddingLeft: 80, paddingRight: 80, paddingTop: 60, paddingBottom: 60, color: 'var(--main-color)', fontSize: 36, borderRadius: 20, marginTop: 14 }}
            onClick={() => setUserGender('men')}
          >
            남성
          </div>

        </div>
      )}

      <div className="flex relative flex-col pt-3 pb-8 px-3" >
        <Image
          className='cursor-pointer'
          src="/images/mainLogoAlpha.png"
          alt="mainLogo"
          width={100}
          height={25}
          onClick={() => router.push('/playground')}
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
                {selectedStyle === undefined ? '2024 FW의 디자이너가 되어보세요.' : `${selectedStyle.label} 2024 ${selectedStyle.season} ${selectedStyle.gender}`}


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
            style={{ fontSize: 14, height: 90, resize: 'none', borderColor: '#BFA054', backgroundColor: '#F5EFE1', whiteSpace: 'pre-line' }}
            placeholder={`당신의 디자인을 설명해주세요 !
              (예시) “여자 모델이 착용한 카키색 코트와 갈색의 중간 사이즈 토트백”`}
          />

          <div
            className={`mt-8 text-medium p-1 ${selectedStyle ? 'cursor-pointer' : ''}`}
            style={{ color: 'white', backgroundColor: 'var(--main-color)', borderRadius: 8, opacity: selectedStyle ? 1 : 0.3 }}
            onClick={selectedStyle && handleGenerateCollection}
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

      {isModalVisible && (
        <GenerationProcessModal number={modalContent.number} title={modalContent.title} subTitle={modalContent.subTitle} />
      )}
    </div>

  )

}



