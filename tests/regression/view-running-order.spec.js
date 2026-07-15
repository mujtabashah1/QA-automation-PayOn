import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { TablesPage } from '../../pages/TablesPage.js';
import { users } from '../../test-data/users.js';

test.describe('Running Orders Module', () => {

    test('View Running Order Details', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const tablesPage = new TablesPage(page);

        // Login
        await loginPage.goto();

        await loginPage.login(
            users.admin.email,
            users.admin.password
        );

        // Verify login
        await expect(page).toHaveURL(/profile/);

        // Open Tables
        await tablesPage.navigateToTables();

        // Open Running Order
        await tablesPage.openRunningOrders();

        // View any order's details from the list (random each run)
        await tablesPage.openOrderDetails('random');

        // Verify order details opened
        await expect(
            tablesPage.closeOrderButton
        ).toBeVisible();

        // Close order details
        await tablesPage.closeOrderDetails();

    });

});