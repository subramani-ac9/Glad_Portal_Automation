export const loginLocators = {
  emailInput: "[name='username']",
  passwordInput: "[name='password']",
  loginButton: "//span[text()='Sign In']/ancestor::button",
                        
  emailRequiredError: "//div[text()='Email is required']",
  passwordRequiredError: "//div[text()='Password is required']",
  error_msg:"//div[text()='Invalid email or password. Please try again or click Forgot Password to reset.']",
  invalidEmailError:"//div[text()='Invalid email address']",
};
