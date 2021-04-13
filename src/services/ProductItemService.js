import postgresDB from "../dao/PostgresDB";
import Debugger from "../tools/Debugger";
import PostgresDB from "../dao/PostgresDB";
import { v4 as uuidv4 } from "uuid";
import ProductItemRepository from "../repositories/ProductItemRepository";
import Wrangler from "../tools/Wrangler";

class ProductItemService {
  async readAll(query) {
    try {
      let productItems = await ProductItemRepository.readAll();
      if (Object.keys(query).length > 0) {
        productItems = Wrangler.filterArrayByQuery(productItems, query);
      }
      Debugger.log("ProductItemService", "Read all succeed");
      return productItems;
    } catch (err) {
      Debugger.error("ProductItemService", `Read all failed ${err}`);
    }
  }

  async readOneByID(ID) {
    try {
      const productItem = await ProductItemRepository.readOneByID(ID);
      Debugger.log("ProductItemService", "Read one by ID succeed");
      return productItem;
    } catch (err) {
      Debugger.error("ProductItemService", `Read one by ID failed ${err}`);
    }
  }

  async createOne(productItem) {
    try {
      const productItemToCreate = { ...productItem, ID: uuidv4() };
      const createdProductItem = await ProductItemRepository.createOne(
        productItemToCreate
      );
      Debugger.log("ProductItemService", "Create one succeed");
      return createdProductItem;
    } catch (err) {
      Debugger.error("ProductItemService", `Create one failed ${err}`);
    }
  }

  async updateOneByID(ID, productItem) {
    try {
      const updatedProductItem = await ProductItemRepository.updateOneByID(
        ID,
        productItem
      );
      Debugger.log("ProductItemService", "Update one by ID succeed");
      return updatedProductItem;
    } catch (err) {
      Debugger.error("ProductItemService", `Update one by ID failed ${err}`);
    }
  }

  async deleteOneByID(ID) {
    try {
      const deletedProductItem = await ProductItemRepository.deleteOneByID(ID);
      Debugger.log("ProductItemService", "Delete one by ID succeed");
      return deletedProductItem;
    } catch (err) {
      Debugger.error("ProductItemService", `Delete one by ID failed ${err}`);
    }
  }
}

export default new ProductItemService();
