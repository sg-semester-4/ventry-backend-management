import postgresDB from "../dao/PostgresDB";
import Debugger from "../tools/Debugger";
import PostgresDB from "../dao/PostgresDB";
import { v4 as uuidv4 } from "uuid";

class AccountRepository {
  async readAll() {
    try {
      const sql = "select * from account";
      const res = await PostgresDB.pool.query(sql);
      Debugger.log("AccountRepository", "Read all succeed");
      return res.rows;
    } catch (err) {
      Debugger.error("AccountRepository", `Read all failed ${err}`);
    }
  }

  async readOneByID(ID) {
    try {
      const sql = "select * from account where id=$1";
      const res = await PostgresDB.pool.query(sql, [ID]);
      Debugger.log("AccountRepository", "Read one by parent ID succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error("AccountRepository", `Read one by ID failed ${err}`);
    }
  }

  async createOne(account) {
    try {
      const sql =
        "insert into account(id, name, email, password) values ($1, $2, $3, $4) returning *";
      const res = await PostgresDB.pool.query(sql, [
        account.ID,
        account.name,
        account.email,
        account.password,
      ]);
      Debugger.log("AccountRepository", "Create one succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error("AccountRepository", `Create one failed ${err}`);
    }
  }

  async updateOneByID(ID, account) {
    try {
      const sql =
        "update account set name=$1, email=$2, password=$3 where id=$4 returning *";
      const res = await PostgresDB.pool.query(sql, [
        account.name,
        account.email,
        account.password,
        ID,
      ]);
      Debugger.log("AccountRepository", "Update one by ID succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error("AccountRepository", `Update one by ID failed ${err}`);
    }
  }

  async deleteOneByID(ID) {
    try {
      const sql = "delete from account where id=$1 returning *";
      const res = await PostgresDB.pool.query(sql, [ID]);
      Debugger.log("AccountRepository", "Delete one by ID succeed");
      return res.rows[0];
    } catch (err) {
      Debugger.error("AccountRepository", `Delete one by ID failed ${err}`);
    }
  }
}

export default new AccountRepository();
