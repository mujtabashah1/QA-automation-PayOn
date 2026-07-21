import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { MenuPage } from '../../pages/MenuPage.js';
import { users } from '../../test-data/users.js';
import { menu } from '../../test-data/menu.js';

test.describe('Menu Module', () => {

    test('Update a Product', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const menuPage = new MenuPage(page);

        // Login
        await loginPage.goto();

        await loginPage.login(
            users.admin.email,
            users.admin.password
        );

        // Verify Login
        await expect(page).toHaveURL(/profile/);

        // Open Menu
        await menuPage.navigateToMenu();

        // Update a random product — returns the unique generated name
        const updatedName = await menuPage.updateProduct('random', menu.updateProduct);

        console.log("Updated Product Name:", updatedName);

        // Verify the updated name now appears in the list
        await expect(
            page.getByText(updatedName)
        ).toBeVisible({ timeout: 15000 });

    });

});