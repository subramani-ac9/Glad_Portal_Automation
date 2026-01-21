import { expect } from "@playwright/test";

export function toInputDateFormat(dateStr) {
  if (!dateStr || dateStr === "null") return null;

  // Accepts DD-MM-YYYY
  const [dd, mm, yyyy] = dateStr.split("-");

  if (!dd || !mm || !yyyy) return null;

  return `${yyyy}-${mm}-${dd}`; // HTML date format
}

export function formatDateForUI(sheetDate) {
  console.log("Formatting date for UI:", sheetDate);
  const [day, month, year] = sheetDate.split("-");
  const dateObj = new Date(`${year}-${month}-${day}`);

  const formatted = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return formatted; // "Jun 20, 2044"
}

function normalize(text) {
  return text.replace(/\s+/g, " ").trim();
}

// export async function findRowAndAction(page, data, operation) {
//   const uiDate = formatDateForUI(data.date);

//   // Always start from first page
//   const firstPageBtn = page.getByRole("button", { name: "1" });
//   if (await firstPageBtn.isVisible()) {
//     await firstPageBtn.click();
//     await page.waitForLoadState("networkidle");
//   }

//   let retrySamePageOnce = false;

//   while (true) {
//     // 🔒 Wait until REAL data rows appear (not placeholder rows)
//     await expect
//       .poll(
//         async () => {
//           const rows = page.locator("table tbody tr");
//           const count = await rows.count();

//           if (count === 0) return false;

//           for (let i = 0; i < count; i++) {
//             const text = (await rows.nth(i).innerText()).toLowerCase();
//             if (!text.includes("no data") && !text.includes("create")) {
//               return true;
//             }
//           }
//           return false;
//         },
//         { timeout: 60000 }
//       )
//       .toBeTruthy();

//     const rows = page.locator("table tbody tr");
//     const rowCount = await rows.count();
//     console.log(`🔍 Searching ${rowCount} rows...`);

//     for (let i = 0; i < rowCount; i++) {
//       const row = rows.nth(i);

//       const dateCell = normalize(await row.locator("td").nth(0).innerText());
//       const timeCell = normalize(await row.locator("td").nth(1).innerText());
//       const timezoneCell = normalize(
//         await row.locator("td").nth(2).innerText()
//       );

//       // Skip placeholder rows
//       if (dateCell.includes("no data") || dateCell.includes("create")) {
//         continue;
//       }

//       console.log(`Checking → ${dateCell} | ${timeCell} | ${timezoneCell}`);

//       if (
//         dateCell.includes(uiDate) &&
//         timeCell.includes(data.start_time) &&
//         timezoneCell.includes(data.timezone)
//       ) {
//         console.log("✅ MATCH FOUND");

//         if (operation === "edit") {
//           const editIcon = row.getByAltText("Edit icon");

//           if (data.auto_zoom === "TRUE") {
//             await expect(editIcon).toBeDisabled();
//             return;
//           }

//           await editIcon.click();
//           return;
//         }

//         if (operation === "delete") {
//           await row.getByAltText("Delete icon").click();
//           return;
//         }

//         throw new Error(`Unknown operation: ${operation}`);
//       }
//     }

//     // 👉 Pagination handling
//     const nextButton = page.getByRole("button", { name: "Next" });

//     if (await nextButton.isDisabled()) {
//       if (!retrySamePageOnce) {
//         console.log("⏳ Next disabled — retrying same page once...");
//         retrySamePageOnce = true;
//         await page.waitForTimeout(3000);
//         continue;
//       }

//       throw new Error(
//         `❌ Record not found → ${uiDate} ${data.start_time} ${data.timezone}`
//       );
//     }

//     retrySamePageOnce = false;
//     await nextButton.click();
//     await page.waitForLoadState("networkidle");
//   }
// }

export function isErrorExpected(expected) {
  return expected.some(
    (value) => value.includes("error") || value.includes("required"),
  );
}

export async function findRowAndAction(page, data, operation) {
  const uiDate = formatDateForUI(data.date);

  // Always start from first page
  const firstPageBtn = page.getByRole("button", { name: "1" });
  if (await firstPageBtn.isVisible()) {
    await firstPageBtn.click();
    await page.waitForLoadState("networkidle");
  }

  let retrySamePageOnce = false;
  let found = false;

  while (true) {
    // Wait until real rows appear
    await expect
      .poll(
        async () => {
          const rows = page.locator("table tbody tr");
          const count = await rows.count();
          if (count === 0) return false;

          for (let i = 0; i < count; i++) {
            const text = (await rows.nth(i).innerText()).toLowerCase();
            if (!text.includes("no data") && !text.includes("create")) {
              return true;
            }
          }
          return false;
        },
        { timeout: 60000 },
      )
      .toBeTruthy();

    const rows = page.locator("table tbody tr");
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);

      const dateCell = normalize(await row.locator("td").nth(0).innerText());
      const timeCell = normalize(await row.locator("td").nth(1).innerText());
      const timezoneCell = normalize(
        await row.locator("td").nth(2).innerText(),
      );

      if (dateCell.includes("no data") || dateCell.includes("create")) {
        continue;
      }

      if (
        dateCell.includes(uiDate) &&
        timeCell.includes(data.start_time) &&
        timezoneCell.includes(data.timezone)
      ) {
        found = true;

        // 🔹 Existing behavior (UNCHANGED)
        if (operation === "edit") {
          const editIcon = row.getByAltText("Edit icon");

          if (data.auto_zoom === "TRUE") {
            await expect(editIcon).toBeDisabled();
            return;
          }

          await editIcon.click();
          return;
        }

        if (operation === "delete") {
          await row.getByAltText("Delete icon").click();
          return;
        }

        // 🔹 NEW: search-only
        if (operation === "find") {
          return true;
        }

        if (operation === "assertPresent") {
          expect(true).toBeTruthy();
          return;
        }
      }
    }

    // Pagination
    const nextButton = page.getByRole("button", { name: "Next" });

    if (await nextButton.isDisabled()) {
      if (!retrySamePageOnce) {
        retrySamePageOnce = true;
        await page.waitForTimeout(3000);
        continue;
      }

      break;
    }

    retrySamePageOnce = false;
    await nextButton.click();
    await page.waitForLoadState("networkidle");
  }

  // 🔻 Final assertions
  if (operation === "assertNotPresent") {
    expect(found).toBeFalsy();
    return;
  }

  if (operation === "assertPresent") {
    expect(found).toBeTruthy();
    return;
  }

  if (operation === "find") {
    return found;
  }

  throw new Error(
    `❌ Record not found → ${uiDate} ${data.start_time} ${data.timezone}`,
  );
}
