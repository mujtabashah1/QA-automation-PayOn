import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { OrdersPage } from '../../pages/OrdersPage.js';

import { users } from '../../test-data/users.js';
import { orders } from '../../test-data/orders.js';

test.describe('Orders Module', () => {

    test('Filter Order Summary Cards By Time', async ({ page }) => {

        const loginPage = new LoginPage(page);

        const ordersPage = new OrdersPage(page);

        await loginPage.goto();

        await loginPage.login(
            users.admin.email,
            users.admin.password
        );

        await loginPage.waitForSuccessfulLogin(20000);

        await ordersPage.navigateToOrders();

        await ordersPage.selectFirstSummaryFilter(
            orders.summaryFilters.firstCard
        );

        await ordersPage.selectSummaryCardFilter(
            1,
            orders.summaryFilters.secondCard
        );

        await ordersPage.selectSummaryCardFilter(
            2,
            orders.summaryFilters.thirdCard
        );

        await expect(
            ordersPage.summaryCardFilterDropdowns.first()
        ).toContainText(orders.summaryFilters.firstCard);

        await expect(
            ordersPage.summaryCardFilterDropdowns.nth(1)
        ).toContainText(orders.summaryFilters.secondCard);

        await expect(
            ordersPage.summaryCardFilterDropdowns.nth(2)
        ).toContainText(orders.summaryFilters.thirdCard);

    });

});
