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

        this.categoryUploadButton = page.locator('div').filter({ hasText: 'Upload the Category Image' }).nth(5);

        this.categoryImageInput =page.locator('input[type="file"]');

        this.addCategoryButton =page.getByRole('button', {name: 'Add Category'});

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

    await this.addCategoryButton.click();

    return uniqueCategoryName;

}

}