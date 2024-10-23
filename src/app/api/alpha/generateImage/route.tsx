// pages/api/generateImage/route.tsx

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import axios from 'axios';
import path from 'path';
import FormData from 'form-data';
import { Translate } from '@google-cloud/translate/build/src/v2';

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

const GOOGLE_CLOUD_API_KEY = 'AIzaSyB3i94tWwkyOPyOXyoXYNfA_a3iehzn0AA'
const TRANSLATE_API_URL = "https://translation.googleapis.com/language/translate/v2";

