---

# Models Directory

The `models/` directory contains Mongoose schemas and models representing data structures and interactions with the MongoDB database.

## Files

### User.js
- **Description**: This file defines the schema and model for the User collection in the database.
- **Schema Fields**:
  - `name`: Represents the name of the user. It is of type String and has a maximum length of 40 characters.
  - `email`: Represents the email address of the user. It is of type String, is unique, and has a maximum length of 70 characters.
  - `password`: Represents the password of the user. It is of type String and is required.
- **Model Usage**: The `User` model is used to perform CRUD operations on user documents in the database.

### sos/Sheet.js
- **Description**: This file defines the schema and model for the Sheet collection related to "ShowsOnSale" in the database.
- **Schema Fields**:
  - `artists`: Represents the artists associated with the sheet. It is of type String.
  - `sheetURL`: Represents the URL of the sheet. It is of type String and is required.
  - `createdBy`: Represents the user who created the sheet. It is a reference to the `User` model and is required.
  - `createdAt`: Represents the timestamp when the sheet was created. It is of type Date.
- **Model Usage**: The `gSheet` model is used to perform CRUD operations on sheet documents related to "ShowsOnSale" in the database.

### README.md
- **Description**: This file provides an overview of the models directory and its contents.
- **Purpose**: To document the schemas and models defined in the directory and their usage in the application.

---
