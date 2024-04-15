import dbConnect from "./dbConnect.js";
import config from "config";
import express from "express";
import bcrypt from "bcrypt";

import { registerValidations, loginValidations, errorMiddleWare } from "./middleware/generalValidations.js";
import { generateToken, isAuthenticated } from "./middleware/authValidation.js";

import sosRouter from "./controllers/sos/index.js";

import User from "./models/User.js";

const app = express();
const port = config.get("PORT");

app.use(express.json());

app.get("/api", (req, res) => {
  console.log("\n######### /api (ServerCheck) ROUTE HIT #########\n");
  res.send("Server is up");
});

//Need to Right Login/authentication logic here.
app.post("/api/register", registerValidations(), errorMiddleWare, async (req, res) => {
  console.log("\n######### /api/register ROUTE HIT #########");
  try {
    let { name, email, password } = req.body;
    //Object deconstruction
    console.log(req.body);

    let findEmail = await User.findOne({ email: req.body.email });

    if (findEmail) {
      return res.status(409).json({ error: "User already exists" });
    }

    let hashedPassword = await bcrypt.hash(password, 12);

    let user = new User({
      name,
      email,
      password: hashedPassword,
    });

    console.log(user);

    await user.save();

    return res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ "message": "internal server error" })
  }
});

app.post("/api/login", loginValidations(), errorMiddleWare, async (req, res) => {
  console.log("\n######### /api/login ROUTE HIT #########\n");
  try {
    let { email, password } = req.body;

    let findEmail = await User.findOne({ email: email });

    if (!findEmail) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    let match = await bcrypt.compare(password, findEmail.password)

    if (!match) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    let payload = {
      id: findEmail.id,
      email: findEmail.email,
      name: findEmail.name
    }

    let token = generateToken(payload);

    return res.status(200).json(
      {
        message: "Login Successful",
        token
      }
    );

  } catch (err) {
    console.log(error);
    res.status(500).json({ "message": "internal server error" })
  }
})

app.get("/api/getUserByToken", isAuthenticated, async (req, res) => {
  try {
    console.log(req.payload);

    let foundUser = await User.findOne({ _id: req.payload.id });

    if (!foundUser) {
      res.status(404).json({ "message": "User not found" })
    }
    else {
      res.status(200).json({ "user": foundUser })
    }
  } catch (err) {
    res.status(500).json({ "message": "internal server error" })
  }
});

//Main routes
app.use("/api/sos/", sosRouter);


app.listen(port, () => {
  console.log("Listening on port", port);
})
