import { Router } from "express";
import ProductService from "../services/ProductService";

// /products
const routes = Router();

routes.get("/", async (req, res) => {
  const products = await ProductService.readAll(req.query);
  let data = {};
  if (!products) {
    data = {
      status: 403,
      message: "Read all product failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Read all product succeed",
      data: products,
    };
  }
  res.status(200).send(data);
});

routes.get("/:id", async (req, res) => {
  const { id: ID } = req.params;
  const product = await ProductService.readOneByID(ID);
  let data = {};
  if (!product) {
    data = {
      status: 403,
      message: "Read product failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Read product succeed",
      data: product,
    };
  }
  res.status(200).send(data);
});

routes.post("/", async (req, res) => {
  const {
    code: code,
    name: name,
    description: description,
    estimate_quantity: estimateQuantity,
    available_quantity: availableQuantity,
    unit_type: unitType,
    unit_cost_price: unitCostPrice,
    unit_sell_price: unitSellPrice,
    image_url: imageURL,
    account_id: accountID,
  } = req.body;
  const product = {
    code,
    name,
    description,
    estimateQuantity,
    availableQuantity,
    unitType,
    unitCostPrice,
    unitSellPrice,
    imageURL,
    accountID,
  };
  const createdProduct = await ProductService.createOne(product);
  let data = {};
  if (!createdProduct) {
    data = {
      status: 403,
      message: "Create product failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Create product succeed",
      data: createdProduct,
    };
  }
  res.status(201).send(data);
});

routes.put("/:id", async (req, res) => {
  const { id: ID } = req.params;
  const {
    code: code,
    name: name,
    description: description,
    estimate_quantity: estimateQuantity,
    available_quantity: availableQuantity,
    unit_type: unitType,
    unit_cost_price: unitCostPrice,
    unit_sell_price: unitSellPrice,
    image_url: imageURL,
    account_id: accountID,
  } = req.body;
  const product = {
    code,
    name,
    description,
    estimateQuantity,
    availableQuantity,
    unitType,
    unitCostPrice,
    unitSellPrice,
    imageURL,
    accountID,
  };
  const updatedProduct = await ProductService.updateOneByID(ID, product);
  let data = {};
  if (!updatedProduct) {
    data = {
      status: 403,
      message: "Update product failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Update product succeed",
      data: updatedProduct,
    };
  }
  res.status(200).send(data);
});

routes.delete("/:id", async (req, res) => {
  const { id: ID } = req.params;
  const deletedProduct = await ProductService.deleteOneByID(ID);
  let data = {};
  if (!deletedProduct) {
    data = {
      status: 403,
      message: "Delete product failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Delete product succeed",
      data: deletedProduct,
    };
  }
  res.status(200).send(data);
});

export default routes;
