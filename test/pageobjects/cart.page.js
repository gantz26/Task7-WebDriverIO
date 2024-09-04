import Page from "./page.js";
import inventoryPage from "./inventory.page.js";

class CartPage extends Page {
  get title() {
    return $(".title");
  }
  
  get cartList() {
    return $(".cart_list");
  }

  get continueShoppingButton() {
    return $("#continue-shopping");
  }

  get burgetMenu() {
    return inventoryPage.burgerMenu;
  }

  get allItemsLink() {
    return $("#inventory_sidebar_link");
  }

  get checkoutButton() {
    return $("#checkout");
  }

  get firstNameInput() {
    return $("#first-name");
  }
  
  get lastNameInput() {
    return $("#last-name");
  }

  get zipCodeInput() {
    return $("#postal-code");
  }

  get continueButton() {
    return $("#continue");
  }

  get finishButton() {
    return $("#finish");
  }

  get cancelButton() {
    return $("#cancel");
  }

  get checkoutComplete() {
    return $(".complete-header");
  }

  get errorMessage() {
    return $(".error-message-container.error");
  }

  async fillCheckoutInfo(firstName, lastName, zipCode) {
    await (await this.firstNameInput).setValue(firstName);
    await (await this.lastNameInput).setValue(lastName);
    await (await this.zipCodeInput).setValue(zipCode);
    await (await this.continueButton).click();
  }

  async getProductByTitle(productTitle) {
    return await this.cartList.$(`//*[@class="cart_item"]//*[text()="${productTitle}"]/ancestor::*[@class="cart_item"]`);
  }

  async getProductPrice(product) {
    return await inventoryPage.getProductPrice(product);
  }

  async getRemoveButton(product) {
    return await inventoryPage.getRemoveButton(product);
  }

  async clickRemoveButton(product) {
    await (await this.getRemoveButton(product)).click();
  }

  async clickAllItemsLink() {
    await (await this.allItemsLink).click();
  }

  async clickCheckoutButton() {
    await (await this.checkoutButton).click();
  }

  async clickFinishButton() {
    await (await this.finishButton).click();
  }

  async clickCancelButton() {
    await (await this.cancelButton).click();
  }
}

export default new CartPage();