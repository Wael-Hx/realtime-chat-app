const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const connectDB = require("./config/db");
const io = require("socket.io")(server);
require("dotenv").config();

const port = process.env.PORT || 5000;

connectDB();
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);
app.use(express.json({ extended: false }));
app.get("/", (_, res) => res.send("API Runing..."));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/conversation", require("./routes/api/conversation"));

//socket io
const clients = {};
io.on("connection", (socket) => {
  socket.on("connected", ({ codeName }) => {
    clients[codeName] = socket;
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
    let dc = Object.keys(clients).filter(
      (idx) => clients[idx].id === socket.id
    );
    delete clients[dc];
  });
});

server.listen(port, () => console.log(`server started on port ${port}`));
