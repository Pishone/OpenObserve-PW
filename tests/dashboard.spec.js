import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard-page.js';

test.use(
    { viewport: { width: 1280, height: 720 } }
)

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.fill('[data-test="login-user-id"]', "root@example.com");
    await page.fill('[data-test="login-password"]', "Complexpass#123");
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForLoadState();;
});

test('Create Dashboard', async ({ page }) => {
    const dashboard = new DashboardPage(page);

    await page.goto('/');
    await dashboard.createDashboard('New Dashboard', 'Creating a new dashboard');
    await dashboard.setDateRangeTo2Days();

    await expect(page.getByText('New Dashboard', { exact: true })).toBeVisible();
});
