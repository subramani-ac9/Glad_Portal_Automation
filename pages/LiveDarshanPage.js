import { expect } from "@playwright/test";
import { LiveDarshanLocators } from "../locators/LiveDarshanLocators";
import { toInputDateFormat } from "../utils/dateUtils";

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
    this.quickScheduleInput = page.locator(
      LiveDarshanLocators.quick_schedule_input,
    );
    this.dateInput = page.locator(LiveDarshanLocators.date_input);
    this.startTimeInput = page.locator(LiveDarshanLocators.start_time_input);
    this.timezoneInput = page.getByLabel(LiveDarshanLocators.timezone_input);
    this.meetingUrlInput = page.locator(LiveDarshanLocators.meeting_url_input);
    this.autoZoomCheckbox = page.locator(
      LiveDarshanLocators.auto_zoom_checkbox,
    );

    // Actions
    
    this.createBtn = page.getByRole('button', { name: 'Create Live Darshan' })
    this.updateBtn = page.locator(LiveDarshanLocators.update_btn);
    this.cancelBtn = page.locator(LiveDarshanLocators.cancel_btn);

    // Errors
    this.meetingUrlError = page.locator(LiveDarshanLocators.meeting_url_error);
    this.dateError = page.locator(LiveDarshanLocators.date_error);
    this.startTimeError = page.locator(LiveDarshanLocators.start_time_error);
    this.updateMeetingUrlError = page.locator(
      LiveDarshanLocators.update_meeting_url_error,
    );
    this.updateStartTimeError = page.locator(
      LiveDarshanLocators.update_start_time_error,
    );

    this.createEditSuccessMsg = page.locator(
      LiveDarshanLocators.create_edit_success_msg,
    );
  }

  async handleInput(locator, value) {
    // 1️⃣ Skip if not applicable
    if (value === null) {
      return;
    }

    // Get current value from UI
    const existingValue = await locator.inputValue();

    // 2️⃣ Excel empty → only act if UI is also empty
    if (value === "") {
      if (existingValue === "") {
        // Both empty → do nothing (expected behavior)
        return;
      } else {
        // UI has auto-filled value → DO NOT overwrite
        return;
      }
    }

    // 3️⃣ Normal value → overwrite safely
    await locator.fill(value);
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

  async createLiveDarshan(data) {
    await this.openCreatePopup();

    await this.handleInput(this.quickScheduleInput, data.quick_schedule);

    const formattedDate = toInputDateFormat(data.date);
    if (formattedDate) {
      await this.handleInput(this.dateInput, formattedDate);
    }

    await this.handleInput(this.startTimeInput, data.start_time);
    await this.handleInput(this.timezoneInput, data.timezone);

    // 🔹 Auto Zoom logic
    if (data.auto_zoom === "TRUE") {
      // Auto Zoom ON → checkbox checked → meeting URL NOT required
      await this.autoZoomCheckbox.check();
    } else {
      // Auto Zoom OFF → meeting URL required
      await this.autoZoomCheckbox.uncheck();
      await this.handleInput(this.meetingUrlInput, data.meeting_url);
    }

    await this.createBtn.click();
  }

  // ======================================================
  // 🔹 UPDATE
  // ======================================================

  async updateLiveDarshan(data) {
    // 🔹 Auto Zoom ON → Edit disabled
    // console.log("Auto Zoom value in Excel:", data.auto_zoom);
    if (data.auto_zoom === "TRUE") {
      await expect(this.editIcon).toBeDisabled();
      return;
    }

    // 🔹 Auto Zoom OFF → Edit allowed
    await this.editIcon.click();
    await this.updatePopupTitle.waitFor({ state: "visible" });

    const formattedDate = toInputDateFormat(data.date);
    if (formattedDate) {
      await this.handleInput(this.dateInput, formattedDate);
    }

    await this.handleInput(this.startTimeInput, data.start_time);
    await this.handleInput(this.timezoneInput, data.timezone);

    // 🔹 Only update meeting URL when auto zoom is OFF
    await this.handleInput(this.meetingUrlInput, data.meeting_url);

    await this.updateBtn.click();
  }

  // ======================================================
  // 🔹 DELETE
  // ======================================================

  async deleteLiveDarshan() {
    await this.deleteIcon.click();
  }
}
