const { handleNewMessage } = require('../controllers/messageController.js');

function setupSocket(io) {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('send_message', (data) => {
      handleNewMessage(data, socket, io); // Save to DB and then emit
    });
  });
}

module.exports = { setupSocket };
