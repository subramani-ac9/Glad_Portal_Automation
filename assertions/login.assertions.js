import { expect } from "@playwright/test";

export const loginAssertions = {

  LOGIN_required_email: {
    scope: "page",
    fn: async ({ loginPage }) => {
      await expect(loginPage.emailError).toBeVisible();
    },
  },

  LOGIN_required_password: {
    scope: "page",
    fn: async ({ loginPage }) => {
      await expect(loginPage.passwordError).toBeVisible();
    },
  },

  LOGIN_error_msg: {
    scope: "page",
    fn: async ({ loginPage }) => {
      await expect(loginPage.error_msg).toBeVisible();
    },
  },

  LOGIN_invalidEmailError: {
    scope: "page",
    fn: async ({ loginPage }) => {
      await expect(loginPage.invalidEmailError).toBeVisible();
    },
  },


};
