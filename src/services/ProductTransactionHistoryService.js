import postgresDB from "../dao/PostgresDB";
import Debugger from "../tools/Debugger";
import PostgresDB from "../dao/PostgresDB";
import { v4 as uuidv4 } from "uuid";
import ProductTransactionRepository from "../repositories/ProductTransactionRepository";
import Wrangler from "../tools/Wrangler";
import moment from "moment";

class ProductTransactionService {
  async readAll(query) {
    try {
      let productTransactions = await ProductTransactionRepository.readAll();
      if (Object.keys(query).length > 0) {
        productTransactions = Wrangler.filterArrayByQuery(
          productTransactions,
          query
        );
      }
      Debugger.log("ProductTransactionService", "Read all succeed");
      return productTransactions;
    } catch (err) {
      Debugger.error("ProductTransactionService", `Read all failed ${err}`);
    }
  }

  async readOneByID(ID) {
    try {
      const productTransaction = await ProductTransactionRepository.readOneByID(
        ID
      );
      Debugger.log("ProductTransactionService", "Read one by ID succeed");
      return productTransaction;
    } catch (err) {
      Debugger.error(
        "ProductTransactionService",
        `Read one by ID failed ${err}`
      );
    }
  }

  async createOne(productTransaction) {
    try {
      const timeStamp = moment().toISOString();
      const productTransactionToCreate = {
        ...productTransaction,
        ID: uuidv4(),
        updatedAt: timeStamp,
        createdAt: timeStamp,
      };
      const createdProductTransaction = await ProductTransactionRepository.createOne(
        productTransactionToCreate
      );
      Debugger.log("ProductTransactionService", "Create one succeed");
      return createdProductTransaction;
    } catch (err) {
      Debugger.error("ProductTransactionService", `Create one failed ${err}`);
    }
  }

  async updateOneByID(ID, productTransaction) {
    try {
      const timeStamp = moment().toISOString();
      const productTransactionToUpdate = {
        ...productTransaction,
        updatedAt: timeStamp,
      };
      const updatedProductTransaction = await ProductTransactionRepository.updateOneByID(
        ID,
        productTransactionToUpdate
      );
      Debugger.log("ProductTransactionService", "Update one by ID succeed");
      return updatedProductTransaction;
    } catch (err) {
      Debugger.error(
        "ProductTransactionService",
        `Update one by ID failed ${err}`
      );
    }
  }

  async deleteOneByID(ID) {
    try {
      const deletedProductTransaction = await ProductTransactionRepository.deleteOneByID(
        ID
      );
      Debugger.log("ProductTransactionService", "Delete one by ID succeed");
      return deletedProductTransaction;
    } catch (err) {
      Debugger.error(
        "ProductTransactionService",
        `Delete one by ID failed ${err}`
      );
    }
  }
}

export default new ProductTransactionService();
