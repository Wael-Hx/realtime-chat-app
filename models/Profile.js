const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  codeName: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profiles",
    },
  ],
});

module.exports = Profile = mongoose.model("profiles", profileSchema);
