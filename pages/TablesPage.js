export class TablesPage {

    constructor(page) {
        this.page = page;

        this.tablesMenu = page.getByRole('link', { name: 'Tables' });

        this.addTableButton = page.getByRole('button', { name: 'Add Table' });

        this.tableName = page.getByRole('textbox', { name: 'Table Name' });

        this.tableCapacity = page.getByPlaceholder('Table Capacity');

        this.selectArea = page.getByRole('textbox', { name: 'Select Area' });

        this.saveTableButton = page.getByRole('button', { name: 'Add Table' });
    }

    async navigateToTables() {
        await this.tablesMenu.click();
    }

    async createTable(name, capacity, area) {

        await this.addTableButton.click();

        await this.tableName.fill(name);

        await this.tableCapacity.fill(capacity);

        // Type area (new or existing)
        await this.selectArea.fill(area);

        // Save
        await this.saveTableButton.click();
    }

}