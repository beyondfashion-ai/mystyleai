import axios from "axios";


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