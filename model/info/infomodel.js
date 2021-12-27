import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Infomodel = new Schema({
  farmerid: { type: String },
  farmer_name: { type: String },
  cane: { type: String },
  quality_li: { type: String },
  quality: { type: String },
  date: { type: String },
  place: { type: String },
  dairyform: { type: String },
  snf: { type: String },
  fat: { type: String },
  packed_date: { type: String },
  hash: { type: String },
  prehash: { type: String },
  tid: { type: String },
});

const info = mongoose.model("informations", Infomodel);

export default info;
