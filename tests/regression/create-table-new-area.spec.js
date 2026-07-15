import { test } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { TablesPage } from '../../pages/TablesPage.js';

import { users } from '../../test-data/users.js';
import { tables } from '../../test-data/tables.js';

test('Create Table With New Area', async ({ page }) => {

    const loginPage = new LoginPage(page);

    const tablesPage = new TablesPage(page);

    await loginPage.goto();

    await loginPage.login(
        users.admin.email,
        users.admin.password
    );

    await tablesPage.navigateToTables();

    await tablesPage.openAddTablePopup();

    await tablesPage.fillTableDetails(
        tables.newAreaTable.name,
        tables.newAreaTable.capacity
    );

    await tablesPage.createNewArea(
        tables.newAreaTable.area
    );

    await tablesPage.saveTable();

});