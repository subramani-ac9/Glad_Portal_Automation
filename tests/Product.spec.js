import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { readSheet } from "../utils/sheetReader";
import { ACCESS_TOKEN, PRODUCT_SHEET_URL } from "../utils/config";
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
let productsId = [];

function normalize(val) {
  if (val === null || val === undefined) return "";
  return val.toString().toLowerCase().trim();
}

function resolveFinal(newValue, oldValue) {
  console.log("in update resolve final");
  console.log(`oldvalue: ${oldValue} -> newvalue :${newValue}`);
  if (newValue === null || newValue === undefined || newValue === "null")
    return oldValue;
  if (newValue === "") return ""; // validation case
  return newValue;
}

test.describe("Product", () => {
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

      //CREATE
      if (data.action === "create") {
        const result = await productPage.createProduct(data);
        await validateResult(expectedValues, { productPage });

        await page.waitForTimeout(3000);
        if (!errorExpected) {
          await productPage.openEditModalByTitle(result.title);
          const actual = await productPage.readEncMediaForm();
          //storing products id
          productsId.push(result.productId);

          for (const key of Object.keys(actual)) {
            // skip validation fields not provided in sheet
            if (data[key] === null || data[key] === undefined) continue;
            console.log(
              normalize(actual[key]),
              "--compare with--",
              normalize(data[key]),
            );
            expect(normalize(actual[key]), `Mismatch in field: ${key}`).toBe(
              normalize(data[key]),
            );
          }

          await productPage.closeModal();
        }
      }

      if (data.action === "update") {
        const result = await productPage.updateProduct(data);
        await validateResult(expectedValues, { productPage });

        await page.waitForTimeout(5000);
        if (result.status === "UPDATED" && !errorExpected) {
          // 🔹 Decide which title to search
          const finalTitle = resolveFinal(
            data.UpdatedTitle,
            result.OldData.title,
          );

          // 🔹Open edit modal using FINAL title
          await productPage.openEditModalByTitle(finalTitle);

          const actual = await productPage.readEncMediaForm();
          console.log("UPDATED FORM DATA:", actual);

          // 🔹 Base expected object (always present)
          const expected = {
            title: resolveFinal(data.UpdatedTitle, result.OldData.title),
            mode: resolveFinal(data.Updatedmode, result.OldData.mode),
            isPrivate: resolveFinal(
              data.UpdatedIsPrivate,
              result.OldData.isPrivate,
            ),
            AutoApprove: resolveFinal(
              data.UpdatedAutoApprove,
              result.OldData.AutoApprove,
            ),
            ProductType: resolveFinal(
              data.UpdatedProductType,
              result.OldData.ProductType,
            ),
            MaximumCapacity: resolveFinal(
              data.UpdatedMaximumCapacity,
              result.OldData.MaximumCapacity,
            ),
            thumbnail_url: resolveFinal(
              data.Updatedthumbnail_url,
              result.OldData.thumbnail_url,
            ),
            GladProduct: resolveFinal(
              data.UpdatedGladProduct,
              result.OldData.GladProduct,
            ),
            DurationMinimumDays: resolveFinal(
              data.UpdatedDurationMinimumDays,
              result.OldData.DurationMinimumDays,
            ),
            DurationMaximumDays: resolveFinal(
              data.UpdatedDurationMaximumDays,
              result.OldData.DurationMaximumDays,
            ),
            SessionMinimumMinutes: resolveFinal(
              data.UpdatedSessionMinimumMinutes,
              result.OldData.SessionMinimumMinutes,
            ),
            SessionMaximumMinutes: resolveFinal(
              data.UpdatedSessionMaximumMinutes,
              result.OldData.SessionMaximumMinutes,
            ),
            AllowEvent: resolveFinal(
              data.UpdatedAllowEvent,
              result.OldData.AllowEvent,
            ),
            AllowResource: resolveFinal(
              data.UpdatedAllowResource,
              result.OldData.AllowResource,
            ),
            AllowNonConsecutivedays: resolveFinal(
              data.UpdatedAllowNonConsecutivedays,
              result.OldData.AllowNonConsecutivedays,
            ),
            AllowMultipleSessions: resolveFinal(
              data.UpdatedAllowMultipleSessions,
              result.OldData.AllowMultipleSessions,
            ),
          };

          for (const key of Object.keys(expected)) {
            expect(normalize(actual[key]), `Mismatch in field: ${key}`).toBe(
              normalize(expected[key]),
            );
          }

          await productPage.closeModal();
        }
      }

      if (data.action === "search") {
        await productPage.fillTitleOnSearchInput(data.title);
        await productPage.validateSearchResults(data.title);
      }

      if (data.action === "filter") {
        await productPage.filterproduct(data);
      }
    });
  });
});

test("deleting created product", async ({ request, page }) => {
  const productPage = new ProductPage(page); // page not needed

  await Promise.all(
    productsId.map((id) =>
      productPage.deleteProductById(request, id, ACCESS_TOKEN),
    ),
  );
});
