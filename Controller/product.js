const serverless = require('serverless-http');
const express = require('express');
const app = express();
const uuid = require('uuid/v4');

const dbConnection = require('../dbConfig');
const ProductService = require('../Services/product');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/index', async (req, res) => {
   await res.send("<h3>Welcome to the Product API!</h3>")
})

app.post('/', async (req, res) => {
  try {
    await dbConnection();
    const data = req.body;
    const { name, type, description, cost } = data;
    if (!data) {
      return "Please pass all required fields!";
    }
    const dataToSave = { name, type, description, cost, productId: uuid() };
    const createProduct = await ProductService.createProduct(dataToSave);
    if (createProduct) {
      return res.status(200).send(
        createProduct
      );
    }
  } catch (error) {
    console.log(error, "error!!");
  }
})

app.get('/', async (req, res) => {
  try {
    await dbConnection();
    const allProducts = await ProductService.getAllProduct();
    if (allProducts) {
      return res.status(200).send({
        data: allProducts
      });
    }
  } catch (error) {
      console.log(error, "error!!");
  }
})

app.get('/:productId/', async (req, res) => {
  try {
    await dbConnection();
    const { productId } = req.params;
    const getProduct = await ProductService.getProductById({productId});
    if (getProduct) {
      return res.status(200).send({
        data: getProduct
      })
    }
  } catch (error) {
     console.log(error, "error!!");
  }
});

module.exports.handler = serverless(app);