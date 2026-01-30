import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { EncMediapage } from '../pages/EncMediaPage';

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

    await encMediaPage.createNewBtn.click();
    // await page.locator('//tbody/tr[1]/td[6]/div[1]/button[2]/img[1]').click();
    await page.waitForTimeout(2000);

});

// test('select values for create and update', async ({ page }) => {
//     const multiSelect = page.locator('div[role="combobox"]').nth(3);

//     // Read already-selected values (update case)
//     const selectedValues = await page
//         .locator('.mantine-MultiSelect-value')
//         .allTextContents();

//     const desiredValues = [
//         'Happiness Program (3 Days)',
//         'Online Meditation and Breath Workshop for Youth',
//         'Happiness Program For Youth (HPFY)',
//     ];

//     const valuesToAdd = desiredValues.filter(
//         value => !selectedValues.some(selected => selected.includes(value))
//     );

//     await multiSelect.click();


//     for (const value of valuesToAdd) {
//         // Open dropdown every time (Mantine may close it)

//         const listbox = page.locator('div[role="listbox"]');
//         await expect(listbox).toBeVisible();

//         await listbox
//             .locator('div[role="option"]', { hasText: value })
//             .click();
//     }

//     const encMediaPage = new EncMediapage(page);

//     await encMediaPage.updateBtn.click();

//     // Final assertion
//     for (const value of desiredValues) {
//         await expect(
//             page.locator('.mantine-MultiSelect-value', { hasText: value })
//         ).toBeVisible();
//     }
// });


test('sync Mantine MultiSelect values (create + update)', async ({ page }) => {
    // const multiSelect = page.locator('div[role="combobox"]').nth(3);
    const multiSelect = page.getByLabel('Product Names', { exact: true });

    // 1️⃣ Read currently selected values (chips)
    const selectedValues = await page
        .locator('.mantine-MultiSelect-value')
        .allTextContents();

    console.log("selected values:", selectedValues);

    const op = [
        "Happiness Program (HP)",
        "Online Meditation and Breath Workshop (OnHaPo)",
        "Online Meditation and Breath Workshop for Youth (OnlinHPY)",
        "Online Sahaj Samadhi Dhyana Yoga (OSSDY)",
        "Sahaj Samadhi Dhyana Yoga 1on1 (S1t1)",
        "Happiness Program (3 Days) (3 HP)",
        "Online Sahaj Samadhi Dhyana Yoga 1on1 (OS11)",
        "Happiness Program For Youth (HPFY)",
        "Sahaj Samadhi Dhyan Yoga (SJ)",
        "test ()"
    ];


    const desiredValues = [
        "Happiness Program (HP)",
        "Online Meditation and Breath Workshop (OnHaPo)",
        "Online Sahaj Samadhi Dhyana Yoga 1on1 (OS11)",
        "Sahaj Samadhi Dhyana Yoga 1on1 (S1t1)"
    ];

    // Normalize text (important for Mantine spacing)
    const normalize = v => v.trim();

    const normalizedSelected = selectedValues.map(normalize);
    const normalizedDesired = desiredValues.map(normalize);

    // 2️⃣ VALUES TO REMOVE (selected but not desired)
    const valuesToRemove = normalizedSelected.filter(
        value => !normalizedDesired.includes(value)
    );

    // 3️⃣ VALUES TO ADD (desired but not selected)
    const valuesToAdd = normalizedDesired.filter(
        value => !normalizedSelected.includes(value)
    );

    // 4️⃣ Remove unwanted values
    for (const value of valuesToRemove) {
        const chip = page.locator('.mantine-MultiSelect-value', { hasText: value });
        if (await chip.count()) {
            await chip.locator('button').click();
        }
    }

    await multiSelect.click();

    // 5️⃣ Add missing values
    for (const value of valuesToAdd) {

        const listbox = page.locator('div[role="listbox"]');
        await expect(listbox).toBeVisible();

        await listbox
            .locator('div[role="option"]', { hasText: value })
            .click();
    }

    const encMediaPage = new EncMediapage(page);

    await encMediaPage.updateBtn.click();

    // 6️⃣ Final assertion — EXACT match
    const finalValues = await page
        .locator('.mantine-MultiSelect-value')
        .allTextContents();

    console.log("final values and desired values",finalValues,normalizedDesired);

    expect(finalValues.map(normalize).sort()).toEqual(
        normalizedDesired.sort()
    );
});
