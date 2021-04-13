import postgresDB from "../dao/PostgresDB";
import Debugger from "../tools/Debugger";
import PostgresDB from "../dao/PostgresDB";
import { v4 as uuidv4 } from "uuid";
import InventoryControlRepository from "../repositories/InventoryControlRepository";
import Wrangler from "../tools/Wrangler";
import moment from "moment";

class InventoryControlService {
  async readAll(query) {
    try {
      let inventoryControls = await InventoryControlRepository.readAll();
      if (Object.keys(query).length > 0) {
        inventoryControls = Wrangler.filterArrayByQuery(
          inventoryControls,
          query
        );
      }
      Debugger.log("InventoryControlService", "Read all succeed");
      return inventoryControls;
    } catch (err) {
      Debugger.error("InventoryControlService", `Read all failed ${err}`);
    }
  }

  async readOneByID(ID) {
    try {
      const inventoryControl = await InventoryControlRepository.readOneByID(ID);
      Debugger.log("InventoryControlService", "Read one by ID succeed");
      return inventoryControl;
    } catch (err) {
      Debugger.error("InventoryControlService", `Read one by ID failed ${err}`);
    }
  }

  async createOne(inventoryControl) {
    try {
      const timeStamp = moment().toISOString();
      const inventoryControlToCreate = {
        ...inventoryControl,
        ID: uuidv4(),
        updatedAt: timeStamp,
        createdAt: timeStamp,
      };
      const createdInventoryControl = await InventoryControlRepository.createOne(
        inventoryControlToCreate
      );
      Debugger.log("InventoryControlService", "Create one succeed");
      return createdInventoryControl;
    } catch (err) {
      Debugger.error("InventoryControlService", `Create one failed ${err}`);
    }
  }

  async updateOneByID(ID, inventoryControl) {
    try {
      const timeStamp = moment().toISOString();
      const inventoryControlToUpdate = {
        ...inventoryControl,
        updatedAt: timeStamp,
      };
      const updatedInventoryControl = await InventoryControlRepository.updateOneByID(
        ID,
        inventoryControlToUpdate
      );
      Debugger.log("InventoryControlService", "Update one by ID succeed");
      return updatedInventoryControl;
    } catch (err) {
      Debugger.error(
        "InventoryControlService",
        `Update one by ID failed ${err}`
      );
    }
  }

  async deleteOneByID(ID) {
    try {
      const deletedInventoryControl = await InventoryControlRepository.deleteOneByID(
        ID
      );
      Debugger.log("InventoryControlService", "Delete one by ID succeed");
      return deletedInventoryControl;
    } catch (err) {
      Debugger.error(
        "InventoryControlService",
        `Delete one by ID failed ${err}`
      );
    }
  }
}

export default new InventoryControlService();
