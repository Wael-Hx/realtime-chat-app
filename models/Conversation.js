const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
  room: [String],
  msgs: [
    {
      from: {
        type: String,
      },
      text: {
        type: String,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = Conversation = mongoose.model(
  "conversations",
  ConversationSchema
);
// todo encrypt and save conversations
