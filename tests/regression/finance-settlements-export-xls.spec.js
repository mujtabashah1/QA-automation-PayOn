import { test, expect } from '@playwright/test';
import path from 'path';

import { LoginPage } from '../../pages/LoginPage.js';
import { FinancePage } from '../../pages/FinancePage.js';

import { users } from '../../test-data/users.js';

test.describe('Finance Module', () => {

    test('Export XLS In Settlements', async ({ page }) => {

        test.setTimeout(60000);

        const loginPage = new LoginPage(page);

        const financePage = new FinancePage(page);

        await loginPage.goto();

        await loginPage.login(
            users.admin.email,
            users.admin.password
        );

        await loginPage.waitForSuccessfulLogin(20000);

        await financePage.navigateToSettlements();

        const download = await financePage.exportXls();

        const downloadPath = path.join(
            'test-results',
            'downloads',
            download.suggestedFilename()
        );

        await download.saveAs(downloadPath);

        expect(download.suggestedFilename()).toBeTruthy();

    });

});
