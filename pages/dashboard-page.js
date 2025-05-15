export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.dashboardMenu = page.locator('[link-name="dashboards"][name="dashboards"]');
    this.addBtn = page.locator('[data-test="dashboard-add"]');
    this.nameInput = page.locator('[data-test="add-dashboard-name"]');
    this.descInput = page.locator('[data-test="add-dashboard-description"]');
    this.submitBtn = page.locator('[data-test="dashboard-add-submit"]');
    this.dateTimeBtn = page.locator('[data-test="date-time-btn"]');
    this.relative2Days = page.locator('[data-test="date-time-relative-2-d-btn"]');
    this.applyBtn = page.locator('[data-test="date-time-apply-btn"]');
  }

  async createDashboard(name, desc) {
    await this.dashboardMenu.click();
    await this.addBtn.click();
    await this.nameInput.fill(name);
    await this.descInput.fill(desc);
    await this.submitBtn.click();
  }

  async setDateRangeTo2Days() {
    await this.dateTimeBtn.click();
    await this.relative2Days.click();
    await this.applyBtn.click();
  }
}
