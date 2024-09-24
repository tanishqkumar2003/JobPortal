const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  applyJob,
  getAppliedJobs,
  getApplicants,
  updateStatus,
} = require("../controllers/application.controller");

const applicationRouter = express.Router();

applicationRouter.route("/apply/:id").get(isAuthenticated, applyJob);
applicationRouter.route("/get").get(isAuthenticated, getAppliedJobs);
applicationRouter.route("/:id/applicants").get(isAuthenticated, getApplicants);
applicationRouter
  .route("/status/:id/update")
  .post(isAuthenticated, updateStatus);
