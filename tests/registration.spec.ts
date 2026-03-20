import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';

test.describe('Registration Page Functional & Negative Tests', () => {

    // This runs before every single test to ensure a fresh start
    let regPage: RegistrationPage;

    test.beforeEach(async ({ page }) => {
        regPage = new RegistrationPage(page);
        await regPage.goto();
    });

    /**
     * ✅ TASK 3: Positive Scenario
     * User should be able to successfully register with valid data.
     */
    test('Positive - Valid Registration', async ({ page }) => {
        await regPage.fillRegistrationForm('Kuldeep Singh', 'kuldeep@test.com', 'SecurePass123!');
        await regPage.submit();
        
        // Assertion: Validate page title [cite: 69]
        await expect(page).toHaveTitle(/Modern Registration/);
        console.log('Valid Registration test passed!');
    });

    /**
     * ❌ TASK 3: Negative Scenarios
     * Validating error messages for various input failures [cite: 30-37].
     */

    test('Negative - Empty Form Submission', async () => {
        await regPage.submit();
        // Fails because the HTML is missing validation logic
        await expect(regPage.page.locator('#nameError')).toHaveText('Name is required');
    });

    test('Negative - Invalid Email Format', async () => {
        await regPage.emailInput.fill('invalid-email-no-at');
        await regPage.submit();
        await expect(regPage.emailError).toHaveText('Please enter a valid email address');
    });

    test('Negative - Password Mismatch', async () => {
        await regPage.passwordInput.fill('Pass123!');
        await regPage.confirmPasswordInput.fill('Pass456!');
        await regPage.submit();
        await expect(regPage.page.locator('#confirmPasswordError')).toHaveText('Passwords do not match');
    });

    test('Negative - Short Phone Number', async () => {
        await regPage.page.locator('#phone').fill('12345');
        await regPage.submit();
        await expect(regPage.page.locator('#phoneError')).toHaveText('Phone number must be at least 10 digits');
    });

    test('Negative - Terms & Conditions Not Checked', async () => {
        await regPage.nameInput.fill('Kuldeep');
        // We skip checking the box intentionally
        await regPage.submit();
        await expect(regPage.page.locator('#termsError')).toHaveText('You must agree to the terms');
    });
});