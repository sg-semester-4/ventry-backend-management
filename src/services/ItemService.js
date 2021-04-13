import postgresDB from "../dao/PostgresDB";
import Debugger from "../tools/Debugger";
import PostgresDB from "../dao/PostgresDB";
import { v4 as uuidv4 } from "uuid";
import ItemRepository from "../repositories/ItemRepository";
import Wrangler from "../tools/Wrangler";

class ItemService {
  async readAll(query) {
    try {
      let items = await ItemRepository.readAll();
      if (Object.keys(query).length > 0) {
        items = Wrangler.filterArrayByQuery(items, query);
      }
      Debugger.log("ItemService", "Read all succeed");
      return items;
    } catch (err) {
      Debugger.error("ItemService", `Read all failed ${err}`);
    }
  }

  async readOneByID(ID) {
    try {
      const item = await ItemRepository.readOneByID(ID);
      Debugger.log("ItemService", "Read one by ID succeed");
      return item;
    } catch (err) {
      Debugger.error("ItemService", `Read one by ID failed ${err}`);
    }
  }

  async createOne(item) {
    try {
      const itemToCreate = { ...item, ID: uuidv4() };
      const createdItem = await ItemRepository.createOne(itemToCreate);
      Debugger.log("ItemService", "Create one succeed");
      return createdItem;
    } catch (err) {
      Debugger.error("ItemService", `Create one failed ${err}`);
    }
  }

  async updateOneByID(ID, item) {
    try {
      const updatedItem = await ItemRepository.updateOneByID(ID, item);
      Debugger.log("ItemService", "Update one by ID succeed");
      return updatedItem;
    } catch (err) {
      Debugger.error("ItemService", `Update one by ID failed ${err}`);
    }
  }

  async deleteOneByID(ID) {
    try {
      const deletedItem = await ItemRepository.deleteOneByID(ID);
      Debugger.log("ItemService", "Delete one by ID succeed");
      return deletedItem;
    } catch (err) {
      Debugger.error("ItemService", `Delete one by ID failed ${err}`);
    }
  }
}

export default new ItemService();
