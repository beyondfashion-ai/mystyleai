"use client"

import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '../../../../../firebase/firestore';
import downloadImage, { shareX } from '@/app/utils/utils';

const SNSIcons = [
  { name: "카카오톡", src: "/images/playground/kakaoIcon.png", shareFunction: shareX },
  { name: "인스타그램", src: "/images/playground/instagramIcon.png", shareFunction: shareX },
  { name: "X(트위터)", src: "/images/playground/XIcon.png", shareFunction: shareX },
]

export default function Model() {

  const [swappedImageUrl, setSwappedImageUrl] = useState<string>('')

  const router = useRouter()
  const pathName = usePathname()
  const generationId = pathName.split('/').pop()

  useEffect(() => {
    if (!generationId) {
      router.push('/playground'); // generationId가 없으면 다른 페이지로 이동
      return;
    }

    const fetchGenerationData = async () => {
      try {
        const docRef = doc(db, 'generation_alpha', generationId); // Firestore에서 해당 문서 참조 가져오기
        const docSnap = await getDoc(docRef);

        console.log(docSnap)

        if (docSnap.exists()) {

          const data = docSnap.data()
          console.log(data)
          const imageUrl = data.swapped_image_url
          // setGenerationData(docSnap.data()); // 문서 데이터를 state에 저장
          console.log(imageUrl)
          setSwappedImageUrl(imageUrl);
        } else {
          console.log('No such document!');
          // setError('Document not found');
        }
      } catch (err) {
        console.error('Error fetching document:', err);
        // setError('Failed to fetch document');
      } finally {
        // setLoading(false); // 로딩 상태 종료
      }
    };

    fetchGenerationData();

  }, [])

  return (
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

        {swappedImageUrl && (
          <div
            className='relative'
          >

            <Image
              src={swappedImageUrl}
              alt="playgroundSampleImage"
              width={330}
              height={330}
              className="shadow-2xl"
            />

<div
                className="absolute top-0 right-0 text-black p-2 rounded-lg mt-3 me-3 cursor-pointer"
                style={{ backgroundColor: 'rgba(245, 239, 225, 0.7)' }}
                onClick={() => downloadImage(swappedImageUrl, "swapped-image.jpg")} // 원하는 파일명 설정
              >
                <Image
                  src="/images/playground/download.png"
                  alt="downloadIcon"
                  width={20}
                  height={20}
                />
              </div>
          </div>

        )}

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
              onClick={() => icon.shareFunction('디자이너님의 디자인을 친구들과 공유하세요.', window.location.href)}
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
            className='absolute w-full h-full flex bg-black opacity-60 rounded-xl items-center justify-center text-white'
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