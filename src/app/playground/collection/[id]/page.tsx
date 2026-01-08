"use client"

import { doc, getDoc } from 'firebase/firestore'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { db } from '../../../../../firebase/firestore'
import GenerationProcessModal from '@/components/common/generationProcessModal'
import downloadImage, { shareX } from '@/app/utils/utils'

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

    useEffect(() => {
        if (!generationId) {
            console.error("Generation ID가 없습니다.");
            router.push('/playground');
            return;
        }

        const fetchGenerationData = async () => {
            try {
                console.log("데이터 가져오기 시작: ID =", generationId);
                const docRef = doc(db, 'generation_alpha', generationId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data()
                    console.log("Firestore 데이터 수신 성공:", data);

                    const imageUrl = data.generated_image_url
                    if (imageUrl) {
                        console.log("이미지 URL 확인됨:", imageUrl);
                        setGeneratedImageUrl(imageUrl);
                    } else {
                        console.warn("데이터는 있지만 'generated_image_url' 필드가 비어있습니다.");
                    }
                } else {
                    console.log('해당 문서가 존재하지 않습니다 (No such document)!');
                }
            } catch (err) {
                console.error('문서 가져오기 실패 (Error fetching document):', err);
            }
        };

        fetchGenerationData();
    }, [generationId, router])

    const handleUploadUserFace = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            setIsModalVisible(true)

            // 상태 메시지 표시 애니메이션
            processStatus.forEach((status, index) => {
                setTimeout(() => {
                    setModalContent(status);
                }, index * 2000);
            });

            const formData = new FormData()
            formData.append('userImage', file)
            formData.append('generationId', generationId as string)
            formData.append('generatedImageUrl', generatedImageUrl)

            try {
                console.log("얼굴 합성 요청 시작...");
                const response = await fetch('/api/alpha/swapUserFace', {
                    method: 'POST',
                    body: formData
                })

                if (!response.ok) {
                    throw new Error(`Server Error: ${response.status}`);
                }

                const result = await response.json()
                console.log("서버 응답:", result);

                if (result.status === 'success') {
                    router.push(`/playground/model/${generationId}`)
                } else {
                    alert(`합성 실패: ${result.error}`);
                }

            } catch (error) {
                console.error("에러 발생:", error);
                alert("작업 중 오류가 발생했습니다. (콘솔 로그를 확인하세요)");
            } finally {
                // 성공하든 실패하든 모달창은 무조건 닫기
                setIsModalVisible(false)
                // 파일 입력 초기화 (같은 파일 다시 선택 가능하도록)
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        }
    }
    return (
        <div>
            <div className="flex relative flex-col pt-3 pb-8 px-3" >
                <Image
                    className='cursor-pointer'
                    src="/images/mainLogoAlpha.png"
                    alt="mainLogo"
                    width={100}
                    height={25}
                    onClick={() => router.push('/playground')}
                />
                <div className="flex flex-col w-full items-center my-10">

                    {generatedImageUrl ? (
                        <div className='relative'>
                            <Image
                                src={generatedImageUrl}
                                alt="playgroundSampleImage"
                                width={330}
                                height={330}
                                className="shadow-2xl"
                                priority
                                onError={(e) => console.error("이미지 로드 실패:", e)} // [디버깅] 이미지 로드 에러 확인
                            />
                            <div
                                className="absolute top-0 right-0 text-black p-2 rounded-lg mt-3 me-3 cursor-pointer"
                                style={{ backgroundColor: 'rgba(245, 239, 225, 0.7)' }}
                                onClick={() => downloadImage(generatedImageUrl, "collection-image.jpg")}
                            >
                                <Image
                                    src="/images/playground/download.png"
                                    alt="downloadIcon"
                                    width={20}
                                    height={20}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-500">이미지를 불러오는 중이거나 없습니다...</div>
                    )}

                    <div className="mt-8 text-bold">
                        디자이너님의 디자인을 친구들과 공유하세요.
                    </div>

                    <div className='mt-10 grid grid-cols-3 gap-7'>
                        {SNSIcons.map((icon, index) => (
                            <div
                                key={index}
                                className="flex flex-col justify-center items-center"
                                onClick={() => icon.shareFunction('디자이너님의 디자인을 친구들과 공유하세요.', window.location.href)}
                            >
                                <Image src={icon.src} alt={icon.name} width={40} height={40} />
                                <div className="mt-2 text-medium" style={{ fontSize: 10 }}>
                                    {icon.name}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-bold" style={{ fontSize: 28 }}>
                        내가 직접 모델이 될 수 있어요!
                    </div>
                    <div className="mt-8 text-medium">
                        ※ 업로드 이미지는 기능 동작에만 사용되며
                    </div>
                    <div className="mt-2 text-medium">
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
                <div className='text-semiBold text-md'>
                    개인정보 수집 및 이용 안내
                </div>
                <div className='mt-2 text-sm'>
                    본 서비스는 AI 기능을 통해 유저의 얼굴 사진을 처리합니다. 업로드된 사진은 얼굴 변환 등의 서비스 제공 목적으로만 일시적으로 사용되며, 처리 완료 후 즉시 삭제됩니다. 사용자의 사진 및 개인 정보는 제3자와 공유되지 않으며, 안전하게 보호됩니다. 서비스 이용 시 이러한 처리 방침에 동의하는 것으로 간주됩니다.
                </div>
            </div>

            {isModalVisible && (
                <GenerationProcessModal number={modalContent.number} title={modalContent.title} subTitle={modalContent.subTitle} />
            )}
        </div>
    )
}