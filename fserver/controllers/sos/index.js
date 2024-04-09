import express from "express";
import config from "config";

const router = express.Router();

//login
router.post("/login", async (req, res) => {
  try {

    return res.status(200).json({ "message": "SOS LOGIN HIT" });
  } catch (err) {
    return res.status(500).json({ "message": "Internal server error" });
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
