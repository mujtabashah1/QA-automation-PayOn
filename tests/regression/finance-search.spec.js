import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { FinancePage } from '../../pages/FinancePage.js';

import { users } from '../../test-data/users.js';
import { finance } from '../../test-data/finance.js';

test.describe('Finance Module', () => {

    test('Search Transaction In Finance', async ({ page }) => {

        test.setTimeout(60000);

        const loginPage = new LoginPage(page);

        const financePage = new FinancePage(page);

        await loginPage.goto();

        await loginPage.login(
            users.admin.email,
            users.admin.password
        );

        await loginPage.waitForSuccessfulLogin(20000);

        await financePage.navigateToFinance();

        await financePage.searchTransaction(
            finance.searchTransaction.transactionId
        );

        await financePage.openTransactionByRowText(
            finance.searchTransaction.rowText
        );

        await expect(
            page.getByText(finance.searchTransaction.rowText)
        ).toBeVisible();

    });

});
