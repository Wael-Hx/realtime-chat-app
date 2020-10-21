const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const connectDB = require("./config/db");
const Profile = require("./models/Profile");
const Conversation = require("./models/Conversation");
const io = require("socket.io")(server);
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Runing..."));
// create my profile
app.post("/profile", async (req, res) => {
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
app.get("/profile/:id", async (req, res) => {
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
app.put("/profile/:id", async (req, res) => {
  try {
    let newConversation = new Conversation({
      room: [req.params.id, req.body.contact],
    });
    const [profile, contact] = await Promise.all([
      Profile.findOne({ codeName: req.params.id }),
      Profile.findOne({ codeName: req.body.contact }),
    ]);
    if (profile && contact) {
      profile.contacts.push(contact.id);
      await Promise.all([profile.save(), newConversation.save()]);
      res.send({
        avatar: contact.avatar,
        _id: contact.id,
        username: contact.username,
        codeName: contact.codeName,
      });
    } else {
      res.status(404).send("contact not found");
    }
  } catch (err) {
    console.error(err.message);
  }
});
//todo : get conversations
app.get("/conversation/:id", async (req, res) => {
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
app.put("/conversation/:id1-:id2", async (req, res) => {
  try {
    let myConversation = await Conversation.findOne({
      room: { $all: [req.params.id1, req.params.id2] },
    });
    let newMessage = { from: req.body.from, text: req.body.text };
    myConversation.msgs.push(newMessage);
    await myConversation.save();
    res.send("myConversation");
  } catch (err) {
    console.error(err.message);
  }
});
//socket io
var clients = {};
io.on("connection", (socket) => {
  socket.on("connected", ({ codeName }) => {
    console.log(codeName);
    clients[codeName] = socket;
    /*  console.log(Object.keys(clients)); */
  });
  socket.on("private", ({ to, message }) => {
    if (clients.hasOwnProperty(to)) {
      clients[to].emit("private", {
        codeName: socket.codeName,
        message: message,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log(`disconnected`);
    /*  console.log(Object.keys(clients)); */
  });
});
server.listen(port, () => console.log(`server started on port ${port}`));
