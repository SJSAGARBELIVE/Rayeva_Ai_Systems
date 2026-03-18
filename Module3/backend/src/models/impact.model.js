import mongoose from "mongoose";

const impactSchema = new mongoose.Schema({
  orderId: String,
  plasticSaved: Number,
  carbonSaved: Number,
  localImpact: String,
  aiSummary: String
}, { timestamps: true });

export default mongoose.model("Impact", impactSchema);