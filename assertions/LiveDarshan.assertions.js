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
  create_edit_success_msg: async ({ liveDarshanPage }) => {
    await expect(liveDarshanPage.createEditSuccessMsg).toBeVisible();
  },

  // 🔹 Delete Live Darshan
  darshan_deleted: async ({ liveDarshanPage }) => {
    await expect(liveDarshanPage.videoIcon).not.toBeVisible();
  },

  // 🔹 Validation Errors
  meeting_url_error: async ({ liveDarshanPage }) => {
    await expect(liveDarshanPage.meetingUrlError).toBeVisible();
  },

  update_meeting_url_error: async ({ liveDarshanPage }) => {
    await expect(liveDarshanPage.updateMeetingUrlError).toBeVisible();
  },

  date_error: async ({ liveDarshanPage }) => {
    await expect(liveDarshanPage.dateError).toBeVisible();
  },

  update_start_time_error: async ({ liveDarshanPage }) => {
    await expect(liveDarshanPage.updateStartTimeError).toBeVisible();
  },

  start_time_error: async ({ liveDarshanPage }) => {
    await expect(liveDarshanPage.startTimeError).toBeVisible();
  },

  // 🔹 Popup validation
  create_popup_opened: async ({ liveDarshanPage }) => {
    await expect(liveDarshanPage.popupTitle).toBeVisible();
  },
  edit_disabled: async ({ liveDarshanPage }) => {
    await expect(liveDarshanPage.editIcon).toBeDisabled();
  },
};
