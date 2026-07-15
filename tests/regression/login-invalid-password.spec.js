import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { users } from '../../test-data/users.js';

test('Invalid Password', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        users.admin.email,
        'WrongPassword123'
    );

    await expect(page).toHaveURL(/login/);

});