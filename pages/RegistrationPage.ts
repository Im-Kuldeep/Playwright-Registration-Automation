import { Page, Locator, expect } from '@playwright/test';

export class RegistrationPage {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly countrySelect: Locator;
    readonly termsCheckbox: Locator;
    readonly registerButton: Locator;
    readonly emailError: Locator;

    constructor(page: Page) {
        this.page = page;
        // In Playwright, we define locators using page.locator()
        this.nameInput = page.locator('#name');
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.confirmPasswordInput = page.locator('#confirmPassword');
        this.countrySelect = page.locator('#country');
        this.termsCheckbox = page.locator('#terms');
        this.registerButton = page.locator('#registerBtn');
        this.emailError = page.locator('#emailError');
    }

    async goto() {
        // This opens your local HTML file
        await this.page.goto(`file://${process.cwd()}/sample_registration.html`);
    }

    async fillRegistrationForm(name: string, email: string, pass: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(pass);
        await this.confirmPasswordInput.fill(pass);
        await this.countrySelect.selectOption('India');
        await this.termsCheckbox.check();
    }

    async submit() {
        await this.registerButton.click();
    }
}