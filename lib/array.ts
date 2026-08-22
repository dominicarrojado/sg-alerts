export function sortArrayByKeys<T>(
  array: Array<T>,
  sortingConfig: Record<string, 1 | -1>,
): Array<T> {
  const transformIgnoreCase = (value: unknown): unknown => {
    if (value === null || value === undefined) {
      return "";
    }
    return typeof value === "string" ? value.toUpperCase() : value;
  };

  return [...array].sort((a, b) => {
    for (const key in sortingConfig) {
      const itemA = a as Record<string, unknown>;
      const itemB = b as Record<string, unknown>;

      const valueA = transformIgnoreCase(itemA[key]) as string | number;
      const valueB = transformIgnoreCase(itemB[key]) as string | number;

      if (valueA < valueB) {
        return sortingConfig[key] > 0 ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortingConfig[key] < 0 ? -1 : 1;
      }
    }

    return 0;
  });
}
