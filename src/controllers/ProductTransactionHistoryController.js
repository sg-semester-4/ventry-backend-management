import { Router } from "express";
import ProductTransactionHistoryService from "../services/ProductTransactionHistoryService";

// /histories/productTransactions
const routes = Router();

routes.get("/", async (req, res) => {
  const productTransactions = await ProductTransactionHistoryService.readAll(
    req.query
  );
  let data = {};
  if (!productTransactions) {
    data = {
      status: 403,
      message: "Read all product transaction history failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Read all product transaction history succeed",
      data: productTransactions,
    };
  }
  res.status(200).send(data);
});

routes.get("/:id", async (req, res) => {
  const { id: ID } = req.params;
  const productTransaction = await ProductTransactionHistoryService.readOneByID(
    ID
  );
  let data = {};
  if (!productTransaction) {
    data = {
      status: 403,
      message: "Read product transaction history failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Read product transaction history succeed",
      data: productTransaction,
    };
  }
  res.status(200).send(data);
});

routes.post("/", async (req, res) => {
  const {
    account_id: accountID,
    product_id: productID,
    quantity: quantity,
    total_sell_price: totalSellPrice,
  } = req.body;
  const productTransaction = {
    accountID,
    productID,
    quantity,
    totalSellPrice,
  };
  const createdProductTransaction = await ProductTransactionHistoryService.createOne(
    productTransaction
  );
  let data = {};
  if (!createdProductTransaction) {
    data = {
      status: 403,
      message: "Create product transaction history failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Create product transaction history succeed",
      data: createdProductTransaction,
    };
  }
  res.status(201).send(data);
});

routes.put("/:id", async (req, res) => {
  const { id: ID } = req.params;
  const {
    account_id: accountID,
    product_id: productID,
    quantity: quantity,
    total_sell_price: totalSellPrice,
  } = req.body;
  const productTransaction = {
    accountID,
    productID,
    quantity,
    totalSellPrice,
  };
  const updatedProductTransaction = await ProductTransactionHistoryService.updateOneByID(
    ID,
    productTransaction
  );
  let data = {};
  if (!updatedProductTransaction) {
    data = {
      status: 403,
      message: "Update product transaction history failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Update product transaction history succeed",
      data: updatedProductTransaction,
    };
  }
  res.status(200).send(data);
});

routes.delete("/:id", async (req, res) => {
  const { id: ID } = req.params;
  const deletedProductTransaction = await ProductTransactionHistoryService.deleteOneByID(
    ID
  );
  let data = {};
  if (!deletedProductTransaction) {
    data = {
      status: 403,
      message: "Delete product transaction history failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Delete product transaction history succeed",
      data: deletedProductTransaction,
    };
  }
  res.status(200).send(data);
});

export default routes;
