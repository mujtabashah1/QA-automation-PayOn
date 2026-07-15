import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { TablesPage } from '../../pages/TablesPage.js';

import { users } from '../../test-data/users.js';
import { reservations } from '../../test-data/reservations.js';

test.describe('Reservations Module', () => {

    test('Cancel Random Reservation', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const tablesPage = new TablesPage(page);

        // Login
        await loginPage.goto();

        await loginPage.login(
            users.admin.email,
            users.admin.password
        );

        // Verify Login
        await expect(page).toHaveURL(/profile/);

        // Open Tables
        await tablesPage.navigateToTables();

        // Open Reservations
        await tablesPage.openReservations();

        // Cancel a random reservation
        await tablesPage.cancelReservation(
            reservations.cancelReason,
            'random'
        );

        // Verify user is still on Reservations page
        await expect(page).toHaveURL(/tables/);

    });

});