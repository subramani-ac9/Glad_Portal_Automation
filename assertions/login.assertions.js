import { expect } from "@playwright/test";

export const loginAssertions = {

  required_email: {
    scope: "page",
    fn: async ({ loginPage }) => {
      await expect(loginPage.emailError).toBeVisible();
    },
  },

  required_password: {
    scope: "page",
    fn: async ({ loginPage }) => {
      await expect(loginPage.passwordError).toBeVisible();
    },
  },

  error_msg: {
    scope: "page",
    fn: async ({ loginPage }) => {
      await expect(loginPage.error_msg).toBeVisible();
    },
  },

  invalidEmailError: {
    scope: "page",
    fn: async ({ loginPage }) => {
      await expect(loginPage.invalidEmailError).toBeVisible();
    },
  },


};
