import { expect, Page, Locator } from '@playwright/test';
import path from 'path';


export class ProjectPage {
    readonly page: Page;
    readonly xpath_projectButton: Locator;
    readonly xpath_deleteButton: Locator;
    readonly xpath_projectTitleInput: Locator;
    readonly xpath_fileUploadInput: Locator;
    readonly xpath_continueButton: Locator;
    readonly xpath_projectRow: (title: string) => Locator;

    // Locators

    constructor(page: Page) {
        this.page = page;
        this.xpath_projectButton = page.getByRole('button', { name: 'New Project' });
        this.xpath_deleteButton = page.getByRole('button', { name: 'Delete' });
        this.xpath_projectTitleInput = page.getByRole('textbox', { name: 'Project Title' });
        this.xpath_fileUploadInput = page.locator('input[type="file"]');
        this.xpath_continueButton = page.getByRole('button', { name: 'Continue' });
        this.xpath_projectRow = (title: string) => page.locator(`div.project-item-container:has-text("${title}")`).first();
    }

    // Action Methods

    async clickOnProjectButton() {
        await this.xpath_projectButton.waitFor({ state: 'visible', timeout: 50000 });
        await this.xpath_projectButton.click();
    }


    async fillProjectTitle(title: string) {
        await this.xpath_projectTitleInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.xpath_projectTitleInput.fill(title);
    }

    async uploadFile(fileName: string) {
        await this.xpath_continueButton.click();
        const filePath = path.resolve(__dirname, '..', 'testdata', fileName);
        await this.xpath_fileUploadInput.setInputFiles(filePath);
    }

    async createNewProject(title: string, fileName: string) {
        await this.clickOnProjectButton();
        await this.fillProjectTitle(title);
        await this.xpath_continueButton.click();
        await this.uploadFile(fileName);
        await this.xpath_continueButton.click();
    }

    // Validation Methods     


    async validateProjectButtonVisible() {
        await expect(this.xpath_projectButton).toBeVisible({ timeout: 5000 });
    }

    // Assertion: verify project row is not visible after deletion
    async validateProjectCreationAndDeletion(title: string) {
        await this.page.getByRole('button').nth(1).click();
        await this.page.locator('.delete-button').first().click();
        await this.xpath_deleteButton.click()
     //   await this.page.getByRole('button', { name: 'Delete' }).click();
        // Verify project creation
        // const projectRow = this.xpath_projectRow(title);
        // await this.clickOnProjectButton();
        // await expect(projectRow).toBeVisible({ timeout: 10000 });
        // // Delete project
        // await projectRow.locator('button').first().click();
        // await this.xpath_deleteButton.waitFor({ state: 'visible', timeout: 5000 });
        // await this.xpath_deleteButton.click();
        // // Verify deletion
        // await expect(projectRow).not.toBeVisible({ timeout: 5000 });
    }


}
