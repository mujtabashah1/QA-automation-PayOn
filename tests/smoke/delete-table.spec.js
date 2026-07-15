import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { TablesPage } from '../../pages/TablesPage.js';

import { users } from '../../test-data/users.js';

test.describe('Tables Module', () => {

    test('Delete Table', async ({ page }) => {

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

        // Navigate to Tables
        await tablesPage.navigateToTables();

        // Delete first table
        await tablesPage.deleteTable();

        // Verify we're still on Tables page
        await expect(page).toHaveURL(/tables/);

    });

});