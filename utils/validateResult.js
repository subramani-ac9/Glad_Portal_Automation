import { assertions } from '../assertions';

export async function validateResult(expectedList, pages) {

  const expectedArray = Array.isArray(expectedList)
    ? expectedList
    : expectedList.split(',').map(e => e.trim());

  for (const expected of expectedArray) {

    const assertionFn = assertions[expected];

    if (!assertionFn) {
      throw new Error(`❌ No assertion defined for expected result: ${expected}`);
    }
    await assertionFn(pages);
  }
}
