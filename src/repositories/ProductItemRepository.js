import postgresDB from "../dao/PostgresDB";
import Debugger from "../tools/Debugger";
import PostgresDB from "../dao/PostgresDB";

class ProductItemRepository {
  async readAll() {
    try {
      const sql = "select * from product_item";
      const res = await PostgresDB.pool.query(sql);
      Debugger.log("ProductItemRepository", "Read all succeed");
      return res.rows;
    } catch (err) {
      Debugger.error("ProductItemRepository", `Read all failed ${err}`);
    }
  }

  async readOneByID(ID) {
    try {
      const sql = "select * from product_item where id=$1";
      const res = await PostgresDB.pool.query(sql, [ID]);
      Debugger.log("ProductItemRepository", "Read one by parent ID succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error("ProductItemRepository", `Read one by ID failed ${err}`);
    }
  }

  async createOne(productItem) {
    try {
      const sql =
        "insert into product_item(id, product_id, item_id, quantity) values ($1, $2, $3, $4) returning *";
      const res = await PostgresDB.pool.query(sql, [
        productItem.ID,
        productItem.productID,
        productItem.itemID,
        productItem.quantity,
      ]);
      Debugger.log("ProductItemRepository", "Create one succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error("ProductItemRepository", `Create one failed ${err}`);
    }
  }

  async updateOneByID(ID, productItem) {
    try {
      const sql =
        "update product_item set product_id=$1, item_id=$2, quantity=$3 where id=$4 returning *";
      const res = await PostgresDB.pool.query(sql, [
        productItem.productID,
        productItem.itemID,
        productItem.quantity,
        ID,
      ]);
      Debugger.log("ProductItemRepository", "Update one by ID succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error("ProductItemRepository", `Update one by ID failed ${err}`);
    }
  }

  async deleteOneByID(ID) {
    try {
      const sql = "delete from product_item where id=$1 returning *";
      const res = await PostgresDB.pool.query(sql, [ID]);
      Debugger.log("ProductItemRepository", "Delete one by ID succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error("ProductItemRepository", `Delete one by ID failed ${err}`);
    }
  }
}

export default new ProductItemRepository();
