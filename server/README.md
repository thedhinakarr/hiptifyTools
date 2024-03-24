# Documentation

This project automates web scraping tasks, enabling users to extract data from a specific website and perform various actions such as logging in, data extraction, and creating Google Sheets. Below is a detailed explanation of each module's functionality:

## Modules Overview

### 1. Login (`login.js`)

The `login.js` module handles the login process to the target website using Puppeteer. It launches a headless browser instance, navigates to the login page, fills in the username and password fields, submits the form, and terminates the browser upon successful login.

### 2. Data Extraction (`extract.js`)

The `extract.js` module utilizes Puppeteer to navigate to a predefined webpage and extract relevant data. It selects specific options, waits for elements to load, and scrapes data from the HTML structure. Additionally, it modifies links if necessary to ensure accuracy in data extraction.

### 3. Google Sheets Creation (`createSheet.js`)

The `createSheet.js` module interacts with the Google Sheets API to create a new spreadsheet and populate it with extracted data. It uses the Google Sheets and Google Drive APIs to authenticate, create a new spreadsheet with appropriate formatting, and append the extracted data to the spreadsheet.

## Usage

1. Customize the login credentials, website URLs, and any other parameters within the modules according to your requirements.
2. Execute each module individually by running them using Node.js (`node <module_name.js>`).

## Dependencies

- Puppeteer: A Node.js library for automating browser tasks.
- Google APIs: Authentication and interaction with Google Sheets and Google Drive APIs.
- fs/promises: A built-in Node.js module for asynchronous file system operations.

## Notes

- Review and adhere to the terms of service of the target website regarding web scraping activities.
- Ensure that the selectors and logic in the modules accurately reflect the website's structure and behavior.
- Exercise caution during the extraction process to avoid overloading the website's servers and to mitigate potential legal issues.
- Obtain necessary API keys and credentials for Google APIs authentication.
