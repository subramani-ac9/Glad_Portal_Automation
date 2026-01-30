import { expect } from "@playwright/test";
import { EncMediaLocators } from "../locators/EncMediaLocator";
import { handleInput, handleMantineSelect, handleMutliSelect, openPopup } from "../utils/dateUtils";
import { LoginPage } from "./LoginPage";

export class EncMediapage {
  constructor(page) {
    this.page = page;

    this.aolIcon = page.locator(EncMediaLocators.aolIcon);
    this.title = page.getByText(EncMediaLocators.title);
    this.encMediaIcon = page.getByAltText('Encrypted Media');
    this.logoutBtn = page.getByText(EncMediaLocators.logoutBtn);
    this.userIcon = page.locator(EncMediaLocators.userIcon);


    //buttons
    this.createNewBtn = page.getByText(EncMediaLocators.createNewBtn);
    this.refreshBtn = page.locator(EncMediaLocators.refreshBtn);
    this.CreatePopupTitle = page.getByText(EncMediaLocators.CreatePopupTitle);
    this.UpdatePopupTitle = page.locator(EncMediaLocators.UpdatePopupTitle);
    this.CreatePopTitleInput = page.locator(EncMediaLocators.CreatePopTitleInput);
    this.CreatePopMediaTypeDropdown = page.getByPlaceholder(EncMediaLocators.CreatePopMediaTypeDropdown);
    this.CreatePopMediaSizeInput = page.getByPlaceholder(EncMediaLocators.CreatePopMediaSizeInput)

    this.CreatePopEnableBackgroundCheckbox = page.getByLabel(EncMediaLocators.CreatePopEnableBackgroundCheckbox, { exact: true })
    this.CreatePopDisableControllerCheckbox = page.getByLabel(EncMediaLocators.CreatePopDisableControllerCheckbox, { exact: true })

    this.CreatePopLanguageInput = page.locator(EncMediaLocators.CreatePopLanguageInput);
    this.CreatePopMediaURLInput = page.locator(EncMediaLocators.CreatePopMediaURLInput)
    this.CreatePopDecryptionAlgorithmDropdown = page.getByLabel(EncMediaLocators.CreatePopDecryptionAlgorithmDropdown)
    this.CreatePopThumbnailURLInput = page.locator(EncMediaLocators.CreatePopThumbnailURLInput)
    this.CreatePopDurationInput = page.locator(EncMediaLocators.CreatePopDurationInput)
    this.CreatePopProductNameInput = page.getByLabel(EncMediaLocators.CreatePopProductNameInput, { exact: true });
    this.CreatePopNonceInput = page.getByPlaceholder(EncMediaLocators.CreatePopNonceInput)

    this.CreatePopCreateBtn = page.getByText(EncMediaLocators.CreatePopCreateBtn)
    this.CreatePopCancelBtn = page.locator(EncMediaLocators.CreatePopCancelBtn);

    this.updateBtn = page.getByRole('button', { name: 'Update Media' });
    this.cancelBtnX = page.locator(EncMediaLocators.cancel_btnX);
    this.deletecancelBtn = page
      .locator("button")
      .filter({ hasText: "Cancel" })
      .first();

    this.CreatePopTitle_RequiredError = page.getByText(EncMediaLocators.CreatePopTitleRequiredError)
    this.CreatePopTitleInput_Maximum_Error = page.getByText(EncMediaLocators.CreatePopTitleInput_Maximum_Error);

    this.CreatePopMediaSize_RequiredError = page.getByText(EncMediaLocators.CreatePopMediaSizeRequiredError)
    this.CreatePopMediaSize_Minimum_Error = page.getByText(EncMediaLocators.CreatePopMediaSize_Minimum_Error)
    this.CreatePopMediaSize_Maximum_Error = page.getByText(EncMediaLocators.CreatePopMediaSize_Maximum_Error)

    this.CreatePopMediaURLRequiredError = page.getByText(EncMediaLocators.CreatePopMediaURLRequiredError)
    this.CreatePopMediaURL_invalid_Error = page.getByText(EncMediaLocators.CreatePopMediaURL_invalid_Error);
    this.CreatePopMediaURL_Maximum_Error = page.getByText(EncMediaLocators.CreatePopMediaURL_Maximum_Error);


    this.CreatePopDurationRequiredError = page.getByText(EncMediaLocators.CreatePopDurationRequiredError)
    this.CreatePopDuration_Maximum_Error = page.getByText(EncMediaLocators.CreatePopDuration_Maximum_Error);

    this.CreatePopProductNameRequiredError = page.getByText(EncMediaLocators.CreatePopProductNameRequiredError)

    this.CreatePopDecryptionAlgorithmRequiredError = page.getByText(EncMediaLocators.CreatePopDecryptionAlgorithmRequiredError)

    this.CreatePopNonceRequiredError = page.getByText(EncMediaLocators.CreatePopNonceRequiredError)

    this.CreatePopThumbnailURL_invalid_Error = page.getByText(EncMediaLocators.CreatePopThumbnailURL_invalid_Error);
    this.CreatePopThumbnailURL_Maximum_Error = page.getByText(EncMediaLocators.CreatePopThumbnailURL_Maximum_Error);

    this.toasts = page.locator(EncMediaLocators.toasts);


    //view media

    this.viewMediaEditButton = page.getByRole('button', { name: EncMediaLocators.viewMediaEditButton });
    this.viewIcon = page.getByAltText(EncMediaLocators.viewIcon);
    this.viewMediaProducts = page.locator(EncMediaLocators.viewMediaProducts);
    this.viewMediaFileTypeIcon = page.locator(EncMediaLocators.viewMediaFileTypeIcon)
    this.viewMediaVideoTypeIcon = page.locator(EncMediaLocators.viewMediaVideoTypeIcon)
    this.viewMediaAudioTypeIcon = page.locator(EncMediaLocators.viewMediaAudioTypeIcon)
    this.viewMediaLanguage = page.locator(EncMediaLocators.viewMediaLanguage)
    this.viewMediaTitle = page.locator(EncMediaLocators.viewMediaTitle);

    //Mutliple Delete Locators
    this.MultipleDeleteEncMedia = page.getByRole('button', { name: EncMediaLocators.multipleDeleteEncMedia, });
    this.deleteConfirmDialog = page.getByRole('dialog');
    this.confirmDeleteBtn = this.deleteConfirmDialog.getByRole('button', { name: 'Yes,delete', });
    this.confirmDeleteCancelBtn = this.deleteConfirmDialog.getByRole('button', { name: 'Cancel', });
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
        const cellText = (await row.locator("td").nth(2).innerText()).trim();

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

  async waitForRowToBeDeleted(title) {
    await expect(async () => {
      const row = await this.findRowByTitle(title);
      expect(row).toBeNull();
    }).toPass({
      timeout: 15000,
      intervals: [500],
    });
  }

  async openEditModalByTitle(title) {
    const row = await this.findRowByTitle(title);
    expect(row, `Record not found: ${title}`).not.toBeNull();

    await row.getByAltText("Edit icon").click();
    await expect(this.UpdatePopupTitle).toBeVisible();
  }



  /* ----------------------------------------------------
     FORM HELPERS
  ---------------------------------------------------- */

  async readEncMediaForm() {


    const mediaType = await this.CreatePopMediaTypeDropdown.inputValue();
    const decryption_Algorithm = await this.CreatePopDecryptionAlgorithmDropdown.inputValue();

    const existingData = {
      title: await this.CreatePopTitleInput.inputValue(),
      mediaType,
      mediaSize: await this.CreatePopMediaSizeInput.inputValue(),
      language: await this.CreatePopLanguageInput.inputValue(),
      encMedia_url: await this.CreatePopMediaURLInput.inputValue(),
      decryption_Algorithm,
      thumbnail_url: await this.CreatePopThumbnailURLInput.inputValue(),
      duration: await this.CreatePopDurationInput.inputValue(),
      // productNames: await this.CreatePopProductNameInput.inputValue(),
    };

    if (mediaType === 'Audio') {
      existingData.backgroudplay =
        await this.CreatePopEnableBackgroundCheckbox.isChecked();

      existingData.controllerOption =
        await this.CreatePopDisableControllerCheckbox.isChecked();
    }
    if (mediaType === 'Video') {
      existingData.controllerOption =
        await this.CreatePopDisableControllerCheckbox.isChecked();
    }

    if (decryption_Algorithm === "aesGcm" || decryption_Algorithm === "Both") {
      existingData.nonce =
        await this.CreatePopNonceInput.inputValue();
    }

    console.log("form data:", existingData);
    return existingData
  }

  async closeModal() {
    await this.cancelBtnX.click();
    await expect(this.UpdatePopupTitle).toBeHidden();
  }

  /* ----------------------------------------------------
     CREATE
  ---------------------------------------------------- */

  async createEncMedia(data) {
    await openPopup(this.createNewBtn, this.CreatePopupTitle);

    await handleInput(this.CreatePopTitleInput, data.title);
    await handleMantineSelect(this.CreatePopMediaTypeDropdown, data.mediaType, this.page);
    await handleInput(this.CreatePopMediaSizeInput, data.mediaSize);
    await handleInput(this.CreatePopLanguageInput, data.language);
    await handleInput(this.CreatePopMediaURLInput, data.encMedia_url);
    await handleInput(this.CreatePopThumbnailURLInput, data.thumbnail_url);
    await handleInput(this.CreatePopDurationInput, data.duration);
    if (data.backgroudplay === "TRUE") {
      await this.CreatePopEnableBackgroundCheckbox.check();
    }

    if (data.controllerOption === "TRUE") {
      await this.CreatePopDisableControllerCheckbox.check();
    }

    if (data.mediaType === "Audio" || data.mediaType === "Video") {
      await handleMantineSelect(this.CreatePopDecryptionAlgorithmDropdown, data.decryption_Algorithm, this.page);
      if (data.decryption_Algorithm === "aesGcm" || data.decryption_Algorithm === "Both") {
        await handleInput(this.CreatePopNonceInput, data.nonce);
      }
    }

    await handleMutliSelect(this.CreatePopProductNameInput, data.productNames, this.page);


    const title = await this.CreatePopTitleInput.inputValue();
    await this.CreatePopCreateBtn.click();

    return title;
  }

  /* ----------------------------------------------------
     UPDATE
  ---------------------------------------------------- */

  async updateEncMedia(data) {
    await this.openEditModalByTitle(data.title);

    const OldData = await this.readEncMediaForm();

    await handleInput(this.CreatePopTitleInput, data.updatedTittle);
    await handleMantineSelect(this.CreatePopMediaTypeDropdown, data.updatedMediaType, this.page);
    await handleInput(this.CreatePopMediaSizeInput, data.updatedMediaSize);
    await handleInput(this.CreatePopLanguageInput, data.updatedLanguage);
    await handleInput(this.CreatePopMediaURLInput, data.updatedEncMedia_url);
    await handleInput(this.CreatePopThumbnailURLInput, data.updatedThumbnail_url);
    await handleInput(this.CreatePopDurationInput, data.updatedDuration);

    if (data.updatedBackgroudplay === "TRUE") {
      await this.CreatePopEnableBackgroundCheckbox.check();
    }

    if (data.updatedControllerOption === "TRUE") {
      await this.CreatePopDisableControllerCheckbox.check();
    }

    if (data.updatedMediaType === "Audio" || data.updatedMediaType === "Video") {
      await handleMantineSelect(this.CreatePopDecryptionAlgorithmDropdown, data.updatedDecryption_Algorithm, this.page);
      if (data.updatedDecryption_Algorithm === "aesGcm" || data.updatedDecryption_Algorithm === "Both") {
        await handleInput(this.CreatePopNonceInput, data.updatedNonce);
      }
    }

    await handleMutliSelect(this.CreatePopProductNameInput, data.updatedProductNames, this.page);

    if (await this.updateBtn.isDisabled()) {
      await this.closeModal();
      return "NO_CHANGE";
    }

    await this.updateBtn.click();
    return { status: "UPDATED", OldData };
  }

  /* ----------------------------------------------------
      DELETE
   ---------------------------------------------------- */

  async deleteByTitle(title) {
    const row = await this.findRowByTitle(title);
    expect(row).not.toBeNull();

    await row.getByAltText("Delete icon").click();
    await this.page
      .locator("button")
      .filter({ hasText: "Yes,delete" })
      .last()
      .click();

    await this.page.waitForLoadState("networkidle");

  }


  //To select checkbox by title
  async selectRowCheckboxByTitle(title) {
    const row = await this.findRowByTitle(title);
    expect(row, `Row not found for title: ${title}`).not.toBeNull();

    const checkbox = row.locator('input[type="checkbox"]');

    if (!(await checkbox.isChecked())) {
      await checkbox.check();
    }
  }


  async deleteMultipleByTitles(titles) {

    for (const title of titles) {
      await this.selectRowCheckboxByTitle(title);
    }
    // Click Delete Selected
    await this.MultipleDeleteEncMedia.click();

    // Confirm dialog
    await expect(this.deleteConfirmDialog).toBeVisible();
    await this.confirmDeleteBtn.click();
  }


  /* ----------------------------------------------------
   VIEW
---------------------------------------------------- */

  async viewByTitle(title, mediaType) {
    const row = await this.findRowByTitle(title);
    expect(row).not.toBeNull();

    await row.getByAltText("View icon").click();

    console.log("view icon clicked");

    const count = await this.viewMediaProducts.count();
    const productNames = [];

    for (let i = 0; i < count; i++) {
      const name = await this.viewMediaProducts.nth(i).innerText();
      productNames.push(name.trim());
    }

    const language = await this.viewMediaLanguage.innerText();
    const tit = await this.viewMediaTitle.innerText();

    await expect(this.viewMediaEditButton).toBeEnabled();

    if (mediaType === "Video") {
      await expect(this.viewMediaVideoTypeIcon).toBeVisible();
    } else if (mediaType === "Audio") {
      await expect(this.viewMediaAudioTypeIcon).toBeVisible();
    } else {
      await expect(this.viewMediaFileTypeIcon).toBeVisible();
    }

    return { title: tit, language, productNames };

  }

}

