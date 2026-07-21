export class POSPage {

    constructor(page) {

        this.page = page;

        // =========================
        // Navigation
        // =========================

        this.posLink = page.getByRole('link', { name: 'POS' });

        // =========================
        // Search
        // =========================

        this.searchTextbox = page.getByRole('textbox', {
            name: 'Search...'
        });

        // =========================
        // Item Confirmation
        // =========================

        this.confirmItemButton =
            page.getByRole('button', {
                name: /^Confirm \(€/
            });

        // =========================
        // Payment
        // =========================

        this.payButton =
            page.getByRole('button', {
                name: 'Pay',
                exact: true
            });

        this.confirmPaymentButton =
            page.getByRole('button', {
                name: 'Confirm Payment'
            });

        // =========================
        // Category Selection
        // =========================

        this.categoryButton = (name) =>
            this.page.getByRole('button', {
                name: new RegExp(`^${this.escapeRegex(name)}(?:\\s+\\d+)?$`)
            });

        // Product button

        this.productButton = (name) =>
            this.page.getByRole('button', {
                name: name,
                exact: true
            });

        // Cancel button

        this.cancelButton =
            this.page.getByRole('button', {
                name: 'Cancel'
            });


        // =========================
        // Table Dropdown
        // =========================

        this.tableDropdown = page.getByRole('combobox');

        this.tableOption = (tableName) =>
            page.getByRole('option', {
                name: tableName,
                exact: true
            });

        this.tableOptions = page.getByRole('option');

    } // <-- YOU WERE MISSING THIS

    // ===================================================
    // Navigation
    // ===================================================

    async navigateToPOS() {

        await this.posLink.click();

        await this.page.waitForURL(/\/pos/);

        await this.searchTextbox.waitFor({
            state: 'visible'
        });

    }

    // ===================================================
    // Table Selection
    // ===================================================

    async openTableDropdown() {

        await this.tableDropdown.click();

    }

    async selectTable(tableName) {

        await this.tableOption(tableName)
            .waitFor({
                state: 'visible'
            });

        await this.tableOption(tableName)
            .click();

    }

    async selectRandomTable() {

        await this.tableOptions
            .first()
            .waitFor({
                state: 'visible'
            });

        const selectedTableName =
            await this.tableOptions
                .first()
                .innerText();

        await this.tableOptions
            .first()
            .click();

        return selectedTableName.trim();

    }

    async chooseTable(tableName) {

        await this.openTableDropdown();

        await this.selectTable(tableName);

    }

    async chooseRandomTable() {

        await this.openTableDropdown();

        return this.selectRandomTable();

    }

    async openCustomerDropdown() {

        await this.openTableDropdown();

    }

    async selectCustomer(customerName) {

        await this.selectTable(customerName);

    }

    async chooseCustomer(customerName) {

        await this.chooseTable(customerName);

    }

    // ===================================================
    // Search
    // ===================================================

    itemButton(itemName) {

        return this.page.getByRole('button', {
            name: new RegExp(this.escapeRegex(itemName), 'i')
        });

    }

    async searchItem(searchTerm) {

        await this.searchTextbox.click();

        await this.searchTextbox.fill(searchTerm);

    }

    async selectItem(itemName) {

        await this.itemButton(itemName).waitFor({
            state: 'visible'
        });

        await this.itemButton(itemName).click();

    }

    async searchAndSelectItem(searchTerm, itemName) {

        await this.searchItem(searchTerm);

        await this.selectItem(itemName);

    }

    async isItemVisible(itemName) {

        return this.itemButton(itemName).isVisible({
            timeout: 15000
        });

    }

    // ===================================================
    // Dish Selection
    // ===================================================

    async selectDish(dishName) {

        await this.itemButton(dishName).waitFor({
            state: 'visible'
        });

        await this.itemButton(dishName).click();

    }

    addonOption(addonText) {

        return this.page.getByText(
            new RegExp(this.escapeRegex(addonText), 'i')
        );

    }

    async selectAddon(addonText) {

        await this.addonOption(addonText).click();

    }

    async confirmItemSelection() {

        await this.confirmItemButton.click();

    }

    // ===================================================
    // Order Type
    // ===================================================

    orderTypeButton(orderType) {

        return this.page.getByRole('button', {
            name: orderType
        });

    }

    async selectOrderType(orderType) {

        await this.orderTypeButton(orderType).click();

    }

    // ===================================================
    // Payment
    // ===================================================

    async pay() {

        await this.payButton.click();

    }

    paymentMethodButton(method) {

        return this.page.getByRole('button', {
            name: method
        });

    }

    async selectPaymentMethod(method) {

        await this.paymentMethodButton(method).click();

    }

    async confirmPayment() {

        await this.confirmPaymentButton.click();

    }

    escapeRegex(text) {

        return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    }

    // ===================================================
    // Complete Order Flow
    // ===================================================

    async placeOrder(order) {

        await this.selectDish(order.dishName);

        await this.selectAddon(order.addonText);

        await this.confirmItemSelection();

        await this.selectOrderType(order.orderType);

        await this.pay();

        await this.selectPaymentMethod(order.paymentMethod);

        await this.confirmPayment();

    }

    async placeDineInOrder(order) {

        await this.selectDish(order.itemName);

        await this.confirmItemSelection();

        await this.chooseRandomTable();

        await this.pay();

        await this.selectPaymentMethod(order.paymentMethod);

        await this.confirmPayment();

    }

    // ===================================================
    // Category Selection
    // ===================================================

    async selectCategories(categories) {

        for (const category of categories) {

            await this.categoryButton(category)
                .waitFor({
                    state: 'visible'
                });

            await this.categoryButton(category).click();

        }

    }

    async selectProduct(productName) {

        await this.productButton(productName)
            .waitFor({
                state: 'visible'
            });

        await this.productButton(productName).click();

    }

    async cancelSelection() {

        await this.cancelButton.click();

    }

}
