import loginPage from "../pageobjects/login.page.js";
import inventoryPage from "../pageobjects/inventory.page.js";
import cartPage from "../pageobjects/cart.page.js";
import productPage from "../pageobjects/product.page.js";

describe("Inventory page", () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login();
    await expect(inventoryPage.title).toBeExisting();
    await expect(inventoryPage.title).toHaveText("Products");

    const products = await inventoryPage.allProducts;
    for (const item of products) {
      let removeButton = await inventoryPage.getRemoveButton(item);
      if (await removeButton.isDisplayed()) {
        await removeButton.click();
      }
    }
  });

  it("Verifying the \"About\" link", async () => {
    await inventoryPage.clickBurgerMenu();
    await inventoryPage.clickAboutLink();
    await expect(await browser.getUrl()).toEqual("https://saucelabs.com/");
  });

  it("Verifying the \"All items\" link", async () => {
    await inventoryPage.clickCartLink();
    const cartTitle = await cartPage.title;
    await expect(cartTitle).toBeExisting();
    await expect(cartTitle).toHaveText("Your Cart");

    await inventoryPage.clickBurgerMenu();
    await cartPage.clickAllItemsLink();
    const inventoryTitle = await inventoryPage.title;
    await expect(inventoryTitle).toBeExisting();
    await expect(inventoryTitle).toHaveText("Products");
  });

  it("Logout", async () => {
    await inventoryPage.clickBurgerMenu();
    await inventoryPage.clickLogoutLink();
    await expect(loginPage.title).toBeExisting();
    await expect(loginPage.title).toHaveText("Swag Labs");
  });

  it("Remove a product from the cart", async () => {
    const product = await inventoryPage.getAnyProduct();
    const title = await inventoryPage.getProductTitle(product);
    const price = await inventoryPage.getProductPrice(product);

    const cartNumberElem = await inventoryPage.cartNumber;
    const cartNumber = (await cartNumberElem.isDisplayed()) ? parseInt(await cartNumberElem.getText()) : 0;
    await inventoryPage.clickAddButton(product);
    await expect(await inventoryPage.getRemoveButton(product)).toBeExisting();
    await expect(parseInt(await cartNumberElem.getText())).toEqual(cartNumber + 1);

    await inventoryPage.clickCartLink();
    const productCart = await cartPage.getProductByTitle(title);
    await expect(productCart).toBeExisting();
    await expect(await cartPage.getProductPrice(productCart)).toEqual(price);

    await cartPage.clickRemoveButton(productCart);
    await expect(productCart).not.toBeExisting();
    await expect(cartNumberElem).not.toBeExisting();
  });

  it("Add a product to the cart", async () => {
    const product = await inventoryPage.getAnyProduct();
    const title = await inventoryPage.getProductTitle(product);
    const price = await inventoryPage.getProductPrice(product);

    const cartNumberElem = await inventoryPage.cartNumber;
    const cartNumber = (await cartNumberElem.isDisplayed()) ? parseInt(await cartNumberElem.getText()) : 0;
    await inventoryPage.clickAddButton(product);
    await expect(await inventoryPage.getRemoveButton(product)).toBeExisting();
    await expect(parseInt(await cartNumberElem.getText())).toEqual(cartNumber + 1);

    await inventoryPage.clickCartLink();
    const productCart = await cartPage.getProductByTitle(title);
    await expect(productCart).toBeExisting();
    await expect(await cartPage.getProductPrice(productCart)).toEqual(price);
  });

  it("Sorting products", async () => {
    await inventoryPage.clickSortContainer();
    const sortOptions = await inventoryPage.sortOptions;

    for (const option of sortOptions) {
      const sortValue = await option.getAttribute("value");
      await option.click();
      let products = await inventoryPage.allProducts;
      let productCount = await products.length;
      
      for (let i = 0; i < productCount - 1; ++i) {
        const firstTitle = await inventoryPage.getProductTitle(products[i]);
        const secondTitle = await inventoryPage.getProductTitle(products[i + 1]);

        const firstPrice = parseFloat((await inventoryPage.getProductPrice(products[i])).substring(1));
        const secondPrice = parseFloat((await inventoryPage.getProductPrice(products[i + 1])).substring(1));

        switch (sortValue) {
          case "az": {
            await expect(firstTitle.localeCompare(secondTitle)).toBeLessThanOrEqual(0);
            break;
          }
          case "za": {
            await expect(firstTitle.localeCompare(secondTitle)).toBeGreaterThanOrEqual(0);
            break;
          }
          case "lohi": {
            await expect(firstPrice).toBeLessThanOrEqual(secondPrice);
            break;
          }
          case "hilo": {
            await expect(firstPrice).toBeGreaterThanOrEqual(secondPrice);
            break;
          }
        }
      }
    }
  });

  it("Chosen products are saved after logout", async () => {
    const product = await inventoryPage.getAnyProduct();
    const title = await inventoryPage.getProductTitle(product);
    const price = await inventoryPage.getProductPrice(product);

    const cartNumberElem = await inventoryPage.cartNumber;
    const cartNumber = (await cartNumberElem.isDisplayed()) ? parseInt(await cartNumberElem.getText()) : 0;
    await inventoryPage.clickAddButton(product);
    await expect(await inventoryPage.getRemoveButton(product)).toBeExisting();
    await expect(parseInt(await cartNumberElem.getText())).toEqual(cartNumber + 1);

    await inventoryPage.clickBurgerMenu();
    await inventoryPage.clickLogoutLink();
    await expect(loginPage.title).toBeExisting();
    await expect(loginPage.title).toHaveText("Swag Labs");

    await loginPage.open();
    await loginPage.login();
    await expect(inventoryPage.title).toBeExisting();
    await expect(inventoryPage.title).toHaveText("Products");

    await inventoryPage.clickCartLink();
    const productCart = await cartPage.getProductByTitle(title);
    await expect(productCart).toBeExisting();
    await expect(await cartPage.getProductPrice(productCart)).toEqual(price);
  });

  it("Verifying the product page", async () => {
    const product = await inventoryPage.getAnyProduct();
    const title = await inventoryPage.getProductTitle(product);
    const price = await inventoryPage.getProductPrice(product);
    const description = await inventoryPage.getProductDescription(product);
    const image = await inventoryPage.getProductImage(product);

    await inventoryPage.clickProductLink(product);
    await expect(await productPage.productTitle).toEqual(title);
    await expect(await productPage.productPrice).toEqual(price);
    await expect(await productPage.productDescription).toEqual(description);
    await expect(await productPage.productImage).toEqual(image);
  });

  it("Verifying the social media links", async () => {
    const twiterLink = await (await inventoryPage.twiterLink).getAttribute("href");
    const facebookLink = await (await inventoryPage.facebookLink).getAttribute("href");
    const linkedinLink = await (await inventoryPage.linkedinLink).getAttribute("href");

    await browser.newWindow(twiterLink);
    await expect(browser).toHaveTitle("Sauce Labs (@saucelabs) / X");
    await browser.switchWindow("Swag Labs");

    await browser.newWindow(facebookLink);
    await expect(browser).toHaveTitle("Sauce Labs | San Francisco CA | Facebook");
    await browser.switchWindow("Swag Labs");

    await browser.newWindow(linkedinLink);
    try {
      await expect(browser).toHaveTitle("Sauce Labs | LinkedIn");
    }
    catch(error) {
      await expect(browser).toHaveTitle("Sign Up | LinkedIn");
    }
  });
});