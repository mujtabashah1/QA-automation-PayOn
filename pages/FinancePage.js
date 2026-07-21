export class FinancePage {

    constructor(page) {

        this.page = page;

        this.financeLink = page.getByRole('link', {
            name: 'Finance'
        });

        this.summaryTab = page.getByRole('button', {
            name: 'Summary'
        });

        this.netSalesPeriodDropdown =
            page.getByTestId('net-sales-period');

        // On the Summary page, the second combobox controls the overview card
        // period shown in the inspector flow.
        this.overviewPeriodDropdown =
            page.getByRole('combobox').nth(1);

        this.annualPerformanceTypeDropdown =
            page.getByRole('combobox').filter({
                hasText: /Income|Expenditure/
            });

        this.latestTransactionsHeading = page.getByRole('heading', {
            name: 'Latest transactions'
        });

        this.loadingTransactionsText = page.getByText(
            'Loading Transactions'
        );

        this.receiptButtons = page.getByRole('button', {
            name: 'Receipt'
        });

        this.receiptDialogHeading = page.getByRole('heading', {
            name: /receipt/i
        });

        this.downloadReceiptButton = page.getByRole('button', {
            name: 'Download Receipt'
        });
    }

    async navigateToFinance() {

        await this.financeLink.click();

        await this.page.waitForURL(/\/payments|\/finance|\/summary/);

        await this.summaryTab.waitFor({
            state: 'visible'
        });

        await this.summaryTab.click();

        await this.netSalesPeriodDropdown.waitFor({
            state: 'visible'
        });

    }

    dropdownOption(optionText) {

        return this.page.getByRole('option', {
            name: optionText,
            exact: true
        });

    }

    async selectNetSalesPeriod(period) {

        await this.netSalesPeriodDropdown.click();

        await this.dropdownOption(period).click();

    }

    async selectOverviewPeriod(period) {

        await this.overviewPeriodDropdown.click();

        await this.dropdownOption(period).click();

    }

    async selectAnnualPerformanceType(type) {

        if (await this.annualPerformanceTypeDropdown
            .filter({
                hasText: type
            })
            .isVisible()) {

            return;

        }

        await this.annualPerformanceTypeDropdown.click();

        await this.dropdownOption(type).click();

    }

    async filterSummary(summary) {

        for (const period of summary.netSalesPeriods) {

            await this.selectNetSalesPeriod(period);

        }

        for (const period of summary.overviewPeriods) {

            await this.selectOverviewPeriod(period);

        }

        await this.selectAnnualPerformanceType(
            summary.annualPerformanceType
        );

    }

    async openRandomLatestTransaction() {

        await this.latestTransactionsHeading.waitFor({
            state: 'visible'
        });

        if (await this.loadingTransactionsText.isVisible()) {

            await this.loadingTransactionsText.waitFor({
                state: 'hidden',
                timeout: 45000
            });

        }

        await this.receiptButtons.first().waitFor({
            state: 'visible'
        });

        const transactionCount =
            await this.receiptButtons.count();

        const randomIndex = Math.floor(
            Math.random() * transactionCount
        );

        const selectedReceiptButton =
            this.receiptButtons.nth(randomIndex);

        await selectedReceiptButton.scrollIntoViewIfNeeded();

        await selectedReceiptButton.waitFor({
            state: 'visible'
        });

        await selectedReceiptButton.evaluate((button) => {

            let row = button.parentElement;

            while (row && !/^\d{4}/.test((row.innerText || '').trim())) {
                row = row.parentElement;
            }

            if (!row) {
                throw new Error('Could not find transaction row');
            }

            row.click();

        });

        await this.downloadReceiptButton.waitFor({
            state: 'visible',
            timeout: 45000
        });

    }

    async openLatestTransaction(transactionText) {

        await this.latestTransactionsHeading.waitFor({
            state: 'visible'
        });

        if (await this.loadingTransactionsText.isVisible()) {

            await this.loadingTransactionsText.waitFor({
                state: 'hidden',
                timeout: 45000
            });

        }

        const transactionRow = this.page.getByText(transactionText);

        await transactionRow.waitFor({
            state: 'visible'
        });

        await transactionRow.click();

        await this.downloadReceiptButton.waitFor({
            state: 'visible',
            timeout: 45000
        });

    }

    async downloadReceipt() {

        const downloadPromise = this.page.waitForEvent('download');

        await this.downloadReceiptButton.click();

        return downloadPromise;

    }

}
