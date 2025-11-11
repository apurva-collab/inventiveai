/**
 * Test Case: L100
 * Description: Verifies the complete flow for the Login Functionality
 * Elements Verified : 
 * - Valid Login
 * - Invalid Login
 * - Blank Credentials Login 
 */

import {test, LoginData } from './Fixture';
import { LoginPage } from '../pageobjects/LoginPage';

let loginPage: LoginPage;
let userName: string;
let password: string;
userName = process.env.USERNAME!;
password = process.env.PASSWORD!;

// Validate environment variables
if (!userName || !password) {
  throw new Error('USERNAME and PASSWORD must be defined in environment variables');
}

test.describe('To verify the functionality of Login Flow', () => {


  test.beforeEach(async ({ loginPage: fixtureLoginPage }) => {
    loginPage = fixtureLoginPage;
    await loginPage.goto();
  
  });

  test('L101_To verify login with valid credentials', async () => {
    await loginPage.login(userName, password);
    await loginPage.validateLoginSuccess();
  });

  test('L102_To verify login with invalid credentials', async () => {
    await loginPage.login(LoginData.inValidUsername, LoginData.inValidPassword);
    await loginPage.validateInvalidLogin();
  });

  test('L103_To verify login with blank credentials', async () => {
    await loginPage.enterUsername('');
    await loginPage.clickContinueButton();
    await loginPage.enterUsername(userName);
    await loginPage.clickContinueButton();
    await loginPage.enterPassword('');
    await loginPage.clickSignInButton();
    await loginPage.validateBlankLogin();    
  });
});
