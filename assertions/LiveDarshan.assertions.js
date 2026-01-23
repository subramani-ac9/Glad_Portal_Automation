import { expect } from "@playwright/test";
import { LiveDarshanLocators } from "../locators/LiveDarshanLocators";

export const LiveDarshanAssertions = {
  // 🔹 PAGE LEVEL ASSERTIONS
  AOL_icon_dashboard: {
    scope: "page",
    fn: async ({ liveDarshanPage }) => {
      await expect(liveDarshanPage.aolIcon).toBeVisible();
    },
  },

  live_darshan_title_visible: {
    scope: "page",
    fn: async ({ liveDarshanPage }) => {
      await expect(liveDarshanPage.title).toBeVisible();
    },
  },

  create_edit_delete_success_msg: {
    scope: "page",
    fn: async ({ liveDarshanPage }) => {
      await expect(liveDarshanPage.createEditDeleteSuccessMsg).toBeVisible();
    },
  },

  meetingUrl_required_error: {
    scope: "page",
    fn: async ({ liveDarshanPage }) => {
      await expect(liveDarshanPage.meetingUrlRequiredError).toBeVisible();
    },
  },

  invalid_meetingUrl_error: {
    scope: "page",
    fn: async ({ liveDarshanPage }) => {
      await expect(liveDarshanPage.invalidmeetingUrlError).toBeVisible();
    },
  },

  date_required_error: {
    scope: "page",
    fn: async ({ liveDarshanPage }) => {
      await expect(liveDarshanPage.dateRequiredError).toBeVisible();
    },
  },

  startTime_required_error: {
    scope: "page",
    fn: async ({ liveDarshanPage }) => {
      await expect(liveDarshanPage.startTimeRequiredError).toBeVisible();
    },
  },

  invalid_startTime_error: {
    scope: "page",
    fn: async ({ liveDarshanPage }) => {
      await expect(liveDarshanPage.invalidStartTimeError).toBeVisible();
    },
  },
  paststartTime_error: {
    scope: "page",
    fn: async ({ liveDarshanPage }) => {
      await expect(liveDarshanPage.PastStartTimeError).toBeVisible();
    },
  },

  update_disabled_error: {
    scope: "page",
    fn: async ({ liveDarshanPage }) => {
      await expect(liveDarshanPage.updateBtn).toBeDisabled();
    },
  },

  past_date_error: {
    scope: "row",
    fn: async ({ row }) => {
      const dateInput = row.locator(LiveDarshanLocators.date_input);
      expect(await dateInput.evaluate((el) => el.checkValidity())).toBe(false);
    },
  },

  // 🔹 ROW LEVEL ASSERTIONS
  edit_disabled_error: {
    scope: "row",
    fn: async ({ row }) => {
      const editBtn = row.getByAltText("Edit icon");
      await expect(editBtn).toBeDisabled();
    },
  },
};
