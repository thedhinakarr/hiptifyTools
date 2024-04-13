import mongoose from "mongoose";

let sheetSchema = new mongoose.Schema({
  artists: {
    type: String
  },
  sheetURL: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: Date,
}, { timestamps: true });

let gSheet = new mongoose.model("gSheet", sheetSchema);

export default gSheet;
