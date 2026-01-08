import { translate } from 'google-translate-api-x';

export async function translateText(text: string, targetLang: string = 'en'): Promise<string> {
    try {
        const res = await translate(text, { to: targetLang, forceBatch: false });
        return res.text;
    } catch (error) {
        return text;
    }
}

export function shareX(text: string, url: string) {
    window.open("https://X.com/intent/tweet?text=" + text + "&url=" + url);
}

export function shareInstagram(text: string, url: string) {
    window.open("https://www.instagram.com/sharer.php?u=" + url);
}

export default async function downloadImage(url: string, name: string): Promise<void> {
    try {
        const resp = await fetch(url);
        const blob = await resp.blob();
        const imageUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = imageUrl;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(imageUrl);
    } catch (error) {
        console.log(error);
        alert('다운로드 중 오류가 발생했습니다. 죄송합니다.');
    }
}
/*
import axios from "axios";
import sharp from "sharp";

const translate_api_url = process.env.NEXT_PUBLIC_TRANSLATE_API_URL ? process.env.NEXT_PUBLIC_TRANSLATE_API_URL : "https://translation.googleapis.com/language/translate/v2";

export async function translateText(text: string, targetLang: string = 'en'): Promise<string | void> {
  try {
    const params = {
      q: text,
      target: targetLang,
      key: process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API_KEY
    }

    const response = await axios.get(translate_api_url, { params });

    if (response.status == 200) {
      const translation = response.data.data.translations[0].translatedText;
      return translation
    }

  } catch (error) {
    console.log("error")
  }
}


export function shareX(text: string, url: string) {
  window.open("https://X.com/intent/tweet?text=" + text + "&url=" + url);
}

export function shareInstagram(text: string, url: string) {
  window.open("https://www.instagram.com/sharer.php?u=" + url);
}

// export async function drawWaterMark(originalBlob: Blob): Promise<Blob | null> {
//   try {
//     // Blob을 Buffer로 변환
//     const arrayBuffer = await originalBlob.arrayBuffer();
//     const originalBuffer = Buffer.from(arrayBuffer);

//     // 워터마크 이미지 경로 (public 폴더 기준 절대 경로)
//     const watermarkPath = process.cwd() + '/public/images/playground/watermark.png';


//     // 원본 이미지 메타데이터 가져오기
//     const metadata = await sharp(originalBuffer).metadata();

//     // 워터마크 위치 계산
//     const watermarkWidth = 60;
//     const watermarkHeight = 14;
//     const x = 10;
//     const y = (metadata.height || 0) - watermarkHeight - 10;

//     const resizedWatermark = await sharp(watermarkPath)
//       .resize(watermarkWidth, watermarkHeight)
//       .toBuffer();

//     // 이미지 합성
//     const resultBuffer = await sharp(originalBuffer)
//       .composite([
//         {
//           input: resizedWatermark,
//           top: y,
//           left: x,
//         },
//       ])
//       .png()
//       .toBuffer();

//     // Buffer를 Blob으로 변환
//     const finalBlob = new Blob([resultBuffer], { type: 'image/png' });
//     return finalBlob;

//   } catch (error) {
//     console.error('워터마크 추가 중 에러 발생:', error);
//     return null;
//   }
// }

export default async function downloadImage(url: string, name: string): Promise<void> {
  try {
    const resp = await fetch(url);
    const blob = await resp.blob();
    const imageUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = imageUrl;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(imageUrl);
  } catch (error) {
    console.log(error)
    alert('다운로드 중 오류가 발생했습니다. 죄송합니다.');
  }
}

*/