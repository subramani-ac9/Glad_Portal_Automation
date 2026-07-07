// product page
import { expect } from "@playwright/test";
import { productLocators } from "../locators/ProductLocators";
import {
  handleInput,
  handleMantineSelect,
  handleMutliSelect,
  isErrorExpected,
  moveToFirstPage,
  moveToNextPage,
  openPopup,
} from "../utils/dateUtils";
import { LoginPage } from "./LoginPage";
import { allure } from "allure-playwright";

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

    this.updateBtn = page.getByRole("button", { name: "Update Product" });
    this.cancelBtnX = page.locator(productLocators.cancel_btnX);
    this.deletecancelBtn = page
      .locator("button")
      .filter({ hasText: "Cancel" })
      .first();

    this.CreatePopTitleRequiredError = page.getByText(
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


    this.CreatePopupMaximumMinitesError = page.getByText(
      productLocators.CreatePopupMaximumMinitesError,
    );

    this.CreatePopUpMinimumvalueIn_MindaysError = page.getByText(
      productLocators.CreatePopUpMinimumvalueIn_MindaysError,
    );
    this.CreatePopUpMinimumvalueIn_MaxdaysError = page.getByText(
      productLocators.CreatePopUpMinimumvalueIn_MaxdaysError,
    );
     this.CreatePopUpMinimumvalueIn_MinMinutesError = page.getByText(
      productLocators.CreatePopUpMinimumvalueIn_MinMinutesError,
    );
    this.CreatePopUpMinimumvalueIn_MaxMinutesError = page.getByText(
      productLocators.CreatePopUpMinimumvalueIn_MaxMinutesError,
    );
    this.CreatePopUpMaximumCapacityMaxError = page.getByText(
      productLocators.CreatePopUpMaximumCapacityMaxError,
    );

    this.CreatePopUpMaximumCapacityMinError = page.getByText(
      productLocators.CreatePopUpMaximumCapacityMinError,
    );

    this.toasts = page.locator(productLocators.toasts);

    //serach
    this.searchInput = page.getByPlaceholder(productLocators.searchInput);
    this.noAvailableProductsText = page
      .getByText(productLocators.noAvailableProductsText)
      .first();

    //edit locators
    this.editProductBtn = page.locator(productLocators.editProductBtn);

    //filter
    this.filterBtn = page.getByRole("button", { name: "Filter" });
    this.fiterPopUpTitle = page.getByText("Filters", { exact: true });
    this.filterProductTypeDropDown = page.getByPlaceholder(
      "Select product type",
    );
    this.filterApplyBtn = page.getByRole("button", { name: "Apply" });
    this.filterResetBtn = page.getByRole("button", { name: "Reset" });
    this.noProductMsg = page
      .locator("h3")
      .filter({ hasText: "No products available" })
      .last();
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

        if (cellText.toLowerCase() === title.toLowerCase()) {
          return row;
        }
      }

      const nextBtn = this.page.getByRole("button", { name: "Next" });
      if (await nextBtn.isDisabled()) break;

      await nextBtn.click();
      await this.page.waitForLoadState("networkidle");
    }
    return null;
  }

  async verifyProductType(productType) {
    const validTypes = ["meetup", "ticketed-event", "course"];
    if (productType.toLowerCase().trim() === "ticketed event") {
      productType = "ticketed-event";
    }

    const previousBtn = this.page.getByRole("button", { name: "Previous" });
    const nextBtn = this.page.getByRole("button", { name: "Next" });

    // 🔹 If no records → pagination hidden → noProductMsg visible
    const rows = this.page.locator("table tbody tr");
    const count = await rows.count();

    // 🔹 Safety check
    expect(count).toBeGreaterThan(0);

    // 🔹 NO DATA CASE (noProductMsg is rendered as a row)
    const firstRowText = (await rows.first().innerText()).toLowerCase();

    if (firstRowText.includes("No products available")) {
      await expect(this.noProductMsg).toBeVisible();
      await expect(previousBtn).not.toBeVisible();
      await expect(nextBtn).not.toBeVisible();
      return true; // ✅ valid filter result
    }

    // 🔹 Go to first page (only if pagination exists)
    if (await previousBtn.isVisible()) {
      while (await previousBtn.isEnabled()) {
        await previousBtn.click();
        await this.page.waitForLoadState("networkidle");
      }
    }

    while (true) {
      const pageRows = this.page.locator("table tbody tr");
      const pageCount = await pageRows.count();

      for (let i = 0; i < pageCount; i++) {
        const cellText = (
          await pageRows.nth(i).locator("td").nth(1).innerText()
        )
          .trim()
          .toLowerCase();

        console.log(cellText, "->", productType);

        // 🔹 ALL filter → allow any valid product type
        if (productType.toLowerCase() === "all") {
          if (!validTypes.includes(cellText)) {
            console.error("❌ Invalid product type found:", cellText);
            return false;
          }
        }
        // 🔹 Specific filter
        else {
          if (cellText !== productType.toLowerCase()) {
            console.error(
              `❌ Filter mismatch: expected ${productType}, found ${cellText}`,
            );
            return false;
          }
        }
      }

      // 🔹 Handle pagination safely
      if (!(await nextBtn.isVisible()) || (await nextBtn.isDisabled())) break;

      await nextBtn.click();
      await this.page.waitForLoadState("networkidle");
    }

    return true;
  }

  async openEditModalByTitle(title) {
    const row = await this.findRowByTitle(title);
    expect(row, `Record not found: ${title}`).not.toBeNull();

    await row.getByTitle("Edit", { exact: true }).click();
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
      DurationMinimumDays:
        await this.CreatePopUpEventdaysMinimumInput.inputValue(),
      DurationMaximumDays:
        await this.CreatePopUpEventdaysMaximumInput.inputValue(),
      SessionMinimumMinutes:
        await this.CreatePopUpSessionMinimumInput.inputValue(),
      SessionMaximumMinutes:
        await this.CreatePopUpSessionMaximumInput.inputValue(),

      AllowEvent: await this.CreatePopUpAllowEventCheckbox.isChecked(),
      AllowResource: await this.CreatePopUpAllowResourceCheckbox.isChecked(),
      AllowNonConsecutivedays:
        await this.CreatePopUpAllowNonconsecutivedatesCheckbox.isChecked(),
      AllowMultipleSessions:
        await this.CreatePopUpAllowMultipleSessionsCheckbox.isChecked(),
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
    await handleMantineSelect(
      this.CreatePopProductTypeDropdown,
      data.ProductType,
      this.page,
    );
    await handleInput(this.CreatePopMaximumCapacityInput, data.MaximumCapacity);
    await handleInput(this.CreatePopThumbnailURLInput, data.thumbnail_url);
    await handleMutliSelect(
      this.CreatePopGladProductTypeDropdown,
      data.GladProduct.toLowerCase(),
      this.page,
    );

    await handleInput(
      this.CreatePopUpEventdaysMinimumInput,
      data.DurationMinimumDays,
    );
    await handleInput(
      this.CreatePopUpEventdaysMaximumInput,
      data.DurationMaximumDays,
    );
    await handleInput(
      this.CreatePopUpSessionMinimumInput,
      data.SessionMinimumMinutes,
    );
    await handleInput(
      this.CreatePopUpSessionMaximumInput,
      data.SessionMaximumMinutes,
    );

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

    // const title = await this.CreatePopTitleInput.inputValue();
    // await this.CreatePopCreateBtn.click();

    const expectedValues = data.expected.split(",").map((v) => v.trim());
    const errorExpected = isErrorExpected(expectedValues);
    console.log("error expected:", errorExpected);

    const title = await this.CreatePopTitleInput.inputValue();

    if (!errorExpected) {
      // --- Capture the create API response ---
      const [response] = await Promise.all([
        this.page.waitForResponse(async (response) => {
          if (
            !response.url().includes("/v1/products") ||
            response.request().method() !== "POST" ||
            !response.ok()
          )
            return false;

          // IMPORTANT: read as text, NOT json
          const text = await response.text();
          return text.includes('"id"');
        }),
        this.CreatePopCreateBtn.click(),
      ]);

      // --- Extract ID safely (NO precision loss) ---
      const rawText = await response.text();

      const match = rawText.match(/"id"\s*:\s*(\d+)/);
      if (!match) {
        throw new Error("❌ Product ID not found in response");
      }

      const productId = match[1]; // string, exact ID

      console.log("✅ Correct product ID:", productId);

      return { title, productId };
    } else {
      this.CreatePopCreateBtn.click();
      return { title };
    }
  }

  /* ----------------------------------------------------
       UPDATE
    ---------------------------------------------------- */

  async updateProduct(data) {
    await this.openEditModalByTitle(data.title);

    const OldData = await this.readEncMediaForm();

    await handleInput(this.CreatePopTitleInput, data.UpdatedTitle);
    await handleMantineSelect(
      this.CreatePopModeDropdown,
      data.Updatedmode,
      this.page,
    );
    await handleMantineSelect(
      this.CreatePopProductTypeDropdown,
      data.UpdatedProductType,
      this.page,
    );
    await handleInput(
      this.CreatePopMaximumCapacityInput,
      data.UpdatedMaximumCapacity,
    );
    await handleInput(
      this.CreatePopThumbnailURLInput,
      data.Updatedthumbnail_url,
    );
    await handleMutliSelect(
      this.CreatePopGladProductTypeDropdown,
      data.UpdatedGladProduct.toLowerCase(),
      this.page,
    );

    await handleInput(
      this.CreatePopUpEventdaysMinimumInput,
      data.UpdatedDurationMinimumDays,
    );
    await handleInput(
      this.CreatePopUpEventdaysMaximumInput,
      data.UpdatedDurationMaximumDays,
    );
    await handleInput(
      this.CreatePopUpSessionMinimumInput,
      data.UpdatedSessionMinimumMinutes,
    );
    await handleInput(
      this.CreatePopUpSessionMaximumInput,
      data.UpdatedSessionMaximumMinutes,
    );

       console.log(data.UpdatedIsPrivate ,data.UpdatedAutoApprove,data.UpdatedAllowEvent, data.UpdatedAllowResource , data.UpdatedAllowNonConsecutivedays,data.UpdatedAllowMultipleSessions )
    if (data.UpdatedIsPrivate === "TRUE") {
      await this.CreatePopIsPrivateCheckbox.check();
    } else {
      await this.CreatePopIsPrivateCheckbox.uncheck();
    }

    if (data.UpdatedAutoApprove === "TRUE") {
      await this.CreatePopAutoApproveCheckbox.check();
    } else {
      await this.CreatePopAutoApproveCheckbox.uncheck();
    }

    //
    if (data.UpdatedAllowEvent === "TRUE") {
      await this.CreatePopUpAllowEventCheckbox.check();
    } else {
      await this.CreatePopUpAllowEventCheckbox.uncheck();
    }

    if (data.UpdatedAllowResource === "TRUE") {
      await this.CreatePopUpAllowResourceCheckbox.check();
    } else {
      await this.CreatePopUpAllowResourceCheckbox.uncheck();
    }
    if (data.UpdatedAllowNonConsecutivedays === "TRUE") {
      await this.CreatePopUpAllowNonconsecutivedatesCheckbox.check();
    } else {
      await this.CreatePopUpAllowNonconsecutivedatesCheckbox.uncheck();
    }

    if (data.UpdatedAllowMultipleSessions === "TRUE") {
      await this.CreatePopUpAllowMultipleSessionsCheckbox.check();
    } else {
      await this.CreatePopUpAllowMultipleSessionsCheckbox.uncheck();
    }

    if (await this.updateBtn.isDisabled()) {
      await this.closeModal();
      return "NO_CHANGE";
    }

    await this.updateBtn.click();
    return { status: "UPDATED", OldData };
  }

  /* ----------------------------------------------------
       DELETE(via backend for cleanup)
    ---------------------------------------------------- */

  async deleteProductById(request, productId, token) {
    const response = await request.delete(
      `https://api.qa.in.ac9ai.com/v1/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok()) {
      console.error(
        `❌ Failed to delete product ${productId}`,
        await response.text(),
      );
    }
  }
  /* ----------------------------------------------------
      SEARCH
    ---------------------------------------------------- */

  async fillTitleOnSearchInput(title) {
    await this.searchInput.fill(title);
    console.log(`Filled search input with title: ${title}`);
    await this.page.waitForTimeout(5000);
  }

  async validateSearchResults(title) {
    if (await this.noAvailableProductsText.isVisible()) {
      console.log("No products available message is displayed as expected");
      allure.attachment(
        "No products available message",
        "No products available",
        "text/plain",
      );
      return;
    }

    await moveToFirstPage(this.page);
    console.log("Went to first page");

    while (true) {
      await this.page.locator("table tbody tr").first().waitFor();
      const rows = this.page.locator("table tbody tr");
      const count = await rows.count();
      console.log(`Number of rows on current page: ${count}`);
      for (let i = 0; i < count; i++) {
        console.log(`Validating row ${i + 1} on current page`);
        await this.editProductBtn.nth(i).waitFor();
        console.log("fined edit button");
        await this.editProductBtn.nth(i).click();
        console.log("Clicked edit button");
        await this.UpdatePopupTitle.waitFor();
        console.log("Edit popup is visible");
        const productTitle = await this.CreatePopTitleInput.inputValue();
        expect(productTitle.trim().toLowerCase()).toContain(
          title.toLowerCase(),
        );
        console.log(`Validated product title: ${productTitle}`);
        await this.cancelBtnX.click();
        console.log("Closed edit popup");
      }
      const nextEnabled = await moveToNextPage(this.page);
      if (!nextEnabled) {
        console.log(
          "No more pages to navigate. Completed validation of search results.",
        );
        break;
      }
      console.log("Moved to next page for further validation.");
    }
  }

  /* ----------------------------------------------------
      FILTER
    ---------------------------------------------------- */

  async filterproduct(data) {
    await openPopup(this.filterBtn, this.fiterPopUpTitle);
    console.log(data.ProductType);
    await handleMantineSelect(
      this.filterProductTypeDropDown,
      data.ProductType,
      this.page,
    );
    await this.filterApplyBtn.click();
    // ✅ wait for table refresh
    await this.page.waitForLoadState("networkidle");

    const isFiltered = await this.verifyProductType(data.ProductType);

    expect(
      isFiltered,
      `❌ Filter failed for Product Type: ${data.ProductType}`,
    ).toBe(true);
  }
}
