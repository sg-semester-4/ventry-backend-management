import { Router } from "express";
import ItemCombinationService from "../services/ItemCombinationService";

// /itemCombinations
const routes = Router();

routes.get("/", async (req, res) => {
  const itemCombinations = await ItemCombinationService.readAll(req.query);
  let data = {};
  if (!itemCombinations) {
    data = {
      status: 403,
      message: "Read all item combination failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Read all item combination succeed",
      data: itemCombinations,
    };
  }
  res.status(200).send(data);
});

routes.get("/:id", async (req, res) => {
  const { id: ID } = req.params;
  const itemCombination = await ItemCombinationService.readOneByID(ID);
  let data = {};
  if (!itemCombination) {
    data = {
      status: 403,
      message: "Read item combination failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Read item combination succeed",
      data: itemCombination,
    };
  }
  res.status(200).send(data);
});

routes.post("/", async (req, res) => {
  const {
    parent_item_id: parentItemID,
    child_item_id: childItemID,
    quantity: quantity,
  } = req.body;
  const itemCombination = {
    parentItemID,
    childItemID,
    quantity,
  };
  const createdItemCombination = await ItemCombinationService.createOne(
    itemCombination
  );
  let data = {};
  if (!createdItemCombination) {
    data = {
      status: 403,
      message: "Create item combination failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Create item combination succeed",
      data: createdItemCombination,
    };
  }
  res.status(201).send(data);
});

routes.put("/:id", async (req, res) => {
  const { id: ID } = req.params;
  const {
    parent_item_id: parentItemID,
    child_item_id: childItemID,
    quantity: quantity,
  } = req.body;
  const itemCombination = {
    parentItemID,
    childItemID,
    quantity,
  };
  const updatedItemCombination = await ItemCombinationService.updateOneByID(
    ID,
    itemCombination
  );
  let data = {};
  if (!updatedItemCombination) {
    data = {
      status: 403,
      message: "Update item combination failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Update item combination succeed",
      data: updatedItemCombination,
    };
  }
  res.status(200).send(data);
});

routes.delete("/:id", async (req, res) => {
  const { id: ID } = req.params;
  const deletedItemCombination = await ItemCombinationService.deleteOneByID(ID);
  let data = {};
  if (!deletedItemCombination) {
    data = {
      status: 403,
      message: "Delete item combination failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Delete item combination succeed",
      data: deletedItemCombination,
    };
  }
  res.status(200).send(data);
});

export default routes;
