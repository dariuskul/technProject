const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = 2000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser())

app.use("/user", require("./controllers/users.controller"))
app.use("/post", require("./controllers/posts.controller"))
app.use("/admin", require("./controllers/admin.controller"))
app.use("/communication", require("./controllers/communication.controller"))
app.use("/outer_service", require("./controllers/outer_services.controller"))

// io.on('connection', socket => {
//   console.log("Backend connected! " + socket.id)
//   socket.on('message', message => {
//     console.log(message)
//   })
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// })

server.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`)
})
