//NPM libraries
import express from "express";

//DB MODELS
import gSheet from "../../models/sos/Sheet.js";
import User from "../../models/User.js";

//Auth middleware:
import { isAuthenticated } from "../../middleware/authValidation.js";

//MODULES
import { extractor, saveDataToFile } from "./sosModules/extract.js";
import createSheetAndAddData from "./sosModules/createSheet.js";

const router = express.Router();

//extract
router.post("/extract", isAuthenticated, async (req, res) => {
  console.log("\n######### /api/sos/extract ROUTE HIT #########\n");
  try {
    // Get the artists from the request's body.
    let artists = req.body.artists;
    console.log("-> Extracting data of: ", artists);

    //Extraction of data by scraping
    const tableData = await extractor(artists);
    await saveDataToFile(tableData);

    // Google Sheet Creation.
    let url = await createSheetAndAddData(artists);

    let foundUser = await User.findOne({ _id: req.payload.id })
    //Saving the sheet to DB for retrieval.

    console.log("=============================================");
    console.log("-> Extraction initiated by user: ");
    console.log(foundUser);
    console.log("=============================================");
    let sheet = new gSheet({
      artists,
      sheetURL: url,
      createdBy: foundUser._id,
    });
    console.log("=============================================");
    console.log("-> Sheet Document to be stored in DB:");
    console.log(sheet);
    await sheet.save();
    console.log("-> Document saved to DB")
    console.log("=============================================\n");

    console.log("*****************************************************");

    return res.status(200).json({ sheet });
  } catch (err) {
    return res.status(500).json({ "message": "Internal server error" });
  }
})

//retrieve sheets.
router.post("/retrieve", isAuthenticated, async (req, res) => {
  console.log("\n######### /api/sos/retrieve ROUTE HIT #########\n");
  try {
    console.log("Date to retrieve docs for: ", req.body.date);
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

    console.log("Retrieved docs:\n", documents);
    return res.status(200).json(documents);
  } catch (err) {
    return res.status(500).json({ "message": "Internal server error" });
  }
})


export default router;
