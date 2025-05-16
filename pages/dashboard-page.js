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

    this.dashboardNameCell = page.getByRole('cell', { name: 'New DashBoard' });
    this.addPanelBtn = page.locator('[data-test="dashboard-if-no-panel-add-panel-btn"]');
    this.dateTimeBtn = page.locator('[data-test="date-time-btn"]');
    this.date2Days = page.locator('[data-test="date-time-relative-2-d-btn"]');
    this.dateApply = page.locator('[data-test="date-time-apply-btn"]');
    this.applyBtn = page.locator('[data-test="dashboard-apply"]');
    this.removeXAxis = page.locator('[data-test="dashboard-x-item-_timestamp-remove"]');

    this.addX = page.locator('[data-test="field-list-item-logs-default-kubernetes_container_name"] [data-test="dashboard-add-x-data"]');
    this.addY1 = page.locator('[data-test="field-list-item-logs-default-kubernetes_annotations_kubectl_kubernetes_io_default_container"] [data-test="dashboard-add-y-data"]');
    this.addY2 = page.locator('[data-test="field-list-item-logs-default-kubernetes_annotations_kubernetes_io_psp"] [data-test="dashboard-add-y-data"]');
    this.addY3 = page.locator('[data-test="field-list-item-logs-default-kubernetes_annotations_prometheus_io_port"] [data-test="dashboard-add-y-data"]');
    this.addBreakdown = page.locator('[data-test="field-list-item-logs-default-kubernetes_container_hash"] [data-test="dashboard-add-b-data"]');

    this.chartSelect = page.locator('[data-test="selected-chart-line-item"]');
    this.sidebar = page.locator('[data-test="dashboard-sidebar"]');
    this.toggleTopResults = page.locator('[role="switch"][data-test="dashboard-config-top_results_others"]');
    this.toggleNullValues = page.locator('[role="switch"][data-test="dashboard-config-connect-null-values"]');
    this.topResultsInput = page.locator('[data-test="dashboard-config-top_results"]');

    this.panelNameInput = page.locator('[data-test="dashboard-panel-name"]');
    this.savePanelBtn = page.locator('[data-test="dashboard-panel-save"]');

    this.noData = page.locator('[data-test="no-data"]');
    this.canvas = page.locator('canvas').nth(1);
  }

  async createDashboard(name, desc) {
    await this.dashboardMenu.click();
    await this.addBtn.click();
    await this.nameInput.fill(name);
    await this.descInput.fill(desc);
    await this.submitBtn.click();
  }

  async setDateTo2Days() {
    await this.dateTimeBtn.click();
    await this.relative2Days.click();
    await this.dateApply.click();
  }

  async openAndStartPanel() {
    await this.dashboardMenu.click();
    await this.dashboardNameCell.click();
    await this.addPanelBtn.click();
  }

  async configurePanel() {
    await this.applyBtn.click();
    await this.removeXAxis.click();

    await this.addX.click();
    await this.addY1.click();
    await this.addY2.click();
    await this.addY3.click();
    await this.addBreakdown.click();

    await this.applyBtn.click();
    await this.chartSelect.click();
    await this.applyBtn.click();

    await this.sidebar.click();
    await this.toggleTopResults.click();
    await this.toggleNullValues.click();
    await this.topResultsInput.fill('5');
    await this.applyBtn.click();
  }

  async savePanel(name) {
    await this.panelNameInput.fill(name);
    await this.savePanelBtn.click();
  }

}
