import express from "express";
import config from "config";
import { extractor, saveDataToFile } from "./sosModules/extract.js";

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
    return res.status(200).json({ "message": "SOS Extract HIT" });
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
