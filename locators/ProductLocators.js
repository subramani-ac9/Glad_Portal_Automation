//product locators
export const productLocators = {
  aolIcon: "xpath=/html[1]/body[1]/div[1]/div[2]/button[2]/img[1]",
  title: "Products Management",
  createNewBtn: "Create New",
  refreshBtn: ".lucide.lucide-refresh-ccw",
  CreatePopupTitle: "Create New Product",
  UpdatePopupTitle:
    "xpath=/html[1]/body[1]/div[21]/div[1]/div[1]/div[1]/div[2]/section[1]/div[1]/h2[1]/div[1]/div[1]/div[2]/div[1]",
  CreatePopTitleInput: "[name='title']",
  CreatePopModeDropdown: "Mode",
  CreatePopIsPrivateCheckbox: "Is Private",
  CreatePopAutoApproveCheckbox: "Auto Approve",
  CreatePopMaximumCapacityInput: "Count in Person",
  CreatePopProductTypeDropdown: "Product Type",
  CreatePopThumbnailURLInput: "input[name='thumbnailURL']",
  CreatePopGladProductTypeDropdown: "Select glad product",

  //min max
  CreatePopUpEventdaysMaximumInput: "input[name='productConfig.duration.eventInDays.max']",
  CreatePopUpEventdaysMinimumInput: "input[name='productConfig.duration.eventInDays.min']",
  CreatePopUpSessionMaximumInput: "input[name='productConfig.duration.sessionInMinutes.max']",
  CreatePopUpSessionMinimumInput: "input[name='productConfig.duration.sessionInMinutes.min']",

  //use cases
  CreatePopUpAllowEventCheckbox: "Allow Event Usecases",
  CreatePopUpAllowResourceCheckbox: "Allow Resource Usecases",
  CreatePopUpAllowNonconsecutivedatesCheckbox: "Allow Non consecutive dates during Course Creation",
  CreatePopUpAllowMultipleSessionsCheckbox: "Allow Multiple Sessions in a Day",

  CreatePopCreateBtn: "Create Product",



  CreatePopTitleRequiredError: "Title is required",
  CreatePopTitleSpecialCharacterError: "Only letters, numbers, spaces, '.', '-', '_', ':', '[' , ']','@','#','$','%','^','&','*','(' and ')' are allowed",
  CreatePopTitleInput_Maximum_Error: "Title must be at most 255 characters",


  CreatePopThumbnailURL_invalid_Error: "Please enter a valid thumbnail URL",
  CreatePopThumbnailURL_Maximum_Error: "Thumbnail URL must be at most 255 characters",


  CreatePopUpComparativeMinimumDaysError: "Maximum days cannot be less than minimum days",
  CreatePopUpComparativeMinimumMinutesError: "Maximum minutes cannot be less than minimum minutes",
  CreatePopUpMinimumDaysError: "Minimum days cannot be less than 0",
  CreatePopUpMinimumMinutesError: "Maximum minutes cannot be less than 0",
  CreatePopupMaximumMinitesError :"Cannot exceed 1440 minutes",
  CreatePopUpMaximumCapacityMaxError :"Capacity cannot be more than 100000",
  CreatePopUpMaximumCapacityMinError :"Capacity cannot be less than 0",

  toasts: ".mantine-Notification-body",
  cancel_btnX: "//button[@aria-label='Close modal']//*[name()='svg']",

};