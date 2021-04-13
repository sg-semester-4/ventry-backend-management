import postgresDB from "../dao/PostgresDB";
import Debugger from "../tools/Debugger";
import PostgresDB from "../dao/PostgresDB";

class ProductRepository {
  async readAll() {
    try {
      const sql = "select * from product";
      const res = await PostgresDB.pool.query(sql);
      Debugger.log("ProductRepository", "Read all succeed");
      return res.rows;
    } catch (err) {
      Debugger.error("ProductRepository", `Read all failed ${err}`);
    }
  }

  async readOneByID(ID) {
    try {
      const sql = "select * from product where id=$1";
      const res = await PostgresDB.pool.query(sql, [ID]);
      Debugger.log("ProductRepository", "Read one by ID succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error("ProductRepository", `Read one by ID failed ${err}`);
    }
  }

  async createOne(product) {
    try {
      const sql =
        "insert into product(id, code, name, description, quantity, unit_type, unit_cost_price, unit_sell_price, image_url, account_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *";
      const res = await PostgresDB.pool.query(sql, [
        product.ID,
        product.code,
        product.name,
        product.description,
        product.quantity,
        product.unitType,
        product.unitCostPrice,
        product.unitSellPrice,
        product.imageURL,
        product.accountID,
      ]);
      Debugger.log("ProductRepository", "Create one succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error("ProductRepository", `Create one failed ${err}`);
    }
  }

  async updateOneByID(ID, product) {
    try {
      const sql =
        "update product set code=$1, name=$2, description=$3, quantity=$4, unit_type=$5, unit_cost_price=$6, unit_sell_price=$7, image_url=$8, account_id=$9 where id=$10 returning *";
      const res = await PostgresDB.pool.query(sql, [
        product.code,
        product.name,
        product.description,
        product.quantity,
        product.unitType,
        product.unitCostPrice,
        product.unitSellPrice,
        product.imageURL,
        product.accountID,
        ID,
      ]);
      Debugger.log("ProductRepository", "Update one by ID succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error("ProductRepository", `Update one by ID failed ${err}`);
    }
  }

  async deleteOneByID(ID) {
    try {
      const sql = "delete from product where id=$1 returning *";
      const res = await PostgresDB.pool.query(sql, [ID]);
      Debugger.log("ProductRepository", "Delete one by ID succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error("ProductRepository", `Delete one by ID failed ${err}`);
    }
  }
}

export default new ProductRepository();
