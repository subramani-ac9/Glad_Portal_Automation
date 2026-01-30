import { EncMediapage } from './../pages/EncMediaPage';


export const EncMediaAssertions = {
  AOL_icon_dashboard: {
    scope: "page",
    fn: async ({ EncMediapage }) => {
      await expect(EncMediapage.aolIcon).toBeVisible();
    },
  },

  EncMedia_title_visible: {
    scope: "page",
    fn: async ({ EncMediapage }) => {
      await expect(EncMediapage.title).toBeVisible();
    },
  },

  // ------------------ toast ---------------

  create_edit_delete_successMsg: {
    scope: "page",
    fn: async ({ EncMediapage }) => {
      await expect(EncMediapage.toasts).toContainText("Success");
    },
  },
  title_already_existing_error: {
    scope: "page",
    fn: async ({ EncMediapage }) => {
      await expect(EncMediapage.toasts).toContainText("Error");
      await expect(EncMediapage.toasts).toContainText("Encrypted media already exists");
    },
  },

  media_notFound_error: {
    scope: "page",
    fn: async ({ EncMediapage }) => {
      await expect(EncMediapage.toasts).toContainText("Error");
      await expect(EncMediapage.toasts).toContainText("Encrypted media file not found in S3 storage");
    },

  },


  ////////////////////

  title_required_error: {
    scope: "page",
    fn: async ({ EncMediapage }) => {
      await expect(EncMediapage.CreatePopTitle_RequiredError).toBeVisible();
    },
  },

  mediaSize_required_error: {
    scope: "page",
    fn: async ({ EncMediapage }) => {
      await expect(EncMediapage.CreatePopTitle_RequiredError).toBeVisible();
    },
  },

  mediaURL_required_error: {
    scope: "page",
    fn: async ({ EncMediapage }) => {
      await expect(EncMediapage.CreatePopMediaURLRequiredError).toBeVisible();
    },
  },

  duration_required_error: {
    scope: "page",
    fn: async ({ EncMediapage }) => {
      await expect(EncMediapage.CreatePopDurationRequiredError).toBeVisible();
    },
  },

  ProductName_required_error: {
    scope: "page",
    fn: async ({ EncMediapage }) => {
      await expect(EncMediapage.CreatePopProductNameRequiredError).toBeVisible();
    },
  },

  DecryptionAlgorithm_required_error: {
    scope: "page",
    fn: async ({ EncMediapage }) => {
      await expect(EncMediapage.CreatePopDecryptionAlgorithmRequiredError).toBeVisible();
    },
  },

  nonce_required_error: {
    scope: "page",
    fn: async ({ EncMediapage }) => {
      await expect(EncMediapage.CreatePopNonceRequiredError).toBeVisible();
    },
  },

  title_maximum_error: {
    scope: "page",
    fn: async ({ EncMediapage }) => {
      await expect(EncMediapage.CreatePopTitleInput_Maximum_Error).toBeVisible();
    },
  },


  mediaSize_maximum_error: {
    scope: "page",
    fn: async ({ EncMediapage }) => {
      await expect(EncMediapage.CreatePopMediaSize_Maximum_Error).toBeVisible();
    },
  },


  mediaSize_minimum_error: {
    scope: "page",
    fn: async ({ EncMediapage }) => {
      await expect(EncMediapage.CreatePopMediaSize_Minimum_Error).toBeVisible();
    },
  },


  mediaURL_maximum_error: {
    scope: "page",
    fn: async ({ EncMediapage }) => {
      await expect(EncMediapage.CreatePopMediaURL_Maximum_Error).toBeVisible();
    },
  },


  duration_maximum_error: {
    scope: "page",
    fn: async ({ EncMediapage }) => {
      await expect(EncMediapage.CreatePopDuration_Maximum_Error).toBeVisible();
    },
  },


  thumbnailURL_maximum_error: {
    scope: "page",
    fn: async ({ EncMediapage }) => {
      await expect(EncMediapage.CreatePopThumbnailURL_Maximum_Error).toBeVisible();
    },
  },


  invalid_mediaURL_error: {
    scope: "page",
    fn: async ({ EncMediapage }) => {
      await expect(EncMediapage.CreatePopMediaURL_invalid_Error).toBeVisible();
    },
  },



  multipleDeleteSuccessMsg: {
    scope: "page",
    fn: async ({ EncMediapage }) => {
      await expect(EncMediapage.toasts).toContainText("Selected resources deleted successfully");
    }
  }


};