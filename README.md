# Playwright TypeScript Practice

A Playwright test automation project using TypeScript with the Page Object Model pattern.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm

## Setup

```bash
npm install
npx playwright install
```

## Running Tests

```bash
# Run tests with UI mode
npm run tests

# Run tests headlessly
npx playwright test

# Run tests in a specific browser
npx playwright test --project=chromium
```

## Project Structure

```
├── tests/
│   ├── page-object/       # Page Object classes
│   │   └── headerPage.ts
│   └── example.spec.ts    # Test specs
├── playwright.config.ts   # Playwright configuration
└── .github/workflows/     # CI pipeline
```

## CI

Tests run automatically on push via GitHub Actions (`.github/workflows/playwright.yml`).

## Reports

After a test run, view the HTML report with:

```bash
npx playwright show-report
```
