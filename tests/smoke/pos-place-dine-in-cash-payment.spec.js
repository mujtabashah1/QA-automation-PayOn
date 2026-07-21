import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { POSPage } from '../../pages/POSPage.js';

import { users } from '../../test-data/users.js';
import { pos } from '../../test-data/pos.js';

test.describe('POS Module', () => {

    test('Place Dine In Order With Cash Payment', async ({ page }) => {

        const loginPage = new LoginPage(page);

        const posPage = new POSPage(page);

        await loginPage.goto();

        await loginPage.login(
            users.admin.email,
            users.admin.password
        );

        await expect(page).toHaveURL(/profile/);

        await posPage.navigateToPOS();

        await posPage.placeDineInOrder(pos.dineInOrder);

        await expect(page).toHaveURL(/pos/);

    });

});
