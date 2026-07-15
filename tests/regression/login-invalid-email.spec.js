import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { users } from '../../test-data/users.js';

test('Invalid Email', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        'wronguser123@test.com',
        users.admin.password
    );

    // User should remain on login page
    await expect(page).toHaveURL(/login/);

    // Verify LOGIN button is still visible
    await expect(loginPage.loginButton).toBeVisible();

});