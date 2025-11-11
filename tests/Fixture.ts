/**
 * This file contains test fixtures and setup configurations for Playwright tests.
 * It provides custom test fixtures and global setup functionality.
 */

import { test as base, expect as baseExpect } from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';
import { ProjectPage } from '../pageobjects/ProjectPage';
 
import LoginData from '../testdata/loginPageData.json';
import ProjectData from '../testdata/projectPageData.json';


/**
 * Extends the base Playwright test with custom fixtures.
 * These fixtures provide page objects and test data for use in test cases.
 */
type Fixtures = {
  loginPage: LoginPage;
  projectPage: ProjectPage;

};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  projectPage: async ({ page }, use) => {
    const projectPage = new ProjectPage(page);
    await use(projectPage);
  },
  


});

export { baseExpect as expect, LoginData, ProjectData };
