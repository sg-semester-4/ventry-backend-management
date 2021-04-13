import postgresDB from "../dao/PostgresDB";
import Debugger from "../tools/Debugger";
import PostgresDB from "../dao/PostgresDB";
import { v4 as uuidv4 } from "uuid";
import ProductRepository from "../repositories/ProductRepository";
import Wrangler from "../tools/Wrangler";

class ProductService {
  async readAll(query) {
    try {
      let products = await ProductRepository.readAll();
      if (Object.keys(query).length > 0) {
        products = Wrangler.filterArrayByQuery(products, query);
      }
      Debugger.log("ProductService", "Read all succeed");
      return products;
    } catch (err) {
      Debugger.error("ProductService", `Read all failed ${err}`);
    }
  }

  async readOneByID(ID) {
    try {
      const product = await ProductRepository.readOneByID(ID);
      Debugger.log("ProductService", "Read one by ID succeed");
      return product;
    } catch (err) {
      Debugger.error("ProductService", `Read one by ID failed ${err}`);
    }
  }

  async createOne(product) {
    try {
      const productToCreate = { ...product, ID: uuidv4() };
      const createdProduct = await ProductRepository.createOne(productToCreate);
      Debugger.log("ProductService", "Create one succeed");
      return createdProduct;
    } catch (err) {
      Debugger.error("ProductService", `Create one failed ${err}`);
    }
  }

  async updateOneByID(ID, product) {
    try {
      const updatedProduct = await ProductRepository.updateOneByID(ID, product);
      Debugger.log("ProductService", "Update one by ID succeed");
      return updatedProduct;
    } catch (err) {
      Debugger.error("ProductService", `Update one by ID failed ${err}`);
    }
  }

  async deleteOneByID(ID) {
    try {
      const deletedProduct = await ProductRepository.deleteOneByID(ID);
      Debugger.log("ProductService", "Delete one by ID succeed");
      return deletedProduct;
    } catch (err) {
      Debugger.error("ProductService", `Delete one by ID failed ${err}`);
    }
  }
}

export default new ProductService();
