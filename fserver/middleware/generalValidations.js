import { body, validationResult } from "express-validator"


//When a user registers from the client, a json object consisting credentials of the
//user is sent to the server, these are validated by this function below.
const registerValidations = () => {
  return [
    body("name", "name must be 3-30 chars long").isLength({ max: 30, min: 3 }),
    body("email", "Enter vaid email").isEmail().isLength({ max: 50 }),
    body("password", "password must contain at least 7 characters").isLength({ min: 7 }),
    body("password2").custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    })
  ];
};


//When a user logs in from the client, a json object consisting credentials of the
//user is sent to the server, these are validated by this function below.
const loginValidations = () => {
  return [
    body("email", "enter valid email.").isEmail(),
    body("password", "Password must contain at least 7 characters").isLength({ min: 7 })
  ]
};


const errorMiddleWare = (req, res, next) => {

  const errors = validationResult(req);

  if (errors.isEmpty == false) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export { registerValidations, loginValidations, errorMiddleWare };
