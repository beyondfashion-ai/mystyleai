// http://localhost:3000/playground/collection/5vDZuQ05tjG92mGV0afo
"use client"

import { doc, getDoc } from 'firebase/firestore'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { db } from '../../../../../firebase/firestore'
import GenerationProcessModal from '@/components/common/generationProcessModal'
import { shareX } from '@/app/utils/utils'
// test

const SNSIcons = [
  { name: "카카오톡", src: "/images/playground/kakaoIcon.png", shareFunction: shareX },
  { name: "인스타그램", src: "/images/playground/instagramIcon.png", shareFunction: shareX },
  { name: "X(트위터)", src: "/images/playground/XIcon.png", shareFunction: shareX },
]


const processStatus = [
  { number: 25, title: "비행기 타는중", subTitle: "패션쇼 참석을 위해 비행중이에요" },
  { number: 50, title: "숙소도착", subTitle: "숙소에 도착해서 짐을 푸는중이에요" },
  { number: 75, title: "메이크업 하는중", subTitle: "쇼를 위해 메이크업을 하고있어요" },
  { number: 90, title: "의상 착용중", subTitle: "이제 옷을 입고 쇼에 나갈 준비를 마쳤어요" },
]

export default function Collection() {

  const router = useRouter()
  const pathName = usePathname()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalContent, setModalContent] = useState({ number: 0, title: "", subTitle: "" });

  const generationId = pathName.split('/').pop()

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
          const imageUrl = data.generated_image_url
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

  const handleUploadUserFace = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]


    if (file) {
      setIsModalVisible(true)

      processStatus.forEach((status, index) => {
        setTimeout(() => {
          setModalContent(status);
        }, index * 2000);
      });

      const formData = new FormData()
      formData.append('userImage', file)
      formData.append('generationId', generationId as string)
      formData.append('generatedImageUrl', generatedImageUrl)

      const response = await fetch('/api/alpha/swapUserFace', {
        method: 'POST',
        body: formData
      })

      console.log(response)
      const { status } = await response.json()

      if (status === 'success') {

        router.push(`/playground/model/${generationId}`)
      }

      setIsModalVisible(false)

    }
  }


  return (
    <div>
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
            <div
              className='relative'
            >

              <Image
                src={generatedImageUrl}
                alt="playgroundSampleImage"
                width={330}
                height={330}
                className="shadow-2xl"
              />
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
            onClick={handleUploadUserFace}
          >
            <div
              className="text-medium py-2 text-center"
              style={{ color: 'white', backgroundColor: 'var(--main-color)', borderRadius: 8, paddingLeft: 60, paddingRight: 60, border: '2px dashed white' }}
            // onClick={handleGenerateModel}
            >
              모델데뷔
              <div style={{ fontSize: 8 }}>얼굴 이미지 업로드</div>
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>

        </div>


      </div>

      {isModalVisible && (
        <GenerationProcessModal number={modalContent.number} title={modalContent.title} subTitle={modalContent.subTitle} />
      )}
    </div>

  )
}