export const en = {
  header: {
    appTitle: "Form Builder",
    formNamePlaceholder: "Enter form name",
    addField: "+ Add new field",
  },
  fieldCard: {
    title: "Field settings card",
    description: "Form field configuration",
    typeLabel: "Field type",
    typePlaceholder: "Select type",
    types: {
      text: "Text",
      textarea: "Text area",
      select: "Dropdown list",
      checkboxGroup: "Checkboxes",
      switch: "Switch",
    },
    labelLabel: "Field label",
    labelPlaceholder: "Enter field name",
    placeholderLabel: "Placeholder text",
    placeholderPlaceholder: "Placeholder text",
    selectOptionsLabel: "Dropdown options",
    optionPlaceholder: "Option",
    checkboxOptionPlaceholder: "Checkbox name",
    addAnotherCheckbox: "Add another checkbox",
    add: "+ Add",
    remove: "Remove",
    required: "Required",
    removeField: "Remove field",
  },
  preview: {
    selectPlaceholder: "Select an option",
    submit: "Submit",
  },
  validation: {
    required: "This field is required",
    requiredSwitch: "This switch must be turned on",
  },
  submitDialog: {
    title: "Thank you!",
    description: "Your data has been submitted successfully.",
    formData: "Form data:",
    file: "File:",
    noSelection: "No selection",
    yes: "Yes",
    no: "No",
    cancel: "Cancel",
    ok: "OK",
  },
  dropZone: {
    upload: "Upload a file",
    hint: "Or drag and drop PNG, JPG files up to 10MB",
  },
  rotateHint: {
    line1: "Rotate your screen horizontally",
    line2: "to comfortably use the form builder.",
  },
  theme: {
    toggle: "Toggle theme",
    light: "Light",
    dark: "Dark",
    system: "System",
  },
  language: {
    toggle: "Change language",
  },
};

export type Translations = typeof en;
