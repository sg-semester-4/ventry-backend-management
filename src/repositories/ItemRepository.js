import postgresDB from "../dao/PostgresDB";
import Debugger from "../tools/Debugger";
import PostgresDB from "../dao/PostgresDB";
import { v4 as uuidv4 } from "uuid";

class ItemRepository {
  async readAll() {
    try {
      const sql = "select * from item";
      const res = await PostgresDB.pool.query(sql);
      Debugger.log("ItemRepository", "Read all succeed");
      return res.rows;
    } catch (err) {
      Debugger.error("ItemRepository", `Read all failed ${err}`);
    }
  }

  async readOneByID(ID) {
    try {
      const sql = "select * from item where id=$1";
      const res = await PostgresDB.pool.query(sql, [ID]);
      Debugger.log("ItemRepository", "Read one by ID succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error("ItemRepository", `Read one by ID failed ${err}`);
    }
  }

  
  async setEstimateQuantityByID(ID, estimateQuantity) {
    try {
      const sql = "select f_item_estimate_quantity_set($1, $2)";
      const res = await PostgresDB.pool.query(sql, [ID, estimateQuantity]);
      Debugger.log("ItemRepository", "Set estimate quantity by ID succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error("ItemRepository", `Set estimate quantity by ID failed ${err}`);
    }
  }

  async setMaxEstimateQuantityByID(ID, estimateQuantity) {
    try {
      const sql = "select f_item_max_estimate_quantity_set($1, $2)";
      const res = await PostgresDB.pool.query(sql, [ID, estimateQuantity]);
      Debugger.log("ItemRepository", "Set max estimate quantity by ID succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error("ItemRepository", `Set max estimate quantity by ID failed ${err}`);
    }
  }

  async createOne(item) {
    try {
      const sql1 =
        "insert into item(id, code, name, description, availabe_quantity, unit_type, unit_cost_price, image_url, account_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *";
      const res1 = await PostgresDB.pool.query(sql1, [
        item.ID,
        item.code,
        item.name,
        item.description,
        item.availableQuantity,
        item.unitType,
        item.unitCostPrice,
        item.imageURL,
        item.accountID,
      ]);
      const res2 = await this.setMaxEstimateQuantityByID(ID, item.maxEstimateQuantity);
      const res3 = await this.setEstimateQuantityByID(ID, item.estimateQuantity);
      const res4 = await this.readOneByID(ID)
      Debugger.log("ItemRepository", "Create one succeed");
      return res4;
    } catch (err) {
      Debugger.error("ItemRepository", `Create one failed ${err}`);
    }
  }


  async updateOneByID(ID, item) {
    try {
      const sql1 =
        "update item set code=$1, name=$2, description=$3, available_quantity=$4, unit_type=$5, unit_cost_price=$6, image_url=$7, account_id=$8 where id=$9 returning *";
      const res1 = await PostgresDB.pool.query(sql1, [
        item.code,
        item.name,
        item.description,
        item.availableQuantity,
        item.unitType,
        item.unitCostPrice,
        item.imageURL,
        item.accountID,
        ID,
      ]);
      const res2 = await this.setMaxEstimateQuantityByID(ID, item.maxEstimateQuantity);
      const res3 = await this.setEstimateQuantityByID(ID, item.estimateQuantity);
      const res4 = await this.readOneByID(ID)
      Debugger.log("ItemRepository", "Update one by ID succeed");
      return res4;
    } catch (err) {
      Debugger.error("ItemRepository", `Update one by ID failed ${err}`);
    }
  }

  async deleteOneByID(ID) {
    try {
      const sql = "delete from item where id=$1 returning *";
      const res = await PostgresDB.pool.query(sql, [ID]);
      Debugger.log("ItemRepository", "Delete one by ID succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error("ItemRepository", `Delete one by ID failed ${err}`);
    }
  }
}

export default new ItemRepository();
