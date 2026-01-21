import { expect } from "@playwright/test";
import { LiveDarshanLocators } from "../locators/LiveDarshanLocators";
import { findRowAndAction, toInputDateFormat } from "../utils/dateUtils";

export class LiveDarshanPage {
  constructor(page) {
    this.page = page;
    // Header
    this.aolIcon = page.locator(LiveDarshanLocators.aolIcon);
    this.title = page.locator(LiveDarshanLocators.title);

    // Buttons
    this.createNewBtn = page.getByText(LiveDarshanLocators.create_new_btn);
    this.refreshBtn = page.locator(LiveDarshanLocators.refresh_btn);
    this.editIcon = page.getByAltText(LiveDarshanLocators.edit_icon).first();
    this.deleteIcon = page
      .getByAltText(LiveDarshanLocators.delete_icon)
      .first();
    this.videoIcon = page.getByAltText(LiveDarshanLocators.video_icon).first();

    // Form
    this.createPopupTitle = page.getByText(
      LiveDarshanLocators.create_popup_title,
    );
    this.updatePopupTitle = page
      .getByText(LiveDarshanLocators.update_popup_title)
      .first();
    this.quickScheduleInput = page.getByRole("textbox", {
      name: "Quick Schedule",
    });
    this.dateInput = page.locator(LiveDarshanLocators.date_input);
    this.startTimeInput = page.locator(LiveDarshanLocators.start_time_input);
    this.timezoneInput = page.getByLabel(LiveDarshanLocators.timezone_input);
    this.meetingUrlInput = page.locator(LiveDarshanLocators.meeting_url_input);
    this.autoZoomCheckbox = page.locator(
      LiveDarshanLocators.auto_zoom_checkbox,
    );

    // Actions

    this.createBtn = page.getByRole("button", { name: "Create Live darshan" });
    this.updateBtn = page.getByRole("button", { name: "Update Live darshan" });
    this.cancelBtnX = page.locator(LiveDarshanLocators.cancel_btnX);
    this.deletecancelBtn = page
      .locator("button")
      .filter({ hasText: "Cancel" })
      .first();

    // Errors
    this.meetingUrlRequiredError = page.getByText("Meeting URL is required", {
      exact: true,
    });
    this.dateRequiredError = page.getByText("Date is required", {
      exact: true,
    });
    this.startTimeRequiredError = page.getByText("Start time is required", {
      exact: true,
    });
    this.invalidStartTimeError = page.getByText(
      "Please select future time for today",
      { exact: true },
    );
    this.invalidmeetingUrlError = page.getByText(/valid Zoom meeting URL/i);

    this.createEditDeleteSuccessMsg = page.locator(
      LiveDarshanLocators.create_edit_delete_success_msg,
    );
  }

  async handleInput(locator, value) {
    // 1️⃣ Skip null → no update
    if (value === null || value === undefined) {
      return false;
    }

    const existingValue = await locator.inputValue();

    // 2️⃣ Excel empty
    if (value === "") {
      // UI empty or auto-filled → no change
      return false;
    }

    // 3️⃣ Same value → no change
    if (existingValue === value) {
      return false;
    }

    // 4️⃣ Value different → update
    await locator.fill(value);
    return true; // ✅ CHANGED
  }

  async openCreatePopup() {
    await this.createNewBtn.click();
    await this.createPopupTitle.waitFor({ state: "visible" });
  }

  async refreshList() {
    await this.refreshBtn.click();
  }

  // ======================================================
  // 🔹 CREATE
  // ======================================================

  // async createLiveDarshan(data) {
  //   await this.openCreatePopup();

  //   await this.handleInput(this.quickScheduleInput, data.quick_schedule);

  //   const formattedDate = toInputDateFormat(data.date);
  //   if (formattedDate) {
  //     await this.handleInput(this.dateInput, formattedDate);
  //   }

  //   await this.handleInput(this.startTimeInput, data.start_time);
  //   await this.handleInput(this.timezoneInput, data.timezone);

  //   // 🔹 Auto Zoom logic
  //   if (data.auto_zoom === "TRUE") {
  //     // Auto Zoom ON → checkbox checked → meeting URL NOT required
  //     await this.autoZoomCheckbox.check();
  //   } else {
  //     // Auto Zoom OFF → meeting URL required
  //     await this.autoZoomCheckbox.uncheck();
  //     await this.handleInput(this.meetingUrlInput, data.meeting_url);
  //   }

  //   await this.createBtn.click();

  //   await findRowAndAction(this.page, data, "assertPresent");
  // }

  async createLiveDarshan(data, isErrorCase = false) {
    await this.openCreatePopup();

    await this.handleInput(this.quickScheduleInput, data.quick_schedule);

    const formattedDate = toInputDateFormat(data.date);
    if (formattedDate) {
      await this.handleInput(this.dateInput, formattedDate);
    }

    await this.handleInput(this.startTimeInput, data.start_time);
    await this.handleInput(this.timezoneInput, data.timezone);

    if (data.auto_zoom === "TRUE") {
      await this.autoZoomCheckbox.check();
    } else {
      await this.autoZoomCheckbox.uncheck();
      await this.handleInput(this.meetingUrlInput, data.meeting_url);
    }

    await this.createBtn.click();

    // 🚫 ERROR CASE → DO NOT SEARCH TABLE
    if (isErrorCase) {
      return;
    }

    // ✅ SUCCESS CASE → VERIFY ROW EXISTS
    await findRowAndAction(this.page, data, "assertPresent");
  }

  // ======================================================
  // 🔹 UPDATE
  // ======================================================

  async updateLiveDarshan(data, isErrorCase = false) {
    // 1️⃣ Find row and click EDIT
    await findRowAndAction(this.page, data, "edit");

    await this.updatePopupTitle.waitFor({ state: "visible" });

    let isUpdated = false;

    // 2️⃣ Try updating fields
    const formattedDate = toInputDateFormat(data.UpdateDate);
    if (formattedDate) {
      isUpdated ||= await this.handleInput(this.dateInput, formattedDate);
    }

    isUpdated ||= await this.handleInput(
      this.startTimeInput,
      data.UpdateStart_time,
    );

    isUpdated ||= await this.handleInput(
      this.timezoneInput,
      data.UpdateTimezone,
    );

    isUpdated ||= await this.handleInput(
      this.meetingUrlInput,
      data.UpdateMeeting_url,
    );

    // 🔸 CASE 1: NOTHING CHANGED → Update disabled
    if (!isUpdated) {
      await expect(this.updateBtn).toBeDisabled();
      return; // ⛔ STOP → no table verification
    }

    // 🔸 CASE 2: CHANGE EXISTS
    await expect(this.updateBtn).toBeEnabled();
    await this.updateBtn.click();

    // 🔸 CASE 3: ERROR EXPECTED → STOP
    if (isErrorCase) {
      return;
    }

    // 🔸 CASE 4: SUCCESS → VERIFY UPDATED ROW
    await findRowAndAction(
      this.page,
      {
        date: data.UpdateDate ?? data.date,
        start_time: data.UpdateStart_time ?? data.start_time,
        timezone: data.UpdateTimezone ?? data.timezone,
      },
      "assertPresent",
    );
  }

  // ======================================================
  // 🔹 DELETE
  // ======================================================

  async deleteLiveDarshan(data, isErrorCase = false) {
    // 1️⃣ Find row and click DELETE
    await findRowAndAction(this.page, data, "delete");

    // 2️⃣ Confirm delete
    await this.page
      .locator("button")
      .filter({ hasText: "Yes,delete" })
      .last()
      .click();

    // 🔸 ERROR CASE (if any validation later)
    if (isErrorCase) {
      return;
    }

    // 3️⃣ VERIFY ROW IS GONE
    await findRowAndAction(this.page, data, "assertNotPresent");
  }
}
