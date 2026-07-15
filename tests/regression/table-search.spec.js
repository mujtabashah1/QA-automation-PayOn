import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { TablesPage } from '../../pages/TablesPage.js';

import { users } from '../../test-data/users.js';
import { tables } from '../../test-data/tables.js';

test('Create Table', async ({ page }) => {

    const loginPage = new LoginPage(page);

    const tablesPage = new TablesPage(page);

    await loginPage.goto();

    await loginPage.login(
        users.admin.email,
        users.admin.password
    );

    await expect(page).toHaveURL(/profile/);

    await tablesPage.navigateToTables();

    await tablesPage.openAddTablePopup();

    await tablesPage.fillTableDetails(
        tables.table1.name,
        tables.table1.capacity
    );

    await tablesPage.selectExistingArea(
        tables.table1.area
    );

    await tablesPage.saveTable();

});