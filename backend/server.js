const http = require('http');
const app = require("./app.js");
const { Server } = require('socket.io');

require('dotenv').config();

const PORT = process.env.PORT;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  }
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT , () => {
    console.log(`Listining on port ${PORT}`);
})