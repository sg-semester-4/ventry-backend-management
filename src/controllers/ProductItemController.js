import { Router } from "express";
import ProductItemService from "../services/ProductItemService";

// /productItems
const routes = Router();

routes.get("/", async (req, res) => {
  const productItems = await ProductItemService.readAll(req.query);
  let data = {};
  if (!productItems) {
    data = {
      status: 403,
      message: "Read all product item failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Read all product item succeed",
      data: productItems,
    };
  }
  res.status(200).send(data);
});

routes.get("/:id", async (req, res) => {
  const { id: ID } = req.params;
  const productItem = await ProductItemService.readOneByID(ID);
  let data = {};
  if (!productItem) {
    data = {
      status: 403,
      message: "Read product item failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Read product item succeed",
      data: productItem,
    };
  }
  res.status(200).send(data);
});

routes.post("/", async (req, res) => {
  const {
    product_id: productID,
    item_id: itemID,
    quantity: quantity,
  } = req.body;
  const productItem = {
    productID,
    itemID,
    quantity,
  };
  const createdProductItem = await ProductItemService.createOne(productItem);
  let data = {};
  if (!createdProductItem) {
    data = {
      status: 403,
      message: "Create product item failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Create product item succeed",
      data: createdProductItem,
    };
  }
  res.status(201).send(data);
});

routes.put("/:id", async (req, res) => {
  const { id: ID } = req.params;
  const {
    product_id: productID,
    item_id: itemID,
    quantity: quantity,
  } = req.body;
  const productItem = {
    productID,
    itemID,
    quantity,
  };
  const updatedProductItem = await ProductItemService.updateOneByID(
    ID,
    productItem
  );
  let data = {};
  if (!updatedProductItem) {
    data = {
      status: 403,
      message: "Update product item failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Update product item succeed",
      data: updatedProductItem,
    };
  }
  res.status(200).send(data);
});

routes.delete("/:id", async (req, res) => {
  const { id: ID } = req.params;
  const deletedProductItem = await ProductItemService.deleteOneByID(ID);
  let data = {};
  if (!deletedProductItem) {
    data = {
      status: 403,
      message: "Delete product item failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Delete product item succeed",
      data: deletedProductItem,
    };
  }
  res.status(200).send(data);
});

export default routes;
