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

  async createOne(item) {
    try {
      const sql =
        "insert into item(id, code, name, description, quantity, max_quantity, unit_type, unit_cost_price, image_url, account_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *";
      const res = await PostgresDB.pool.query(sql, [
        item.ID,
        item.code,
        item.name,
        item.description,
        item.quantity,
        item.maxQuantity,
        item.unitType,
        item.unitCostPrice,
        item.imageURL,
        item.accountID,
      ]);
      Debugger.log("ItemRepository", "Create one succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error("ItemRepository", `Create one failed ${err}`);
    }
  }

  async setQuantityByID(ID, quantity) {
    try {
      const sql = "select f_item_quantity_set($1, $2)";
      const res = await PostgresDB.pool.query(sql, [ID, quantity]);
      Debugger.log("ItemRepository", "Set quantity by ID succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error("ItemRepository", `Set quantity by ID failed ${err}`);
    }
  }

  async setMaxQuantityByID(ID, quantity) {
    try {
      const sql = "select f_item_max_quantity_optimal_set($1, $2)";
      const res = await PostgresDB.pool.query(sql, [ID, quantity]);
      Debugger.log("ItemRepository", "Set max quantity by ID succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error("ItemRepository", `Set max quantity by ID failed ${err}`);
    }
  }

  async updateOneByID(ID, item) {
    try {
      const sql =
        "update item set code=$1, name=$2, description=$3, unit_type=$4, unit_cost_price=$5, image_url=$6, account_id=$7 where id=$8 returning *";
      const res = await PostgresDB.pool.query(sql, [
        item.code,
        item.name,
        item.description,
        item.unitType,
        item.unitCostPrice,
        item.imageURL,
        item.accountID,
        ID,
      ]);
      const res2 = await this.setMaxQuantityByID(ID, item.maxQuantity);
      const res3 = await this.setQuantityByID(ID, item.quantity);
      const res4 = await this.readOneByID(ID);
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
