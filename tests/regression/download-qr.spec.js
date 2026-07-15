import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { TablesPage } from '../../pages/TablesPage.js';

import { users } from '../../test-data/users.js';

test.describe('Tables Module', () => {

    test('Download QR', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const tablesPage = new TablesPage(page);

        // Login
        await loginPage.goto();

        await loginPage.login(
            users.admin.email,
            users.admin.password
        );

        // Verify Login
        await expect(page).toHaveURL(/profile/);

        // Navigate to Tables
        await tablesPage.navigateToTables();

        // Open First Table
        await tablesPage.viewTable();

        // Download QR
        const download = await tablesPage.downloadQR();

        // Verify Download Started
        expect(download.suggestedFilename()).toBeTruthy();

    

        // Verify User is still on Tables Page
        await expect(page).toHaveURL(/tables/);

    });

});