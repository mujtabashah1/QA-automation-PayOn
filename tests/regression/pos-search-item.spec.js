import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { POSPage } from '../../pages/POSPage.js';

import { users } from '../../test-data/users.js';
import { pos } from '../../test-data/pos.js';

test.describe('POS Module', () => {

    test('Search and Select Item', async ({ page }) => {

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

        // Search for the item

        await posPage.searchItem(pos.searchItem.searchTerm);

        // Verify the searched item appears in the results

        await expect(
            posPage.itemButton(pos.searchItem.itemButtonName)
        ).toBeVisible({ timeout: 15000 });

        // Select the item

        await posPage.selectItem(pos.searchItem.itemButtonName);

    });

});