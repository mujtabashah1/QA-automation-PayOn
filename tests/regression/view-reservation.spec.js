import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { TablesPage } from '../../pages/TablesPage.js';
import { users } from '../../test-data/users.js';

test.describe('Reservation Module', () => {

    test('View Reservation', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const tablesPage = new TablesPage(page);

        // Login
        await loginPage.goto();

        await loginPage.login(
            users.admin.email,
            users.admin.password
        );

        // Verify login
        await expect(page).toHaveURL(/profile/);

        // Open Tables
        await tablesPage.navigateToTables();

        // Open Reservations
        await tablesPage.openReservations();

        // View any reservation from the list (random each run)
        await tablesPage.openReservation('random');

        // Verify reservation details opened
        await expect(
            tablesPage.closeReservationButton
        ).toBeVisible();

        // Close Reservation
        await tablesPage.closeReservation();

    });

});