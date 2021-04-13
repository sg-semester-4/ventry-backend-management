import postgresDB from "../dao/PostgresDB";
import Debugger from "../tools/Debugger";
import PostgresDB from "../dao/PostgresDB";
import { v4 as uuidv4 } from "uuid";
import AccountRepository from "../repositories/AccountRepository";
import Wrangler from "../tools/Wrangler";

class AccountService {
  async readAll(query, options) {
    try {
      let accounts = await AccountRepository.readAll();
      if (Object.keys(query).length > 0) {
        accounts = Wrangler.filterArrayByQuery(accounts, query, options);
      }
      Debugger.log("AccountService", "Read all succeed");
      return accounts;
    } catch (err) {
      Debugger.error("AccountService", `Read all failed ${err}`);
    }
  }

  async readOneByID(ID) {
    try {
      const account = await AccountRepository.readOneByID(ID);
      Debugger.log("AccountService", "Read one by ID succeed");
      return account;
    } catch (err) {
      Debugger.error("AccountService", `Read one by ID failed ${err}`);
    }
  }

  async createOne(account) {
    try {
      const accountToCreate = { ...account, ID: uuidv4() };
      const createdAccount = await AccountRepository.createOne(accountToCreate);
      Debugger.log("AccountService", "Create one succeed");
      return createdAccount;
    } catch (err) {
      Debugger.error("AccountService", `Create one failed ${err}`);
    }
  }

  async updateOneByID(ID, account) {
    try {
      const updatedAccount = await AccountRepository.updateOneByID(ID, account);
      Debugger.log("AccountService", "Update one by ID succeed");
      return updatedAccount;
    } catch (err) {
      Debugger.error("AccountService", `Update one by ID failed ${err}`);
    }
  }

  async deleteOneByID(ID) {
    try {
      const deletedAccount = await AccountRepository.deleteOneByID(ID);
      Debugger.log("AccountService", "Delete one by ID succeed");
      return deletedAccount;
    } catch (err) {
      Debugger.error("AccountService", `Delete one by ID failed ${err}`);
    }
  }
}

export default new AccountService();
