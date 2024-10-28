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
