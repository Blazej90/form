import type { Translations } from "./en";

export const pl: Translations = {
  header: {
    appTitle: "Kreator formularza",
    formNamePlaceholder: "Wprowadź nazwę formularza",
    addField: "Dodaj nowe pole",
  },
  fieldCard: {
    title: "Karta ustawień pola",
    description: "Konfiguracja pola formularza",
    typeLabel: "Typ pola",
    typePlaceholder: "Wybierz typ",
    types: {
      text: "Tekst",
      textarea: "Pole tekstowe",
      select: "Lista rozwijana",
      checkboxGroup: "Pola wyboru",
      switch: "Przełącznik",
    },
    labelLabel: "Etykieta pola",
    labelPlaceholder: "Wprowadź nazwę pola",
    placeholderLabel: "Tekst zastępczy",
    placeholderPlaceholder: "Nazwa dla Placeholder",
    selectOptionsLabel: "Opcje listy rozwijanej",
    optionPlaceholder: "Opcja",
    checkboxOptionPlaceholder: "Nazwa checkbox",
    addAnotherCheckbox: "Dodaj kolejny checkbox",
    add: "+ Dodaj",
    remove: "Usuń",
    required: "Wymagane",
    removeField: "Usuń pole",
  },
  preview: {
    selectPlaceholder: "Wybierz opcję",
    submit: "Wyślij",
  },
  validation: {
    required: "To pole jest wymagane",
    requiredSwitch: "Ten przełącznik musi być włączony",
  },
  submitDialog: {
    title: "Dziękujemy!",
    description: "Twoje dane zostały przesłane pomyślnie.",
    formData: "Dane z formularza:",
    file: "Plik:",
    noSelection: "Brak wyboru",
    yes: "Tak",
    no: "Nie",
    cancel: "Anuluj",
    ok: "OK",
  },
  dropZone: {
    upload: "Prześlij plik",
    hint: "Lub przeciągnij i upuść pliki PNG, JPG do 10MB",
  },
  rotateHint: {
    line1: "Obróć ekran poziomo",
    line2: "aby wygodnie korzystać z kreatora formularza.",
  },
  theme: {
    toggle: "Zmień motyw",
    light: "Jasny",
    dark: "Ciemny",
    system: "Systemowy",
  },
  language: {
    toggle: "Zmień język",
  },
};
