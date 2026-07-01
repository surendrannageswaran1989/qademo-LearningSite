import { expect, Locator, Page } from '@playwright/test';
import { TestUser } from '../data/users';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly welcomeHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Enter your username');
    this.passwordInput = page.getByPlaceholder('Enter your password');
    this.submitButton = page.getByTestId('login-submit-button');
    this.welcomeHeading = page.getByRole('heading', { name: 'Welcome Back' });
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async submitEmptyForm() {
    await this.submitButton.click();
  }

  async loginAs(user: TestUser) {
    await this.login(user.username, user.password);

    if (user.shouldLoginSucceed) {
      await expect(this.page).toHaveURL(user.expectedUrl!);
    } else {
      await expect(this.page).toHaveURL(/login/);
      await expect(this.page.getByText(user.expectedError!)).toBeVisible();
    }
  }
}
