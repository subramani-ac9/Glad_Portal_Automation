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

  create_edit_delete_successMsg: {
    scope: "page",
    fn: async ({ EncMediapage }) => {
      await expect(EncMediapage.create_edit_delete_success_msg).toBeVisible();
    },
  },

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








};