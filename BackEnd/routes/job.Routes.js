const express = require("express");
const {
  postJob,
  getAllJobs,
  getAdminJobs,
  getJobById,
} = require("../controllers/job.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

const jobRouter = express.Router();

jobRouter.route("/post").post(isAuthenticated, postJob);
jobRouter.route("/get").get(isAuthenticated, getAllJobs);
jobRouter.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
jobRouter.route("/get/:id").get(isAuthenticated, getJobById);

module.exports = jobRouter;
