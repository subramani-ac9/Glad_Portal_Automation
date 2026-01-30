import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { readSheet } from "../utils/sheetReader";
import { PRODUCT_SHEET_URL } from "../utils/config";
import {
  handleMantineSelect,
  isErrorExpected,
  openPopup,
  refreshList,
} from "../utils/dateUtils";
import { validateResult } from "../utils/validateResult";
import { ProductPage } from "../pages/ProductPage";

// let page;
let testData = await readSheet(PRODUCT_SHEET_URL);

function normalize(val) {
  if (val === null || val === undefined) return "";
  return val.toString().toLowerCase().trim();
}

function resolveFinal(newValue, oldValue) {
  console.log(`oldvalue: ${oldValue} -> newvalue :${newValue}`);
  if (newValue === null || newValue === undefined || newValue === "null")
    return oldValue;
  if (newValue === "") return ""; // validation case
  return newValue;
}

test.describe("Enc Media", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.goto("login");
    await loginPage.login(
      "test-tenant-admin-in@abovecloud9.ai",
      "Abovecloud@ac9",
    );
    await page.waitForTimeout(5000);

    await productPage.productsIcon.click();
    await page.waitForTimeout(5000);
  });
  testData.forEach((data) => {
    const testMode = data.execute === "skip" ? test.skip : test;

    testMode(`${data.test_id} | ${data.action}`, async ({ page }) => {
      const productPage = new ProductPage(page);

      const expectedValues = data.expected.split(",").map((v) => v.trim());
      const errorExpected = isErrorExpected(expectedValues);
      console.log("error expected:", errorExpected);

      if (data.action === "create") {
        const title = await productPage.createProduct(data);
        await validateResult(expectedValues, { productPage });

        await page.waitForTimeout(7000);

        if (!errorExpected) {
          await productPage.openEditModalByTitle(title);
          const actual = await productPage.readEncMediaForm();
          console.log("ACTUAL FORM DATA:", actual);
          for (const key of Object.keys(actual)) {
            // skip validation fields not provided in sheet
            if (data[key] === null || data[key] === undefined) continue;

            expect(normalize(actual[key]), `Mismatch in field: ${key}`).toBe(
              normalize(data[key]),
            );
          }

          await productPage.closeModal();
        }
      }
    });
  });
});
