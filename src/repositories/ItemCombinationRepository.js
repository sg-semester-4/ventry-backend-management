import postgresDB from "../dao/PostgresDB";
import Debugger from "../tools/Debugger";
import PostgresDB from "../dao/PostgresDB";
import { v4 as uuidv4 } from "uuid";

class ItemCombinationRepository {
  async readAll() {
    try {
      const sql = "select * from item_combination";
      const res = await PostgresDB.pool.query(sql);
      Debugger.log("ItemCombinationRepository", "Read all succeed");
      return res.rows;
    } catch (err) {
      Debugger.error("ItemCombinationRepository", `Read all failed ${err}`);
    }
  }

  async readOneByID(ID) {
    try {
      const sql = "select * from item_combination where id=$1";
      const res = await PostgresDB.pool.query(sql, [ID]);
      Debugger.log(
        "ItemCombinationRepository",
        "Read one by parent ID succeed"
      );
      return res.rows[0];
    } catch (err) {
      Debugger.error(
        "ItemCombinationRepository",
        `Read one by ID failed ${err}`
      );
    }
  }

  async createOne(itemCombination) {
    try {
      const sql =
        "insert into item_combination(id, parent_item_id, child_item_id, quantity) values ($1, $2, $3, $4) returning *";
      const res = await PostgresDB.pool.query(sql, [
        itemCombination.ID,
        itemCombination.parentItemID,
        itemCombination.childItemID,
        itemCombination.quantity,
      ]);
      Debugger.log("ItemCombinationRepository", "Create one succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error("ItemCombinationRepository", `Create one failed ${err}`);
    }
  }

  async updateOneByID(ID, itemCombination) {
    try {
      const sql =
        "update item_combination set parent_item_id=$1, child_item_id=$2, quantity=$3 where id=$4 returning *";
      const res = await PostgresDB.pool.query(sql, [
        itemCombination.parentItemID,
        itemCombination.childItemID,
        itemCombination.quantity,
        ID,
      ]);
      Debugger.log("ItemCombinationRepository", "Update one by ID succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error(
        "ItemCombinationRepository",
        `Update one by ID failed ${err}`
      );
    }
  }

  async deleteOneByID(ID) {
    try {
      const sql = "delete from item_combination where id=$1 returning *";
      const res = await PostgresDB.pool.query(sql, [ID]);
      Debugger.log("ItemCombinationRepository", "Delete one by ID succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error(
        "ItemCombinationRepository",
        `Delete one by ID failed ${err}`
      );
    }
  }
}

export default new ItemCombinationRepository();
