import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';

import { MenuPage } from '../../pages/MenuPage.js';

import { users } from '../../test-data/users.js';

import { menu } from '../../test-data/menu.js';

test.describe('Menu Module', () => {

    test('Create New Category', async ({ page }) => {

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

        // Create Category

        const createdCategory =await menuPage.createCategory(menu.category);

        console.log("Created Category:" , createdCategory);

        // Verify User stays on Menu page

        await expect(page).toHaveURL(/menu/);

    });

});