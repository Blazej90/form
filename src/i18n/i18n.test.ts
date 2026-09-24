import { describe, expect, it } from "vitest";
import { en } from "./en";
import { pl } from "./pl";

const flattenKeys = (obj: Record<string, unknown>, prefix = ""): string[] =>
  Object.entries(obj).flatMap(([key, value]) =>
    value && typeof value === "object"
      ? flattenKeys(value as Record<string, unknown>, `${prefix}${key}.`)
      : [`${prefix}${key}`]
  );

const flattenValues = (obj: Record<string, unknown>): string[] =>
  Object.values(obj).flatMap((value) =>
    value && typeof value === "object"
      ? flattenValues(value as Record<string, unknown>)
      : [String(value)]
  );

describe("i18n dictionaries", () => {
  it("pl has exactly the same keys as en", () => {
    expect(flattenKeys(pl).sort()).toEqual(flattenKeys(en).sort());
  });

  it.each([
    ["en", en],
    ["pl", pl],
  ] as const)("%s has no empty translation values", (_, dictionary) => {
    const empty = flattenValues(dictionary).filter(
      (value) => value.trim() === ""
    );
    expect(empty).toEqual([]);
  });
});
