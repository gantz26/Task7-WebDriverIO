import Page from "./page.js";

class ProductPage extends Page {
  get productTitle() {
    return $(".inventory_details_name.large_size").getText();
  }

  get productDescription() {
    return $(".inventory_details_desc.large_size").getText();
  }

  get productPrice() {
    return $(".inventory_details_price").getText();
  }

  get productImage() {
    return $("img.inventory_details_img").getAttribute("src");
  }
}

export default new ProductPage();