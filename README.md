# Oireachtas Bills Viewer

A React + TypeScript web application for viewing and interacting with Irish legislative bills using the [Oireachtas API](https://api.oireachtas.ie/).

## ✨ Features

- 🧾 View paginated list of bills
- 🔍 Filter bills by type
- 📑 View English/Gaeilge bill titles in modal tabs
- ⭐ Favourite/unfavourite bills with mocked server response
- ❤️ View all favourited bills in a separate tab
- 💄 Clean UI built with Material UI
- 🧪 Unit testing and Storybook support
- 🔧 TypeScript, ESLint, Prettier integration

---

## 🧱 Tech Stack

- React 19
- TypeScript
- Material UI
- React Router
- Axios
- React Query
- Vite
- Vitest / Testing Library
- Storybook

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or yarn

### Install dependencies

```bash
npm install
# or
yarn install
```

## 🚀 Start Development Server (everythin further with npm examples)

```bash
npm run dev
```

## 🧪 Run Tests

```bash
npm run test
```

## 🚀 Start Storybook

```bash
npm run storybook
```

## 📁 Project Structure (Simplified)

```bash
src/
├── components/        # Reusable UI components (tables, modal, tabs, etc.)
├── pages/             # Page views
├── api/               # Axios & API utilities
├── hooks/             # React Query hooks and custom logic
├── types/             # TypeScript types/interfaces
├── utils/             # Helper functions
├── App.tsx            # Main app layout and routing
└── main.tsx           # App entry point
```

## 📌 Notes

The API interactions use mocked responses for favourites.

Clicking the ⭐ icon logs a simulated API request to the console.
