export const loginLocators = {
  emailInput: "[name='username']",
  passwordInput: "[name='password']",
  loginButton: "//span[text()='Sign In']/ancestor::button",
                        
  emailRequiredError: 'xpath=/html[1]/body[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/form[1]/div[1]/div[1]/div[2]',
  passwordRequiredError: 'xpath=/html[1]/body[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/form[1]/div[2]/div[1]/div[1]/div[2]',
};
