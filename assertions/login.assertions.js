import { expect } from '@playwright/test';

export const loginAssertions = {
  required_email: async ({ loginPage }) => {
    // await loginPage.emailError.waitFor({ state: 'visible', timeout: 100000 });
    await expect(loginPage.emailError).toBeVisible();
  },

  required_password: async ({ loginPage }) => {
    await expect(loginPage.passwordError).toBeVisible();
  },

  error_msg: async ({ loginPage }) => {
    await expect(loginPage.passwordError).toBeVisible();
  }
};
