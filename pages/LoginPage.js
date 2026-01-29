// pages/LoginPage.js
import { expect } from 'allure-playwright';
import { loginLocators } from '../locators/loginLocators';

export class LoginPage {
  constructor(page) {
    this.page = page;

    this.email = page.locator(loginLocators.emailInput);
    this.password = page.locator(loginLocators.passwordInput);
    this.loginBtn = page.locator(loginLocators.loginButton);
    this.error_msg = page.locator(loginLocators.error_msg);
    this.invalidEmailError = page.locator(loginLocators.invalidEmailError);
    this.emailError = page.locator(loginLocators.emailRequiredError);
    this.passwordError = page.locator(loginLocators.passwordRequiredError);

    this.logoutBtn = page.getByText(loginLocators.logoutBtn);
    this.userIcon = page.locator(loginLocators.userIcon);

  }

  async goto(loc) {
    await this.page.goto('https://dev-portal.ac9ai.com/' + loc);
  }

  async login(username, password) {

    console.log(username, password);
    if (username) await this.email.fill(username);
    if (password) await this.password.fill(password);
    await this.loginBtn.click();
  }

  async logout() {
    await this.userIcon.click();
    await this.logoutBtn.click();

    await this.page.waitForTimeout(5000);
    await expect(this.loginBtn).toBeVisible();
  }
}