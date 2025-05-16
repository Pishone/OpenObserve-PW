import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard-page.js';

test.use({ viewport: { width: 1280, height: 720 } })

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
    await dashboard.setDateTo2Days();

    await expect(page.getByText('New Dashboard', { exact: true })).toBeVisible();
});

test('Configure Dashboard', async ({ page }) => {
    const dashboard = new DashboardPage(page);

    await test.step('Add New Panel', async () => {
        await page.goto('/');
        await dashboard.openAndStartPanel();
        await dashboard.setDateTo2Days();
    });

    await test.step('Configure Panel', async () => {
        await dashboard.configurePanel();
    });

    await test.step('Save Panel', async () => {
        await dashboard.savePanel('Test Panel');
    });

    await test.step('Validate chart is visible', async () => {
        await dashboard.setDateTo2Days();
        await expect(dashboard.noData).not.toBeVisible();
        await expect(dashboard.canvas).toBeVisible();
    });
});
