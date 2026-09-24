import { describe, expect, it } from "vitest";
import { validateFields } from "./validation";
import { Field, FieldType } from "@/types/types";

const makeField = (overrides: Partial<Field> = {}): Field => ({
  id: "field-1",
  type: "text",
  label: "Test field",
  placeholder: "",
  required: true,
  ...overrides,
});

describe("validateFields", () => {
  it("returns no errors when there are no fields", () => {
    expect(validateFields([], {})).toEqual({});
  });

  it("ignores fields that are not required", () => {
    const fields = (["text", "textarea", "select", "checkbox-group", "switch"] as FieldType[]).map(
      (type) => makeField({ id: type, type, required: false })
    );
    expect(validateFields(fields, {})).toEqual({});
  });

  it.each(["text", "textarea", "select"] as FieldType[])(
    "flags an empty %s field as required",
    (type) => {
      const field = makeField({ type });
      expect(validateFields([field], {})).toEqual({ "field-1": "required" });
      expect(validateFields([field], { "field-1": "" })).toEqual({
        "field-1": "required",
      });
      expect(validateFields([field], { "field-1": "   " })).toEqual({
        "field-1": "required",
      });
    }
  );

  it.each(["text", "textarea", "select"] as FieldType[])(
    "accepts a filled %s field",
    (type) => {
      const field = makeField({ type });
      expect(validateFields([field], { "field-1": "value" })).toEqual({});
    }
  );

  it("flags a checkbox-group with no selection", () => {
    const field = makeField({ type: "checkbox-group" });
    expect(validateFields([field], {})).toEqual({ "field-1": "required" });
    expect(validateFields([field], { "field-1": [] })).toEqual({
      "field-1": "required",
    });
  });

  it("accepts a checkbox-group with at least one selection", () => {
    const field = makeField({ type: "checkbox-group" });
    expect(validateFields([field], { "field-1": ["a"] })).toEqual({});
  });

  it("flags a required switch that is turned off", () => {
    const field = makeField({ type: "switch" });
    expect(validateFields([field], {})).toEqual({
      "field-1": "requiredSwitch",
    });
    expect(validateFields([field], { "field-1": false })).toEqual({
      "field-1": "requiredSwitch",
    });
  });

  it("accepts a required switch that is turned on", () => {
    const field = makeField({ type: "switch" });
    expect(validateFields([field], { "field-1": true })).toEqual({});
  });

  it("reports errors per field when validating multiple fields", () => {
    const fields = [
      makeField({ id: "a", type: "text" }),
      makeField({ id: "b", type: "switch" }),
      makeField({ id: "c", type: "checkbox-group", required: false }),
    ];
    expect(validateFields(fields, { a: "filled" })).toEqual({
      b: "requiredSwitch",
    });
  });
});
