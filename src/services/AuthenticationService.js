import postgresDB from "../dao/PostgresDB";
import Debugger from "../tools/Debugger";
import PostgresDB from "../dao/PostgresDB";
import { v4 as uuidv4 } from "uuid";
import AccountService from "../services/AccountService";
import Wrangler from "../tools/Wrangler";

class AuthenticationService {
  async register(credentials) {
    try {
      const query = {
        email: credentials.email,
      };
      const options = {
        strict: "true",
        method: "and",
      };
      const accounts = await AccountService.readAll(query, options);
      let createdAccount = null;
      if (accounts.length > 0) {
        createdAccount = null;
      } else {
        const accountToCreate = {
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        };
        createdAccount = await AccountService.createOne(accountToCreate);
      }
      Debugger.log("AuthenticationService", "Register succeed");
      return createdAccount;
    } catch (err) {
      Debugger.error("AuthenticationService", `Register failed ${err}`);
    }
  }

  async login(credentials) {
    try {
      const query = {
        email: credentials.email,
        password: credentials.password,
      };
      const options = {
        strict: "true",
        method: "and",
      };
      const accounts = await AccountService.readAll(query, options);
      let account = null;
      if (accounts.length <= 0) {
        account = null;
      } else {
        account = accounts[0];
      }

      Debugger.log("AuthenticationService", "Login succeed");
      return account;
    } catch (err) {
      Debugger.error("AuthenticationService", `Login failed ${err}`);
    }
  }
}

export default new AuthenticationService();
