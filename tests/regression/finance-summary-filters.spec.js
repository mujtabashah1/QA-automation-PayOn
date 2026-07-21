import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { FinancePage } from '../../pages/FinancePage.js';

import { users } from '../../test-data/users.js';
import { finance } from '../../test-data/finance.js';

test.describe('Finance Module', () => {

    test('Summary Page Filters', async ({ page }) => {

        const loginPage = new LoginPage(page);

        const financePage = new FinancePage(page);

        await loginPage.goto();

        await loginPage.login(
            users.admin.email,
            users.admin.password
        );

        await expect(page).toHaveURL(/profile/);

        await financePage.navigateToFinance();

        await financePage.filterSummary(finance.summary);

        await expect(
            financePage.netSalesPeriodDropdown
        ).toContainText('This Week');

        await expect(
            financePage.overviewPeriodDropdown
        ).toContainText('Last Month');

        await expect(
            financePage.annualPerformanceTypeDropdown
        ).toContainText(finance.summary.annualPerformanceType);

    });

});
