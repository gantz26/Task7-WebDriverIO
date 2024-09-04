import Page from "./page.js";

class InventoryPage extends Page {
  get title() {
    return $(".title");
  }

  get burgerMenu() {
    return $("#react-burger-menu-btn");
  }

  get logoutLink() {
    return $("#logout_sidebar_link");
  }

  get aboutLink() {
    return $("#about_sidebar_link");
  }

  get cartNumber() {
    return $(".shopping_cart_badge");
  }

  get cartLink() {
    return $(".shopping_cart_link");
  }

  get sortContainer() {
    return $(".product_sort_container");
  }

  get sortOptions() {
    return this.sortContainer.$$("option");
  }

  get allProducts() {
    return $$(".inventory_item");
  }

  get twiterLink() {
    return $("a[data-test='social-twitter']");
  }

  get facebookLink() {
    return $("a[data-test='social-facebook']");
  }

  get linkedinLink() {
    return $("a[data-test='social-linkedin']");
  }

  async getAnyProduct() {
    const products = $$(".inventory_item");
    const productCount = await products.length;
    return products[Math.floor(Math.random() * (productCount - 1))];
  }

  async getProductLink(product) {
    return await product.$(".inventory_item_name ");
  }

  async getProductTitle(product) {
    return await product.$(".inventory_item_name ").getText();
  }

  async getProductPrice(product) {
    return await product.$(".inventory_item_price").getText();
  }

  async getProductDescription(product) {
    return await product.$(".inventory_item_desc").getText();
  }

  async getProductImage(product) {
    return await product.$("img.inventory_item_img").getAttribute("src");
  }

  async getAddButton(product) {
    return await product.$(".btn_primary");
  }

  async getRemoveButton(product) {
    return await product.$(".btn_secondary");
  }

  async clickAddButton(product) {
    await (await this.getAddButton(product)).click();
  }

  async clickBurgerMenu() {
    await (await this.burgerMenu).click();
  }

  async clickAboutLink() {
    await (await this.aboutLink).click();
  }

  async clickCartLink() {
    await (await this.cartLink).click();
  }

  async clickLogoutLink() {
    await (await this.logoutLink).click();
  }

  async clickSortContainer() {
    await (await this.sortContainer).click();
  }

  async clickProductLink(product) {
    await (await this.getProductLink(product)).click();
  }
}

export default new InventoryPage();