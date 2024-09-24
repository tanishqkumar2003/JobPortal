const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const userRouter = require("./routes/user.Routes");
const companyRouter = require("./routes/company.Routes");
const connectDB = require("./utils/db");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);

app.listen(PORT, () => {
  connectDB();
});
