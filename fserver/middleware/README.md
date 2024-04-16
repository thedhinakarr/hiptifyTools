---

# Middleware Directory

The `middleware/` directory contains functions for request processing, authentication, and input validation.

## Files

### authValidation.js

- **Description**: This file contains middleware functions for request authentication.

  - **generateToken(payload)**: Function to generate a JWT token based on the provided payload.
    - Parameters:
      - `payload`: Data to be included in the token.
    - Returns:
      - JWT token string.
    - Usage:
      - Call this function to generate a JWT token for authenticating requests made by the client.

  - **isAuthenticated(req, res, next)**: Middleware function to check the authenticity of the client making the request.
    - Parameters:
      - `req`: Express request object.
      - `res`: Express response object.
      - `next`: Express next function.
    - Functionality:
      - Verifies the JWT token sent in the request header.
      - If the token is valid, adds the payload to the request object (`req.payload`).
      - If the token is invalid or expired, sends a 401 Unauthorized response.
    - Usage:
      - Apply this middleware to routes/endpoints that require authentication.

### generalValidations.js

- **Description**: This file contains middleware functions for validating user input during registration and login processes.

  - **registerValidations()**: Function to define validation rules for user registration inputs.
    - Returns: An array of validation middleware functions using Express Validator.
    - Validation Rules:
      - `name`: Must be 3-30 characters long.
      - `email`: Must be a valid email address and maximum length of 50 characters.
      - `password`: Must contain at least 7 characters.
      - `password2`: Must match the value of `password`.
    - Usage: Apply these validations to the route handling user registration.

  - **loginValidations()**: Function to define validation rules for user login inputs.
    - Returns: An array of validation middleware functions using Express Validator.
    - Validation Rules:
      - `email`: Must be a valid email address.
      - `password`: Must contain at least 7 characters.
    - Usage: Apply these validations to the route handling user login.

  - **errorMiddleWare(req, res, next)**: Middleware function to handle validation errors.
    - Parameters:
      - `req`: Express request object.
      - `res`: Express response object.
      - `next`: Express next function.
    - Functionality: Checks for validation errors and sends a 400 Bad Request response with error messages if validation fails.
    - Usage: Apply this middleware after the validation middleware to handle errors.

### README.md

- **Description**: This file provides an overview of the middleware directory and its contents.

---
