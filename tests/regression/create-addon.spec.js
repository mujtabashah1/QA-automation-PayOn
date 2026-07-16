import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { MenuPage } from '../../pages/MenuPage.js';
import { users } from '../../test-data/users.js';
import { menu } from '../../test-data/menu.js';

test.describe('Menu Module', () => {

    test('Create New Addon', async ({ page }) => {

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

        // Open Addon section
        await menuPage.navigateToAddon();

        // Create Addon
        const createdAddon = await menuPage.createAddon(menu.addon);

        console.log("Created Addon:", createdAddon);

        // Verify user stays on Menu page
        await expect(page).toHaveURL(/menu/);

        // Verify the addon was actually created and appears in the list
        // (not exact:true, and longer timeout — same fix we needed for products)
        await expect(page.getByText(createdAddon)).toBeVisible({ timeout: 15000 });

    });

});