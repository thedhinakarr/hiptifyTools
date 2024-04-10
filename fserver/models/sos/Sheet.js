import mongoose from "mongoose";

let sheetSchema = new mongoose.Schema({
  sheetURL: {
    type: String,
    required: true
  },
  createdAt: Date,
}, { timestamps: true });

let gSheet = new mongoose.model("gSheet", sheetSchema);

export default gSheet;
