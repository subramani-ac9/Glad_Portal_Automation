import { expect } from "@playwright/test";

export const ProductAssertions = {
  PROD_title_visible: {
    scope: "page",
    fn: async ({ productPage }) => {
      await expect(productPage.title).toBeVisible();
    },
  },

  PROD_ComparativeMinimumDays_error: {
    scope: "page",
    fn: async ({ productPage }) => {
      await expect(
        productPage.CreatePopUpComparativeMinimumDaysError,
      ).toBeVisible();
    },
  },

  PROD_ComparativeMinimumMinutes_error: {
    cope: "page",
    fn: async ({ productPage }) => {
      await expect(
        productPage.CreatePopUpComparativeMinimumMinutesError,
      ).toBeVisible();
    },
  },

  //---------------minimum values for min and max -----------------//

  PROD_MinimumvalueIn_Mindays_error: {
    cope: "page",
    fn: async ({ productPage }) => {
      await expect(
        productPage.CreatePopUpMinimumvalueIn_MindaysError,
      ).toBeVisible();
    },
  },
  PROD_MinimumvalueIn_Maxdays_error: {
    cope: "page",
    fn: async ({ productPage }) => {
      await expect(
        productPage.CreatePopUpMinimumvalueIn_MaxdaysError,
      ).toBeVisible();
    },
  },
  PROD_MinimumvalueIn_MinMinutes_error: {
    cope: "page",
    fn: async ({ productPage }) => {
      await expect(
        productPage.CreatePopUpMinimumvalueIn_MinMinutesError,
      ).toBeVisible();
    },
  },
  PROD_MinimumvalueIn_MaxMinutes_error: {
    cope: "page",
    fn: async ({ productPage }) => {
      await expect(
        productPage.CreatePopUpMinimumvalueIn_MaxMinutesError,
      ).toBeVisible();
    },
  },

  //-----------------------------------//

  PROD_MaximumMinitesValues_error: {
    cope: "page",
    fn: async ({ productPage }) => {
      await expect(productPage.CreatePopupMaximumMinitesError).toBeVisible();
    },
  },

  PROD_MinimumMinutesValues_error: {
    cope: "page",
    fn: async ({ productPage }) => {
      await expect(productPage.CreatePopUpMinimumMinutesError).toBeVisible();
    },
  },

  PROD_MaximumCapacityMax_error: {
    cope: "page",
    fn: async ({ productPage }) => {
      await expect(
        productPage.CreatePopUpMaximumCapacityMaxError,
      ).toBeVisible();
    },
  },

  PROD_MaximumCapacityMin_error: {
    cope: "page",
    fn: async ({ productPage }) => {
      await expect(
        productPage.CreatePopUpMaximumCapacityMinError,
      ).toBeVisible();
    },
  },

  PROD_TitleRequired_error: {
    cope: "page",
    fn: async ({ productPage }) => {
      await expect(productPage.CreatePopTitleRequiredError).toBeVisible();
    },
  },

  PROD_title_maximum_error: {
    scope: "page",
    fn: async ({ productPage }) => {
      await expect(productPage.CreatePopTitleInput_Maximum_Error).toBeVisible();
    },
  },

  PROD_thumbnailURL_maximum_error: {
    scope: "page",
    fn: async ({ productPage }) => {
      await expect(
        productPage.CreatePopThumbnailURL_Maximum_Error,
      ).toBeVisible();
    },
  },

  PROD_ThumbnailURL_invalid_error: {
    scope: "page",
    fn: async ({ productPage }) => {
      await expect(
        productPage.CreatePopThumbnailURL_invalid_Error,
      ).toBeVisible();
    },
  },

  PROD_title_already_existing_error: {
    scope: "page",
    fn: async ({ productPage }) => {
      await expect(productPage.toasts).toContainText("Error");
      await expect(productPage.toasts).toContainText(
        "Product with title already exists",
      );
    },
  },

  // ------------------ toast ---------------

  PROD_create_success_msg: {
    scope: "page",
    fn: async ({ productPage }) => {
      await expect(productPage.toasts).toContainText("Success");
      await expect(productPage.toasts).toContainText(
        "Product created successfully",
      );
    },
  },

  PROD_update_success_msg: {
    scope: "page",
    fn: async ({ productPage }) => {
      await expect(productPage.toasts).toContainText("Success");
      await expect(productPage.toasts).toContainText(
        "Product updated successfully",
      );
    },
  },
};
