import postgresDB from "../dao/PostgresDB";
import Debugger from "../tools/Debugger";
import PostgresDB from "../dao/PostgresDB";
import { v4 as uuidv4 } from "uuid";
import ItemCombinationRepository from "../repositories/ItemCombinationRepository";
import Wrangler from "../tools/Wrangler";

class ItemCombinationService {
  async readAll(query) {
    try {
      let itemCombinations = await ItemCombinationRepository.readAll();
      if (Object.keys(query).length > 0) {
        itemCombinations = Wrangler.filterArrayByQuery(itemCombinations, query);
      }
      Debugger.log("ItemCombinationService", "Read all succeed");
      return itemCombinations;
    } catch (err) {
      Debugger.error("ItemCombinationService", `Read all failed ${err}`);
    }
  }

  async readOneByID(ID) {
    try {
      const itemCombination = await ItemCombinationRepository.readOneByID(ID);
      Debugger.log("ItemCombinationService", "Read one by ID succeed");
      return itemCombination;
    } catch (err) {
      Debugger.error("ItemCombinationService", `Read one by ID failed ${err}`);
    }
  }

  async createOne(itemCombination) {
    try {
      const itemCombinationToCreate = { ...itemCombination, ID: uuidv4() };
      const createdItemCombination = await ItemCombinationRepository.createOne(
        itemCombinationToCreate
      );
      Debugger.log("ItemCombinationService", "Create one succeed");
      return createdItemCombination;
    } catch (err) {
      Debugger.error("ItemCombinationService", `Create one failed ${err}`);
    }
  }

  async updateOneByID(ID, itemCombination) {
    try {
      const updatedItemCombination = await ItemCombinationRepository.updateOneByID(
        ID,
        itemCombination
      );
      Debugger.log("ItemCombinationService", "Update one by ID succeed");
      return updatedItemCombination;
    } catch (err) {
      Debugger.error(
        "ItemCombinationService",
        `Update one by ID failed ${err}`
      );
    }
  }

  async deleteOneByID(ID) {
    try {
      const deletedItemCombination = await ItemCombinationRepository.deleteOneByID(
        ID
      );
      Debugger.log("ItemCombinationService", "Delete one by ID succeed");
      return deletedItemCombination;
    } catch (err) {
      Debugger.error(
        "ItemCombinationService",
        `Delete one by ID failed ${err}`
      );
    }
  }
}

export default new ItemCombinationService();
