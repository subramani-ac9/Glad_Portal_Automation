import { expect } from "@playwright/test";
import { LiveDarshanLocators } from "../locators/LiveDarshanLocators";

export const LiveDarshanAssertions = {
  // 🔹 PAGE LEVEL ASSERTIONS
  LD_AOLIcon_dashboard: {
    scope: "page",
    fn: async ({ liveDarshanPage }) => {
      await expect(liveDarshanPage.aolIcon).toBeVisible();
    },
  },

  LD_title_visible: {
    scope: "page",
    fn: async ({ liveDarshanPage }) => {
      await expect(liveDarshanPage.title).toBeVisible();
    },
  },

   LD_create_success_msg: {
    scope: "page",
    fn: async ({ liveDarshanPage }) => {
      await expect(liveDarshanPage.toasts).toContainText("Success");
      await expect(liveDarshanPage.toasts).toContainText(
        "Live darshan created successfully",
      );
    },
  },

   LD_update_success_msg: {
    scope: "page",
    fn: async ({ liveDarshanPage }) => {
      await expect(liveDarshanPage.toasts).toContainText("Success");
      await expect(liveDarshanPage.toasts).toContainText(
        "Live darshan updated successfully",
      );
    },
  },

  LD_delete_success_msg: {
    scope: "page",
    fn: async ({ liveDarshanPage }) => {
      await expect(liveDarshanPage.toasts).toContainText("Success");
      await expect(liveDarshanPage.toasts).toContainText(
        "Live darshan deleted successfully",
      );
    },
  },

  LD_meetingUrl_required_error: {
    scope: "page",
    fn: async ({ liveDarshanPage }) => {
      await expect(liveDarshanPage.meetingUrlRequiredError).toBeVisible();
    },
  },

  LD_invalid_meetingUrl_error: {
    scope: "page",
    fn: async ({ liveDarshanPage }) => {
      await expect(liveDarshanPage.invalidmeetingUrlError).toBeVisible();
    },
  },

  LD_date_required_error: {
    scope: "page",
    fn: async ({ liveDarshanPage }) => {
      await expect(liveDarshanPage.dateRequiredError).toBeVisible();
    },
  },

  LD_startTime_required_error: {
    scope: "page",
    fn: async ({ liveDarshanPage }) => {
      await expect(liveDarshanPage.startTimeRequiredError).toBeVisible();
    },
  },

  LD_invalid_startTime_error: {
    scope: "page",
    fn: async ({ liveDarshanPage }) => {
      await expect(liveDarshanPage.invalidStartTimeError).toBeVisible();
    },
  },
  LD_paststartTime_error: {
    scope: "page",
    fn: async ({ liveDarshanPage }) => {
      await expect(liveDarshanPage.PastStartTimeError).toBeVisible();
    },
  },

  LD_update_disabled_error: {
    scope: "page",
    fn: async ({ liveDarshanPage }) => {
      await expect(liveDarshanPage.updateBtn).toBeDisabled();
    },
  },

  LD_past_date_error: {
    scope: "row",
    fn: async ({ row }) => {
      const dateInput = row.locator(LiveDarshanLocators.date_input);
      expect(await dateInput.evaluate((el) => el.checkValidity())).toBe(false);
    },
  },

  // 🔹 ROW LEVEL ASSERTIONS
  LD_edit_disabled_error: {
    scope: "row",
    fn: async ({ row }) => {
      const editBtn = row.getByAltText("Edit icon");
      await expect(editBtn).toBeDisabled();
    },
  },
};
