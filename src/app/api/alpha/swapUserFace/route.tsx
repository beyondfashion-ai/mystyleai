import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { NextRequest, NextResponse } from 'next/server';
import { storage } from '../../../../../firebase/storage';
import Replicate from 'replicate';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../firebase/firestore';

const replicate = new Replicate({
  auth: "r8_GmNEkfvHbolbjuEPF01WgFJA5TblRG12oBjMA",
});

export async function POST(req: NextRequest, res: NextResponse) {

  const formData = await req.formData();

  const image = formData.get('userImage') as Blob;
  const generationId = formData.get('generationId') as string;
  const generatedImageURL = formData.get('generatedImageURL') as string;

  const userFaceStorageRef = ref(storage, `alpha/${generationId}/user_face.png`);

  await uploadBytes(userFaceStorageRef, image);

  const userFaceURL = await getDownloadURL(userFaceStorageRef);
  console.log(userFaceURL)

  // 유저 이미지와 생성된 이미지 URL로 Face Swap API 호출

  const input = {
    // local_source: userFaceURL,
    // local_target: generatedImageURL,
    local_source: "https://replicate.delivery/pbxt/KgRH3TXuSLGMGuRicUX9pKchG17Nk6qbJMzv6s0NvTj2nD7P/src.jpg",
    local_target: "https://replicate.delivery/pbxt/KgRH4AoijNe7h1lU84m4YwghJNdZ520I7qhGe0ip1ufa9CSA/tgt.jpg"
  }

  console.log("replicate run")
  const output = await replicate.run("xiankgx/face-swap:cff87316e31787df12002c9e20a78a017a36cb31fde9862d8dedd15ab29b7288", { input });

  const reader = output.image.getReader()
  const chunks = []
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    chunks.push(value)
  }

  const blob = new Blob(chunks, { type: "image/png" })
  const url = URL.createObjectURL(blob)

  console.log(url)

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





  return NextResponse.json({ status: 'success', image: swappedFaceURL });
  
  
}