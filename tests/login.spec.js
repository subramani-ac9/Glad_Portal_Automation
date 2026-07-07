// tests/login.spec.js
import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { LiveDarshanPage } from "../pages/LiveDarshanPage";
import { readSheet } from "../utils/sheetReader";
import { LOGIN_SHEET_URL } from "../utils/config";
import { validateResult } from "../utils/validateResult";

let testData = await readSheet(LOGIN_SHEET_URL);
testData = testData.filter((data) => {
    if (data.execute?.toLowerCase() === "run") {
      return data;
    }
  });

test.describe("Login Tests (Google Sheet)", () => {
  for (const data of testData) {

    const tags = data.Test_tags
      ? data.Test_tags
          .toLowerCase()
          .split(",")
          .map((tag) => `@${tag.trim()}`)
          .join(" ")
      : "";

    test(`Login → ${data.Test_Id} ${tags}`, async ({
      page,
    }) => {
      const loginPage = new LoginPage(page);
      const liveDarshanPage = new LiveDarshanPage(page);

      await loginPage.goto("login");
      await loginPage.login(data.username, data.password);
      console.log(data.expected);
      const expectedValues = data.expected.split(",").map((v) => v.trim());
      console.log(expectedValues);
      await validateResult(expectedValues, {
        loginPage,
        liveDarshanPage,
      });
    });
  }
});
