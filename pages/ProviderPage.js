// product page
import { expect } from "@playwright/test";
import { providerLocators } from "../locators/ProviderLocators";
import {
  handleInput,
  handleMantineSelect,
  handleMutliSelect,
  openPopup,
} from "../utils/dateUtils";

export class ProviderPage {
  constructor(page) {
    this.page = page;

    /* ---------------- PAGE ---------------- */
    this.aolIcon = page.locator(providerLocators.aolIcon);
    this.title = page.getByText(providerLocators.title);
    this.productsIcon = page.getByAltText("Providers");

    //buttons
    this.createNewBtn = page.getByText(providerLocators.createNewBtn);
    this.refreshBtn = page.locator(providerLocators.refreshBtn);

    /* ---------------- POPUPS ---------------- */
    this.CreatePopupTitle = page.getByText(providerLocators.CreatePopupTitle);
    this.UpdatePopupTitle = page.locator(providerLocators.UpdatePopupTitle);
    /* ---------------- BASIC DETAILS ---------------- */
    this.providerNameInput = page.getByLabel(
      providerLocators.providerNameInput,
      { exact: true },
    );
    this.categoryDropDown = page.getByLabel(providerLocators.categoryDropDown, {
      exact: true,
    });
    this.ProviderTypeDropDown = page.getByLabel(
      providerLocators.ProviderTypeDropDown,
      { exact: true },
    );

    /* ---------------- AUTH ---------------- */
    this.clientidInput = page.getByPlaceholder(providerLocators.clientidInput);
    this.RegionInput = page.getByPlaceholder(providerLocators.RegionInput);
    this.UserPoolidInput = page.getByPlaceholder(
      providerLocators.UserPoolidInput,
    );

    /* ---------------- CHECKBOXES ---------------- */
    this.EnablefederationCheckbox = page.getByLabel(
      providerLocators.EnablefederationCheckbox,
      { exact: true },
    );
    this.BackgroundLoginConfigFieldsCheckBox = page.getByLabel(
      providerLocators.BackgroundLoginConfigFieldsCheckBox,
      { exact: true },
    );

    /* ---------------- FEDERATION ---------------- */
    this.FedClientSecretInput = page.getByPlaceholder(
      providerLocators.FederationConfig_ClientSecretInput,
    );
    this.FedDomainInput = page.getByPlaceholder(
      providerLocators.FederationConfig_DomainInput,
    );
    this.FedURLInput = page.getByPlaceholder(
      providerLocators.FederationConfig_URLInput,
    );
    this.FedOAuthScopesDropDown = page.getByLabel(
      providerLocators.FederationConfig_OAuthScopeDropDown,
    );
    this.FedExternalProviderInput = page.getByPlaceholder(
      providerLocators.FederationConfig_ExternalProviderInput,
    );

    /* ---------------- BACKGROUND LOGIN ---------------- */
    this.BgLinkRegexInput = page.getByPlaceholder(
      providerLocators.BackgroundLoginConfig_FederationLinkRegexInput,
    );
    this.BgLoginContentInput = page.getByPlaceholder(
      providerLocators.BackgroundLoginConfig_FederationLoginPageContentInput,
    );
    this.BgErrorRegexInput = page.getByPlaceholder(
      providerLocators.BackgroundLoginConfig_FederationErrorMessageRegexInput,
    );
    this.BgErrorMessagesDropDown = page.getByLabel(
      providerLocators.BackgroundLoginConfig_FederationErrorMessagesDropDown,
    );

    /* ---------------- API ---------------- */
    this.APIurlInput = page.getByPlaceholder(providerLocators.APIurlInput);
    this.APIKeyInput = page.getByPlaceholder(providerLocators.APIKeyInput);

    /* ---------------- SALESFORCE ---------------- */
    this.SFUrlInput = page.getByPlaceholder(
      providerLocators.SalesforceUrlInput,
    );
    this.SFApiInput = page.getByPlaceholder(
      providerLocators.SalesforceApiInput,
    );
    this.SFTokenInput = page.getByPlaceholder(
      providerLocators.SalesforceTokenInput,
    );
    this.SFGrantTypeInput = page.getByPlaceholder(
      providerLocators.SalesforceGrantTypeInput,
    );
    this.SFClientIdInput = page.getByPlaceholder(
      providerLocators.SalesforceclientidInput,
    );
    this.SFClientSecretInput = page.getByPlaceholder(
      providerLocators.SalesforceclientSecretInput,
    );

    /* ---------------- URL SHORTENER ---------------- */
    this.URLShortenerKeyInput = page.getByPlaceholder(
      providerLocators.URLShortenerAPIKeyInput,
    );
    this.URLShortenerURLInput = page.getByPlaceholder(
      providerLocators.URLShortenerAPIUrlInput,
    );

    /* ---------------- BUTTONS ---------------- */
    this.createBtn = page.getByRole("button", {
      name: providerLocators.CreateBtn,
    });
    this.updateBtn = page.getByRole("button", {
      name: providerLocators.UpdateBtn,
    });
    this.deletecancelBtn = page
      .locator("button")
      .filter({ hasText: "Cancel" })
      .first();

    this.cancelBtnX = page.locator(providerLocators.cancel_btnX);

    //view locators
    this.viewMediaEditButton = page.locator('button:has-text("Edit")');
    this.viewIcon = page.getByAltText(providerLocators.viewIcon);

    this.toasts = page.locator(providerLocators.toasts);

    //edit locators
    this.editProductBtn = page.locator(providerLocators.editProductBtn);
  }

  /* ----------------------------------------------------
   TABLE HELPERS
---------------------------------------------------- */

  async findRowByProviderName(providerName) {
    while (true) {
      const rows = this.page.locator("table tbody tr");
      const count = await rows.count();

      for (let i = 0; i < count; i++) {
        const row = rows.nth(i);
        const cellText = (await row.locator("td").nth(0).innerText()).trim();
        if (cellText.toLowerCase() === providerName.toLowerCase()) {
          return row;
        }
      }
    }
    return null;
  }

  async openEditModalByProviderName(ProviderName) {
    const row = await this.findRowByProviderName(ProviderName);
    expect(row, `Record not found: ${ProviderName}`).not.toBeNull();

    await row.getByTitle("Edit", { exact: true }).click();
    await expect(this.UpdatePopupTitle).toBeVisible();
  }

  /* ----------------------------------------------------
       FORM HELPERS
    ---------------------------------------------------- */

  async readProviderForm() {
    const category = await this.categoryDropDown.inputValue();
    const providerType = await this.ProviderTypeDropDown.inputValue();

    const data = {
      providerName: await this.providerNameInput.inputValue(),
      category,
      providerType,
    };

    /* ---------------- AUTH ---------------- */
    if (category === "Auth") {
      if (["cognito", "whispering-infinity"].includes(providerType)) {
        data.clientId = await this.clientidInput.inputValue();
        data.region = await this.RegionInput.inputValue();
        data.userPoolId = await this.UserPoolidInput.inputValue();
      }

      if (providerType === "cognito") {
        data.enableFederation = await this.EnablefederationCheckbox.isChecked();
        data.enableBackgroundLogin =
          await this.BackgroundLoginConfigFieldsCheckBox.isChecked();

        if (data.enableFederation) {
          data.fedClientSecret = await this.FedClientSecretInput.inputValue();
          data.fedDomain = await this.FedDomainInput.inputValue();
          data.fedUrl = await this.FedURLInput.inputValue();
          data.fedOAuthScopes = await this.FedOAuthScopesDropDown.inputValue();
          console.log(await this.FedOAuthScopesDropDown.inputValue());
          data.fedExternalProvider =
            await this.FedExternalProviderInput.inputValue();
        }

        if (data.enableBackgroundLogin) {
          data.bgLinkRegex = await this.BgLinkRegexInput.inputValue();
          data.bgLoginContent = await this.BgLoginContentInput.inputValue();
          data.bgErrorRegex = await this.BgErrorRegexInput.inputValue();
          data.bgErrorMessages =
            await this.BgErrorMessagesDropDown.inputValue();

            console.log(  await this.BgErrorMessagesDropDown.inputValue());
        }
      }

      if (providerType === "api") {
        data.apiUrl = await this.APIurlInput.inputValue();
        data.apiKey = await this.APIKeyInput.inputValue();
      }
    }

    /* ---------------- SYNC ---------------- */
    if (category === "Sync" && providerType === "salesforce") {
      data.salesforceUrl = await this.SFUrlInput.inputValue();
      data.salesforceApiEndpoint = await this.SFApiInput.inputValue();
      data.salesforceTokenEndpoint = await this.SFTokenInput.inputValue();
      data.salesforceGrantType = await this.SFGrantTypeInput.inputValue();
      data.salesforceClientId = await this.SFClientIdInput.inputValue();
      data.salesforceClientSecret = await this.SFClientSecretInput.inputValue();
    }

    /* ---------------- URL SHORTENER ---------------- */
    if (
      category === "URL Shortener" &&
      ["rebrandly", "tinyurl"].includes(providerType)
    ) {
      data.urlShortenerApiKey = await this.URLShortenerKeyInput.inputValue();
      data.urlShortenerApiUrl = await this.URLShortenerURLInput.inputValue();
    }

    return data;
  }

  async closeModal() {
    await this.cancelBtnX.click();
    await expect(this.UpdatePopupTitle).toBeHidden();
  }

  /* ----------------------------------------------------
       CREATE
    ---------------------------------------------------- */

  async createProvider(data) {
    await openPopup(this.createNewBtn, this.CreatePopupTitle);

    /* ---------------- ALWAYS ---------------- */
    await handleInput(this.providerNameInput, data.providerName);
    await handleMantineSelect(this.categoryDropDown, data.category, this.page);
    await handleMantineSelect(
      this.ProviderTypeDropDown,
      data.providerType,
      this.page,
    );

    console.log(data.category);
    /* ---------------- AUTH ---------------- */
    if (data.category === "Auth") {
      if (["cognito", "whispering-infinity"].includes(data.providerType)) {
        await handleInput(this.clientidInput, data.clientId);
        await handleInput(this.RegionInput, data.region);
        await handleInput(this.UserPoolidInput, data.userPoolId);
      }

      if (data.providerType === "cognito") {
        if (data.enableFederation === "TRUE") {
          await this.EnablefederationCheckbox.check();
          await handleInput(this.FedClientSecretInput, data.fedClientSecret);
          await handleInput(this.FedDomainInput, data.fedDomain);
          await handleInput(this.FedURLInput, data.fedUrl);
          await handleMutliSelect(
            this.FedOAuthScopesDropDown,
            data.fedOAuthScopes,
            this.page,
          );
          await handleInput(
            this.FedExternalProviderInput,
            data.fedExternalProvider,
          );
        }

        if (data.enableBackgroundLogin === "TRUE") {
          await this.BackgroundLoginConfigFieldsCheckBox.check();
          await handleMutliSelect(
            this.BgErrorMessagesDropDown,
            data.bgErrorMessages,
            this.page,
          );
          await handleInput(this.BgLinkRegexInput, data.bgLinkRegex);
          await handleInput(this.BgLoginContentInput, data.bgLoginContent);
          await handleInput(this.BgErrorRegexInput, data.bgErrorRegex);
        }
      }

      if (data.providerType === "api") {
        await handleInput(this.APIurlInput, data.apiUrl);
        await handleInput(this.APIKeyInput, data.apiKey);
      }
    }

    /* ---------------- SYNC ---------------- */
    if (data.category === "Sync" && data.providerType === "salesforce") {
      await handleInput(this.SFUrlInput, data.salesforceUrl);
      await handleInput(this.SFApiInput, data.salesforceApiEndpoint);
      await handleInput(this.SFTokenInput, data.salesforceTokenEndpoint);
      await handleInput(this.SFGrantTypeInput, data.salesforceGrantType);
      await handleInput(this.SFClientIdInput, data.salesforceClientId);
      await handleInput(this.SFClientSecretInput, data.salesforceClientSecret);
    }

    /* ---------------- URL SHORTENER ---------------- */
    if (
      data.category === "URL Shortener" &&
      ["rebrandly", "tinyurl"].includes(data.providerType)
    ) {
      await handleInput(this.URLShortenerKeyInput, data.urlShortenerApiKey);
      await handleInput(this.URLShortenerURLInput, data.urlShortenerApiUrl);
    }

    const providerName = await this.providerNameInput.inputValue();

    await this.createBtn.click();

    return { providerName };
  }

/* ----------------------------------------------------
       CREATE
    ---------------------------------------------------- */



// update provider
async updateProvider(data) {
  // Open edit modal using provider name
  await this.openEditModalByProviderName(data.providerName);

  // Read existing data (for comparison / return)
  const OldData = await this.readProviderForm();

  /* ---------------- ALWAYS ---------------- */
  if (data.UpdatedProviderName) {
    await handleInput(this.providerNameInput, data.UpdatedProviderName);
  }

  if (data.UpdatedCategory) {
    await handleMantineSelect(
      this.categoryDropDown,
      data.UpdatedCategory,
      this.page,
    );
  }

  if (data.UpdatedProviderType) {
    await handleMantineSelect(
      this.ProviderTypeDropDown,
      data.UpdatedProviderType,
      this.page,
    );
  }

  const category = data.UpdatedCategory || data.category;
  const providerType = data.UpdatedProviderType || data.providerType;

  /* ---------------- AUTH ---------------- */
  if (category === "Auth") {
    if (["cognito", "whispering-infinity"].includes(providerType)) {
      await handleInput(this.clientidInput, data.UpdatedClientId);
      await handleInput(this.RegionInput, data.UpdatedRegion);
      await handleInput(this.UserPoolidInput, data.UpdatedUserPoolId);
    }

    if (providerType === "cognito") {
      // Federation
      if (data.UpdatedEnableFederation === "TRUE") {
        await this.EnablefederationCheckbox.check();
        await handleInput(
          this.FedClientSecretInput,
          data.UpdatedFedClientSecret,
        );
        await handleInput(this.FedDomainInput, data.UpdatedFedDomain);
        await handleInput(this.FedURLInput, data.UpdatedFedUrl);
        await handleMutliSelect(
          this.FedOAuthScopesDropDown,
          data.UpdatedFedOAuthScopes,
          this.page,
        );
        await handleInput(
          this.FedExternalProviderInput,
          data.UpdatedFedExternalProvider,
        );
      } else if (data.UpdatedEnableFederation === "FALSE") {
        await this.EnablefederationCheckbox.uncheck();
      }

      // Background Login
      if (data.UpdatedEnableBackgroundLogin === "TRUE") {
        await this.BackgroundLoginConfigFieldsCheckBox.check();
        await handleMutliSelect(
          this.BgErrorMessagesDropDown,
          data.UpdatedBgErrorMessages,
          this.page,
        );
        await handleInput(
          this.BgLinkRegexInput,
          data.UpdatedBgLinkRegex,
        );
        await handleInput(
          this.BgLoginContentInput,
          data.UpdatedBgLoginContent,
        );
        await handleInput(
          this.BgErrorRegexInput,
          data.UpdatedBgErrorRegex,
        );
      } else if (data.UpdatedEnableBackgroundLogin === "FALSE") {
        await this.BackgroundLoginConfigFieldsCheckBox.uncheck();
      }
    }

    // API auth
    if (providerType === "api") {
      await handleInput(this.APIurlInput, data.UpdatedApiUrl);
      await handleInput(this.APIKeyInput, data.UpdatedApiKey);
    }
  }

  /* ---------------- SYNC ---------------- */
  if (category === "Sync" && providerType === "salesforce") {
    await handleInput(this.SFUrlInput, data.UpdatedSalesforceUrl);
    await handleInput(
      this.SFApiInput,
      data.UpdatedSalesforceApiEndpoint,
    );
    await handleInput(
      this.SFTokenInput,
      data.UpdatedSalesforceTokenEndpoint,
    );
    await handleInput(
      this.SFGrantTypeInput,
      data.UpdatedSalesforceGrantType,
    );
    await handleInput(
      this.SFClientIdInput,
      data.UpdatedSalesforceClientId,
    );
    await handleInput(
      this.SFClientSecretInput,
      data.UpdatedSalesforceClientSecret,
    );
  }

  /* ---------------- URL SHORTENER ---------------- */
  if (
    category === "URL Shortener" &&
    ["rebrandly", "tinyurl"].includes(providerType)
  ) {
    await handleInput(
      this.URLShortenerKeyInput,
      data.UpdatedUrlShortenerApiKey,
    );
    await handleInput(
      this.URLShortenerURLInput,
      data.UpdatedUrlShortenerApiUrl,
    );
  }

  /* ---------------- SAFE UPDATE ---------------- */
  if (await this.updateBtn.isDisabled()) {
    await this.closeModal();
    return { status: "NO_CHANGE", OldData };
  }

  await this.updateBtn.click();

  return { status: "UPDATED", OldData };
}


}