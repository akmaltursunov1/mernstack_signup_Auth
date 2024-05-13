const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/db");

// ----middlware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

// ---Mongodb
connectDB();

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`${port}-da ishladi`);
});
