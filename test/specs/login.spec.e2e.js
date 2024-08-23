import loginPage from "../pageobjects/login.page.js";
import inventoryPage from "../pageobjects/inventory.page.js";
import { faker } from "@faker-js/faker";

describe("Login page", () => {
    beforeEach(async () => {
        await loginPage.open();
    });

    it("Login with valid credentials", async () => {
        await loginPage.login(process.env.VALID_USERNAME, process.env.VALID_PASSWORD);
        await expect(inventoryPage.title).toBeExisting();
        await expect(inventoryPage.title).toHaveText("Products");
    });

    it("Login with the locked out user", async () => {
        await loginPage.login("locked_out_user", process.env.VALID_PASSWORD);
        await expect(loginPage.errorMessage).toBeExisting();
        await expect(loginPage.errorMessage).toHaveText("Epic sadface: Sorry, this user has been locked out.");
    });

    it("Login with the empty username field", async () => {
        await loginPage.login("", process.env.VALID_PASSWORD);
        await expect(loginPage.errorMessage).toBeExisting();
        await expect(loginPage.errorMessage).toHaveText("Epic sadface: Username is required");
    });

    it("Login with the empty password field", async () => {
        await loginPage.login(process.env.VALID_USERNAME, "");
        await expect(loginPage.errorMessage).toBeExisting();
        await expect(loginPage.errorMessage).toHaveText("Epic sadface: Password is required");
    });

    it("Login with an invalid username", async () => {
        await loginPage.login(faker.internet.userName(), process.env.VALID_PASSWORD);
        await expect(loginPage.errorMessage).toBeExisting();
        await expect(loginPage.errorMessage).toHaveText("Epic sadface: Username and password do not match any user in this service");
    });

    it("Login with an invalid password", async () => {
        await loginPage.login(process.env.VALID_USERNAME, faker.internet.password());
        await expect(loginPage.errorMessage).toBeExisting();
        await expect(loginPage.errorMessage).toHaveText("Epic sadface: Username and password do not match any user in this service");
    });
});

