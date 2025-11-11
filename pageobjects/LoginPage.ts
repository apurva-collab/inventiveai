import { expect, Page, Locator } from '@playwright/test';


export class LoginPage {
  readonly page: Page;
  readonly xpath_usernameInput: Locator;
  readonly xpath_passwordInput: Locator;
  readonly xpath_continueButton: Locator;
  readonly xpath_signInButton: Locator;
  readonly xpath_projectButton: Locator;
  readonly xpath_deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators
    this.xpath_usernameInput = page.getByRole('textbox', { name: 'Email' });
    this.xpath_passwordInput = page.locator('input[type="password"]');
    this.xpath_continueButton = page.getByRole('button', { name: 'Continue' });
    this.xpath_signInButton = page.getByRole('button', { name: 'Sign in' });
    this.xpath_projectButton = page.getByRole('button', { name: 'New Project' });
    this.xpath_deleteButton = page.getByRole('button', { name: 'Delete' });
  }

  /** Navigate to the app URL */

  async goto() {
    const url = process.env.BASE_URL;
    if (!url) {
        throw new Error('BASE_URL is not defined in the environment variables');
    }
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
}

 
async enterUsername(username: string) {
  await this.xpath_usernameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.xpath_usernameInput.fill(username);
}

async enterPassword(password: string) {
    await this.xpath_passwordInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.xpath_passwordInput.fill(password);
}

async clickContinueButton() {
    await this.xpath_continueButton.click();
    // Wait for potential navigation or password field to appear after clicking Continue
    await this.page.waitForLoadState('domcontentloaded');
}

async clickSignInButton() {
    await this.xpath_signInButton.click();
}


  /** Login with valid credentials */
  async login(username : string, password: string) {
    await this.enterUsername(username);
    await this.clickContinueButton();
    await this.enterPassword(password);
    await this.clickSignInButton();
  }

  /** Validate successful login */

  async validateLoginSuccess() {
    // Assertion to verify login
      await expect(this.page).toHaveURL(/projects/, { timeout: 50000 });
  }

  /** Login with invalid credentials */
  async validateInvalidLogin() {
    await expect(this.page.getByText('Invalid email or password')).toBeVisible({ timeout: 5000 });
  }

  /** Login with blank fields */

  async validateBlankLogin() {
    await expect(this.page.getByText('Please enter your password')).toBeVisible({ timeout: 5000 });
  }

}
