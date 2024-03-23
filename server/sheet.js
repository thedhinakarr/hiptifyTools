
//API_KEY= AIzaSyAvS1LrIn-aj0aG5fraSv1ozMUYTcXCoRI
import { google } from 'googleapis';

const sheets = google.sheets({ version: 'v4', auth: 'AIzaSyAvS1LrIn-aj0aG5fraSv1ozMUYTcXCoRI' });

async function runSample(spreadsheetId, range) {
  try {
    const res = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          ['Justin', '1/1/2001', 'Website'],
          ['Node.js', '2018-03-14', 'Fun'],
        ],
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

runSample('1e-BReXwyhrRWoueniKByaE7EzQ2c5MojYljYCZeN2YY', 'Sheet1!A1:C3').catch(console.error);
