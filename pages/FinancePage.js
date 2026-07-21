export class FinancePage {

    constructor(page) {

        this.page = page;

        this.financeLink = page.getByRole('link', {
            name: 'Finance'
        });

        this.summaryTab = page.getByRole('button', {
            name: 'Summary'
        });

        this.paymentsTab = page.getByRole('button', {
            name: 'Payments'
        });

        this.settlementsTab = page.getByRole('button', {
            name: 'Settlements'
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

        this.loadingPaymentsText = page.getByText(
            'Loading Payments'
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

        this.searchTextbox = page.getByRole('textbox', {
            name: 'Search...'
        });

        this.refundViaPSPButton = page.getByRole('button', {
            name: 'Refund via PSP'
        });

        this.confirmRefundButton = page.getByRole('button', {
            name: /Yes, Process Refund|Process Refund/
        });

        this.refundAmountDropdown = page.getByRole('combobox').filter({
            hasText: 'Refund amount'
        });

        this.exportXlsButton = page.getByRole('button', {
            name: 'Export XLS'
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

    async navigateToPayments() {

        await this.financeLink.click();

        await this.page.waitForURL(/\/payments|\/finance|\/summary/);

        await this.paymentsTab.waitFor({
            state: 'visible'
        });

        await this.paymentsTab.click();

        await this.page.getByRole('heading', {
            name: 'Payments'
        }).waitFor({
            state: 'visible',
            timeout: 45000
        });

    }

    async navigateToSettlements() {

        await this.financeLink.click();

        await this.page.waitForURL(/\/payments|\/finance|\/summary/);

        await this.settlementsTab.waitFor({
            state: 'visible'
        });

        await this.settlementsTab.click();

        await this.exportXlsButton.waitFor({
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

    async searchTransaction(searchText) {

        await this.searchTextbox.waitFor({
            state: 'visible'
        });

        await this.searchTextbox.click();

        await this.searchTextbox.fill(searchText);

    }

    transactionRowById(transactionId) {

        return this.page.getByText(new RegExp(`^${transactionId}\\D`));

    }

    transactionRowByText(transactionText) {

        return this.page.getByText(transactionText);

    }

    async openTransactionById(transactionId) {

        const transactionRow = this.transactionRowById(transactionId);

        await transactionRow.waitFor({
            state: 'visible',
            timeout: 45000
        });

        await transactionRow.click();

    }

    async openTransactionByRowText(transactionText) {

        const transactionRow =
            this.transactionRowByText(transactionText);

        await transactionRow.waitFor({
            state: 'visible',
            timeout: 45000
        });

        await transactionRow.click();

    }

    async openRandomSearchedTransaction(prefix) {

        await this.searchTransaction(prefix);

        if (await this.loadingTransactionsText.isVisible()) {

            await this.loadingTransactionsText.waitFor({
                state: 'hidden',
                timeout: 45000
            });

        }

        const matchingTransactionIds =
            await this.page.getByText(
                new RegExp(`^${prefix}\\d{2}$`)
            ).allInnerTexts();

        if (!matchingTransactionIds.length) {
            throw new Error(
                `No transaction IDs found for prefix "${prefix}"`
            );
        }

        const randomIndex = Math.floor(
            Math.random() * matchingTransactionIds.length
        );

        const selectedTransactionId =
            matchingTransactionIds[randomIndex].trim();

        await this.openTransactionById(selectedTransactionId);

        return selectedTransactionId;

    }

    async refundViaPSP() {

        await this.refundViaPSPButton.waitFor({
            state: 'visible',
            timeout: 45000
        });

        await this.refundViaPSPButton.click();

        await this.confirmRefundButton.waitFor({
            state: 'visible'
        });

        await this.confirmRefundButton.click();

    }

    orderRow(orderText) {

        return this.page.getByText(orderText).first();

    }

    async openOrder(orderText) {

        const orderRow = this.orderRow(orderText);

        await orderRow.waitFor({
            state: 'visible',
            timeout: 45000
        });

        await orderRow.click();

    }

    async selectFullRefundAmount() {

        await this.refundAmountDropdown.waitFor({
            state: 'visible',
            timeout: 45000
        });

        await this.refundAmountDropdown.click();

        await this.page.getByText('Refund (Full)').click();

    }

    async requestRefund() {

        await this.page.getByRole('button', {
            name: 'Request Refund'
        }).click();

        await this.confirmRefundButton.waitFor({
            state: 'visible',
            timeout: 45000
        });

        await this.confirmRefundButton.click();

    }

    refundedStatus() {

        return this.page.getByText('Refunded').first();

    }

    async waitForRefundedOnCurrentPage() {

        await this.page.waitForTimeout(5000);

        await this.refundedStatus().waitFor({
            state: 'visible',
            timeout: 15000
        });

    }

    async exportXls() {

        await this.exportXlsButton.waitFor({
            state: 'visible',
            timeout: 45000
        });

        const downloadPromise = this.page.waitForEvent('download');

        await this.exportXlsButton.click();

        return downloadPromise;

    }

}
