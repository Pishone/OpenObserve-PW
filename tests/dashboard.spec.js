import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard-page.js';

test.use({ viewport: { width: 1280, height: 720 } })

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

test('Delete All Dashboards', (async ({ page }) => {
    const dashboard = new DashboardPage(page);

    await page.goto('/');
    await dashboard.dashboardMenu.click();

    const deleteBtn = page.locator('[data-test="dashboard-delete"]');
    await page.waitForSelector('[data-test="dashboard-delete"]');
    const count = await deleteBtn.count();

    for (let i = 0; i < count; i++) {
      await deleteBtn.nth(0).click();
      await page.locator('[data-test="confirm-button"]').click();
      await expect(page.getByText('Dashboard deleted successfully.')).toBeVisible();
      await page.waitForTimeout(500);
    }
  }));