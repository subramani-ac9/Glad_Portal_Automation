import { expect } from '@playwright/test';

export const loginAssertions = {
  required_email: async ({ loginPage }) => {
    
    await expect(loginPage.emailError).toBeVisible();
  },

  required_password: async ({ loginPage }) => {
    await expect(loginPage.passwordError).toBeVisible();
  },

  error_msg: async ({ loginPage }) => {
    await expect(loginPage.error_msg).toBeVisible();
  },
  invalidEmailError:async({loginPage})=>{
    await expect(loginPage.invalidEmailError).toBeVisible();
  }
};
