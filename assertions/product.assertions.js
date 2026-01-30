export const EncMediaAssertions = {
  AOL_icon_dashboard: {
    scope: "page",
    fn: async ({ ProductPage }) => {
      await expect(ProductPage.aolIcon).toBeVisible();
    },
  },

  Product_title_visible: {
    scope: "page",
    fn: async ({ ProductPage }) => {
      await expect(ProductPage.title).toBeVisible();
    },
  },

  // ------------------ toast ---------------

  create_edit_delete_successMsg: {
    scope: "page",
    fn: async ({ ProductPage }) => {
      await expect(ProductPage.toasts).toContainText("Success");
    },
  },
}