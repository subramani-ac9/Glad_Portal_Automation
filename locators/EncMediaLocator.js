export const EncMediaLocators = {
  aolIcon: "xpath=/html[1]/body[1]/div[1]/div[2]/button[2]/img[1]",
  title: "Encrypted Media Management",
  createNewBtn: "Create New",
  refreshBtn: ".lucide.lucide-refresh-ccw",
  CreatePopupTitle: "Create New Media",
  UpdatePopupTitle: "xpath=/html[1]/body[1]/div[20]/div[1]/div[1]/div[1]/div[2]/section[1]/div[1]/div[1]/div[1]/div[2]/div[1]",
  CreatePopTitleInput: "[name='title']",
  CreatePopMediaTypeDropdown:
    "Select type",
  CreatePopMediaSizeInput: "Media Size in KB",
  CreatePopEnableBackgroundCheckbox:
    "Enable Background Play",
  CreatePopDisableControllerCheckbox:
    'Disable Controller Option',
  CreatePopLanguageInput: "[name='language']",
  CreatePopMediaURLInput: "[name='s3URL']",
  CreatePopDecryptionAlgorithmDropdown:
    "Decryption Algorithm",
  CreatePopThumbnailURLInput: "input[name='thumbnailURL']",
  CreatePopDurationInput: "[name='duration']",
  CreatePopProductNameInput: "Product Names",
  CreatePopNonceInput: "Nonce",

  CreatePopCreateBtn: "Create Media",
  CreatePopCancelBtn: "//button[@aria-label='Close modal']//*[name()='svg']",

  CreatePopTitleRequiredError: "Title is required",
  CreatePopTitleInput_Maximum_Error: "Title must be at most 255 characters",

  CreatePopMediaSizeRequiredError: "Media size is required",
  CreatePopMediaSize_Minimum_Error: "File size should be more than 0 KB",
  CreatePopMediaSize_Maximum_Error: "File size must be less than 4 GB",

  CreatePopMediaURLRequiredError: "URL is required",
  CreatePopMediaURL_invalid_Error: "URL does not match the selected media type",
  CreatePopMediaURL_Maximum_Error:
    "Encrypted Media URL must be at most 255 characters",

  CreatePopDurationRequiredError: "Duration is required",
  CreatePopDuration_Maximum_Error:
    "Duration cannot exceed 24 hours (86400 seconds)",

  CreatePopProductNameRequiredError: "Select at least one Product",

  //this only appears when we switch to document and come back to video/audio file format
  CreatePopDecryptionAlgorithmRequiredError:
    "Decryption algorithm is required for audio and video",
    
  CreatePopNonceRequiredError: "Nonce is required",
  
  
 
  CreatePopThumbnailURL_invalid_Error: "Please enter a valid thumbnail URL",
  CreatePopThumbnailURL_Maximum_Error:
    "Thumbnail URL must be at most 255 characters",
  

  create_edit_delete_success_msg: ".mantine-Notification-body",

  cancel_btnX:
    "//button[@aria-label='Close modal']//*[name()='svg']",

};
