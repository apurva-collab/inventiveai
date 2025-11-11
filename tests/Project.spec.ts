import {test, ProjectData} from './Fixture';
import { LoginPage } from '../pageobjects/LoginPage';
import { ProjectPage } from '../pageobjects/ProjectPage';

/**
 * Test Case: P100
 * Description: Verifies the complete flow for the Project Module
 * Elements Verified : 
 * - Project Button
 * - Project Creation
 * - Project Deletion
 */

let loginPage: LoginPage;
let projectPage: ProjectPage;

test.describe('To validate the Project Module Functionality', () => {


test.beforeEach(async ({ loginPage: fixtureLoginPage, projectPage: fixtureProjectPage }) => {
    loginPage = fixtureLoginPage;
    projectPage = fixtureProjectPage;
    await loginPage.goto();
  });

test('P101_To verify "New Project" button is visible and clickable', async () => {
    await projectPage.clickOnProjectButton();
    await projectPage.validateProjectButtonVisible();
  });

test('P102_To verify Project creation and deletion functionality', async () => {
    await projectPage.createNewProject(ProjectData.title, ProjectData.samplePdfFile);
    await projectPage.validateProjectCreationAndDeletion(ProjectData.title);
  });

});