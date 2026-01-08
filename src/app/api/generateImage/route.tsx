import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { translateText } from '@/app/utils/utils';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../../../firebase/firestore'
import { requestFalAIFluxLora } from '@/app/utils/api';
import sharp from 'sharp';

export const maxDuration = 30;

// Cloudinary 설정
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const T2IBasePositivePrompt = "(((no nipple)))(((no sunglasses)))(best quality:1.2), (masterpiece:1.2), (8K:1.2), (intricate details:1.2), (photorealistic:1.2), (raw, highres:1.2),(realistic:1.3), (photo:1.3),a photo of a fashion model, full body, whole body, put on shoes,  delicate face, delicate figure, young white people";

const styleToLoraPath: { [key: number]: string | undefined } = {
    1: process.env.NEXT_PUBLIC_CHANEL_2024_FW_WOMEN,
    2: process.env.NEXT_PUBLIC_CELINE_2024_FW_WOMEN,
    3: process.env.NEXT_PUBLIC_MIUMIU_2024_FW_WOMEN,
    4: process.env.NEXT_PUBLIC_LOUISVUTTION_2024_FW_MEN,
    5: process.env.NEXT_PUBLIC_BALENCIAGA_2024_FW_MEN,
    6: process.env.NEXT_PUBLIC_FENDI_2024_FW_MEN,
};

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export async function POST(req: NextRequest) {

    try {
        const body = await req.json();
        const { prompt, style, userGender } = body;

        // 번역 시도
        let translatePrompt = await translateText(prompt);
        if (!translatePrompt) translatePrompt = prompt;

        const date = new Date();
        const koreanTime = date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' });

        const documentId = generateId();

        const cleanStyle = Number(style);
        const safeDocData = {
            docId: documentId,
            prompt: String(prompt || ""),
            translate_prompt: String(translatePrompt || ""),
            style: isNaN(cleanStyle) ? 0 : cleanStyle,
            date: String(koreanTime || ""),
            status: "processing",
            gender: String(userGender || "unknown")
        };


        await setDoc(doc(db, 'generation_alpha', documentId), safeDocData);

        const inputPrompt = safeDocData.translate_prompt + " " + T2IBasePositivePrompt;
        const loraPath: string = styleToLoraPath[safeDocData.style] ?? '';

        const response = await requestFalAIFluxLora(inputPrompt, loraPath);

        if (!response?.data?.images?.[0]?.url) {
            throw new Error("AI 응답에 이미지가 없습니다.");
        }

        const imageUrl = response.data.images[0].url;

        const imageResponse = await fetch(imageUrl);
        const imageBlob = await imageResponse.blob();

        const imageBlobWithWatermark = await drawWaterMark(imageBlob);

        let finalBlob = imageBlobWithWatermark || imageBlob;
        let fileName = imageBlobWithWatermark ? `generation_watermark` : `generation`;

        const arrayBuffer = await finalBlob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult: any = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: `alpha/${documentId}`,
                    public_id: fileName,
                    format: 'png',
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary 업로드 에러:", error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            uploadStream.end(buffer);
        });

        await setDoc(doc(db, 'generation_alpha', documentId), {
            status: 'generation_completed',
            generated_image_url: uploadResult.secure_url
        }, { merge: true });


        return NextResponse.json({ status: 'success', generationId: documentId });

    } catch (error) {
        console.error("!!! [에러 발생] !!!", error);
        return NextResponse.json({ status: 'fail', error: String(error) });
    }
}

async function drawWaterMark(originalBlob: Blob): Promise<Blob | null> {
    try {
        const arrayBuffer = await originalBlob.arrayBuffer();
        const originalBuffer = Buffer.from(arrayBuffer);
        const watermarkPath = process.cwd() + '/public/images/playground/watermark.png';

        const metadata = await sharp(originalBuffer).metadata();
        const watermarkWidth = 240;
        const watermarkHeight = 56;
        const x = 40;
        const y = (metadata.height || 0) / 2 - watermarkHeight / 2;

        const resizedWatermark = await sharp(watermarkPath)
            .resize(watermarkWidth, watermarkHeight)
            .toBuffer();

        const resultBuffer = await sharp(originalBuffer)
            .composite([{ input: resizedWatermark, top: y, left: x }])
            .png()
            .toBuffer();

        return new Blob([resultBuffer], { type: 'image/png' });

    } catch (error) {
        return null;
    }
}