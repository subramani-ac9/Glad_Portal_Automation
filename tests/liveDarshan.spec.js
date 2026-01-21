import { test } from "@playwright/test";
import { LiveDarshanPage } from "../pages/LiveDarshanPage";
import { readSheet } from "../utils/sheetReader";
import { LIVE_DARSHAN_SHEET_URL } from "../utils/config";
import { validateResult } from "../utils/validateResult";
import { LoginPage } from "../pages/LoginPage";
import { findRowAndAction, isErrorExpected } from "../utils/dateUtils";

const testData = await readSheet(LIVE_DARSHAN_SHEET_URL);

const runnableTests = testData.filter((data) => {
  if (data.execute?.toLowerCase() === "run") {
    return data;
  }
});

test.describe("Live Darshan – Sheet Driven Tests", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto("login");
    await loginPage.login(
      "test-tenant-admin-us@abovecloud9.ai",
      "Abovecloud@ac9",
    );
  });

  runnableTests.forEach((data) => {
    test(`Live Darshan | ${data.test_id} | ${data.action}`, async ({
      page,
    }) => {
      const liveDarshanPage = new LiveDarshanPage(page);

      const expectedValues = data.expected.split(",").map((v) => v.trim());
      const errorExpected = isErrorExpected(expectedValues);
      console.log("error expected:", errorExpected);
      // await liveDarshanPage.refreshList();

      switch (data.action.toLowerCase()) {
        case "create":
          await liveDarshanPage.createLiveDarshan(data);

          //result
          await validateResult(expectedValues, { liveDarshanPage });

          if (!errorExpected) {
            await findRowAndAction(page, data, "assertPresent");
          } else {
            await liveDarshanPage.cancelBtnX.click(); // cleanup
          }

          break;

        case "update":
          const updateResult = await liveDarshanPage.updateLiveDarshan(data);

          if (updateResult === "NO_CHANGE") {
            break;
          }

          //result
          await validateResult(expectedValues, { liveDarshanPage });
          if (!errorExpected) {
            await findRowAndAction(
              page,
              {
                date: data.UpdateDate ?? data.date,
                start_time: data.UpdateStart_time ?? data.start_time,
                timezone: data.UpdateTimezone ?? data.timezone,
              },
              "assertPresent",
            );
          } else {
            await liveDarshanPage.cancelBtnX.click();
          }
          break;

        case "delete":
          await liveDarshanPage.deleteLiveDarshan(data);

          //result
          await validateResult(expectedValues, { liveDarshanPage });

          if (!errorExpected) {
            await findRowAndAction(page, data, "assertNotPresent");
          }
          break;

        default:
          throw new Error(`❌ Invalid action in sheet: ${data.action}`);
      }
    });
  });
});
