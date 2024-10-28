import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { NextRequest, NextResponse } from 'next/server';
import { storage } from '../../../../../firebase/storage';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: "r8_GmNEkfvHbolbjuEPF01WgFJA5TblRG12oBjMA",
});

export async function POST(req: NextRequest, res: NextResponse) {

  const formData = await req.formData();

  const image = formData.get('userImage') as Blob;
  const generationId = formData.get('generationId') as string;
  const generatedImageURL = formData.get('generatedImageURL') as string;

  const storageRef = ref(storage, `alpha/${generationId}_user_face.png`);

  await uploadBytes(storageRef, image);

  const userFaceURL = await getDownloadURL(storageRef);
  console.log(userFaceURL)

  // 유저 이미지와 생성된 이미지 URL로 Face Swap API 호출

  const input = {
    local_source: userFaceURL,
    local_target: generatedImageURL,
  }

  const output = await replicate.run("xiankgx/face-swap:cff87316e31787df12002c9e20a78a017a36cb31fde9862d8dedd15ab29b7288", { input });
  console.log(output)

  console.log(output)

  // 유저 이미지 삭제

  return NextResponse.json({ status: 'success', userFaceURL });
  
  
}