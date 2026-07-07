import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { readSheet } from "../utils/sheetReader";
import { PROVIDER_SHEET_URL } from "../utils/config";
import { isErrorExpected } from "../utils/dateUtils";
import { validateResult } from "../utils/validateResult";
import { ProductPage } from "../pages/ProductPage";
import { ProviderPage } from "../pages/ProviderPage";

// let page;
let testData = await readSheet(PROVIDER_SHEET_URL);
function normalize(val) {
  if (val === null || val === undefined || val === "null") return "";
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

test.describe("Provider", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const providerPage = new ProviderPage(page);

    await loginPage.goto("login");
    await loginPage.login(
      "test-tenant-admin-in@abovecloud9.ai",
      "Abovecloud@ac9",
    );
    await page.waitForTimeout(5000);

    await providerPage.productsIcon.click();
    await page.waitForTimeout(5000);
  });
  testData.forEach((data) => {
    const testMode = data.execute === "skip" ? test.skip : test;

    testMode(`${data.test_id} | ${data.action}`, async ({ page }) => {
      const providerPage = new ProviderPage(page);

      const expectedValues = data.expected.split(",").map((v) => v.trim());
      const errorExpected = isErrorExpected(expectedValues);
      console.log("error expected:", errorExpected);

      //CREATE
      if (data.action === "create") {
        const result = await providerPage.createProvider(data);
        await validateResult(expectedValues, { providerPage });

        await page.waitForTimeout(3000);
        console.log(result);
        if (!errorExpected) {
          await providerPage.openEditModalByProviderName(result.providerName);
          const actual = await providerPage.readProviderForm();
          for (const key of Object.keys(actual)) {
            // skip validation fields not provided in sheet
            if (
              data[key] === "null" ||
              data[key] === null ||
              data[key] === undefined
            )
              continue;
            console.log(
              normalize(actual[key]),
              "--compare with--",
              normalize(data[key]),
            );
            expect(normalize(actual[key]), `Mismatch in field: ${key}`).toBe(
              normalize(data[key]),
            );
          }

          await providerPage.closeModal();
        }
      }

      if (data.action === "update") {
        const result = await providerPage.updateProvider(data);
        await validateResult(expectedValues, { providerPage });

        await page.waitForTimeout(5000);

        if (result.status === "UPDATED" && !errorExpected) {
          // 🔹 Decide which provider name to search
          const finalProviderName = resolveFinal(
            data.UpdatedProviderName,
            result.OldData.providerName,
          );

          // 🔹 Open edit modal using FINAL provider name
          await providerPage.openEditModalByProviderName(finalProviderName);

          const actual = await providerPage.readProviderForm();
          console.log("UPDATED PROVIDER FORM DATA:", actual);

          const category = data.UpdatedCategory || result.OldData.category;
          const providerType =
            data.UpdatedProviderType || result.OldData.providerType;

          /* ---------------- BASE EXPECTED (ALWAYS) ---------------- */
          const expected = {
            providerName: resolveFinal(
              data.UpdatedProviderName,
              result.OldData.providerName,
            ),
            category: resolveFinal(
              data.UpdatedCategory,
              result.OldData.category,
            ),
            providerType: resolveFinal(
              data.UpdatedProviderType,
              result.OldData.providerType,
            ),
          };

          /* ---------------- AUTH ---------------- */
          if (category === "Auth") {
            if (["cognito", "whispering-infinity"].includes(providerType)) {
              Object.assign(expected, {
                clientId: resolveFinal(
                  data.UpdatedClientId,
                  result.OldData.clientId,
                ),
                region: resolveFinal(data.UpdatedRegion, result.OldData.region),
                userPoolId: resolveFinal(
                  data.UpdatedUserPoolId,
                  result.OldData.userPoolId,
                ),
              });
            }

            if (providerType === "cognito") {
              Object.assign(expected, {
                enableFederation: resolveFinal(
                  data.UpdatedEnableFederation,
                  result.OldData.enableFederation,
                ),
                enableBackgroundLogin: resolveFinal(
                  data.UpdatedEnableBackgroundLogin,
                  result.OldData.enableBackgroundLogin,
                ),
              });

              if (expected.enableFederation === "TRUE") {
                Object.assign(expected, {
                  fedClientSecret: resolveFinal(
                    data.UpdatedFedClientSecret,
                    result.OldData.fedClientSecret,
                  ),
                  fedDomain: resolveFinal(
                    data.UpdatedFedDomain,
                    result.OldData.fedDomain,
                  ),
                  fedUrl: resolveFinal(
                    data.UpdatedFedUrl,
                    result.OldData.fedUrl,
                  ),
                  fedOAuthScopes: resolveFinal(
                    data.UpdatedFedOAuthScopes,
                    result.OldData.fedOAuthScopes,
                  ),
                  fedExternalProvider: resolveFinal(
                    data.UpdatedFedExternalProvider,
                    result.OldData.fedExternalProvider,
                  ),
                });
              }

              if (expected.enableBackgroundLogin === "TRUE") {
                Object.assign(expected, {
                  bgErrorMessages: resolveFinal(
                    data.UpdatedBgErrorMessages,
                    result.OldData.bgErrorMessages,
                  ),
                  bgLinkRegex: resolveFinal(
                    data.UpdatedBgLinkRegex,
                    result.OldData.bgLinkRegex,
                  ),
                  bgLoginContent: resolveFinal(
                    data.UpdatedBgLoginContent,
                    result.OldData.bgLoginContent,
                  ),
                  bgErrorRegex: resolveFinal(
                    data.UpdatedBgErrorRegex,
                    result.OldData.bgErrorRegex,
                  ),
                });
              }
            }

            if (providerType === "api") {
              Object.assign(expected, {
                apiUrl: resolveFinal(data.UpdatedApiUrl, result.OldData.apiUrl),
                apiKey: resolveFinal(data.UpdatedApiKey, result.OldData.apiKey),
              });
            }
          }

          /* ---------------- SYNC ---------------- */
          if (category === "Sync" && providerType === "salesforce") {
            Object.assign(expected, {
              salesforceUrl: resolveFinal(
                data.UpdatedSalesforceUrl,
                result.OldData.salesforceUrl,
              ),
              salesforceApiEndpoint: resolveFinal(
                data.UpdatedSalesforceApiEndpoint,
                result.OldData.salesforceApiEndpoint,
              ),
              salesforceTokenEndpoint: resolveFinal(
                data.UpdatedSalesforceTokenEndpoint,
                result.OldData.salesforceTokenEndpoint,
              ),
              salesforceGrantType: resolveFinal(
                data.UpdatedSalesforceGrantType,
                result.OldData.salesforceGrantType,
              ),
              salesforceClientId: resolveFinal(
                data.UpdatedSalesforceClientId,
                result.OldData.salesforceClientId,
              ),
              salesforceClientSecret: resolveFinal(
                data.UpdatedSalesforceClientSecret,
                result.OldData.salesforceClientSecret,
              ),
            });
          }

          /* ---------------- URL SHORTENER ---------------- */
          if (
            category === "URL Shortener" &&
            ["rebrandly", "tinyurl"].includes(providerType)
          ) {
            Object.assign(expected, {
              urlShortenerApiKey: resolveFinal(
                data.UpdatedUrlShortenerApiKey,
                result.OldData.urlShortenerApiKey,
              ),
              urlShortenerApiUrl: resolveFinal(
                data.UpdatedUrlShortenerApiUrl,
                result.OldData.urlShortenerApiUrl,
              ),
            });
          }
          console.log("expectted:",expected)
          console.log("actual:",actual)


          /* ---------------- ASSERT ---------------- */
          for (const key of Object.keys(expected)) {
            expect(normalize(actual[key]), `Mismatch in field: ${key}`).toBe(
              normalize(expected[key]),
            );
          }

          await providerPage.closeModal();
        }
      }
    });
  });
});
