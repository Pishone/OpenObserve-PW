import { request } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

let api;

export async function getApiContext() {
  if (!api) {
    const encoded = Buffer.from(`${process.env.USER_NAME}:${process.env.PASSWORD}`).toString('base64');
    api = await request.newContext({
      baseURL: process.env.BASE_URL,
      extraHTTPHeaders: {
        Authorization: `Basic ${encoded}`,
        'Content-Type': 'application/json',
      },
    });
  }
  return api;
}
