// product page
import { expect } from "@playwright/test";
import { productLocators } from "../locators/ProductLocators";
import {
  handleInput,
  handleMantineSelect,
  handleMutliSelect,
  openPopup,
} from "../utils/dateUtils";
import { LoginPage } from "./LoginPage";

export class ProductPage {
  constructor(page) {
    this.page = page;

    this.aolIcon = page.locator(productLocators.aolIcon);
    this.title = page.getByText(productLocators.title);
    this.productsIcon = page.getByAltText("Products");

    //buttons
    this.createNewBtn = page.getByText(productLocators.createNewBtn);
    this.refreshBtn = page.locator(productLocators.refreshBtn);
    this.CreatePopupTitle = page.getByText(productLocators.CreatePopupTitle);
    this.UpdatePopupTitle = page.locator(productLocators.UpdatePopupTitle);
    this.CreatePopTitleInput = page.locator(
      productLocators.CreatePopTitleInput,
    );
    this.CreatePopModeDropdown = page.getByLabel(
      productLocators.CreatePopModeDropdown,
      { exact: true },
    );

    this.CreatePopMaximumCapacityInput = page.getByPlaceholder(
      productLocators.CreatePopMaximumCapacityInput,
    );
    this.CreatePopIsPrivateCheckbox = page.getByLabel(
      productLocators.CreatePopIsPrivateCheckbox,
      { exact: true },
    );
    this.CreatePopAutoApproveCheckbox = page.getByLabel(
      productLocators.CreatePopAutoApproveCheckbox,
      { exact: true },
    );

    this.CreatePopProductTypeDropdown = page.getByLabel(
      productLocators.CreatePopProductTypeDropdown,
      { exact: true },
    );
    this.CreatePopThumbnailURLInput = page.locator(
      productLocators.CreatePopThumbnailURLInput,
    );

    this.CreatePopGladProductTypeDropdown = page.getByLabel(
      productLocators.CreatePopGladProductTypeDropdown,
      { exact: true },
    );

    // max min
    this.CreatePopUpEventdaysMaximumInput = page.locator(
      productLocators.CreatePopUpEventdaysMaximumInput,
    );
    this.CreatePopUpEventdaysMinimumInput = page.locator(
      productLocators.CreatePopUpEventdaysMinimumInput,
    );
    this.CreatePopUpSessionMaximumInput = page.locator(
      productLocators.CreatePopUpSessionMaximumInput,
    );
    this.CreatePopUpSessionMinimumInput = page.locator(
      productLocators.CreatePopUpSessionMinimumInput,
    );

    //use cases
    this.CreatePopUpAllowEventCheckbox = page.getByLabel(
      productLocators.CreatePopUpAllowEventCheckbox,
      { exact: true },
    );
    this.CreatePopUpAllowResourceCheckbox = page.getByLabel(
      productLocators.CreatePopUpAllowResourceCheckbox,
      { exact: true },
    );
    this.CreatePopUpAllowNonconsecutivedatesCheckbox = page.getByLabel(
      productLocators.CreatePopUpAllowNonconsecutivedatesCheckbox,
      { exact: true },
    );
    this.CreatePopUpAllowMultipleSessionsCheckbox = page.getByLabel(
      productLocators.CreatePopUpAllowMultipleSessionsCheckbox,
      { exact: true },
    );

    this.CreatePopCreateBtn = page.getByText(
      productLocators.CreatePopCreateBtn,
    );

    this.updateBtn = page.getByRole("button", { name: "Update Media" });
    this.cancelBtnX = page.locator(productLocators.cancel_btnX);
    this.deletecancelBtn = page
      .locator("button")
      .filter({ hasText: "Cancel" })
      .first();

    this.CreatePopTitle_RequiredError = page.getByText(
      productLocators.CreatePopTitleRequiredError,
    );
    this.CreatePopTitleInput_Maximum_Error = page.getByText(
      productLocators.CreatePopTitleInput_Maximum_Error,
    );

    this.CreatePopThumbnailURL_invalid_Error = page.getByText(
      productLocators.CreatePopThumbnailURL_invalid_Error,
    );
    this.CreatePopThumbnailURL_Maximum_Error = page.getByText(
      productLocators.CreatePopThumbnailURL_Maximum_Error,
    );

    this.CreatePopUpComparativeMinimumDaysError = page.getByText(
      productLocators.CreatePopUpComparativeMinimumDaysError,
    );
    this.CreatePopUpComparativeMinimumMinutesError = page.getByText(
      productLocators.CreatePopUpComparativeMinimumMinutesError,
    );
    this.CreatePopUpMinimumDaysError = page.getByText(
      productLocators.CreatePopUpMinimumDaysError,
    );

    this.CreatePopUpMinimumMinutesError = page.getByText(
      productLocators.CreatePopUpMinimumMinutesError,
    );
    this.CreatePopupMaximumMinitesError = page.getByText(
      productLocators.CreatePopupMaximumMinitesError,
    );
    this.CreatePopUpMaximumCapacityMaxError = page.getByText(
      productLocators.CreatePopUpMaximumCapacityMaxError,
    );

    this.CreatePopUpMaximumCapacityMinError = page.getByText(
      productLocators.CreatePopUpMaximumCapacityMinError,
    );

    this.toasts = page.locator(productLocators.toasts);
  }

  /* ----------------------------------------------------
   TABLE HELPERS
---------------------------------------------------- */

  async findRowByTitle(title) {
    const previousBtn = this.page.getByRole("button", { name: "Previous" });

    while (await previousBtn.isEnabled()) {
      await previousBtn.click();
      await this.page.waitForLoadState("networkidle");
    }

    while (true) {
      const rows = this.page.locator("table tbody tr");
      const count = await rows.count();

      for (let i = 0; i < count; i++) {
        const row = rows.nth(i);
        const cellText = (await row.locator("td").nth(0).innerText()).trim();
        console.lo

        if (cellText.toLowerCase() === title.toLowerCase()) {
          return row;
        }
      }

      const nextBtn = this.page.getByRole("button", { name: "Next" });
      if (await nextBtn.isDisabled()) break;

      await nextBtn.click();
      await this.page.waitForTimeout(5000);
    }
    return null;
  }

  async openEditModalByTitle(title) {
    const row = await this.findRowByTitle(title);
    expect(row, `Record not found: ${title}`).not.toBeNull();

    await row.getByTitle("Edit" ,{ exact: true }).click();
    await expect(this.UpdatePopupTitle).toBeVisible();
  }

  /* ----------------------------------------------------
       FORM HELPERS
    ---------------------------------------------------- */

  async readEncMediaForm() {
    const existingData = {
      title: await this.CreatePopTitleInput.inputValue(),
      mode: await this.CreatePopModeDropdown.inputValue(),

      isPrivate: await this.CreatePopIsPrivateCheckbox.isChecked(),
      AutoApprove: await this.CreatePopAutoApproveCheckbox.isChecked(),

      MaximumCapacity: await this.CreatePopMaximumCapacityInput.inputValue(),
      ProductType: await this.CreatePopProductTypeDropdown.inputValue(),
      thumbnail_url: await this.CreatePopThumbnailURLInput.inputValue(),
      GladProduct: await this.CreatePopGladProductTypeDropdown.inputValue(),
      DurationMinimumDays: await this.CreatePopUpEventdaysMaximumInput.inputValue(),
      DurationMaximumDays: await this.CreatePopUpEventdaysMinimumInput.inputValue(),
      SessionMinimumMinutes: await this.CreatePopUpSessionMaximumInput.inputValue(),
      SessionMaximumMinutes: await this.CreatePopUpSessionMinimumInput.inputValue(),

      AllowEvent: await this.CreatePopUpAllowEventCheckbox.isChecked(),
      AllowResource: await this.CreatePopUpAllowResourceCheckbox.isChecked(),
      AllowNonConsecutivedays:
        await this.CreatePopUpAllowNonconsecutivedatesCheckbox.isChecked(),
      AllowMultipleSessions: await this.CreatePopUpAllowMultipleSessionsCheckbox.isChecked(),
    };

    console.log("form data:", existingData);
    return existingData;
  }

  async closeModal() {
    await this.cancelBtnX.click();
    await expect(this.UpdatePopupTitle).toBeHidden();
  }

  /* ----------------------------------------------------
       CREATE
    ---------------------------------------------------- */

  async createProduct(data) {
    await openPopup(this.createNewBtn, this.CreatePopupTitle);

    await handleInput(this.CreatePopTitleInput, data.title);
    await handleMantineSelect(this.CreatePopModeDropdown, data.mode, this.page);
    await handleMantineSelect(this.CreatePopProductTypeDropdown, data.ProductType, this.page);
    await handleInput(this.CreatePopMaximumCapacityInput, data.MaximumCapacity);
    await handleInput(this.CreatePopThumbnailURLInput, data.thumbnail_url);
    await handleMantineSelect(this.CreatePopGladProductTypeDropdown, data.GladProduct, this.page);
    
    
    await handleInput(this.CreatePopUpEventdaysMinimumInput, data.DurationMinimumDays);
    await handleInput(this.CreatePopUpEventdaysMaximumInput, data.DurationMaximumDays);
    await handleInput(this.CreatePopUpSessionMinimumInput, data.SessionMinimumMinutes);
    await handleInput(this.CreatePopUpSessionMaximumInput, data.SessionMaximumMinutes);
    
    
    
    if (data.isPrivate === "TRUE") {
      await this.CreatePopIsPrivateCheckbox.check();
    }
    if (data.AutoApprove === "TRUE") {
      await this.CreatePopAutoApproveCheckbox.check();
    }

    //
    if (data.AllowEvent === "TRUE") {
      await this.CreatePopUpAllowEventCheckbox.check();
    }
    if (data.AllowResource === "TRUE") {
      await this.CreatePopUpAllowResourceCheckbox.check();
    }
    if (data.AllowNonConsecutivedays === "TRUE") {
      await this.CreatePopUpAllowNonconsecutivedatesCheckbox.check();
    }
    if (data.AllowMultipleSessions === "TRUE") {
      await this.CreatePopUpAllowMultipleSessionsCheckbox.check();
    }

    const title = await this.CreatePopTitleInput.inputValue();
    await this.CreatePopCreateBtn.click();

    return title;
  }
}
