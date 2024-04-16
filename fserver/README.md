
---

# Project Directory Structure

## Directories

### config/
- This directory contains configuration files for the application.
  - **default.json**: Default configuration settings.
  - **google/**: Contains a JSON file related to Google services (`showsonsale-308728922ddf.json`).

### controllers/
- This directory contains controllers for handling incoming requests and processing data.
  - **sos/**: Controllers related to "ShowsOnSale" functionality.
    - **index.js**: Entry point for the "ShowsOnSale" controllers.
    - **sosModules/**: Modules for specific functionalities.
      - **createSheet.js**: Functionality for creating a sheet.
      - **extract.js**: Functionality for extracting data.
      - **login.js**: Functionality for handling login.

### middleware/
- This directory contains middleware functions for request processing.
  - **authValidation.js**: Middleware for authentication validation.
  - **generalValidations.js**: Middleware for general validations.

### models/
- This directory contains models representing data structures and interacting with the database.
  - **User.js**: Model for user data.
  - **sos/**: Models related to "ShowsOnSale" functionality.
    - **Sheet.js**: Model for Sheets related to "ShowsOnSale."

## Files

- **app.js**: Entry point of the application.
- **dbConnect.js**: Contains database connection logic.
- **nodemon.json**: Configuration file for Nodemon, a utility for auto-restarting the server.
- **package.json**: Contains metadata and dependencies for the project.
- **package-lock.json**: Lock file for package dependencies.

## Other Documentation

- **BACKEND_ARCHITECTURE.pdf**: Detailed illustration about the backend architecture of the application.

---
