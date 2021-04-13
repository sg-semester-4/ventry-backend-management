import { Pool } from "pg";
import Debugger from "../tools/Debugger";

class PostgresDB {
  pool = new Pool({
    user: process.env.DB_POSTGRE_USERNAME,
    password: process.env.DB_POSTGRE_PASSWORD,
    host: process.env.DB_POSTGRE_HOST,
    port: process.env.DB_POSTGRE_PORT,
    database: process.env.DB_POSTGRE_DATABASE,
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  });

  connect() {
    this.pool.connect((err, client, release) => {
      if (err) {
        return Debugger.log("PostgreDB", `Initial connection failed ${err}`);
      }
      client.query("SELECT NOW()", (err, result) => {
        release();
        if (err) {
          return Debugger.log("PostgreDB", `Error executing query ${err}`);
        }
        Debugger.log("PostgreDB", `Initial connection succeed`);
        Debugger.log("PostgreDB", result.rows);
      });
    });
  }
}

export default new PostgresDB();
