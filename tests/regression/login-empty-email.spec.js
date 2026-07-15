import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { users } from '../../test-data/users.js';

test('Empty Email', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        '',
        users.admin.password
    );

    // User should remain on login page
    await expect(page).toHaveURL(/login/);

   // await expect(
   // page.getByText('Email is required')
//).toBeVisible();


});