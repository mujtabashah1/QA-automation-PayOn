import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';

import { MenuPage } from '../../pages/MenuPage.js';

import { users } from '../../test-data/users.js';

import { menu } from '../../test-data/menu.js';

test.describe('Menu Module', () => {

    test('Create Product With Additional Details', async ({ page }) => {

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

        // Navigate Menu

        await menuPage.navigateToMenu();

        // Create Product

        const createdProduct = await menuPage.createProduct(
            menu.product
        );

        console.log("Created Product:", createdProduct);

        // Verify user stays on Menu Page

        await expect(page).toHaveURL(/menu/);

        // Verify the product was actually created and appears in the list
        await expect(page.getByText(createdProduct)).toBeVisible({ timeout: 15000 });

    });

});