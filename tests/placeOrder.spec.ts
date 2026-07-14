import { test, expect } from '@playwright/test';


//place a single product order
test('test', async ({ page }) => {
  await page.goto('https://qademo.com/');
  await page.getByTestId('navbar-signin-link').getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL('/login');

  await page.getByTestId('username-input').fill('standard_user');
  
  await page.getByTestId('password-input').fill('standard123');

  await page.getByTestId('login-submit-button').click();
  await expect(page).toHaveURL('/catalog');

  await page.getByTestId('product-add-to-cart-3').click();

  await page.getByTestId('navbar-cart-link').click();
  await expect(page).toHaveURL('/cart');

  await page.getByTestId('proceed-to-checkout-button').click();
  await expect(page).toHaveURL('/checkout');

  await page.getByTestId('checkout-first-name').click();
  await page.getByTestId('checkout-first-name').fill('testuser');  
  await page.getByTestId('checkout-last-name').fill('sura'); 
  await page.getByTestId('checkout-address').fill('123, church road, nottingam');  
  await page.getByTestId('checkout-card-number').fill('4242 4242 4242 4242');  
  await page.getByTestId('checkout-expiry').fill('07/14');  
  await page.getByTestId('checkout-cvv').fill('123');  
  await page.getByTestId('checkout-cardholder-name').fill('sura test1');
  await page.getByTestId('place-order-button').click();
  await page.waitForTimeout(1000);
  const pageUrl = page.url();
  await expect(page).toHaveURL(pageUrl);
  console.log(pageUrl);  

  await page.getByTestId("order-confirmation-number").isVisible();
  const orderId = await page.getByTestId("order-confirmation-number").textContent();
  console.log(orderId);
  
});