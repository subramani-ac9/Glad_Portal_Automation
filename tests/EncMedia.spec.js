import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { readSheet } from "../utils/sheetReader";
import { ENC_MEDIA_SHEET_URL } from "../utils/config";
import { EncMediapage } from "../pages/EncMediaPage";
import { isErrorExpected } from "../utils/dateUtils";
import { validateResult } from "../utils/validateResult";


// let page;
let testData = await readSheet(ENC_MEDIA_SHEET_URL);

function normalize(val) {
  if (val === null || val === undefined) return "";
  return val.toString().toLowerCase().trim();
}

function resolveFinal(newValue, oldValue) {
  console.log(`oldvalue: ${oldValue} -> newvalue :${newValue}`);
  if (newValue === null || newValue === undefined || newValue === "null") return oldValue;
  if (newValue === "") return ""; // validation case
  return newValue;
}

test.describe("Enc Media", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const encMediaPage = new EncMediapage(page);


    await loginPage.goto("login");
    await loginPage.login(
      "test-tenant-admin-in@abovecloud9.ai",
      "Abovecloud@ac9"
    );
    await page.waitForTimeout(5000);

    await encMediaPage.encMediaIcon.click();
    await page.waitForTimeout(5000);


  });
  testData.forEach((data) => {

    const testMode = data.execute === "skip" ? test.skip : test;

    testMode(`${data.test_id} | ${data.action}`, async ({ page }) => {

      const encMediaPage = new EncMediapage(page);


      const expectedValues = data.expected.split(",").map((v) => v.trim());
      const errorExpected = isErrorExpected(expectedValues);
      console.log("error expected:", errorExpected);

      // switch (data.action) {
      //   case 'create': {
      //     const createdTitle = await encMediaPage.createEncMedia(data);
      //     await validateResult(expectedValues, { encMediaPage });

      //     await page.waitForTimeout(5000);
      //     console.log("createdData", createdTitle)
      //     if (!errorExpected) {
      //       console.log("validate result for data finding");
      //       await encMediaPage.findRowAndAction(page, { title: createdTitle }, "assertPresent");
      //     }
      //     break;

      //   }
      //   case "update": {
      //     const result = await encMediaPage.updateEncMedia(data);

      //     await validateResult(expectedValues, { encMediaPage });

      //     if (!errorExpected && result.status === "UPDATED") {
      //       const verifyData = {
      //         title: resolveFinal(data.updatedTittle, result.existing.title),
      //         mediaType: resolveFinal(data.updatedMediaType, result.existing.mediaType),
      //         mediaSize: resolveFinal(data.updatedMediaSize, result.existing.mediaSize),
      //         language: resolveFinal(data.updatedLanguage, result.existing.language),
      //         encMedia_url: resolveFinal(data.updatedEncMedia_url, result.existing.encMedia_url),
      //         decryption_Algorithm: resolveFinal(
      //           data.updatedDecryption_Algorithm,
      //           result.existing.decryption_Algorithm
      //         ),
      //         thumbnail_url: resolveFinal(
      //           data.updatedThumbnail_url,
      //           result.existing.thumbnail_url
      //         ),
      //         duration: resolveFinal(data.updatedDuration, result.existing.duration),
      //         productNames: resolveFinal(
      //           data.updatedProductNames,
      //           result.existing.productNames
      //         ),
      //         nonce: resolveFinal(data.updatedNonce, result.existing.nonce),
      //       };


      //       console.log("verifing data after update:", verifyData);

      //       await encMediaPage.findRowAndAction(page, verifyData, "assertPresent");
      //     }
      //     break;

      //   }
      //   case "delete": {
      //     await encMediaPage.deleteEncMedia(data);
      //     await validateResult(expectedValues, { encMediaPage });

      //     if (!errorExpected) {
      //       await encMediaPage.findRowAndAction(page, data, "assertNotPresent");
      //     }
      //     break;
      //   }
      //   default: {
      //     throw new Error(`❌ Invalid action in sheet: ${data.action}`);
      //   }
      // }


      if (data.action === "create") {
        const title = await encMediaPage.createEncMedia(data);
        await validateResult(expectedValues, { encMediaPage });

        await page.waitForTimeout(3000);


        if (!errorExpected) {
          await encMediaPage.openEditModalByTitle(title);
          const actual = await encMediaPage.readEncMediaForm();
          console.log("ACTUAL FORM DATA:", actual);
          for (const key of Object.keys(actual)) {
            // skip validation fields not provided in sheet
            if (data[key] === null || data[key] === undefined) continue;

            expect(
              normalize(actual[key]),
              `Mismatch in field: ${key}`
            ).toBe(normalize(data[key]));
          }

          ///////
          await encMediaPage.closeModal();

        }
      }

      if (data.action === "update") {
        const result = await encMediaPage.updateEncMedia(data);
        await validateResult(expectedValues, { encMediaPage });

        if (result.status === "UPDATED" && !errorExpected) {
          // 🔹 Decide which title to search
          const finalTitle = resolveFinal(
            data.updatedTittle,
            result.OldData.title
          );

          // 🔹 Open edit modal using FINAL title
          await encMediaPage.openEditModalByTitle(finalTitle);

          const actual = await encMediaPage.readEncMediaForm();
          console.log("UPDATED FORM DATA:", actual);

          const finalMediaType = resolveFinal(
            data.updatedMediaType,
             result.OldData.mediaType
          );

          const finalDecryptionAlgo = resolveFinal(
            data.updatedDecryption_Algorithm,
            result.OldData.decryption_Algorithm
          );

          // 🔹 Base expected object (always present)
          const expected = {
            title: resolveFinal(data.updatedTittle, result.OldData.title),
            mediaType: finalMediaType,
            mediaSize: resolveFinal(data.updatedMediaSize, result.OldData.mediaSize),
            language: resolveFinal(data.updatedLanguage, result.OldData.language),
            encMedia_url: resolveFinal(
              data.updatedEncMedia_url,
              result.OldData.encMedia_url
            ),
            decryption_Algorithm: finalDecryptionAlgo,
            thumbnail_url: resolveFinal(
              data.updatedThumbnail_url,
              result.OldData.thumbnail_url
            ),
            duration: resolveFinal(
              data.updatedDuration,
              result.OldData.duration
            ),
          };


          if (finalMediaType === "Audio") {
            expected.backgroudplay = resolveFinal(
              data.updatedBackgroudplay,
              result.OldData.backgroudplay
            );

            expected.controllerOption = resolveFinal(
              data.updatedControllerOption,
              result.OldData.controllerOption
            );
          }

          if (finalMediaType === "Video") {
            expected.controllerOption = resolveFinal(
              data.updatedControllerOption,
              result.OldData.controllerOption);
          }
          if ( finalDecryptionAlgo === "aesGcm" || finalDecryptionAlgo === "aesHls128") {
            expected.nonce = resolveFinal(data.updatedNonce,result.OldData.nonce);
          }

          for (const key of Object.keys(expected)) {
            expect(
              normalize(actual[key]),
              `Mismatch in field: ${key}`
            ).toBe(normalize(expected[key]));
          }


          await encMediaPage.closeModal();
        }
      }

      if (data.action === "delete") {
        await encMediaPage.deleteByTitle(data.title);
        await validateResult(expectedValues, { encMediaPage });

        await page.waitForTimeout(3000);

        const row = await encMediaPage.findRowByTitle(data.title);
        expect(row).toBeNull();
      }

    }
    );
  });

});
