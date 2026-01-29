export const loginLocators = {
  emailInput: "[name='username']",
  passwordInput: "[name='password']",
  loginButton: "//span[text()='Sign In']/ancestor::button",
   logoutBtn :"Logout",
  userIcon : "xpath=/html[1]/body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/button[1]/div[1]/span[1]/div[1]/img[1]",                      
  emailRequiredError: "//div[text()='Email is required']",
  passwordRequiredError: "//div[text()='Password is required']",
  error_msg:"//div[text()='Invalid email or password. Please try again or click Forgot Password to reset.']",
  invalidEmailError:"//div[text()='Invalid email address']",
};
