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
    // 1️⃣ null / undefined → SKIP
    if (value === null || value === undefined || value === "null") {
      return false;
    }

    // 2️⃣ Empty string → CLEAR FIELD (trigger required error)
    if (value === "") {
      await locator.fill("");
      return true;
    }

    const existingValue = await locator.inputValue();

    // 3️⃣ Same value → NO CHANGE
    if (existingValue === value) {
      return false;
    }

    // 4️⃣ Different value → UPDATE
    await locator.fill(value);
    return true;
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

  async createLiveDarshan(data) {
    console.log(
      `Creating Live Darshan with data:, ${data.action} | ${data.date} | ${data.start_time}, ${data.timezone}`,
    );
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

    const createdData = {
      date: await this.dateInput.inputValue(),
      start_time: await this.startTimeInput.inputValue(),
      timezone: await this.timezoneInput.inputValue(),
    };

    await this.createBtn.click();

    return createdData;
  }

  // ======================================================
  // 🔹 UPDATE
  // ======================================================

  // async updateLiveDarshan(data) {
  //   console.log(
  //     `Creating Live Darshan with data:,${data.action} | ${data.date} | ${data.start_time} | ${data.timezone} \n Update to → ${data.UpdateDate} | ${data.UpdateStart_time} | ${data.UpdateTimezone}`,
  //   );
  //   // 1️⃣ Find row and click EDIT
  //   let obj = await findRowAndAction(this.page, data, "edit");
  //   if (obj.autozoom) {
  //     return obj.editIcon;
  //   }

  //   await this.updatePopupTitle.waitFor({ state: "visible" });

  //   let isUpdated = false;

  //   // 2️⃣ Try updating fields
  //   const formattedDate = toInputDateFormat(data.UpdateDate);
  //   if (formattedDate) {
  //     isUpdated ||= await this.handleInput(this.dateInput, formattedDate);
  //   }

  //   isUpdated ||= await this.handleInput(
  //     this.startTimeInput,
  //     data.UpdateStart_time,
  //   );

  //   isUpdated ||= await this.handleInput(
  //     this.timezoneInput,
  //     data.UpdateTimezone,
  //   );

  //   isUpdated ||= await this.handleInput(
  //     this.meetingUrlInput,
  //     data.UpdateMeeting_url,
  //   );

  //   // 🔸 CASE 1: NOTHING CHANGED → Update disabled
  //   if (!isUpdated) {
  //     await expect(this.updateBtn).toBeDisabled();
  //     return;
  //   }

  //   // 🔸 CASE 2: CHANGE EXISTS
  //   await this.updateBtn.click();
  //   return;
  // }

  async updateLiveDarshan(data) {
    const result = await findRowAndAction(this.page, data, "edit");
    console.log(
      `Updating Live Darshan with data:${data.action} | ${data.date} | ${data.start_time} | ${data.timezone} \n Update to → ${data.UpdateDate} | ${data.UpdateStart_time} | ${data.UpdateTimezone}`,
    );
    if (result?.autozoom) {
      return { status: "AUTO_ZOOM", existing: result.existingData };
    }

    const existing = result.existingData;
    console.log("existing data in update:", existing);

    await this.updatePopupTitle.waitFor({ state: "visible" });

    let isUpdated = false;

    const formattedDate = toInputDateFormat(data.UpdateDate);
    if (formattedDate !== null) {
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

    // 🔸 NO CHANGE
    if (!isUpdated) {
      await expect(this.updateBtn).toBeDisabled();
      return { status: "NO_CHANGE", existing };
    }

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
