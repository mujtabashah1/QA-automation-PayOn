import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { users } from '../../test-data/users.js';

test.describe('Authentication Module', () => {

    test('Valid Login', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            users.admin.email,
            users.admin.password
        );

        // Verify login was successful
        await expect(page).toHaveURL(/profile/);

    });

});