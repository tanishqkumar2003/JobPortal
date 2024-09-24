const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany,
} = require("../controllers/company.controller");

const companyRouter = express.Router();

companyRouter.route("/register").post(isAuthenticated, registerCompany);
companyRouter.route("/get").post(isAuthenticated, getCompany);
companyRouter.route("/get/:id").get(isAuthenticated, getCompanyById);
companyRouter.route("/update/:id").put(isAuthenticated, updateCompany);

module.exports = companyRouter;
