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
    }

    async navigateToOrders() {

        await this.ordersLink.click();

        await this.page.waitForURL(/\/orders/);

        await this.summaryCardFilterDropdowns.first().waitFor({
            state: 'visible',
            timeout: 45000
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

}
