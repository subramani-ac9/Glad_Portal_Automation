import { expect } from "@playwright/test";

export const ProvidersAssertions = {

  // ------------------ toast ---------------

  Provider_create_successMsg: {
    scope: "page",
    fn: async ({ providerPage }) => {
      await expect(providerPage.toasts).toContainText("Success");
      await expect(providerPage.toasts).toContainText("Provider created successfully");
    },
  },

    Provider_update_successMsg: {
    scope: "page",
    fn: async ({ providerPage }) => {
      await expect(providerPage.toasts).toContainText("Success");
      await expect(providerPage.toasts).toContainText("Provider updated successfully");
    },
  },
};
