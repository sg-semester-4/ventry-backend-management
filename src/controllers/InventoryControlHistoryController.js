import { Router } from "express";
import InventoryControlHistoryService from "../services/InventoryControlHistoryService";

// /histories/inventoryControls
const routes = Router();

routes.get("/", async (req, res) => {
  const inventoryControls = await InventoryControlHistoryService.readAll(
    req.query
  );
  let data = {};
  if (!inventoryControls) {
    data = {
      status: 403,
      message: "Read all inventory control history failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Read all inventory control history succeed",
      data: inventoryControls,
    };
  }
  res.status(200).send(data);
});

routes.get("/:id", async (req, res) => {
  const { id: ID } = req.params;
  const inventoryControl = await InventoryControlHistoryService.readOneByID(ID);
  let data = {};
  if (!inventoryControl) {
    data = {
      status: 403,
      message: "Read inventory control history failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Read inventory control history succeed",
      data: inventoryControl,
    };
  }
  res.status(200).send(data);
});

routes.post("/", async (req, res) => {
  const {
    account_id: accountID,
    item_id: itemID,
    quantity: quantity,
  } = req.body;
  const inventoryControl = {
    accountID,
    itemID,
    quantity,
  };
  const createdInventoryControl = await InventoryControlHistoryService.createOne(
    inventoryControl
  );
  let data = {};
  if (!createdInventoryControl) {
    data = {
      status: 403,
      message: "Create inventory control history failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Create inventory control history succeed",
      data: createdInventoryControl,
    };
  }
  res.status(201).send(data);
});

routes.put("/:id", async (req, res) => {
  const { id: ID } = req.params;
  const {
    account_id: accountID,
    item_id: itemID,
    quantity: quantity,
  } = req.body;
  const inventoryControl = {
    accountID,
    itemID,
    quantity,
  };
  const updatedInventoryControl = await InventoryControlHistoryService.updateOneByID(
    ID,
    inventoryControl
  );
  let data = {};
  if (!updatedInventoryControl) {
    data = {
      status: 403,
      message: "Update inventory control history failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Update inventory control history succeed",
      data: updatedInventoryControl,
    };
  }
  res.status(200).send(data);
});

routes.delete("/:id", async (req, res) => {
  const { id: ID } = req.params;
  const deletedInventoryControl = await InventoryControlHistoryService.deleteOneByID(
    ID
  );
  let data = {};
  if (!deletedInventoryControl) {
    data = {
      status: 403,
      message: "Update inventory control history failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Update inventory control history succeed",
      data: deletedInventoryControl,
    };
  }
  res.status(200).send(data);
});

export default routes;
