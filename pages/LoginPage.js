export class LoginPage {

    constructor(page) {
        this.page = page;

        this.email = page.getByRole('textbox', { name: 'Email' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'LOGIN' });
        this.loadingLoginButton = page.getByRole('button', {
            name: 'Loading...'
        });
        this.invalidCredentialsMessage = page.getByText(
            'Invalid email or password'
        );
    }

    async goto() {
        await this.page.goto('/login');
    }

    async login(email, password) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async waitForSuccessfulLogin(timeout = 15000) {

        await this.page.waitForURL(/\/profile/, {
            timeout,
            waitUntil: 'commit'
        });

        await this.page.getByRole('link', {
            name: 'Finance'
        }).waitFor({
            state: 'visible',
            timeout
        });

    }

    async waitForLoginResult(timeout = 15000) {

        await Promise.race([
            this.page.waitForURL(/\/profile/, { timeout }),
            this.invalidCredentialsMessage.waitFor({
                state: 'visible',
                timeout
            }),
            this.loginButton.waitFor({
                state: 'visible',
                timeout
            })
        ]);

    }
}
