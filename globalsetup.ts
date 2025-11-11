import { chromium, FullConfig } from '@playwright/test';
import { LoginPage } from './pageobjects/LoginPage';
import fs from 'fs';
import path from 'path';

async function globalSetup(config: FullConfig) {
  const project = process.env.PROJECT;
  const authFile = path.resolve(__dirname, 'auth.json');

  // Skip setup for the login project
  if (project === 'chromium-login') {
    console.log('Skipping global setup for chromium-login project');
    return;
  }

  // Check if auth.json exists and has cookies
  let needsLogin = true;

  if (fs.existsSync(authFile)) {
    try {
      const authData = JSON.parse(fs.readFileSync(authFile, 'utf-8'));
      const cookies = authData.cookies || [];
      if (Array.isArray(cookies) && cookies.length > 0) {
        console.log('Existing cookies found in auth.json, skipping fresh login.');
        needsLogin = false;
      } else {
        console.log('Auth file found but cookies empty, performing fresh login...');
      }
    } catch {
      console.log('Failed to parse auth.json, performing fresh login...');
    }
  } else {
    console.log('auth.json not found, performing fresh login...');
  }

  if (needsLogin) {
    console.log('Launching browser to perform login...');

    // Getting credentials from environment variables
    const userName = process.env.USERNAME;
    const password = process.env.PASSWORD;

    // Validating that credentials are provided
    if (!userName || !password) {
      throw new Error('USERNAME and PASSWORD environment variables must be defined for login');
    }

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      locale: 'en-US', // Set browser language to English
    });
    const page = await context.newPage();

    // Initializing Page Object Model
    const loginPage = new LoginPage(page);

    try {
      // Navigating to the login page
      await loginPage.goto();
      console.log('Navigated to login page successfully');
      
      await loginPage.login(userName, password);
      console.log('Login flow completed');
    } catch (error) {
      console.error('Login failed with error:', error);
      await page.screenshot({ path: 'login-error.png', fullPage: true });
      console.log('Screenshot saved to login-error.png for debugging');
      throw error;
    }

    // Waiting for the dashboard page to load
    await page.waitForURL('**/projects', { timeout: 30000 });

    // Saving the authentication state (cookies + localStorage)
    await context.storageState({ path: authFile });
    await browser.close();

    console.log('Authentication state saved to auth.json successfully.');
  }
}

export default globalSetup;
