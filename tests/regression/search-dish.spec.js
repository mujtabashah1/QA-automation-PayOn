import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { MenuPage } from '../../pages/MenuPage.js';

import { users } from '../../test-data/users.js';

test.describe('Menu Module', () => {

    test('Search Dish', async ({ page }) => {

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

        // Navigate to Menu

        await menuPage.navigateToMenu();

        // Search for Pizza

        await menuPage.searchDish('Pizza');

        // Verify Result

        await expect(

            menuPage.dishHeading('BBQ Pizza special for')

        ).toBeVisible();

    });

});