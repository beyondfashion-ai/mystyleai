import { fal } from "@fal-ai/client";

fal.config({
  credentials: process.env.NEXT_PUBLIC_FAL_AI_API_KEY
})


export async function requestFalAIFluxLora(prompt: string) {
  console.log(prompt)
  console.log("requestFalAIFluxLora")
  const response = await fal.subscribe("fal-ai/flux-lora", {
    input: {
      "prompt": "korean in high fahion show black jacket white pants",  
        "image_size": "landscape_4_3", 
        "num_inference_steps": 28,
        "guidance_scale": 3.5,  
        "num_images": 1,
        "loras": [
            {
                "path": "https://storage.googleapis.com/fal-flux-lora/8a5eedfedf3243c1968b3fb9685100af_pytorch_lora_weights.safetensors",
                "scale": 1.0
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