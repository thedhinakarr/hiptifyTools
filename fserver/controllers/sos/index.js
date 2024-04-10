//NPM libraries
import express from "express";
import config from "config";

//DB MODELS
import gSheet from "../../models/sos/Sheet.js";

//MODULES
//import { extractor, saveDataToFile, linkModifier } from "./sosModules/extract.js";
import createSheetAndAddData from "./sosModules/createSheet.js";

const router = express.Router();

//extract
router.post("/extract", async (req, res) => {
  try {

    let artists = req.body.artists;
    console.log(artists);
    // (async () => {
    //   const tableData = await extractor(artists);
    //   console.log(tableData);
    //   await saveDataToFile(tableData);
    // })();
    let url = await createSheetAndAddData(artists);

    let sheet = new gSheet({
      sheetURL: url,
    });
    console.log(sheet);

    await sheet.save();

    return res.status(200).json({ sheet });
  } catch (err) {
    return res.status(500).json({ "message": "Internal server error" });
  }
})


//retrieve
router.post("/retrieve", async (req, res) => {
  try {
    console.log(req.body.date);
    let desiredDate = new Date(req.body.date);

    // Calculate the start and end of the day for the desiredDate
    const startOfDay = new Date(
      desiredDate.getFullYear(),
      desiredDate.getMonth(),
      desiredDate.getDate()
    );
    const endOfDay = new Date(
      desiredDate.getFullYear(),
      desiredDate.getMonth(),
      desiredDate.getDate() + 1
    );

    // Query for documents created within the desired day
    const documents = await gSheet.find({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    });

    console.log(documents);
    return res.status(200).json(documents);
  } catch (err) {
    return res.status(500).json({ "message": "Internal server error" });
  }
})

//Need to fix the timiming issue.


export default router;
