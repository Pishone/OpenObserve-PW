import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config({ path: `.env` });

export default async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(`${process.env.BASEURL}/web/login`);
  await page.fill('[data-test="login-user-id"]', process.env.USERNAME);
  await page.fill('[data-test="login-password"]', process.env.PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForLoadState();
  await page.waitForTimeout(1000);

  await page.context().storageState({
    path: './auth.json',
  });

  await browser.close();
}
