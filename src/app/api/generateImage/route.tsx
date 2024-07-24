// pages/api/generateImage/route.tsx

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import axios from 'axios';
import path from 'path';
import FormData from 'form-data';

export const maxDuration = 30

const engineId = "stable-diffusion-xl-1024-v1-0"

export async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();

  const generateType = formData.get('generateType');
  if (generateType === 'prompt') {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/v1/generation/${engineId}/text-to-image`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: 'A lighthouse on a cliff',
            },
          ],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          steps: 10,
          samples: 1,
        }),
      }
    )

    const responseJson = await response.json()
    return NextResponse.json(responseJson);

  } else if (generateType === 'sketch') {

    const imagePath = path.resolve('./public/images/add/sketchSample.png');

    // 파일 존재 여부 확인
    if (!fs.existsSync(imagePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    } else {
      console.log('File exists');
    }

    const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath), 'sketchSample.png');
    formData.append('prompt', 'a medieval castle on a hill');
    formData.append('control_strength', '0.6');
    formData.append('output_format', 'jpeg');

    try {
      const response = await axios.post('https://api.stability.ai/v2beta/stable-image/control/sketch', formData, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          Accept: 'image/*',
          ...formData.getHeaders(),
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
