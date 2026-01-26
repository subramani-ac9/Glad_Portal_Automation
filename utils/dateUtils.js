import { expect } from "@playwright/test";

export function toInputDateFormat(dateStr) {
  if (dateStr === "null") return null;

  if (dateStr === "") return ""

  const parts = dateStr.split("-");
  if (parts.length !== 3) return null;

  let day, month, year;

  // YYYY-MM-DD
  if (parts[0].length === 4) {
    [year, month, day] = parts;
  }
  // DD-MM-YYYY
  else {
    [day, month, year] = parts;
  }

  if (!day || !month || !year) return null;

  return `${year}-${month}-${day}`; // HTML input[type=date]
}

export function formatDateForUI(dateStr) {
  const normalized = toInputDateFormat(dateStr);
  if (!normalized) return "";

  const [year, month, day] = normalized.split("-");

  const dateObj = new Date(Number(year), Number(month) - 1, Number(day));

  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function normalize(text) {
  return text.replace(/\s+/g, " ").trim();
}

export async function handleInput(locator, value) {
  if (value === null || value === undefined || value === "null") {
    return false;
  } // skip

    console.log("loc",locator)

  if (value === "") {
    await locator.clear();
    return true; // cleared
  }

  const existingValue = (await locator.inputValue()).trim();
  const newValue = value.toString().trim();

  if (existingValue === newValue) return false; // no change

  await locator.fill(newValue);
  return true; // updated
}

export async function handleMantineSelect(locator, value, page) {
  if (value === null || value === undefined || value === "null") {
    return false;
  }

  const values = Array.isArray(value)
    ? value.map(v => v.toString().trim())
    : value.toString().split(",").map(v => v.trim());

  const isMultiSelect = await locator.evaluate(input =>
    input.closest(".mantine-MultiSelect-values") !== null
  );

  let existingValues = [];

  if (isMultiSelect) {
    existingValues = await locator.evaluate(input => {
      const wrapper = input.closest(".mantine-MultiSelect-values");
      const chips = wrapper.querySelectorAll('[data-value]');
      return Array.from(chips).map(c => c.textContent.trim());
    });
  } else {
    const currentValue = (await locator.inputValue()).trim();
    if (currentValue) existingValues = [currentValue];
  }

  let updated = false;

  for (const val of values) {
    if (existingValues.includes(val)) continue;

    // 🔁 Re-open dropdown every time
    await locator.click();

    const option = page.getByRole("option", { name: val });

    // ⏳ Wait until option is visible
    await option.waitFor({ state: "visible" });

    await option.click();
    updated = true;

    // Small stabilization wait (important for Mantine)
    await page.waitForTimeout(200);
  }

  return updated;
}


export async function openPopup(triggerBtn, popupTitle) {
  await triggerBtn.click();
  await popupTitle.waitFor({ state: "visible" });
}

export async function refreshList(refreshBtn, createEditDeleteSuccessMsg) {
  await refreshBtn.click();
  expect(createEditDeleteSuccessMsg).toBeVisible();

}


export async function getRowData(row) {
  return {
    date: normalize(await row.locator("td").nth(0).innerText()),
    start_time: normalize(await row.locator("td").nth(1).innerText()),
    timezone: normalize(await row.locator("td").nth(2).innerText()),
  };
}

export function isErrorExpected(expected) {
  return expected.some(value =>
    value.endsWith("_required_error") ||
    value.endsWith("_error")
  );
}
export async function findRowAndAction(page, data, operation) {
  console.log(data.date);
  const uiDate = formatDateForUI(data.date);
  console.log(uiDate, data.start_time, data.timezone);

  // Always start from first page
  const PreviousPageBtn = page.getByRole("button", { name: "Previous" });

  while (await PreviousPageBtn.isEnabled()) {
    await PreviousPageBtn.click();
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

      const date = normalize(await row.locator("td").nth(0).innerText());
      const time = normalize(await row.locator("td").nth(1).innerText());
      const tz = normalize(await row.locator("td").nth(2).innerText());

      const existingData = {
        date,
        start_time: time,
        timezone: tz,
      };

      console.log(`Checking → ${dateCell} | ${timeCell} | ${timezoneCell}`);

      if (
        dateCell.includes(uiDate) &&
        timeCell.includes(data.start_time) &&
        timezoneCell.includes(data.timezone)
      ) {
        found = true;
        console.log("✅ MATCH FOUND");

        if (operation === "edit") {
          const editIcon = row.getByAltText("Edit icon");

          // const existingData = await getRowData(row);
          if (data.auto_zoom === "TRUE") {
            await expect(editIcon).toBeDisabled();
            return { autozoom: true, row, existingData };
          }

          await editIcon.click();
          return { autozoom: false, row, existingData };
        }

        if (operation === "delete") {
          await row.getByAltText("Delete icon").click();
          return;
        }

        // 🔹 NEW: search-only
        if (operation === "find") {
          return true;
        }

        if (operation === "getRow") return row;

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
        console.log("⏳ Next disabled — retrying same page once...");
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
