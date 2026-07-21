import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { POSPage } from '../../pages/POSPage.js';

import { users } from '../../test-data/users.js';
import { pos } from '../../test-data/pos.js';

test.describe('POS Module', () => {

    test('Select Through Categories', async ({ page }) => {

        const loginPage = new LoginPage(page);

        const posPage = new POSPage(page);

        // Login
        await loginPage.goto();

        await loginPage.login(
            users.admin.email,
            users.admin.password
        );

        await page.waitForURL(/profile/, {
            timeout: 30000
        });

        // Navigate to POS
        await posPage.navigateToPOS();

        // Click categories
        await posPage.selectCategories(
            pos.categories
        );

    });

});
