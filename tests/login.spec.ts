import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { allUsers } from '../data/users';

test.describe('Login screen', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('displays login form', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await expect(loginPage.welcomeHeading).toBeVisible();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
  });

  test('shows validation errors for blank credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.submitEmptyForm();

    await expect(page.getByText('Username is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
  });

  for (const user of allUsers) {
    test(`${user.role} user login outcome`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.loginAs(user);
    });
  }
});
