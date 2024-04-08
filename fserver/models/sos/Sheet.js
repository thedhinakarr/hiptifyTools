import mongoose from "mongoose";

let sheetSchema = new mongoose.Schema({
  sheetURL: {
    type: String,
    required: true
  }
}, { timestamps: true });

let gSheet = new mongoose.model("gSheet", sheetSchema);

export default gSheet;
