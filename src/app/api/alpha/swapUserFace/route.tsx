import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { NextRequest, NextResponse } from 'next/server';
import { storage } from '../../../../../firebase/storage';


export async function POST(req: NextRequest, res: NextResponse) {

  const formData = await req.formData();

  const image = formData.get('userImage') as Blob;
  const generationId = formData.get('generationId') as string;

  const storageRef = ref(storage, `alpha/${generationId}_user_face.png`);

  await uploadBytes(storageRef, image);

  const userFaceURL = await getDownloadURL(storageRef);
  console.log(userFaceURL)

  return NextResponse.json({ status: 'success', userFaceURL });
  
  
}