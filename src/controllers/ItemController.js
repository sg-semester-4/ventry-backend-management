import { Router } from "express";
import ItemService from "../services/ItemService";

// /items
const routes = Router();

routes.get("/", async (req, res) => {
  const items = await ItemService.readAll(req.query);
  let data = {};
  if (!items) {
    data = {
      status: 403,
      message: "Read all item failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Read all item succeed",
      data: items,
    };
  }
  res.status(200).send(data);
});

routes.get("/:id", async (req, res) => {
  const { id: ID } = req.params;
  const item = await ItemService.readOneByID(ID);
  let data = {};
  if (!item) {
    data = {
      status: 403,
      message: "Read item failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Read item succeed",
      data: item,
    };
  }
  res.status(200).send(data);
});

routes.post("/", async (req, res) => {
  const {
    code: code,
    name: name,
    description: description,
    quantity: quantity,
    unit_type: unitType,
    unit_cost_price: unitCostPrice,
    unit_sell_price: unitSellPrice,
    image_url: imageURL,
    account_id: accountID,
  } = req.body;
  const item = {
    code,
    name,
    description,
    quantity,
    unitType,
    unitCostPrice,
    unitSellPrice,
    imageURL,
    accountID,
  };
  const createdItem = await ItemService.createOne(item);
  let data = {};
  if (!createdItem) {
    data = {
      status: 403,
      message: "Create item failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Create item succeed",
      data: createdItem,
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
    quantity: quantity,
    unit_type: unitType,
    unit_cost_price: unitCostPrice,
    unit_sell_price: unitSellPrice,
    image_url: imageURL,
    account_id: accountID,
  } = req.body;
  const item = {
    code,
    name,
    description,
    quantity,
    unitType,
    unitCostPrice,
    unitSellPrice,
    imageURL,
    accountID,
  };
  const updatedItem = await ItemService.updateOneByID(ID, item);
  let data = {};
  if (!updatedItem) {
    data = {
      status: 403,
      message: "Update item failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Update item succeed",
      data: updatedItem,
    };
  }
  res.status(200).send(data);
});

routes.delete("/:id", async (req, res) => {
  const { id: ID } = req.params;
  const deletedItem = await ItemService.deleteOneByID(ID);
  let data = {};
  if (!deletedItem) {
    data = {
      status: 403,
      message: "Delete item failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Delete item succeed",
      data: deletedItem,
    };
  }
  res.status(200).send(data);
});

export default routes;
