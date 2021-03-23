/**
 * Get the differences of `a` and `b`. Added
 * values to `b` and removed values from `b`.
 */
export function getArrayDifferences<T>(
  a: T[],
  b: T[]
): [addedValues: T[], removedValues: T[]] {
  const addedValues: T[] = b.filter((item) => !a.includes(item));
  const removedValues: T[] = a.filter((item) => !b.includes(item));

  return [addedValues, removedValues];
}

export default null;
