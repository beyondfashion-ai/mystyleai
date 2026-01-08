/*
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { NextRequest, NextResponse } from 'next/server';
import { storage } from '../../../../../firebase/storage';
import Replicate from 'replicate';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../firebase/firestore';
// update
const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_KEY
});

export const maxDuration = 30;

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("Post")

  const formData = await req.formData();

  console.log(formData)

  const image = formData.get('userImage') as Blob;
  const generationId = formData.get('generationId') as string;
  const generatedImageURL = formData.get('generatedImageUrl') as string;

  console.log(generationId)
  console.log(generatedImageURL)

  const userFaceStorageRef = ref(storage, `alpha/${generationId}/user_face.png`);

  await uploadBytes(userFaceStorageRef, image);

  const userFaceURL = await getDownloadURL(userFaceStorageRef);
  
  console.log(userFaceURL)
  console.log(generatedImageURL)

  // 유저 이미지와 생성된 이미지 URL로 Face Swap API 호출

  

  const input = {
    local_source: userFaceURL,
    local_target: generatedImageURL,
    // local_source: "https://replicate.delivery/pbxt/KgRH3TXuSLGMGuRicUX9pKchG17Nk6qbJMzv6s0NvTj2nD7P/src.jpg",
    // local_target: "https://replicate.delivery/pbxt/KgRH4AoijNe7h1lU84m4YwghJNdZ520I7qhGe0ip1ufa9CSA/tgt.jpg"
  }

  console.log("prediction start")

  let prediction = await replicate.predictions.create({
    version: 'cff87316e31787df12002c9e20a78a017a36cb31fde9862d8dedd15ab29b7288',
    input: input
  })

  console.log("prediction wait")

  prediction = await replicate.wait(prediction)

  console.log("prediction end")
  console.log(prediction)

  const imageUrl = prediction.output.image
  const response = await fetch(imageUrl)
  const blob = await response.blob()

  const swappedFaceStorageRef = ref(storage, `alpha/${generationId}/swapped_image.png`);
  await uploadBytes(swappedFaceStorageRef, blob);

  const swappedFaceURL = await getDownloadURL(swappedFaceStorageRef);

  // 유저 이미지 삭제
  await deleteObject(userFaceStorageRef);

  // 스왑 유저 이미지 업데이트
  await updateDoc(doc(db, 'generation_alpha', generationId), {
    status: 'user_face_swapped',
    swapped_image_url: swappedFaceURL
  });

  return NextResponse.json({ status: 'success', swappedFaceURL });
  
  
}

 */
// pages/api/alpha/swapUserFace/route.tsx

import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import Replicate from 'replicate';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../firebase/firestore'; // 경로 확인 필요

// Cloudinary 설정 확인
const cloudConfig = {
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
};

console.log("Cloudinary Config (FaceSwap):", {
    cloud_name: cloudConfig.cloud_name ? "OK" : "MISSING",
    api_key: cloudConfig.api_key ? "OK" : "MISSING",
    api_secret: cloudConfig.api_key ? "OK" : "MISSING", // secret은 로그에 찍지 않음
});

cloudinary.config(cloudConfig);

// Replicate 설정 확인
console.log("Replicate Key Check:", process.env.NEXT_PUBLIC_REPLICATE_API_KEY ? "OK" : "MISSING");

const replicate = new Replicate({
    auth: process.env.NEXT_PUBLIC_REPLICATE_API_KEY
});

export const maxDuration = 60; // 시간 초과 방지 (30 -> 60초)

export async function POST(req: NextRequest) {
    console.log("=== [Face Swap] 1. 요청 시작 ===");

    try {
        const formData = await req.formData();
        const image = formData.get('userImage') as Blob;
        const generationId = formData.get('generationId') as string;
        const generatedImageURL = formData.get('generatedImageUrl') as string;

        console.log(`=== [Face Swap] 2. 데이터 수신: ID=${generationId}, URL=${generatedImageURL ? "Exist" : "Missing"}`);

        if (!image) throw new Error("유저 이미지가 없습니다.");

        // 1. 유저 이미지 Cloudinary 업로드
        console.log("=== [Face Swap] 3. 유저 이미지 Cloudinary 업로드 시작 ===");
        const userImageBuffer = Buffer.from(await image.arrayBuffer());

        const userUploadResult: any = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: `alpha/${generationId}`,
                    public_id: 'user_face_temp', // 임시 파일명
                    format: 'png',
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(userImageBuffer);
        });

        const userFaceURL = userUploadResult.secure_url;
        console.log("=== [Face Swap] 4. 유저 이미지 업로드 완료:", userFaceURL);

        // 2. Replicate API 호출
        console.log("=== [Face Swap] 5. Replicate 합성 요청 시작 ===");
        const input = {
            local_source: userFaceURL,
            local_target: generatedImageURL,
        };

        let prediction = await replicate.predictions.create({
            version: 'cff87316e31787df12002c9e20a78a017a36cb31fde9862d8dedd15ab29b7288',
            input: input
        });

        console.log("=== [Face Swap] 6. Replicate 처리 대기 중...");
        prediction = await replicate.wait(prediction);
        console.log("=== [Face Swap] 7. Replicate 완료. 결과:", prediction.output);

        if (!prediction.output) {
            throw new Error("Replicate 결과가 비어있습니다 (실패 가능성).");
        }

        // 3. 결과 이미지 Cloudinary 재업로드
        const outputImageUrl = prediction.output; // Replicate 결과 URL (배열일 수도 있음 체크 필요)

        // output이 배열인지 문자열인지 확인 (모델마다 다름, 보통 FaceSwap은 url string or array)
        const finalOutputUrl = Array.isArray(outputImageUrl) ? outputImageUrl[0] : outputImageUrl;

        console.log("=== [Face Swap] 8. 결과 이미지 다운로드 및 재업로드 시작 ===");
        const response = await fetch(finalOutputUrl);
        const blob = await response.blob();
        const swappedImageBuffer = Buffer.from(await blob.arrayBuffer());

        const swapUploadResult: any = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: `alpha/${generationId}`,
                    public_id: 'swapped_final',
                    format: 'png',
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(swappedImageBuffer);
        });

        const swappedFaceURL = swapUploadResult.secure_url;
        console.log("=== [Face Swap] 9. 최종 이미지 Cloudinary 업로드 완료:", swappedFaceURL);

        // 4. 임시 유저 이미지 삭제
        await cloudinary.uploader.destroy(userUploadResult.public_id);
        console.log("=== [Face Swap] 10. 임시 이미지 삭제 완료 ===");

        // 5. Firestore 업데이트
        await updateDoc(doc(db, 'generation_alpha', generationId), {
            status: 'user_face_swapped',
            swapped_image_url: swappedFaceURL
        });
        console.log("=== [Face Swap] 11. DB 저장 완료. 성공! ===");

        return NextResponse.json({ status: 'success', swappedFaceURL });

    } catch (error) {
        console.error("!!! [Face Swap 에러 발생] !!!", error);
        return NextResponse.json({ status: 'fail', error: String(error) }, { status: 500 });
    }
}