import { sortArrayByKeys } from "./array";

describe("sortArrayByKeys", () => {
  it("sorts array by a string key in ascending order (case-insensitive)", () => {
    const items = [{ name: "banana" }, { name: "Apple" }, { name: "cherry" }];

    const result = sortArrayByKeys(items, { name: 1 });

    expect(result).toEqual([
      { name: "Apple" },
      { name: "banana" },
      { name: "cherry" },
    ]);
  });

  it("does not mutate the original input array", () => {
    const items = [{ name: "banana" }, { name: "Apple" }];
    const originalCopy = [...items];

    sortArrayByKeys(items, { name: 1 });

    expect(items).toEqual(originalCopy);
  });

  it("handles null or undefined values safely", () => {
    const items = [
      { name: "banana" },
      { name: null },
      { name: "apple" },
      { name: undefined },
    ];

    const result = sortArrayByKeys(
      items as Array<{ name: string | null | undefined }>,
      { name: 1 },
    );

    expect(result[0].name).toBeFalsy();
    expect(result[1].name).toBeFalsy();
    expect(result[2].name).toBe("apple");
    expect(result[3].name).toBe("banana");
  });

  it("sorts array by a string key in descending order", () => {
    const items = [{ name: "Apple" }, { name: "cherry" }, { name: "banana" }];

    const result = sortArrayByKeys(items, { name: -1 });

    expect(result).toEqual([
      { name: "cherry" },
      { name: "banana" },
      { name: "Apple" },
    ]);
  });

  it("sorts array by number keys", () => {
    const items = [{ age: 30 }, { age: 10 }, { age: 20 }];

    const result = sortArrayByKeys(items, { age: 1 });

    expect(result).toEqual([{ age: 10 }, { age: 20 }, { age: 30 }]);
  });

  it("sorts array by multiple keys in priority order", () => {
    const items = [
      { category: "fruit", name: "banana" },
      { category: "vegetable", name: "carrot" },
      { category: "fruit", name: "apple" },
    ];

    const result = sortArrayByKeys(items, { category: 1, name: 1 });

    expect(result).toEqual([
      { category: "fruit", name: "apple" },
      { category: "fruit", name: "banana" },
      { category: "vegetable", name: "carrot" },
    ]);
  });

  it("returns 0 and maintains relative order for identical values", () => {
    const items = [
      { group: "A", id: 1 },
      { group: "A", id: 2 },
    ];

    const result = sortArrayByKeys(items, { group: 1 });

    expect(result).toEqual([
      { group: "A", id: 1 },
      { group: "A", id: 2 },
    ]);
  });
});
