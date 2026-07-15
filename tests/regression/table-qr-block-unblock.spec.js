import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { TablesPage } from '../../pages/TablesPage.js';

import { users } from '../../test-data/users.js';

test.describe('Tables Module', () => {

    test('Block and Unblock QR', async ({ page }) => {

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

        // Open Table
        await tablesPage.viewTable();

        // Verify Block QR button is visible
        await expect(tablesPage.blockQRButton).toBeVisible();

        // Block QR
        await tablesPage.blockQR();

        // Verify button changed to Unblock QR
        await expect(tablesPage.unblockQRButton).toBeVisible();

        // Unblock QR
        await tablesPage.unblockQR();

        // Verify button changed back to Block QR
        await expect(tablesPage.blockQRButton).toBeVisible();

    });

});