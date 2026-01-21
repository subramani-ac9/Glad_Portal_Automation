import { expect } from "@playwright/test";

export const LiveDarshanAssertions = {
  // 🔹 Dashboard / Page Load
  AOL_icon_dashboard: async ({ liveDarshanPage }) => {
    await expect(liveDarshanPage.aolIcon).toBeVisible();
  },

  live_darshan_title_visible: async ({ liveDarshanPage }) => {
    await expect(liveDarshanPage.title).toBeVisible();
  },
  // 🔹 Create Live Darshan
  create_edit_delete_success_msg: async ({ liveDarshanPage }) => {
    await expect(liveDarshanPage.createEditDeleteSuccessMsg).toBeVisible();
  },
  // 🔹 Validation Errors
  meetingUrl_required_error: async ({ liveDarshanPage }) => {
    await expect(liveDarshanPage.meetingUrlRequiredError).toBeVisible();
  },

  invalid_meetingUrl_error: async ({ liveDarshanPage }) => {
    await expect(liveDarshanPage.invalidmeetingUrlError).toBeVisible();
  },

  date_required_error: async ({ liveDarshanPage }) => {
    await expect(liveDarshanPage.dateRequiredError).toBeVisible();
  },

  startTime_required_error: async ({ liveDarshanPage }) => {
    await expect(liveDarshanPage.startTimeRequiredError).toBeVisible();
  },

  invalid_startTime_error: async ({ liveDarshanPage }) => {
    await expect(liveDarshanPage.invalidStartTimeError).toBeVisible();
  },

  // 🔹 Popup validation
  create_popup_opened: async ({ liveDarshanPage }) => {
    await expect(liveDarshanPage.popupTitle).toBeVisible();
  },
  edit_disabled: async ({ liveDarshanPage }) => {
    await expect(liveDarshanPage.editIcon).toBeDisabled();
  },

  update_disabled :async ({ liveDarshanPage }) => {
    await expect(liveDarshanPage.updateBtn).toBeDisabled();
  },

};
