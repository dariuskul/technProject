const config = require('./config.json');
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: config.clientUrl } })
const useSockets = require('./_helpers/socket-events')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: config.clientUrl, 
  credentials: true
}));
app.use(cookieParser())

app.use("/user", require("./controllers/users.controller"));
app.use("/post", require("./controllers/posts.controller"));
app.use("/admin", require("./controllers/admin.controller"));
app.use("/communication", require("./controllers/communication.controller"));
app.use("/outer_service", require("./controllers/outer_services.controller"));

useSockets(io)

server.listen(config.serverPort, () => {
  console.log(`Server is running on: http://localhost:${config.serverPort}`)
})
