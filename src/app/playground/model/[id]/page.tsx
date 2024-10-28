
import Image from 'next/image';

const SNSIcons = [
  { name: "카카오톡", src: "/images/playground/kakaoIcon.png" },
  { name: "인스타그램", src: "/images/playground/instagramIcon.png" },
  { name: "X(트위터)", src: "/images/playground/XIcon.png" },
]

export default function Model() {
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
          className='relative w-full flex flex-col py-4 items-center justify-center mt-4'
          
        >
          <div
            className='absolute w-full h-full flex bg-black opacity-90 rounded-xl items-center justify-center text-white'
            style={{ fontSize: 32 }}

          >
            COMING SOON

          </div>
          <div
            className="text-bold text-center"
            style={{ fontSize: 28 }}
          >
            내가 모델이 된<br />패션쇼 영상을 볼 수 있어요
          </div>
       

          <div
            className="flex mt-8 text-medium p-1 cursor-pointer"
            style={{ color: 'white', backgroundColor: 'var(--main-color)', borderRadius: 8 }}
          >
            <div
              className="text-medium py-2"
              style={{ color: 'white', backgroundColor: 'var(--main-color)', borderRadius: 8, paddingLeft: 60, paddingRight: 60, border: '2px dashed white' }}

            >
              패션쇼 영상 보기

            </div>

          </div>
        </div>


      </div>


    </div>
  )
}