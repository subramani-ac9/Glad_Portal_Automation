// product page
import { expect } from "@playwright/test";
import { productLocators } from "../locators/ProductLocators";
import {
  handleInput,
  handleMantineSelect,
  openPopup,
} from "../utils/dateUtils";
import { LoginPage } from "./LoginPage";

export class ProductPage {
  constructor(page) {
    this.page = page;

    this.aolIcon = page.locator(productLocators.aolIcon);
    this.title = page.getByText(productLocators.title);
    this.encMediaIcon = page.getByAltText("Encrypted Media");

    //buttons
    this.createNewBtn = page.getByText(productLocators.createNewBtn);
    this.refreshBtn = page.locator(productLocators.refreshBtn);
    this.CreatePopupTitle = page.getByText(productLocators.CreatePopupTitle);
    this.UpdatePopupTitle = page.locator(productLocators.UpdatePopupTitle);
    this.CreatePopTitleInput = page.locator(
      productLocators.CreatePopTitleInput,
    );
    this.CreatePopModeDropdown = page.getByPlaceholder(
      productLocators.CreatePopModeDropdown,
    );
    this.CreatePopIsPrivateCheckbox = page.getByLabel(
      productLocators.CreatePopIsPrivateCheckbox,
      { exact: true },
    );
    this.CreatePopAutoApproveCheckbox = page.getByLabel(
      productLocators.CreatePopAutoApproveCheckbox,
      { exact: true },
    );

    this.CreatePopProductTypeDropdown = page.getByPlaceholder(
      productLocators.CreatePopProductTypeDropdown,
    );
    this.CreatePopThumbnailURLInput = page.locator(
      EncMediaLocators.CreatePopThumbnailURLInput,
    );

    this.CreatePopGladProductTypeDropdown = page.getByPlaceholder(
      productLocators.CreatePopGladProductTypeDropdown,
    );

    // max min
    this.CreatePopUpEventdaysMaximumInput = page.locator(productLocators.CreatePopUpEventdaysMaximumInput);
    this.CreatePopUpEventdaysMinimumInput = page.locator(productLocators.CreatePopUpEventdaysMinimumInput);
    this.CreatePopUpSessionMaximumInput = page.locator(productLocators.CreatePopUpSessionMaximumInput);
    this.CreatePopUpSessionMinimumInput = page.locator(productLocators.CreatePopUpSessionMinimumInput);


    //use cases
    this.CreatePopUpAllowEventCheckbox = page.getByLabel(productLocators.CreatePopUpAllowEventCheckbox, { exact: true })
    this.CreatePopUpAllowResourceCheckbox = page.getByLabel(productLocators.CreatePopUpAllowResourceCheckbox, { exact: true })
    this.CreatePopUpAllowNonconsecutivedatesCheckbox = page.getByLabel(productLocators.CreatePopUpAllowNonconsecutivedatesCheckbox, { exact: true })
    this.CreatePopUpAllowMultipleSessionsCheckbox = page.getByLabel(productLocators.CreatePopUpAllowMultipleSessionsCheckbox, { exact: true })


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
      EncMediaLocators.CreatePopThumbnailURL_invalid_Error,
    );
    this.CreatePopThumbnailURL_Maximum_Error = page.getByText(
      EncMediaLocators.CreatePopThumbnailURL_Maximum_Error,
    );


    this.CreatePopUpComparativeMinimumDaysError = page.getByText(
      EncMediaLocators.CreatePopUpComparativeMinimumDaysError,
    );
    this.CreatePopUpComparativeMinimumMinutesError = page.getByText(
      EncMediaLocators.CreatePopUpComparativeMinimumMinutesError,
    );
    this.CreatePopUpMinimumDaysError = page.getByText(
      EncMediaLocators.CreatePopUpMinimumDaysError,
    );

    this.CreatePopUpMinimumMinutesError = page.getByText(
      EncMediaLocators.CreatePopUpMinimumMinutesError,
    );
    this.CreatePopupMaximumMinitesError = page.getByText(
      EncMediaLocators.CreatePopupMaximumMinitesError,
    );
    this.CreatePopUpMaximumCapacityMaxError = page.getByText(
      EncMediaLocators.CreatePopUpMaximumCapacityMaxError,
    );

    this.CreatePopUpMaximumCapacityMinError = page.getByText(
      EncMediaLocators.CreatePopUpMaximumCapacityMinError,
    );
   

    this.toasts = page.locator(productLocators.toasts);



  }
}