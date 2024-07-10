// pages/api/generateImage/route.tsx

import { NextRequest, NextResponse } from 'next/server';

const engineId = "stable-diffusion-xl-1024-v1-0"

export async function POST(req: NextRequest, res: NextResponse) {


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
  console.log(responseJson)


  return NextResponse.json(responseJson);
}
