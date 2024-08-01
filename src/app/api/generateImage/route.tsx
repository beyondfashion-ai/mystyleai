// pages/api/generateImage/route.tsx

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import axios from 'axios';
import path from 'path';
import FormData from 'form-data';

export const maxDuration = 30

const engineId = "stable-diffusion-xl-1024-v1-0"
const T2IBasePositivePrompt = "(best quality:1.2), (masterpiece:1.2), (8K:1.2), (intricate details:1.2), (photorealistic:1.2), (raw, highres:1.2),(realistic:1.3), (photo:1.3),a photo of a fashion model, full body, whole body, put on shoes,  delicate face, delicate figure"
const T2IBaseNegativePrompt = "extreme facial close up, facial close up,medium close up,bust shot,  waist shot,medium shot,upper body,cowboy shot,thigh above body,(two girls, three girls) lowers, paintings, sketches, lowres, paintings, sketches, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, ((monochrome)), ((grayscale)), skin spots, acnes, skin blemishes, age spot, glans, skin blemishes, bad feet, ((wrong feet)), (wrong shoes), bad hands, distorted, blurry, missing fingers,   multiple feet, bad knees, extra fingers, bad body,bad proportion,bad proportion body, glans, nsfw, saggy breast, acnes, age spot, dark spots, fat, fused, giantess, glans, mole, obesity, skin blemishes, skin spots, animal ears, elf-ears, earrings, childish, morbid, blurry, paintings,   sketch, text, logo, (monochrome:1.1), easy negative, (multiple picture:1.3), worst face, error, (normal quality:1.5),   (worst quality:1.5), (low quality:1.5), (multiple photo:1.5), horror, bad anatomy, multiple arms, deformed fingers, extra legs, third feet, multiple feet, bad knees, extra fingersmutated hands, ugly, (fat ass), feet, (multiple limbs:1.2), toes"
const sketch2IBasePositivePrompt = "(best quality:1.2), (masterpiece:1.2), (8K:1.2), (intricate details:1.2), (photorealistic:1.2), (raw, highres:1.2),(realistic:1.3), (photo:1.3),a photo of a fashion"
const sketch2IBaseNegativePrompt = "lowers, paintings, sketches, lowres, paintings, sketches, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, ((monochrome)), ((grayscale)), ((wrong feet)), (wrong shoes), bad hands, distorted, blurry, missing fingers,   multiple feet, bad knees, extra fingers, bad body,bad proportion,bad proportion body, glans, nsfw, saggy breast, acnes, age spot, dark spots, fat, fused, giantess, glans, mole, obesity, skin blemishes, skin spots, animal ears, elf-ears, earrings, childish, morbid, blurry, paintings,   sketch, text, logo, (monochrome:1.1), easy negative, (multiple picture:1.3), worst face, error, (normal quality:1.5),   (worst quality:1.5), (low quality:1.5), (multiple photo:1.5), horror, bad anatomy, multiple arms, deformed fingers, extra legs, third feet, multiple feet, bad knees, extra fingersmutated hands, ugly, (fat ass), feet, (multiple limbs:1.2), toes"
const controlStrength = '0.8'
const seed = 0
const aspectRatio = "1:1"
const outputFormat = "jpeg"

export async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();

  const generateType = formData.get('generateType');
  const prompt = formData.get('prompt');

  console.log(generateType)



  if (generateType === 'prompt') {
    const requestFormData = new FormData();
    requestFormData.append('prompt', prompt + " " + T2IBasePositivePrompt);
    requestFormData.append('negative_prompt', T2IBaseNegativePrompt);
    requestFormData.append('aspect_ratio', aspectRatio);
    requestFormData.append('output_format', outputFormat);
    requestFormData.append('seed', seed)


    try {
      const response = await axios.post(
        `https://api.stability.ai/v2beta/stable-image/generate/ultra`,
        requestFormData, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          Accept: 'image/*',
          ...requestFormData.getHeaders(),
        },
        responseType: 'arraybuffer',
      });

      if (response.status === 200) {
        const buffer = Buffer.from(response.data);
        const base64Image = buffer.toString('base64');
        return NextResponse.json({ base64: base64Image });
      } else {
        console.log("fail")
        const errorText = response.data.toString();
        throw new Error(`${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.log("error")
      // return NextResponse.json({ error: error.message }, { status: 500 });
    }

    
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_HOST}/v1/generation/${engineId}/text-to-image`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Accept: 'application/json',
    //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    //     },
    //     body: JSON.stringify({
    //       text_prompts: [
    //         {
    //           text: prompt + ' ' + T2IBasePositivePrompt,
    //           weight: 1
    //         },
    //         {
    //           text: T2IBaseNegativePrompt,
    //           weight: -1
    //         }
    //       ],
    //       cfg_scale: 7,
    //       height: 1024,
    //       width: 1024,
    //       steps: 10,
    //       samples: 1,
    //     }),
    //   }
    // )



    // const responseJson = await response.json()
    // return NextResponse.json(responseJson);
    const responseJson = {
      artifacts: [
        {
          base64: "base64String"
        }
      ]
    }
    return NextResponse.json(responseJson);


  } else if (generateType === 'sketch') {

    const image = formData.get('image') as Blob;
    const buffer = Buffer.from(await image.arrayBuffer());
    const fileName = 'sketchSample.png';

    const requestFormData = new FormData();
    requestFormData.append('image', buffer, fileName);
    requestFormData.append('prompt', prompt + " " + sketch2IBasePositivePrompt);
    requestFormData.append('negative_prompt', sketch2IBaseNegativePrompt);
    requestFormData.append('control_strength', controlStrength);
    requestFormData.append('output_format', outputFormat);
    requestFormData.append('seed', seed)


    try {
      const response = await axios.post(
        'https://api.stability.ai/v2beta/stable-image/control/sketch',
        requestFormData, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          Accept: 'image/*',
          ...requestFormData.getHeaders(),
        },
        responseType: 'arraybuffer',
      });

      if (response.status === 200) {
        const buffer = Buffer.from(response.data);
        const base64Image = buffer.toString('base64');
        return NextResponse.json({ base64: base64Image });
      } else {
        console.log("fail")
        const errorText = response.data.toString();
        throw new Error(`${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.log("error")
      // return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  const responseJson = {
    artifacts: [
      {
        base64: "base64String"
      }
    ]
  }
  return NextResponse.json(responseJson);
}
