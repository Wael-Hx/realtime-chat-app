const router = require("express").Router();
const Conversation = require("../../models/Conversation");

//todo : get conversations
router.get("/:id", async (req, res) => {
  try {
    let conversations = await Conversation.find();
    let myconversations = conversations.filter((cst) =>
      cst.room.includes(req.params.id)
    );
    res.send(myconversations);
  } catch (err) {
    console.error(err);
  }
});
//todo : encrypt and save conversations
router.put("/:id1-:id2", async (req, res) => {
  try {
    let myConversation = await Conversation.findOne({
      room: { $all: [req.params.id1, req.params.id2] },
    });
    let newMessage = { from: req.body.from, text: req.body.text };
    myConversation.msgs.push(newMessage);
    await myConversation.save();
    res.send("success");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
