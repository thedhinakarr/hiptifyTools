// Create function will be passed the data.json file containing the extracted data. The purpose of this module is to
// create a google sheet and write the data to this sheet.
// This module will return an URL of the google sheet which will be stored in the db with the sheet model which was created.

import { google } from 'googleapis';
import fs from 'fs';
import config from 'config';

const sheets = google.sheets({
  version: 'v4',
  auth: new google.auth.GoogleAuth({
    keyFile: 'config/google/showsonsale-308728922ddf.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  }),
});

const drive = google.drive({
  version: 'v3',
  auth: new google.auth.GoogleAuth({
    keyFile: 'config/google/showsonsale-308728922ddf.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
  }),
});

/*
    ReadDataFromFile Function

    Parameters:
        1. File Path of data.json

    Description:
        1. The function takes in the file path and parses the data to perform operations.

    Return value:
        1. Returns parsed data.
*/
function readDataFromFile(filePath) {
  console.log("\n======ENTERED READDATAFROMFILE FUNCTION======");
  try {
    console.log("-> Reading filePath.");
    const data = fs.readFileSync(filePath, 'utf8');
    console.log("-> FilePath read successfully.");

    console.log("-> Parsing the data.");
    const jsonData = JSON.parse(data);
    console.log("-> Parsing successful");

    console.log("-> Returning parsed data.")
    console.log("======EXITING READDATAFROMFILE FUNCTION======\n");
    return jsonData;
  } catch (error) {
    // If an error occurs, log it and return null
    console.error('Error reading data:', error);
    console.log("======EXITING READDATAFROMFILE FUNCTION======\n");
    return null;
  }
}

/*
    addPermissionsToSheet Function

    Parameters:
        1. spreadSheetID of the google sheet.

    Description:
        1. The function takes in the spreadSheetID and adds permission to edit this sheet by using their
            email addresses.

    Return value:
        Does not return anything.
*/
const addPermissionsToSheet = async (spreadsheetId) => {
  console.log("\n======ENTERED ADDPERMISSIONSTOSHEET FUNCTION======");

  try {
    // Define the request body for adding permissions for the first email address
    const requestBody1 = {
      emailAddress: config.get("email.dhinakarr"),
      role: 'writer',
      type: 'user',
    };

    // Send a request to add permissions for the first email address
    await drive.permissions.create({
      fileId: spreadsheetId,
      requestBody: requestBody1,
    });

    console.log(`-> Granted permissions to codedhinakarr@gmail.com`);

    // Define the request body for adding permissions for the second email address
    const requestBody2 = {
      emailAddress: config.get("email.pylan"),
      role: 'writer',
      type: 'user',
    };

    // Send a request to add permissions for the second email address
    await drive.permissions.create({
      fileId: spreadsheetId,
      requestBody: requestBody2,
    });

    console.log(`-> Granted permissions to pylan@hiptify.co.in`);

    console.log('-> All permissions added to the sheet.');
    console.log("======EXITING ADDPERMISSIONSTOSHEET FUNCTION======\n");
  } catch (error) {
    console.error('-> Error adding permissions:', error);
    console.log("======EXITING ADDPERMISSIONSTOSHEET FUNCTION======\n");
  }
};


/*
    CreateSheetAndAddData Function

    Parameters:
        1. artists String

    Description:
        1. The function takes in the artists string in order to add to the title of the sheet.
        2. calls the readDataFromFile function.
        3. Calls the addPermissionsToSheet function to add permissions after writing to a google sheet.

    Return value:
        Returns the SpreadSheetURL to access the google sheet.
*/
const createSheetAndAddData = async (artists) => {
  try {
    console.log("\n======ENTERED CREATESHEETANDADDDATA FUNCTION.======");

    const data = await readDataFromFile(config.get("showsOnSale.DATAFILEPATH"));
    if (data) {
      console.log('-> Data:\n', data);
    } else {
      console.log('-> Failed to read data from file.');
    }

    const timestamp = Date.now();
    const date = new Date(timestamp);
    const spreadsheetTitle = ` [${artists}], ${date.toLocaleDateString()}_${date.toLocaleTimeString()} showsonsale Data`;

    // Define the request body for creating the spreadsheet
    const requestBody = {
      properties: {
        title: spreadsheetTitle, // Specify your sheet name here
      },
      sheets: [
        {
          properties: {
            title: 'Sheet1', // Specify your sheet name here
            gridProperties: {
              rowCount: 1,
              columnCount: Object.keys(data[0]).length,
            },
          },
        },
      ],
    };

    // Send a request to create the spreadsheet
    const response = await sheets.spreadsheets.create({
      requestBody,
    });

    const sheetUrl = response.data.spreadsheetUrl;

    console.log('-> Sheet created:', response.data.spreadsheetUrl);

    // Extract column headers from the first data object
    const headers = Object.keys(data[0]);

    await sheets.spreadsheets.values.append({
      spreadsheetId: response.data.spreadsheetId,
      range: `Sheet1!A1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [headers],
      },
    });

    // Prepare the values to be inserted (exclude headers)
    const values = data.map(event => Object.values(event));

    // Define the range where you want to insert the data (starting from the second row)
    const range = `Sheet1!A2`; // Adjust the sheet name as needed

    // Send a request to append the data to the spreadsheet
    const appendResponse = await sheets.spreadsheets.values.append({
      spreadsheetId: response.data.spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    console.log('-> Data added to the sheet:', appendResponse.data);
    await addPermissionsToSheet(appendResponse.data.spreadsheetId);
    console.log("======EXITING CREATESHEETANDADDDATA FUNCTION======\n");
    return sheetUrl;
  } catch (error) {
    console.error('Error creating sheet and adding data:', error);
  }
};

export default createSheetAndAddData;
