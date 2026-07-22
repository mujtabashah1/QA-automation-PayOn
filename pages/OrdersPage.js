export class OrdersPage {

    constructor(page) {

        this.page = page;

        this.ordersLink = page.getByRole('link', {
            name: 'Orders'
        });

        this.summaryFilterDropdown = page.getByRole('combobox')
            .filter({
                hasText: 'Today'
            });

        this.summaryCardFilterDropdowns = page.getByRole('combobox');

        this.searchTextbox = page.getByRole('textbox', {
            name: 'Search...'
        });

        this.readyTab = page.getByRole('button', {
            name: 'Ready',
            exact: true
        });

        this.servedTab = page.getByRole('button', {
            name: 'Served',
            exact: true
        });

        this.markAsReadyButton = page.getByRole('button', {
            name: 'Mark as Ready'
        });

        this.markAsServedButton = page.getByRole('button', {
            name: 'Mark as Served'
        });
    }

    async navigateToOrders() {

        await this.ordersLink.click();

        await this.page.waitForURL(/\/orders/);

        await this.summaryCardFilterDropdowns.first().waitFor({
            state: 'visible',
            timeout: 45000
        });

    }

    async searchTable(searchText) {

        await this.searchTextbox.waitFor({
            state: 'visible',
            timeout: 45000
        });

        await this.searchTextbox.click();

        await this.searchTextbox.fill(searchText);

    }

    tableResult(tableName) {

        return this.page.getByText(tableName, {
            exact: false
        });

    }

    dropdownOption(optionText) {

        return this.page.getByRole('option', {
            name: optionText,
            exact: true
        });

    }

    async selectFirstSummaryFilter(optionText) {

        await this.summaryFilterDropdown.click();

        await this.dropdownOption(optionText).click();

    }

    async selectSummaryCardFilter(index, optionText) {

        const dropdown =
            this.summaryCardFilterDropdowns.nth(index);

        await dropdown.click();

        await this.dropdownOption(optionText).click();

    }

    async markOrderReady() {

        await this.markAsReadyButton.first().waitFor({
            state: 'visible',
            timeout: 45000
        });

        await this.markAsReadyButton.first().click();

    }

    async openReadyTab() {

        await this.readyTab.waitFor({
            state: 'visible',
            timeout: 45000
        });

        await this.readyTab.click();

    }

    async markOrderServed() {

        await this.markAsServedButton.first().waitFor({
            state: 'visible',
            timeout: 45000
        });

        await this.markAsServedButton.first().click();

    }

    async openServedTab() {

        await this.servedTab.waitFor({
            state: 'visible',
            timeout: 45000
        });

        await this.servedTab.click();

    }

}
