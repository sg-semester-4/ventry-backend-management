import postgresDB from "../dao/PostgresDB";
import Debugger from "../tools/Debugger";
import PostgresDB from "../dao/PostgresDB";

class ProductTransactionRepository {
  async readAll() {
    try {
      const sql = "select * from product_transaction";
      const res = await PostgresDB.pool.query(sql);
      Debugger.log("ProductTransactionRepository", "Read all succeed");
      return res.rows;
    } catch (err) {
      Debugger.error("ProductTransactionRepository", `Read all failed ${err}`);
    }
  }

  async readOneByID(ID) {
    try {
      const sql = "select * from product_transaction where id=$1";
      const res = await PostgresDB.pool.query(sql, [ID]);
      Debugger.log("ProductTransactionRepository", "Read one by ID succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error(
        "ProductTransactionRepository",
        `Read one by ID failed ${err}`
      );
    }
  }

  async createOne(productTransaction) {
    try {
      const sql =
        "insert into product_transaction(id, account_id, product_id, quantity, total_sell_price, created_at, updated_at) values ($1, $2, $3, $4, $5, $6, $7) returning *";
      const res = await PostgresDB.pool.query(sql, [
        productTransaction.ID,
        productTransaction.accountID,
        productTransaction.productID,
        productTransaction.quantity,
        productTransaction.totalSellPrice,
        productTransaction.createdAt,
        productTransaction.updatedAt,
      ]);
      Debugger.log("ProductTransactionRepository", "Create one succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error(
        "ProductTransactionRepository",
        `Create one failed ${err}`
      );
    }
  }

  async updateOneByID(ID, productTransaction) {
    try {
      const sql =
        "update product_transaction set account_id=$1, product_id=$2, quantity=$3, total_sell_price=$4, updated_at=$5 where id=$6 returning *";
      const res = await PostgresDB.pool.query(sql, [
        productTransaction.accountID,
        productTransaction.productID,
        productTransaction.quantity,
        productTransaction.totalSellPrice,
        productTransaction.updatedAt,
        ID,
      ]);
      Debugger.log("ProductTransactionRepository", "Update one by ID succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error(
        "ProductTransactionRepository",
        `Update one by ID failed ${err}`
      );
    }
  }

  async deleteOneByID(ID) {
    try {
      const sql = "delete from product_transaction where id=$1 returning *";
      const res = await PostgresDB.pool.query(sql, [ID]);
      Debugger.log("ProductTransactionRepository", "Delete one by ID succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error(
        "ProductTransactionRepository",
        `Delete one by ID failed ${err}`
      );
    }
  }
}

export default new ProductTransactionRepository();
