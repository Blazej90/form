# Form Builder

A visual, no-code form builder built with **Next.js** and **React**. Design forms in a live editor panel and see them rendered in real time — no backend required.

> **Note:** The user interface is fully internationalized — available in **Polish** and **English** (switchable in the header).

## Overview

Form Builder is a fully client-side, single-page application that lets you compose custom forms by adding and configuring fields. The screen is split into two panels:

- **Left panel – Editor:** set the form title and add field cards. Each field can be configured with:
  - Field type: `text`, `textarea`, `select` (dropdown), `checkbox-group`, or `switch`
  - Label and placeholder
  - Options list (for selects and checkbox groups)
  - "Required" toggle
  - Field deletion
- **Right panel – Live preview:** renders the form exactly as configured, in real time. Includes an image drop zone (PNG/JPG upload with preview) and a submit button that opens a summary dialog with all entered data.

### Additional features

- **PL / EN internationalization** via a lightweight custom `LanguageProvider` (React Context), persisted in `localStorage`
- **Dark / light mode** toggle powered by `next-themes`
- **Responsive guard:** on portrait-oriented screens, the app shows an animated "rotate your screen" hint instead of the builder
- **In-memory state only** — no backend, no persistence; submitted data is displayed in a dialog and the form resets

## Tech Stack

| Category | Technologies |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router, Turbopack) |
| Library | [React 19](https://react.dev/) |
| Language | TypeScript 5 |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/), tailwindcss-animate, tailwind-merge, tailwind-variants, class-variance-authority, clsx |
| UI components | [shadcn/ui](https://ui.shadcn.com/) (new-york style) on [Radix UI](https://www.radix-ui.com/) primitives, react-aria-components |
| Icons | lucide-react, justd-icons |
| Animation | [framer-motion](https://motion.dev/) |
| Theming | next-themes |
| File upload | react-dropzone |
| Linting & formatting | ESLint 9, Prettier 3 |

## Getting Started

### Prerequisites

- Node.js 18.18+ (recommended: latest LTS)
- [pnpm](https://pnpm.io/) (this project uses pnpm as its package manager)

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The dev server runs with Turbopack for fast refresh.

### Other scripts

```bash
pnpm build   # Create a production build
pnpm start   # Start the production server
pnpm lint    # Run ESLint
```

## Project Structure

```
src/
├── app/                     # Next.js App Router
│   ├── layout.tsx           # Root layout (Geist fonts, wraps the app)
│   ├── page.tsx             # Entry point (app renders from LayoutClient)
│   └── globals.css          # Tailwind + CSS variables
├── components/
│   ├── layout-client.tsx    # Core: global state (title, fields), panel layout, orientation check
│   ├── theme-provider.tsx   # next-themes wrapper
│   ├── left-panel/          # Form editor
│   │   ├── left-panel.tsx
│   │   ├── left-panel-header.tsx
│   │   ├── left-field-list.tsx
│   │   └── field-card.tsx   # Per-field configuration UI
│   ├── right-panel/         # Live form preview
│   │   ├── right-panel.tsx
│   │   ├── form-title.tsx
│   │   ├── right-field-list.tsx
│   │   ├── field-renderer.tsx
│   │   ├── drop-zone.tsx    # Image upload (JPG/PNG, max 10MB)
│   │   └── submit-button.tsx # Submit dialog with data summary
│   └── ui/                  # shadcn/ui-style reusable components
├── i18n/                    # Internationalization (PL/EN)
│   ├── language-provider.tsx # Language context + useTranslation() hook
│   ├── en.ts                # English translations (source of truth for keys)
│   └── pl.ts                # Polish translations
├── lib/
│   └── utils.ts             # cn() helper (clsx + tailwind-merge)
└── types/
    └── types.ts             # Field interface and FieldType union
```

## Data Model

All fields are described by a single interface:

```ts
type FieldType = "text" | "textarea" | "select" | "checkbox-group" | "switch";

interface FieldOption {
  id: string;
  value: string;
}

interface Field {
  id: string;
  type: FieldType;
  label: string;
  placeholder: string;
  required: boolean;
  options?: FieldOption[];
}
```

State is managed with plain React `useState` lifted to the `LayoutClient` component — no external state or form libraries are used.
