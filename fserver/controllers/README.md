---

# Controllers Directory

The `controllers/` directory contains modules responsible for handling incoming requests, processing data, and defining routes for different functionalities of the application.

## Subdirectories and Files

### sos Directory

The `sos/` directory within controllers is specifically dedicated to modules related to the "ShowsOnSale" functionality.

### Files

### data.json

- **Description**: This JSON file stores extracted data related to "ShowsOnSale", which can be accessed and used by other modules or components within the application.
- **Usage**: The data stored in this file serves as a persistent storage for information extracted from the "ShowsOnSale" platform, enabling easy retrieval and manipulation.

### index.js

- **Description**: This file serves as the entry point for the "ShowsOnSale" controllers, defining routes and request handlers for various endpoints related to "ShowsOnSale" functionality.
- **Usage**: It handles incoming requests and delegates processing tasks to appropriate modules or functions within the `sos/` directory.

#### sosModules Directory

The `sosModules/` directory contains modules that provide specific functionalities required by the "ShowsOnSale" controllers.

#### createSheet.js

- **Description**: This module is responsible for creating a Google Sheet and adding extracted data to it.
- **Usage**: It interfaces with Google Sheets API to create a new sheet, populate it with data, and return the URL of the created sheet.

#### extract.js

- **Description**: This module handles the extraction of data related to "ShowsOnSale" from the platform's website.
- **Usage**: It utilizes Puppeteer library to scrape the website, extract relevant information, and return it in a structured format.

#### login.js

- **Description**: This module provides functionality for logging in to the "ShowsOnSale" platform.
- **Usage**: It simulates user login by automating the login process using Puppeteer, providing access to authenticated features and data extraction capabilities.

---
