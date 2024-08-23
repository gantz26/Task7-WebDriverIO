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

  get cancelbutton() {
    return $("#cancel");
  }

  get checkoutComplete() {
    return $(".complete-header");
  }

  get errorMessage() {
    return $(".error-message-container.error");
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
}

export default new CartPage();