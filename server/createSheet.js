import { google } from 'googleapis';
import fs from 'fs';
//API_KEY= AIzaSyAvS1LrIn-aj0aG5fraSv1ozMUYTcXCoRI

const sheets = google.sheets({
  version: 'v4',
  auth: new google.auth.GoogleAuth({
    keyFile: './showsonsale-308728922ddf.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  }),
});

const drive = google.drive({
  version: 'v3',
  auth: new google.auth.GoogleAuth({
    keyFile: 'showsonsale-ed3fce40689f.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
  }),
});


function readDataFromFile(filePath) {

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    // If an error occurs, log it and return null
    console.error('Error reading data:', error);
    return null;
  }
}

const addPermissionsToSheet = async (spreadsheetId) => {
  try {
    // Define the request body for adding permissions for the first email address
    const requestBody1 = {
      emailAddress: `codedhinakarr@gmail.com`,
      role: 'writer',
      type: 'user',
    };

    // Send a request to add permissions for the first email address
    await drive.permissions.create({
      fileId: spreadsheetId,
      requestBody: requestBody1,
    });

    console.log(`Permissions added for codedhinakarr@gmail.com`);

    // Define the request body for adding permissions for the second email address
    const requestBody2 = {
      emailAddress: `pylan@hiptify.co.in`,
      role: 'writer',
      type: 'user',
    };

    // Send a request to add permissions for the second email address
    await drive.permissions.create({
      fileId: spreadsheetId,
      requestBody: requestBody2,
    });

    console.log(`Permissions added for pylan@hiptify.co.in`);

    console.log('All permissions added to the sheet.');
  } catch (error) {
    console.error('Error adding permissions:', error);
  }
};


const createSheetAndAddData = async (artists) => {
  try {
    console.log("Entered.");
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

    console.log('Sheet created:', response.data);

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

    console.log('Data added to the sheet:', appendResponse.data);
    await addPermissionsToSheet(appendResponse.data.spreadsheetId);
  } catch (error) {
    console.error('Error creating sheet and adding data:', error);
  }
};


const data = readDataFromFile('data.json');
if (data) {
  console.log('Data:', data);
} else {
  console.log('Failed to read data from file.');
}


createSheetAndAddData("Alec Benjamin, Tori Kelly");


export default createSheetAndAddData;
