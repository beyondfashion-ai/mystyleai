"use client"

import Header from "@/components/common/Header";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import fs from 'fs';


const resultImages = [
  { src: '/images/add/result/sampleImage.png' },
  { src: '/images/add/result/sampleImage.png' },
  { src: '/images/add/result/sampleImage.png' },
  { src: '/images/add/result/sampleImage.png' }
]

function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prompt = ""
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const generateType = searchParams.get('type');
  console.log(generateType)

  const [isModalVisible, setIsModalVisible] = useState(true)
  const closeModal = () => {
    setIsModalVisible(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!generateType) {
        router.replace('/add');
      } else {
        try {

          const formData = new FormData();
          formData.append('generateType', generateType);

          const response = await fetch('/api/generateImage', {
            method: 'POST',
            body: formData
          });

          if (!response.ok) {
            throw new Error('Fetch failed');
          }
  
          const data = await response.json();
  
          if (generateType == 'prompt') {
            setImageSrc(`data:image/png;base64,${data.artifacts[0].base64}`);
          } else if (generateType == 'sketch') {
            setImageSrc(`data:image/png;base64,${data.base64}`);
          }
          setIsModalVisible(false);
  
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      

    
    };

    fetchData();
  }, [prompt, router]);


  return (
    <div>
      <div className="px-3">
        <Header title="AI 제작하기" />

        <div
          className="flex relative w-full bg-white rounded-2xl mt-4"
          style={{
            paddingTop: `${(340 / 363) * 100}%`,
            // border: '2px solid var(--main-color)',
          }}
        >
          <div
            className="flex flex-row absolute w-full h-full rounded-xl top-0 backdrop-blur-md px-2.5 py-1 overflow-hidden"
            style={{ border: '2px solid var(--main-color)' }}
          >
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt="Generated Image"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            ) : (<Image
              src='/images/add/result/sampleImage.png'
              alt='heart icon'
              layout="fill"  // 이미지를 부모 요소의 크기에 맞게 확장
              objectFit="cover"  // 이미지를 부모 요소에 맞게 잘라서 보여줌
              className="rounded-md"  // 원하는 스타일 클래스 추가
            />
            )}

          </div>

          <div
            className="flex flex-row absolute w-full top-0 py-1 px-2"
          >
            <div
              className="py-1 px-3 rounded-md text-bold"
              style={{ backgroundColor: '#F5EFE1', border: '1px solid #BFA054', color: '#787486', fontSize: 7 }}
            >
              이전으로
            </div>

            <div
              className="py-1 px-3 rounded-md ms-1 text-bold"
              style={{ backgroundColor: '#F5EFE1', border: '1px solid #BFA054', color: '#787486', fontSize: 7 }}
            >
              업스케일
            </div>


          </div>



          <div
            className="flex flex-row justify-center  absolute w-full rounded-b-xl bottom-0 backdrop-blur-md px-2.5 py-2"
            style={{ backgroundColor: 'rgba(14, 214, 208, 0.4)' }}
          >
            <div
              className="flex flex-col justify-center items-center"
            >
              <Image
                src='/images/add/result/copyIcon.svg'
                alt='heart icon'
                width={12}
                height={15}
              />
              <div className="mt-0.5text-regular" style={{ fontSize: 11, color: '#fff' }}>copy</div>
            </div>

            <div
              className="flex flex-col justify-center items-center mt-0.5"
              style={{ marginLeft: 40, marginRight: 40 }}
            >
              <Image
                src='/images/add/result/downloadIcon.svg'
                alt='heart icon'
                width={14}
                height={15}
              />
              <div className="mt-0.5 text-regular" style={{ fontSize: 11, color: '#fff' }}>Download</div>
            </div>

            <div
              className="flex flex-col justify-center items-center"
            >
              <Image
                src='/images/add/result/heartIcon.svg'
                alt='heart icon'
                width={17}
                height={15}
              />
              <div className="mt-0.5 text-regular" style={{ fontSize: 11, color: '#fff' }}>save</div>
            </div>



          </div>

        </div>

        <div className="mt-3 grid grid-cols-4 gap-1">
          <img src='/images/add/result/sampleImage.png' alt='1' className='w-full h-full rounded-md' />
          <img src='/images/add/result/sampleImage.png' alt='1' className='w-full h-full rounded-md' />
          <img src='/images/add/result/sampleImage.png' alt='1' className='w-full h-full rounded-md' />
          <img src='/images/add/result/sampleImage.png' alt='1' className='w-full h-full rounded-md' />
        </div>

        <div className="text-bold mt-3" style={{ fontSize: 10 }}>
          제품 설명 입력하기
        </div>

        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
          style={{ fontSize: 10, height: 32, resize: 'none', borderColor: '#BFA054', backgroundColor: '#F5EFE1', overflow: 'hidden' }}
          placeholder="제목을 입력해주세요."

        />

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full mt-0.5 p-2 border rounded-md"
          style={{ fontSize: 10, height: 60, resize: 'none', borderColor: '#BFA054', backgroundColor: '#F5EFE1' }}
          placeholder={`상세 설명을 입력해 주세요.\nex) 샤넬 스타일로 아우터를 만들어 봤어요 #겨울 아우터 #샤넬스타일 #아우터`}
        />

        {/* {imageSrc && (
          <Image
            src={imageSrc}
            alt="Generated Image"
            layout="fill"
            objectFit="contain"
            className="rounded-full"
          />
        )} */}

        <div
          className="flex w-full items-center justify-center py-2.5 bg-main-background rounded-md cursor-pointer"
          // onClick={() => createClothesImage()}
          style={{ marginTop: 44 }}
        >
          <div className="text-white text-bold" style={{ fontSize: 15 }}>
            등록하기
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
          // onClick={navigateToResultPage}
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

  )
}

export default function result() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultPage />
    </Suspense>
  )
}