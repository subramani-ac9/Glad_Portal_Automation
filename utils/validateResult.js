import { assertions } from '../assertions';

export async function validateResult(expectedList, context) {

  const expectedArray = Array.isArray(expectedList)
    ? expectedList
    : expectedList.split(",").map(e => e.trim());

  for (const expected of expectedArray) {

    if (!expected || expected === "null") continue;
    const assertion = assertions[expected];
    if (!assertion) {
      throw new Error(`❌ No assertion defined for: ${expected}`);
    }

    // 🔒 Scope guard
    if (assertion.scope === "row" && !context.row) continue;
    // if (assertion.scope === "page" && !context.liveDarshanPage) continue;
  
   
    try {
      await assertion.fn(context);
      console.log(`✅ Assertion "${expected}" passed`);
    } catch (error) {
      console.error(`❌ Assertion "${expected}" failed`);
      console.error(error.message || error);
    }
  }
}
