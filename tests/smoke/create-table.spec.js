import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { TablesPage } from '../../pages/TablesPage.js';

import { users } from '../../test-data/users.js';
import { tables } from '../../test-data/tables.js';

test.describe('Tables Module', () => {

    test('Create Table', async ({ page }) => {

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

        // Create Table
        await tablesPage.createTable(
            tables.table1.name,
            tables.table1.capacity,
            tables.table1.area
        );

    });

});