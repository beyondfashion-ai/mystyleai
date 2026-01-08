import { fal } from "@fal-ai/client";

fal.config({
  credentials: process.env.NEXT_PUBLIC_FAL_AI_API_KEY
})


export async function requestFalAIFluxLora(prompt: string, loraPath: string) {
  const response = await fal.subscribe("fal-ai/flux-lora", {
    input: {
      "prompt": prompt,
      "image_size": {
        "width": 1024,
        "height": 1024
      },
        "num_inference_steps": 28,
      "guidance_scale": 3.5,
      "num_images": 1,
      "loras": [
        {
          "path": loraPath,
          "scale": 1.4
        }
      ],
      "enable_safety_checker": true,
      "output_format": "jpeg"
    },
    // logs: true,
    // onQueueUpdate: (update) => {
    //   if (update.status === "IN_PROGRESS") {
    //     update.logs.map((log) => log.message).forEach(console.log);
    //   }
    // },
  });
  console.log(response)
  return response;
}