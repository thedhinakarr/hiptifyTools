import dbConnect from "./dbConnect.js";
import config from "config";
import express from "express";
import bcrypt from "bcrypt";

import sosRouter from "./controllers/sos/index.js";

import { registerValidations, loginValidations, errorMiddleWare } from "./middleware/generalValidations.js";
import { generateToken } from "./middleware/authValidation.js";
import { isAuthenticated } from "./middleware/authValidation.js";
import User from "./models/User.js";

const app = express();
const port = config.get("PORT");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is up");
});


//Need to Right Login/authentication logic here.
app.post("/register", registerValidations(), errorMiddleWare, async (req, res) => {
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

app.post("/login", loginValidations(), errorMiddleWare, async (req, res) => {
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


//Main routes
app.use("/api/sos/", sosRouter);


app.listen(port, () => {
  console.log("Listening on port", port);
})
