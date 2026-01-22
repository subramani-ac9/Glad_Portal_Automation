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

function resolveFinal(newValue, oldValue) {
  if (newValue === null || newValue === undefined) return oldValue;
  if (newValue === "") return ""; // validation case
  return newValue;
}

test.describe("Live Darshan – Sheet Driven Tests", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto("login");
    await loginPage.login(
      "test-tenant-admin-in@abovecloud9.ai",
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
          const createdData = await liveDarshanPage.createLiveDarshan(data);

          await validateResult(expectedValues, { liveDarshanPage });
          console.log("created data:", createdData);
          if (!errorExpected) {
            // Fetch auto-filled values from UI
            await findRowAndAction(page, createdData, "assertPresent");
          }
          break;

        case "update":
          const result = await liveDarshanPage.updateLiveDarshan(data);
          
          await validateResult(expectedValues, { liveDarshanPage });

          if (data.auto_zoom === "TRUE") {
            const row = await findRowAndAction(page, data, "getRow");
            break;
          }

          await validateResult(expectedValues, { liveDarshanPage, row });


          if (!errorExpected && result.status === "UPDATED") {
            const verifyData = {
              date: resolveFinal(data.UpdateDate, result.existing.date),
              start_time: resolveFinal(
                data.UpdateStart_time,
                result.existing.start_time,
              ),
              timezone: resolveFinal(
                data.UpdateTimezone,
                result.existing.timezone,
              ),
            };

            console.log("verifing data after update:", verifyData);

            await findRowAndAction(page, verifyData, "assertPresent");
          }

          if (errorExpected) {
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
