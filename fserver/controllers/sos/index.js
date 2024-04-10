import express from "express";
import config from "config";
//import { extractor, saveDataToFile, linkModifier } from "./sosModules/extract.js";
import createSheetAndAddData from "./sosModules/createSheet.js";

const router = express.Router();

//login
router.post("/login", async (req, res) => {
  try {
    await login();
    return res.status(200).json({ "message": cookies });
  } catch (err) {
    return res.status(500).json({ "message": err });
  }
})

//extract
router.post("/extract", async (req, res) => {
  try {

    let artists = req.body.artists;
    console.log(artists);
    let url = await createSheetAndAddData(artists);
    // (async () => {
    //   const tableData = await extractor(artists);
    //   console.log(tableData);
    //   await saveDataToFile(tableData);
    // })();
    //
    //

    return res.status(200).json({ "sheetURL": url });
  } catch (err) {
    return res.status(500).json({ "message": "Internal server error" });
  }
})


//retrieve
router.post("/retrieve", async (req, res) => {
  try {

    return res.status(200).json({ "message": "SOS Retrieve HIT" });
  } catch (err) {
    return res.status(500).json({ "message": "Internal server error" });
  }
})


export default router;
