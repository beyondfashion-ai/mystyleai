"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const SNSIcons = [
  { name: "카카오톡", src: "/images/playground/kakaoIcon.png" },
  { name: "인스타그램", src: "/images/playground/instagramIcon.png" },
  { name: "X(트위터)", src: "/images/playground/XIcon.png" },
]

export default function Collection() {

  const router = useRouter()
  const handleGenerateModel = () => {
    router.push(`/playground/model`)
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

        <Image
          src="/images/playground/playgroundSampleImage.png"
          alt="playgroundSampleImage"
          width={200}
          height={200}
          className="shadow-2xl"
        />
        <div
          className="mt-8 text-bold"
        >
          디자이너님의 디자인을 친구들과 공유하세요.
        </div>

        <div
          className='mt-10 grid grid-cols-3 gap-7'
        >
          {SNSIcons.map((icon, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center"
            >
              <Image
                src={icon.src}
                alt={icon.name}
                width={40}
                height={40}
              />
              <div 
                className="mt-2 text-medium"
                style={{ fontSize: 10 }}
              >
                {icon.name}
              </div>
            </div>
          ))}

        </div>

        <div
          className="mt-8 text-bold"
          style={{ fontSize: 28 }}
        >
          내가 직접 모델이 될 수 있어요!
        </div>

        <div
          className="mt-8 text-medium"
        >
          ※ 업로드 이미지는 기능 동작에만 사용되며 
        </div>

        <div
          className="mt-2 text-medium"
        >
          바로 즉시 삭제 하여 저장되지 않습니다.
        </div>

        <div
          className="mt-8 text-medium p-1 cursor-pointer"
          style={{ color: 'white', backgroundColor: 'var(--main-color)', borderRadius: 8 }}
        >
          <div
            className="text-medium py-2 text-center"
            style={{ color: 'white', backgroundColor: 'var(--main-color)', borderRadius: 8, paddingLeft: 60, paddingRight: 60, border: '2px dashed white' }}
            onClick={handleGenerateModel}
          >
            모델데뷔
            <div style={{ fontSize: 8 }}>얼굴 이미지 업로드</div>
          </div>
        </div>

      </div>


    </div>
  )
}