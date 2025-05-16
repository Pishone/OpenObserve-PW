import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config({ path: `.env` });

export default async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(`${process.env.BASE_URL}/web/login`);
  await page.fill('[data-test="login-user-id"]', process.env.USER_NAME);
  await page.fill('[data-test="login-password"]', process.env.PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForLoadState();

  await page.context().storageState({
    path: './auth.json',
  });

  await browser.close();
}
