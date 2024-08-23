import loginPage from "../pageobjects/login.page.js";
import inventoryPage from "../pageobjects/inventory.page.js";
import cartPage from "../pageobjects/cart.page.js";
import { faker } from "@faker-js/faker";

describe("Checkout", () => {
  let productTitle;
  let productPrice;

  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login(process.env.VALID_USERNAME, process.env.VALID_PASSWORD);
    await expect(inventoryPage.title).toBeExisting();
    await expect(inventoryPage.title).toHaveText("Products");

    const products = await inventoryPage.allProducts;
    for (const item of products) {
      let removeButton = await inventoryPage.getRemoveButton(item);
      if (await removeButton.isDisplayed()) {
        await removeButton.click();
      }
    }

    const product = await inventoryPage.getAnyProduct();
    productTitle = await inventoryPage.getProductTitle(product);
    productPrice = await inventoryPage.getProductPrice(product);
    const addButton = await inventoryPage.getAddButton(product);

    const cartNumberElem = await inventoryPage.cartNumber;
    const cartNumber = (await cartNumberElem.isDisplayed()) ? parseInt(await cartNumberElem.getText()) : 0;
    await addButton.click();
    await expect(await inventoryPage.getRemoveButton(product)).toBeExisting();
    await expect(parseInt(await cartNumberElem.getText())).toEqual(cartNumber + 1);

    await inventoryPage.cartLink.click();
    const cartTitle = await cartPage.title;
    await expect(cartTitle).toBeExisting();
    await expect(cartTitle).toHaveText("Your Cart");
    const productCart = await cartPage.getProductByTitle(productTitle);
    await expect(productCart).toBeExisting();
    await expect(await cartPage.getProductPrice(productCart)).toEqual(productPrice);
  });

  it("Checkout", async () => {
    await cartPage.checkoutButton.click();
    let pageTitle = await cartPage.title;;
    await expect(pageTitle).toBeExisting();
    await expect(pageTitle).toHaveText("Checkout: Your Information");

    await cartPage.firstNameInput.setValue(faker.person.firstName());
    await cartPage.lastNameInput.setValue(faker.person.lastName());
    await cartPage.zipCodeInput.setValue(faker.location.zipCode());
    await cartPage.continueButton.click();

    pageTitle = await cartPage.title;;
    await expect(pageTitle).toBeExisting();
    await expect(pageTitle).toHaveText("Checkout: Overview");
    const productCart = await cartPage.getProductByTitle(productTitle);
    await expect(productCart).toBeExisting();
    await expect(await cartPage.getProductPrice(productCart)).toEqual(productPrice);

    await cartPage.finishButton.click();
    await expect(await cartPage.checkoutComplete).toHaveText("Thank you for your order!");
  });

  it("Checkout with empty first name field", async () => {
    await cartPage.checkoutButton.click();
    let pageTitle = await cartPage.title;;
    await expect(pageTitle).toBeExisting();
    await expect(pageTitle).toHaveText("Checkout: Your Information");

    await cartPage.firstNameInput.setValue("");
    await cartPage.lastNameInput.setValue(faker.person.lastName());
    await cartPage.zipCodeInput.setValue(faker.location.zipCode());
    await cartPage.continueButton.click();
    
    await expect(await cartPage.errorMessage).toHaveText("Error: First Name is required");
  });

  it("Checkout with empty last name field", async () => {
    await cartPage.checkoutButton.click();
    let pageTitle = await cartPage.title;;
    await expect(pageTitle).toBeExisting();
    await expect(pageTitle).toHaveText("Checkout: Your Information");

    await cartPage.firstNameInput.setValue(faker.person.firstName());
    await cartPage.lastNameInput.setValue("");
    await cartPage.zipCodeInput.setValue(faker.location.zipCode());
    await cartPage.continueButton.click();
    
    await expect(await cartPage.errorMessage).toHaveText("Error: Last Name is required");
  });

  it("Checkout with empty zip code field", async () => {
    await cartPage.checkoutButton.click();
    let pageTitle = await cartPage.title;;
    await expect(pageTitle).toBeExisting();
    await expect(pageTitle).toHaveText("Checkout: Your Information");

    await cartPage.firstNameInput.setValue(faker.person.firstName());
    await cartPage.lastNameInput.setValue(faker.person.lastName());
    await cartPage.zipCodeInput.setValue("");
    await cartPage.continueButton.click();
    
    await expect(await cartPage.errorMessage).toHaveText("Error: Postal Code is required");
  });

  it("Cancel the checkout", async () => {
    await cartPage.checkoutButton.click();
    let pageTitle = await cartPage.title;;
    await expect(pageTitle).toBeExisting();
    await expect(pageTitle).toHaveText("Checkout: Your Information");

    await cartPage.firstNameInput.setValue(faker.person.firstName());
    await cartPage.lastNameInput.setValue(faker.person.lastName());
    await cartPage.zipCodeInput.setValue(faker.location.zipCode());
    await cartPage.continueButton.click();

    pageTitle = await cartPage.title;;
    await expect(pageTitle).toBeExisting();
    await expect(pageTitle).toHaveText("Checkout: Overview");
    const productCart = await cartPage.getProductByTitle(productTitle);
    await expect(productCart).toBeExisting();
    await expect(await cartPage.getProductPrice(productCart)).toEqual(productPrice);

    await cartPage.cancelbutton.click();
    const inventorytitle = await inventoryPage.title;
    await expect(inventorytitle).toBeExisting();
    await expect(inventorytitle).toHaveText("Products");
  });
})