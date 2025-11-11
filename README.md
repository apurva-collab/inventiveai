# Playwright TS Demo — Quick Setup Guide

This guide will help you quickly set up and run tests for a Playwright + TypeScript project.

---

## 1. Requirements
- Node.js v16+ (comes with npm)  
- macOS terminal (commands below use macOS syntax)  

---

## 2. Install dependencies
Open a terminal in your project root (`/Users/crownstack/Documents/playwright-ts-demo`) and run:

```bash
npm install
# if dotenv or Node types are missing:
npm install dotenv
npm install -D @types/node
(Optional) Add a test script in package.json:
"scripts": {
  "test": "playwright test"
}
3. Environment variables
Create a .env file at the project root with:
BASE_URL=https://your-app-url.example
USERNAME=your_username
PASSWORD=your_password
Hide .env from git:
echo ".env" >> .gitignore
4. Load .env globally
Add this at the top of playwright.config.ts:
import 'dotenv/config';
✅ This makes process.env available in all tests and page objects.
You don’t need to import dotenv in page objects or test files.
5. Run tests
Run all tests:
npx playwright test
# or
npm test
Run a specific test file:
npx playwright test tests/Login.spec.ts
Run a single test in headed mode (useful for debugging):
npx playwright test tests/Login.spec.ts --headed --debug
6. Common fixes
Red underline on process.env in TypeScript
npm install -D @types/node
Then restart TS server in VS Code: Command+Shift+P → "TypeScript: Restart TS Server"
Cannot find module 'dotenv'
npm install dotenv
Ensure import 'dotenv/config' is at the top of playwright.config.ts.
File upload path errors
Make sure the file exists and path is correct. Example used:
tests/Get_Started_With_Smallpdf.pdf
7. Notes about page objects
Page objects read env variables (BASE_URL, USERNAME, PASSWORD) via process.env.
Locators are initialized in the constructor (recommended pattern).
8. Next steps
Run tests and check results.
If a test fails, copy the stack trace and the relevant file when asking for help—it speeds up troubleshooting.
