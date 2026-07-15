import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { users } from '../../test-data/users.js';

test('Empty Password', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        users.admin.email,
        ''
    );

    // Verify user is still on login page
    await expect(page).toHaveURL(/login/);

    // Verify Login button is still visible
    await expect(loginPage.loginButton).toBeVisible();

});