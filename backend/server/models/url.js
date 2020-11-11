const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const urlSchema = new Schema({
  url: {
    type: "string",
    required: true,
  },
  slug: {
    type: "string",
    required: true,
    unique: true,
  },
});

urlSchema.plugin(uniqueValidator);
const Url = mongoose.model("URL", urlSchema);

module.exports = Url;
