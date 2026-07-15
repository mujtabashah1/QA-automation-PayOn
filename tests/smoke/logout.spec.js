import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { ProfilePage } from '../../pages/ProfilePage.js';
import { users } from '../../test-data/users.js';

test.describe('Authentication Module', () => {

    test('Logout', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const profilePage = new ProfilePage(page);

        // Open Login Page
        await loginPage.goto();

        // Login
        await loginPage.login(
            users.admin.email,
            users.admin.password
        );

        // Verify successful login
        await expect(page).toHaveURL(/profile/);

        // Verify user menu is visible
        await expect(profilePage.userMenu).toBeVisible();

        // Logout
        await profilePage.logout();

        // Verify redirect to Login page
        await expect(page).toHaveURL(/login/);

        // Verify Login button is visible
        await expect(loginPage.loginButton).toBeVisible();

    });

});