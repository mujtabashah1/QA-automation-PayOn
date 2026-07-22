import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { OrdersPage } from '../../pages/OrdersPage.js';

import { users } from '../../test-data/users.js';
import { orders } from '../../test-data/orders.js';

test.describe('Orders Module', () => {

    test('Search Table In Orders', async ({ page }) => {

        const loginPage = new LoginPage(page);

        const ordersPage = new OrdersPage(page);

        await loginPage.goto();

        await loginPage.login(
            users.admin.email,
            users.admin.password
        );

        await loginPage.waitForSuccessfulLogin(20000);

        await ordersPage.navigateToOrders();

        await ordersPage.searchTable(
            orders.search.tableName
        );

        await expect(
            ordersPage.tableResult(orders.search.tableName)
        ).toBeVisible();

    });

});
