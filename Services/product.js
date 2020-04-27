const Product = require('../Model/product');

module.exports = {
  async createProduct (product) {
    const result = await Product.create(product);
    if(result) {
      return {
        data: product,
        message: "Product successfully created!"
      };
    }
    return "Error creating new product"
  },

  async getAllProduct()  {
    const product = await Product.find();
    if(product) {
      return product;
    }
    return "Error fetching products from db"
  },

  async getProductById(productId)  {
    const product = await Product.findOne(productId);
    if(product) {
        return product;
    }
    return "Error fetching product from db";
}};