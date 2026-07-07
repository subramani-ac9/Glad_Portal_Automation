//product locators
export const providerLocators = {
  aolIcon: "xpath=/html[1]/body[1]/div[1]/div[2]/button[2]/img[1]",
  title: "Products Management",
  createNewBtn: "Create New",
  refreshBtn: ".lucide.lucide-refresh-ccw",

  // popup titles
  CreatePopupTitle: "Create New Provider",
  UpdatePopupTitle:
    "xpath=/html[1]/body[1]/div[19]/div[1]/div[1]/div[1]/div[2]/section[1]/div[1]/div[1]/div[1]/div[2]/div[1]",
  
  
   // form fields
  providerNameInput: "Provider Name",
  categoryDropDown: "Category",
  ProviderTypeDropDown: "Provider Type",

  EnablefederationCheckbox: "Enable Federation Config Fields",
  BackgroundLoginConfigFieldsCheckBox:
    "Enable Background Login Config Fields",

  clientidInput: "Enter Client ID",
  RegionInput: "Enter Region",
  UserPoolidInput: "Enter User Pool ID",

  FederationConfig_ClientSecretInput: "Enter Client Secret",
  FederationConfig_DomainInput: "Enter Domain",
  FederationConfig_URLInput: "Enter URL",
  FederationConfig_OAuthScopeDropDown: "OAuth Scopes",
  FederationConfig_ExternalProviderInput: "Enter External Provider",

  BackgroundLoginConfig_FederationLinkRegexInput:
    "Enter Federation Link Regex",
  BackgroundLoginConfig_FederationLoginPageContentInput:
    "Enter Federation Login Page Content",
  BackgroundLoginConfig_FederationErrorMessageRegexInput:
    "Enter Federation Error Message Regex",
  BackgroundLoginConfig_FederationErrorMessagesDropDown:
    "Federation Error Messages",

  APIurlInput: "Enter API URL",
  APIKeyInput: "Enter API Key",

  // salesforce
  SalesforceUrlInput: "Enter Salesforce URL",
  SalesforceApiInput: "Enter Salesforce API Endpoint",
  SalesforceTokenInput: "Enter Salesforce Token Endpoint",
  SalesforceGrantTypeInput: "Enter Salesforce Grant Type",
  SalesforceclientidInput: "Enter Salesforce Client ID",
  SalesforceclientSecretInput: "Enter Salesforce Client Secret",

  // url shortener
  URLShortenerAPIKeyInput: "Enter URL Shortener API Key",
  URLShortenerAPIUrlInput: "Enter URL Shortener API URL",

  // view locators
  viewIcon: "View icon",

  // Required errors
  providerNameInputRequiredError: "Name is required",
  categoryDropDownRequiredError: "Category is required",
  ProviderTypeDropDownRequiredError: "Type is required",
  clientidInputequiredError: "Client ID is required",
  RegionInputRequiredError: "Region is required",
  UserPoolidInputRequiredError: "User Pool ID is required",
  FederationConfig_OAuthScopeDropDownRequiredError: "OAuth Scopes is required",
  BackgroundLoginConfig_FederationErrorMessagesDropDownRequiredError:
    "Federation Error Messages is required",
  APIurlInputRequiredError: "API URL is required",
  APIKeyInputRequiredError: "API Key is required",

  SalesforceUrlInputRequiredError: "Salesforce URL is Invalid",
  SalesforceApiInputRequiredError: "Salesforce API Endpoint is required",
  SalesforceTokenInputRequiredError: "Salesforce Token Endpoint is required",
  SalesforceGrantTypeInputRequiredError: "Salesforce Grant Type is required",
  SalesforceclientidInputRequiredError: "Salesforce Client ID is required",
  SalesforceclientSecretInputRequiredError:
    "Salesforce Client Secret is required",

  URLShortenerAPIKeyInputRequiredError: "URL Shortener API Key is required",
  URLShortenerAPIKeyInputRequiredError: "URL Shortener API URL is Invalid",


  //toast
  toasts: ".mantine-Notification-body",

  //button
  CreateBtn: "Create Provider",
  UpdateBtn: "Update Provider",
  cancel_btnX: ".lucide.lucide-x",
 

  //edit locators
  editProductBtn: 'button[title="Edit"]',
};
