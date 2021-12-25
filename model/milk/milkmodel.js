import mongoose from "mongoose";

const Schema = mongoose.Schema;

const milkmodel = new Schema({
  dairyform: { type: String },
  snf: { type: String },
  fat: { type: String },
  packed_date: { type: String },
});

const milk = mongoose.model("milks", milkmodel);

export default milk;
