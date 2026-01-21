import { test } from "@playwright/test";
import { LiveDarshanPage } from "../pages/LiveDarshanPage";
import { readSheet } from "../utils/sheetReader";
import { LIVE_DARSHAN_SHEET_URL } from "../utils/config";
import { validateResult } from "../utils/validateResult";
import { LoginPage } from "../pages/LoginPage";
import { isErrorExpected } from "../utils/dateUtils";

const testData = await readSheet(LIVE_DARSHAN_SHEET_URL);
test.describe("Live Darshan – Sheet Driven Tests", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto("login");
    await loginPage.login(
      "test-tenant-admin-in@abovecloud9.ai",
      "Abovecloud@ac9",
    );
  });

  const runnableTests = testData.filter((data) => {
    if (data.execute?.toLowerCase() === "run") {
      return data;
    }
  });

  runnableTests.forEach((data) => {
    test(`Live Darshan | ${data.test_id} | ${data.action}`, async ({
      page,
    }) => {
      const liveDarshanPage = new LiveDarshanPage(page);

      const expectedValues = data.expected.split(",").map((v) => v.trim());
      const errorExpected = isErrorExpected(expectedValues);
      console.log(errorExpected);
      // await liveDarshanPage.refreshList();

      switch (data.action.toLowerCase()) {
        case "create":
          await liveDarshanPage.createLiveDarshan(data, errorExpected);
          break;

        case "update":
          await liveDarshanPage.updateLiveDarshan(data, errorExpected);
          break;

        case "delete":
          await liveDarshanPage.deleteLiveDarshan(data, errorExpected);
          break;

        default:
          throw new Error(`❌ Invalid action in sheet: ${data.action}`);
      }

      await validateResult(expectedValues, { liveDarshanPage });
    });
  });
});
