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
    
    this.PastStartTimeError = page.getByText(
      "Please select future time for today",
      { exact: true },
    );

    this.invalidStartTimeError = page.getByText(
      "Please enter a valid time",
      { exact: true },
    );

    this.invalidmeetingUrlError = page.getByText(
      "Please enter a valid Zoom meeting URL with meeting ID and password",
      { exact: true },
    );

    this.createEditDeleteSuccessMsg = page.locator(
      LiveDarshanLocators.create_edit_delete_success_msg,
    );

    this.NoData = page.getByText("No data available").last();
  }

  async handleInput(locator, value) {
    if (value === null || value === undefined || value === "null") {
      return false;
    } // skip

    if (value === "") {
      await locator.clear();
      return true; // cleared
    }

    const existingValue = (await locator.inputValue()).trim();
    const newValue = value.toString().trim();

    if (existingValue === newValue) return false; // no change

    await locator.fill(newValue);
    return true; // updated
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
    console.log(
      `Creating Live Darshan with data:, ${data.action} | ${data.date} | ${data.start_time}, ${data.timezone}`,
    );
    await this.openCreatePopup();

    await this.handleInput(this.quickScheduleInput, data.quick_schedule);
    console.log("toInputDateFormat(data.date)", toInputDateFormat(data.date));
    await this.handleInput(this.dateInput, toInputDateFormat(data.date));

    await this.handleInput(this.startTimeInput, data.start_time);
    await this.handleInput(this.timezoneInput, data.timezone);

    if (data.auto_zoom === "TRUE") {
      await this.autoZoomCheckbox.check();
    } else {
      await this.autoZoomCheckbox.uncheck();
      await this.handleInput(this.meetingUrlInput, data.meeting_url);
    }

    const createdData = {
      date: await this.dateInput.inputValue(),
      start_time: await this.startTimeInput.inputValue(),
      timezone: await this.timezoneInput.inputValue(),
      auto_zoom: data.auto_zoom,
    };

    await this.createBtn.click();

    return createdData;
  }

  // ======================================================
  // 🔹 UPDATE
  // ======================================================
  async updateLiveDarshan(data) {
    // 1️⃣ Find the row and click EDIT
    const result = await findRowAndAction(this.page, data, "edit");

    if (result?.autozoom) {
      // Auto Zoom row → can't edit
      return { status: "AUTO_ZOOM", row: result.row };
    }

    const existing = result.existingData;
    console.log("Existing data in update:", existing);

    await this.updatePopupTitle.waitFor({ state: "visible" });

    // 2️⃣ Prepare fields to update
    const fieldsToUpdate = [
      { locator: this.dateInput, value: toInputDateFormat(data.UpdateDate) },
      { locator: this.startTimeInput, value: data.UpdateStart_time },
      { locator: this.timezoneInput, value: data.UpdateTimezone },
    ];

    // Meeting URL only editable if auto_zoom is FALSE
    if (data.auto_zoom !== "TRUE") {
      fieldsToUpdate.push({
        locator: this.meetingUrlInput,
        value: data.UpdateMeeting_url,
      });
    }

    // 3️⃣ Update fields dynamically
    let isUpdated = false;
    for (const field of fieldsToUpdate) {
      const updated = await this.handleInput(field.locator, field.value);
      isUpdated ||= updated; // mark if any field changed
    }

    // 4️⃣ Check if update button is disabled (either nothing changed or validation error)
    if (!isUpdated || (await this.updateBtn.isDisabled())) {
      console.log("Update button disabled – no changes or validation errors");
      return { status: "NO_CHANGE", existing };
    }

    // 6️⃣ Click update
    await this.updateBtn.click();

    return { status: "UPDATED", existing };
  }

  // ======================================================
  // 🔹 DELETE
  // ======================================================

  async deleteLiveDarshan(data) {
    // 1️⃣ Find row and click DELETE
    console.log(
      `Deleting Live Darshan with data:,${data.action} | ${data.date} | ${data.start_time}, ${data.timezone}`,
    );
    await findRowAndAction(this.page, data, "delete");

    // 2️⃣ Confirm delete
    await this.page
      .locator("button")
      .filter({ hasText: "Yes,delete" })
      .last()
      .click();
  }
}
