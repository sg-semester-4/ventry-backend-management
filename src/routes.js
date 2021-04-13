import { Router } from "express";
import ItemController from "./controllers/ItemController";
import ProductController from "./controllers/ProductController";
import ItemCombinationController from "./controllers/ItemCombinationController";
import ProductItemController from "./controllers/ProductItemController";
import ProductTransactionHistoryController from "./controllers/ProductTransactionHistoryController";
import InventoryControlHistoryController from "./controllers/InventoryControlHistoryController";
import AccountController from "./controllers/AccountController";
import AuthenticationController from "./controllers/AuthenticationController";

const routes = Router();

routes.use("/api/v1/accounts", AccountController);
routes.use("/api/v1/items", ItemController);
routes.use("/api/v1/products", ProductController);
routes.use("/api/v1/itemCombinations", ItemCombinationController);
routes.use("/api/v1/productItems", ProductItemController);
routes.use(
  "/api/v1/histories/productTransactions",
  ProductTransactionHistoryController
);
routes.use(
  "/api/v1/histories/inventoryControls",
  InventoryControlHistoryController
);

routes.use("/api/v1/authentications", AuthenticationController);

export default routes;
