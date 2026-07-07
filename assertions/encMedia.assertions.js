import { expect } from "@playwright/test";

export const EncMediaAssertions = {

  EncMedia_title_visible: {
    scope: "page",
    fn: async ({ encMediaPage }) => {
      await expect(encMediaPage.title).toBeVisible();
    },
  },

  // ------------------ toast ---------------
 ENC_create_success_msg: {
    scope: "page",
    fn: async ({ encMediaPage }) => {
      await expect(encMediaPage.toasts).toContainText("Success");
      await expect(encMediaPage.toasts).toContainText(
        "Resource created successfully",
      );
    },
  },

  ENC_update_success_msg: {
    scope: "page",
    fn: async ({ encMediaPage }) => {
      await expect(encMediaPage.toasts).toContainText("Success");
      await expect(encMediaPage.toasts).toContainText(
        "Resource updated successfully",
      );
    },
  },

  ENC_delete_success_msg: {
    scope: "page",
    fn: async ({ encMediaPage }) => {
      await expect(encMediaPage.toasts).toContainText("Success");
      await expect(encMediaPage.toasts).toContainText(
        "Resource deleted successfully",
      );
    },
  },

  ENC_title_already_existing_error: {
    scope: "page",
    fn: async ({ encMediaPage }) => {
      await expect(encMediaPage.toasts).toContainText("Error");
      await expect(encMediaPage.toasts).toContainText("Encrypted media already exists");
    },
  },

  ENC_media_notFound_error: {
    scope: "page",
    fn: async ({ encMediaPage }) => {
      await expect(encMediaPage.toasts).toContainText("Error");
      await expect(encMediaPage.toasts).toContainText("Encrypted media file not found in S3 storage");
    },

  },


  ////////////////////

  ENC_title_required_error: {
    scope: "page",
    fn: async ({ encMediaPage }) => {
      await expect(encMediaPage.CreatePopTitle_RequiredError).toBeVisible();
    },
  },

  ENC_mediaSize_required_error: {
    scope: "page",
    fn: async ({ encMediaPage }) => {
      await expect(encMediaPage.CreatePopTitle_RequiredError).toBeVisible();
    },
  },

  ENC_mediaURL_required_error: {
    scope: "page",
    fn: async ({ encMediaPage }) => {
      await expect(encMediaPage.CreatePopMediaURLRequiredError).toBeVisible();
    },
  },

  ENC_duration_required_error: {
    scope: "page",
    fn: async ({ encMediaPage }) => {
      await expect(encMediaPage.CreatePopDurationRequiredError).toBeVisible();
    },
  },

  ENC_ProductName_required_error: {
    scope: "page",
    fn: async ({ encMediaPage }) => {
      await expect(encMediaPage.CreatePopProductNameRequiredError).toBeVisible();
    },
  },

  ENC_DecryptionAlgorithm_required_error: {
    scope: "page",
    fn: async ({ encMediaPage }) => {
      await expect(encMediaPage.CreatePopDecryptionAlgorithmRequiredError).toBeVisible();
    },
  },

  ENC_nonce_required_error: {
    scope: "page",
    fn: async ({ encMediaPage }) => {
      await expect(encMediaPage.CreatePopNonceRequiredError).toBeVisible();
    },
  },

  ENC_title_maximum_error: {
    scope: "page",
    fn: async ({ encMediaPage }) => {
      await expect(encMediaPage.CreatePopTitleInput_Maximum_Error).toBeVisible();
    },
  },


  ENC_mediaSize_maximum_error: {
    scope: "page",
    fn: async ({ encMediaPage }) => {
      await expect(encMediaPage.CreatePopMediaSize_Maximum_Error).toBeVisible();
    },
  },


  ENC_mediaSize_minimum_error: {
    scope: "page",
    fn: async ({ encMediaPage }) => {
      await expect(encMediaPage.CreatePopMediaSize_Minimum_Error).toBeVisible();
    },
  },


  ENC_mediaURL_maximum_error: {
    scope: "page",
    fn: async ({ encMediaPage }) => {
      await expect(encMediaPage.CreatePopMediaURL_Maximum_Error).toBeVisible();
    },
  },


  ENC_duration_maximum_error: {
    scope: "page",
    fn: async ({ encMediaPage }) => {
      await expect(encMediaPage.CreatePopDuration_Maximum_Error).toBeVisible();
    },
  },


  ENC_thumbnailURL_maximum_error: {
    scope: "page",
    fn: async ({ encMediaPage }) => {
      await expect(encMediaPage.CreatePopThumbnailURL_Maximum_Error).toBeVisible();
    },
  },


  ENC_invalid_mediaURL_error: {
    scope: "page",
    fn: async ({ encMediaPage }) => {
      await expect(encMediaPage.CreatePopMediaURL_invalid_Error).toBeVisible();
    },
  },



  ENC_multipleDeleteSuccessMsg: {
    scope: "page",
    fn: async ({ encMediaPage }) => {
      await expect(encMediaPage.toasts).toContainText("Selected resources deleted successfully");
    }
  }


};