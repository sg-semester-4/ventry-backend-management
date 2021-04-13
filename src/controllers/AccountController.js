import { Router } from "express";
import AccountService from "../services/AccountService";

// /accounts
const routes = Router();

routes.get("/", async (req, res) => {
  const accounts = await AccountService.readAll(req.query);
  let data = {};
  if (!accounts) {
    data = {
      status: 403,
      message: "Read all account failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Read all account succeed",
      data: accounts,
    };
  }
  res.status(200).send(data);
});

routes.get("/:id", async (req, res) => {
  const { id: ID } = req.params;
  const account = await AccountService.readOneByID(ID);
  let data = {};
  if (!account) {
    data = {
      status: 403,
      message: "Read account failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Read account succeed",
      data: account,
    };
  }
  res.status(200).send(data);
});

routes.post("/", async (req, res) => {
  const { name: name, email: email, password: password } = req.body;
  const account = {
    name,
    email,
    password,
  };
  const createdAccount = await AccountService.createOne(account);
  let data = {};
  if (!createdAccount) {
    data = {
      status: 403,
      message: "Create account failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Create account succeed",
      data: createdAccount,
    };
  }
  res.status(201).send(data);
});

routes.put("/:id", async (req, res) => {
  const { id: ID } = req.params;
  const { name: name, email: email, password: password } = req.body;
  const account = {
    name,
    email,
    password,
  };
  const updatedAccount = await AccountService.updateOneByID(ID, account);
  let data = {};
  if (!updatedAccount) {
    data = {
      status: 403,
      message: "Update account failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Update account succeed",
      data: updatedAccount,
    };
  }
  res.status(200).send(data);
});

routes.delete("/:id", async (req, res) => {
  const { id: ID } = req.params;
  const deletedAccount = await AccountService.deleteOneByID(ID);
  let data = {};
  if (!deletedAccount) {
    data = {
      status: 403,
      message: "Update account failed",
      data: null,
    };
  } else {
    data = {
      status: 200,
      message: "Update account succeed",
      data: deletedAccount,
    };
  }
  res.status(200).send(data);
});

export default routes;
