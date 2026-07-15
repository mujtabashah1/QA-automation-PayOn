export class ProfilePage {

    constructor(page) {
        this.page = page;

        this.userMenu = page.getByRole('button', { name: 'Open user menu' });
        this.logoutButton = page.getByRole('menuitem', { name: 'Log out' });
    }

    async logout() {
        await this.userMenu.click();
        await this.logoutButton.click();
    }

}