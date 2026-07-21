import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { POSPage } from '../../pages/POSPage.js';

import { users } from '../../test-data/users.js';
import { pos } from '../../test-data/pos.js';

test.describe('POS Module', () => {

    test('Place Order With Addon, Take Away and Cash Payment', async ({ page }) => {

        const loginPage = new LoginPage(page);

        const posPage = new POSPage(page);

        // Login

        await loginPage.goto();

        await loginPage.login(
            users.admin.email,
            users.admin.password
        );

        // Verify Login

        await expect(page).toHaveURL(/profile/);

        // Open POS

        await posPage.navigateToPOS();

        // Select Dish

        await posPage.selectDish(pos.order.dishName);

        // Select Addon

        await posPage.selectAddon(pos.order.addonText);

        // Confirm Item (button label includes the running total,
        // e.g. "Confirm (€1,700.00)" — matched by prefix in the page object)

        await expect(posPage.confirmItemButton).toBeVisible();

        await posPage.confirmItemSelection();

        // Select Order Type

        await posPage.selectOrderType(pos.order.orderType);

        // Go to Payment

        await expect(posPage.payButton).toBeVisible();

        await posPage.pay();

        // Select Payment Method

        await posPage.selectPaymentMethod(pos.order.paymentMethod);

        // Confirm Payment

        await expect(posPage.confirmPaymentButton).toBeVisible();

        await posPage.confirmPayment();

        // Verify user is back on the POS page after the order completes

        await expect(page).toHaveURL(/pos/);


        

    });

});