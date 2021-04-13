import { Router } from "express";
import AuthenticationService from "../services/AuthenticationService";

// /authentications
const routes = Router();

routes.post("/register", async (req, res) => {
  const { name: name, email: email, password: password } = req.body;
  const credentials = {
    name,
    email,
    password,
  };
  const createdAccount = await AuthenticationService.register(credentials);
  let data = {};
  if (!createdAccount) {
    data = {
      status: 409,
      message: "Register failed",
      data: null,
    };
  } else {
    data = {
      status: 201,
      message: "Register succeed",
      data: createdAccount,
    };
  }
  res.status(200).send(data);
});

routes.post("/login", async (req, res) => {
  const { email: email, password: password } = req.body;
  const credentials = {
    email,
    password,
  };
  const account = await AuthenticationService.login(credentials);
  let data = {};
  if (!account) {
    data = {
      status: 401,
      message: "Login failed",
      data: null,
    };
  } else {
    data = { status: 200, message: "Login succeed", data: account };
  }
  res.status(200).send(data);
});

export default routes;
