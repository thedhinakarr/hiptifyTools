import express from "express";
import { google } from "googleapis";

const app = express();

app.get("/", async (req, res) => {

  const auth = new google.auth.GoogleAuth({
    keyFile: "showsonsale-ed3fce40689f.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = '1IE2sv9VJkcarpDzLJn-cobdvFCZd1-G7OPM4udzmy4Q';

  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  res.send(metaData);
});

app.post("/", async (req, res) => {
  // const { request, name } = req.body;

  // const auth = new google.auth.GoogleAuth({
  //   keyFile: "server/credentials.json",
  //   scopes: "https://www.googleapis.com/auth/spreadsheets",
  // });

  // Create client instance for auth
  // const client = await auth.getClient();

  // Instance of Google Sheets API
  // const googleSheets = google.sheets({ version: "v4", auth: client });

  // const spreadsheetId = "1J5OesnSTJCgLTTA0hQ_QSk_UPVK1nwRTEkvvRHHrEqM";

  // // Get metadata about spreadsheet
  // const metaData = await googleSheets.spreadsheets.get({
  //   auth,
  //   spreadsheetId,
  // });

  // // Read rows from spreadsheet
  // const getRows = await googleSheets.spreadsheets.values.get({
  //   auth,
  //   spreadsheetId,
  //   range: "Sheet1!A:A",
  // });

  // // Write row(s) to spreadsheet
  // await googleSheets.spreadsheets.values.append({
  //   auth,
  //   spreadsheetId,
  //   range: "Sheet1!A:B",
  //   valueInputOption: "USER_ENTERED",
  //   resource: {
  //     values: [[request, name]],
  //   },
  // });

  // res.send("Successfully submitted! Thank you!");
});

app.listen(1337, () => console.log("running on 1337"));
