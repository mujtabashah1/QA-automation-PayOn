import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { TablesPage } from '../../pages/TablesPage.js';

import { users } from '../../test-data/users.js';

test.describe('Tables Module', () => {

    test('Mark Table as Occupied and Mark Table as Free', async ({ page }) => {

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

        // Open Tables Module
        await tablesPage.navigateToTables();

        // View First Table
        await tablesPage.viewTable();

        // Verify button is "Mark as occupied"
        await expect(tablesPage.markOccupiedButton).toBeVisible();

        // Mark Table as Occupied
        await tablesPage.markTableOccupied();

        // Verify button changed to "Mark as free"
        await expect(tablesPage.markFreeButton).toBeVisible();

        // Mark Table as Free
        await tablesPage.markTableFree();

        // Verify button changed back to "Mark as occupied"
        await expect(tablesPage.markOccupiedButton).toBeVisible();

    });

});