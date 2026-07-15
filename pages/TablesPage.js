export class TablesPage {

    constructor(page) {
        this.page = page;

        this.tablesMenu = page.getByRole('link', { name: 'Tables' });

        this.addTableButton = page.getByRole('button', { name: 'Add Table' });
        this.tableName = page.getByRole('textbox', { name: 'Table Name' });
        this.tableCapacity = page.getByPlaceholder('Table Capacity');
        this.selectArea = page.getByRole('textbox', { name: 'Select Area' });
        this.saveTableButton = page.getByRole('button', { name: 'Add Table' });

        this.searchTextbox = page.getByRole('textbox', { name: 'Search...' });
        this.viewTableButton = page.getByRole('button', { name: 'View Table' }).first();
        this.markOccupiedButton = page.getByRole('button', { name: 'Mark as occupied' });

        this.reservationsButton = page.getByRole('button', { name: 'Reservations' });

        // Each reservation row has its own "View" button — this is the
        // real, correct selector confirmed by the Inspector.
        this.viewReservationButtons = page.getByRole('button', { name: 'View', exact: true });

        // Still a guess until we see the details view's HTML — update once confirmed.
        this.closeReservationButton = page.getByRole('dialog').getByRole('button').first();

        //RUNNING ORDERS
        this.runningOrderButton = page.getByRole('button', { name: 'Running Order' });
        this.orderDetailsButtons = page.getByRole('button', { name: 'Details' });
        this.closeOrderButton = page.getByRole('dialog').getByRole('button').first();


        // Delete Table
        this.viewTableButtons = page.getByRole('button', { name: 'View Table' });

        this.deleteButton = page.getByRole('button', { name: 'Delete' });

        this.confirmDeleteButton = page.getByRole('button', { name: 'Confirm' });

        
    }

    async navigateToTables() {
        await this.tablesMenu.click();
    }

    async createTable(name, capacity, area) {
        await this.addTableButton.click();
        await this.tableName.fill(name);
        await this.tableCapacity.fill(capacity);
        await this.selectArea.fill(area);
        await this.saveTableButton.click();
    }

    async searchAndViewTable(tableName) {
        await this.searchTextbox.fill(tableName);
        await this.viewTableButton.click();
    }

    async closeTableDetails() {
        await this.closeReservationButton.click();
    }

    async viewTable() {
        await this.viewTableButton.click();
    }

    async markTableOccupied() {
        await this.markOccupiedButton.click();
    }

    async openReservations() {
        await this.reservationsButton.click();
    }

    // index = 0 (default) -> first reservation's View button
    // index = 'random'    -> a random reservation's View button
    async openReservation(index = 0) {
        await this.viewReservationButtons.first().waitFor({ state: 'visible' });

        const count = await this.viewReservationButtons.count();
        if (count === 0) {
            throw new Error('No reservations found in the list.');
        }

        const selectedIndex = index === 'random'
            ? Math.floor(Math.random() * count)
            : index;

        await this.viewReservationButtons.nth(selectedIndex).click();
    }

    async closeReservation() {
        await this.closeReservationButton.click();
    }

    // ---- Running Orders ----

    async openRunningOrders() {
        await this.runningOrderButton.click();
    }

    async openOrderDetails(index = 0) {
        await this.orderDetailsButtons.first().waitFor({ state: 'visible' });

        const count = await this.orderDetailsButtons.count();
        if (count === 0) {
            throw new Error('No running orders found in the list.');
        }

        const selectedIndex = index === 'random'
            ? Math.floor(Math.random() * count)
            : index;

        await this.orderDetailsButtons.nth(selectedIndex).click();
    }

    async closeOrderDetails() {
        await this.closeOrderButton.click();
    }

    async deleteTable(index = 0) {

    await this.viewTableButtons.first().waitFor({
        state: 'visible'
    });

    const count = await this.viewTableButtons.count();

    if (count === 0) {
        throw new Error('No tables available to delete.');
    }

    const selectedIndex =
        index === 'random'
            ? Math.floor(Math.random() * count)
            : index;

    // Open selected table
    await this.viewTableButtons.nth(selectedIndex).click();

    // Delete
    await this.deleteButton.click();

    // Confirm
    await this.confirmDeleteButton.click();

}

    
    
}