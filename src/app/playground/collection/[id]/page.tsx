"use client"

import { doc, getDoc } from 'firebase/firestore'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { db } from '../../../../../firebase/firestore'

const SNSIcons = [
  { name: "카카오톡", src: "/images/playground/kakaoIcon.png" },
  { name: "인스타그램", src: "/images/playground/instagramIcon.png" },
  { name: "X(트위터)", src: "/images/playground/XIcon.png" },
]

export default function Collection() {

  const router = useRouter()
  const pathName = usePathname()

  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('')

  console.log(pathName)
  const generationId = pathName.split('/').pop()

  console.log(generationId)
  // const { id } = router.query as { id: string }

  useEffect(() => {
    if (!generationId) {
      router.push('/playground'); // generationId가 없으면 다른 페이지로 이동
      return;
    }

    const fetchGenerationData = async () => {
      try {
        const docRef = doc(db, 'generation_alpha', generationId); // Firestore에서 해당 문서 참조 가져오기
        const docSnap = await getDoc(docRef);



        if (docSnap.exists()) {

          const data = docSnap.data()
          console.log(data)
          const imageUrl = data.generatedImageURL
          // setGenerationData(docSnap.data()); // 문서 데이터를 state에 저장
          setGeneratedImageUrl(imageUrl);
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
        {generatedImageUrl && (
          <Image
            // src="/images/playground/playgroundSampleImage.png"
            src={generatedImageUrl}
            // src="https://firebasestorage.googleapis.com/v0/b/my-style-5649d.appspot.com/o/alpha%2FGSwa7IYVkmdHwzsxmoqz.png?alt=media&token=8b895e1c-cc93-482d-ab40-defc2895caff"
            alt="playgroundSampleImage"
            width={200}
            height={200}
            className="shadow-2xl"
          />
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