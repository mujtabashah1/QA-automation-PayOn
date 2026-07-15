import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { users } from '../../test-data/users.js';

test('Empty Email And Password', async ({ page }) => {

    const loginPage = new LoginPage(page);

    // Open Login Page
    await loginPage.goto();

    // Leave both fields empty and click Login
    await loginPage.login('', '');

    // Verify user remains on the login page
    await expect(page).toHaveURL(/login/);

    // Verify Login button is still visible
    await expect(loginPage.loginButton).toBeVisible();

    //await expect(page.getByText('Email is required')).toBeVisible();

});