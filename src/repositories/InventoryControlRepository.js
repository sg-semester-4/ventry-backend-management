import postgresDB from "../dao/PostgresDB";
import Debugger from "../tools/Debugger";
import PostgresDB from "../dao/PostgresDB";

class InventoryControlRepository {
  async readAll() {
    try {
      const sql = "select * from inventory_control";
      const res = await PostgresDB.pool.query(sql);
      Debugger.log("InventoryControlRepository", "Read all succeed");
      return res.rows;
    } catch (err) {
      Debugger.error("InventoryControlRepository", `Read all failed ${err}`);
    }
  }

  async readOneByID(ID) {
    try {
      const sql = "select * from inventory_control where id=$1";
      const res = await PostgresDB.pool.query(sql, [ID]);
      Debugger.log("InventoryControlRepository", "Read one by ID succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error(
        "InventoryControlRepository",
        `Read one by ID failed ${err}`
      );
    }
  }

  async createOne(inventoryControl) {
    try {
      const sql =
        "insert into inventory_control(id, account_id, item_id, quantity, created_at, updated_at) values ($1, $2, $3, $4, $5, $6) returning *";
      const res = await PostgresDB.pool.query(sql, [
        inventoryControl.ID,
        inventoryControl.accountID,
        inventoryControl.itemID,
        inventoryControl.quantity,
        inventoryControl.createdAt,
        inventoryControl.updatedAt,
      ]);
      Debugger.log("InventoryControlRepository", "Create one succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error("InventoryControlRepository", `Create one failed ${err}`);
    }
  }

  async updateOneByID(ID, inventoryControl) {
    try {
      const sql =
        "update inventory_control set account_id=$1, item_id=$2, quantity=$3, updated_at=$4 where id=$5 returning *";
      const res = await PostgresDB.pool.query(sql, [
        inventoryControl.accountID,
        inventoryControl.itemID,
        inventoryControl.quantity,
        inventoryControl.updatedAt,
        ID,
      ]);
      Debugger.log("InventoryControlRepository", "Update one by ID succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error(
        "InventoryControlRepository",
        `Update one by ID failed ${err}`
      );
    }
  }

  async deleteOneByID(ID) {
    try {
      const sql = "delete from inventory_control where id=$1 returning *";
      const res = await PostgresDB.pool.query(sql, [ID]);
      Debugger.log("InventoryControlRepository", "Delete one by ID succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error(
        "InventoryControlRepository",
        `Delete one by ID failed ${err}`
      );
    }
  }
}

export default new InventoryControlRepository();
