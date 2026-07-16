export class MenuPage {

    constructor(page) {

        this.page = page;

        // Navigation
        this.menuButton = page.getByRole('link', { name: 'Menu' });

        // Buttons
        this.addNewProductButton = page.getByRole('button', { name: 'Add New Product' });
        this.addIngredientButton = page.getByRole('button', { name: '+' });
        this.addProductButton = page.getByRole('button', { name: 'Add Product' });

        // Product Details
        this.productNameTextbox = page.getByRole('textbox', {
            name: 'Enter Product Name'
        });

        this.priceTextbox = page.getByPlaceholder('Enter Price');

        this.ingredientsTextbox = page.getByRole('textbox', {
            name: 'Ingredients'
        });

        // Nutrition

        this.caloriesTextbox = page.getByPlaceholder('Calories');

        this.proteinsTextbox = page.getByPlaceholder('Proteins');

        this.fatsTextbox = page.getByPlaceholder('Fats');

        this.carbohydratesTextbox = page.getByPlaceholder('Carbohydrates');

        // Upload

        this.uploadImageButton = page.locator('.w-\\[60px\\]').first();

        this.imageInput = page.locator('input[type="file"]').first();

        // Description

        this.descriptionTextbox = page.getByRole('textbox', {
            name: 'Description'
        });

        // Category

        this.categoryDropdown = page.locator('.css-19bb58m').first();


        // Category

        this.addNewCategoryButton = page.getByRole('button', {name: 'Add New Category'});

        this.categoryNameTextbox = page.getByRole('textbox', {name: 'Name'});

        this.categoryDescriptionTextbox = page.getByRole('textbox', {name: 'Description'});

        // NOTE: this locator is a guess (.nth(5)) and is the most likely reason
        // category creation silently fails. Needs the real DOM to fix properly.
        this.categoryUploadButton = page.locator('div').filter({ hasText: 'Upload the Category Image' }).nth(5);

        // .first() added to avoid strict-mode issues with multiple hidden file inputs
        this.categoryImageInput = page.locator('input[type="file"]').first();

        this.addCategoryButton = page.getByRole('button', {name: 'Add Category'});

        // Addon
        this.addonButton = page.getByRole('button', { name: 'Addon' });
        this.addAddonButton = page.getByRole('button', { name: 'Add Addon' });
        this.addonNameTextbox = page.getByRole('textbox', { name: 'Addon Name' });
        this.addonPriceTextbox = page.getByPlaceholder('Addon Price');

    }

    async navigateToMenu() {

        await this.menuButton.click();

    }

    async createProduct(product) {

        const uniqueProductName =
            `${product.prefix}_${Date.now()}`;

        await this.addNewProductButton.click();

        await this.productNameTextbox.fill(uniqueProductName);

        await this.priceTextbox.fill(product.price);

        // Ingredients

        for (const ingredient of product.ingredients) {

            await this.ingredientsTextbox.fill(ingredient);

            await this.addIngredientButton.click();

        }

        await this.caloriesTextbox.fill(product.calories);

        await this.proteinsTextbox.fill(product.proteins);

        await this.fatsTextbox.fill(product.fats);

        await this.carbohydratesTextbox.fill(product.carbohydrates);

        await this.uploadImageButton.click();

        await this.imageInput.setInputFiles(product.image);

        await this.descriptionTextbox.fill(product.description);

        // First Save

        await this.addProductButton.click();

        // Category

        await this.categoryDropdown.click();

        await this.page.getByRole('option', {name: product.category,exact: true}).click();

        // Final Save

        await this.addProductButton.click();

        return uniqueProductName;

    }

    async createCategory(category) {

        const uniqueCategoryName =
            `${category.prefix}_${Date.now()}`;

        await this.addNewCategoryButton.click();

        await this.categoryNameTextbox.fill(
            uniqueCategoryName
        );

        await this.categoryDescriptionTextbox.fill(
            category.description
        );

        await this.categoryUploadButton.click();

        await this.categoryImageInput.setInputFiles(
            category.image
        );

        await this.page.waitForTimeout(1000);

        await this.addCategoryButton.click();

        return uniqueCategoryName;

    }

    async navigateToAddon() {

        await this.addonButton.click();

    }

    async createAddon(addon) {

        const uniqueAddonName =
            `${addon.prefix}_${Date.now()}`;

        // Opens the Add Addon modal
        await this.addAddonButton.click();

        await this.addonNameTextbox.fill(uniqueAddonName);

        await this.addonPriceTextbox.fill(addon.price);

        // Submits the modal (same button, reused)
        await this.addAddonButton.click();

        return uniqueAddonName;

    }

    // Verification helpers — check the item actually appears in the list,
    // not just that the URL didn't change.

    async isCategoryVisible(categoryName) {
        return this.page.getByText(categoryName, { exact: true }).isVisible();
    }

    async isProductVisible(productName) {
        return this.page.getByText(productName).isVisible({ timeout: 15000 });
    }

    async isAddonVisible(addonName) {
        return this.page.getByText(addonName).isVisible({ timeout: 15000 });
    }

}