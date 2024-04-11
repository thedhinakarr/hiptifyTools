import dbConnect from "./dbConnect.js";
import config from "config";
import express from "express";

import sosRouter from "./controllers/sos/index.js";

const app = express();
const port = config.get("PORT");

app.use(express.json());

//Main routes
app.use("/api/sos/", sosRouter);

app.get("/", (req, res) => {
  res.send("Server is up");
})

//Need to Right Login/authentication logic here.

app.listen(port, () => {
  console.log("Listening on port", port);
})
