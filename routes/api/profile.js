const router = require("express").Router();
const Profile = require("../../models/Profile");

// create my profile
router.post("/", async (req, res) => {
  try {
    const { username, codeName, avatar } = req.body;
    const newProfile = new Profile({ username, codeName, avatar });
    await newProfile.save();
    res.send("profile created");
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});
//get current user profile
router.get("/:id", async (req, res) => {
  try {
    let profile = await Profile.findOne({
      codeName: req.params.id,
    }).populate("contacts", ["username", "codeName", "avatar"]);
    res.json(profile);
  } catch (err) {
    console.error(err.message);
  }
});
//add contact
router.put("/:id", async (req, res) => {
  try {
    let newConversation = new Conversation({
      room: [req.params.id, req.body.contact],
    });
    const [profile, contact] = await Promise.all([
      Profile.findOne({ codeName: req.params.id }),
      Profile.findOne({ codeName: req.body.contact }),
    ]);
    if (profile && contact) {
      if (profile.contacts.includes(contact.id)) {
        res.status(409).send("contact already in contact list");
      } else {
        profile.contacts.push(contact.id);
        await Promise.all([profile.save(), newConversation.save()]);
        res.send({
          avatar: contact.avatar,
          _id: contact.id,
          username: contact.username,
          codeName: contact.codeName,
        });
      }
    } else {
      res.status(404).send("contact not found");
    }
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
